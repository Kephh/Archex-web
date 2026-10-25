"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export function ScrollToFormArrow({
  targetId = "enquiry-form"
}: {
  targetId?: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const form = document.getElementById(targetId);
      if (!form) return;
      const rect = form.getBoundingClientRect();
      // Hide once the form has scrolled comfortably into view
      if (rect.top <= window.innerHeight * 0.45) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetId]);

  function scrollToForm() {
    const form = document.getElementById(targetId);
    if (!form) return;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    const firstInput = form.querySelector<HTMLInputElement>("input, textarea");
    firstInput?.focus({ preventScroll: true });
  }

  return (
    <aside
      aria-label="Scroll to enquiry form shortcut"
      className={[
        "fixed right-5 sm:right-8 lg:right-12 z-30 transition-all duration-300",
        "top-1/2 -translate-y-1/2",
        visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
      ].join(" ")}
    >
      <button
        type="button"
        onClick={scrollToForm}
        aria-label="Scroll to enquiry form"
        title="Scroll down to enquiry form"
        className="group relative flex size-11 sm:size-12 items-center justify-center rounded-full border border-forest/30 bg-surface/90 text-forest shadow-md backdrop-blur transition-colors hover:border-forest hover:bg-forest hover:text-on-forest focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
      >
        <span
          className="absolute inset-0 rounded-full border border-forest/20 animate-pulse-beat pointer-events-none"
          aria-hidden="true"
        />
        <ArrowDown className="relative z-10 size-5 transition-transform duration-200 group-hover:translate-y-0.5" />
      </button>
    </aside>
  );
}
