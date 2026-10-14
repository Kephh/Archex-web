import { Container, Section } from "@/components/layout/container";
import { EntryGrid } from "@/components/sections/entry-grid";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { getEntries } from "@/lib/content/loader";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Software engineering for products, internal applications, AI workflows, and existing systems.",
  path: "/services"
});

export default function ServicesPage() {
  const entries = getEntries("services");
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Software engineering for products, workflows, and existing systems."
        summary="We build customer-facing products and internal applications, connect systems that need to work together, and improve software that has become difficult to change."
      />
      <Section>
        <Container>
          <EntryGrid entries={entries} />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
