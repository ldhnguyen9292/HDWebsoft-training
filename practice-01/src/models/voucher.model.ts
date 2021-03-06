import Joi from 'joi'
import { Schema, model } from 'mongoose';
import { Voucher, VoucherModel } from '../interfaces/voucher.interface';
import ObjectId = Schema.Types.ObjectId

const voucherSchema = new Schema<Voucher>({
    event_id: { type: ObjectId, ref: "event", required: true },
    name: String,
    description: String,
    email: { type: String, required: true },
    code: String,
}, {
    timestamps: true
})

export const voucherModel = model<VoucherModel>('voucher', voucherSchema)

export const voucherValid = Joi.object({
    event_id: Joi.string().min(1).required(),
    email: Joi.string().email().required()
})

export const codeValid = Joi.object({
    code: Joi.string().min(13).max(13).required()
})