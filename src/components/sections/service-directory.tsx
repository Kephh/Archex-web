"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
  serviceCategories as sourceServiceCategories,
  type ServiceCategory
} from "@/lib/services/catalog";

export function ServiceDirectory({
  categories = sourceServiceCategories
}: {
  categories?: ServiceCategory[];
}) {
  const [selected, setSelected] = useState(0);
  const category = categories[selected] || categories[0];
  return (
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
      <div className="space-y-2">
        {categories.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            className={`w-full rounded-md border px-4 py-4 text-left transition-colors ${selected === index ? "border-forest bg-surface-muted text-ink" : "border-border text-muted hover:border-forest hover:text-ink"}`}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 block font-semibold">{item.name}</span>
          </button>
        ))}
      </div>
      <div id={category.slug} className="rounded-md border border-border bg-surface p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">Explore category</p>
        <h2 className="mt-3 font-serif text-4xl">{category.name}</h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">{category.description}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {category.services.map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="group border-t border-border py-4"
            >
              <span className="flex items-start justify-between gap-3 font-semibold">
                {service.title}
                <ArrowUpRight
                  size={17}
                  className="shrink-0 text-forest transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 block text-sm leading-6 text-muted">{service.summary}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
