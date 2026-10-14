import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "Terms of Use", path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal draft"
        title="Terms of use"
        summary="A restrained draft for review before launch. Replace with counsel-approved terms for the actual business."
      />
      <Container className="prose-content py-14">
        <h2>Use of the site</h2>
        <p>The website provides general information about software engineering services and a way to contact the company.</p>
        <h2>No guaranteed engagement</h2>
        <p>Submitting an enquiry does not create a client relationship or guarantee availability, pricing, or delivery commitments.</p>
        <h2>Content accuracy</h2>
        <p>Content should be reviewed and updated by the site owner before launch, especially company details, legal statements, and case studies.</p>
        <h2>Review required</h2>
        <p>This draft is not legal advice. Confirm business-specific terms, jurisdiction, and dispute language before publishing.</p>
      </Container>
    </>
  );
}
