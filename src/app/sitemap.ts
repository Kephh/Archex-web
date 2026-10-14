import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getEntries } from "@/lib/content/loader";

export default function sitemap(): MetadataRoute.Sitemap {
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
  const entries = ["services", "modernization", "industries", "work", "insights"].flatMap((kind) =>
    getEntries(kind as never)
  );

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
