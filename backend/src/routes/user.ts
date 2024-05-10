import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { KVNamespace } from '@cloudflare/workers-types';
import { sign } from 'hono/jwt'
import { hashPassword } from "../utils/hashPassword";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
        USERS_KV: KVNamespace
    }
}>();

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { email, password } = body;

        const userKey = `user:${email.toLowerCase()}`;
        const existingUser = await c.env.USERS_KV.get(userKey);

        if (existingUser) {
            c.status(409);
            return c.json({ error: 'Email already taken' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        await c.env.USERS_KV.put(
            userKey,
            JSON.stringify({
                email,
                password: hashedPassword,
            })
        );

        return c.json({ token: token });
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
})

userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { email, password } = body;

        const hashedInputPassword = await hashPassword(password);

        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: hashedInputPassword
            }
        })

        if (!user) {
            c.status(404)
            return c.json({ error: "User not found" })
        }

        if (hashedInputPassword !== user?.password) {
            c.status(401)
            return c.json({ error: "Incorrect password" })
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({ token: token });
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while signing in" });
    }
})
