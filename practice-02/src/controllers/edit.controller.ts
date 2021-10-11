import { Lifecycle } from "@hapi/hapi";
import { editModel } from "./../models/edit.model";
import moment from 'moment';
import mongoose, { ClientSession } from 'mongoose'

// const delay = (time: number) => {
//     return new Promise(resolve => setTimeout(resolve, time))
// }

async function retryCommitTransaction(session: ClientSession) {
    try {
        await session.commitTransaction()
        return console.log('transaction is committed');
    } catch (error: any) {
        if (error.errorLabels &&
            error.errorLabels.indexOf('UnknownTransactionCommitResult') >= 0) {
            console.log('UnknownTransactionCommitResult, retry commit...');
            await retryCommitTransaction(session)
        } else {
            return Promise.reject(error)
        }
    }
}

// API1: check if that event is still editable, mark the current editing user.
const isEditing: Lifecycle.Method = async (request, h) => {
    const { event_id } = request.params
    const { user_id } = request.payload as { user_id: string }
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        // const time = Math.random() * 20000
        // console.log(time);
        // delay(time)
        const result = await editModel.updateOne({ event_id }, { $set: { event_id, user_id } }, { upsert: true }).session(session)
        if (result.matchedCount > 0) {
            session.abortTransaction()
            return h.response({ message: "Event is editing" }).code(409)
        }
        const newEdit = await editModel.findOne({ event_id }).session(session)
        const expireTime = moment(newEdit.expireAt).utc(true).format('DD/MM/yyyy HH:mm:ss')
        await retryCommitTransaction(session)
        await session.endSession()

        return h.response({ message: 'Allow to edit event', expireAt: expireTime }).code(200)
    } catch (error) {
        console.log(error);
        return h.response(error).code(500)
    }
}

// API2: allow the frontend to release edits of the current user
const releaseEditButton: Lifecycle.Method = async (request, h) => {
    const { event_id } = request.params
    try {
        await editModel.deleteOne({ event_id })
        return { message: 'Event is free' }
    } catch (error) {
        return h.response(error).code(500)
    }
}

// API3: extend the expire time
const extendExpire: Lifecycle.Method = async (request, h) => {
    const { event_id } = request.params
    try {
        const edit = await editModel.findOne({ event_id })
        if (!edit) return h.response({ message: "Event is not editing" }).code(404)

        // Extend the expire time
        edit.expireAt = new Date()
        const expireTime = moment(edit.expireAt).utc(true).format('DD/MM/yyyy HH:mm:ss')
        await edit.save()
        return { message: 'Expire time is extended', expireAt: expireTime }
    } catch (error) {
        return h.response(error).code(500)
    }
}

export const editController = {
    isEditing, releaseEditButton, extendExpire
}