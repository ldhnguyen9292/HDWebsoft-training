"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherController = void 0;
var email_queue_1 = require("./../queues/email.queue");
var voucher_model_1 = require("./../models/voucher.model");
var boom_1 = __importDefault(require("@hapi/boom"));
var event_model_1 = require("./../models/event.model");
var mongoose_1 = __importDefault(require("mongoose"));
var referral_codes_1 = __importDefault(require("referral-codes"));
// Get voucher by code
var findVoucherById = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var code, voucher;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = request.params.code;
                return [4 /*yield*/, voucher_model_1.voucherModel.findOne({ code: code })];
            case 1:
                voucher = _a.sent();
                if (!voucher)
                    return [2 /*return*/, h.response({ message: "Voucher not found" }).code(404)];
                return [2 /*return*/, h.response(voucher).code(200)];
        }
    });
}); };
// Generate voucher
var generateVoucher = function (event_id, email, session) { return __awaiter(void 0, void 0, void 0, function () {
    var code, newVoucher;
    return __generator(this, function (_a) {
        code = referral_codes_1.default.generate({
            count: 1,
            length: 10,
            charset: "0123456789",
            prefix: "TT-"
        });
        newVoucher = voucher_model_1.voucherModel.create([{
                event_id: event_id,
                name: "Voucher Tết trung thu",
                description: "Voucher c\u00F3 gi\u00E1 tr\u1ECB gi\u1EA3m gi\u00E1 " + Math.ceil(Math.random() * 50) + "%",
                email: email,
                code: code[0]
            }], { session: session });
        return [2 /*return*/, newVoucher];
    });
}); };
function commitWithRetry(session) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 6]);
                    return [4 /*yield*/, session.commitTransaction()];
                case 1:
                    _a.sent();
                    console.log('Transaction committed.');
                    return [3 /*break*/, 6];
                case 2:
                    error_1 = _a.sent();
                    if (!(error_1.errorLabels &&
                        error_1.errorLabels.indexOf('UnknownTransactionCommitResult') >= 0)) return [3 /*break*/, 4];
                    console.log('UnknownTransactionCommitResult, retrying commit operation ...');
                    return [4 /*yield*/, commitWithRetry(session)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    console.log('Error during commit ...');
                    throw error_1;
                case 5: return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
// Control voucher generation
var controlVoucherGeneration = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, event_id, email, session, event, newVoucher, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.payload, event_id = _a.event_id, email = _a.email;
                return [4 /*yield*/, mongoose_1.default.startSession()];
            case 1:
                session = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 12, , 14]);
                session.startTransaction();
                return [4 /*yield*/, event_model_1.eventModel.findById(event_id).session(session)];
            case 3:
                event = _b.sent();
                if (!!event) return [3 /*break*/, 5];
                return [4 /*yield*/, session.abortTransaction()];
            case 4:
                _b.sent();
                return [2 /*return*/, boom_1.default.notFound('Event not found')];
            case 5:
                if (!(event.max_quantity <= 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, session.abortTransaction()];
            case 6:
                _b.sent();
                return [2 /*return*/, boom_1.default.boomify(new Error('Quantity of voucher is over'), { statusCode: 456 })];
            case 7:
                // Delay random
                // const random = Math.random() * 20000
                // console.log(random)
                // await delay(random)
                event.max_quantity--;
                return [4 /*yield*/, event.save()
                    // Create voucher
                ];
            case 8:
                _b.sent();
                return [4 /*yield*/, generateVoucher(event_id, email, session)];
            case 9:
                newVoucher = _b.sent();
                return [4 /*yield*/, commitWithRetry(session)];
            case 10:
                _b.sent();
                return [4 /*yield*/, session.endSession()];
            case 11:
                _b.sent();
                email_queue_1.addEmailToQueue(email, newVoucher);
                return [2 /*return*/, h.response(newVoucher).code(201)];
            case 12:
                error_2 = _b.sent();
                return [4 /*yield*/, session.abortTransaction()];
            case 13:
                _b.sent();
                return [2 /*return*/, h.response({ message: error_2 }).code(456)];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.voucherController = { findVoucherById: findVoucherById, controlVoucherGeneration: controlVoucherGeneration };
