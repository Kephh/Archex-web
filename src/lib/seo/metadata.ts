import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetaInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function createMetadata({ title, description, path = "/", noIndex }: MetaInput): Metadata {
  const pageTitle = title || `${siteConfig.name} | ${siteConfig.tagline}`;
  const socialTitle = title ? `${title} | ${siteConfig.name}` : pageTitle;
  const canonical = new URL(path, siteConfig.url).toString();

  return {
    title: pageTitle,
    description: description || siteConfig.description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: socialTitle,
      description: description || siteConfig.description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website"
    }
  };
}
