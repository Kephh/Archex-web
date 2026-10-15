import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const root = process.cwd();
const contentRoot = path.join(root, "content");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

const args = new Set(process.argv.slice(2));
const apply = args.has("--apply");
const allowProduction = args.has("--allow-production");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.join(root, "backups", `content-${timestamp}`);

const strategicLines = [
  [
    "digital-product-custom-software-engineering",
    "Digital Product & Custom Software Engineering",
    "Digital products, internal applications, workflow tools, and integrations shaped around real business problems."
  ],
  [
    "ai-integration-intelligent-automation",
    "AI Integration & Intelligent Automation",
    "AI-enabled workflows with evaluation, safeguards, human review, and the surrounding software needed for dependable use."
  ],
  [
    "web-mobile-cms-digital-commerce",
    "Web, Mobile, CMS & Digital Commerce",
    "Customer-facing web, mobile, content, and commerce experiences built for clear journeys and maintainable delivery."
  ],
  [
    "business-systems-integrations",
    "Business Systems & Integrations",
    "Software and integrations that connect important business processes, data flows, and operational handoffs."
  ],
  [
    "modernization-quality-ongoing-engineering",
    "Modernization, Quality & Ongoing Engineering",
    "Incremental improvement, quality engineering, and durable capacity for systems and products that still matter."
  ]
].map(([slug, title, summary], display_order) => ({
  slug,
  title,
  summary,
  display_order,
  status: "published",
  featured: display_order < 3
}));

const categories = [
  [
    "ai-ml-development",
    "AI & ML Development",
    "Useful AI experiences connected to real workflows, data, and reviewable decisions."
  ],
  [
    "web-cms-development",
    "Web & CMS Development",
    "Customer-facing websites and web applications shaped around clear content and user journeys."
  ],
  [
    "ecommerce-development",
    "Ecommerce Development",
    "Commerce experiences and operational connections designed for maintainable delivery."
  ],
  [
    "mobile-app-development",
    "Mobile App Development",
    "Mobile products that fit the needs of users, teams, and the systems around them."
  ],
  [
    "software-development",
    "Software Development",
    "Product and platform engineering from an initial release through continued improvement."
  ]
].map(([slug, name, description], display_order) => ({
  slug,
  name,
  description,
  display_order,
  is_active: true
}));

const strategicLineForCategory = {
  "ai-ml-development": "ai-integration-intelligent-automation",
  "web-cms-development": "web-mobile-cms-digital-commerce",
  "ecommerce-development": "web-mobile-cms-digital-commerce",
  "mobile-app-development": "web-mobile-cms-digital-commerce",
  "software-development": "digital-product-custom-software-engineering"
};

const mdxServiceCategory = {
  "ai-integration": ["ai-ml-development", "AI & ML Development"],
  "application-modernization": ["software-development", "Software Development"]
};

const industrySeeds = [
  [
    "software-saas-technology",
    "Software, SaaS & Technology",
    "Product teams need dependable delivery, clearer architecture, and practical ways to integrate AI without losing trust in the system.",
    "Roadmap pressure, platform complexity, integration boundaries, and the need to keep shipping while the product evolves."
  ],
  [
    "retail-ecommerce-consumer-services",
    "Retail, Ecommerce & Consumer Services",
    "Customer journeys, catalogue systems, commerce operations, and internal workflows need to work together without unnecessary friction.",
    "Disconnected commerce tools, unclear ownership across customer and operational workflows, and pressure to improve digital experiences."
  ],
  [
    "professional-business-services",
    "Professional & Business Services",
    "Structured workflows, portals, approvals, and reporting can help service teams spend less time coordinating work manually.",
    "Email-heavy handoffs, fragmented client information, repeatable intake work, and systems that no longer match how teams operate."
  ],
  [
    "logistics-distribution-operations",
    "Logistics, Distribution & Operations",
    "Operational software should make important work visible, dependable, and easier to improve as the organization grows.",
    "Scheduling, status visibility, data handoffs, exception handling, and aging systems that are costly to change."
  ],
  [
    "education-training",
    "Education & Training",
    "Learning and administration workflows benefit from clear user journeys, accessible interfaces, and systems that respect the work of educators and operators.",
    "Fragmented learner journeys, manual administration, reporting needs, and integrations across existing platforms."
  ],
  [
    "healthcare-wellness-operations",
    "Healthcare & Wellness Operations",
    "Operational tools can support intake, scheduling, communication, and reporting while keeping privacy, permissions, and reviewable decisions in view.",
    "Complex coordination, sensitive information boundaries, manual intake, and the need for dependable operational visibility. This page does not claim regulated-industry certification."
  ],
  [
    "manufacturing-distribution-operations",
    "Manufacturing & Distribution Operations",
    "Connected workflows can make production, inventory, quality, and distribution information easier to understand and act on.",
    "Siloed systems, manual reporting, brittle integrations, and process changes that are difficult to introduce safely."
  ]
].map(([slug, title, summary, context], display_order) => ({
  slug,
  title,
  summary,
  body: `## Context\n\n${context}\n\n## Practical direction\n\nArchex can help map the workflow, clarify system boundaries, and improve the software in deliberate increments without assuming a rewrite or claiming prior sector results.`,
  context,
  source: "scripts/content-migration.mjs (industry seed)",
  status: "published",
  featured: display_order < 4,
  display_order
}));

const engagementModels = [
  [
    "discovery-technical-assessment",
    "Discovery and technical assessment",
    "Best when the problem, system context, or next step needs evidence before a larger commitment."
  ],
  [
    "defined-scope-project-delivery",
    "Defined-scope project delivery",
    "Best for a bounded product, integration, or modernization phase with clear checkpoints."
  ],
  [
    "embedded-engineering-capacity",
    "Embedded engineering capacity",
    "Best when a product, design, or operations team needs durable technical capacity."
  ],
  [
    "ongoing-engineering-improvement",
    "Ongoing engineering and improvement",
    "Best for maintenance, releases, quality improvement, and gradual product evolution."
  ]
].map(([slug, title, fit_description], display_order) => ({
  slug,
  title,
  fit_description,
  responsibilities: [],
  deliverables: [],
  collaboration_pattern:
    "Clear ownership, regular review, and written decisions appropriate to the work.",
  display_order,
  status: "published"
}));

const processStages = [
  [
    "understand",
    "Understand the problem",
    "Clarify users, business goals, systems, constraints, and risks."
  ],
  [
    "scope",
    "Agree scope and priorities",
    "Define the initial boundary, largest risks, and work that creates useful evidence."
  ],
  [
    "engineer",
    "Engineer the solution",
    "Build in reviewed increments with explicit technical decisions and integration boundaries."
  ],
  [
    "test-deliver-improve",
    "Test, deliver, and improve",
    "Release carefully, gather evidence, and improve the system as the team learns."
  ]
].map(([slug, title, body], display_order) => ({
  slug,
  title,
  summary: body,
  body,
  display_order,
  status: "published"
}));

const homepagePageBlocks = [
  {
    page_key: "home",
    section_key: "hero",
    block_type: "hero",
    content: {
      eyebrow: "SOFTWARE ENGINEERING · AI INTEGRATION · MODERNIZATION",
      title: "Build what’s next. Improve what’s already there.",
      description:
        "Archex helps businesses build digital products, integrate AI into practical workflows, connect systems, and improve software they depend on."
    },
    status: "published"
  },
  {
    page_key: "home",
    section_key: "services",
    block_type: "rich_text",
    content: {
      eyebrow: "What we do",
      title: "Engineering for what comes next.",
      description: "Capabilities shaped around real business problems and maintainable delivery."
    },
    status: "published"
  },
  {
    page_key: "home",
    section_key: "industries",
    block_type: "rich_text",
    content: {
      eyebrow: "Who we help",
      title: "Different industries. Real engineering challenges.",
      description: "Patterns for teams improving products, workflows, and the systems around them."
    },
    status: "published"
  },
  {
    page_key: "home",
    section_key: "work",
    block_type: "rich_text",
    content: {
      eyebrow: "Illustrative work",
      title: "Practical patterns, not invented case studies.",
      description:
        "Examples of how careful engineering can improve workflows and software that matter."
    },
    status: "published"
  },
  {
    page_key: "home",
    section_key: "insights",
    block_type: "rich_text",
    content: {
      eyebrow: "Insights",
      title: "Thinking for better software decisions.",
      description:
        "Notes on building products, integrating AI, and improving systems without unnecessary risk."
    },
    status: "published"
  },
  {
    page_key: "home",
    section_key: "cta",
    block_type: "cta",
    content: {
      title: "Build something useful. Improve something important.",
      description:
        "Tell us what you are trying to change, and we can work out the most useful next step.",
      label: "Start a conversation"
    },
    status: "published"
  }
];

const homepageBlockSchemas = {
  hero: z.object({
    section_key: z.literal("hero"),
    block_type: z.literal("hero"),
    content: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1)
    })
  }),
  services: z.object({
    section_key: z.literal("services"),
    block_type: z.literal("rich_text"),
    content: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1)
    })
  }),
  industries: z.object({
    section_key: z.literal("industries"),
    block_type: z.literal("rich_text"),
    content: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1)
    })
  }),
  work: z.object({
    section_key: z.literal("work"),
    block_type: z.literal("rich_text"),
    content: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1)
    })
  }),
  insights: z.object({
    section_key: z.literal("insights"),
    block_type: z.literal("rich_text"),
    content: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1)
    })
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

for (const block of homepagePageBlocks) {
  homepageBlockSchemas[block.section_key].parse(block);
}

function filesFor(kind) {
  const directory = path.join(contentRoot, kind);
  return fs.existsSync(directory)
    ? fs
        .readdirSync(directory)
        .filter((file) => file.endsWith(".mdx"))
        .sort()
    : [];
}

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return trimmed.replace(/^["']|["']$/g, "");
}

function parseMdx(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`MDX file is missing frontmatter: ${filePath}`);
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator !== -1)
      meta[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
  }
  return { ...meta, body: match[2].trim(), source: path.relative(root, filePath) };
}

function parseCatalogue() {
  const source = fs.readFileSync(path.join(root, "src", "lib", "services", "catalog.ts"), "utf8");
  const records = [];
  const pattern =
    /^\s*\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*(\[[^\]]*\]),\s*(\[[^\]]*\])\]/gm;
  for (const match of source.matchAll(pattern)) {
    records.push({
      slug: match[1],
      title: match[2],
      summary: match[3],
      category_slug: match[4],
      category_name: match[5],
      problems: JSON.parse(match[6]),
      capabilities: JSON.parse(match[7])
    });
  }
  return records;
}

function contentRecords() {
  const records = {};
  for (const kind of ["services", "modernization", "industries", "work", "insights"]) {
    records[kind] = filesFor(kind).map((file) => parseMdx(path.join(contentRoot, kind, file)));
  }
  const catalogue = parseCatalogue();
  const mdxServices = new Map(records.services.map((record) => [record.slug, record]));
  records.services = [
    ...catalogue.map((service, index) => {
      const mdx = mdxServices.get(service.slug);
      return {
        slug: service.slug,
        title: mdx?.title || service.title,
        summary: mdx?.summary || service.summary,
        body: mdx?.body || "",
        category_slug: service.category_slug,
        category_name: service.category_name,
        problems: service.problems,
        capabilities: service.capabilities,
        status: mdx?.status || "published",
        featured: mdx?.featured || false,
        source: mdx?.source || "src/lib/services/catalog.ts",
        display_order: index
      };
    }),
    ...records.services
      .filter((record) => !catalogue.some((service) => service.slug === record.slug))
      .map((record, index) => {
        const [category_slug, category_name] = mdxServiceCategory[record.slug] || [];
        return {
          ...record,
          category_slug,
          category_name,
          display_order: record.display_order ?? (catalogue.length + index)
        };
      })
  ];
  records.industries = [
    ...industrySeeds,
    ...records.industries.filter(
      (record) => !industrySeeds.some((seed) => seed.slug === record.slug)
    )
  ];
  return records;
}

function inventory(records) {
  const all = Object.values(records).flat();
  const duplicateSlugs = all
    .map((record) => record.slug)
    .filter((slug, index, slugs) => slugs.indexOf(slug) !== index);
  return {
    generated_at: new Date().toISOString(),
    counts: Object.fromEntries(
      Object.entries(records).map(([kind, items]) => [kind, items.length])
    ),
    industry_sources: {
      seeded: records.industries.filter((record) => record.source?.startsWith("scripts")).length,
      existing_mdx: records.industries.filter((record) => record.source?.startsWith("content"))
        .length
    },
    service_sources: {
      catalogue: parseCatalogue().length,
      existing_mdx: filesFor("services").length,
      merged: records.services.length,
      unmapped_categories: records.services
        .filter((record) => !record.category_slug)
        .map((record) => record.slug),
      unmapped_service_lines: records.services
        .filter((record) => !strategicLineForCategory[record.category_slug])
        .map((record) => record.slug)
    },
    duplicate_slugs: [...new Set(duplicateSlugs)],
    records
  };
}

async function upsertMany(client, table, rows) {
  if (!rows.length) return [];
  const { error } = await client.from(table).upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(`Could not import ${table}: ${error.message}`);
  return rows;
}

async function importHomepagePageBlocks(client) {
  const { data, error } = await client
    .from("page_content_blocks")
    .select("section_key,block_type,content,status")
    .eq("page_key", "home");
  if (error) throw new Error(`Could not inspect homepage content blocks: ${error.message}`);

  const existing = new Map((data || []).map((row) => [row.section_key, row]));
  const missing = [];
  const conflicts = [];
  for (const block of homepagePageBlocks) {
    const current = existing.get(block.section_key);
    if (!current) {
      missing.push(block);
      continue;
    }
    if (
      current.status !== "published" ||
      current.block_type !== block.block_type ||
      JSON.stringify(current.content) !== JSON.stringify(block.content)
    ) {
      conflicts.push(block.section_key);
    }
  }

  if (conflicts.length) {
    console.error(
      `Homepage content conflicts detected; existing blocks were not overwritten: ${conflicts.join(", ")}.`
    );
  }
  if (missing.length) {
    const { error: insertError } = await client
      .from("page_content_blocks")
      .upsert(missing, { onConflict: "page_key,section_key" });
    if (insertError)
      throw new Error(`Could not import homepage content blocks: ${insertError.message}`);
  }
  return { missing: missing.length, conflicts };
}

async function applyRecords(records) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("--apply requires SUPABASE_URL and SUPABASE_SECRET_KEY.");
  if (
    (process.env.NODE_ENV === "production" || process.env.SUPABASE_ENV === "production") &&
    !allowProduction
  ) {
    throw new Error(
      "Refusing to apply content import to a production environment without --allow-production."
    );
  }

  fs.mkdirSync(backupDir, { recursive: true });
  fs.writeFileSync(
    path.join(backupDir, "source-inventory.json"),
    JSON.stringify(inventory(records), null, 2)
  );

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  await upsertMany(client, "service_lines", strategicLines);
  await upsertMany(client, "service_categories", categories);

  const categoryIds = new Map();
  const { data: categoryRows, error: categoryError } = await client
    .from("service_categories")
    .select("id,slug");
  if (categoryError)
    throw new Error(`Could not read service categories after import: ${categoryError.message}`);
  for (const row of categoryRows || []) categoryIds.set(row.slug, row.id);

  const serviceLineIds = new Map();
  const { data: serviceLineRows, error: serviceLineError } = await client
    .from("service_lines")
    .select("id,slug");
  if (serviceLineError)
    throw new Error(`Could not read service lines after import: ${serviceLineError.message}`);
  for (const row of serviceLineRows || []) serviceLineIds.set(row.slug, row.id);
  const serviceRows = records.services.map((record) => ({
    slug: record.slug,
    title: record.title,
    summary: record.summary,
    category_id: categoryIds.get(record.category_slug) || null,
    service_line_id: serviceLineIds.get(strategicLineForCategory[record.category_slug]) || null,
    introduction: record.body || "",
    problems: record.problems || [],
    capabilities: record.capabilities || [],
    status: record.status === "draft" ? "draft" : "published",
    featured: Boolean(record.featured),
    display_order: record.display_order ?? 0
  }));
  if (serviceRows.some((row) => !row.category_id)) {
    throw new Error("One or more service records have no matching technical category.");
  }
  if (serviceRows.some((row) => !row.service_line_id)) {
    throw new Error("One or more service records have no matching strategic service line.");
  }
  await upsertMany(client, "services", serviceRows);

  const mapGeneric = (kind, record) => ({
    slug: record.slug,
    title: record.title,
    summary: record.summary,
    body: record.body || "",
    status: record.status === "draft" ? "draft" : "published",
    published_at: record.date || null
  });
  await upsertMany(
    client,
    "modernization_entries",
    records.modernization.map((record, index) => ({
      ...mapGeneric("modernization", record),
      category: record.category || null,
      tags: record.tags || [],
      display_order: index
    }))
  );
  await upsertMany(
    client,
    "industries",
    records.industries.map((record, index) => ({
      ...mapGeneric("industries", record),
      context: record.context || "",
      featured: Boolean(record.featured),
      display_order: index
    }))
  );
  await upsertMany(
    client,
    "work_items",
    records.work.map((record, index) => ({
      ...mapGeneric("work", record),
      work_type: record.illustrative ? "illustrative" : "client_case_study",
      display_order: index
    }))
  );
  await upsertMany(
    client,
    "insights",
    records.insights.map((record) => ({
      ...mapGeneric("insights", record),
      category: record.category || null,
      tags: record.tags || [],
      featured: Boolean(record.featured),
      updated_at_content: record.updated || null
    }))
  );
  await upsertMany(client, "engagement_models", engagementModels);
  await upsertMany(client, "process_stages", processStages);
  return importHomepagePageBlocks(client);
}

const records = contentRecords();
const report = inventory(records);
console.log(
  JSON.stringify(
    {
      mode: apply ? "apply" : "dry-run",
      counts: report.counts,
      industry_sources: report.industry_sources,
      service_sources: report.service_sources,
      seed_statuses: {
        engagement_models: [...new Set(engagementModels.map((record) => record.status))],
        process_stages: [...new Set(processStages.map((record) => record.status))]
      },
      duplicate_slugs: report.duplicate_slugs,
      homepage_page_blocks: homepagePageBlocks.map((block) => ({
        section: block.section_key,
        type: block.block_type,
        status: block.status
      })),
      records: Object.fromEntries(
        Object.entries(records).map(([kind, items]) => [
          kind,
          items.map((record) => ({
            slug: record.slug,
            title: record.title,
            status: record.status || "published",
            source: record.source
          }))
        ])
      ),
      source_files: [
        ...new Set(
          Object.values(records)
            .flat()
            .map((record) => record.source)
        )
      ]
    },
    null,
    2
  )
);

if (report.duplicate_slugs.length) {
  console.error("Duplicate slugs require review before applying.");
  process.exitCode = 2;
} else if (apply) {
  await applyRecords(records);
  console.log(`Import applied. Source backup written to ${path.relative(root, backupDir)}.`);
} else {
  console.log("Dry run only. Re-run with --apply after reviewing the inventory and SQL.");
}
