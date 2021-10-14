import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { graphqlHTTP } from 'express-graphql'
import * as cors from 'cors'
import { Request, Response } from "express";
import { Routes } from "./routes";
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
        resolvers: [AuthResolver],
    })

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true,
        customFormatErrorFn: (err) => {
            const error = getErrorCode(err.message)
            return ({ message: error.message, statusCode: error.statusCode })
        }
    }))

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // start express server
    app.listen(port, () => { console.log(`Connect at http://localhost:${port}`) });

}).catch(error => console.log(error));
