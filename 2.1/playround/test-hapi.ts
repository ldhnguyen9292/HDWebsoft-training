'use strict';
import Hapi, { Request } from "@hapi/hapi";
import inert from "@hapi/inert";
import vision from "@hapi/vision";
import * as HapiSwagger from 'hapi-swagger';
import { root } from './rootRouter';
// import Path from 'path'
// import hitApiAdd from "./bull-redis";

export const init = async function () {
    const server = Hapi.server({
        port: process.env.PORT || 5001,
        host: 'localhost',
    });
    const swaggerOptions: HapiSwagger.RegisterOptions = {
        info: {
            title: 'Test API Documentation'
        },
        tags: [{
            name: 'user',
            description: "Everything about user"
        }, {
            name: "post",
            description: "Everything about post"
        }],
        grouping:"tags",
    };
    const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
        {
            plugin: inert
        },
        {
            plugin: vision
        },
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ];
    await server.register(plugins);
    server.realm.modifiers.route.prefix = '/api/v1'
    server.route(root)
    await server.start()
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    // server.ext('onRequest', hitApiAdd)
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
