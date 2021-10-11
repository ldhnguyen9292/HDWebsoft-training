import { userModel } from './../models/user.model';
import { Lifecycle } from "@hapi/hapi"

export const getAllUsers: Lifecycle.Method = async (_request, h) => {
    try {
        const users = await userModel.find({})
        return users;
    } catch (error) {
        return h.response(new Error(error)).code(500)
    }
}

export const postUser: Lifecycle.Method = async (request, h) => {
    try {
        const { name } = request.payload as { name: string }
        const user = await userModel.findOne({ name })
        if (user) return h.response({ message: 'User exist' }).code(409)
        const newUser = await userModel.create({ name })
        return newUser;
    } catch (error) {
        return h.response(new Error(error)).code(500)
    }
}
