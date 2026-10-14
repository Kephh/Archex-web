import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "How We Work", path: "/how-we-work" });

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="A delivery process you can inspect as it moves."
        summary="We move from discovery to architecture, implementation, and maintenance with review points, tests, working software, and written decisions."
      />
      <Section>
        <Container>
          <ProcessSteps
            steps={[
              {
                title: "Discovery",
                body: "Understand the users, business rules, systems, risks, and constraints."
              },
              {
                title: "Architecture",
                body: "Make technical choices explicit and proportionate to the problem."
              },
              {
                title: "Implementation",
                body: "Build in slices with review, tests, demonstrations, and documentation."
              },
              {
                title: "Maintenance",
                body: "Monitor changes, fix issues, and keep the system understandable."
              }
            ]}
          />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
