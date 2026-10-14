export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-6">
          <summary className="cursor-pointer list-none text-lg font-semibold">
            {item.question}
            <span
              aria-hidden="true"
              className="float-right text-olive transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
