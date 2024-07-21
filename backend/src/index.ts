import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>();

app.post('/api/v1/user/signup', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
	return c.text('signup route')
})

app.post('/api/v1/user/signin', (c) => {
	return c.text('signin route')
})

app.post('/api/v1/blod', (c) => {
	return c.text('post blog route')
})

app.put('/api/v1/blod', (c) => {
	return c.text('edit blog route')
})

app.get('/api/v1/blog/:id', (c) => {
	return c.text('get specific blog route')
})

app.get('/api/v1/blog/bulk', (c) => {
	return c.text('edit all blogs route')
})

export default app
