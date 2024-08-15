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

        await prisma.user.delete({
            where: { id: id },
        });

        return c.json({ msg: "User deleted successfully" }, 200);
    } catch (error) {
        c.status(500); // Changed to 500 Internal Server Error for unexpected errors
        return c.json({ error: "Error while deleting user" });
    }
});

// Get user details
userRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param('id');

    try {
        const user = await prisma.user.findFirst({
            where: { id: id },
            select: {
                id: true,
                name: true,
                email: true,
                posts: {
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
                }
            }
        });

        if (!user) {
            c.status(404);
            return c.json({ error: "User not found" });
        }

        return c.json({ user }, 200);
    } catch (error) {
        c.status(500); // Changed to 500 Internal Server Error for unexpected errors
        return c.json({ error: "Error while fetching user" });
    }
});
