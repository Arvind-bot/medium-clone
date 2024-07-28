import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createMiddleware } from 'hono/factory'


export const setPrismaToContext = createMiddleware(async (c, next) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    c.set("prisma", prisma);
    await next();
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: `Internal server error. Failed to add prisma to context.` });
  }
})

export const authenticateUser = createMiddleware(async (c, next) => {
  try {
    const authorizationHeader = c.req.header("authorization") || "";
    const token = authorizationHeader?.split(" ")?.[1] || "";
    const jwtVerifyRes = await verify(token, c.env.JWT_SECRET);
    if (jwtVerifyRes?.id) {
      c.set('userId', jwtVerifyRes?.id || "");
      await next();
    } else {
      c.status(403);
      return c.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    c.status(403);
    return c.json({ message: "Unauthorized" });
  }
})