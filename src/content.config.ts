import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Posts stay where they've always lived, one .mdx per post
const posts = defineCollection({
  loader: glob({ base: './app/blog/posts', pattern: '*.mdx' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
})

export const collections = { posts }
