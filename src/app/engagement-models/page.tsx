import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "Engagement Models", path: "/engagement-models" });

export default function EngagementModelsPage() {
  const models = [
    [
      "Defined-scope delivery",
      "Best for a bounded product, integration, or modernization phase with clear checkpoints."
    ],
    [
      "Extended engineering team",
      "Best when you need durable capacity working with your product, design, or operations team."
    ],
    [
      "Ongoing partnership",
      "Best for maintenance, releases, quality improvement, and gradual product evolution."
    ]
  ];
  return (
    <>
      <PageHero
        eyebrow="Ways of working"
        title="Choose the working arrangement that fits the job."
        summary="A defined delivery, embedded capacity, or ongoing support can each be right. The distinction is what needs to be delivered and where ownership sits."
      />
      <Section>
        <Container className="grid gap-5 md:grid-cols-3">
          {models.map(([title, body]) => (
            <div key={title} className="rounded-md border border-border bg-surface p-6">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </Container>
      </Section>
      <CTA />
    </>
  );
}
