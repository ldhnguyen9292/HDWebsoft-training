import { Schema } from "mongoose";
import { Edit } from './../interfaces/edit.interface'
import { eventModel } from "./event.model";

export const editSchema = new Schema<Edit>({
    event_id: { type: String, unique: true, index: true },
    user_id: String,
    expireAt: { type: Date, default: new Date(), expires: "5m" } // 5m
})

export const editModel = eventModel.discriminator('EditEvent', editSchema)