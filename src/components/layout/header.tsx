import Link from "next/link";
import { navItems, siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-paper/95 backdrop-blur">
      <Container className="flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-[-0.03em]">
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-4 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              className="text-sm font-medium"
            />
          ))}
          <Button href="/start-project" className="ml-2 min-w-[8rem] whitespace-nowrap px-4">
            Discuss a project
          </Button>
          <ThemeToggle />
        </nav>
        <MobileNav />
      </Container>
    </header>
  );
}
