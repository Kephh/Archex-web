import { Container, Section } from "@/components/layout/container";
import { EntryGrid } from "@/components/sections/entry-grid";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { getEntries } from "@/lib/content/loader";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Modernization",
  description:
    "Incremental modernization for legacy applications, platforms, databases, and integrations.",
  path: "/modernization"
});

export default function ModernizationPage() {
  return (
    <>
      <PageHero
        eyebrow="Modernization"
        title="Improve the system before deciding how much to replace."
        summary="We inspect legacy code, dependencies, tests, release risk, brittle integrations, and data flows before recommending refactoring, migration, or a rewrite."
      />
      <Section>
        <Container>
          <ProcessSteps
            steps={[
              {
                title: "Inspect",
                body: "Review code, dependencies, data, integrations, tests, and release risk."
              },
              {
                title: "Stabilize",
                body: "Add coverage, observability, and release controls around critical behavior."
              },
              {
                title: "Improve",
                body: "Refactor brittle areas and repair boundaries that make change expensive."
              },
              {
                title: "Move",
                body: "Migrate platforms, databases, or services in slices when the evidence supports it."
              }
            ]}
          />
        </Container>
      </Section>
      <Section className="bg-surface">
        <Container>
          <EntryGrid entries={getEntries("modernization")} />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
