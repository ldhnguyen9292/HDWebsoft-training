// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 5,
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        // request: {
        //   schema: {
        //     'application/json': schema
        //   }
        // }
      },
    },
    {
      schedule: {
        rate: [`rate(1 minute)`]
      }
    }
  ]
}
