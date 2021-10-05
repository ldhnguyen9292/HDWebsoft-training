"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var joi_1 = __importDefault(require("joi"));
var userList = [];
exports.userRouter = [
    {
        method: "GET",
        path: "/user",
        handler: function (request, h) {
            return userList;
        }
    }, {
        method: "GET",
        path: "/user/{userId}",
        handler: function (request, h) {
            var userId = request.params.userId;
            var user = userList.find(function (user) { return user.id === Number(userId); });
            if (!user)
                h.response({ message: "user not found" });
            return user;
        }
    }, {
        method: "POST",
        path: "/user",
        handler: function (request, h) {
            var _a = request.payload, username = _a.username, password = _a.password;
            var newUser = {
                id: Math.random(),
                username: username,
                password: password
            };
            userList.push(newUser);
            return newUser;
        },
        options: {
            validate: {
                payload: joi_1.default.object({
                    username: joi_1.default.string().required(),
                    password: joi_1.default.string().required()
                })
            }
        }
    }, {
        method: "DELETE",
        path: "/user/{userId}",
        handler: function (request, h) {
            var userId = request.params.userId;
            var user = userList.find(function (user) { return user.id === Number(userId); });
            if (!user)
                return h.response({ message: "User not found" }).code(400);
            userList = userList.filter(function (user) { return user.id !== Number(userId); });
            return { message: "Delete user successfully" };
        }
    },
    {
        method: "PUT",
        path: "/user",
        handler: function (request, h) {
            var _a = request.payload, userId = _a.userId, username = _a.username, password = _a.password;
            var user = userList.find(function (user) { return user.id === Number(userId); });
            if (!user)
                return h.response({ message: 'User not found' }).code(201);
            user.username = username;
            user.password = password;
            userList = __spreadArray(__spreadArray([], userList), [user]);
            return user;
        }
    }
];
