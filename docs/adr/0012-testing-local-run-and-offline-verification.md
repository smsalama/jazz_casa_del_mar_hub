# ADR-0012: Vitest and Playwright on the real engine, one setup command, one verify command, tests that pass with the network blocked

- Status: Proposed (for T2)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: NFR-1 to NFR-3, NFR-6 to NFR-9, NFR-13, NFR-15, NFR-24, NFR-26, NFR-29, NFR-31, NFR-32, FR-47; agency rules (one setup and one verify command, Linux workspace without Docker); AC-45.5, AC-76.3, AC-76.5

## Context

The agency rule is one setup command and one verify command on Steven's Mac, and the same verify in the Linux cloud workspace, which has Node.js 22.22.0 and no Docker engine. The full visitor and admin test suite must pass with outgoing network blocked (NFR-31, AC-76.3). Accessibility evidence is an axe-core scan with zero violations on every page and state (NFR-1). No CSP violation may be logged in the end-to-end tests (NFR-24). The agency default is Vitest, Playwright, and PGlite in tests.

## Options considered

- Unit and integration: Vitest (agency default) or Node's built-in test runner. Vitest chosen for its TypeScript and Vite integration with Astro.
- Database in tests: PGlite (agency default) is not needed because production uses SQLite (ADR-0003); tests use the same engine.
- End-to-end: Playwright (agency default).
- Network blocking: an operating system sandbox (`unshare -n` on Linux, not available on macOS), or in-process guards in Node.js plus browser host resolver rules.

## Decision

**Tools**: Vitest 5.0.3 (unit and integration, coverage with `@vitest/coverage-v8` 5.0.3), Playwright 1.63.0 (`@playwright/test`) with Chromium in `verify`, plus WebKit and Firefox projects run by `npm run test:e2e:all` for the browser matrix (NFR-29), axe-core through `@axe-core/playwright` 4.13.0, Ajv 8.20.0 with ajv-formats 3.0.1 for contract tests, `@redocly/cli` 2.57.0 to lint the contract copy, Lighthouse 13.5.0 for the performance budgets (separate command, not in `verify`).

**Test layers** (web repo):

| Layer | Command | What it covers |
| --- | --- | --- |
| Unit | `npm test` | Validators shared by browser and server, form token, rich text schema, CSV escaping, address normalisation, rate limiter, Accept-Language negotiation, retention calculations, tar entry validation, quality governor maths |
| Integration | `npm test` | Handlers against a real SQLite file in a temporary folder: forms, sessions, lockout, CSRF, purge with an injected clock, backup and restore round trip, migrations from empty, startup refusals (spawned server process), image worker limits with crafted files, glTF validation of every `.glb` |
| Contract | `npm run test:contract` | Every admin and public endpoint called in process; status, headers and bodies validated against `contract/openapi.yaml` with Ajv; the contract copy is byte identical to the hub file recorded in `contract/SOURCE` (hub commit and SHA-256) |
| End-to-end | `npm run test:e2e` | Builds, starts the production server on `127.0.0.1` with a fresh data folder and seed, then runs the visitor journeys (JavaScript on and off), admin journeys, axe on all 84 pages and every form state, CSP violation listener, no external request listener, 3D and fallback modes (WebGL on with SwiftShader, WebGL disabled, reduced motion), transition focus and history, heap growth over 20 navigations |
| Performance | `npm run test:perf` | Lighthouse with the L1 profile on every page type, weight budgets from the build output, NFR-10 load script; run by the Performance Engineer, not by `verify` |

**Network blocked** (NFR-31, AC-45.5, AC-76.3, AC-76.5):

- Node.js processes started by tests load `tests/support/block-network.mjs` with `--import`, which replaces `net.connect`, `tls.connect`, `dns.lookup` and the global `fetch` dispatcher so that any connection to a non loopback address throws and fails the test.
- Playwright launches browsers with `--host-resolver-rules="MAP * ~NOTFOUND, EXCLUDE localhost, EXCLUDE 127.0.0.1"` and a `page.on('request')` listener that fails on any URL whose host is not the test server.
- On Linux, `npm run test:offline` additionally runs the suites inside `unshare -rn` when available, which removes every network interface except loopback. On macOS the in-process guards are the evidence.
- Fonts, scripts, decoders, models and images are all in the repo or in `node_modules`, so nothing is fetched at run time. Playwright's browsers are installed once by `setup` (they are not fetched by tests).

**One setup, one verify** (web repo):

- `bash scripts/setup.sh` (agency template, extended): checks prerequisites, `npm ci` (with `ignore-scripts=true`, ADR-0014), `npx playwright install chromium` (plus `webkit firefox` on the Mac), creates `.env` from `.env.example` with mode 0600, creates `data/` and `backups/` with mode 0700, runs `npm run db:migrate` and `npm run seed`.
- `bash scripts/verify.sh` (agency template, unchanged): dash check, secret scan, then `npm run lint`, `typecheck`, `test`, `test:contract`, `test:e2e`, `build`.
- `npm run dev` starts Astro's dev server for development; `npm run build && npm start` runs production locally.
- No Docker Compose file: nothing needs a container (ADR-0001).

## Consequences

- The same engine and the same commands everywhere; no "works on Docker only" failures.
- `test:e2e` builds the site itself because `verify` runs `build` after it.
- WebGL in headless Chromium uses SwiftShader (software); 3D tests check behaviour (first frame, fallback switching, disposal), not frame rate. Frame rate evidence comes from the Performance Engineer on R1 or profile L2 (NFR-8).
- Safari behaviour (RSK-10) is covered by the WebKit project on the Mac, not in the Linux workspace.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| vitest, @vitest/coverage-v8 | 5.0.3 | MIT | Unit, integration and contract tests |
| @playwright/test | 1.63.0 | Apache-2.0 | End-to-end tests |
| @axe-core/playwright, axe-core | 4.13.0 | MPL-2.0 | Accessibility scans |
| ajv | 8.20.0 | MIT | Contract response validation |
| ajv-formats | 3.0.1 | MIT | Formats for Ajv |
| @redocly/cli | 2.57.0 | MIT | Contract lint |
| lighthouse | 13.5.0 | Apache-2.0 | Performance budgets |
| tsx | 4.23.15 | MIT | Running TypeScript scripts in development |
