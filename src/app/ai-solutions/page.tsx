import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "AI Solutions",
  description:
    "AI integration for products, document workflows, knowledge systems, and operations.",
  path: "/ai-solutions"
});

export default function AiSolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI engineering"
        title="AI features with evaluation and review paths."
        summary="We use models where they improve a task, connect them to the systems and data they need, and design for quality, security, cost, and human review."
      />
      <Section>
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">Start with the task, not the model.</h2>
            <p className="mt-5 text-muted">
              Document intake, knowledge search, classification, assistant interfaces, and workflow
              automation can be good candidates. Some are better solved with ordinary software. The
              choice depends on the data, the cost of mistakes, and who needs to review the result.
            </p>
          </div>
          <ProcessSteps
            steps={[
              {
                title: "Frame",
                body: "Define task, data, risk, review needs, and fallback behavior."
              },
              {
                title: "Prototype",
                body: "Test models, retrieval, prompts, integrations, and UX quickly."
              },
              { title: "Evaluate", body: "Measure quality against examples and failure cases." },
              {
                title: "Operate",
                body: "Monitor usage, costs, quality drift, security, and feedback."
              }
            ]}
          />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
