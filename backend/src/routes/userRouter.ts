import { Hono } from "hono";
import { Prisma } from '@prisma/client/edge'
import { sign } from "hono/jwt";
import { hashPassword, verifyPassword } from "../utils/helperFunctions";
import { setPrismaToContext } from "../middlewares";

type Environment = {
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    prisma: any
  }
}

export const userRouter = new Hono<Environment>();

userRouter.use('/*', setPrismaToContext); 

userRouter.post('/signup', async (c) => {
	try {
    const body = await c.req.json();
    const { email, password, name } = body || {};
    if (!email || !password) {
      c.status(400)
      return c.json({ message: 'Missing required fields: email and password' });
    }

    const hashedPassword = await hashPassword(password); 
    const prisma = c.get('prisma');
    
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword, // Combine salt and hash
        name: name || null,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(201)
    return c.json({ jwt: token });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') { // Unique constraint violation (email)
        c.status(400)
        return c.json({ message: 'Email already exists' });
      } else {
        console.error('Prisma error:', error);
        c.status(500)
        return c.json({ message: 'Internal server error' });
      }
    } else {
      console.error('Unknown error:', error);
      c.status(500)
      return c.json({ message: 'Internal server error' });
    }
  }
})

userRouter.post('/signin', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body || {};
    if (!email || !password) {
      c.status(400)
      return c.json({ message: 'Missing required fields: email\/password' });
    }
    const prisma = c.get('prisma');
    const user = await prisma.user.findFirst({
      where: { email }
    });

    if(!user) {
      c.status(400)
      return c.json({ message: 'Email/password is incorrect' });
    }

    const isValidPassword = await verifyPassword(user?.password, password);
    if(!isValidPassword) {
      c.status(400)
      return c.json({ message: 'Email/password is incorrect' });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(201)
    return c.json({ jwt: token });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error:', error);
      c.status(500)
      return c.json({ message: 'Internal server error' });
    } else {
      console.error('Unknown error:', error);
      c.status(500)
      return c.json({ message: 'Internal server error' });
    }
  }
})