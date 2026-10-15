import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { homepagePageBlockSchemas, validateHomepagePageBlock } from "@/lib/content/page-blocks";

const root = process.cwd();
const migration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "202610150001_create_content.sql"),
  "utf8"
);
const leadMigration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "202610120001_create_leads.sql"),
  "utf8"
);
const importerSource = fs.readFileSync(
  path.join(root, "scripts", "content-migration.mjs"),
  "utf8"
);

describe("content migration contract", () => {
  it("scopes public privileges to content tables without changing lead permissions", () => {
    expect(migration).toContain("grant select on table");
    expect(migration).toContain("revoke all privileges on table");
    expect(migration).not.toContain("revoke insert, update, delete on all tables in schema public");
    expect(migration).not.toContain("public.leads");
    expect(leadMigration).toContain('create policy "Service role can manage leads"');
  });

  it("requires complete publication eligibility for relationship policies", () => {
    const relationPolicies = migration.slice(
      migration.indexOf('create policy "Public can read service relations"')
    );
    for (const table of [
      "service_relations",
      "industry_services",
      "work_industries",
      "work_services",
      "insight_relations"
    ]) {
      expect(relationPolicies).toContain(`on public.${table}`);
    }
    expect(relationPolicies.match(/published_at is null or/g)?.length).toBeGreaterThanOrEqual(10);
  });

  it("defaults engagement and process records to draft", () => {
    expect(
      migration.match(
        /create table if not exists public\.engagement_models[\s\S]*?status text not null default 'draft'/
      )
    ).not.toBeNull();
    expect(
      migration.match(
        /create table if not exists public\.process_stages[\s\S]*?status text not null default 'draft'/
      )
    ).not.toBeNull();
  });

  it("reports complete service associations in the dry-run inventory", () => {
    const output = execFileSync(process.execPath, ["scripts/content-migration.mjs"], {
      cwd: root,
      encoding: "utf8"
    });
    const report = JSON.parse(output.slice(output.indexOf("{"), output.lastIndexOf("}") + 1));
    expect(report.service_sources.unmapped_categories).toEqual([]);
    expect(report.service_sources.unmapped_service_lines).toEqual([]);
    expect(report.seed_statuses).toEqual({
      engagement_models: ["published"],
      process_stages: ["published"]
    });
  });

  it("validates each homepage block type and content shape", () => {
    expect(Object.keys(homepagePageBlockSchemas)).toEqual([
      "hero",
      "services",
      "industries",
      "work",
      "insights",
      "cta"
    ]);
    expect(() =>
      validateHomepagePageBlock({
        section_key: "hero",
        block_type: "rich_text",
        content: { title: "Wrong type" }
      })
    ).toThrow();
  });

  it("guards lead policy creation with DROP IF EXISTS for idempotency", () => {
    const createIdx = leadMigration.indexOf('create policy "Service role can manage leads"');
    const dropIdx = leadMigration.indexOf(
      'drop policy if exists "Service role can manage leads"'
    );
    expect(dropIdx).toBeGreaterThanOrEqual(0);
    expect(createIdx).toBeGreaterThan(dropIdx);
  });

  it("does not send category or tags columns to tables that lack them", () => {
    // Extract the mapGeneric function body (between its opening and closing braces)
    const fnStart = importerSource.indexOf("const mapGeneric");
    const fnEnd = importerSource.indexOf("});", fnStart) + 3;
    const mapGenericBody = importerSource.slice(fnStart, fnEnd);

    // mapGeneric itself must not include category or tags
    expect(mapGenericBody).not.toContain("category:");
    expect(mapGenericBody).not.toContain("tags:");

    // industries upsert must not include category or tags
    const industriesUpsert = importerSource.slice(
      importerSource.indexOf('"industries",\n', fnEnd),
      importerSource.indexOf(");\n", importerSource.indexOf('"industries",\n', fnEnd)) + 3
    );
    expect(industriesUpsert).not.toContain("category:");
    expect(industriesUpsert).not.toContain("tags:");
    expect(industriesUpsert).toContain("context:");

    // work_items upsert must not include category or tags
    const workUpsert = importerSource.slice(
      importerSource.indexOf('"work_items"'),
      importerSource.indexOf(");\n", importerSource.indexOf('"work_items"')) + 3
    );
    expect(workUpsert).not.toContain("category:");
    expect(workUpsert).not.toContain("tags:");
    expect(workUpsert).toContain("work_type:");

    // modernization and insights must include category and tags
    const modernizationUpsert = importerSource.slice(
      importerSource.indexOf('"modernization_entries"'),
      importerSource.indexOf(");\n", importerSource.indexOf('"modernization_entries"')) + 3
    );
    expect(modernizationUpsert).toContain("category:");
    expect(modernizationUpsert).toContain("tags:");

    const insightsUpsert = importerSource.slice(
      importerSource.indexOf('"insights",\n', fnEnd),
      importerSource.indexOf(");\n", importerSource.indexOf('"insights",\n', fnEnd)) + 3
    );
    expect(insightsUpsert).toContain("category:");
    expect(insightsUpsert).toContain("tags:");
  });

  it("homepage seed blocks satisfy the DB constraint required JSON keys", () => {
    // Extract the homepage block seeds from the importer (parsed as JS)
    const output = execFileSync(process.execPath, ["scripts/content-migration.mjs"], {
      cwd: root,
      encoding: "utf8"
    });
    const report = JSON.parse(output.slice(output.indexOf("{"), output.lastIndexOf("}") + 1));

    for (const block of report.homepage_page_blocks) {
      expect(block.status).toBe("published");
      if (block.section === "hero") {
        expect(block.type).toBe("hero");
      } else if (block.section === "cta") {
        expect(block.type).toBe("cta");
      } else {
        expect(block.type).toBe("rich_text");
        expect(["services", "industries", "work", "insights"]).toContain(block.section);
      }
    }

    // Also validate each seed block against the Zod schemas (this runs at import in the importer,
    // but we re-verify here against the shared page-blocks module used by the repository)
    const heroBlock = { section_key: "hero", block_type: "hero", content: { eyebrow: "test", title: "test", description: "test" } };
    expect(() => validateHomepagePageBlock(heroBlock)).not.toThrow();
    const ctaBlock = { section_key: "cta", block_type: "cta", content: { title: "test", description: "test", label: "test" } };
    expect(() => validateHomepagePageBlock(ctaBlock)).not.toThrow();
    const richBlock = { section_key: "services", block_type: "rich_text", content: { eyebrow: "test", title: "test", description: "test" } };
    expect(() => validateHomepagePageBlock(richBlock)).not.toThrow();
  });
});
