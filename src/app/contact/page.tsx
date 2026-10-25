import Link from "next/link";
import { Container, Section } from "@/components/layout/container";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { ScrollToFormArrow } from "@/components/ui/scroll-to-form-arrow";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "Contact", path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <ScrollToFormArrow />
      <PageHero
        eyebrow="Contact"
        title="Send a general enquiry."
        summary="For a general question or an initial conversation, send a short note. Use the project enquiry page when you already know what you want to build or improve."
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold">Tell us what is going on.</h2>
            <p className="mt-4 leading-7 text-muted">
              Tell us what you are trying to make better, what is getting in the way, and what
              constraints matter. We will take it from there.
            </p>
            <Link
              href="/start-project"
              className="mt-6 inline-flex text-sm font-semibold text-forest"
            >
              Share a project brief <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
          <EnquiryForm compact />
        </Container>
      </Section>
    </>
  );
}
