import { ServerRoute } from "@hapi/hapi";
import { getAllUsers, postUser } from "./../controllers/user.controller";
import { UserValid } from "./../interfaces/user.interface";

export const userRouter: ServerRoute[] = [{
    path: '/user',
    method: "GET",
    options: {
        handler: getAllUsers,
        description: "Get all users",
        notes: "Return all users",
        tags: ['api', "user"],
    }
}, {
    path: '/user',
    method: "POST",
    options: {
        handler: postUser,
        description: "Post one user",
        notes: "Return user info",
        tags: ['api', "user"],
        validate: {
            payload: UserValid
        }
    }
}]