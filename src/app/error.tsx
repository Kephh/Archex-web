"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">Error</p>
      <h1 className="mt-5 font-serif text-5xl">Something went wrong.</h1>
      <p className="mt-5 text-muted">
        The page hit a recoverable error. Try again or return to the homepage.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-md bg-forest px-5 py-3 text-sm font-semibold text-on-forest"
      >
        Try again
      </button>
    </div>
  );
}
