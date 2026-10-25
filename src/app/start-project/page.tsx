import { Container, Section } from "@/components/layout/container";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { ScrollToFormArrow } from "@/components/ui/scroll-to-form-arrow";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "Start a Project", path: "/start-project" });

export default function StartProjectPage() {
  return (
    <>
      <ScrollToFormArrow />
      <PageHero
        eyebrow="Project enquiry"
        title="Tell us what you are trying to build, fix, or improve."
        summary="Tell us what you are building or improving, what is getting in the way, and what needs to happen next."
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="text-muted">
            <h2 className="text-2xl font-semibold text-ink">What to include</h2>
            <p className="mt-4 leading-7">
              The business problem, current system context, timeline pressure, people involved, and
              known constraints help us understand the work. Do not include credentials or sensitive
              production data.
            </p>
          </div>
          <EnquiryForm />
        </Container>
      </Section>
    </>
  );
}
