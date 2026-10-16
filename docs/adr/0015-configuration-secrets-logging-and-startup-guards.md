# ADR-0015: Environment configuration, per install keys, startup refusals, request limits and privacy safe logging

- Status: Proposed (for T2)
- Date: 2026-10-15, amended 2026-10-16 in P4R2-ARCH (architecture gate finding SEC-H1: start guard bypass through a local proxy or tunnel)
- Author: System Architect (P4-T2)
- Requirements: FR-47, NFR-14, NFR-18, NFR-26, NFR-32, NFR-34, NFR-35; G-13, G-17, G-20, G-22; OQ-13; threat model TM-02, TM-03, TM-13, TM-26, TM-60, TM-62, TM-63, TM-65, TM-67; RSK-30, RSK-32, RSK-37

## Context

Every setting comes from one documented configuration file or environment variables with an example file holding no secrets (NFR-32). The configuration file and data folder must be readable only by the site's account, or the site refuses to start; signing keys are random per install, at least 256 bits, never shipped (G-17). The package binds to the local machine by default and must refuse a non local address (exit non-zero within 10 seconds, message starting `STARTUP-REFUSED` naming the listen address setting, no port left listening), because two step verification is not built (NFR-18, G-22, AC-63.2). The architecture gate (finding SEC-H1) showed that a loopback listen address is not enough on its own: a reverse proxy or tunnel client on the same machine can publish a loopback server, so the guard must also refuse proxied set ups. Logs must not contain enquiry text, email addresses, passwords or one-time codes (NFR-14). Request bodies, slow requests and concurrency are limited (NFR-35).

## Decision

**Configuration**: environment variables, optionally loaded from the `.env` file in the app folder by `process.loadEnvFile()` at start (Node.js built-in, no dependency). Parsed and validated once with Zod into a frozen `Config` object; an invalid value stops the start with a message naming the variable. The full list with defaults is in `docs/repo-plan.md` (the web repo's `.env.example`). No variable holds a key for an external service (AC-76.2).

**Startup sequence** (`src/server/main.ts`), each step failing fast before any port is opened:

1. Load and validate configuration.
2. **Exposure guard, start part** (G-22, TM-21; see "Exposure guard" below for why and for the request part). Each check prints one line starting `STARTUP-REFUSED` that names the variable, and exits with status 78 before the server is created, so no port is ever opened:
   1. `HOST` must be a loopback address (`127.0.0.1`, any `127.x.x.x`, `::1`, or `localhost`). Any other value (including `0.0.0.0` and `::`) prints `STARTUP-REFUSED: HOST=<value> is not a local address. This release cannot be reached from other machines because two-step verification is not built (NFR-18).`
   2. `PUBLIC_ORIGIN` must be this server's own plain loopback origin: scheme `http`, host `localhost`, `127.0.0.1` or `[::1]`, no user name or password, no path other than `/`, no query or fragment, and a port equal to `PORT` (an origin without a port counts as 80). Anything else, in particular any `https://` origin, any other host name or address, or a port different from `PORT` (the sign of a proxy or tunnel in front), prints `STARTUP-REFUSED: PUBLIC_ORIGIN=<value> must be http://localhost:<PORT>, http://127.0.0.1:<PORT> or http://[::1]:<PORT>. This release cannot be published through a proxy or tunnel because two-step verification is not built (NFR-18).`
   3. `TRUSTED_PROXIES` must be empty. Any value prints `STARTUP-REFUSED: TRUSTED_PROXIES must be empty. This release cannot be run behind a proxy because two-step verification is not built (NFR-18).`

   There is no override variable, flag or command, and no code path in this release that relaxes any of these checks. When FR-33 is built and enforced for every admin account, a later ADR replaces them with: an `https://` `PUBLIC_ORIGIN`, `TRUSTED_PROXIES` naming the reverse proxy, and a start refusal while any active account has no second factor.
3. **Permission guard** (G-17): `.env` (if present), `DATA_DIR`, `BACKUP_DIR` and the keys file must have no group or other permission bits (`mode & 0o077 === 0`) and be owned by the current user; otherwise `STARTUP-REFUSED: <path> is readable by other accounts` and exit (AC-77.4). On first start the folders are created with 0700.
4. **Keys** (G-17, TM-62): on first start, `DATA_DIR/secrets/keys.json` (0600) is created with independent 256-bit random keys for form tokens, CSRF derivation and the rate limit key hash. The suppression HMAC key is generated at the same time but stored only in the database table `install_secret`, so a restore keeps it (ADR-0010, data model D-8). Keys never come from the package or the environment, so two installs always differ (AC-77.5). A `npm run keys:rotate` command replaces the form and CSRF keys (ending all sessions).
5. Open the database, back up and migrate if needed (ADR-0003, ADR-0010), load the content snapshot.
6. Create the HTTP server with limits, start the scheduler, listen.

**Request limits** (NFR-35, TM-67), applied in the custom server before Astro:

- `server.requestTimeout = 30000`, `server.headersTimeout = 20000`, `server.keepAliveTimeout = 5000`, `server.maxHeadersCount = 100`, `maxHeaderSize` 16 KB.
- Body caps by route class: public form posts 64 KB; admin API 1 MB; media upload 10 MB plus 64 KB; everything else 0 (a GET with a body is refused). Checked on `Content-Length` first and by counting streamed bytes.
- Regular expressions used on input are linear (no nested quantifiers); every text field has a length limit checked before any pattern runs.
- Canonical host: requests whose `Host` does not match `PUBLIC_ORIGIN` get a 421 response, which also stops DNS rebinding against a local install. This is check 3 of the exposure guard's request part below.

**Exposure guard** (G-22, TM-21; amended for gate finding SEC-H1). Until two step verification (FR-33) is built and enforced, the portal must only be reachable by a browser on the same machine talking to the server directly. A loopback listen address alone does not ensure that: a reverse proxy (nginx, Caddy) or a tunnel client (for example ngrok or cloudflared) running on the same machine connects from a loopback address and can publish the whole site, admin portal included, to a network or the internet. The start part (step 2 above) refuses the configurations such a set up needs (`https` or foreign `PUBLIC_ORIGIN`, a different port, `TRUSTED_PROXIES`). The **request part** runs in the custom http server as the first thing on every request, before the body is read, before the rate limiter, static files, media and Astro, on every path including `/healthz`:

1. **Peer**: `req.socket.remoteAddress` must be a loopback address (`127.0.0.0/8`, `::1`, or `::ffff:127.0.0.0/104`). Otherwise 421.
2. **Forwarding headers**: if the request carries any of `Forwarded`, any header whose name starts with `X-Forwarded-` (`-For`, `-Proto`, `-Host`, `-Port`, `-Prefix`, `-Server`, `-Ssl` and any other), `X-Real-IP`, `X-Client-IP`, `True-Client-IP`, `CF-Connecting-IP`, `Fastly-Client-IP`, `X-Original-Forwarded-For`, `Via` or `CDN-Loop`, with any value including an empty one, the answer is 421. Header names are matched without regard to case. Browsers never send these headers to a local address themselves; proxies and tunnel clients add them.
3. **Host**: `Host` must equal the host and port of `PUBLIC_ORIGIN` (the canonical host check above). Otherwise 421.

The 421 response is `421 Misdirected Request` with `Content-Type: text/plain; charset=utf-8`, the fixed English body `This site accepts only direct requests from this computer.`, the security headers of ADR-0008, `Cache-Control: no-store` and `Connection: close`. It sets no cookie, reads no body, touches no database row (no session, rate limit counter or security event) and never reaches Astro. The application log records event `request.refused.exposure` with the reason (`peer`, `forwarded_header` or `host`) at most once per minute per reason, with a count, never the address or header values (NFR-14). `upgrade` and `CONNECT` requests are refused by destroying the socket (the site has no use for either).

Refusing, rather than ignoring, forwarding headers makes a proxy or tunnel set up fail visibly for the person who tried it, and means no response, admin or public, is ever produced for a proxied request.

**Residual**: a raw TCP forward (for example `ssh -R` or `socat`) adds no header and keeps a loopback peer; a browser through it still sends the forward's own `Host` and gets 421, so the site does not work that way, but a scripted client that forges `Host: localhost:4321` and `Origin` could reach the admin API. No server side check can detect this. It needs the machine's owner to set up a forward deliberately, which `RUN-LOCALLY.md` and the hosting guide state is not allowed in this release; TM-21 stays Low in local review on that basis and High for any reachable set up.

**Trusted proxy** (G-20, TM-65): `TRUSTED_PROXIES` stays in the configuration schema for the release that builds FR-33, when it will list the reverse proxy whose `X-Forwarded-For` and `X-Forwarded-Proto` are honoured. In this release it must be empty (start refused otherwise) and forwarding headers are refused, so the client address is always the socket peer. Astro's `security.allowedDomains` stays empty.

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
| Hosted (future) | Client server behind a TLS reverse proxy | Real data | Not allowed until FR-33, FR-44, FR-46 are built and the solicitor's answers are recorded (OQ-13); the exposure guard (start and request parts) enforces it, including against a local proxy or tunnel |

There is no staging or production deployment by the agency (the agency never deploys).

## Consequences

- AC-63.2, AC-77.4 and AC-77.5 are tested by spawning the built server with crafted settings in the integration suite. The exposure guard has its own acceptance checks (G22-1 to G22-10 in `docs/reviews/p4r2-arch-notes.md`), tested the same way plus a small forwarding proxy started by the test on another loopback port.
- A reviewer cannot put the site behind a local reverse proxy or tunnel (for example to try HTTPS or show it on a phone) in this release; that is the intended effect of G-22.
- In this release every request comes from a loopback peer, so address keyed rate limits (ADR-0006) share one key on the reviewer's machine. Tests raise the limits as before.
- A reviewer who wants to show the site to a colleague on another machine cannot, by design, in this release.
- The configuration has no debug flag; `NODE_ENV=production` is set by `npm start`.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| Node.js `process.loadEnvFile`, `http`, `crypto` | runtime | MIT | Configuration file loading, server, keys |
| zod | 4.6.5 | MIT | Configuration validation |
