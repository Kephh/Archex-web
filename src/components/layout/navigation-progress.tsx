"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  // Complete and hide progress when route transition finishes
  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (visible) {
      timer1 = setTimeout(() => {
        setProgress(100);
      }, 0);
      timer2 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, searchParams, visible]);

  // Intercept internal link clicks for instant visual feedback
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = (event.target as HTMLElement).closest("a");
      if (!target || !target.href) return;
      if (target.target && target.target !== "_self") return;
      if (target.hasAttribute("download")) return;

      try {
        const url = new URL(target.href, window.location.href);
        const isSameOrigin = url.origin === window.location.origin;
        const isSamePath =
          url.pathname === window.location.pathname && url.search === window.location.search;

        if (isSameOrigin && !isSamePath) {
          setVisible(true);
          setProgress(20);

          clearInterval(interval);
          interval = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 85) {
                clearInterval(interval);
                return prev;
              }
              const increment = (85 - prev) * 0.15;
              return prev + Math.max(1, increment);
            });
          }, 120);
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label="Page loading"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[3px] w-full overflow-hidden bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-olive via-[#d1a477] to-olive shadow-[0_0_8px_rgba(209,164,119,0.7)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1
        }}
      />
    </div>
  );
}
