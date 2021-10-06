import { eventModel } from './../models/event.model';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { EventRequest } from '../interfaces/event.interface';

// List events
const getEvents = async (quest: Request, h: ResponseToolkit) => {
    const events = await eventModel.find({})
    return h.response(events).code(200)
}

// Get event by id
const getEventById = async (request: Request, h: ResponseToolkit) => {
    try {
        const { id } = request.params
        const event = await eventModel.findById(id)
        if (!event) return h.response({ message: "Event not found" }).code(404)
        return h.response(event).code(200)
    } catch (error) {
        h.response({ message: error }).code(500)
    }
}

// Create one event
const postEvent = async (request: EventRequest, h: ResponseToolkit) => {
    try {
        const { name, description, max_quantity } = request.payload
        const newEvent = new eventModel({ name, description, max_quantity })
        await newEvent.save()
        return h.response(newEvent).code(201)
    } catch (error) {
        return h.response({ message: error }).code(500)
    }
}

// Update event
const updateEvent = async (request: EventRequest, h: ResponseToolkit) => {
    try {
        const { id } = request.params
        const { name, description, max_quantity } = request.payload
        const event = await eventModel.findById(id)
        if (!event) return h.response({ message: "Event not found" }).code(404)
        event.name = name
        event.description = description
        event.max_quantity = max_quantity
        await event.save()
        return event
    } catch (error) {
        h.response({ message: error }).code(500)
    }
}

// Delete event
const deleteEventById = async (request: EventRequest, h: ResponseToolkit) => {
    try {
        const { id } = request.params
        const event = await eventModel.findById(id)
        if (!event) return h.response({ message: "Event not found" }).code(404)
        event.delete()
        return h.response({ message: "Delete event successfully" }).code(200)
    } catch (error) {
        h.response({ message: error }).code(500)
    }
}

export const eventController = { getEvents, postEvent, getEventById, updateEvent, deleteEventById }