import { eventController } from './../controllers/event.controller';
import { eventValid, idValid } from './../models/event.model';
import { ServerRoute } from '@hapi/hapi'
import Joi from 'joi';

export const eventRouter: ServerRoute[] = [{
    method: "GET",
    path: "/event",
    handler: eventController.getEvents
}, {
    method: "GET",
    path: "/event/{id}",
    handler: eventController.getEventById,
    options: {
        validate: {
            params: idValid
        }
    }
}, {
    method: "PUT",
    path: "/event/{id}",
    handler: eventController.updateEvent,
    options: {
        validate: {
            payload: eventValid,
            params: idValid
        }
    }
}, {
    method: "DELETE",
    path: "/event/{id}",
    handler: eventController.deleteEventById,
    options: {
        validate: {
            params: idValid
        }
    }
}, {
    method: "POST",
    path: "/event",
    handler: eventController.postEvent,
    options: {
        validate: {
            payload: eventValid
        }
    }
}]