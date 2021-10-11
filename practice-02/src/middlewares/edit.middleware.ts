import { boomify } from "@hapi/boom";
import { Lifecycle } from "@hapi/hapi";
import { editModel } from "./../models/edit.model";

export const isEventEditing: Lifecycle.Method = async (request, h) => {
    const { event_id } = request.params
    const edit = await editModel.findOne({ event_id })
    if (edit) return boomify(new Error("Event is editing"), { statusCode: 409 })
    return h.continue
}