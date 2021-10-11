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
        handler: (request, h) => {
            return h.response(userList)
        },
        options: {
            description: 'Get user list',
            notes: 'Returns user list',
            tags: ['api', 'user']
        }
    }, {
        method: "GET",
        path: "/user/{userId}",
        handler: (request, h) => {
            const userId = request.params.userId;
            const user = userList.find(user => user.id === Number(userId))
            if (!user) h.response({ message: "user not found" })
            return h.response(user)
        },
        options: {
            description: 'Get user by id',
            notes: 'Returns a user info by the id passed in the path',
            tags: ['api', 'user'],
            validate: {
                params: Joi.object({
                    userId: Joi.number().required()
                })
            }
        }
    }, {
        method: "POST",
        path: "/user",
        handler: (request: Request, h: any) => {
            const { username, password }: any = request.payload as User
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
            },
            tags: ['api', 'user']
        }
    }, {
        method: "DELETE",
        path: "/user/{userId}",
        handler: (request, h) => {
            const userId = request.params.userId
            const user = userList.find(user => user.id === Number(userId))
            if (!user) return h.response({ message: "User not found" }).code(400)
            userList = userList.filter(user => user.id !== Number(userId))
            return h.response({ message: "Delete user successfully" })
        },
        options: {
            description: 'Delete user by id',
            notes: 'Delete user by id',
            tags: ['api', 'user'],
            validate: {
                params: Joi.object({
                    userId: Joi.number().required()
                })
            }
        }
    },
    {
        method: "PUT",
        path: "/user",
        handler: (request, h) => {
            const { userId, username, password }: any = request.payload as User
            const user = userList.find(user => user.id === Number(userId))
            if (!user) return h.response({ message: 'User not found' }).code(201)
            user.username = username;
            user.password = password;
            userList = [...userList, user]
            return h.response(user)
        },
        options: {
            validate: {
                payload: Joi.object({
                    userId: Joi.number().required(),
                    username: Joi.string().required(),
                    password: Joi.string().required()
                })
            },
            tags: ['api', 'user']
        }
    }
]