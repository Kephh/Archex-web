"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { href, label, className, onClick },
  ref
) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      ref={ref}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-olive after:transition-transform hover:text-ink hover:after:scale-x-100",
        active && "text-ink after:scale-x-100",
        className
      )}
    >
      {label}
    </Link>
  );
});
