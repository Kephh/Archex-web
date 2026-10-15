# Archex Static Data, Hardcoded Values, and Database Architecture Audit

**Audit date:** 2026-10-15  
**Scope:** Repository files under `Archex-web`, excluding `node_modules`, `.next`, test output, and dependency internals. `.env.local` was not read or reproduced.  
**Method:** Read-only repository inspection of routes, components, content, configuration, tests, migrations, and data-access code. A live Supabase project, hosting environment, browser session, and third-party dashboards were not queried.

## 1. Executive summary

Archex is a mostly static, version-controlled marketing site:

- **MDX repository content** is the source for the five content kinds loaded by `src/lib/content/loader.ts`: services, modernization, industries, work, and insights.
- **TypeScript constants** hold the expanded service catalogue, site identity, navigation, homepage editorial sections, process/engagement copy, form option values, and UI behaviour.
- **Environment variables** hold deployment URL and credentials for optional integrations.
- **Supabase is transactional only in the code inspected.** The application writes validated enquiry data to `public.leads`; no public page reads business content from Supabase.
- **Resend** sends an optional notification after a lead is persisted.
- **Cloudflare Turnstile** is an optional anti-abuse check.
- **Runtime-generated values** include slugs/routes from directory contents, reading time from body word counts, canonical URLs, metadata, sitemap entries, and theme state.

The organization is reasonable for an early, deployment-reviewed company site. MDX is an appropriate source for editorial content, and stable application rules/design tokens should remain in code. The largest maintenance risks are fragmentation rather than lack of a database:

1. Service content exists in both MDX and a 22-entry TypeScript catalogue, with overlapping slugs and two different rendering paths.
2. The homepage repeats service, industry, work, and insight labels/summaries, including hardcoded `"1 min read"` values rather than using the loader's computed reading time.
3. Navigation and footer route lists are separate constants, while sitemap routes are another manually maintained list.
4. Lead validation values and database constraints are duplicated in application schema and SQL.
5. Content schema supports SEO, dates, status, featured, and related metadata, but most files omit those fields and the insight detail route currently passes all insights as related candidates instead of using `related`.
6. Legal and company identity content is explicitly draft/placeholder content and should not be treated as production-ready.

No evidence was found that a CMS or business-content database is currently required. A future database or headless CMS becomes justified when nontechnical staff need to publish, reorder, feature, schedule, or archive content without a deployment.

## 2. Complete static-data inventory

### 2.1 Company, brand, and shared site identity

| Data group | Value or content | Current source | File path and location | Current consumers | Classification |
|---|---|---|---|---|---|
| Brand name | `Archex` | Shared constant | [`src/config/site.ts`](src/config/site.ts):1-13 | Root metadata, header/footer, manifest, structured data | Business identity; keep in reviewed code/config |
| Tagline | `Good software starts with good engineering.` | Shared constant | [`src/config/site.ts`](src/config/site.ts):2-3 | Root metadata and mobile navigation | Brand copy; static/shared |
| Company positioning | Product engineering, AI workflow integration, and improvement of existing software | Shared constant plus repeated page copy | [`src/config/site.ts`](src/config/site.ts):4-5; [`src/app/about/page.tsx`](src/app/about/page.tsx):11-25; [`src/app/page.tsx`](src/app/page.tsx):300 onward | Metadata, About, homepage, service/AI/modernization pages | Business/editorial content; currently fragmented |
| Email, phone, address | Empty strings | Shared constant | [`src/config/site.ts`](src/config/site.ts):7-10 | Available for future shared display; no visible consumer found | Company configuration; placeholder |
| Social links | Empty LinkedIn/GitHub strings | Shared constant | [`src/config/site.ts`](src/config/site.ts):10-13 | No visible link consumer found | Company configuration; placeholder |
| Brand navigation | Services, Modernization, Industries, Work, Insights, Company | Shared constant | [`src/config/site.ts`](src/config/site.ts):16-23 | Header and mobile navigation; footer reuses this array | Shared navigation configuration |
| Footer service links | AI solutions, Modernization, Engagement models, How we work | Separate constant | [`src/components/layout/footer.tsx`](src/components/layout/footer.tsx):5-10 | Footer | Shared navigation, duplicated relative to route/sitemap lists |
| Homepage company/process copy | Needs, capability rows, AI stages, modernization tracks, delivery stages | Page-local constants | [`src/app/page.tsx`](src/app/page.tsx):11-188 | Homepage interactive sections | Business/editorial content hardcoded in page |
| About philosophy | “Understand”, “Choose”, “Deliver”, “Improve” and explanatory copy | Page-local JSX/array | [`src/app/about/page.tsx`](src/app/about/page.tsx):27-54 | About page | Editorial content hardcoded in page |
| Legal draft content | Privacy and terms sections, review warnings, data-provider descriptions | Page-local JSX | [`src/app/privacy/page.tsx`](src/app/privacy/page.tsx):10-21; [`src/app/terms/page.tsx`](src/app/terms/page.tsx):10-21 | Legal pages | Legal/business content; must receive owner/legal review |
| Logo/mark | SVG path geometry and accessible SVG labels | Static asset | [`public/brand/archex-mark.svg`](public/brand/archex-mark.svg):1-29; [`src/app/icon.svg`](src/app/icon.svg) | Asset/icon surfaces | Design asset; keep static |

The README confirms that email, address, social links, company story/team details, illustrative work, and legal text are launch placeholders: [`README.md`](README.md):87-94.

### 2.2 Services

There are two service sources:

1. **Primary content entries:** three MDX files under `content/services/`, loaded and rendered by the generic content route.
2. **Expanded catalogue:** five categories and 22 catalogue service definitions in [`src/lib/services/catalog.ts`](src/lib/services/catalog.ts):19-64.

| Data group | Value or content | Current source | File path and location | Current consumers | Classification |
|---|---|---|---|---|---|
| Service content entries | `ai-integration`, `application-modernization`, `custom-software-development`; titles, summaries, categories, tags, featured flags, body sections | MDX frontmatter and body | [`content/services/`](content/services/) | Services rail, service detail route, metadata, sitemap | Repository content; appropriate source of truth |
| Service categories | AI & ML Development; Web & CMS Development; Ecommerce Development; Mobile App Development; Software Development | TypeScript array | [`src/lib/services/catalog.ts`](src/lib/services/catalog.ts):19-25 | Slideshow, directory, catalogue detail pages | Structured catalogue data |
| Catalogue services | 22 slugs, titles, summaries, category slugs/names, problem statements, capabilities, generated hrefs | TypeScript tuple array | [`src/lib/services/catalog.ts`](src/lib/services/catalog.ts):27-52 | Directory, slideshow, generated service params, catalogue detail pages | Structured business data; separate from MDX |
| Service ordering | Category array order and tuple order | Array order | [`src/lib/services/catalog.ts`](src/lib/services/catalog.ts):19-52 | UI order and category selection | Editorial/UI configuration |
| Featured service selection | Three MDX service files set `featured: true` | MDX frontmatter | [`content/services/ai-integration.mdx`](content/services/ai-integration.mdx):8; [`content/services/application-modernization.mdx`](content/services/application-modernization.mdx):8; [`content/services/custom-software-development.mdx`](content/services/custom-software-development.mdx):8 | Parsed metadata, but no current featured-service consumer found | Content metadata |
| Catalogue page links | `/services/${slug}` generated from catalogue slug | Computed from shared catalogue | [`src/lib/services/catalog.ts`](src/lib/services/catalog.ts):54-59 | Directory and service route | Computed route; good local single source |
| Expanded catalogue detail copy | Problems, capabilities, “practical way to start”, related category link | Catalogue data plus shared component copy | [`src/components/sections/catalog-service-detail.tsx`](src/components/sections/catalog-service-detail.tsx):4-63 | Non-MDX service detail pages | Component/domain presentation copy |
| Service page hero/CTA copy | Service page heading, description, CTA, primary-service rail | Page/component constants and MDX | [`src/app/services/page.tsx`](src/app/services/page.tsx):18-76; [`src/app/page.tsx`](src/app/page.tsx):191-221 | Services page and homepage | Repeated editorial copy |

**Slug overlap:** `custom-software-development`, `ai-integration`, and `application-modernization` exist in both MDX and the catalogue. [`src/app/services/[slug]/page.tsx`](src/app/services/[slug]/page.tsx):8-31 generates both sets of params but renders the MDX entry first at line 34. A catalogue item with the same slug is therefore not the rendered detail source for those paths. This is an intentional precedence rule in code, but it is not documented as a content ownership rule.

### 2.3 Industries

| Data group | Value or content | Current source | File path and location | Current consumers | Classification |
|---|---|---|---|---|---|
| Industry entries | Operations-heavy businesses; Software product teams | MDX frontmatter and body | [`content/industries/operations-heavy-businesses.mdx`](content/industries/operations-heavy-businesses.mdx):2-16; [`content/industries/software-product-teams.mdx`](content/industries/software-product-teams.mdx):2-16 | Industry index, dynamic detail route, homepage rail, metadata, sitemap | Repository editorial content |
| Industry slugs/routes | `operations-heavy-businesses`, `software-product-teams` | MDX slug + computed route | [`src/lib/content/loader.ts`](src/lib/content/loader.ts):65-82; [`src/app/industries/[slug]/page.tsx`](src/app/industries/[slug]/page.tsx):6-29 | Links, static params, sitemap | Computed from content |
| Homepage industry summaries | Same two summaries as MDX frontmatter | Page-local rail array | [`src/app/page.tsx`](src/app/page.tsx):222-239 | Homepage | Duplicated editorial content |
| Industry positioning disclaimer | No unsupported specialization claims | Index page JSX | [`src/app/industries/page.tsx`](src/app/industries/page.tsx):13-18 | Industry index | Business positioning copy |

No industry-to-service relation, featured flag, image, project result, or publication workflow is represented in the current data.

### 2.4 Work, examples, and case studies

| Data group | Value or content | Current source | File path and location | Current consumers | Classification |
|---|---|---|---|---|---|
| Work entries | AI-assisted intake workflow; Legacy operations platform modernization | MDX frontmatter and body | [`content/work/ai-assisted-intake-workflow.mdx`](content/work/ai-assisted-intake-workflow.mdx):2-25; [`content/work/legacy-operations-platform.mdx`](content/work/legacy-operations-platform.mdx):2-21 | Work index/detail routes, homepage rail, metadata, sitemap | Repository editorial content |
| Work status | Both entries set `illustrative: true`; category is `Illustrative case study` | MDX frontmatter | Same work files, lines 5-8 | Entry cards and detail-page disclaimer | Important disclosure metadata |
| Work disclaimer | No client, metric, or outcome is claimed | Work index and detail component | [`src/app/work/page.tsx`](src/app/work/page.tsx):13-22; [`src/components/sections/detail-page.tsx`](src/components/sections/detail-page.tsx):44-48 | Work index/detail pages | Safety/editorial presentation |
| Homepage work rail | Two MDX examples plus “Product platform foundation” | Page-local array | [`src/app/page.tsx`](src/app/page.tsx):239-261 | Homepage | Duplicated/curated editorial content; third item has no work entry |
| Images/technologies/results/publication state | None represented for work entries | Not present in repository model/files | [`src/lib/content/schema.ts`](src/lib/content/schema.ts):5-18 and `content/work/` | None | Future content-model candidates only |

The repository explicitly distinguishes these from real client case studies in [`README.md`](README.md):65-66 and the work page.

### 2.5 Insights and editorial content

| Data group | Value or content | Current source | File path and location | Current consumers | Classification |
|---|---|---|---|---|---|
| Insight articles | AI integration needs evaluation before confidence; Modernization without the rewrite reflex | MDX frontmatter and body | [`content/insights/ai-integration-needs-evaluation.mdx`](content/insights/ai-integration-needs-evaluation.mdx):2-21; [`content/insights/modernization-without-rewrite-reflex.mdx`](content/insights/modernization-without-rewrite-reflex.mdx):2-17 | Insights explorer/detail route, homepage rail, metadata, sitemap, BlogPosting JSON-LD | Repository editorial content |
| Insight metadata | Title, slug, summary, category, tags, date `2026-10-12`, status `published`, one `featured: true` | MDX frontmatter | Same insight files | Loader, explorer, detail metadata, sitemap | Editorial metadata |
| Author | None | Not represented | [`src/lib/content/schema.ts`](src/lib/content/schema.ts):5-18 | None | Missing metadata, not an existing value |
| Reading time | Calculated as `max(1, ceil(wordCount / 200))` | Runtime computation | [`src/lib/content/loader.ts`](src/lib/content/loader.ts):47-50 | Detail page and explorer | Generated, not editorially stored |
| Insight filtering/search | Query searches title, summary, category, tags, and body; category options are derived from entries | Client computation | [`src/components/sections/insights-explorer.tsx`](src/components/sections/insights-explorer.tsx):14-66 | Insights index | Computed UI behaviour |
| Homepage insight metadata | Both homepage cards hardcode `1 min read` | Page-local array | [`src/app/page.tsx`](src/app/page.tsx):263-278 | Homepage | Duplicated, fragile derived data |
| Related articles | Schema accepts `related`, but detail route passes all insights to `DetailPage`; component filters current entry and takes first two | Code path, not frontmatter relation | [`src/lib/content/schema.ts`](src/lib/content/schema.ts):15-18; [`src/app/insights/[slug]/page.tsx`](src/app/insights/[slug]/page.tsx):31-39; [`src/components/sections/detail-page.tsx`](src/components/sections/detail-page.tsx):12-14 | Insight detail pages | Incomplete relationship implementation |
| Cover image/alt text | No article image metadata or assets | Not present | `content/insights/` and content schema | Detail page uses generated CSS illustration instead | Design/presentation, not database data |

### 2.6 Navigation, page structure, process, and engagement models

| Data group | Value or content | Current source | File path and location | Current consumers | Classification |
|---|---|---|---|---|---|
| Primary navigation | Six items | [`src/config/site.ts`](src/config/site.ts):16-23 | Header/mobile nav/footer | Shared navigation |
| Footer navigation | Primary nav plus four service/process links and legal/contact links | JSX plus local array | [`src/components/layout/footer.tsx`](src/components/layout/footer.tsx):5-65 | Footer | Navigation configuration, partly duplicated |
| Static sitemap routes | 14 routes including home, catalogue indexes, company/legal/contact pages | Local array | [`src/app/sitemap.ts`](src/app/sitemap.ts):5-20 | Sitemap | Route configuration; manually maintained |
| Breadcrumb labels | Home, Services/collection label, current title | Detail component props/JSX | [`src/components/sections/detail-page.tsx`](src/components/sections/detail-page.tsx):21-29; [`src/components/sections/catalog-service-detail.tsx`](src/components/sections/catalog-service-detail.tsx):15-20 | Dynamic detail pages | Shared UI configuration |
| Delivery process | Discovery, Architecture, Implementation, Maintenance | Inline array | [`src/app/how-we-work/page.tsx`](src/app/how-we-work/page.tsx):20-37 | Process page | Editorial/domain content |
| Modernization process | Inspect, Stabilize, Improve, Move | Inline array | [`src/app/modernization/page.tsx`](src/app/modernization/page.tsx):22-42 | Modernization page | Editorial/domain content |
| AI process | Frame, Prototype, Evaluate, Operate | Inline array | [`src/app/ai-solutions/page.tsx`](src/app/ai-solutions/page.tsx):29-48 | AI page | Editorial/domain content |
| Engagement models | Defined-scope delivery, Extended engineering team, Ongoing partnership | Page-local array | [`src/app/engagement-models/page.tsx`](src/app/engagement-models/page.tsx):8-24 | Engagement page and homepage CTA/links | Business content hardcoded in page |
| Shared CTA | Default title/body, “Talk to Archex”, `/start-project` | Component defaults | [`src/components/sections/cta.tsx`](src/components/sections/cta.tsx):4-20 | Multiple pages | Shared editorial/UI content |
| FAQ data | Generic reusable component only; no current call-site data found | Component prop type | [`src/components/sections/faq.tsx`](src/components/sections/faq.tsx):1-18 | No verified current consumer | Reusable capability, no current dataset |

### 2.7 Forms, selectable values, validation, and messages

| Data group | Value or content | Current source | File path and location | Current consumers | Classification |
|---|---|---|---|---|---|
| Project types | `new-product`, `ai-integration`, `modernization`, `ongoing-engineering`, `not-sure` | Shared tuple | [`src/features/leads/schema.ts`](src/features/leads/schema.ts):3-9 | Zod validation and select options | Stable application enum; keep in code |
| Project labels | Five human-readable labels | Form map | [`src/components/forms/enquiry-form.tsx`](src/components/forms/enquiry-form.tsx):10-16 | Project type select | UI copy; should remain synchronized with enum |
| Default project type | `not-sure` | Form default | [`src/components/forms/enquiry-form.tsx`](src/components/forms/enquiry-form.tsx):34-41 | Form initial state | UI default |
| Required fields and limits | Name 2-120, email max 180, company 2-160, message 30-4000, privacy true | Zod schema | [`src/features/leads/schema.ts`](src/features/leads/schema.ts):11-23 | Client resolver and server validation | Application validation/domain rule |
| Optional fields | Budget, desired start, contact method, website honeypot, Turnstile token | Zod schema and form JSX | [`src/features/leads/schema.ts`](src/features/leads/schema.ts):17-23; [`src/components/forms/enquiry-form.tsx`](src/components/forms/enquiry-form.tsx):88-153 | Client/server lead flow | Application contract |
| Consent text | Enquiry may be stored in Supabase and used to respond | Form JSX | [`src/components/forms/enquiry-form.tsx`](src/components/forms/enquiry-form.tsx):149-155 | Both compact/full forms | Legal/UX copy |
| User-facing validation/status messages | Field messages, spam failure, unavailable, saved-but-email-warning, success, invalid request, payload-too-large | Schema/service/route/form | [`src/features/leads/schema.ts`](src/features/leads/schema.ts):12-22; [`src/features/leads/service.ts`](src/features/leads/service.ts):34-81; [`src/app/api/leads/route.ts`](src/app/api/leads/route.ts):8-28 | Form/API | Application UX; keep close to validation/service |
| Request size limit | 32,000 bytes | API route constant | [`src/app/api/leads/route.ts`](src/app/api/leads/route.ts):8-11 | Lead endpoint | Technical abuse-control rule |
| Honeypot behavior | Non-empty `website` returns a success-shaped 202 without persistence | Service logic | [`src/features/leads/service.ts`](src/features/leads/service.ts):23-25 | Lead endpoint | Anti-spam behavior; document intentionally |

The database checks the same core field lengths and project-type values, but `budget_range`, `desired_start`, and `contact_method` have no database length/allowed-value constraints: [`supabase/migrations/202610120001_create_leads.sql`](supabase/migrations/202610120001_create_leads.sql):3-18.

### 2.8 Infrastructure, configuration, design tokens, and runtime constants

| Data group | Value or content | Current source | File path and location | Classification |
|---|---|---|---|---|
| Environment variables | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM` | Zod-validated process environment | [`src/config/env.ts`](src/config/env.ts):3-23; [`.env.example`](.env.example):1-8 | Environment/secret configuration, not database content |
| URL fallback | `http://localhost:3000` | Env schema and direct structured-data fallback | [`src/config/env.ts`](src/config/env.ts):4; [`src/config/site.ts`](src/config/site.ts):6; [`src/components/sections/detail-page.tsx`](src/components/sections/detail-page.tsx):88 | Environment fallback; production must set URL |
| Third-party endpoints | Cloudflare Turnstile siteverify and script URLs | Service/form constants | [`src/features/leads/service.ts`](src/features/leads/service.ts):11-16; [`src/components/forms/turnstile-field.tsx`](src/components/forms/turnstile-field.tsx):49-55 | Integration configuration |
| Lead table/columns/statuses | `public.leads`; fields and statuses `new`, `reviewed`, `archived` | SQL migration and insert transform | [`supabase/migrations/202610120001_create_leads.sql`](supabase/migrations/202610120001_create_leads.sql):3-18; [`src/features/leads/schema.ts`](src/features/leads/schema.ts):27-39 | Backend contract/domain persistence |
| API route | `POST /api/leads` | App Router route | [`src/app/api/leads/route.ts`](src/app/api/leads/route.ts):1-28 | Application infrastructure |
| Static route generation | Directory scan of `.mdx`, published-only filter, lexicographic date descending | Content loader | [`src/lib/content/loader.ts`](src/lib/content/loader.ts):52-84 | Generated content routing |
| Reading-time divisor | 200 words/minute, minimum 1 minute | Loader constant | [`src/lib/content/loader.ts`](src/lib/content/loader.ts):47-50 | Derived editorial metadata |
| Sitemap/robots | Static route list, dynamic content routes, `/api/` disallow | Route modules | [`src/app/sitemap.ts`](src/app/sitemap.ts):5-33; [`src/app/robots.ts`](src/app/robots.ts):4-7 | SEO/application configuration |
| Metadata defaults | Site name/tagline/description, canonical URL, Open Graph website/article | Shared SEO helper and layout | [`src/lib/seo/metadata.ts`](src/lib/seo/metadata.ts):11-29; [`src/app/layout.tsx`](src/app/layout.tsx):35-50 | SEO configuration |
| Theme state | `archex-theme`, `light`/`dark`, system preference fallback | Client component and inline script | [`src/components/ui/theme-toggle.tsx`](src/components/ui/theme-toggle.tsx):6-49; [`src/app/layout.tsx`](src/app/layout.tsx):8-19 | UI state/configuration |
| Theme colors | Light/dark palette, focus, status, button tokens | CSS variables | [`src/app/globals.css`](src/app/globals.css):22-75 | Design system; keep static |
| Typography | Inter, Libre Baskerville, IBM Plex Mono | Next font declarations | [`src/app/layout.tsx`](src/app/layout.tsx):21-33 | Design system |
| Animation values | 180ms transitions, 520ms reveal, 70/140/210ms delays, reduced-motion overrides | CSS | [`src/app/globals.css`](src/app/globals.css):70-83; 231-260 | Design-system behaviour |
| Responsive/layout values | Tailwind breakpoints/classes, max widths, spacing, aspect/size classes | Components and Tailwind config | [`tailwind.config.ts`](tailwind.config.ts):3-32 and `src/components/` | Design system/UI implementation |
| Build/test configuration | Node 22 CI, typed strict TypeScript, Next App Router, Playwright base URL `http://127.0.0.1:3000` | Config files | [`package.json`](package.json):5-13; [`.github/workflows/checks.yml`](.github/workflows/checks.yml):1-18; [`playwright.config.ts`](playwright.config.ts):3-17 | Tooling configuration |

These technical values are not candidates for a database merely because they are static.

## 3. Existing database usage

### Verified from repository code

| Table/data flow | Reads | Writes | Evidence |
|---|---|---|---|
| `public.leads` | No application read path found | `POST /api/leads` validates payload, transforms field names, and inserts one row | [`src/features/leads/service.ts`](src/features/leads/service.ts):41-53; [`src/app/api/leads/route.ts`](src/app/api/leads/route.ts):15-28 |
| Lead notification | No database read | Resend email after successful persistence | [`src/lib/email/leads.ts`](src/lib/email/leads.ts):16-40; service persists before notification |
| Content | No Supabase/database read | None | All public content calls [`getEntries`](src/lib/content/loader.ts):52-84, which reads local `content/` files |

The Supabase client is server-only, uses `SUPABASE_SECRET_KEY`, disables session persistence/refresh, and returns `null` when credentials are absent: [`src/lib/supabase/server.ts`](src/lib/supabase/server.ts):1-11. The browser does not receive a Supabase client.

### Schema evidence, not live verification

The repository migrations define `public.leads` with UUID identity, required name/email/company/project/message, project-type and status checks, optional lead context, consent timestamps, indexes, RLS, a service-role-only policy, and an `updated_at` trigger: [`supabase/migrations/202610120001_create_leads.sql`](supabase/migrations/202610120001_create_leads.sql):3-52.

`202610130001_add_lead_contact_and_consent.sql` repeats idempotent additions already present in the first migration: [`supabase/migrations/202610130001_add_lead_contact_and_consent.sql`](supabase/migrations/202610130001_add_lead_contact_and_consent.sql):1-3. This is repository evidence of migration duplication, not proof of the deployed database's migration history.

The live existence, applied migration order, RLS state, row counts, retention, and production policies were not verified because no live database connection was used.

## 4. Duplicated and inconsistent data

1. **Service catalogue/content overlap.** The three MDX services overlap with catalogue slugs. The dynamic route merges both sources and gives MDX precedence, while catalogue UI links can point to the same URL. A future edit can update one source while the other retains different title/summary/category/capabilities. Evidence: [`src/lib/services/catalog.ts`](src/lib/services/catalog.ts):27-52 and [`src/app/services/[slug]/page.tsx`](src/app/services/[slug]/page.tsx):8-36.
2. **Homepage services duplicate MDX.** The homepage service rail repeats titles/summaries for the three MDX services and adds an ongoing-engineering item that has no corresponding content entry: [`src/app/page.tsx`](src/app/page.tsx):191-221.
3. **Homepage industries duplicate MDX frontmatter.** The two industry rail summaries repeat the MDX summaries: [`src/app/page.tsx`](src/app/page.tsx):222-239 and [`content/industries/`](content/industries/).
4. **Homepage work duplicates and extends work content.** Two work cards repeat MDX content and “Product platform foundation” points to a service route while being labelled as work: [`src/app/page.tsx`](src/app/page.tsx):239-261.
5. **Homepage insight reading times are manually repeated.** Both cards say `1 min read`, while the loader computes reading time from body length: [`src/app/page.tsx`](src/app/page.tsx):263-278 and [`src/lib/content/loader.ts`](src/lib/content/loader.ts):47-50. This can silently become false as articles grow.
6. **Navigation is split across sources.** Primary nav, footer service links, and sitemap routes are maintained independently: [`src/config/site.ts`](src/config/site.ts):16-23; [`src/components/layout/footer.tsx`](src/components/layout/footer.tsx):5-10; [`src/app/sitemap.ts`](src/app/sitemap.ts):5-20. This creates a route discoverability/maintenance risk.
7. **Content metadata is underused.** `seoTitle`, `seoDescription`, `updated`, `related`, and `status` are supported by the schema, but current content largely lacks them; `featured` is set but not used by generic listing code except the client insight explorer's first featured entry: [`src/lib/content/schema.ts`](src/lib/content/schema.ts):5-18; [`src/components/sections/insights-explorer.tsx`](src/components/sections/insights-explorer.tsx):56-66.
8. **Related metadata is not authoritative.** The insight detail page gives all insights to `DetailPage`, and `DetailPage` selects the first two non-current entries rather than resolving `entry.related`: [`src/app/insights/[slug]/page.tsx`](src/app/insights/[slug]/page.tsx):31-39; [`src/components/sections/detail-page.tsx`](src/components/sections/detail-page.tsx):12-14.
9. **Lead contract is duplicated between Zod and SQL.** Project types and core lengths are present in both [`src/features/leads/schema.ts`](src/features/leads/schema.ts):3-23 and [`supabase/migrations/202610120001_create_leads.sql`](supabase/migrations/202610120001_create_leads.sql):6-18. This is appropriate defense in depth, but changes must update both.
10. **Consent/status are application defaults plus SQL defaults/checks.** `status: "new"` and privacy consent transformation are in [`src/features/leads/schema.ts`](src/features/leads/schema.ts):27-39; SQL also defines the default/status check/consent defaults. This is a cross-layer contract, not a database-backed content source.
11. **Legal/company content is intentionally provisional.** Empty company contact fields and draft legal pages are not technical defects in isolation, but they are launch correctness risks documented in [`README.md`](README.md):87-94.

## 5. Recommended data ownership

| Content/configuration | Recommendation | Reasoning |
|---|---|---|
| Design tokens, fonts, breakpoints, animation, component variants | Keep static in CSS/Tailwind/React | These are implementation/design-system concerns and need code review, not editorial publishing |
| Stable route definitions and API paths | Keep static in code | Routes are coupled to components, tests, SEO, and deployment |
| Lead enums, validation, anti-spam, request limits, status contract | Keep in code and SQL with tests | These are domain/security rules; a database lookup would add complexity and could weaken validation |
| Company identity and reviewed legal copy | Keep in shared config/content files, with release review | It benefits from version history and explicit approval; fill placeholders before launch |
| Long-form service, modernization, industry, work, and insight bodies | Keep in repository MDX | Current volume is small, content is versioned, and the loader already provides schema validation, routing, drafts, and generated reading time |
| Service catalogue | Consolidate ownership before moving it | Either make all service detail content MDX-backed or make the catalogue the sole structured source. Do not maintain duplicate slug records |
| Homepage rails and summaries | Derive from canonical entries where possible; keep only intentionally curated selections as a small config | This removes stale title/summary/reading-time copies without making the homepage database-driven |
| Navigation/sitemap route lists | Keep static, but centralize route metadata or generate dynamic content routes from the loader | The route set is code-owned, but current duplication can drift |
| Featured/related editorial metadata | Keep in MDX if deployment-based editorial review is acceptable | The schema already supports it; implement consumers consistently before considering a DB |
| Leads | Keep in Supabase as transactional data | Leads are operational records, not public content; the existing server-only write path and RLS model are appropriate |
| Optional notification/spam integrations | Keep in environment/secret management and server-only modules | Keys and private endpoints must not enter public content or client bundles |

## 6. Future database candidates (proposals only)

No tables below exist in the repository. They are future options, not current architecture facts.

| Proposed model | Purpose/relationships | When justified |
|---|---|---|
| `content_entries` | Shared published/draft metadata for services, industries, work, modernization, and insights; related records by stable slug/ID | When editors need a web UI, drafts, scheduling, or publishing without deployments |
| `service_categories` and `services` | Category ordering, featured state, summaries, capabilities, and optional relation to content body | When service catalogue ordering and availability change frequently or nontechnical staff own them |
| `industries` plus service relationships | Industry landing content and many-to-many service associations | When industry-specific pages and cross-navigation become a maintained sales asset |
| `work_examples` | Work status, illustrative/real flag, approved results, technologies, industries, assets, and publication state | Only when approved case studies and frequent updates exist; preserve explicit claims review |
| `insights`/`insight_relations` | Article metadata, body/asset references, author, category, tags, dates, related links, and publication workflow | When editorial volume or scheduling requires a CMS |
| `site_navigation` or editorial selections | Ordered menus, featured content, homepage selections | Only if nontechnical editors must change navigation/featured selections; otherwise config is safer |
| `lead_status_history` | Audit trail for operational lead status changes | If an internal lead-management workflow is introduced; unrelated to public content |

A headless CMS may be preferable to bespoke Supabase tables for rich MDX-like editorial workflows. Supabase should not become a catch-all for design tokens, validation rules, or secrets.

## 7. Security and configuration

### Verified patterns

- Secret names are centralized and schema-validated in [`src/config/env.ts`](src/config/env.ts):3-23.
- `SUPABASE_SECRET_KEY` is consumed only by a `server-only` module: [`src/lib/supabase/server.ts`](src/lib/supabase/server.ts):1-11.
- Lead insertion occurs server-side through `/api/leads`; no public Supabase read/insert policy is created. The migration enables RLS and allows `service_role` only: [`supabase/migrations/202610120001_create_leads.sql`](supabase/migrations/202610120001_create_leads.sql):28-37.
- Turnstile secret verification and Resend API usage are server-side: [`src/features/leads/service.ts`](src/features/leads/service.ts):8-21; [`src/lib/email/leads.ts`](src/lib/email/leads.ts):1-23.
- `.env.local` and `.env` are ignored by Git: [`.gitignore`](.gitignore):1-9. Secret values were not inspected or reproduced.
- The README explicitly says the Supabase secret/service-role key must never be exposed in browser code: [`README.md`](README.md):25-36.

### Concerns and follow-up checks

1. **Production configuration is a correctness boundary.** If `NEXT_PUBLIC_SITE_URL` is unset, canonical URLs, sitemap URLs, robots sitemap, and BlogPosting URLs fall back to localhost: [`src/config/site.ts`](src/config/site.ts):6; [`src/components/sections/detail-page.tsx`](src/components/sections/detail-page.tsx):88. Production deployment should fail validation or have an explicit deployment check rather than silently publishing localhost URLs.
2. **Migration state is not live-verified.** Confirm the deployed project applied both migrations, has RLS enabled, and has no broader policies.
3. **Service-role key exposure must remain prohibited.** Review deployment/runtime bundling if configuration changes; do not import `env` or the Supabase server helper into client components.
4. **Lead data contains personal/business contact information.** Confirm retention, access controls, deletion process, jurisdiction, and legal wording before launch; current legal pages explicitly say review is required.
5. **Turnstile is optional by design.** Without its secret, verification returns true; this is a documented configuration choice, not proof of production anti-abuse protection.
6. **Notification failure is non-fatal after persistence.** This preserves the lead but requires operational monitoring for Resend failures: [`src/features/leads/service.ts`](src/features/leads/service.ts):55-78.

## 8. Prioritized action plan

### Critical correctness or security risks

| Priority | Affected paths | Recommended next action |
|---|---|---|
| Critical | [`src/config/site.ts`](src/config/site.ts), [`src/components/sections/detail-page.tsx`](src/components/sections/detail-page.tsx), deployment environment | Set and verify `NEXT_PUBLIC_SITE_URL` in production; add a deployment/smoke assertion that canonical, sitemap, robots, and JSON-LD URLs are not localhost |
| Critical | [`src/config/site.ts`](src/config/site.ts), [`src/app/privacy/page.tsx`](src/app/privacy/page.tsx), [`src/app/terms/page.tsx`](src/app/terms/page.tsx) | Complete company identity/contact details and obtain legal approval before publishing; do not present draft legal text as final policy |
| High | [`src/lib/supabase/server.ts`](src/lib/supabase/server.ts), [`supabase/migrations/`](supabase/migrations/) | Verify production RLS/policy/migration state and keep the service key server-only; document the operational check |

### High-priority maintenance problems

| Priority | Affected paths | Recommended next action |
|---|---|---|
| High | [`src/lib/services/catalog.ts`](src/lib/services/catalog.ts), [`content/services/`](content/services/), [`src/app/services/[slug]/page.tsx`](src/app/services/[slug]/page.tsx) | Choose one ownership model for overlapping service slugs and add a test preventing duplicate slugs or undocumented precedence |
| High | [`src/app/page.tsx`](src/app/page.tsx), [`src/lib/content/loader.ts`](src/lib/content/loader.ts) | Build homepage rails from canonical MDX entries where the item exists; compute reading-time labels from `entry.readingTime` |
| High | [`src/config/site.ts`](src/config/site.ts), [`src/components/layout/footer.tsx`](src/components/layout/footer.tsx), [`src/app/sitemap.ts`](src/app/sitemap.ts) | Centralize route metadata or add tests that compare navigation/footer/sitemap destinations with known routes |
| High | [`src/lib/content/schema.ts`](src/lib/content/schema.ts), [`src/app/insights/[slug]/page.tsx`](src/app/insights/[slug]/page.tsx), [`src/components/sections/detail-page.tsx`](src/components/sections/detail-page.tsx) | Either implement `related` resolution or remove the unused field and make the fallback behavior explicit |

### Improvements before expanding services/content

| Priority | Affected paths | Recommended next action |
|---|---|---|
| Medium | [`src/features/leads/schema.ts`](src/features/leads/schema.ts), [`supabase/migrations/202610120001_create_leads.sql`](supabase/migrations/202610120001_create_leads.sql) | Keep application and DB validation aligned; add contract tests for project types, length boundaries, status, and consent |
| Medium | [`supabase/migrations/202610120001_create_leads.sql`](supabase/migrations/202610120001_create_leads.sql), [`supabase/migrations/202610130001_add_lead_contact_and_consent.sql`](supabase/migrations/202610130001_add_lead_contact_and_consent.sql) | Clarify migration history and avoid repeating already-created columns in future migrations; do not rewrite applied production migrations without migration-process review |
| Medium | `content/**/*.mdx`, [`src/lib/content/schema.ts`](src/lib/content/schema.ts) | Define the editorial metadata policy: required status, date rules for insights, optional updated dates, SEO fields, author policy, and relation policy |
| Medium | [`README.md`](README.md), legal/company routes | Update launch checklist as fields are completed and keep illustrative work labels until approved evidence exists |

### Optional improvements for future growth

| Priority | Affected paths | Recommended next action |
|---|---|---|
| Optional | `content/`, [`src/lib/content/loader.ts`](src/lib/content/loader.ts) | Add a build-time inventory/test for duplicate slugs, invalid dates, orphaned related slugs, and missing required metadata |
| Optional | Homepage and service components | Add a small shared editorial-selection module rather than moving all content to a database |
| Optional | Content workflow | Evaluate a headless CMS only after publishing frequency, editor ownership, scheduling, and approval requirements are documented |
| Optional | Leads | Add an internal authenticated lead-management workflow or status history only if operational volume requires it |

## 9. Unknowns and verification gaps

The following could not be established from repository evidence:

- Whether the Supabase migrations have been applied to production or which exact schema/policies are live.
- Whether production environment variables are present, valid, and point to the intended project/domain.
- Whether RLS is enabled in the live project and whether any dashboard-created policies exist.
- Lead volume, retention, access history, deletion requests, or customer data. No live rows were queried.
- Whether Resend sender/domain verification is complete or notifications are delivered.
- Whether Turnstile is enabled in production and what abuse volume exists.
- Whether company placeholders are intentionally empty at the current deployment or are pending launch content.
- Whether the illustrative work examples will become real approved case studies.
- Whether nontechnical editors currently need publishing access; this determines whether a CMS/database is worthwhile.
- Browser rendering, accessibility, deployed canonical URLs, and production sitemap correctness; local source and tests were inspected but no browser/deployment verification was performed.
- External hosting, DNS, analytics, monitoring, backups, and secret rotation configuration.

## Conclusion

Archex does not currently have a broad static-data problem that requires moving content into Supabase. It has a small, understandable static architecture with one transactional database table. The safest next step is consolidation and validation: establish a single service source, derive homepage cards and reading-time labels from canonical content, centralize route metadata, formalize MDX metadata rules, and complete production/legal configuration. Revisit database/CMS publishing only when there is a demonstrated editorial workflow that needs it.
