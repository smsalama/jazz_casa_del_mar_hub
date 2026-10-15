# ADR-0015: Environment configuration, per install keys, startup refusals, request limits and privacy safe logging

- Status: Proposed (for T2)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: FR-47, NFR-14, NFR-18, NFR-26, NFR-32, NFR-34, NFR-35; G-13, G-17, G-20, G-22; OQ-13; threat model TM-02, TM-03, TM-13, TM-26, TM-60, TM-62, TM-63, TM-65, TM-67; RSK-30, RSK-32, RSK-37

## Context

Every setting comes from one documented configuration file or environment variables with an example file holding no secrets (NFR-32). The configuration file and data folder must be readable only by the site's account, or the site refuses to start; signing keys are random per install, at least 256 bits, never shipped (G-17). The package binds to the local machine by default and must refuse a non local address (exit non-zero within 10 seconds, message starting `STARTUP-REFUSED` naming the listen address setting, no port left listening), because two step verification is not built (NFR-18, G-22, AC-63.2). Logs must not contain enquiry text, email addresses, passwords or one-time codes (NFR-14). Request bodies, slow requests and concurrency are limited (NFR-35).

## Decision

**Configuration**: environment variables, optionally loaded from the `.env` file in the app folder by `process.loadEnvFile()` at start (Node.js built-in, no dependency). Parsed and validated once with Zod into a frozen `Config` object; an invalid value stops the start with a message naming the variable. The full list with defaults is in `docs/repo-plan.md` (the web repo's `.env.example`). No variable holds a key for an external service (AC-76.2).

**Startup sequence** (`src/server/entry.ts`), each step failing fast before any port is opened:

1. Load and validate configuration.
2. **Listen address guard** (G-22): `HOST` must be a loopback address (`127.0.0.1`, any `127.x.x.x`, `::1`, or `localhost`). Any other value (including `0.0.0.0` and `::`) prints `STARTUP-REFUSED: HOST=<value> is not a local address. This release cannot be reached from other machines because two-step verification is not built (NFR-18).` and exits with status 78, before creating the server, so no port is ever opened. When FR-33 is built later, the guard also requires `PUBLIC_ORIGIN` to be `https://` and two step verification enforced; until then there is no code path that accepts a non local address, and no override variable.
3. **Permission guard** (G-17): `.env` (if present), `DATA_DIR`, `BACKUP_DIR` and the keys file must have no group or other permission bits (`mode & 0o077 === 0`) and be owned by the current user; otherwise `STARTUP-REFUSED: <path> is readable by other accounts` and exit (AC-77.4). On first start the folders are created with 0700.
4. **Keys** (G-17, TM-62): on first start, `DATA_DIR/secrets/keys.json` (0600) is created with independent 256-bit random keys for form tokens, CSRF derivation and the suppression HMAC (the suppression key is also copied into the database so a restore keeps it, ADR-0010). Keys never come from the package or the environment, so two installs always differ (AC-77.5). A `npm run keys:rotate` command replaces the form and CSRF keys (ending all sessions).
5. Open the database, back up and migrate if needed (ADR-0003, ADR-0010), load the content snapshot.
6. Create the HTTP server with limits, start the scheduler, listen.

**Request limits** (NFR-35, TM-67), applied in the custom server before Astro:

- `server.requestTimeout = 30000`, `server.headersTimeout = 20000`, `server.keepAliveTimeout = 5000`, `server.maxHeadersCount = 100`, `maxHeaderSize` 16 KB.
- Body caps by route class: public form posts 64 KB; admin API 1 MB; media upload 10 MB plus 64 KB; everything else 0 (a GET with a body is refused). Checked on `Content-Length` first and by counting streamed bytes.
- Regular expressions used on input are linear (no nested quantifiers); every text field has a length limit checked before any pattern runs.
- Canonical host: requests whose `Host` does not match `PUBLIC_ORIGIN` get a 421 response, which also stops DNS rebinding against a local install.

**Trusted proxy** (G-20, TM-65): `TRUSTED_PROXIES` (empty by default) lists peer addresses whose `X-Forwarded-For` and `X-Forwarded-Proto` are honoured. Astro's `security.allowedDomains` stays empty.

**Logging** (NFR-14, NFR-26, TM-13):

- Application log: one JSON line per event to standard output (the operator's service manager keeps it; the hosting guide sets 30 days). Written by a small project logger with an allow-list of fields: time, level, event, route pattern (not the raw URL with query), status, duration, correlation id, account id. No request bodies, no headers, no query strings, no email addresses, no enquiry text, no passwords or codes. A unit test feeds sample personal data through every log call site and checks none appears.
- Errors: the stack trace is logged with the correlation id; the visitor sees only the localised error page with the correlation id (FR-13, NFR-26).
- Security event record: in the database (ADR-0006, NFR-34).
- Access logs are the reverse proxy's job when hosted (30 days, Retention schedule).

**Environments**:

| Environment | Where | Data | Notes |
| --- | --- | --- | --- |
| Development | Steven's Mac or the workspace, `npm run dev` | Seed plus synthetic test data in `./data` | Astro dev server; CSP header still sent; hot reload |
| Test | `npm test`, `npm run test:e2e` | Fresh temporary data folder per run | Production build for end-to-end; network blocked |
| Local review (the release) | Reviewer's computer, `npm start` | Seed content, synthetic data only | Loopback only; this is the only environment this release allows |
| Hosted (future) | Client server behind a TLS reverse proxy | Real data | Not allowed until FR-33, FR-44, FR-46 are built and the solicitor's answers are recorded (OQ-13); the start guard enforces it |

There is no staging or production deployment by the agency (the agency never deploys).

## Consequences

- AC-63.2, AC-77.4 and AC-77.5 are tested by spawning the built server with crafted settings in the integration suite.
- A reviewer who wants to show the site to a colleague on another machine cannot, by design, in this release.
- The configuration has no debug flag; `NODE_ENV=production` is set by `npm start`.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| Node.js `process.loadEnvFile`, `http`, `crypto` | runtime | MIT | Configuration file loading, server, keys |
| zod | 4.6.5 | MIT | Configuration validation |
