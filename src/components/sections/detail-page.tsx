import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ContentRenderer } from "@/components/sections/content-renderer";
import { DetailHeroVisual } from "@/components/sections/detail-hero-visual";
import type { ContentEntry } from "@/lib/content/schema";

export function DetailPage({
  entry,
  backHref,
  backLabel,
  relatedEntries = []
}: {
  entry: ContentEntry;
  backHref: string;
  backLabel: string;
  relatedEntries?: ContentEntry[];
}) {
  const related = relatedEntries.filter((item) => item.slug !== entry.slug).slice(0, 2);
  const publishedDate = entry.date ? new Date(entry.date).toISOString() : undefined;
  const updatedDate = entry.updated ? new Date(entry.updated).toISOString() : publishedDate;

  return (
    <article>
      <section className="border-b border-border pb-16 pt-8 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-12">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href={backHref} className="hover:text-ink">{backLabel}</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">{entry.title}</span>
          </nav>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-olive">
            {entry.category || entry.kind}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.96] tracking-[-0.04em]">
            {entry.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{entry.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            {entry.date ? <time dateTime={entry.date}>Published {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(entry.date))}</time> : null}
            {entry.updated ? <time dateTime={entry.updated}>Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(entry.updated))}</time> : null}
            <span>{entry.readingTime} min read</span>
          </div>
          {entry.illustrative ? (
            <p className="mt-5 inline-block border-l-2 border-forest bg-surface px-4 py-3 text-sm text-muted">
              Illustrative pattern; no client, metric, or outcome is being claimed.
            </p>
          ) : null}
        </Container>
      </section>
      <Container className="py-14 sm:py-20">
        {entry.kind === "insights" || entry.image ? (
          <DetailHeroVisual image={entry.image} imageAlt={entry.imageAlt || entry.title} />
        ) : null}
        <ContentRenderer body={entry.body} />
        {related.length ? (
          <section className="mt-16 border-t border-border pt-10" aria-labelledby="related-insights">
            <h2 id="related-insights" className="font-serif text-3xl">Related insights</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((item) => (
                <Link key={item.href} href={item.href} className="border border-border bg-surface p-5 transition-colors hover:border-forest">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-olive">{item.category || item.kind}</p>
                  <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </Container>
      {entry.kind === "insights" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: entry.title,
              description: entry.summary,
              ...(entry.image ? { image: entry.image } : {}),
              url: new URL(entry.href, process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").toString(),
              ...(publishedDate ? { datePublished: publishedDate } : {}),
              ...(updatedDate ? { dateModified: updatedDate } : {}),
              publisher: { "@type": "Organization", name: "Archex" }
            })
          }}
        />
      ) : null}
    </article>
  );
}
