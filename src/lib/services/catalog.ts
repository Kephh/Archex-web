export type ServiceDefinition = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categorySlug: string;
  href: string;
  problems: string[];
  capabilities: string[];
  goodFit?: string[];
  considerations?: string[];
  distinction?: string;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  description: string;
  services: ServiceDefinition[];
};

const categoryData: Omit<ServiceCategory, "services">[] = [
  { slug: "ai-ml-development", name: "AI & ML Development", description: "Useful AI experiences connected to real workflows, data, and reviewable decisions." },
  { slug: "web-cms-development", name: "Web & CMS Development", description: "Customer-facing websites and web applications shaped around clear content and user journeys." },
  { slug: "ecommerce-development", name: "Ecommerce Development", description: "Commerce experiences and operational connections designed for maintainable delivery." },
  { slug: "mobile-app-development", name: "Mobile App Development", description: "Mobile products that fit the needs of users, teams, and the systems around them." },
  { slug: "software-development", name: "Software Development", description: "Product and platform engineering from an initial release through continued improvement." }
];

const definitions: ServiceDefinition[] = [
  ["chatbot-development", "Chatbot Development", "Design and build conversational experiences with clear data boundaries, evaluation, and escalation paths.", "ai-ml-development", "AI & ML Development", ["Support or intake work is repetitive but still needs accountable human review.", "A conversational experience needs to connect to existing information or workflows."], ["Conversation and user-flow design.", "Knowledge-source and application integration where appropriate.", "Evaluation, fallback behavior, monitoring, and handoff paths."]],
  ["generative-ai-development", "Generative AI Development", "Explore and engineer generative AI features around a useful product or operational problem.", "ai-ml-development", "AI & ML Development", ["A team needs to assess where generation can help without hiding uncertainty.", "A prototype needs a path toward measurable, maintainable product behavior."], ["Workflow discovery and prototype shaping.", "Prompt, context, and output design.", "Evaluation examples, safeguards, and reviewable failure modes."]],
  ["ai-integrated-software", "AI-integrated Software", "Connect AI capabilities to existing software, data, and the people responsible for decisions.", "ai-ml-development", "AI & ML Development", ["An existing workflow needs useful automation without losing traceability.", "The surrounding software and integrations are as important as the model."], ["System and data-flow mapping.", "Integration engineering and permission boundaries.", "Human review, observability, and operational ownership."]],
  ["conversational-ai", "Conversational AI", "Build focused conversational interfaces that help people find information or complete a defined task.", "ai-ml-development", "AI & ML Development", ["Users need a clearer way to navigate complex information.", "A conversational interface needs predictable boundaries and useful fallbacks."], ["Intent and interaction design.", "Application and data integration.", "Testing, escalation, and iterative improvement."]],
  ["custom-website-development", "Custom Website Development", "Create a clear, maintainable website experience around the organisation's content and goals.", "web-cms-development", "Web & CMS Development", ["The current website does not explain the offer clearly or support the next action.", "Content and presentation have become difficult to maintain."], ["Information architecture and page structure.", "Responsive frontend implementation.", "Content workflows, accessibility, and launch preparation."]],
  ["web-application-development", "Web Application Development", "Design and build browser-based products, portals, and internal tools around how people work.", "web-cms-development", "Web & CMS Development", ["A team needs a focused web product or internal application.", "Existing workflows rely on disconnected tools or manual handoffs."], ["User journeys, application architecture, and integrations.", "Frontend and backend engineering.", "Testing, observability, and maintainable delivery."]],
  ["cms-development", "CMS Development", "Shape a content system and publishing experience that keeps editorial work clear and dependable.", "web-cms-development", "Web & CMS Development", ["Content updates require too much technical intervention.", "The publishing model no longer matches the site's structure."], ["Content modelling and editorial workflows.", "Frontend templates and structured content.", "Migration planning, preview, and governance considerations."]],
  ["ecommerce-design", "Ecommerce Design", "Clarify the shopping journey, catalogue structure, and operational needs before implementation.", "ecommerce-development", "Ecommerce Development", ["Customers struggle to find products or complete a purchase.", "Commerce requirements are unclear across product, content, and operations."], ["Journey and information architecture work.", "Catalogue and checkout-flow definition.", "A practical implementation path with constraints in view."]],
  ["ecommerce-implementation", "Ecommerce Implementation", "Implement a maintainable commerce experience and the integrations around it.", "ecommerce-development", "Ecommerce Development", ["A commerce experience needs to move from plan to reliable release.", "Storefront and operational systems need clearer connections."], ["Storefront and catalogue implementation.", "Checkout and relevant system integrations.", "Testing, launch preparation, and support planning."]],
  ["woocommerce-development", "WooCommerce Development", "Extend or build a WooCommerce experience around the catalogue, checkout, and operational workflow.", "ecommerce-development", "Ecommerce Development", ["A WooCommerce store needs a clearer customer or operational experience.", "The current implementation needs focused improvement rather than unnecessary replacement."], ["Storefront customisation and catalogue work.", "Commerce-flow and integration implementation.", "Testing, launch preparation, and maintainability."]],
  ["shopify-development", "Shopify Development", "Shape a Shopify storefront and connected workflow around a clear commerce requirement.", "ecommerce-development", "Ecommerce Development", ["A Shopify storefront needs focused design or implementation work.", "Content, catalogue, and operational needs need to align."], ["Theme and storefront implementation.", "Catalogue and commerce-flow improvements.", "Integration boundaries, testing, and launch planning."]],
  ["ecommerce-development", "Ecommerce Development", "Build and improve commerce software with customer journeys and operational realities in view.", "ecommerce-development", "Ecommerce Development", ["Commerce work spans frontend, data, payments, and internal operations.", "A team needs an engineering partner for a focused commerce initiative."], ["Discovery and implementation planning.", "Storefront, catalogue, and integration engineering.", "Quality checks and incremental improvement."]],
  ["android-app-development", "Android App Development", "Build Android experiences around a focused product need and the systems that support it.", "mobile-app-development", "Mobile App Development", ["Users need a reliable mobile experience for an important workflow.", "The app must fit existing product and data boundaries."], ["Mobile user-flow and application design.", "Android implementation and API integration.", "Testing, release preparation, and support considerations."]],
  ["ios-app-development", "iOS App Development", "Create an iOS experience with a clear purpose, dependable integration, and room to evolve.", "mobile-app-development", "Mobile App Development", ["A product needs a focused iOS experience.", "Mobile requirements need to connect cleanly to existing systems."], ["User journey and interaction design.", "iOS implementation and integration.", "Testing, release preparation, and maintainability."]],
  ["cross-platform-mobile-development", "Cross-platform Mobile Development", "Develop a shared mobile experience where consistency and delivery constraints make that approach useful.", "mobile-app-development", "Mobile App Development", ["A team needs to support multiple mobile platforms with a coherent product experience.", "The delivery approach needs to balance reuse with platform-specific needs."], ["Cross-platform architecture and interaction design.", "Shared application implementation and service integration.", "Device testing and release planning."]],
  ["react-native-development", "React Native Development", "Use React Native where a shared mobile codebase supports the product's needs and constraints.", "mobile-app-development", "Mobile App Development", ["A product team needs to extend mobile delivery capacity.", "A shared implementation may reduce duplicated work while preserving a useful experience."], ["Mobile architecture and component planning.", "React Native implementation and API integration.", "Testing, platform review, and release preparation."]],
  ["mvp-development", "MVP Development", "Turn a focused product idea into a useful first release with the risks and learning goals made explicit.", "software-development", "Software Development", ["A product idea needs a clear first boundary.", "The team needs to learn through working software rather than an oversized initial build."], ["Problem framing and release planning.", "Core product and integration engineering.", "Feedback loops, quality checks, and next-step decisions."]],
  ["saas-development", "SaaS Development", "Build software products with the foundations needed for users, permissions, data, and continued delivery.", "software-development", "Software Development", ["A product needs a maintainable path from initial release to growth.", "Account, workflow, and operational concerns need to be designed together."], ["Product architecture and application engineering.", "Data, permissions, integrations, and observability.", "Incremental delivery and maintainable support."]],
  ["erp-software", "ERP Software", "Improve or build operational software that connects important business processes without hiding complexity.", "software-development", "Software Development", ["Core operations are spread across manual steps or disconnected systems.", "A business needs clearer workflows and system boundaries."], ["Process and dependency mapping.", "Workflow, data, and integration engineering.", "Incremental improvement and operational review."]],
  ["crm-systems", "CRM Systems", "Create or improve customer and relationship workflows so teams have clearer information and handoffs.", "software-development", "Software Development", ["Customer information and follow-up work are fragmented.", "Teams need a more dependable workflow around relationship data."], ["Workflow and data-model clarification.", "Application and integration engineering.", "Permissions, reporting needs, and iterative improvement."]],
  ["enterprise-software", "Enterprise Software", "Engineer dependable software for complex organisations, constraints, and connected workflows.", "software-development", "Software Development", ["A critical system has become hard to change or integrate.", "Multiple teams need clearer ownership and delivery boundaries."], ["Architecture and dependency review.", "Application, API, and integration work.", "Testing, observability, release confidence, and support."]],
  ["custom-software-development", "Custom Software Development", "Design and build products, portals, internal applications, workflow tools, and integrations around how people work.", "software-development", "Software Development", ["A business needs software shaped around a real workflow or product opportunity.", "Off-the-shelf tools leave important gaps or create unnecessary friction."], ["Product discovery and technical planning.", "Application engineering, APIs, data flows, and integrations.", "Testing, observability, and a maintainable path after launch."]]
].map(([slug, title, summary, categorySlug, category, problems, capabilities]) => ({
  slug, title, summary, categorySlug, category, problems, capabilities, href: `/services/${slug}`
} as ServiceDefinition));

export const serviceDetails: Record<
  string,
  { goodFit: string[]; considerations: string[]; distinction: string }
> = {
  "chatbot-development": {
    goodFit: [
      "Customer or internal intake requires automated routing of high-frequency, well-defined inquiries.",
      "Support queues need automated initial triage before human agents take over.",
      "Clear knowledge articles and documented business rules exist as a source of truth."
    ],
    considerations: [
      "Strict confidence thresholds must be enforced to trigger human escalation rather than hallucinating answers.",
      "Knowledge retrieval latency and context window management affect response speed and user patience.",
      "Conversation logs must be scrubbed of personally identifiable information (PII) before storage."
    ],
    distinction:
      "Chatbots focus on bounded, goal-directed task intake and FAQ resolution. For open-ended natural dialogue across multi-step enterprise workflows, consider Conversational AI; for content drafting or unstructured analysis, explore Generative AI Development."
  },
  "conversational-ai": {
    goodFit: [
      "Users need to accomplish multi-turn transactions (e.g., booking, status lookup, updates) using natural language.",
      "The interface must maintain context across several conversational turns and adapt to ambiguous phrasing.",
      "The assistant coordinates actions across multiple backend APIs and databases."
    ],
    considerations: [
      "Dialogue state tracking requires robust session persistence and graceful handling of conversation topic switches.",
      "Integration with transaction APIs requires idempotent endpoints and confirmation steps before state changes.",
      "Comprehensive test suites with edge-case dialogue simulation are essential to prevent dead-end conversational loops."
    ],
    distinction:
      "Conversational AI handles flexible multi-turn workflows and intent recognition. Unlike single-turn Chatbots or pure Generative AI drafting tools, it emphasizes interactive problem solving and verified backend task execution."
  },
  "generative-ai-development": {
    goodFit: [
      "Teams need automated summarization, structured data extraction, or first-draft content synthesis.",
      "High volumes of unstructured documents (PDFs, transcripts, reports) need systematic analysis.",
      "A domain-specific workflow can be accelerated by AI suggestions under human review."
    ],
    considerations: [
      "Prompt engineering and model parameters must be version-controlled alongside evaluation benchmarks.",
      "Outputs must be validated against structured JSON schemas to prevent downstream parsing failures.",
      "Latency and token economics require caching strategies and appropriately sized model selection."
    ],
    distinction:
      "Generative AI focuses on synthesizing text, code, or structured insights from inputs. For interactive dialogues, see Chatbot or Conversational AI; for embedding intelligence into transactional backends, see AI-integrated Software."
  },
  "ai-integrated-software": {
    goodFit: [
      "An established business application or ERP workflow needs machine learning without replacing the core platform.",
      "Decisions require automated scoring, classification, or recommendation while keeping human operators in the loop.",
      "High reliability, audit logging, and data governance are strictly required."
    ],
    considerations: [
      "Background worker queues and asynchronous event streaming isolate model inference latency from user requests.",
      "Telemetry must monitor prediction drift, model latency, and operator override frequencies.",
      "Permission models must ensure models only process data the calling user is authorized to view."
    ],
    distinction:
      "AI-integrated Software embeds intelligence directly into core business systems. It prioritizes data pipelines, system boundaries, and operational auditability over standalone chat interfaces."
  },
  "custom-website-development": {
    goodFit: [
      "An organization requires a distinctive, performant web presence tailored to its exact brand and service narrative.",
      "Off-the-shelf templates limit page speed, accessibility, or integration with internal systems.",
      "Search visibility (SEO), core web vitals, and structured schema markup are top business priorities."
    ],
    considerations: [
      "Static generation (SSG) and incremental revalidation (ISR) provide sub-second loads while keeping content fresh.",
      "Semantic HTML and strict WCAG accessibility compliance ensure equal access and stronger search indexation.",
      "Careful asset optimization and minimal client-side JavaScript keep initial load times under budget."
    ],
    distinction:
      "Custom Websites prioritize visitor understanding, brand distinction, and lead capture. For interactive workflows and authenticated user tools, see Web Application Development; for content-team publishing autonomy, see CMS Development."
  },
  "web-application-development": {
    goodFit: [
      "Teams need browser-based client portals, admin dashboards, or customer SaaS applications.",
      "Complex interactive state, data tables, filtering, and role-based access are core requirements.",
      "Multiple internal services, third-party APIs, and databases must be orchestrated securely."
    ],
    considerations: [
      "State management, optimistic UI updates, and real-time synchronization require deliberate architecture.",
      "Session security, CSRF protection, and granular authorization checks must protect every API route.",
      "Automated end-to-end testing (Playwright) is critical to verify user workflows across releases."
    ],
    distinction:
      "Web Applications are software systems delivered in the browser with complex logic and authenticated workflows, distinct from informational Custom Websites or editorial CMS platforms."
  },
  "cms-development": {
    goodFit: [
      "Marketing and editorial teams need to publish, update, and schedule content without developer assistance.",
      "Content needs to be structured and reusable across multiple channels (web, mobile, email, documentation).",
      "Draft, preview, approval, and versioning workflows are required for editorial governance."
    ],
    considerations: [
      "Headless CMS architectures decouple content authoring from modern frontend presentation frameworks.",
      "Content modeling requires balance: structured enough for consistency, flexible enough for varied layouts.",
      "Webhook-driven cache invalidation must be instantaneous so editors see live updates immediately."
    ],
    distinction:
      "CMS Development focuses on content authoring workflows and headless publishing architecture, contrasting with bespoke Web Applications or single-purpose transactional tools."
  },
  "ecommerce-design": {
    goodFit: [
      "Store catalog complexity or confusing navigation is hurting checkout conversion rates.",
      "A retailer needs information architecture, user journeys, and wireframes before committing to implementation.",
      "Omnichannel operations require a cohesive design system across desktop, mobile, and in-store pickup."
    ],
    considerations: [
      "Mobile-first checkout UX and frictionless payment sheet integration (Apple Pay, Google Pay) maximize conversion.",
      "Clear taxonomy, filtering facets, and search result layouts reduce customer discovery fatigue.",
      "Design systems must account for edge cases: out-of-stock variations, backorders, and localized shipping restrictions."
    ],
    distinction:
      "Ecommerce Design focuses on customer journeys, catalog taxonomy, and conversion architecture prior to coding. For full-stack implementation, see Ecommerce Implementation or platform-specific builds."
  },
  "ecommerce-implementation": {
    goodFit: [
      "A commerce project has completed discovery/design and requires full-stack engineering delivery.",
      "Complex custom business rules (tiered B2B pricing, custom bundling, subscriptions) must be coded reliably.",
      "Storefronts must integrate seamlessly with warehouse management systems (WMS), ERPs, and tax calculators."
    ],
    considerations: [
      "Payment processing and tokenization must adhere strictly to PCI-DSS compliance boundaries.",
      "Inventory race conditions during flash sales or high volume require atomic database transactions or queue locks.",
      "Checkout flows must degrade gracefully if a secondary integration (e.g. loyalty points or tax lookup) experiences latency."
    ],
    distinction:
      "Ecommerce Implementation covers end-to-end full-stack engineering, payment flows, and ERP integrations. For hosted SaaS stores, see Shopify Development; for WordPress environments, see WooCommerce Development."
  },
  "woocommerce-development": {
    goodFit: [
      "A business already operates on WordPress and requires a commerce store with full data and server ownership.",
      "Custom plugins, bespoke checkout fields, or self-hosted database access are necessary for operations.",
      "Subscription or membership models require tailored billing rules without perpetual SaaS percentage fees."
    ],
    considerations: [
      "Database query optimization and object caching (Redis) are vital to keep WooCommerce responsive under traffic.",
      "Plugin bloat must be strictly controlled; core commerce logic should be engineered as lean, tested custom modules.",
      "Staging environments and automated database migration scripts prevent production downtime during core updates."
    ],
    distinction:
      "WooCommerce provides open-source flexibility, custom data control, and deep WordPress integration. In contrast, Shopify Development offers a fully managed, hosted SaaS infrastructure with ecosystem apps."
  },
  "shopify-development": {
    goodFit: [
      "A merchant prioritizes a managed, hosted infrastructure with minimal DevOps maintenance overhead.",
      "Rapid time-to-market and integration with Shopify App Store tools (Klaviyo, Gorgias, Recharge) are desired.",
      "Custom Liquid themes or headless Hydrogen/Next.js storefronts are needed for differentiated branding."
    ],
    considerations: [
      "Headless implementations require Storefront API rate limit awareness and edge caching strategies.",
      "Liquid theme architecture must follow modular section patterns to empower merchant visual customization.",
      "Checkout extensibility and Shopify Functions should be used for custom discount, shipping, or payment rules."
    ],
    distinction:
      "Shopify Development leverages Shopify's hosted ecosystem and checkout reliability. For self-hosted flexibility or deeply customized WordPress workflows, see WooCommerce Development."
  },
  "ecommerce-development": {
    goodFit: [
      "An organization requires full-lifecycle commerce engineering from initial strategy through integration and release.",
      "Multi-currency, international fulfillment, or hybrid B2B/B2C workflows require a tailored approach.",
      "Existing commerce platforms require incremental modernization without a high-risk immediate replatform."
    ],
    considerations: [
      "Platform evaluation (custom vs headless vs SaaS) must consider total cost of ownership and engineering maintenance.",
      "Centralized order management and unified inventory APIs prevent data fragmentation across channels.",
      "End-to-end load testing ensures payment gateways and checkout funnels withstand seasonal traffic spikes."
    ],
    distinction:
      "Ecommerce Development represents the broad strategic engineering discipline spanning custom, headless, and platform-based commerce solutions."
  },
  "android-app-development": {
    goodFit: [
      "A product requires deep integration with native Android OS capabilities (background workers, NFC, Bluetooth, notifications).",
      "Target users utilize diverse Android hardware spanning specialized ruggedized tablets to flagship phones.",
      "Performance-critical rendering, local database synchronization, or enterprise device management (MDM) is required."
    ],
    considerations: [
      "Modern development using Kotlin and Jetpack Compose ensures maintainable, declarative UI code.",
      "Device fragmentation requires testing across varied screen densities, OS API levels, and power management profiles.",
      "Background sync must comply with Android WorkManager and battery optimization restrictions."
    ],
    distinction:
      "Native Android Development optimizes specifically for Android OS features and hardware variety. For iOS-first builds, see iOS App Development; for shared multi-platform codebases, explore React Native or Cross-platform Development."
  },
  "ios-app-development": {
    goodFit: [
      "A product targets the Apple ecosystem with high expectations for native fluidity, gestures, and typography.",
      "Integration with Apple hardware features (Face ID, CoreML, Secure Enclave, HealthKit, Apple Pay) is central.",
      "The product requires native App Store compliance, widget extensions, or watchOS/iPadOS companionship."
    ],
    considerations: [
      "Swift and SwiftUI enable declarative, reactive architectures with high visual polish and fast execution.",
      "Strict App Store review guidelines require careful entitlement configuration, privacy manifests, and error handling.",
      "Offline-first local persistence (CoreData/SwiftData) keeps mobile interactions responsive during network transit."
    ],
    distinction:
      "Native iOS Development delivers uncompromised platform fidelity and Apple hardware access. For unified mobile releases, see React Native Development or Cross-platform Mobile Development."
  },
  "cross-platform-mobile-development": {
    goodFit: [
      "A team must launch on both iOS and Android simultaneously with a unified feature set and team velocity.",
      "The application revolves around standard UI forms, lists, media, and API communication rather than hardware sensors.",
      "Engineering resources are optimized around a shared codebase, shared testing, and consistent release cycles."
    ],
    considerations: [
      "Platform-specific visual nuances (navigation bars, back gestures, haptics) must be honored to avoid a foreign feel.",
      "Native bridging libraries must be kept lean and thoroughly audited during major OS version upgrades.",
      "Automated continuous integration (CI) must build and run tests for both platform targets on every pull request."
    ],
    distinction:
      "Cross-platform Mobile Development encompasses strategic multi-platform architecture. When using a TypeScript/React ecosystem specifically, see React Native Development; for hardware-intensive builds, explore native iOS or Android."
  },
  "react-native-development": {
    goodFit: [
      "An engineering team with TypeScript and React experience wants to extend capabilities to iOS and Android.",
      "Code sharing between web applications and mobile apps (business logic, validation schemas, API clients) saves time.",
      "Fast deployment of updates via continuous integration workflows is prioritized."
    ],
    considerations: [
      "The new React Native architecture (Fabric renderer, TurboModules) provides near-native bridge performance.",
      "Third-party native dependencies must be managed carefully to avoid dependency version conflicts during Xcode/Gradle builds.",
      "Native touch responsiveness requires keeping JavaScript thread computations unblocked."
    ],
    distinction:
      "React Native uses TypeScript and declarative React components to compile to native platform views. For pure native performance-critical apps, choose iOS or Android App Development."
  },
  "mvp-development": {
    goodFit: [
      "A founder or product team needs to validate a specific product hypothesis with real customers before heavy capital investment.",
      "The scope can be disciplined down to core value workflows, cutting speculative secondary features.",
      "Learning speed, user observation, and rapid iteration are prioritized over premature enterprise scaling."
    ],
    considerations: [
      "Architecture must be clean and well-structured, but not over-engineered: build for change, not theoretical scale.",
      "Analytics and session instrumentation are essential from day one to understand how early users actually interact.",
      "Explicit technical debt decisions are documented so teams know what will need hardening as adoption grows."
    ],
    distinction:
      "MVP Development is disciplined scoping and rapid delivery focused on validating product market fit. For mature multi-tenant systems, see SaaS Development; for large enterprise workflows, see Enterprise Software."
  },
  "saas-development": {
    goodFit: [
      "Building a multi-tenant cloud software subscription product with tiered user roles and automated billing.",
      "Self-service onboarding, organization workspaces, team invitations, and audit logging are required.",
      "The product requires high uptime, SOC2-aligned permission structures, and automated subscriber lifecycle management."
    ],
    considerations: [
      "Tenant data isolation (row-level security, separate schemas, or isolated databases) must be designed defensively.",
      "Subscription billing (Stripe) integration requires robust webhook processing and plan entitlement enforcement.",
      "Background task workers (queues, cron schedules) prevent heavy computational tasks from degrading web server latency."
    ],
    distinction:
      "SaaS Development focuses on multi-tenant architecture, subscription lifecycle, and customer self-service. For early validation builds, see MVP Development; for internal operations, see ERP or Custom Software Development."
  },
  "erp-software": {
    goodFit: [
      "Core operations (purchasing, inventory, work orders, shipping, finance) are fragmented across disparate spreadsheets.",
      "Teams lose time to duplicate data re-entry and lack a unified source of operational truth.",
      "Standard commercial ERPs are too rigid, costly, or complex for the company's specific operating model."
    ],
    considerations: [
      "Business process mapping and relational data modeling must precede software development to ensure accurate entity relationships.",
      "Data migration from legacy spreadsheets requires rigorous deduplication, normalization, and validation checks.",
      "Gradual phased rollout by module (e.g. inventory first, then purchasing) prevents operational disruption."
    ],
    distinction:
      "ERP Software unifies core back-office operations and material resource workflows. In contrast, CRM Systems manage customer and deal pipelines; Custom Software Development delivers standalone workflow tools."
  },
  "crm-systems": {
    goodFit: [
      "Sales, account management, or service teams struggle with scattered contact histories, lost leads, and manual handoffs.",
      "Custom business rules, unique qualification stages, or proprietary client data schemas cannot fit off-the-shelf CRMs.",
      "Direct integration with custom customer portals, internal billing, or communication channels is required."
    ],
    considerations: [
      "Data hygiene and deduplication rules are essential to prevent stale or corrupted relationship records.",
      "Activity timelines (emails, notes, meetings, status changes) must be fast to load and frictionless to update.",
      "Granular role-based permissions protect sensitive commercial deal terms and client contact information."
    ],
    distinction:
      "CRM Systems center on relationship management, communications, and customer lifecycle tracking, whereas ERP Software orchestrates internal logistics, inventory, and back-office operations."
  },
  "enterprise-software": {
    goodFit: [
      "Large organizations requiring high-governance software that complies with strict security, audit, and reliability standards.",
      "Multiple teams and external systems must coordinate through standardized APIs and decoupled event architectures.",
      "The application must support single sign-on (SSO/SAML), role hierarchies, and long-term maintainability."
    ],
    considerations: [
      "Comprehensive architectural review of dependencies, database constraints, and network segmentation is mandatory.",
      "Detailed telemetry, structured logging, and APM tracing enable fast root-cause identification in production.",
      "Deployment pipelines must feature automated regression testing, security scanning, and zero-downtime rolling updates."
    ],
    distinction:
      "Enterprise Software focuses on scale, governance, compliance, and multi-system integration in large organizations, differing from early-stage MVP or focused single-team custom software tools."
  },
  "custom-software-development": {
    goodFit: [
      "An organization requires software tailored to its unique operational workflow, proprietary advantage, or product concept.",
      "Commercial off-the-shelf software forces inefficient compromises or charges prohibitive per-seat licensing.",
      "The business wants full ownership of its intellectual property, codebase, and technical roadmap."
    ],
    considerations: [
      "Disciplined scope definition and iterative delivery prevent feature creep and ensure budget predictability.",
      "Clean architectural boundaries and thorough automated test coverage make future extensions safe and straightforward.",
      "Transparent written technical documentation and developer handover ensure long-term client independence."
    ],
    distinction:
      "Custom Software Development is the foundational discipline of engineering bespoke applications, portals, and workflow engines shaped around exact business needs."
  }
};

export const serviceCategories: ServiceCategory[] = categoryData.map((category) => ({
  ...category,
  services: definitions
    .filter((service) => service.categorySlug === category.slug)
    .map((service) => ({ ...service, ...serviceDetails[service.slug] }))
}));

export const serviceCatalog = definitions.map((service) => ({
  ...service,
  ...serviceDetails[service.slug]
}));

export function getCatalogService(slug: string): ServiceDefinition | undefined {
  const service = definitions.find((s) => s.slug === slug);
  if (!service) return undefined;
  return { ...service, ...serviceDetails[slug] };
}
