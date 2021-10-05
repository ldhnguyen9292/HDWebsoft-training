import Hapi, { ServerRoute } from "@hapi/hapi"

interface MyRequest extends Hapi.Request {
    payload: {
        id: number
        title: string
        content: string
    }
    params: {
        id: number
    }
}

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
        handler: () => {
            return posts
        }
    }, {
        method: "GET",
        path: "/post/{id}",
        handler: (request: MyRequest, h: Hapi.ResponseToolkit) => {
            const { id } = request.params
            const post = posts.find(post => post.id === Number(id))
            if (!post) return h.response({ message: "post not found" }).code(400)
            return post
        }
    }, {
        method: "POST",
        path: "/post",
        handler: (request: MyRequest, h: any) => {
            const { title, content } = request.payload
            const id = Math.random() * 100

            const newPost: Post = {
                id, title, content
            }
            posts.push(newPost)
            return newPost
        }
    }]