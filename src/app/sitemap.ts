import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getEntriesAsync } from "@/lib/content/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/ai-solutions",
    "/modernization",
    "/industries",
    "/work",
    "/engagement-models",
    "/how-we-work",
    "/about",
    "/insights",
    "/contact",
    "/start-project",
    "/privacy",
    "/terms"
  ];
  const entries = (
    await Promise.all(
      ["services", "modernization", "industries", "work", "insights"].map((kind) =>
        getEntriesAsync(kind as "services" | "modernization" | "industries" | "work" | "insights")
      )
    )
  ).flat();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`
  }));

  return [
    ...staticEntries,
    ...entries.map((entry) => ({
      url: `${siteConfig.url}${entry.href}`,
      lastModified:
        entry.updated || entry.date ? new Date(entry.updated || entry.date || "") : undefined
    }))
  ];
}
