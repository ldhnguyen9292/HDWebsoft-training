import { Lifecycle, PayloadCompressionDecoderSettings, PayloadOutput, Request, ResponseToolkit, RouteOptionsPayload } from "@hapi/hapi";
import mongoose from "mongoose";
import { Readable } from "stream";
import { InternalSymbolName } from "typescript";

export interface Voucher {
    event_id: object
    name: string
    description: string
    email: string
    code: string
}

export interface VoucherRequest extends Request {
    payload: {
        event_id: string
        email: string
    }
    params: {
        code: string
    }
}

type Method = (request: VoucherRequest, h: ResponseToolkit, err?: Error) => Lifecycle.ReturnValue;
export interface VoucherMethod extends Method, Lifecycle.Method { }

export type NewVoucher = (mongoose.Document<any, any, Voucher> & Voucher & {
    _id: mongoose.Types.ObjectId;
})[]

export type MidllewarePayload = {
    event_id: string
    email: string
} | string | object | Readable | Buffer