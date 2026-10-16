# P4R2-ARCH notes: fixes for the three high architecture gate findings (2026-10-16)

- Task: P4R2-ARCH (System Architect), branch `p4r2-arch`
- Scope: AC-H1, AC-H2 and SEC-H1 of `gates/architecture.json` only. Steven decided that the medium and low findings go to T2 as known items; none of them was changed here.
- Changed: `docs/architecture.md`, `docs/repo-plan.md`, `contract/openapi.yaml` (descriptions only, no request or response shape change), ADR-0001, ADR-0006, ADR-0007, ADR-0012, ADR-0014, ADR-0015.
- Not changed (owned by others): `docs/design/motion-spec.md` (designer, section 2 below), `docs/threat-model.md` (security engineer, section 3 below).

## 1. AC-H1: pinned toolchain now installs

### Decision

| Item | Before | After | Why |
| --- | --- | --- | --- |
| TypeScript | 6.0.3 | 5.9.3 | openapi-typescript 7.13.0 (newest) has peer `typescript ^5.x` |
| Admin JSX accessibility lint | eslint-plugin-jsx-a11y 6.10.2 | eslint-plugin-jsx-a11y-x 0.2.0 (MIT) | 6.10.2 (newest) has peer `eslint ^3 to ^9`; the fork supports `^9 or ^10` and is a supported optional peer of eslint-plugin-astro 3.2.1 |
| Node.js minimum | 22.22.0 (`.nvmrc` 22) | 24.16.0 (`.nvmrc` 24), `engines` `{ "node": "^24.16.0", "npm": ">=11" }` | eslint-plugin-astro 3.2.1 and astro-eslint-parser 3.2.0 need `^22.22.3 or ^24.16.0 or >=26.3.0`; license-checker-rseidelsohn 5.0.1 needs Node.js 24 and npm 11; npm 10 (bundled with all Node.js 22) crashes resolving vitest 5.0.3 |
| @types/node | "22 line" | 24.19.0 | Matches the runtime |
| license-checker-rseidelsohn | 5.0.1 | 5.0.1 (kept) | Installs on Node.js 24 with npm 11 |

ESLint stays 10.11.0, typescript-eslint 8.71.0, eslint-plugin-astro 3.2.1, openapi-typescript 7.13.0, vitest 5.0.3. Licence allow-list rules are unchanged; only development tools changed, so the shipped dependency set is the same.

Node.js 22 end of support (30 April 2027) was already a T2 item; it is now settled by the move to Node.js 24 (supported until 30 April 2028), and the item becomes "Node.js 24 is required now" for Steven's Mac and the workspace.

### How it was verified (scratch folder outside the repos; no lock file in any repo)

A `package.json` with every pin of `docs/repo-plan.md` section 5 (plus @fontsource-variable/inter 5.3.0 as the font example) and the planned `.npmrc` (`ignore-scripts=true`, `engine-strict=true`, `save-exact=true`, `audit-level=high`):

| Run | Node.js, npm | Command | Result |
| --- | --- | --- | --- |
| Old pins | 24.16.0, 11.13.0 | `npm install --package-lock-only --engine-strict --ignore-scripts` | `ERESOLVE`, peer `typescript@^5.x` from openapi-typescript 7.13.0 |
| New pins | 22.22.0, 10.9.4 (workspace today) | `npm ci --dry-run --engine-strict --ignore-scripts` | `EBADENGINE` on the project `engines` (intended) |
| New pins | 22.22.3, 10.9.9 | `npm install --package-lock-only` | npm internal error `Cannot read properties of null (reading 'edgesOut')`; reproduced with only `vitest` 5.0.3 (and 4.1.11) in the file |
| New pins | 24.16.0, 11.13.0 (bundled) | `npm install --package-lock-only --engine-strict --ignore-scripts`, then `npm ci --engine-strict --ignore-scripts`, then `npm ls --all` | all exit 0; 1,027 packages; only optional peers unmet |
| New pins | 24.22.0, 11.21.0 | `npm ci --dry-run --engine-strict --ignore-scripts` | exit 0 |

Registry facts used (`npm view <pkg>@<ver> peerDependencies engines`, 2026-10-16): openapi-typescript 7.13.0 peer `typescript ^5.x`; eslint-plugin-jsx-a11y 6.10.2 peer `eslint ^3 || ... || ^9`; eslint-plugin-jsx-a11y-x 0.2.0 peer `eslint ^9.0.0 || ^10.0.0`, engines `^20.9.0 || >=21.1.0`; eslint-plugin-astro 3.2.1 engines `^22.22.3 || ^24.16.0 || >=26.3.0`, peers `eslint >=10`, optional `eslint-plugin-jsx-a11y` or `eslint-plugin-jsx-a11y-x`; astro-eslint-parser 3.2.0 same engines; license-checker-rseidelsohn 5.0.1 engines `node >=24, npm >=11` (4.4.2 needs only Node.js 18, kept as a fallback); typescript-eslint 8.71.0 peer `typescript >=4.8.4 <6.1.0`; @astrojs/check 0.9.10 peer `typescript ^5.0.0 || ^6.0.0`; eslint 10.11.0 engines `^20.19.0 || ^22.13.0 || >=24`; vitest 5.0.3 engines `^22.12.0 || ^24.0.0 || >=26.0.0`; Node.js 22.22.3 released 2026-05-14, 24.16.0 released 2026-05-22 (bundles npm 11.13.0).

After `npm ci` the installed versions were read from `node_modules`: typescript 5.9.3, eslint 10.11.0, typescript-eslint 8.71.0, eslint-plugin-astro 3.2.1, astro-eslint-parser 3.2.0, eslint-plugin-jsx-a11y-x 0.2.0, openapi-typescript 7.13.0, vitest 5.0.3, @cyclonedx/cyclonedx-npm 6.0.1, license-checker-rseidelsohn 5.0.1. An ESLint flat config with typescript-eslint, eslint-plugin-astro and eslint-plugin-jsx-a11y-x linted a `.ts`, an `.astro` and a `.tsx` file and reported `jsx-a11y-x/alt-text` for `<img>` without `alt`. `@redocly/cli` 2.57.0 from the same install linted `contract/openapi.yaml`: valid, 9 warnings (the same 9 as before this task, low finding L9).

Caveat: nodejs.org is blocked from the workspace, so the Node.js 22.22.3, 24.16.0 and 24.22.0 binaries used were the `node-linux-x64` repackages on the npm registry (maintainer aredridel). Their checksums were not compared with nodejs.org `SHASUMS256.txt`. The resolution result does not depend on the binary's origin, but the workspace upgrade must use a checked binary (ADR-0012).

## 2. AC-H2: text the designer must change in `docs/design/motion-spec.md`

Architecture side: ADR-0007 section "What swup replaces and what persists", `docs/architecture.md` section 7, `contract/openapi.yaml` `HtmlDocument`. Exact edits for the motion specification:

1. Section 5.1, line 148. Replace "the language switcher is a normal link to the other language's page and may use the transition" with "the language switcher is a normal link to the other language's page and uses the transition; the head plugin then sets `html lang` to the new language, and the panel label, announcements, header, navigation and footer all switch language at the swap".
2. Section 5.2 storyboard, line 158. Replace "Swap: swup replaces `main`, updates title, description and robots through the head plugin," with "Swap: swup replaces the three containers `#swup-top` (skip link, top concept notice, header with navigation and `aria-current`, language switcher), `#swup-main` (`main`) and `#swup-footer` (concept sentence, legal links, newsletter form with its fresh `formToken`); the head plugin merges the new head (title, description, robots, stylesheets, waiting for new stylesheets such as the Cyrillic font file) and updates `lang` and `dir` on `html`; the panel's \"Loading\" label takes the new page's language;".
3. Section 5.4, line 174. Replace "swap task at most 50 ms (DOM replace and head update)" with "swap task at most 50 ms (replace of the three containers, head merge and `html lang` update; waiting for a new stylesheet happens before the swap and is not part of the task)".
4. Section 5.5, line 180. Replace "`main` fades out in 60 ms and the new `main` fades in over 60 ms (`linear`)" with "the three containers fade out in 60 ms and the new ones fade in over 60 ms (`linear`), as one swap".
5. Section 5.6, line 187. Replace "The a11y plugin announces the new page title through its live region;" with "The a11y plugin announces the new page title through its live region, using announcement wording keyed by the new `html lang` (en, de, it, ru, from the fixed resource files);".
6. Section 12.3: add a risk row "R-M4: the head plugin's `awaitAssets` can delay the swap on a first visit to a `ru` page while the Cyrillic font stylesheet loads; counts within the cover time; Performance Engineer measures on L1". Optional, but it keeps the transition budget honest.

The design low finding "swup needs the head plugin (`awaitAssets`) and an `html lang` update on language change" is covered by ADR-0007 now; the designer can close it once the edits above are made.

## 3. SEC-H1: text the security engineer should put in `docs/threat-model.md`

Architecture side: ADR-0015 (start part, request part, residual), ADR-0006 (cookie branches, rate limit client key, consequences), `docs/architecture.md` sections 1, 2, 5, 8, 11, 14, 16, 17, 18, 19, `docs/repo-plan.md` section 6 and 7, `contract/openapi.yaml` conventions.

1. Line 342, G-22, replace the quoted requirement text with: "Until HTTPS is configured and two step verification (FR-33) is built and enforced for every admin account, the package shall refuse to start unless the listen address is a loopback address, `PUBLIC_ORIGIN` is the server's own `http` loopback origin on the listen port, and no trusted proxy is configured; and it shall answer 421 to every request from a non loopback peer, carrying a forwarding header (`Forwarded`, `X-Forwarded-*`, `X-Real-IP`, `Via` or similar), or with a `Host` that is not the `PUBLIC_ORIGIN` host. There shall be no setting that relaxes this."
2. Line 202, TM-21 row, "Gaps" column: keep "G-22, G-23"; "Existing controls" column: add "Exposure guard (ADR-0015): loopback listen address and origin, empty TRUSTED_PROXIES, loopback peers only, 421 on forwarding headers".
3. Line 312: replace "G-22 makes the hosted case impossible without FR-33." with "G-22 makes the hosted case, and publishing through a local reverse proxy or tunnel, impossible without FR-33; a raw TCP forward deliberately set up by the machine's owner remains undetectable by the server and is excluded by the run instructions."
4. Line 404: replace "and a hard stop on non local binding without FR-33 (G-22)." with "and a hard stop without FR-33 on non local binding, on a non loopback or https origin, on a configured proxy, and on any proxied request (G-22)."
5. TM-65 row (line 291), "Existing controls": add "In this release no forwarding header is read: requests carrying one get 421 (G-22)".

### Acceptance checks for the exposure guard (integration suite, spawned built server)

Each check runs the built server (`node dist/server/main.mjs`) with a fresh data folder.

- G22-1: `HOST=0.0.0.0` (and `::`, `192.168.1.10`): exit status 78 within 10 s, standard error starts with `STARTUP-REFUSED` and names `HOST`, no process listening on `PORT` (AC-63.2).
- G22-2: `PUBLIC_ORIGIN=https://localhost:4321` with `PORT=4321`: exit 78, message names `PUBLIC_ORIGIN`, no port listening.
- G22-3: each of `http://example.test:4321`, `http://192.168.1.10:4321`, `http://localhost:8080` (with `PORT=4321`), `http://localhost` (with `PORT=4321`), `http://user@localhost:4321`, `http://localhost:4321/site`: exit 78 naming `PUBLIC_ORIGIN`, no port listening.
- G22-4: each of `http://localhost:4321`, `http://127.0.0.1:4321`, `http://[::1]:4321` with `PORT=4321` and matching `HOST`: the server starts and `GET /healthz` with the matching `Host` returns 200.
- G22-5: `TRUSTED_PROXIES=127.0.0.1` (and any other non empty value): exit 78 naming `TRUSTED_PROXIES`, no port listening.
- G22-6: on a running server, for each of `GET /en`, `GET /healthz`, `GET /_astro/<built file>`, `GET /media/<file>`, `POST /en/contact`, `POST /admin/api/session` (valid JSON, correct `X-Requested-With`, `Origin` and credentials of a seeded test account) send one forwarding header at a time: `X-Forwarded-For: 203.0.113.5`, `X-Forwarded-Proto: https`, `X-Forwarded-Host: example.test`, `Forwarded: for=203.0.113.5`, `X-Real-IP: 203.0.113.5`, `Via: 1.1 proxy`, `CF-Connecting-IP: 203.0.113.5`, `X-Forwarded-For` with an empty value, and the same names in mixed case. Every response is 421 with the fixed text body and `Cache-Control: no-store`, no `Set-Cookie`; afterwards the database has no new `session`, `rate_limit`, `used_form_token`, `enquiry` or `security_event` row.
- G22-7: a request with a forwarding header and a declared 10 MB body gets its 421 without the server reading the body (response time well under the time needed to send 10 MB at a throttled rate).
- G22-8: a test proxy (a few lines of Node.js on another loopback port, forwarding to the server and adding `X-Forwarded-For` and `X-Forwarded-Proto` as nginx, Caddy, ngrok and cloudflared do) gets 421 for every path, including admin sign in; a second variant that adds no header but rewrites `Host` to `example.test` also gets 421.
- G22-9: unit test of the peer predicate: `127.0.0.1`, `127.1.2.3`, `::1`, `::ffff:127.0.0.1` allowed; `10.0.0.1`, `192.168.1.10`, `::ffff:10.0.0.1`, `fe80::1`, `2001:db8::1`, empty or undefined refused; the request handler called with a socket whose `remoteAddress` is non loopback answers 421.
- G22-10: the configuration schema has no variable, and the server and commands have no flag, that disables any of the checks above (test reads the schema keys and the command line parser; code review confirms); the normal end-to-end suite on `http://localhost:4321` sees no 421.

## 4. Items for the Orchestrator

- The cloud workspace has Node.js 22.22.0 and npm 10.9.4; the web repo cannot be scaffolded or verified there until Node.js 24.16.0 or later with npm 11 is available (nodejs.org allowed for the workspace, or the registry binary checked against the official checksums). Steven's Mac also needs Node.js 24.
- The agency template's `.nvmrc` is `22`; this project overrides it with `24` in the web repo (ADR-0001). Whether the agency template should move to 24 is an agency decision, not part of this task.
- Node.js 24 has the built-in `crypto.argon2` (ADR-0006 option c was rejected for Node.js 22) and a newer `node:sqlite` (ADR-0003 option 4). Neither decision was reopened; they could be looked at with the T2 known items.
- Low finding L1 (`127.0.0.1` gets 421 because the canonical host is `localhost`) is unchanged and still applies: the exposure guard's host check uses the configured `PUBLIC_ORIGIN` exactly.
- Low finding L3 (strong `ETag` against the per response footer token) is unchanged; ADR-0007 now keeps swup's own page cache from reusing a token, but the browser's revalidated copy is still the L3 item.
