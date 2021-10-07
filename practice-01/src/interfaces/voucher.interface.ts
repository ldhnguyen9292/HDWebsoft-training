import { Document } from "mongoose";

// Interface as Type
export interface Voucher {
    event_id: object
    name: string
    description: string
    email: string
    code: string
}

export interface VoucherModel extends Voucher, Document {}

export interface VoucherPayLoad {
    event_id: string
    email: string
}
