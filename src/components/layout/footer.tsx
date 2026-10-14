import Link from "next/link";
import { Container } from "@/components/layout/container";
import { navItems, siteConfig } from "@/config/site";

const serviceLinks = [
  { label: "AI solutions", href: "/ai-solutions" },
  { label: "Modernization", href: "/modernization" },
  { label: "Engagement models", href: "/engagement-models" },
  { label: "How we work", href: "/how-we-work" }
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="font-serif text-3xl font-bold">
            {siteConfig.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{siteConfig.description}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold">Explore</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Work with us</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Legal</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              <li>
                <Link href="/privacy" className="hover:text-ink">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ink">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="border-t border-border py-5 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Software products, AI workflows, and
          systems work.
        </p>
      </Container>
    </footer>
  );
}
