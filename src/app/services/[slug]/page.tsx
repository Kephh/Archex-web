import { notFound } from "next/navigation";
import { DetailPage } from "@/components/sections/detail-page";
import { CatalogServiceDetail } from "@/components/sections/catalog-service-detail";
import { getEntries, getEntry } from "@/lib/content/loader";
import { getCatalogService, serviceCatalog } from "@/lib/services/catalog";
import { createMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return [
    ...getEntries("services").map((entry) => ({ slug: entry.slug })),
    ...serviceCatalog.map((service) => ({ slug: service.slug }))
  ].filter((item, index, all) => all.findIndex((candidate) => candidate.slug === item.slug) === index);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("services", slug);
  const catalogService = getCatalogService(slug);
  if (!entry && !catalogService) return {};
  return createMetadata({
    title: entry?.seoTitle || entry?.title || catalogService?.title || "",
    description: entry?.seoDescription || entry?.summary || catalogService?.summary || "",
    path: `/services/${slug}`
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("services", slug);
  if (entry) return <DetailPage entry={entry} backHref="/services" backLabel="All services" />;
  const catalogService = getCatalogService(slug);
  if (catalogService) return <CatalogServiceDetail service={catalogService} />;
  notFound();
}
