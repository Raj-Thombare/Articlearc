import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { isAuth } from "../middleware/is-auth";
import { createPostInput, updatePostInput } from "@raj-thombare/medium-common-types";

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    },
    Variables: {
        userId: string
    }
}>();

postRouter.use('/*', isAuth);

postRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');
    try {
        const body = await c.req.json();

        const { success } = createPostInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
            }
        })

        return c.json({
            id: post.id
        })
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while creating post" })
    }
})

postRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();

        const { success } = updatePostInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }

        const post = await prisma.post.update({
            where: { id: body.id },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        if (!post) {
            c.status(404)
            return c.json({ error: "post not found" })
        }

        return c.json({
            id: post.id
        })
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while updating post" })
    }
})

postRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({});

        if (!posts) {
            c.status(404)
            return c.json({ error: "posts not found" })
        }

        return c.json({ posts })
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while fetching posts" })
    }
})

postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param('id')

    try {
        const post = await prisma.post.findFirst({
            where: { id: id },
        })

        if (!post) {
            c.status(404)
            return c.json({ error: "post not found" })
        }

        return c.json({ post })
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while fetching post" })
    }
})

