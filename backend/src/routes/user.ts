import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt'
import { hashPassword } from "../utils/hashPassword";
import { signupInput, signinInput } from "@raj-thombare/medium-common-types";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { name, email, password } = body;

        const { success } = signupInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existingUser) {
            c.status(409);
            return c.json({ error: 'Email already taken' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({ token });
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

        const { success } = signinInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }

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

        return c.json({ token });
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while signing in" });
    }
})
