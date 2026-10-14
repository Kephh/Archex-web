import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "Privacy Policy", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal draft"
        title="Privacy policy"
        summary="This draft explains the intended enquiry flow and must be reviewed by the site owner and legal counsel before publication."
      />
      <Container className="prose-content py-14">
        <h2>Information collected</h2>
        <p>Enquiry forms collect name, work email, company, project context, and optional timeline or budget information so the company can respond.</p>
        <h2>How information is used</h2>
        <p>Submitted information is used to review and respond to enquiries, operate the website, prevent abuse, and keep basic business records.</p>
        <h2>Service providers</h2>
        <p>Supabase may store enquiries, Resend may send notification emails, and Cloudflare Turnstile may be used for spam protection if configured.</p>
        <h2>Review required</h2>
        <p>This is not legal advice and does not guarantee compliance. Confirm retention, jurisdiction, owner identity, and data rights before launch.</p>
      </Container>
    </>
  );
}
