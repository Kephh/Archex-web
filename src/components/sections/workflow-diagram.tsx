"use client";

import { Check } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Understand the system",
    shortTitle: "Understand",
    detail: "Map the people, data, dependencies, and decisions around the software.",
    status: "complete"
  },
  {
    number: "02",
    title: "Choose the next change",
    shortTitle: "Choose",
    detail: "Set a focused release boundary and make the important trade-offs explicit.",
    status: "active"
  },
  {
    number: "03",
    title: "Review what ships",
    shortTitle: "Review",
    detail: "Use tests, working software, and feedback to decide what should happen next.",
    status: "next"
  }
] as const;

export function WorkflowDiagram() {
  const [selected, setSelected] = useState(1);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (!event.key.match(/ArrowLeft|ArrowRight|Home|End/)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? steps.length - 1
          : selected + (event.key === "ArrowRight" ? 1 : -1);
    const nextIndex = (next + steps.length) % steps.length;
    setSelected(nextIndex);
    document.getElementById(`workflow-step-${nextIndex}`)?.focus();
  }

  return (
    <div
      className="workflow-panel overflow-hidden rounded-md bg-forest text-on-forest shadow-[16px_16px_0_0_var(--strong-border)] md:min-h-[32rem]"
      aria-label="Illustrative engineering workflow"
    >
      <div className="flex items-center justify-between border-b border-on-forest/15 px-5 py-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-on-forest/70">
          <span className="h-2 w-2 rounded-full bg-olive" />
          Engineering workflow
        </div>
        <span className="rounded-full bg-olive px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-on-forest">
          Illustrative
        </span>
      </div>
      <div className="grid gap-8 p-5 sm:p-7 md:grid-rows-[auto_minmax(13rem,1fr)_auto]">
        <div
          id="workflow-detail"
          role="tabpanel"
          aria-labelledby={`workflow-step-${selected}`}
          className="md:min-h-[13rem]"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-on-forest/60">
            Selected step
          </p>
          <p className="mt-3 max-w-sm font-serif text-3xl leading-tight sm:text-4xl">
            {steps[selected].detail}
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Engineering workflow steps"
          className="grid gap-2 border-t border-on-forest/15 pt-5"
        >
          {steps.map((step, index) => {
            const isSelected = selected === index;
            const isComplete = index < selected;
            return (
              <button
                key={step.number}
                id={`workflow-step-${index}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="workflow-detail"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={handleKeyDown}
                className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-on-forest/10 py-3 text-left text-sm transition-colors hover:bg-on-forest/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
              >
                <span className="font-mono text-xs text-on-forest/50">{step.number}</span>
                <span>{step.title}</span>
                {isComplete ? (
                  <Check size={16} className="text-olive" aria-label="Complete" />
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-on-forest/50">
                    {isSelected ? "active" : step.status}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-on-forest/15 pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-on-forest/55">
          {steps.map((step) => (
            <span key={step.number}>{step.shortTitle}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
