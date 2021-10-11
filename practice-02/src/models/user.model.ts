import { model, Schema } from "mongoose";
import { User } from './../interfaces/user.interface'

export const userSchema = new Schema<User>({
    name: {
        type: String, unique: true, index: true
    }
})

export const userModel = model<User>('user', userSchema)