"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const storageKey = "archex-theme";

const themeListeners = new Set<() => void>();

function subscribe(listener: () => void) {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerTheme(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Storage may be unavailable in private browsing or restricted contexts.
    }
    themeListeners.forEach((listener) => listener());
  }

  const darkMode = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-surface text-muted transition hover:border-forest hover:text-ink"
    >
      {darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
