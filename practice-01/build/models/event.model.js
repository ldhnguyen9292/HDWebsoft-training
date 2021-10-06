"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValid = exports.eventValid = exports.eventModel = exports.eventSchema = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = require("mongoose");
exports.eventSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    max_quantity: { type: Number, min: [0, 'Must be at least 0, got {VALUE}'], },
}, { timestamps: true });
exports.eventModel = mongoose_1.model('event', exports.eventSchema);
exports.eventValid = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    max_quantity: joi_1.default.number().min(0).required(),
});
exports.idValid = joi_1.default.object({
    id: joi_1.default.string().required()
});
