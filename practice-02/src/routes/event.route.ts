import { getAllEvent, postEvent } from './../controllers/event.controller';
import { ServerRoute } from "@hapi/hapi";
import { EventValid } from "./../interfaces/event.interface";

export const eventRouter: ServerRoute[] = [{
    path: '/event',
    method: "GET",
    options: {
        handler: getAllEvent,
        description: "Get all events",
        notes: "Return all events",
        tags: ['api', "event"],
    }
}, {
    path: '/event',
    method: "POST",
    options: {
        handler: postEvent,
        description: "Add one event info",
        notes: "Return event info",
        tags: ['api', "event"],
        validate: {
            payload: EventValid
        }
    }
}]