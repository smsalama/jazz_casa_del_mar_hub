# ADR-0006: Admin authentication, server side sessions, request forgery protection, signed public form tokens and rate limits

- Status: Proposed (for T2)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: FR-20, FR-22, FR-23, FR-32, FR-34, FR-47, NFR-5, NFR-15, NFR-19 to NFR-22, NFR-34, NFR-35; G-1, G-9, G-10, G-11, G-19 to G-23; LR-21; threat model section 9 ("Session and form token mechanism"), TM-08, TM-10, TM-14, TM-15, TM-17, TM-20 to TM-27, TM-29, TM-62, TM-65, TM-66; RSK-10, RSK-21, RSK-25, RSK-26, RSK-32, RSK-38

## Context

Only staff sign in (email and password, no second factor this release, US-31 Won't). The public site must set no cookie and no storage except the pause motion choice (NFR-15, LR-21), yet its three forms need forgery protection, a spam trap and a 2 second minimum time carried in a signed token (FR-20, G-9, NFR-22). The admin portal needs `HttpOnly`, `SameSite=Strict` cookies, `Secure` whenever served over HTTPS, rotation at sign in, 30 minute idle and 8 hour absolute limits, and the end of every session of an account on password change, reset, disable or delete (NFR-20, G-19). Safari does not keep `Secure` cookies on plain `http://localhost` (RSK-10).

## Options considered

- Sessions: (a) signed stateless cookies (JWT or similar); (b) random session identifiers stored on the server.
- Public form protection: (a) a cookie based double submit token; (b) a server side token table; (c) an HMAC signed token in a hidden field.
- Password hashing: (a) `argon2` (node-gyp addon with an install script); (b) `@node-rs/argon2` (prebuilt N-API binaries as optional dependencies, no install script); (c) Node.js built-in `crypto.argon2` (not available on Node.js 22; checked in the workspace).

## Decision

**Sessions: option b.** A 256-bit random identifier from `crypto.randomBytes(32)`, base64url in the cookie; only its SHA-256 is stored in the `session` table (a copy of the database does not reveal live sessions). Row fields: account, created, last seen, absolute expiry, CSRF secret, `must_change_password` state. A new identifier is issued at every sign in (TM-23). Idle limit 30 minutes and absolute limit 8 hours are configuration values (NFR-20). Sign out deletes the row. Changing or resetting a password, or disabling or deleting an account, deletes every session row of that account in the same transaction (G-19, AC-32.6). Sessions are removed by the purge job once expired.

**Cookie**:

- Name `__Host-jcdm_admin` with `Secure; HttpOnly; SameSite=Strict; Path=/` whenever `PUBLIC_ORIGIN` starts with `https://`.
- Name `jcdm_admin` with `HttpOnly; SameSite=Strict; Path=/` and no `Secure` only when `PUBLIC_ORIGIN` is `http://localhost` or a loopback address. This is the only way Safari can sign in during local review (RSK-10), and it can never apply to a reachable address because the server refuses to start on a non local address (ADR-0015, G-22).
- Every admin response carries `Cache-Control: no-store` (NFR-20, TM-46).

**Admin request forgery protection** (NFR-22, TM-27):

- Signed in: every non GET admin request must carry `X-CSRF-Token` equal to an HMAC of the session's CSRF secret, compared in constant time; plus `Origin` (or `Referer`) must equal `PUBLIC_ORIGIN` when present; plus `SameSite=Strict`. Failure returns 403 and changes nothing.
- Sign in (no session yet): `POST /admin/api/session` accepts only `Content-Type: application/json` with the header `X-Requested-With: jcdm-admin` and a matching `Origin`. A cross site page cannot send that header or that content type without a CORS preflight, and the server answers no CORS requests, so login forgery is blocked.
- Sign out is `DELETE /admin/api/session` (never GET).

**Public form tokens: option c** (G-9, LR-21). The hidden field `formToken` holds `base64url(payload).base64url(HMAC-SHA256(formKey, payload))`, where the payload is `{ f: form name, l: language, t: issued at (ms), n: 128-bit random }`, plus `v` (the wording version label shown on the page) if the D-2 proposal below is adopted. On POST the server checks, in this order and always to the end (so the timing does not reveal which check failed): signature, form name and language match the endpoint, age at least `FORM_MIN_SECONDS` (2) and at most `FORM_TOKEN_MAX_AGE_HOURS` (8), honeypot field `website` empty, `Origin` or `Referer` matching when present. Any failure gives the single visible retry message of FR-20 with the typed values kept, and a fresh token whose time is now, so a resubmission after 2 seconds is accepted (AC-13.10). For the contact form, the nonce of an accepted token is stored in `used_form_token` until the token's expiry, so a refresh or replay cannot create a duplicate enquiry. No cookie or storage is used, so the Cookie notice lists none (FR-15).

**Wording version in the token (data model D-2): proposed, pending Steven's decision at T2.** If the wording archive of ADR-0004 is adopted, the token payload also carries `v`, the `legal_text_version` label of the privacy information line (contact form) or the consent text (newsletter) rendered on the page, and the server stores that label with the enquiry or subscriber. The version recorded is then the one the visitor actually saw, not the newest one at the moment of posting. A label that does not exist in the archive fails the token check like any other tampering. Until T2 the behaviour contract is unchanged: the form token stays opaque in `contract/openapi.yaml` (`FormToken`), and `privacyTextVersion` and `consentVersion` keep their contract shape.

**Password handling** (NFR-19, option b): `@node-rs/argon2` 2.2.1, Argon2id, memory 19,456 KiB, 2 iterations, parallelism 1. At most two hashes run at once; others wait in a queue (NFR-35, TM-66). New passwords: at least 12 characters, at most 128, no composition rules, refused if in the bundled list of 10,000 common passwords (from the SecLists project, MIT licence, recorded in the licence register) or if they contain the account's email address. Unknown accounts are verified against a fixed dummy hash so the time does not reveal whether an account exists (NFR-19, TM-25).

**Lockout** (NFR-19, G-21): 5 failures for one account within 15 minutes lock it for 15 minutes whatever the source address. Sign in failures, including a locked account, return one generic 401 message (FR-32). `npm run admin:unlock -- --email ...` clears a lock from the server shell.

**First Administrator** (FR-47, G-1): only `npm run admin:create`, run on the server, which prompts for the email address and reads the password without echo. The setup screen alternative in FR-47 is not built (fewer moving parts, closes TM-26 fully). Until an Administrator exists, every admin page shows "setup required" and every admin API call returns `403 setup_required`. There is no default account or password.

**After sign in** (FR-32, G-23): the session response includes the previous successful sign in time and the number of failed attempts since then, shown by the portal.

**Rate limits** (NFR-21, G-10, G-20): fixed window counters in the `rate_limit` table keyed by `(rule, client key, window start)`. For rules keyed by address the client key is a keyed hash (the first 32 hex characters of HMAC-SHA256 with a per install rate key from `keys.json`), so the address is never stored readable; it is still personal data and kept at most 24 hours (data model D-9). `admin_write` is keyed by the session hash and `media_upload` by the account id. Counters are removed by the 10 minute sweep (ADR-0010). Rules and defaults: admin sign in 20 per 15 minutes per address; contact form 5 per hour; newsletter sign up 5 per hour; unsubscribe 10 per hour; admin writes 300 per minute per session; uploads 30 per hour per account. Exceeding returns 429 with `Retry-After` (an HTML page in the page language for public forms; a problem JSON for the admin API). The client address is the socket peer address; `X-Forwarded-For` is read only when the peer is listed in `TRUSTED_PROXIES` (empty by default), taking the right-most untrusted address. Limits are configuration values so tests can raise them.

**Equal timing** (FR-22, FR-23, G-11): sign up always runs the same statements in one transaction: normalise, HMAC for the suppression key, **the subscriber cap check first** (at the cap every address, new or existing, is refused with the same 503 page, so the cap cannot reveal which addresses exist; data model D-4), then one insert guarded by the suppression check with `ON CONFLICT DO NOTHING`. Unsubscribe always runs the same suppression insert (only when a subscriber row exists, so unknown addresses never create entries) and update. Both pad the response to a fixed minimum of 150 ms measured from the start of the handler, so the median difference stays well under 100 ms.

**Suppressed address at sign up (data model D-3): proposed, pending Steven's decision at T2.** Proposed default: an address with a suppression entry (unsubscribed within the last 36 months) is not stored, and the visitor sees the same confirmation as any other sign up. This protects someone who objected from being re-added by a third party (single opt in cannot prove ownership), at the price that a genuine change of mind is silently ignored for 36 months. Alternative: a fresh ticked consent deletes the suppression entry and subscribes. Either is one statement in the newsletter module; no contract change is needed for either, because the response is the same confirmation in both.

**Security event record** (NFR-34, G-2): sign in success and failure, lockout, password change or reset, account changes, subscriber export with row count, enquiry deletion and purge runs are appended to `security_event` with time, account id (or `anonymous` or `system`), event and result, and no other personal data. No admin endpoint can change or delete it; the purge job deletes entries after 12 months.

## Consequences

- No public cookie, so no consent banner (NFR-15) and the Cookie notice lists only the admin session cookie and the pause motion session storage item.
- Tokens embedded in cached pages must be refreshed at serve time if the optional page cache is used (ADR-0004).
- A stolen database copy reveals password hashes (Argon2id) but no live session.
- TM-21 (no second factor) remains High if hosted; the start refusal on non local addresses (ADR-0015) is the compensating control.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| @node-rs/argon2 | 2.2.1 | MIT | Argon2id hashing (prebuilt binaries, no install script) |
| Node.js `crypto` | runtime | MIT | Random identifiers, HMAC, SHA-256, constant time compare |
| Common password list | SecLists "10k most common" (pinned copy in the repo) | MIT | Password rejection list |
