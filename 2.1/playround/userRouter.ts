import { Request, ServerRoute } from "@hapi/hapi";
import Joi from "joi";

interface User {
    id: number;
    username: string;
    password: string;
}

let userList: User[] = []

export const userRouter: ServerRoute[] = [
    {
        method: "GET",
        path: "/user",
        handler: (request: Request, h: any) => {
            return userList
        }
    }, {
        method: "GET",
        path: "/user/{userId}",
        handler: (request: Request, h: any) => {
            const userId = request.params.userId;
            const user = userList.find(user => user.id === Number(userId))
            if (!user) h.response({ message: "user not found" })
            return user
        }
    }, {
        method: "POST",
        path: "/user",
        handler: (request: Request, h: any) => {
            const { username, password }: any = request.payload
            const newUser: User = {
                id: Math.random(),
                username,
                password
            }
            userList.push(newUser)
            return newUser
        },
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    }, {
        method: "DELETE",
        path: "/user/{userId}",
        handler: (request: Request, h: any) => {
            const userId = request.params.userId
            const user = userList.find(user => user.id === Number(userId))
            if (!user) return h.response({ message: "User not found" }).code(400)
            userList = userList.filter(user => user.id !== Number(userId))
            return { message: "Delete user successfully" }
        }
    },
    {
        method: "PUT",
        path: "/user",
        handler: (request: Request, h: any) => {
            const { userId, username, password }: any = request.payload
            const user = userList.find(user => user.id === Number(userId))
            if (!user) return h.response({ message: 'User not found' }).code(201)
            user.username = username;
            user.password = password;
            userList = [...userList, user]
            return user
        }
    }
]