import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { contentKindSchema, contentMetaSchema, type ContentEntry, type ContentKind } from "./schema";

const root = path.join(process.cwd(), "content");

function parseScalar(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((part) => part.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return trimmed.replace(/^["']|["']$/g, "");
}

export function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("MDX file is missing frontmatter");
  }

  const meta: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const index = line.indexOf(":");
    if (index === -1) continue;
    meta[line.slice(0, index).trim()] = parseScalar(line.slice(index + 1));
  }

  return { meta, body: match[2].trim() };
}

export function renderMarkdown(body: string) {
  return body
    .split(/\n{2,}/)
    .map((block) => {
      const text = block.trim();
      if (text.startsWith("## ")) return { type: "h2", text: text.slice(3) };
      if (text.startsWith("### ")) return { type: "h3", text: text.slice(4) };
      if (text.startsWith("- ")) {
        return {
          type: "ul",
          items: text.split(/\r?\n/).map((item) => item.replace(/^- /, ""))
        };
      }

      return { type: "p", text };
    });
}

function getReadingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const getEntries = cache((kind: ContentKind): ContentEntry[] => {
  contentKindSchema.parse(kind);
  const dir = path.join(root, kind);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const parsed = parseFrontmatter(raw);
      const meta = contentMetaSchema.parse(parsed.meta);
      return {
        ...meta,
        kind,
        body: parsed.body,
        readingTime: getReadingTime(parsed.body),
        href: kind === "insights" ? `/insights/${meta.slug}` : `/${kind}/${meta.slug}`
      };
    })
    .filter((entry) => entry.status === "published")
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
});

export function getEntry(kind: ContentKind, slug: string) {
  return getEntries(kind).find((entry) => entry.slug === slug);
}
