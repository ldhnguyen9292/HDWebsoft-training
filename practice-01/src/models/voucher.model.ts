import Joi from 'joi'
import { Schema, model } from 'mongoose';
import { Voucher } from '../interfaces/voucher.interface';

const voucherSchema = new Schema<Voucher>({
    event_id: { type: 'ObjectId', ref: "event" },
    name: String,
    description: String,
    code: String,
})

export const voucherModel = model<Voucher>('voucher', voucherSchema)

export const voucherValid = Joi.object({
    event_id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    code: Joi.string().required(),
})

