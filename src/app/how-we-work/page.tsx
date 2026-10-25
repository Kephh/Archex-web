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
                title: "Understand",
                body: "Clarify the business problem, target users, operating constraints, existing systems, and the desired outcome."
              },
              {
                title: "Plan",
                body: "Agree on priorities, scope boundaries, technical architecture, and explicit criteria for how success will be evaluated."
              },
              {
                title: "Build and validate",
                body: "Engineer, integrate, test, review, and refine in working software increments with continuous feedback."
              },
              {
                title: "Deliver and improve",
                body: "Release or hand over responsibly, observe how the solution performs in real use, and determine the next improvement."
              }
            ]}
          />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
