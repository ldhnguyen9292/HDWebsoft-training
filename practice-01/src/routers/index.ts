import { eventRouter } from './event.router';
import { voucherRouter } from './voucher.router';
import { ServerRoute } from '@hapi/hapi'

export const rootRouter: ServerRoute[] = eventRouter.concat(voucherRouter)