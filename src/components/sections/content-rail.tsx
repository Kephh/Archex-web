"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export type ContentRailItem = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
};


import { cn } from "@/lib/utils";

export function ContentRail({
  eyebrow,
  title,
  description,
  viewAllHref,
  viewAllLabel = "View all",
  items,
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  items: ContentRailItem[];
  className?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"start" | "middle" | "end">("start");

  function updatePosition() {
    const rail = railRef.current;
    if (!rail) return;
    const atStart = rail.scrollLeft <= 2;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    setPosition(atStart ? "start" : atEnd ? "end" : "middle");
  }

  function scrollByCard(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-rail-card]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: direction * ((card?.offsetWidth || rail.clientWidth) + 20),
      behavior: reduceMotion ? "auto" : "smooth"
    });
    window.setTimeout(updatePosition, 350);
  }

  return (
    <section className={cn("content-rail overflow-hidden border-y border-border py-12 sm:py-16", className)}>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{title}</h2>
          {description ? (
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">{description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="mr-2 inline-flex items-center gap-2 text-sm font-semibold text-forest"
            >
              {viewAllLabel} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={position === "start"}
            aria-label={`Previous ${title.toLowerCase()} item`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-ink transition-colors hover:border-forest disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={position === "end"}
            aria-label={`Next ${title.toLowerCase()} item`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-ink transition-colors hover:border-forest disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={updatePosition}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
      >
        {items.map((item) => (
          <RailCard key={item.href} item={item} />
        ))}
      </div>
      <div className="mt-2 h-px bg-border">
        <div
          className="h-px w-1/3 bg-olive transition-transform duration-300"
          style={{
            transform:
              position === "end"
                ? "translateX(200%)"
                : position === "middle"
                  ? "translateX(100%)"
                  : "translateX(0)"
          }}
        />
      </div>
    </section>
  );
}

function RailCard({ item }: { item: ContentRailItem }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = item.image && !imageFailed;

  return (
    <Link
      href={item.href}
      data-rail-card
      className="group flex min-h-[23rem] w-[min(82vw,27rem)] shrink-0 snap-start flex-col border border-border bg-surface p-6 transition-colors hover:border-forest focus-visible:border-forest sm:min-h-[25rem] sm:p-7"
    >
      <div className="relative mb-8 flex min-h-28 items-end overflow-hidden bg-surface-muted p-4">
        {showImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.image}
            alt={item.imageAlt || ""}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-4 border border-olive/50" />
            <div className="absolute right-5 top-5 h-12 w-12 rounded-full border border-olive/60 transition-transform duration-300 group-hover:translate-x-2" />
          </>
        )}
        <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
          {item.eyebrow}
        </p>
      </div>
      <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">
        {item.title}
      </h3>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted">{item.body}</p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm font-semibold text-forest">
        <span>{item.meta || "Explore"}</span>
        <ArrowUpRight
          size={18}
          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

