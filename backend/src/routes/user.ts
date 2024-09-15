import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { isAuth } from "../middleware/is-auth";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

//get users
userRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                about: true
            }
        });

        if (!users) {
            c.status(404);
            return c.json({ error: "Users not found" });
        }

        return c.json({ users }, 200);
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while fetching user" });
    }
});

// Delete user
userRouter.delete('/:id', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param('id');
    //@ts-ignore
    const userId = c.get('userId');

    try {
        if (id !== userId) {
            c.status(403);
            return c.json({ error: "Forbidden: you can only delete your own account" });
        }

        const user = await prisma.user.delete({
            where: { id: id },
        });

        return c.json({ user }, 204);
    } catch (error) {
        c.status(500); 
        return c.json({ error: "Error while deleting user" });
    }
});

// Get user details
userRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param('id');

    try {
        const user = await prisma.user.findFirst({
            where: { id: id },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                about: true,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        createdAt: true,
                        category: true,
                        author: {
                            select: {
                                id: true,  
                                name: true,
                                username: true
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            c.status(404);
            return c.json({ error: "User not found" });
        }

        return c.json({ user }, 200);
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while fetching user" });
    }
});


//remove saved post
userRouter.delete('/:id/bookmark', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    //@ts-ignore
    const userId = c.get('userId');

    try {

        const { postId } = await c.req.json();

        await prisma.bookmark.deleteMany({
            where: {
                userId: userId,
                postId: postId,
            },
        });

        const savedPosts = await prisma.bookmark.findMany({
            where: { userId: userId },
            include: { post: true },
        });

        return c.json({ savedPosts }, 200);
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while removing bookmark" });
    }
});

//save users post
userRouter.post('/:id/bookmark', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    //@ts-ignore
    const userId = c.get('userId');

    try {
        const { postId } = await c.req.json();

        // Validate userId
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return c.json({ error: "Invalid user ID" }, 400);
        }

        // Validate postId
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return c.json({ error: "Invalid post ID" }, 400);
        }

        await prisma.bookmark.create({
            data: {
                userId: userId,
                postId: postId,
            },
        });

        return c.json({ msg: "Post saved successfully" }, 200);
    } catch (error) {
        console.error('Error while saving post:', error);
        return c.json({ error: "Error while saving post" }, 500);
    }
});



//get saved post
userRouter.get('/:id/bookmarks', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    //@ts-ignore
    const userId = c.get('userId');

    try {
        const savedPosts = await prisma.bookmark.findMany({
            where: {
                userId: userId
            },
            include: {
                post: {
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
                },
            }
        })

        return c.json({ "savedPosts": savedPosts }, 200);
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error fetching saved post" });
    }
})

//update user info
userRouter.patch('/:id', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    //@ts-ignore
    const userId = c.get('userId');

    try {
        const { name, email, about } = await c.req.json();

        const update = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name || undefined,
                email: email || undefined,
                about: about || undefined,
            }
        })

        const { password, ...updatedUser } = update;

        return c.json({ updatedUser }, 200);
    } catch (error) {
        console.error('Error while updating user:', error);
        return c.json({ error: "Error while updating" }, 500);
    }
});