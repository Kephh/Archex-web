import { notFound } from "next/navigation";
import { DetailPage } from "@/components/sections/detail-page";
import { getEntriesAsync, getEntryAsync } from "@/lib/content/repository";
import { createMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return (await getEntriesAsync("modernization")).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryAsync("modernization", slug);
  return entry
    ? createMetadata({
        title: entry.title,
        description: entry.summary,
        path: `/modernization/${entry.slug}`
      })
    : {};
}

export default async function ModernizationDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntryAsync("modernization", slug);
  if (!entry) notFound();
  return <DetailPage entry={entry} backHref="/modernization" backLabel="Modernization" />;
}
