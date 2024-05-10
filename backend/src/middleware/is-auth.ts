import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'

export const isAuth = createMiddleware(async (c, next) => {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    const token = jwt.split('Bearer ')[1];
    try {
        const payload = await verify(token, c.env.JWT_SECRET);

        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }

        c.set("userId", payload.id)

        await next();
    } catch (error) {
        c.status(403)
        return c.json({ error: "you are not logged in" })
    }
})