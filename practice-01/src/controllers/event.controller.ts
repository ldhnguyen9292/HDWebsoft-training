import { eventModel } from './../models/event.model';
import { Lifecycle } from '@hapi/hapi';
import { EventPayLoad } from '../interfaces/event.interface';

// List events
const getEvents: Lifecycle.Method = async (request, h) => {
    const events = await eventModel.find({})
    return h.response(events).code(200)
}

// Get event by id
const getEventById: Lifecycle.Method = async (request, h) => {
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
const postEvent: Lifecycle.Method = async (request, h) => {
    try {
        const { name, description, max_quantity } = request.payload as EventPayLoad
        const newEvent = new eventModel({ name, description, max_quantity })
        await newEvent.save()
        return h.response(newEvent).code(201)
    } catch (error) {
        return h.response({ message: error }).code(500)
    }
}

// Update event
const updateEvent: Lifecycle.Method = async (request, h) => {
    try {
        const { id } = request.params
        const { name, description, max_quantity } = request.payload as EventPayLoad
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
const deleteEventById: Lifecycle.Method = async (request, h) => {
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