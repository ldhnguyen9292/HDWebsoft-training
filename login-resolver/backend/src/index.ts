import { UserResolver } from './resolvers/userResolver';
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { graphqlHTTP } from 'express-graphql'
import * as cors from 'cors'
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/authResolver";
import { getErrorCode } from "./errorConstants";

const port = process.env.PORT || 8888

createConnection().then(async connection => {
    // create express app
    const app = express();
    app.use(cors())
    app.use(express.json());

    const schema = await buildSchema({
        resolvers: [AuthResolver, UserResolver]
    })

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true,
        customFormatErrorFn: (err) => {
            const error = getErrorCode(err.message)
            return ({ message: error.message, statusCode: error.statusCode })
        }
    }))

    // start express server
    app.listen(port, () => { console.log(`Connect at http://localhost:${port}`) });

}).catch(error => console.log(error));
