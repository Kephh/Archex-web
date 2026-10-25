import { z } from "zod";

export const contentKindSchema = z.enum(["services", "modernization", "industries", "work", "insights"]);

export const contentMetaSchema = z.object({
  title: z.string().min(3),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  summary: z.string().min(20),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  date: z.string().optional(),
  updated: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("published"),
  featured: z.boolean().default(false),
  illustrative: z.boolean().default(false),
  related: z.array(z.string()).default([])
});

export type ContentKind = z.infer<typeof contentKindSchema>;
export type ContentMeta = z.infer<typeof contentMetaSchema>;
export type ContentEntry = ContentMeta & {
  kind: ContentKind;
  body: string;
  href: string;
  readingTime: number;
};
