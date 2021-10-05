'use strict';
import Hapi, { Request } from "@hapi/hapi";
import { root } from './rootRouter';
import Path from 'path'
import hitApiAdd from "./bull-redis";

export const init = async function () {
    const server = Hapi.server({
        port: process.env.PORT || 8888,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../swagger/swagger-ui/dist')
            }
        }
    });
    await server.register(require('@hapi/inert'));
    await server.start()
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);

    // Routes will go here  
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.'
            }
        }
    });
    server.realm.modifiers.route.prefix = '/api/v1'
    // server.ext('onRequest', hitApiAdd)
    server.route(root)
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
