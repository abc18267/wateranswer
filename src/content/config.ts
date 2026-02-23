import { defineCollection, z } from 'astro:content'

const internalLinkSchema = z.object({
  text: z.string(),
  href: z.string(),
})

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

const baseSchema = z.object({
  title: z.string(),
  description: z.string().max(165),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  primaryKeyword: z.string(),
  silo: z.string(),
  pageType: z.enum(['hub', 'spoke', 'review', 'contaminant', 'howto', 'tool', 'learn']),
  schema: z.array(z.enum(['FAQ', 'HowTo', 'Product', 'BreadcrumbList', 'Article', 'WebPage'])).default([]),
  affiliateDisclosure: z.boolean().default(false),
  internalLinks: z.array(internalLinkSchema).default([]),
  faq: z.array(faqSchema).default([]),
  heroImage: z.string().optional(),
})

const contentCollection = defineCollection({
  type: 'content',
  schema: baseSchema,
})

export const collections = {
  'your-water': contentCollection,
  'testing': contentCollection,
  'treatment': contentCollection,
  'tools': contentCollection,
  'learn': contentCollection,
}
