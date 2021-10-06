import { Request } from "@hapi/hapi";

export interface Event {
    name: string
    description: string
    max_quantity: number
}

export interface EventRequest extends Request {
    payload: {
        name: string
        description: string
        max_quantity: number
    }
    params: {
        id: string
    }
}
