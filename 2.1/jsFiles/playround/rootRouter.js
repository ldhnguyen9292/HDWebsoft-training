"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
var hitApiRouter_1 = require("./hitApiRouter");
var postRouter_1 = require("./postRouter");
var userRouter_1 = require("./userRouter");
exports.root = userRouter_1.userRouter.concat(postRouter_1.postRouter, hitApiRouter_1.hitApiRouter);
