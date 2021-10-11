import { eventRouter } from './event.route';
import { ServerRoute } from "@hapi/hapi";
import { userRouter } from './user.route';
import { editRouter } from './edit.route';

export const rootRouter: ServerRoute[] = eventRouter.concat(userRouter, editRouter)