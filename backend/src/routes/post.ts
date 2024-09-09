import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { isAuth } from "../middleware/is-auth";
import { createPostInput, updatePostInput } from "@raj-thombare/medium-common-types";
import { slugify } from "../utils/slugify";

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    },
    Variables: {
        userId: string
    }
}>();

// Create post
postRouter.post('/', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');

    try {
        const body = await c.req.json();
        const { success } = createPostInput.safeParse(body);

        if (!success) {
            c.status(400); 
            return c.json({
                message: "Inputs not correct"
            });
        }
        const category = slugify(body.category);
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
                category: category
            }
        });

        return c.json({
            id: post.id
        }, 201); 
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while creating post" });
    }
});

// Update post
postRouter.put('/:id', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    const postId = c.req.param('id');

    try {
        const body = await c.req.json();
        const { success } = updatePostInput.safeParse(body);

        if (!success) {
            c.status(400); 
            return c.json({
                message: "Inputs not correct"
            });
        }

        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                title: body.title,
                content: body.content,
            }
        });

        if (!post) {
            c.status(404);
            return c.json({ error: "Post not found" });
        }

        return c.json({
            id: post.id
        });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while updating post" });
    }
});

// Delete post
postRouter.delete('/:id', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id');
    const userId = c.get('userId');

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (post?.authorId !== userId) {
            c.status(403);
            return c.json({ error: "Forbidden: You can only delete your own posts" });
        }

        await prisma.post.delete({
            where: { id: postId },
        });

        return c.json({ msg: "Post deleted successfully" }, 200);
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while deleting post" });
    }
});

// Get all posts
postRouter.get('/all', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                category: true,
                authorId: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        if (!posts || posts.length === 0) {
            c.status(404);
            return c.json({ error: "Posts not found" });
        }

        return c.json({ posts });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while fetching posts" });
    }
});

// Get post details
postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id');

    try {
        const post = await prisma.post.findFirst({
            where: { id: postId },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                category: true,
                author: {
                    select: {
                        name: true,
                        email: true,
                        id: true
                    }
                }
            }
        });

        if (!post) {
            c.status(404);
            return c.json({ error: "Post not found" });
        }

        return c.json({ post });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while fetching post" });
    }
});

// Get posts by tag
postRouter.get('/tag/:tag', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const tag = c.req.param('tag');

    try {
        const posts = await prisma.post.findMany({
            where: {
                category: {
                    has: tag,
                },
            }
        });

        if (!posts) {
            c.status(404);
            return c.json({ error: "Posts not found" });
        }

        return c.json({ posts });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while fetching posts" });
    }
});


