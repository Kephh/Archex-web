import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "About", path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="An engineering company for software people depend on."
        summary="Archex helps teams build new software, apply AI to defined tasks, and improve existing systems through deliberate delivery."
      />
      <Section>
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">How we think</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Understand the system before making it bigger.
            </h2>
            <p className="mt-5 leading-7 text-muted">
              Good engineering starts with the context around a system: the people using it, the
              decisions it supports, the constraints it carries, and the risks that matter. Archex
              brings that context into the work before choosing a technical path.
            </p>
            <p className="mt-5 leading-7 text-muted">
              Scope is shaped into increments, assumptions are written down, and software is tested
              and documented as it becomes part of the business.
            </p>
          </div>
          <div className="border-t-2 border-forest pt-5">
            <h2 className="text-2xl font-semibold">A considered way to build</h2>
            <ol className="mt-6 grid gap-5">
              {[
                [
                  "Understand",
                  "Clarify the business problem, target users, technical constraints, systems, and desired outcome."
                ],
                [
                  "Plan",
                  "Agree on priorities, scope boundaries, technical architecture, and evaluation criteria."
                ],
                [
                  "Build and validate",
                  "Engineer, integrate, test, review, and refine in working software increments."
                ],
                [
                  "Deliver and improve",
                  "Release responsibly, observe how the solution performs, and determine the next improvement."
                ]
              ].map(([title, body], index) => (
                <li
                  key={title}
                  className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border pb-5 last:border-0"
                >
                  <span className="font-mono text-xs text-olive">0{index + 1}</span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>
      <CTA />
    </>
  );
}
