# ADR-0001: One Node.js process on the client's small server, no containers, no database server

- Status: Proposed (for T2)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: NFR-10, NFR-31, NFR-32, NFR-35, FR-47, FR-48, OQ-13, OQ-14, A-19, RSK-5, RSK-6

## Context

The site runs on the client's own server, designed for 1 CPU, 1 GB memory and 10 GB disk, with no database server and no mail server (OQ-14, A-19). It must run in 512 MB at rest and 1 GB under the NFR-10 load (NFR-31), cost nothing to operate (NFR-31), and install and first run in at most 10 documented commands (NFR-32). In this release it is reviewed only on one computer (FR-47, OQ-13): Steven's Mac, plus the agency's Linux cloud workspace for tests, which has no Docker engine. The hosting questionnaire is not filled in, so nothing beyond A-19 can be assumed (RSK-6).

## Options considered

1. **One Node.js process** serving pages, forms, the admin portal and its API, with an embedded data store, an in-process scheduler for the purge and backup jobs, and a short-lived child process for each image job.
2. **Separate web and API processes** (agency default when an api repo exists), each a Node.js server, talking over HTTP on the same machine.
3. **Containers** (Docker Compose locally and on the server).
4. **Static site plus a small API** (pages built at deploy time, API for forms and admin).

## Decision

Option 1. One Node.js process, started with `node --max-old-space-size=256 dist/server/main.mjs`, is the whole application. It owns:

- HTTP serving (public pages, public form posts, admin portal shell, admin JSON API, media, static and 3D assets, health check), with the request limits of NFR-35 applied before any handler runs;
- the embedded SQLite data store (ADR-0003);
- the scheduler that runs the retention purge and the backup once every 24 hours (ADR-0010);
- a queue that sends each uploaded image to a fresh child process with time and memory limits (ADR-0009).

Server side commands (create the first Administrator, reset a password, unlock an account, back up, restore, purge, migrate) are separate short-lived Node.js programs that use the same modules and the same data folder (ADR-0015).

Runtime: **Node.js 24 LTS, minimum 24.16.0, with npm 11 or later** (`.nvmrc` = `24`; `engines` `{ "node": "^24.16.0", "npm": ">=11" }`). Amended 2026-10-16 in P4R2-ARCH (architecture gate finding AC-H1): the earlier minimum of Node.js 22.22.0 could not install the pinned development tools with `engine-strict=true` (eslint-plugin-astro 3.2.1 and astro-eslint-parser 3.2.0 need 22.22.3, 24.16.0 or 26.3.0 or later; license-checker-rseidelsohn 5.0.1 needs Node.js 24 and npm 11; npm 10, bundled with every Node.js 22, fails to resolve vitest 5). The evidence is in ADR-0014. This replaces the agency template's `.nvmrc` value of `22` for this project. Node.js 24 is supported until 30 April 2028, so the earlier T2 condition "move off Node.js 22 (end of support 30 April 2027) before hosting" is met by this change. The cloud workspace runs Node.js 22.22.0 today and must be given Node.js 24 before the web repo is scaffolded (ADR-0012).

No Docker anywhere: there is no database server to run, so Docker Compose adds nothing on the Mac and is unavailable in the cloud workspace.

## Consequences

- Fits the memory target: an Astro server process with a few megabytes of content in memory is expected at 80 to 150 MB resident at rest; the image child process adds at most 256 MB while a job runs (killed above that); the Argon2id work is capped at two concurrent hashes of 19 MiB. The Performance Engineer confirms with AC-76.4.
- Fits the "no running cost" rule and the questionnaire gap: the only server requirement is Node.js and a writable folder. A reverse proxy for HTTPS is needed only when hosting is allowed (G-22), and the hosting guide covers it.
- Single point of failure and no horizontal scaling. Accepted: the site is small, local review only, and NFR-10 is sized for one CPU.
- A long synchronous task would block every request. Mitigated: SQLite queries are short and indexed; CSV export streams rows; image work runs in a child process; password hashing runs on the libuv thread pool.
- Option 2 was rejected because two processes double the memory floor and add an internal network hop, an extra repo (ADR-0013) and a CORS and authentication boundary between them, for no requirement that needs it.
- Option 4 was rejected because FR-38 requires edits to go live within 60 seconds without a rebuild.
- The earlier condition before hosting (move from Node.js 22, which ends on 30 April 2027, to 24 or 26 LTS) is met by the Node.js 24 minimum (AC-H1). Before hosting, check that Node.js 24 is still supported on the planned date (end of support 30 April 2028).

## Versions and licences

| Component | Version | Licence |
| --- | --- | --- |
| Node.js runtime | 24 LTS, minimum 24.16.0 (pins resolved and installed on 24.16.0 and 24.22.0, ADR-0014) | MIT (Node.js), with bundled third party notices |
| npm | 11 or later, as bundled with Node.js 24 (11.13.0 with 24.16.0); npm 10 is refused | Artistic-2.0 (build tool only, not shipped) |
