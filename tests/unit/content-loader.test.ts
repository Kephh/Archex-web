import { describe, expect, it } from "vitest";
import { getEntries, isPubliclyPublished, parseFrontmatter } from "@/lib/content/loader";
import { selectFeaturedEntries } from "@/lib/content/homepage";

describe("content loader", () => {
  it("loads published services", () => {
    expect(getEntries("services").length).toBeGreaterThan(0);
  });

  it("parses frontmatter arrays", () => {
    const result = parseFrontmatter("---\ntitle: Test\ntags: [one, two]\n---\nBody");
    expect(result.meta.tags).toEqual(["one", "two"]);
  });

  it("selects only published featured content for homepage rails", () => {
    const entries = getEntries("insights");
    expect(selectFeaturedEntries(entries).every((entry) => entry.featured)).toBe(true);
    expect(selectFeaturedEntries(entries).every((entry) => entry.status === "published")).toBe(
      true
    );
  });

  it("derives reading time from the article body", () => {
    const entry = getEntries("insights").find(
      (item) => item.slug === "ai-integration-needs-evaluation"
    );
    if (!entry) throw new Error("Expected the featured insight fixture to exist.");
    expect(entry.readingTime).toBe(Math.max(1, Math.ceil(entry.body.split(/\s+/).length / 200)));
  });

  it("rejects draft and future-dated content", () => {
    expect(isPubliclyPublished("draft")).toBe(false);
    expect(isPubliclyPublished("published", "2999-01-01")).toBe(false);
    expect(isPubliclyPublished("published", "2020-01-01")).toBe(true);
  });
});
