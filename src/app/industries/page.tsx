import { Container, Section } from "@/components/layout/container";
import { EntryGrid } from "@/components/sections/entry-grid";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { getEntries } from "@/lib/content/loader";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Industries",
  description:
    "Industry pages focused on plausible software problems, not unsupported specialization claims.",
  path: "/industries"
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="The same software problems appear in different operating environments."
        summary="These pages describe recurring constraints in product teams and operations-heavy businesses without claiming a sector track record that is not documented here."
      />
      <Section>
        <Container>
          <EntryGrid entries={getEntries("industries")} />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
