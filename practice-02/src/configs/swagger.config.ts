import { ServerRegisterPluginObject } from '@hapi/hapi'
import inert from '@hapi/inert'
import vision from '@hapi/vision'
import hapiswagger, { RegisterOptions } from 'hapi-swagger'

const swaggerOptions: RegisterOptions = {
    info: {
        title: "Edit Event"
    },
    tags: [{
        name: "event",
        description: "Everything about event"
    }, {
        name: "user",
        description: "Everything about user"
    }, {
        name: "edit event",
        description: "Handle edit event"
    }],
    grouping: "tags"
}

export const plugins: Array<ServerRegisterPluginObject<any>> = [
    { plugin: inert },
    { plugin: vision },
    {
        plugin: hapiswagger,
        options: swaggerOptions
    }
]