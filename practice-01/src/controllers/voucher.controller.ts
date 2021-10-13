import { addEmailToQueue } from './../queues/email.queue';
import { voucherModel } from './../models/voucher.model';
import Boom from "@hapi/boom";
import { VoucherPayLoad } from './../interfaces/voucher.interface';
import { Lifecycle } from '@hapi/hapi'
import { eventModel } from './../models/event.model'
import mongoose, { ClientSession, ObjectId } from 'mongoose';
import referralCodes from 'referral-codes'
import { Event } from '../interfaces/event.interface';

// Get voucher by code
const findVoucherById: Lifecycle.Method = async (request, h) => {
    const code = request.params.code;
    const voucher = await voucherModel.findOne({ code })
    if (!voucher) return h.response({ message: "Voucher not found" }).code(404)
    return h.response(voucher).code(200)
}

// Generate voucher
const generateVoucher = async (event_id: ObjectId, email: string, session: ClientSession) => {
    // Random voucher code by using referralCodes lib
    const codeList = referralCodes.generate({
        count: 1,
        length: 10,
        charset: "0123456789",
        prefix: "TT-"
    })
    // Create new voucher
    const newVoucher = await voucherModel.create([{
        event_id,
        name: "Voucher Tết trung thu",
        description: `Voucher có giá trị giảm giá ${Math.ceil(Math.random() * 50)}%`,
        email,
        code: codeList[0]
    }], { session })
    return newVoucher
}

// Retry to commit transaction
async function commitWithRetry(session: ClientSession) {
    try {
        await session.commitTransaction();
        console.log('Transaction committed.');
    } catch (error: any) {
        if (
            error.errorLabels &&
            error.errorLabels.indexOf('UnknownTransactionCommitResult') >= 0
        ) {
            console.log('UnknownTransactionCommitResult, retrying commit operation ...');
            await commitWithRetry(session);
        } else {
            return Promise.reject(error)
        }
    }
}

// Delay
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry transaction
const runTransactionWithRetry = (session: ClientSession, event_id: ObjectId, email: string) => {
    return new Promise(async (resolve, reject) => {
        while (true) {
            try {
                session.startTransaction()
                // Minus quantity
                const result = await eventModel.updateOne({
                    _id: event_id, max_quantity: { $gt: 0 }
                },
                    {
                        $inc: { max_quantity: -1 }
                    }).session(session)
                // Delay random to check transaction
                const random = Math.random() * 10000
                console.log(random)
                await delay(random)
                if (result.matchedCount === 0) {
                    await session.abortTransaction()
                    reject('Quantity of voucher is over')
                    break
                }

                // Create voucher
                const newVoucher = await generateVoucher(event_id, email, session)
                await commitWithRetry(session)
                await session.endSession()
                resolve(newVoucher)
                break
            } catch (error: any) {
                // If transient error, retry the whole transaction
                if (error.errorLabels && error.errorLabels.includes("TransientTransactionError")) {
                    console.log("Caught exception during transaction, aborting.")
                    await session.abortTransaction()
                    continue
                } else {
                    console.log(error)
                    reject(error)
                }
            }
        }
    })
}

// Control voucher generation
const controlVoucherGeneration: Lifecycle.Method = async (request, h) => {
    const { event_id, email } = request.payload as VoucherPayLoad
    const session = await mongoose.startSession()
    try {
        const newVoucher = await runTransactionWithRetry(session, event_id, email)
        // addEmailToQueue(email, newVoucher[0].code)
        return newVoucher
    } catch (error: any) {
        return Boom.boomify(new Error(error), { statusCode: 456 })
    }
}

export const voucherController = { findVoucherById, controlVoucherGeneration }