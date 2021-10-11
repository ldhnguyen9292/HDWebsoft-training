import { Lifecycle } from "@hapi/hapi"
import { eventModel } from "./../models/event.model";

export const getAllEvent: Lifecycle.Method = async (_request, h) => {
    try {
        const events = await eventModel.find({})
        return events;
    } catch (error) {
        return h.response(new Error(error)).code(500)
    }
}

export const postEvent: Lifecycle.Method = async (request, h) => {
    try {
        const newEvent = await eventModel.create(request.payload)
        return newEvent;
    } catch (error) {
        return h.response(new Error(error)).code(500)
    }
}
