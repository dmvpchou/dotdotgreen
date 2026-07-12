import { defineCollection, z } from 'astro:content';

const brands = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['food', 'craft', 'tribe', 'weekday']),
    tagline: z.string(),
    featured: z.boolean().default(false),
    attendDays: z.array(z.string()).default([]),
    stations: z.array(z.string()).default([]),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    line: z.string().optional(),
    website: z.string().optional(),
  }),
});

export const collections = { brands };
