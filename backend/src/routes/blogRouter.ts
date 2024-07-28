import { Hono } from "hono";
import { authenticateUser, setPrismaToContext } from "../middlewares";
import { createBlogInput, updateBlogInput } from "@arvind-debug/medium-common";

type Environment = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}; 

export const blogRouter = new Hono<Environment>();

blogRouter.use("/*", authenticateUser, setPrismaToContext);

blogRouter.post("/", async (c) => {
  try {
    const contentType = c.req.header('Content-Type');
    const body = await c.req.json();
    const {success, error: zError } = createBlogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({ message: 'Invalid inputs', error: zError });
    }
    const { title, content, published } = body || {};
    const prisma = c.get("prisma");
    const userId = c.get("userId");
    if (!title || !content) {
      c.status(400);
      return c.json({ message: "Missing required fields: title and content" });
    }
    const blog = await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        authorId: userId,
      }
    });
    c.status(200);
    return c.json({ message: "Success created blog post!", blodId: blog?.id || null });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

blogRouter.put("/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const {success, error: zError } = updateBlogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({ message: 'Invalid inputs', error: zError });
    }
    const { title, content, published } = body || {};
    const prisma = c.get("prisma");
    const userId = c.get("userId");

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        published
      }
    });
    c.status(200);
    return c.json({ message: "Success edited blog post!" });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

blogRouter.get("/b/bulk", async (c) => {
  try {
    const prisma = c.get("prisma");
    const blogPosts = await prisma.post.findMany();
    c.status(200);
    return c.json({ blogPosts });
  } catch (error) {
    console.error(error);
    c.status(411);
    return c.json({ message: "Error while fetching blog posts" });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const prisma = c.get("prisma");

    const blogPost = await prisma.post.findFirst({
      where: {
        id,
      }
    });
    c.status(200);
    return c.json({ blogPost });
  } catch (error) {
    console.error(error);
    c.status(411);
    return c.json({ message: "Error while fetching blog post" });
  }
});