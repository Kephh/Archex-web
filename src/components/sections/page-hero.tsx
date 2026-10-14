import { Container } from "@/components/layout/container";

export function PageHero({
  eyebrow,
  title,
  summary
}: {
  eyebrow?: string;
  title: string;
  summary: string;
}) {
  return (
    <section className="border-b border-border pb-16 pt-8 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-12">
      <Container>
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">{eyebrow}</p>
        ) : null}
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.96] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">{summary}</p>
      </Container>
    </section>
  );
}
