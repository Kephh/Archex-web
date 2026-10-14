import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">404</p>
      <h1 className="mt-5 font-serif text-5xl">This page is not part of the site.</h1>
      <p className="mt-5 max-w-xl text-muted">
        The link may be outdated, unpublished, or mistyped.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-forest px-5 py-3 text-sm font-semibold text-on-forest"
      >
        Return home
      </Link>
    </Container>
  );
}
