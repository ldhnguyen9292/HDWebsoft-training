"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
var posts = [{
        id: 0,
        title: "Hello",
        content: "Xin chào mọi người"
    }, {
        id: 1,
        title: "Bài tập",
        content: "Bài tập luyện viết swagger"
    }
];
exports.postRouter = [
    {
        method: "GET",
        path: "/post",
        handler: function () {
            return posts;
        }
    }, {
        method: "GET",
        path: "/post/{id}",
        handler: function (request, h) {
            var id = request.params.id;
            var post = posts.find(function (post) { return post.id === Number(id); });
            if (!post)
                return h.response({ message: "post not found" }).code(400);
            return post;
        }
    }, {
        method: "POST",
        path: "/post",
        handler: function (request, h) {
            var _a = request.payload, title = _a.title, content = _a.content;
            var id = Math.random() * 100;
            var newPost = {
                id: id, title: title, content: content
            };
            posts.push(newPost);
            return newPost;
        }
    }
];
