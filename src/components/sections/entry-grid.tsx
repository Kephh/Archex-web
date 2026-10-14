import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentEntry } from "@/lib/content/schema";

export function EntryGrid({ entries }: { entries: ContentEntry[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {entries.map((entry) => (
        <Link
          key={entry.href}
          href={entry.href}
          className="group border-t-2 border-forest bg-surface p-6 transition hover:bg-surface-muted"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">
            {entry.category || entry.kind}
          </p>
          <h2 className="mt-5 text-2xl font-semibold leading-tight">{entry.title}</h2>
          <p className="mt-4 text-sm leading-6 text-muted">{entry.summary}</p>
          {entry.illustrative ? (
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-olive">
              Illustrative pattern
            </p>
          ) : null}
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">
            {entry.illustrative
              ? "View example"
              : entry.kind === "services"
                ? "View service"
                : "Read article"}{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
