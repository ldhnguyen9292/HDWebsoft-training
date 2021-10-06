import { isVoucherOver } from './../middleware/voucher.middleware';
import { codeValid, voucherValid } from './../models/voucher.model';
import { voucherController } from "../controllers/voucher.controller";
import { ServerRoute } from '@hapi/hapi'

export const voucherRouter: ServerRoute[] = [{
    method: "GET",
    path: "/voucher/{code}",
    handler: voucherController.findVoucherById,
    options: {
        validate: {
            params: codeValid
        }
    }
}, {
    method: "POST",
    path: "/voucher",
    options: {
        validate: {
            payload: voucherValid
        },
        pre: [{ method: isVoucherOver, assign: 'checkQuantity' }],
        handler: voucherController.controlVoucherGeneration,
    }
}]