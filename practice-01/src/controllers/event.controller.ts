import { eventModel } from './../models/event.model';
import { Request, ResponseToolkit } from '@hapi/hapi'

// List events
const getEvents = async (request: Request, h: ResponseToolkit) => {
    return "get all events"
}

// Get event by id
const getEventById = async (request: Request, h: ResponseToolkit) => {
    return "get event by id"
}

// Create one event
const postEvent = async (request: Request, h: ResponseToolkit) => {
    try {
        return "post"
    } catch (error) {
        return h.response({ message: error }).code(500)
    }
}

// Update event
const updateEvent = async (request: Request, h: ResponseToolkit) => {
    return "update event"
}

// Delete event
const deleteEventById = async (request: Request, h: ResponseToolkit) => {
    return "delete event by id"
}

export const eventController = { getEvents, postEvent, getEventById, updateEvent, deleteEventById }