import Joi from "joi";
import { ObjectId } from "mongoose";

export interface User {
    _id: ObjectId,
    name: string,
}

export const UserValid = Joi.object({
    name: Joi.string().required()
})