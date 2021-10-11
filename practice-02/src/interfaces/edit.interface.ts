import Joi from "joi";
import { ObjectId } from "mongoose";

export interface Edit {
    _id: ObjectId
    event_id: string,
    user_id: string,
    expireAt?: Date
}

export const EditParams = Joi.object({
    event_id: Joi.string().required(),
})

export const EditPayload = Joi.object({
    user_id: Joi.string().required()
})