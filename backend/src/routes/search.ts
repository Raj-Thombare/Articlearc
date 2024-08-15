import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const searchRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    },
    Variables: {
        userId: string
    }
}>();


// Search users and posts
searchRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const query = c.req.query('query');

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

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                    {
                        email: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ]
            }
        })

        return c.json({
            posts, users
        }, 200);
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while searching posts" });
    }
});