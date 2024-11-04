import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authRouter } from './routes/auth';
import { postRouter } from './routes/post';
import { userRouter } from './routes/user';
import { searchRouter } from './routes/search';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_API_KEY: string;
  },
}>();

app.use('/*', cors());

app.route('/api/v1/user', userRouter);
app.route('/api/v1/post', postRouter);
app.route('/api/v1/auth', authRouter);
app.route('/api/v1/search', searchRouter);

export default app;
