import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function CTA({
  title = "Have something to build?",
  body = "Tell us what you are working on, what is getting in the way, and what needs to happen next. We can start there."
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-forest py-16 text-on-forest sm:py-20">
      <Container className="grid gap-8 md:grid-cols-[1.2fr_auto] md:items-center">
        <div>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-on-forest/80">{body}</p>
        </div>
        <Button href="/start-project" variant="secondary" className="min-w-[12rem]">
          Talk to Archex
        </Button>
      </Container>
    </section>
  );
}
