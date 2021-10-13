import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      websocket: { route: "$connect" }
    },
    {
      websocket: { route: "$disconnect" }
    }
  ]
}
