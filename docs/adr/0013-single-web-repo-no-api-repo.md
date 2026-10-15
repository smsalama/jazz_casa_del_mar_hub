# ADR-0013: One web repo holds the whole application; no separate api repo

- Status: Proposed (for T2)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: FR-47 (one package), NFR-31, NFR-32; agency repo model (hub, web, optional api)

## Context

Steven created two repos: `smsalama/jazz_casa_del_mar_hub` (records, contract, gates) and `smsalama/jazz_casa_del_mar_web` (empty). The agency template allows a third `-api` repo when a separate backend is justified.

## Options considered

1. **Web repo only**: the Astro server is the backend (public form handlers, admin JSON API, jobs, commands).
2. **Web plus api repos**: a separate Node.js API (for example Hono) for forms and admin, the web repo for pages.

## Decision

Option 1. The application is one process (ADR-0001) with one data store and one set of security controls (headers, sessions, rate limits). Splitting it would add an internal HTTP boundary, CORS, a second authentication check, a second deployment unit, a second package and a second set of dependencies to audit, against a 512 MB memory target and a single small server. The OpenAPI contract stays in the hub as the source of truth (`contract/openapi.yaml`); the web repo keeps a byte identical copy and its contract tests (ADR-0012) prove the implementation matches.

Steven does not need to create an api repo. `state/project.json` should record the api repo as "not used" (the Orchestrator's update, not this task's).

## Consequences

- One install, one `verify`, one release zip.
- Server code and browser code live side by side; lint rules and folder boundaries (`src/lib/**` server only, `src/client/**` and `src/admin-app/**` browser only, checked by an import boundary rule) keep secrets and server modules out of browser bundles.
- If a future release needs a separately scaled API, the admin API handlers are already isolated under `src/pages/admin/api/` and `src/lib/`, and the contract does not change.

## Versions and licences

No dependencies.
