import z from 'zod';

// signup schema and type inference
export const signupInput = z.object({
  emial: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
})

export type SignupInput = z.infer<typeof signupInput>

// signin schema and type inference
export const signinInput = z.object({
  emial: z.string().email(),
  password: z.string().min(6)
})

export type SigninInput = z.infer<typeof signinInput>

// blog create schema and type inference
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

// blog edit schema and type inference
export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>
