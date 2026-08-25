import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/articles" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    author: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    type: z.enum(["article", "statement", "announcement"]).default("article"),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/authors" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    socialLinks: z
      .object({
        website: z.string().url().optional(),
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
      })
      .optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/categories" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  articles,
  authors,
  categories,
};
