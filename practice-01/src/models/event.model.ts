import Joi from 'joi'
import { Schema, model } from 'mongoose';
import { Event } from '../interfaces/event.interface';

export const eventSchema = new Schema<Event>({
    name: String,
    description: String,
    max_quantity: { type: Number, min: [0, 'Must be at least 0, got {VALUE}'], },
}, { timestamps: true })

export const eventModel = model<Event>('event', eventSchema)

export const eventValid = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    max_quantity: Joi.number().min(0).required(),
})

export const idValid = Joi.object({
    id: Joi.string().required()
})