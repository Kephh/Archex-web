import { Container, Section } from "@/components/layout/container";
import { EntryGrid } from "@/components/sections/entry-grid";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { getEntriesAsync } from "@/lib/content/repository";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Work",
  description:
    "Illustrative engineering examples covering AI-assisted intake and legacy operations software.",
  path: "/work"
});

export default async function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Illustrative engineering examples."
        summary="These entries describe plausible software problems and engineering approaches. They are not client case studies and contain no claimed results."
      />
      <Section>
        <Container>
          <EntryGrid entries={await getEntriesAsync("work")} />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
