import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    writeupUrl: z.string().url().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
