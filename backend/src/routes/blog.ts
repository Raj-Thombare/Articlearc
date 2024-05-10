import { Hono } from "hono";
import { isAuth } from "../middleware/is-auth";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', isAuth);

blogRouter.post('/', (c) => {
    console.log(c.get('userId'));

    return c.text('blog post route')
})

blogRouter.put('/', (c) => {
    return c.text('blog update route')
})

blogRouter.get('/:id', (c) => {
    const id = c.req.param('id')
    console.log(id)
    return c.text('get blog route')
})

blogRouter.get('/bulk', (c) => {
    return c.text('blogs route')
})