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
              <h2 className="font-serif text-3xl sm:text-4xl">Problems this service can address</h2>
              <ul className="mt-6 space-y-4 text-muted">
                {service.problems.map((item) => (
                  <li key={item} className="border-l-2 border-olive pl-4 leading-7">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {service.goodFit?.length ? (
              <section className="border-t border-border pt-10">
                <h2 className="font-serif text-3xl sm:text-4xl">When this approach is a good fit</h2>
                <ul className="mt-6 space-y-4 text-muted">
                  {service.goodFit.map((item) => (
                    <li key={item} className="flex gap-3 leading-7">
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-forest" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-3xl sm:text-4xl">What the work can include</h2>
              <ul className="mt-6 space-y-4 text-muted">
                {service.capabilities.map((item) => (
                  <li key={item} className="flex gap-3 leading-7">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-olive" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {service.considerations?.length ? (
              <section className="border-t border-border pt-10">
                <h2 className="font-serif text-3xl sm:text-4xl">Engineering considerations and trade-offs</h2>
                <ul className="mt-6 space-y-4 text-muted">
                  {service.considerations.map((item) => (
                    <li key={item} className="border-l-2 border-border pl-4 leading-7">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {service.distinction ? (
              <section className="border-t border-border pt-10">
                <h2 className="font-serif text-3xl sm:text-4xl">Distinction from adjacent services</h2>
                <div className="mt-6 rounded-md border border-border bg-surface-muted p-5 leading-7 text-muted">
                  {service.distinction}
                </div>
              </section>
            ) : null}

            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-3xl sm:text-4xl">How the work progresses</h2>
              <p className="mt-3 text-sm text-muted">
                Every technical engagement follows Archex’s disciplined four-stage delivery model:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="border border-border bg-surface p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-olive">Stage 01</p>
                  <h3 className="mt-2 font-semibold">1. Understand</h3>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Clarify the business problem, target users, technical constraints, systems, and desired outcome.
                  </p>
                </div>
                <div className="border border-border bg-surface p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-olive">Stage 02</p>
                  <h3 className="mt-2 font-semibold">2. Plan</h3>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Agree on scope, architectural boundaries, delivery milestones, and explicit evaluation criteria.
                  </p>
                </div>
                <div className="border border-border bg-surface p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-olive">Stage 03</p>
                  <h3 className="mt-2 font-semibold">3. Build and validate</h3>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Engineer in testable slices, integrate with existing services, and review against functional goals.
                  </p>
                </div>
                <div className="border border-border bg-surface p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-olive">Stage 04</p>
                  <h3 className="mt-2 font-semibold">4. Deliver and improve</h3>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Deploy responsibly, observe operational metrics, hand over documentation, and plan next improvements.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </article>
      <CTA />
    </>
  );
}
