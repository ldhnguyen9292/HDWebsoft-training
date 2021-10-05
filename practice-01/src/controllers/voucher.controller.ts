import { Request, ResponseToolkit } from '@hapi/hapi'

// Get voucher by code
const getVoucher = async (request: Request, h: ResponseToolkit) => {
    const code = request.params.code;
    return code
}

const postVoucher = async (request: Request, h: ResponseToolkit) => {
    const payload = request.payload;
    return payload
}

export const voucherController = { getVoucher, postVoucher }