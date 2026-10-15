"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  serviceCategories as sourceServiceCategories,
  type ServiceCategory
} from "@/lib/services/catalog";

export function ServiceCategorySlideshow({
  categories = sourceServiceCategories
}: {
  categories?: ServiceCategory[];
}) {
  const [selected, setSelected] = useState(0);
  const category = categories[selected] || categories[0];

  function move(direction: number) {
    setSelected((current) => (current + direction + categories.length) % categories.length);
  }

  return (
    <div className="rounded-md border border-border bg-surface p-5 shadow-[12px_12px_0_0_var(--surface-muted)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
          Category {String(selected + 1).padStart(2, "0")} /{" "}
          {String(categories.length).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous service category"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border hover:border-forest"
          >
            <ChevronLeft size={17} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next service category"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border hover:border-forest"
          >
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mt-8 min-h-[25rem]">
        <div className="relative flex min-h-32 items-end overflow-hidden bg-surface-muted p-5">
          <div className="absolute inset-5 border border-olive/60" />
          <div className="absolute right-8 top-7 h-20 w-20 rounded-full border border-olive/60" />
          <p className="relative font-mono text-xs uppercase tracking-[0.18em] text-olive">
            {category.slug.replaceAll("-", " ")}
          </p>
        </div>
        <h2 className="mt-7 font-serif text-4xl leading-tight">{category.name}</h2>
        <p className="mt-4 leading-7 text-muted">{category.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {category.services.slice(0, 4).map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:border-forest hover:text-ink"
            >
              {service.title}
            </Link>
          ))}
        </div>
        <Link
          href={`/services#${category.slug}`}
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest"
        >
          Explore services <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-6 flex gap-1.5" aria-label="Service category selector">
        {categories.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            aria-label={`Show ${item.name}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={`h-1.5 flex-1 rounded-full ${selected === index ? "bg-olive" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
