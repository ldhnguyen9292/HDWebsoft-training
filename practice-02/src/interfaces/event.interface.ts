import Joi from "joi";
import { ObjectId } from "mongoose";

export interface Event {
    _id: ObjectId,
    name: string,
    description: string,
}

export type EventPayload = {
    name: string,
    description: string,
}

export const EventValid = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
})