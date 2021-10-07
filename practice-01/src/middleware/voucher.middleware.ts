import { VoucherPayLoad } from './../interfaces/voucher.interface';
import { Lifecycle } from '@hapi/hapi';
import Boom from "@hapi/boom"
import { eventModel } from "../models/event.model"

// Create middleware to check max_quantity of event first 
// If max_quantity = 0, return error immediately
export const isVoucherOver: Lifecycle.Method = async (request, h) => {
    //C1
    // const { event_id } = request.payload as unknown as { event_id: string }
    //C2
    const { event_id } = request.payload as VoucherPayLoad
    const event = await eventModel.findById(event_id)
    if (!event) return Boom.notFound('Event not found')
    if (event.max_quantity === 0) {
        return Boom.boomify(new Error('Quantity of voucher is over'), { statusCode: 456 })
    } else return h.continue
}

