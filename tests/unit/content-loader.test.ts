import { describe, expect, it } from "vitest";
import { getEntries, parseFrontmatter } from "@/lib/content/loader";

describe("content loader", () => {
  it("loads published services", () => {
    expect(getEntries("services").length).toBeGreaterThan(0);
  });

  it("parses frontmatter arrays", () => {
    const result = parseFrontmatter("---\ntitle: Test\ntags: [one, two]\n---\nBody");
    expect(result.meta.tags).toEqual(["one", "two"]);
  });
});
