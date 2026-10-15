import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { InsightsExplorer } from "@/components/sections/insights-explorer";
import { getEntriesAsync } from "@/lib/content/repository";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Insights",
  description:
    "Notes on AI evaluation, modernization, testing, observability, and incremental delivery.",
  path: "/insights"
});

export default async function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering notes & practical guides"
        title="Ideas for building better software."
        summary="Practical perspectives on software engineering, AI integration, and modernization—helping teams make better technical decisions and build systems that last."
      />
      <Section>
        <Container>
          <InsightsExplorer entries={await getEntriesAsync("insights")} />
        </Container>
      </Section>
    </>
  );
}
