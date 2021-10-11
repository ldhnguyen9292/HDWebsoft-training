import { Document, ObjectId } from "mongoose";

// Interface as Type
export interface Voucher {
    event_id: ObjectId
    name: string
    description: string
    email: string
    code: string
}

export interface VoucherModel extends Voucher, Document { }

export interface VoucherPayLoad {
    event_id: ObjectId
    email: string
}
