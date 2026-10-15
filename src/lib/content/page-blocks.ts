import { z } from "zod";

const textBlock = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1)
});

export const homepagePageContentSchema = z.object({
  hero: textBlock,
  services: textBlock,
  industries: textBlock,
  work: textBlock,
  insights: textBlock,
  cta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    label: z.string().min(1)
  })
});

export const homepagePageBlockSchemas = {
  hero: z.object({
    section_key: z.literal("hero"),
    block_type: z.literal("hero"),
    content: textBlock
  }),
  services: z.object({
    section_key: z.literal("services"),
    block_type: z.literal("rich_text"),
    content: textBlock
  }),
  industries: z.object({
    section_key: z.literal("industries"),
    block_type: z.literal("rich_text"),
    content: textBlock
  }),
  work: z.object({
    section_key: z.literal("work"),
    block_type: z.literal("rich_text"),
    content: textBlock
  }),
  insights: z.object({
    section_key: z.literal("insights"),
    block_type: z.literal("rich_text"),
    content: textBlock
  }),
  cta: z.object({
    section_key: z.literal("cta"),
    block_type: z.literal("cta"),
    content: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      label: z.string().min(1)
    })
  })
};

export function validateHomepagePageBlock(row: {
  section_key: string;
  block_type: string;
  content: unknown;
}) {
  const schema = homepagePageBlockSchemas[row.section_key as keyof typeof homepagePageBlockSchemas];
  if (!schema) throw new Error(`Unsupported homepage page block "${row.section_key}".`);
  return schema.parse(row);
}
