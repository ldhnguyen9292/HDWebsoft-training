import { addEmailToQueue } from './../queues/email.queue';
import { voucherModel, codeValid } from './../models/voucher.model';
import Boom from "@hapi/boom";
import { Voucher, VoucherPayLoad } from './../interfaces/voucher.interface';
import { Lifecycle } from '@hapi/hapi'
import { eventModel } from './../models/event.model'
import mongoose, { ClientSession } from 'mongoose';
import referralCodes from 'referral-codes'

// Get voucher by code
const findVoucherById: Lifecycle.Method = async (request, h) => {
    const code = request.params.code;
    const voucher = await voucherModel.findOne({ code })
    if (!voucher) return h.response({ message: "Voucher not found" }).code(404)
    return h.response(voucher).code(200)
}

// Generate voucher
const generateVoucher = async (event_id: string, email: string, session: ClientSession) => {
    const codeList = referralCodes.generate({
        count: 1,
        length: 10,
        charset: "0123456789",
        prefix: "TT-"
    })

    const newVoucher = await voucherModel.create([{
        event_id,
        name: "Voucher Tết trung thu",
        description: `Voucher có giá trị giảm giá ${Math.ceil(Math.random() * 50)}%`,
        email,
        code: codeList[0]
    }], { session })
    return newVoucher
}

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
            console.log('Error during commit ...');
            throw error;
        }
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Control voucher generation
const controlVoucherGeneration: Lifecycle.Method = async (request, h) => {
    const { event_id, email } = request.payload as VoucherPayLoad
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const event = await eventModel.findById(event_id).session(session)
        if (!event) {
            await session.abortTransaction()
            return Boom.notFound('Event not found')
        }
        // Compare quantity and voucher count
        if (event.max_quantity <= 0) {
            await session.abortTransaction()
            return Boom.boomify(new Error('Quantity of voucher is over'), { statusCode: 456 })
        }
        // Delay random
        // const random = Math.random() * 20000
        // console.log(random)
        // await delay(random)

        event.max_quantity--
        await event.save()
        // Create voucher
        const newVoucher = await generateVoucher(event_id, email, session)

        await commitWithRetry(session)
        await session.endSession()
        addEmailToQueue(email, newVoucher[0].code)
        return h.response(newVoucher).code(201)
    } catch (error) {
        await session.abortTransaction()
        return h.response({ message: error }).code(456)
    }
}

export const voucherController = { findVoucherById, controlVoucherGeneration }