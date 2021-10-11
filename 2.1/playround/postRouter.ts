import Hapi, { ServerRoute } from "@hapi/hapi"
import Joi from "joi"

interface Post {
    id: number;
    title: string;
    content: string;
}

let posts: Post[] = [{
    id: 0,
    title: "Hello",
    content: "Xin chào mọi người"
}, {
    id: 1,
    title: "Bài tập",
    content: "Bài tập luyện viết swagger"
}
]

export const postRouter: ServerRoute[] = [
    {
        method: "GET",
        path: "/post",
        handler: (request, h) => {
            return h.response(posts)
        },
        options: {
            tags: ['api', 'post']
        }
    }, {
        method: "GET",
        path: "/post/{id}",
        handler: (request, h) => {
            const { id } = request.params
            const post = posts.find(post => post.id === Number(id))
            if (!post) return h.response({ message: "post not found" }).code(400)
            return h.response(post)
        },
        options: {
            tags: ['api', 'post']
        }
    }, {
        method: "POST",
        path: "/post",
        handler: (request, h) => {
            const { title, content } = request.payload as Post
            const id = Math.random() * 100

            const newPost: Post = {
                id, title, content
            }
            posts.push(newPost)
            return newPost
        },
        options: {
            tags: ['api', 'post'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    content: Joi.string().required()
                })
            }
        }
    }]