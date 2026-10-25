import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "Engagement Models", path: "/engagement-models" });

export default function EngagementModelsPage() {
  const models = [
    {
      title: "Defined-scope project delivery",
      summary:
        "Best for a bounded product, integration, or modernization phase with explicit milestones and clear checkpoints.",
      fit: "A new MVP, discrete portal, AI workflow integration, or targeted system migration where requirements can be shaped into an agreed initial boundary.",
      scope:
        "Scope is defined upfront in writing with agreed deliverables, architectural choices, acceptance criteria, and a fixed milestone schedule.",
      collaboration:
        "Bi-weekly sprint demonstrations, written decision records, and transparent pull requests so stakeholders always see working progress.",
      ownership:
        "Full intellectual property, Git repositories, automated deployment pipelines, and operational handover documentation belong to the client upon milestone acceptance."
    },
    {
      title: "Extended engineering capacity",
      summary:
        "Best when an active product, design, or operations team needs durable, senior technical capacity without recruitment delays.",
      fit: "Product engineering teams with established backlogs that need dedicated senior full-stack, AI, or backend engineers to accelerate roadmap velocity.",
      scope:
        "Flexible, backlog-driven prioritization coordinated directly with the client's internal product manager, tech lead, or engineering director.",
      collaboration:
        "Integrated directly into client standups, issue trackers (Linear/Jira), GitHub reviews, and technical planning sessions as an embedded peer team.",
      ownership:
        "All code is committed directly into the client’s version control systems under client-owned branches and access management protocols."
    },
    {
      title: "Ongoing engineering partnership",
      summary:
        "Best for continuous maintenance, release cadence, quality engineering, observability, and gradual product evolution.",
      fit: "Production systems and operational software that require dependable technical stewardship, regular dependency updates, and continuous improvements.",
      scope:
        "Quarterly roadmaps combined with monthly allocations for urgent bug remediation, performance optimization, and minor feature iterations.",
      collaboration:
        "Scheduled monthly reviews, uptime and performance telemetry tracking, and predictable escalation paths for operational incidents.",
      ownership:
        "Continuous client repository stewardship with clear changelogs, automated regression suites, and living system documentation."
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Ways of working"
        title="Choose the working arrangement that fits the job."
        summary="A defined project delivery, embedded capacity, or ongoing support can each be right. The distinction is what needs to be delivered, how decisions are made, and where ownership sits."
      />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-3">
          {models.map((model) => (
            <div
              key={model.title}
              className="flex flex-col rounded-md border border-border bg-surface p-6 sm:p-8"
            >
              <h2 className="text-2xl font-semibold leading-tight">{model.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted">{model.summary}</p>

              <div className="mt-8 space-y-6 border-t border-border pt-6 text-sm">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                    When it is a good fit
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted">{model.fit}</p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                    Scope & prioritization
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted">{model.scope}</p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                    Collaboration & review
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted">{model.collaboration}</p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                    Ownership & handover
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted">{model.ownership}</p>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </Section>
      <CTA />
    </>
  );
}
