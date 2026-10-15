import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { CTA } from "@/components/sections/cta";
import type { ServiceDefinition } from "@/lib/services/catalog";

export function CatalogServiceDetail({ service }: { service: ServiceDefinition }) {
  const related = service.categorySlug
    ? [service.categorySlug]
    : [];

  return (
    <>
      <article>
        <section className="border-b border-border pb-16 pt-8 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-12">
          <Container>
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link href="/services" className="hover:text-ink">Services</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-ink">{service.title}</span>
            </nav>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-olive">{service.category}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.96] tracking-[-0.04em]">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{service.summary}</p>
          </Container>
        </section>
        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="h-fit border border-border bg-surface p-6 lg:sticky lg:top-24">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">Related services</p>
            <Link href={`/services#${related[0]}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">
              Explore the service catalogue <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>
          <div className="space-y-12">
            <section>
              <h2 className="font-serif text-4xl">Problems this service can address</h2>
              <ul className="mt-6 space-y-4 text-muted">
                {service.problems.map((item) => <li key={item} className="border-l-2 border-olive pl-4 leading-7">{item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-4xl">What the work can include</h2>
              <ul className="mt-6 space-y-4 text-muted">
                {service.capabilities.map((item) => <li key={item} className="flex gap-3 leading-7"><span className="mt-2 size-2 shrink-0 rounded-full bg-olive" aria-hidden="true" />{item}</li>)}
              </ul>
            </section>
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-4xl">A practical way to start</h2>
              <p className="mt-5 leading-7 text-muted">We begin by understanding the problem, constraints, existing systems, and the smallest useful direction. From there, the work can be scoped around evidence, clear ownership, and a maintainable path forward.</p>
            </section>
          </div>
        </Container>
      </article>
      <CTA />
    </>
  );
}
