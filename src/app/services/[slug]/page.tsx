import { notFound } from "next/navigation";
import { DetailPage } from "@/components/sections/detail-page";
import { CatalogServiceDetail } from "@/components/sections/catalog-service-detail";
import {
  getEntriesAsync,
  getEntryAsync,
  getPublishedServiceBySlug,
  getPublishedServiceCategories
} from "@/lib/content/repository";
import { createMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  const categories = await getPublishedServiceCategories();
  return [
    ...(await getEntriesAsync("services")).map((entry) => ({ slug: entry.slug })),
    ...categories.flatMap((category) =>
      category.services.map((service) => ({ slug: service.slug }))
    )
  ].filter(
    (item, index, all) => all.findIndex((candidate) => candidate.slug === item.slug) === index
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryAsync("services", slug);
  const catalogService = await getPublishedServiceBySlug(slug);
  if (!entry && !catalogService) return {};
  return createMetadata({
    title: entry?.seoTitle || entry?.title || catalogService?.title || "",
    description: entry?.seoDescription || entry?.summary || catalogService?.summary || "",
    path: `/services/${slug}`
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryAsync("services", slug);
  if (entry) return <DetailPage entry={entry} backHref="/services" backLabel="All services" />;
  const catalogService = await getPublishedServiceBySlug(slug);
  if (catalogService) return <CatalogServiceDetail service={catalogService} />;
  notFound();
}
