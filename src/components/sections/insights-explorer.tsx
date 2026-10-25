"use client";

import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ContentEntry } from "@/lib/content/schema";

function formatDate(value?: string) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

function matches(entry: ContentEntry, query: string, category: string) {
  const searchable = [entry.title, entry.summary, entry.category, ...entry.tags, entry.body]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return (!query || searchable.includes(query.toLowerCase())) && (!category || entry.category === category);
}

function EditorialVisual({
  compact = false,
  image,
  imageAlt
}: {
  compact?: boolean;
  image?: string;
  imageAlt?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(image && !imageFailed);

  return (
    <div
      className={[
        "relative overflow-hidden bg-forest p-5 text-on-forest",
        compact ? "min-h-44" : "min-h-72 sm:min-h-96"
      ].join(" ")}
      aria-hidden="true"
    >
      {showImage ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={image}
          alt={imageAlt || ""}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-5 border border-on-forest/20" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-on-forest/15" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-on-forest/15" />
          <div className="absolute bottom-8 left-8 right-8 border-t border-olive/70" />
          <div className="absolute bottom-8 left-8 h-20 w-20 border border-olive/70" />
          <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-olive/70" />
          <div className="absolute bottom-12 right-12 font-mono text-[10px] uppercase tracking-[0.2em] text-olive">
            Archex / field notes
          </div>
        </>
      )}
    </div>
  );
}

function ArticleMeta({ entry }: { entry: ContentEntry }) {
  const date = formatDate(entry.date);
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
      {date ? <time dateTime={entry.date}>{date}</time> : null}
      <span>{entry.readingTime} min read</span>
    </div>
  );
}

export function InsightsExplorer({ entries }: { entries: ContentEntry[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const featured = entries.find((entry) => entry.featured) || entries[0];
  const categories = useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.category).filter(Boolean))) as string[],
    [entries]
  );
  const filtered = useMemo(
    () => entries.filter((entry) => matches(entry, query.trim(), category)),
    [category, entries, query]
  );
  const gridEntries = filtered.filter((entry) => entry.href !== featured?.href);
  const hasFilters = Boolean(query || category);

  if (!entries.length) {
    return (
      <div className="border border-border bg-surface p-8 text-center sm:p-12">
        <h2 className="font-serif text-3xl">The editorial desk is quiet for now.</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          New engineering notes will appear here as they are reviewed and published.
        </p>
      </div>
    );
  }

  return (
    <div>
      {featured ? (
        <article className="grid overflow-hidden border border-border bg-surface lg:grid-cols-[1.1fr_0.9fr]">
          <Link href={featured.href} className="group block">
            <EditorialVisual image={featured.image} imageAlt={featured.imageAlt} />
          </Link>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">Featured note</p>
            {featured.category ? (
              <p className="mt-5 text-sm font-semibold text-muted">{featured.category}</p>
            ) : null}
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              <Link href={featured.href} className="hover:text-forest-hover">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-4 leading-7 text-muted">{featured.summary}</p>
            <div className="mt-6">
              <ArticleMeta entry={featured} />
            </div>
            <Link
              href={featured.href}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest"
            >
              Read article <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </article>
      ) : null}

      <div className="mt-12">
        <label htmlFor="insights-search" className="sr-only">
          Search articles by topic, keyword, or question
        </label>
        <div className="relative">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="insights-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles by topic, keyword, or question…"
            className="min-h-14 w-full rounded-md border border-border bg-surface pl-12 pr-12 text-base outline-none transition focus:border-forest"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear article search"
              className="absolute right-3 top-1/2 inline-flex min-h-9 min-w-9 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-surface-muted hover:text-ink"
            >
              <X size={17} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Filter articles by category">
          <button
            type="button"
            onClick={() => setCategory("")}
            aria-pressed={!category}
            className={[
              "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              !category ? "border-forest bg-forest text-on-forest" : "border-border text-muted hover:border-forest hover:text-ink"
            ].join(" ")}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={[
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                category === item
                  ? "border-forest bg-forest text-on-forest"
                  : "border-border text-muted hover:border-forest hover:text-ink"
              ].join(" ")}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">All notes</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            {hasFilters ? "Matching articles" : "More from Archex"}
          </h2>
        </div>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("");
            }}
            className="text-sm font-semibold text-forest hover:text-forest-hover"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {gridEntries.length ? (
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {gridEntries.map((entry) => (
            <article key={entry.href} className="group overflow-hidden border border-border bg-surface transition-colors hover:border-forest">
              <Link href={entry.href} className="block">
                <EditorialVisual compact image={entry.image} imageAlt={entry.imageAlt} />
                <div className="p-6">
                  {entry.category ? (
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-olive">{entry.category}</p>
                  ) : null}
                  <h3 className="mt-4 text-2xl font-semibold leading-tight">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{entry.summary}</p>
                  <div className="mt-5">
                    <ArticleMeta entry={entry} />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-7 border border-border bg-surface-muted p-8 text-center">
          <h3 className="font-serif text-2xl">No articles match that search.</h3>
          <p className="mt-2 text-muted">Try another topic or clear the active filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("");
            }}
            className="mt-5 text-sm font-semibold text-forest hover:text-forest-hover"
          >
            Show all articles
          </button>
        </div>
      )}
    </div>
  );
}
