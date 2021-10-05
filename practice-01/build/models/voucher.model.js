"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherValid = exports.voucherModel = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = require("mongoose");
var voucherSchema = new mongoose_1.Schema({
    event_id: { type: 'ObjectId', ref: "event" },
    name: String,
    description: String,
    code: String,
});
exports.voucherModel = (0, mongoose_1.model)('voucher', voucherSchema);
exports.voucherValid = joi_1.default.object({
    event_id: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    code: joi_1.default.string().required(),
});
