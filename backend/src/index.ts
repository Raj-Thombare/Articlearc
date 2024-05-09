import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt'
import { isAuth } from "./middleware/is-auth";
import { hashPassword } from "./utils/hashPassword";
import { KVNamespace } from '@cloudflare/workers-types';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
    USERS_KV: KVNamespace
  },
  Variables: {
    userId: string
  }
}>();

app.use('/api/v1/blog/*', isAuth);

app.post('/api/v1/user/signup', async (c) => {

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
    return c.json({ error: error });
  }
})

app.post('/api/v1/user/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

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

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ token: token })
})

app.post('/api/v1/blog', (c) => {
  console.log(c.get('userId'));

  return c.text('blog post route')
})

app.put('/api/v1/blog', (c) => {
  return c.text('blog put route')
})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id)
  return c.text('get blog route')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('blogs route')
})


export default app;
