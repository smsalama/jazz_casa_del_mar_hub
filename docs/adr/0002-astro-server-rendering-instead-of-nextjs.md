# ADR-0002: Astro with server rendering for the public site, instead of the agency default Next.js

- Status: Proposed (for T2); a deviation from the agency default stack, so Steven confirms it at T2
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: FR-1, FR-13, FR-19 to FR-24, FR-29, FR-38, NFR-6, NFR-7, NFR-10, NFR-13, NFR-24, NFR-31; threat model section 9 ("Templating and front end framework"), TM-09, TM-30, TM-31, TM-56; RSK-17, RSK-22

## Context

The public site is 84 content pages (21 page types in four languages) that must:

- show everything, switch language and submit three forms with JavaScript off (NFR-13);
- keep JavaScript other than the 3D chunk to 200 KB compressed and everything before 3D to 600 KB (NFR-7), with LCP at most 2.5 s on a mid range phone (NFR-6);
- send a strict `Content-Security-Policy` header on every response, with no `unsafe-inline` or `unsafe-eval` in `script-src` (NFR-24);
- show saved edits within 60 seconds without a rebuild (FR-38), which means rendering on the server from the live data store;
- answer page requests within 200 ms at the 95th percentile with 25 simultaneous visitors on one CPU (NFR-10).

The admin portal may require JavaScript (NFR-13) and is a classic data editing application.

## Options considered

1. **Next.js 16.3.8 (App Router)**, the agency default. Server components and server actions; client side router; React on every page.
2. **Astro 7.3.5 with server rendering** (`output: 'server'`, `@astrojs/node` in middleware mode): HTML rendered per request by `.astro` components that ship no JavaScript unless a page adds a script; forms handled by the page itself on POST.
3. **A minimal Node.js server with a template engine** (for example Hono plus JSX rendered to strings), everything else hand built.

Points weighed:

| Concern | Next.js 16 | Astro 7 | Minimal server |
| --- | --- | --- | --- |
| JavaScript before 3D (NFR-7) | React and the router runtime on every page (roughly 100 KB compressed before any project code) plus the server component payload repeated inside the HTML | Zero by default; only the project's own small modules (transitions, menu, lightbox, scene loader) | Zero by default |
| Strict CSP (NFR-24) | Needs a per request nonce for the framework's inline scripts, so no rendered HTML can be reused between requests | No inline scripts when pages use only bundled `<script>` modules and no framework islands; the policy is a fixed header with no nonce, so rendered HTML can be cached | Fully controlled |
| Forms without JavaScript (NFR-13) | Server actions with React progressive enhancement; the endpoints are framework internal, not plain HTTP endpoints that the OpenAPI contract can describe | The page receives the POST, validates, and renders the same page with errors or the confirmation: one plain HTTP endpoint per form, described in `contract/openapi.yaml` | Same as Astro, hand built |
| Server attack surface | The server component wire protocol and server action endpoints had critical vulnerabilities in December 2025 (remote code execution in React server functions) and the framework's middleware had an authorisation bypass in 2025; both need careful patching on an unattended server | Plain request handlers; no deserialisation protocol | Smallest |
| Page rendering cost on 1 CPU (NFR-10) | Server component render per request, cannot cache because of the nonce | `.astro` render is string concatenation; a cached copy can be reused because there is no nonce | Smallest |
| Familiar to the agency roles, documentation, ecosystem | Best | Good: TypeScript, Vite, file based routes; the admin app is ordinary React | Weakest: more hand built code to review |

## Decision

Option 2: **Astro 7.3.5**, server rendered, with the **`@astrojs/node` 11.1.6 adapter in middleware mode** so that the project owns the Node.js HTTP server (startup guards, request limits, static serving; ADR-0001, ADR-0015).

- Public pages are `.astro` components. Every public script is a bundled module (`<script>` processed by Astro, emitted as an external file). No framework islands (no `client:*` directives) are used on public pages, because island hydration adds an inline script that the fixed CSP would block. Data that a script needs (scene name, poster, labels) is passed in `data-*` attributes, which Astro escapes.
- Astro's own CSP feature (which writes a `<meta>` policy and is incompatible with its `<ClientRouter />`) is not used. The project sends the policy as an HTTP header from middleware (ADR-0008), and an end-to-end test fails on any inline script or any CSP violation.
- Astro's `<ClientRouter />` is not used (it is incompatible with a strict CSP). Page transitions use swup (ADR-0007).
- Configuration: `output: 'server'`, `build.inlineStylesheets: 'never'`, `vite.build.assetsInlineLimit: 0`, `vite.build.sourcemap: false`, `security.checkOrigin: true`, `security.allowedDomains: []` (no forwarded host is trusted), `server.host` never used in production (the custom server binds).
- The admin portal is a React application mounted by a bundled script on the `/admin` shell page (ADR-0005). It is not an Astro island, so it adds no inline script.

## Consequences

- Meets NFR-7 with room for the transition, motion and scene loader code; the 200 KB figure mainly constrains the admin bundle, which is outside the public budgets.
- Public forms are ordinary HTTP endpoints, so the contract describes them and Playwright can test them with JavaScript disabled.
- This deviates from the agency default. Agency roles that expect Next.js must follow this ADR; the Developer reads the Astro and swup documentation before Phase 6. If Steven prefers the default at T2, the fallback is Next.js 16 with a nonce based CSP, every page rendered per request, server actions for the three public forms, and a JavaScript budget re-check by the Performance Engineer; ADR-0004, ADR-0006 and the contract would need changes.
- Astro 7 is a recent major line (7.0.0 published on 2026-06-22; 7.3.5 on 2026-09-24). Pinning to 7.3.5, with a lock file and an upgrade only through a reviewed change, limits churn.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| astro | 7.3.5 | MIT | Framework, build and server rendering |
| @astrojs/node | 11.1.6 | MIT | Node.js adapter, middleware mode |
| @astrojs/react | 7.0.0 | MIT | JSX compilation for the admin application only (no islands) |
| @astrojs/check | 0.9.10 | MIT | Type checking of `.astro` files (development only) |
| vite | as pinned by astro 7.3.5 | MIT | Bundler (build only) |
| sirv | 3.0.2 | MIT | Serving built static files with precompressed variants and long cache lifetimes |
