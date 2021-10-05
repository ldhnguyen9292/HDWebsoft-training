"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
var event_router_1 = require("./event.router");
var voucher_router_1 = require("./voucher.router");
exports.rootRouter = event_router_1.eventRouter.concat(voucher_router_1.voucherRouter);
