import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const allowProduction = process.argv.includes("--allow-production");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const output =
  process.argv.find((value) => value.startsWith("--output="))?.slice("--output=".length) ||
  path.join("backups", `database-content-${timestamp}.json`);

if (
  (process.env.NODE_ENV === "production" || process.env.SUPABASE_ENV === "production") &&
  !allowProduction
) {
  throw new Error("Refusing to export from production without --allow-production.");
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  throw new Error("Content export requires SUPABASE_URL and SUPABASE_SECRET_KEY.");
}

const tables = [
  "service_lines",
  "service_categories",
  "services",
  "service_relations",
  "modernization_entries",
  "industries",
  "industry_services",
  "work_items",
  "work_industries",
  "work_services",
  "insights",
  "insight_relations",
  "engagement_models",
  "process_stages",
  "page_content_blocks"
];
const client = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false }
});
const exportData = { exported_at: new Date().toISOString(), tables: {} };

for (const table of tables) {
  const { data, error } = await client.from(table).select("*");
  if (error) throw new Error(`Could not export ${table}: ${error.message}`);
  exportData.tables[table] = data || [];
}

const absoluteOutput = path.resolve(process.cwd(), output);
fs.mkdirSync(path.dirname(absoluteOutput), { recursive: true });
fs.writeFileSync(absoluteOutput, `${JSON.stringify(exportData, null, 2)}\n`);
console.log(`Content export written to ${path.relative(process.cwd(), absoluteOutput)}.`);
