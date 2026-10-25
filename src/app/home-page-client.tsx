"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BrainCircuit, Code2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/sections/workflow-diagram";
import { ContentRail } from "@/components/sections/content-rail";
import type { HomepageContent } from "@/lib/content/repository";

const needs = [
  {
    id: "product",
    label: "Build a new product",
    ctaLabel: "Explore product engineering",
    description:
      "You need a product built around a real problem, a clear user journey, and a foundation that stays maintainable as it grows.",
    service: "Product engineering and application design",
    steps: [
      "Clarify the user problem, business constraints, and delivery priorities.",
      "Define the product scope, technical approach, and release plan.",
      "Build the core product with integration points, observability, and room to evolve."
    ],
    href: "/services/custom-software-development"
  },
  {
    id: "ai",
    label: "Bring AI into an existing workflow",
    ctaLabel: "Explore AI integration",
    description:
      "Have a workflow that takes too much manual effort? We can help assess where AI fits, connect it to the systems your team already uses, and engineer the surrounding software needed to make it useful.",
    service: "AI integration and workflow design",
    steps: [
      "Identify which workflow is worth automating and where human review is still required.",
      "Map the data sources, integrations, and operational constraints that make the system reliable.",
      "Ship a practical AI experience with evaluation, fallbacks, and clear ownership."
    ],
    href: "/ai-solutions"
  },
  {
    id: "modernize",
    label: "Improve or modernize existing software",
    ctaLabel: "Explore modernization",
    description:
      "The issue may be maintenance, slow delivery, brittle integrations, or a codebase that has become harder to change without risk.",
    service: "Modernization and technical improvement",
    steps: [
      "Review the current system, its constraints, and the parts causing the most friction.",
      "Stabilize the critical path with tests, dependency clarity, and better release habits.",
      "Improve the architecture in deliberate increments instead of defaulting to a risky rewrite."
    ],
    href: "/modernization"
  },
  {
    id: "capacity",
    label: "Add engineering capacity to an ongoing project",
    ctaLabel: "Explore engagement models",
    description:
      "You need extra technical help without losing momentum, clarity, or quality on an active product or platform initiative.",
    service: "Ongoing engineering partnership",
    steps: [
      "Understand the current work, delivery rhythm, and constraints on the team.",
      "Fill the gaps with focused engineering capacity and a clear product decision path.",
      "Support changes, reviews, and iteration without disrupting the underlying delivery plan."
    ],
    href: "/engagement-models"
  }
] as const;

const capabilityRows = [
  {
    id: "build",
    label: "Build",
    icon: Code2,
    summary:
      "Product strategy, application engineering, integrations, and the foundations that keep a product maintainable.",
    problems: [
      "A new product needs to be built with real user needs in mind.",
      "A team needs engineering capacity for design, delivery, and integration work.",
      "A software platform needs clearer structure and better foundations for growth."
    ],
    details: [
      "Product discovery and planning with technical constraints in view.",
      "Application engineering, APIs, data flows, and integration design.",
      "Delivery work that keeps the product maintainable after launch."
    ],
    href: "/services/custom-software-development"
  },
  {
    id: "integrate",
    label: "Integrate",
    icon: BrainCircuit,
    summary:
      "Workflow assessment, data access, AI features, and production guardrails for tools people actually use.",
    problems: [
      "A team has a repetitive task that could be supported by AI.",
      "An internal workflow needs to connect to business data and existing systems.",
      "A model-backed experience needs clearer evaluation, security, and review."
    ],
    details: [
      "Assessment of where AI can earn its place in a real workflow.",
      "Integration with existing software, data sources, and operational tooling.",
      "Production decisions around reliability, review coverage, and user trust."
    ],
    href: "/ai-solutions"
  },
  {
    id: "modernize",
    label: "Modernize",
    icon: RefreshCw,
    summary:
      "Codebase improvement, architecture clarity, reliability, and incremental changes to systems that still matter.",
    problems: [
      "The application is harder to change than it should be.",
      "A system has brittle integrations or slow release cycles.",
      "Technology debt is getting in the way of business priorities."
    ],
    details: [
      "Code and dependency review to understand the real risk and impact.",
      "Targeted refactoring, test coverage, and architecture improvements.",
      "Incremental change that increases safety without defaulting to a large rewrite."
    ],
    href: "/modernization"
  }
] as const;

const aiStages = [
  {
    id: "workflow",
    title: "1. Identify a useful workflow",
    body: "We look for work that is repetitive, rules-heavy, or difficult to scale without manual effort. The goal is to solve a genuine operational bottleneck, not force AI into processes that work better with simpler deterministic software.",
    inputs: "Operational backlogs, recurring intake queues, document processing workflows.",
    humanRole: "Domain experts define accuracy boundaries, business rules, and edge cases."
  },
  {
    id: "data",
    title: "2. Connect necessary data & systems",
    body: "AI depends on real inputs and explicit permissions. We map the underlying data sources, APIs, permission matrices, and surrounding software to ensure the system is secure, compliant, and inspectable.",
    inputs: "Internal databases, knowledge bases, CRM records, tenant permission rules.",
    humanRole: "Security and data owners enforce access controls, PII redaction, and compliance policies."
  },
  {
    id: "experience",
    title: "3. Engineer the interaction model",
    body: "How people interact with an AI capability matters as much as the model itself. We design structured prompts, fallback behaviors, and clear decision points so users understand when an output is an assisted draft versus a confirmed state.",
    inputs: "User prompts, contextual parameters, structured JSON response schemas.",
    humanRole: "End users review suggestions, confirm state changes, and easily escalate exceptions."
  },
  {
    id: "evaluate",
    title: "4. Evaluate behavior & monitor live use",
    body: "We test failure modes, edge cases, data quality, and review steps against curated golden datasets. Telemetry tracks latency, token cost, prediction drift, and human override rates over time.",
    inputs: "Evaluation datasets, regression benchmarks, token telemetry, user feedback loops.",
    humanRole: "Engineers and product leads review drift alerts, audit logs, and performance metrics."
  }
] as const;

const modernizationTracks = [
  {
    id: "dependency",
    name: "Tangled dependencies & brittle changes",
    situation:
      "Core modules are tightly coupled without automated tests. A change to one feature creates unexpected regressions across unrelated parts of the application.",
    approach:
      "Map component dependencies, introduce characterization test coverage around critical flows, and decouple monolithic logic using the Strangler Fig pattern behind clean interfaces.",
    outcome:
      "A modular, understandable architecture where engineers can safely extend features and upgrade frameworks without unexpected downtime."
  },
  {
    id: "release",
    name: "Slow, fragile manual releases",
    situation:
      "Deployments require multi-hour manual verification, extensive off-hours maintenance windows, and frequent rollbacks due to missing test suites and ad-hoc scripts.",
    approach:
      "Automate regression test suites in CI pipelines, establish reproducible containerized staging environments, and configure zero-downtime rolling deployment strategies.",
    outcome:
      "Predictable, low-stress production releases that allow product teams to deliver improvements multiple times a week with confidence."
  },
  {
    id: "integration",
    name: "Fragmented integrations & data synchronization lag",
    situation:
      "Internal tools, third-party APIs, and databases are glued together with fragile cron scripts, leading to stock discrepancies, lost records, and silent failures.",
    approach:
      "Isolate external integrations behind event-driven queues, enforce strict schema validation contracts (e.g. Zod), and implement centralized dead-letter monitoring with automated retries.",
    outcome:
      "Resilient, auditable data flows where downstream systems stay synchronized and integration failures alert immediately for fast remediation."
  }
] as const;

export default function HomePageClient({ content }: { content: HomepageContent }) {
  const serviceRailItems = content.services.map((entry) => ({
    eyebrow: entry.category || "Featured service",
    title: entry.title,
    body: entry.summary,
    href: entry.href,
    meta: "View service",
    image: entry.image,
    imageAlt: entry.imageAlt
  }));
  const industryRailItems = content.industries.map((entry) => ({
    eyebrow: "Industry pattern",
    title: entry.title,
    body: entry.summary,
    href: entry.href,
    meta: "Explore industry pattern",
    image: entry.image,
    imageAlt: entry.imageAlt
  }));
  const workRailItems = content.work.map((entry) => ({
    eyebrow: entry.illustrative ? "Illustrative work" : "Client work",
    title: entry.title,
    body: entry.summary,
    href: entry.href,
    meta: "View example",
    image: entry.image,
    imageAlt: entry.imageAlt
  }));
  const insightRailItems = content.insights.map((entry) => ({
    eyebrow: entry.category || "Insight",
    title: entry.title,
    body: entry.summary,
    href: entry.href,
    meta: `${entry.readingTime} min read`,
    image: entry.image,
    imageAlt: entry.imageAlt
  }));

  const [selectedNeed, setSelectedNeed] = useState<number>(1);
  const [selectedCapability, setSelectedCapability] = useState<number>(0);
  const [selectedAiStage, setSelectedAiStage] = useState<number>(0);
  const [selectedModernization, setSelectedModernization] = useState<number>(0);
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const activeNeed = needs[selectedNeed];
  const activeCapability = capabilityRows[selectedCapability];
  const activeAiStage = aiStages[selectedAiStage];
  const activeModernization = modernizationTracks[selectedModernization];
  const activeWorkStage = content.processStages[selectedStage];

  return (
    <>
      <section className="hero-section relative overflow-hidden border-b border-border">
        <Container className="grid min-h-[calc(100vh-4.5rem)] gap-10 py-8 sm:gap-12 sm:py-10 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-12 lg:gap-16 lg:py-12">
          <div className="max-w-4xl">
            <p className="reveal-on-load font-mono text-xs uppercase tracking-[0.22em] text-olive">
              {content.pageContent.hero.eyebrow}
            </p>
            <h1 className="reveal-on-load reveal-on-load-delay-1 mt-6 max-w-[11ch] font-serif text-[clamp(3rem,5.4vw,5.75rem)] leading-[0.96] tracking-[-0.04em]">
              {content.pageContent.hero.title}
            </h1>
            <p className="reveal-on-load reveal-on-load-delay-2 mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              {content.pageContent.hero.description}
            </p>
            <div className="reveal-on-load reveal-on-load-delay-3 mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/start-project">Discuss your project</Button>
              <Button href="/services" variant="secondary">
                Explore our capabilities
              </Button>
            </div>
          </div>
          <div className="reveal-on-load reveal-on-load-delay-2 relative mx-auto w-full max-w-2xl">
            <WorkflowDiagram />
          </div>
        </Container>
      </section>

      <Section className="bg-surface">
        <Container>
          <ContentRail
            eyebrow={content.pageContent.services.eyebrow}
            title={content.pageContent.services.title}
            description={content.pageContent.services.description}
            viewAllHref="/services"
            viewAllLabel="View all services"
            items={serviceRailItems}
          />
        </Container>
      </Section>

      <Section className="pb-0 sm:pb-0">
        <Container>
          <ContentRail
            eyebrow={content.pageContent.industries.eyebrow}
            title={content.pageContent.industries.title}
            description={content.pageContent.industries.description}
            viewAllHref="/industries"
            viewAllLabel="View all industries"
            items={industryRailItems}
            className="pb-6 sm:pb-8"
          />
        </Container>
      </Section>

      <Section className="pt-4 sm:pt-6">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">Start here</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Start with the problem, not the technology.
              </h2>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
              <div
                className="grid gap-2 sm:grid-cols-2"
                role="tablist"
                aria-label="Project needs selector"
              >
                {needs.map((need, index) => (
                  <button
                    key={need.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedNeed === index}
                    aria-controls="need-panel"
                    onClick={() => setSelectedNeed(index)}
                    className={[
                      "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                      selectedNeed === index
                        ? "border-forest bg-surface-muted text-ink"
                        : "border-border bg-transparent text-muted hover:border-forest/50 hover:text-ink"
                    ].join(" ")}
                  >
                    {need.label}
                  </button>
                ))}
              </div>

              <div id="need-panel" role="tabpanel" className="mt-6 border-t border-border pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">
                  Relevant service
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                  {activeNeed.label}
                </h3>
                <p className="mt-4 text-base leading-7 text-muted">{activeNeed.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-[0.94fr_1.06fr]">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
                      Service fit
                    </p>
                    <p className="mt-2 text-base font-medium">{activeNeed.service}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
                      Practical next steps
                    </p>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-muted">
                      {activeNeed.steps.map((step) => (
                        <li key={step} className="flex gap-2">
                          <span className="mt-1 size-2 rounded-full bg-olive" aria-hidden="true" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={activeNeed.href}>{activeNeed.ctaLabel}</Button>
                  <Link
                    href="/start-project"
                    className="inline-flex items-center gap-2 rounded-md border border-forest bg-forest px-4 py-3 text-sm font-semibold text-on-forest shadow-[0_8px_20px_rgba(17,28,46,0.12)] transition-colors hover:bg-forest-hover"
                  >
                    Talk with Archex <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">Capabilities</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              The engineering behind better software.
            </h2>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-3 lg:sticky lg:top-24">
              {capabilityRows.map((item, index) => {
                const Icon = item.icon;
                const isSelected = selectedCapability === index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedCapability(index)}
                    className={[
                      "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors",
                      isSelected
                        ? "border-forest bg-surface text-ink"
                        : "border-border bg-transparent text-muted hover:border-forest/60"
                    ].join(" ")}
                    aria-pressed={isSelected}
                  >
                    <div className="mt-1 rounded-full bg-surface-muted p-2 text-forest">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xl font-semibold tracking-[-0.02em] text-ink">
                          {item.label}
                        </span>
                        <ArrowUpRight size={16} className="text-forest" aria-hidden="true" />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:min-h-[31rem]">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">
                  {activeCapability.label}
                </p>
                <Link
                  href={activeCapability.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-forest"
                >
                  Learn more <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                {activeCapability.summary}
              </h3>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
                    Problems it addresses
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-muted">
                    {activeCapability.problems.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-2 rounded-full bg-olive" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
                    Typical engagement work
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-muted">
                    {activeCapability.details.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-2 rounded-full bg-forest" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">AI approach</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Use AI where it earns its place.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              We help businesses identify useful applications of AI, connect them to existing
              software and workflows, and address the real issues around data access, reliability,
              evaluation, security, and operational fit.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <div
              className="grid gap-3 sm:grid-cols-2"
              role="tablist"
              aria-label="AI workflow stages"
            >
              {aiStages.map((stage, index) => (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedAiStage === index}
                  onClick={() => setSelectedAiStage(index)}
                  className={[
                    "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                    selectedAiStage === index
                      ? "border-forest bg-surface-muted text-ink"
                      : "border-border bg-transparent text-muted hover:border-forest/50 hover:text-ink"
                  ].join(" ")}
                >
                  {stage.title}
                </button>
              ))}
            </div>

            <div
              className="mt-6 min-h-[14rem] rounded-xl border border-border bg-surface-muted p-5 sm:p-6"
              role="tabpanel"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
                Stage {selectedAiStage + 1} of {aiStages.length} / AI workflow design
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                {activeAiStage.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-muted">{activeAiStage.body}</p>

              <div className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2 text-xs">
                <div>
                  <p className="font-mono uppercase tracking-[0.16em] text-olive font-semibold">
                    Systems & inputs involved
                  </p>
                  <p className="mt-1.5 leading-5 text-muted">{activeAiStage.inputs}</p>
                </div>
                <div>
                  <p className="font-mono uppercase tracking-[0.16em] text-olive font-semibold">
                    Human review & guardrails
                  </p>
                  <p className="mt-1.5 leading-5 text-muted">{activeAiStage.humanRole}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:gap-12">
          <div className="space-y-8">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">
                Modernization
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Your existing software may need improvement, not replacement.
              </h2>
            </div>

            <div className="space-y-4" role="tablist" aria-label="Modernization tracks">
              {modernizationTracks.map((track, index) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setSelectedModernization(index)}
                  className={[
                    "w-full rounded-2xl border p-4 text-left transition-colors",
                    selectedModernization === index
                      ? "border-forest bg-surface text-ink shadow-sm"
                      : "border-border bg-transparent text-muted hover:border-forest/50 hover:text-ink"
                  ].join(" ")}
                  aria-pressed={selectedModernization === index}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
                    Modernization track 0{index + 1}
                  </p>
                  <p className="mt-2 text-base font-semibold leading-snug">{track.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 lg:min-h-[27rem] lg:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
              Modernization path / Scenario 0{selectedModernization + 1}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              {activeModernization.name}
            </h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive font-semibold">
                  Current bottleneck
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {activeModernization.situation}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive font-semibold">
                  Engineering approach
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {activeModernization.approach}
                </p>
              </div>
              <div className="rounded-xl border border-forest/30 bg-forest/5 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-forest font-semibold">
                  Target outcome
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {activeModernization.outcome}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">How we work</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Clear decisions. Steady progress. Maintainable results.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="space-y-3">
              {content.processStages.map((stage, index) => (
                <button
                  key={stage.slug}
                  type="button"
                  onClick={() => setSelectedStage(index)}
                  className={[
                    "w-full rounded-2xl border p-4 text-left transition-colors",
                    selectedStage === index
                      ? "border-forest bg-surface text-ink"
                      : "border-border bg-transparent text-muted hover:border-forest/50 hover:text-ink"
                  ].join(" ")}
                  aria-pressed={selectedStage === index}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight size={16} className="text-forest" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.02em]">{stage.title}</p>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted p-6 lg:min-h-[14rem]">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
                Stage {selectedStage + 1} of {content.processStages.length} / Delivery process
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                {activeWorkStage.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">{activeWorkStage.body}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <ContentRail
            eyebrow={content.pageContent.work.eyebrow}
            title={content.pageContent.work.title}
            description={content.pageContent.work.description}
            viewAllHref="/work"
            viewAllLabel="View all work"
            items={workRailItems}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <ContentRail
            eyebrow={content.pageContent.insights.eyebrow}
            title={content.pageContent.insights.title}
            description={content.pageContent.insights.description}
            viewAllHref="/insights"
            viewAllLabel="View all insights"
            items={insightRailItems}
          />
        </Container>
      </Section>

      <section className="bg-forest py-16 text-on-forest sm:py-20">
        <Container className="grid gap-8 md:grid-cols-[1.2fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              {content.pageContent.cta.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-on-forest/80">
              {content.pageContent.cta.description}
            </p>
          </div>
          <Button href="/start-project" variant="secondary" className="bg-surface text-ink">
            {content.pageContent.cta.label}
          </Button>
        </Container>
      </section>
    </>
  );
}
