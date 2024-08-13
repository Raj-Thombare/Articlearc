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

//create post
postRouter.post('/', isAuth, async (c) => {

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
                category: body.category
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

//update post
postRouter.put('/:id', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');

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
            where: { id: userId },
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

//delete post
postRouter.delete('/:id', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const postId = c.req.param('id')

    const userId = c.get('userId');

    try {

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (post?.authorId !== userId) {
            c.status(403);
            return c.json({ error: "forbidden: you can only delete your own posts" });
        }

        await prisma.post.delete({
            where: { id: postId },
        });

        return c.json({ msg: "post deleted successfully" }, 200)
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while deleting post" })
    }
})

//search posts
postRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const query = c.req.query('search');

        if (!query) {
            c.status(400);
            return c.json({ error: "Search query is required" });
        }

        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        content: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });

        if (posts.length === 0) {
            c.status(404);
            return c.json({ error: "Posts not found" });
        }

        return c.json({
            posts,
        }, 200)
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while searching posts" })
    }
})

//get all posts
postRouter.get('/all', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                category: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!posts) {
            c.status(404)
            return c.json({ error: "posts not found" })
        }

        return c.json({ posts }, 200)
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while fetching posts" })
    }
})

//get post details
postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param('id')

    try {
        const post = await prisma.post.findFirst({
            where: { id: id },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                category: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
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

