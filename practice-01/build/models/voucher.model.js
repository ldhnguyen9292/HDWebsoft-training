"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeValid = exports.voucherValid = exports.voucherModel = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = require("mongoose");
var voucherSchema = new mongoose_1.Schema({
    event_id: { type: 'ObjectId', ref: "event", required: true },
    name: String,
    description: String,
    email: { type: String, required: true },
    code: String,
}, {
    timestamps: true
});
exports.voucherModel = mongoose_1.model('voucher', voucherSchema);
exports.voucherValid = joi_1.default.object({
    event_id: joi_1.default.string().min(1).required(),
    email: joi_1.default.string().email().required()
});
exports.codeValid = joi_1.default.object({
    code: joi_1.default.string().min(13).max(13).required()
});
