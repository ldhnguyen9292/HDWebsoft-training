"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherRouter = void 0;
var voucher_middleware_1 = require("./../middleware/voucher.middleware");
var voucher_model_1 = require("./../models/voucher.model");
var voucher_controller_1 = require("../controllers/voucher.controller");
exports.voucherRouter = [{
        method: "GET",
        path: "/voucher/{code}",
        handler: voucher_controller_1.voucherController.findVoucherById,
        options: {
            validate: {
                params: voucher_model_1.codeValid
            }
        }
    }, {
        method: "POST",
        path: "/voucher",
        options: {
            validate: {
                payload: voucher_model_1.voucherValid
            },
            pre: [{ method: voucher_middleware_1.isVoucherOver, assign: 'checkQuantity' }],
            handler: voucher_controller_1.voucherController.controlVoucherGeneration,
        }
    }];
