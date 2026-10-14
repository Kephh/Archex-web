"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        }
      ) => string;
    };
  }
}

export function TurnstileField({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!siteKey) return;

    let cancelled = false;
    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      if (containerRef.current.dataset.rendered === "true") return;

      window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken("")
      });
      containerRef.current.dataset.rendered = "true";
    };

    if (window.turnstile) {
      renderWidget();
      return () => {
        cancelled = true;
      };
    }

    const scriptId = "cloudflare-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", renderWidget);

    return () => {
      cancelled = true;
      script?.removeEventListener("load", renderWidget);
    };
  }, [onToken, siteKey]);

  return siteKey ? <div ref={containerRef} aria-label="Spam protection" /> : null;
}
