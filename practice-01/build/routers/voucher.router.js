"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherRouter = void 0;
var voucher_model_1 = require("./../models/voucher.model");
var voucher_controller_1 = require("../controllers/voucher.controller");
exports.voucherRouter = [{
        method: "GET",
        path: "/voucher/{code}",
        handler: voucher_controller_1.voucherController.getVoucher
    }, {
        method: "POST",
        path: "/voucher",
        handler: voucher_controller_1.voucherController.postVoucher,
        options: {
            validate: {
                payload: voucher_model_1.voucherValid
            }
        }
    }];
