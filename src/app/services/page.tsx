import { Container, Section } from "@/components/layout/container";
import { ContentRail, type ContentRailItem } from "@/components/sections/content-rail";
import { ServiceCategorySlideshow } from "@/components/sections/service-category-slideshow";
import { ServiceDirectory } from "@/components/sections/service-directory";
import { CTA } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import {
  getEntriesAsync,
  getPublishedServiceCategories
} from "@/lib/content/repository";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Software engineering for products, internal applications, AI workflows, and existing systems.",
  path: "/services"
});

export default async function ServicesPage() {
  const railItems: ContentRailItem[] = (await getEntriesAsync("services")).map((entry) => ({
    eyebrow: entry.category || "Service",
    title: entry.title,
    body: entry.summary,
    href: entry.href,
    meta: "View service"
  }));
  const categories = await getPublishedServiceCategories();

  return (
    <>
      <section className="border-b border-border py-10 sm:py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">Services</p>
            <h1 className="mt-5 max-w-3xl font-serif text-[clamp(3rem,6vw,5.75rem)] leading-[0.96] tracking-[-0.04em]">
              Software engineering for products, workflows, and existing systems.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              We build customer-facing products and internal applications, connect useful AI
              capabilities to existing workflows, and improve software that needs to become easier
              to maintain and extend.
            </p>
            <Button href="/start-project" className="mt-7">
              Discuss a project
            </Button>
          </div>
          <ServiceCategorySlideshow categories={categories} />
        </Container>
      </section>
      <Section>
        <Container>
          <ContentRail
            eyebrow="Primary services"
            title="Choose the kind of help you need."
            items={railItems}
          />
        </Container>
      </Section>
      <Section className="bg-surface">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">
              Service catalogue
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Explore the work behind the categories.
            </h2>
          </div>
          <ServiceDirectory categories={categories} />
        </Container>
      </Section>
      <CTA />
    </>
  );
}
