import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <div className="min-h-[70vh] py-12 sm:py-20 animate-pulse">
      <Container className="space-y-12">
        <div className="max-w-2xl space-y-4">
          <div className="h-4 w-28 rounded bg-olive/20" />
          <div className="h-10 w-3/4 rounded bg-border/60 sm:h-12" />
          <div className="h-4 w-full rounded bg-border/40" />
          <div className="h-4 w-5/6 rounded bg-border/40" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex min-h-[18rem] flex-col justify-between rounded-md border border-border bg-surface p-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="h-20 rounded bg-surface-muted/60" />
                <div className="h-6 w-3/4 rounded bg-border/50" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-border/30" />
                  <div className="h-3 w-4/5 rounded bg-border/30" />
                </div>
              </div>
              <div className="h-4 w-24 rounded bg-olive/20" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
