import { plugins } from './configs/swagger.config';
import Hapi from "@hapi/hapi"
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { rootRouter } from './routes/root.route';

const init = async () => {
    try {
        const server = Hapi.server({
            port: 3000,
            host: "localhost"
        })
        await server.register(plugins)
        server.route(rootRouter)
        await server.start()
        console.log('Server running on ', server.info.uri);

        config()
        const url = process.env.DB_MONGO_URL as string
        connect(url)
        console.log('Mongo atlas running');
    } catch (error) {
        console.log(error);
    }
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init()

