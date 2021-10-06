import Boom from "@hapi/boom"
import { MidllewarePayload, VoucherMethod } from "../interfaces/voucher.interface"
import { eventModel } from "../models/event.model"

export const isVoucherOver: VoucherMethod = async (request, h) => {
    // Làm sao interface lại được payload
    const { event_id }: any = request.payload
    const event = await eventModel.findById(event_id)
    if (!event) return Boom.notFound('Event not found')
    if (event.max_quantity === 0) {
        return Boom.boomify(new Error('Quantity of voucher is over'), { statusCode: 456 })
    } else return h.continue
}

