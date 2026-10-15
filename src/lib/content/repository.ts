import "server-only";

import { cache } from "react";
import { z } from "zod";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/config/env";
import { getEntries as getSourceEntries, getEntry as getSourceEntry } from "@/lib/content/loader";
import { contentMetaSchema, type ContentEntry, type ContentKind } from "@/lib/content/schema";
import { selectFeaturedEntries } from "@/lib/content/homepage";
import { homepagePageContentSchema, validateHomepagePageBlock } from "@/lib/content/page-blocks";
import type { ServiceCategory, ServiceDefinition } from "@/lib/services/catalog";

export type HomepagePageContent = {
  hero: { eyebrow: string; title: string; description: string };
  services: { eyebrow: string; title: string; description: string };
  industries: { eyebrow: string; title: string; description: string };
  work: { eyebrow: string; title: string; description: string };
  insights: { eyebrow: string; title: string; description: string };
  cta: { title: string; description: string; label: string };
};

export type HomepageContent = {
  pageContent: HomepagePageContent;
  processStages: Array<{ slug: string; title: string; body: string }>;
  services: ContentEntry[];
  industries: ContentEntry[];
  work: ContentEntry[];
  insights: ContentEntry[];
};

const sourceProcessStages = [
  {
    slug: "understand",
    title: "Understand the problem",
    body: "We clarify the business goal, technical constraints, users, and what success actually needs to look like."
  },
  {
    slug: "scope",
    title: "Agree on scope and priorities",
    body: "We define the initial boundary, the biggest risks, and the work that creates the most value in the first phase."
  },
  {
    slug: "design",
    title: "Design and engineer the solution",
    body: "The work is shaped around real product and operational needs, supported by clear technical decisions and review points."
  },
  {
    slug: "deliver",
    title: "Test, deliver, and improve",
    body: "We release in reasonable increments, gather evidence, and keep improving the system with knowledge that is already in hand."
  }
];

const sourceHomepageContent: HomepagePageContent = {
  hero: {
    eyebrow: "SOFTWARE ENGINEERING · AI INTEGRATION · MODERNIZATION",
    title: "Build what’s next. Improve what’s already there.",
    description:
      "Archex helps businesses build digital products, integrate AI into practical workflows, connect systems, and improve software they depend on."
  },
  services: {
    eyebrow: "What we do",
    title: "Engineering for what comes next.",
    description: "Capabilities shaped around real business problems and maintainable delivery."
  },
  industries: {
    eyebrow: "Who we help",
    title: "Different industries. Real engineering challenges.",
    description: "Patterns for teams improving products, workflows, and the systems around them."
  },
  work: {
    eyebrow: "Illustrative work",
    title: "Practical patterns, not invented case studies.",
    description:
      "Examples of how careful engineering can improve workflows and software that matter."
  },
  insights: {
    eyebrow: "Insights",
    title: "Thinking for better software decisions.",
    description:
      "Notes on building products, integrating AI, and improving systems without unnecessary risk."
  },
  cta: {
    title: "Build something useful. Improve something important.",
    description:
      "Tell us what you are trying to change, and we can work out the most useful next step.",
    label: "Start a conversation"
  }
};

const stringArraySchema = z.array(z.string());

const getReadingTime = (body: string) =>
  Math.max(1, Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 200));

function stringArray(value: unknown) {
  return stringArraySchema.parse(value ?? []);
}

function publicClient(): SupabaseClient {
  if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Database content is enabled but public Supabase configuration is missing.");
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

function hrefFor(kind: ContentKind, slug: string) {
  return kind === "insights" ? `/insights/${slug}` : `/${kind}/${slug}`;
}

function mapEntry(
  kind: ContentKind,
  row: {
    slug: string;
    title: string;
    summary: string;
    body: string;
    category?: string | null;
    tags?: unknown;
    seo_title?: string | null;
    seo_description?: string | null;
    published_at?: string | null;
    updated_at_content?: string | null;
    featured?: boolean;
    work_type?: "illustrative" | "client_case_study";
  }
): ContentEntry {
  const metadata = contentMetaSchema.parse({
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    category: row.category || undefined,
    tags: stringArray(row.tags),
    seoTitle: row.seo_title || undefined,
    seoDescription: row.seo_description || undefined,
    date: row.published_at || undefined,
    updated: row.updated_at_content || undefined,
    status: "published",
    featured: row.featured || false,
    illustrative: row.work_type === "illustrative",
    related: []
  });
  return {
    kind,
    ...metadata,
    body: row.body,
    href: hrefFor(kind, row.slug),
    readingTime: getReadingTime(row.body)
  };
}

async function databaseEntries(kind: ContentKind): Promise<ContentEntry[]> {
  const supabase = publicClient();

  if (kind === "services") {
    const { data: categories, error: categoryError } = await supabase
      .from("service_categories")
      .select("id,slug,name");
    if (categoryError)
      throw new Error(`Could not load service categories: ${categoryError.message}`);
    const categoryMap = new Map((categories || []).map((category) => [category.id, category]));
    const { data, error } = await supabase
      .from("services")
      .select(
        "slug,title,summary,introduction,approach,problems,capabilities,seo_title,seo_description,display_order,featured,published_at,category_id"
      )
      .eq("status", "published")
      .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
      .order("display_order");
    if (error) throw new Error(`Could not load published services: ${error.message}`);
    return data.map((row) => {
      const category = categoryMap.get(row.category_id);
      return mapEntry("services", {
        ...row,
        body: [row.introduction, row.approach].filter(Boolean).join("\n\n"),
        category: category?.name,
        tags: category?.slug ? [category.slug] : []
      });
    });
  }

  const table =
    kind === "modernization"
      ? "modernization_entries"
      : kind === "work"
        ? "work_items"
        : kind;
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("status", "published")
    .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
    .order(kind === "insights" ? "published_at" : "display_order", {
      ascending: kind !== "insights"
    });
  if (error) throw new Error(`Could not load published ${kind}: ${error.message}`);

  return data.map((row) => mapEntry(kind, row));
}

export const getEntriesAsync = cache(async (kind: ContentKind) => {
  if (env.CONTENT_SOURCE !== "database") return getSourceEntries(kind);
  return databaseEntries(kind);
});

export const getEntryAsync = cache(async (kind: ContentKind, slug: string) => {
  if (env.CONTENT_SOURCE !== "database") return getSourceEntry(kind, slug);
  return (await getEntriesAsync(kind)).find((entry) => entry.slug === slug);
});

export const getPublishedServiceCategories = cache(async (): Promise<ServiceCategory[]> => {
  if (env.CONTENT_SOURCE !== "database") {
    const { serviceCategories } = await import("@/lib/services/catalog");
    return serviceCategories;
  }

  const supabase = publicClient();
  const { data: categories, error: categoryError } = await supabase
    .from("service_categories")
    .select("id,slug,name,description,display_order")
    .eq("is_active", true)
    .order("display_order");
  if (categoryError)
    throw new Error(`Could not load published service categories: ${categoryError.message}`);

  const { data: services, error: serviceError } = await supabase
    .from("services")
    .select("slug,title,summary,category_id,problems,capabilities,display_order")
    .eq("status", "published")
    .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
    .order("display_order");
  if (serviceError)
    throw new Error(`Could not load published service catalogue: ${serviceError.message}`);

  const servicesByCategory = new Map<string, ServiceDefinition[]>();
  for (const service of services) {
    const category = categories.find((item) => item.id === service.category_id);
    if (!category) continue;
    const definition: ServiceDefinition = {
      slug: service.slug,
      title: service.title,
      summary: service.summary,
      category: category.name,
      categorySlug: category.slug,
      href: `/services/${service.slug}`,
      problems: stringArray(service.problems),
      capabilities: stringArray(service.capabilities)
    };
    const existing = servicesByCategory.get(category.slug) || [];
    servicesByCategory.set(category.slug, [...existing, definition]);
  }

  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    description: category.description,
    services: servicesByCategory.get(category.slug) || []
  }));
});

export const getPublishedServiceBySlug = cache(async (slug: string) => {
  if (env.CONTENT_SOURCE !== "database") {
    const { getCatalogService } = await import("@/lib/services/catalog");
    return getCatalogService(slug);
  }
  const categories = await getPublishedServiceCategories();
  return categories
    .flatMap((category) => category.services)
    .find((service) => service.slug === slug);
});

export const getRelatedInsights = cache(async (slug: string) => {
  if (env.CONTENT_SOURCE !== "database") {
    const entry = getSourceEntry("insights", slug);
    if (!entry?.related.length) return [];
    return (await getSourceEntries("insights")).filter((item) => entry.related.includes(item.slug));
  }

  const supabase = publicClient();
  const { data: insight, error: insightError } = await supabase
    .from("insights")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (insightError) throw new Error(`Could not find insight relations: ${insightError.message}`);
  if (!insight) return [];

  const { data: relations, error: relationError } = await supabase
    .from("insight_relations")
    .select("related_insight_id")
    .eq("insight_id", insight.id);
  if (relationError) throw new Error(`Could not load related insights: ${relationError.message}`);
  const ids = (relations || []).map((relation) => relation.related_insight_id);
  if (!ids.length) return [];

  const { data: related, error: relatedError } = await supabase
    .from("insights")
    .select("*")
    .in("id", ids)
    .eq("status", "published")
    .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
    .order("published_at", { ascending: false });
  if (relatedError) throw new Error(`Could not load related insights: ${relatedError.message}`);
  return (related || []).map((row) => mapEntry("insights", row));
});

function pageContentFromRows(
  rows: Array<{ section_key: string; block_type: string; content: unknown }>
): HomepagePageContent {
  for (const row of rows) validateHomepagePageBlock(row);
  const blocks: Record<string, unknown> = {};
  for (const row of rows) blocks[row.section_key] = row.content;
  return homepagePageContentSchema.parse(blocks);
}

export const getHomepageContent = cache(async (): Promise<HomepageContent> => {
  const [services, industries, work, insights] = await Promise.all([
    getEntriesAsync("services"),
    getEntriesAsync("industries"),
    getEntriesAsync("work"),
    getEntriesAsync("insights")
  ]);

  if (env.CONTENT_SOURCE !== "database") {
    return {
      pageContent: sourceHomepageContent,
      processStages: sourceProcessStages,
      services: selectFeaturedEntries(services),
      industries: selectFeaturedEntries(industries),
      work,
      insights: selectFeaturedEntries(insights)
    };
  }

  const supabase = publicClient();
  const { data, error } = await supabase
    .from("page_content_blocks")
    .select("section_key,block_type,content")
    .eq("page_key", "home")
    .eq("status", "published")
    .order("section_key");
  if (error) throw new Error(`Could not load homepage content blocks: ${error.message}`);
  const { data: processStages, error: processError } = await supabase
    .from("process_stages")
    .select("slug,title,body")
    .eq("status", "published")
    .order("display_order");
  if (processError)
    throw new Error(`Could not load homepage process stages: ${processError.message}`);
  if (!processStages?.length) throw new Error("Published homepage process stages are missing.");

  return {
    pageContent: pageContentFromRows(data || []),
    processStages,
    services: selectFeaturedEntries(services),
    industries: selectFeaturedEntries(industries),
    work,
    insights: selectFeaturedEntries(insights)
  };
});

export const isDatabaseContentEnabled = () => env.CONTENT_SOURCE === "database";
