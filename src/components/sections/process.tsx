export function ProcessSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-4 md:gap-0">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative border-t border-border pt-5 md:pr-6 md:after:absolute md:after:right-4 md:after:top-8 md:after:h-px md:after:w-4 md:after:bg-border last:md:after:hidden"
        >
          <span className="font-mono text-sm text-olive">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
