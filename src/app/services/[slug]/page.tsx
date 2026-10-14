import { notFound } from "next/navigation";
import { DetailPage } from "@/components/sections/detail-page";
import { getEntries, getEntry } from "@/lib/content/loader";
import { createMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getEntries("services").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("services", slug);
  if (!entry) return {};
  return createMetadata({
    title: entry.seoTitle || entry.title,
    description: entry.seoDescription || entry.summary,
    path: `/services/${entry.slug}`
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("services", slug);
  if (!entry) notFound();
  return <DetailPage entry={entry} backHref="/services" backLabel="All services" />;
}
