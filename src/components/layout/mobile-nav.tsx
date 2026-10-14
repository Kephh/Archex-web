"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems, siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === "Tab" && menuRef.current) {
        const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !triggerRef.current?.contains(target))
        setOpen(false);
    };

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !triggerRef.current?.contains(target))
        setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-surface"
      >
        <span className="sr-only">Toggle navigation</span>
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      {open ? (
        <div
          id="mobile-navigation"
          ref={menuRef}
          className="absolute left-5 right-5 top-[4.5rem] z-50 rounded-md border border-border bg-surface p-4 shadow-xl"
        >
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium after:hidden hover:bg-surface-muted"
                ref={item === navItems[0] ? firstLinkRef : undefined}
              />
            ))}
            <Button href="/start-project" onClick={() => setOpen(false)} className="mt-2 w-full">
              Discuss a project
            </Button>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm text-muted">
              <span>Theme</span>
              <ThemeToggle />
            </div>
          </nav>
          <p className="mt-4 border-t border-border pt-4 text-sm text-muted">
            {siteConfig.tagline}
          </p>
        </div>
      ) : null}
    </div>
  );
}
