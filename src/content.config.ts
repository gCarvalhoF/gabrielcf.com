import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().nullable().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().nullable().optional(),
    coverAlt: z.string().nullable().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().nullable().optional(),
    liveUrl: z.string().url().nullable().optional(),
    writeupUrl: z.string().url().nullable().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable().optional(),
    featured: z.boolean().default(false),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/home' }),
  schema: z.object({
    headline: z.string(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/about' }),
  schema: z.object({}),
});

const contact = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/contact' }),
  schema: z.object({
    email: z.string(),
    github: z.string().url().nullable().optional(),
    linkedin: z.string().url().nullable().optional(),
  }),
});

export const collections = { posts, projects, home, about, contact };
