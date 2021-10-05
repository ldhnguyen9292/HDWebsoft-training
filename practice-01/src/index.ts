import Hapi from '@hapi/hapi'
import mongoose from 'mongoose'
import mongoConfig from './config/mongodb.json'
import { routerPlugin } from './plugins/router.plugin'

const server = Hapi.server({
    port: process.env.PORT || 8888,
    host: "localhost"
})

const init = async () => {
    try {
        await server.register({
            plugin: routerPlugin, routes: {
                prefix: "/api/v1"
            }
        })
        await server.start()
        console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
        await mongoose.connect(mongoConfig.atlasUrl)
        console.log('Mongodb connect successfully!');
    } catch (error) {
        console.log(error);
    }
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init()
