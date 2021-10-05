import { hitApiRouter } from './hitApiRouter';
import { postRouter } from './postRouter';
import { userRouter } from './userRouter'

export const root = userRouter.concat(postRouter, hitApiRouter)