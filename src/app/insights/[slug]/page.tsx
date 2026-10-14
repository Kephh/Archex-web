import { notFound } from "next/navigation";
import { DetailPage } from "@/components/sections/detail-page";
import { getEntries, getEntry } from "@/lib/content/loader";
import { createMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getEntries("insights").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("insights", slug);
  return entry
    ? {
        ...createMetadata({
          title: entry.seoTitle || entry.title,
          description: entry.seoDescription || entry.summary,
          path: `/insights/${entry.slug}`
        }),
        openGraph: {
          ...createMetadata({
            title: entry.seoTitle || entry.title,
            description: entry.seoDescription || entry.summary,
            path: `/insights/${entry.slug}`
          }).openGraph,
          type: "article"
        }
      }
    : {};
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry("insights", slug);
  if (!entry) notFound();
  return (
    <DetailPage
      entry={entry}
      relatedEntries={getEntries("insights")}
      backHref="/insights"
      backLabel="Insights"
    />
  );
}
