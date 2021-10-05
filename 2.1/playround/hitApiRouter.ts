import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi'
import { options } from 'joi'
import hitApiAdd from './bull-redis'

export const hitApiRouter: ServerRoute[] = [
    {
        method: "GET",
        path: "/hit-api-1",
        options: {
            pre: [{ method: hitApiAdd, assign: "hitapi" }],
            handler: async () => {
                // await setTimeout(() => console.log('5000'), 5000)
                return 'hitapi1'
            }
        }
    },
    {
        method: "GET",
        path: "/hit-api-2",
        options: {
            pre: [{ method: hitApiAdd, assign: "hitapi" }],
            handler: () => {
                return 'hitapi2'
            }
        }
    }]
