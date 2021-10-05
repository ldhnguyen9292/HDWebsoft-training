import { rootRouter } from './../routers/index';
import { Server, Plugin } from '@hapi/hapi'
'use strict';

export const routerPlugin: Plugin<any> = {
    name: 'routerPlugin',
    version: '1.0.0',
    register: async function (server: Server, options: any) {
        server.route(rootRouter);
    }
};