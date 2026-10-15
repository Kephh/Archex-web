import type { ContentEntry } from "./schema";

export function selectFeaturedEntries(entries: ContentEntry[]) {
  return entries.filter((entry) => entry.status === "published" && entry.featured);
}
