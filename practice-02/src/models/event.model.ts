import { model, Schema } from "mongoose";
import { Event } from './../interfaces/event.interface'

export const eventSchema = new Schema<Event>({
    name: String,
    description: String
})

export const eventModel = model<Event>('event', eventSchema)