import { Hono } from 'hono'
import { PrismaClient, Prisma } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from "hono/jwt";
import { userRouter } from './routes/userRouter';
import { blogRouter } from './routes/blogRouter';

type Environment = {
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: string,
    prisma: any
  }
}

const app = new Hono<Environment>();

app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  c.set('prisma', prisma);
  await next();
})

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
export default app
