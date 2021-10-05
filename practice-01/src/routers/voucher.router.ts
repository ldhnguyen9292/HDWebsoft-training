import { voucherValid } from './../models/voucher.model';
import { voucherController } from "../controllers/voucher.controller";
import { ServerRoute } from '@hapi/hapi'

export const voucherRouter: ServerRoute[] = [{
    method: "GET",
    path: "/voucher/{code}",
    handler: voucherController.getVoucher
}, {
    method: "POST",
    path: "/voucher",
    handler: voucherController.postVoucher,
    options: {
        validate: {
            payload: voucherValid
        }
    }
}]