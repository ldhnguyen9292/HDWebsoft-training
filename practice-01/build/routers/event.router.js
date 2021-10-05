"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
var event_controller_1 = require("./../controllers/event.controller");
var event_model_1 = require("./../models/event.model");
exports.eventRouter = [{
        method: "GET",
        path: "/event",
        handler: event_controller_1.eventController.getEvents
    }, {
        method: "GET",
        path: "/event/{id}",
        handler: event_controller_1.eventController.getEventById,
        options: {
            validate: {
                params: event_model_1.idValid
            }
        }
    }, {
        method: "PUT",
        path: "/event/{id}",
        handler: event_controller_1.eventController.postEvent,
        options: {
            validate: {
                payload: event_model_1.eventValid,
                params: event_model_1.idValid
            }
        }
    }, {
        method: "DELETE",
        path: "/event/{id}",
        handler: event_controller_1.eventController.deleteEventById,
        options: {
            validate: {
                params: event_model_1.idValid
            }
        }
    }, {
        method: "POST",
        path: "/event",
        handler: event_controller_1.eventController.postEvent,
        options: {
            validate: {
                payload: event_model_1.eventValid
            }
        }
    }];
