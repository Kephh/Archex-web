import { notFound } from "next/navigation";
import { DetailPage } from "@/components/sections/detail-page";
import { getEntriesAsync, getEntryAsync, getRelatedInsights } from "@/lib/content/repository";
import { createMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return (await getEntriesAsync("insights")).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryAsync("insights", slug);
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
  const entry = await getEntryAsync("insights", slug);
  if (!entry) notFound();
  return (
    <DetailPage
      entry={entry}
      relatedEntries={await getRelatedInsights(slug)}
      backHref="/insights"
      backLabel="Insights"
    />
  );
}
