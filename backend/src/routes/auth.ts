import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@raj-thombare/medium-common-types";
import { extractUsername, hashPassword } from "../utils";

export const authRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

authRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { email, password } = body;

        const { success } = signinInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({
                message: "Inputs not correct"
            });
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (!user) {
            c.status(404);
            return c.json({ error: "User not found" });
        }

        const hashedInputPassword = await hashPassword(password);
        if (hashedInputPassword !== user.password) {
            c.status(401);
            return c.json({ error: "Incorrect password" });
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        const { password: _, ...userInfo } = user;

        return c.json({ token, userInfo });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while signing in" });
    }
});

authRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { name, email, password, about } = body;
        const username = extractUsername(email);
        const { success } = signupInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({
                message: "Inputs not correct"
            });
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                email: email.toLowerCase()
            }
        });

        if (existingUser) {
            c.status(409);
            return c.json({ error: 'Email already taken' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                username: username,
                password: hashedPassword,
                about: about
            }
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        const { password: _, ...userInfo } = user;

        return c.json({ token, userInfo });

    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while signing up" });
    }
});
