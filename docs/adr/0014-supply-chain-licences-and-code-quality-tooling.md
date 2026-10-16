# ADR-0014: Supply chain controls, licence allow-list checks, software bill of materials, and the lint and type tooling

- Status: Proposed (for T2); two licences need Steven's recorded approval
- Date: 2026-10-15, amended 2026-10-16 in P4R2-ARCH (architecture gate finding AC-H1: the pinned toolchain did not install)
- Author: System Architect (P4-T2)
- Requirements: NFR-26, NFR-31, FR-18, FR-31, FR-47; G-18; LR-39, LR-40; threat model TM-53, TM-54, TM-57; RSK-28, RSK-45

## Context

NFR-26 requires a lock file, a dependency audit with no high or critical findings at release, a software bill of materials (SBOM), install scripts disabled except for an approved list, pinned same origin decoders, and glTF validation. NFR-31 requires every shipped or run time component to use an allow-listed licence (MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, 0BSD, CC0-1.0, MPL-2.0, SIL OFL-1.1 for fonts), a written approval for anything else, and a generated third party notices file (LR-40).

## Decision

**Install scripts**: the web repo's `.npmrc` sets `ignore-scripts=true`, `engine-strict=true`, `save-exact=true` and `audit-level=high`. The approved list of packages allowed to run install scripts is **empty**: every native dependency in this design ships prebuilt binaries without an install script (checked with `npm view <package> scripts` on 2026-10-15: better-sqlite3 13.0.3, sharp 0.35.5, @node-rs/argon2 2.2.1 have none). esbuild's `postinstall` is only an optimisation and is not needed. If a future dependency needs a script, it is added to `scripts/allowed-install-scripts.txt` with a reason and run explicitly by `setup.sh`.

**Pinning**: exact versions in `package.json` (no ranges) and `package-lock.json` committed; `npm ci` everywhere. Upgrades go through a reviewed change with the audit and the full verify.

**Audit**: `npm audit --omit=dev --audit-level=high` runs in `npm run lint` (fails the verify when a shipped dependency has a high or critical advisory). It needs the registry; when offline, the step reports "audit skipped: offline" and the release checklist requires one online run.

**SBOM and notices**: `npm run licences` runs `@cyclonedx/cyclonedx-npm` 6.0.1 to write `release/sbom.cdx.json` and `license-checker-rseidelsohn` 5.0.1 (needs Node.js 24 and npm 11, which the runtime decision below provides) to produce `release/THIRD-PARTY-NOTICES.txt` (name, version, licence, copyright, licence text) for production dependencies, plus the fonts and 3D assets from the licence register. The same command fails when a production dependency's licence is not on the allow-list and not listed in `licences/approved-exceptions.json` with the approval reference.

**Licence exceptions that need Steven's approval at T2** (recorded in the licence register once approved):

| Component | Licence | Why it is needed | Alternative if refused |
| --- | --- | --- | --- |
| SQLite 3.53.4 (inside better-sqlite3) | Public domain dedication | The data store (ADR-0003) | None without a database server; JSON files would lose transactions |
| libvips 8.18.7 and bundled codecs (`@img/sharp-libvips-*` 1.3.4) | LGPL-3.0-or-later | Fast, streaming image processing within NFR-10 on one CPU (ADR-0009) | WebAssembly codecs (slower; their JPEG codec also carries the IJG licence) |

Development only tools that are not shipped (npm itself under Artistic-2.0, Blender under GPL for authoring) are listed in the register for transparency but need no approval because NFR-31 covers shipped and run time software.

**Decoders** (G-18): the only decoder is three's `MeshoptDecoder`, bundled from the pinned `three` package into the fingerprinted 3D chunk and served from the site's own origin. No CDN, no runtime download.

**3D assets** (FR-31, G-18): every `.glb` passes the Khronos glTF validator with no errors and no external URI (`npm test`). Source files and the authorship statement live in `3d/source/` and the licence register.

**Code quality tooling**:

- TypeScript **5.9.3** in strict mode. openapi-typescript 7.13.0 (the newest release, needed to generate the admin client types) declares the peer `typescript ^5.x`, so TypeScript 6 cannot be installed beside it without forcing peers. typescript-eslint 8.71.0 (TypeScript below 6.1) and @astrojs/check 0.9.10 (TypeScript 5 or 6) both accept 5.9.3. TypeScript 6 or 7 returns when openapi-typescript supports it.
- ESLint 10.11.0 with typescript-eslint 8.71.0, eslint-plugin-astro 3.2.1 and **eslint-plugin-jsx-a11y-x 0.2.0**. eslint-plugin-jsx-a11y 6.10.2 (its newest release, October 2024) declares the peer `eslint ^3 to ^9` and cannot be installed with ESLint 10. eslint-plugin-jsx-a11y-x is the maintained fork (MIT, same rules under the `jsx-a11y-x/` prefix, peer `eslint ^9.0.0 || ^10.0.0`) and is listed by eslint-plugin-astro 3.2.1 as one of its two supported optional accessibility peers. Going back to ESLint 9 was rejected: eslint-plugin-astro 2 and later need ESLint 10, and the last release for ESLint 9 (1.7.0) uses the older astro-eslint-parser 1 line. Project rules: no `set:html` and no `dangerouslySetInnerHTML`; no string built SQL (`sql.raw` banned outside migrations); import boundaries (browser code cannot import `src/lib/**` server modules or `node:*`); no `eval` or `new Function`; no `console.log` in server code (use the logger).
- Prettier 3.9.9 for formatting (`prettier --check` in lint).
- `npm run typecheck` = `astro check && tsc --noEmit`.

**Runtime and package manager minimum (AC-H1)**: with `engine-strict=true`, eslint-plugin-astro 3.2.1 and its parser astro-eslint-parser 3.2.0 require Node.js `^22.22.3 || ^24.16.0 || >=26.3.0`, and license-checker-rseidelsohn 5.0.1 requires Node.js 24 or later with npm 11 or later. In addition, npm 10 (bundled with every Node.js 22 release, 10.9.8 in 22.22.3) stops with an internal error (`Cannot read properties of null (reading 'edgesOut')`) while resolving vitest 5.0.3 (and 4.1.11), while npm 11 resolves the same tree. **The Node.js minimum therefore changes from 22.22.0 to 24.16.0** (with its bundled npm 11.13.0): `.nvmrc` = `24`, `package.json` `engines` = `{ "node": "^24.16.0", "npm": ">=11" }`, and `scripts/doctor.sh` refuses older versions. This also settles the earlier T2 item that Node.js 22 ends support on 30 April 2027 (ADR-0001); Node.js 24 is supported until 30 April 2028. The cloud workspace currently has Node.js 22.22.0 and npm 10.9.4, which do not meet the minimum (see ADR-0012).

**Verification of the pins (2026-10-16)**: a `package.json` with every pin of `docs/repo-plan.md` section 5 and the `.npmrc` above was resolved in a scratch folder outside the repos:

| Run | Node.js and npm | Result |
| --- | --- | --- |
| Previous pins (TypeScript 6.0.3, eslint-plugin-jsx-a11y 6.10.2) | 24.16.0, npm 11.13.0 | `ERESOLVE`: peer `typescript@^5.x` from openapi-typescript 7.13.0 |
| New pins | 22.22.0, npm 10.9.4 (workspace today) | `EBADENGINE` on the project's own `engines` (the intended refusal) |
| New pins | 22.22.3, npm 10.9.9 | npm internal error on vitest (see above) |
| New pins | 24.16.0, npm 11.13.0 | `npm install --package-lock-only --engine-strict --ignore-scripts` exit 0; `npm ci --engine-strict --ignore-scripts` exit 0, 1,027 packages; `npm ls --all` exit 0 (only optional peers unmet) |
| New pins | 24.22.0, npm 11.21.0 | `npm ci --dry-run --engine-strict --ignore-scripts` exit 0 |

Installed versions confirmed after `npm ci`: typescript 5.9.3, eslint 10.11.0, typescript-eslint 8.71.0, eslint-plugin-astro 3.2.1, astro-eslint-parser 3.2.0, eslint-plugin-jsx-a11y-x 0.2.0, openapi-typescript 7.13.0, vitest 5.0.3, @cyclonedx/cyclonedx-npm 6.0.1, license-checker-rseidelsohn 5.0.1, @types/node 24.19.0. An ESLint run over a `.ts`, an `.astro` and a `.tsx` file loaded all three plugins and reported `jsx-a11y-x/alt-text` on an `<img>` without `alt`. The scratch lock file is not committed; the web repo creates its own at scaffold time (`docs/repo-plan.md` section 7). The Node.js binaries used were the `node-linux-x64` packages from the npm registry, because nodejs.org is not reachable from the workspace.

Only development tools changed. The shipped dependency set and the licence allow-list rules (above and NFR-31) are unchanged.

## Consequences

- A compromised package cannot run code at install time; it can still run at build or run time, which the lock file, the audit, the SBOM and review of upgrades limit (TM-53).
- The two licence approvals are a T2 decision. Without them the design changes as in the table.
- Reviewers and the workspace need Node.js 24.16.0 or later (AC-H1). On the Mac this is one `nvm install 24` or the Node.js 24 installer.
- eslint-plugin-jsx-a11y-x is a younger fork with fewer users than the original plugin; if it stops being maintained, the fallback is the original plugin once it supports ESLint 10, or the React specific rules of `@eslint-react`. Its rules are development only and do not ship.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| typescript | 5.9.3 | Apache-2.0 | Type checking (development only) |
| eslint | 10.11.0 | MIT | Lint (development only) |
| typescript-eslint | 8.71.0 | MIT | TypeScript lint rules (development only) |
| eslint-plugin-astro | 3.2.1 | MIT | Astro lint rules (development only) |
| eslint-plugin-jsx-a11y-x | 0.2.0 | MIT | Accessibility lint for the admin JSX (development only) |
| prettier | 3.9.9 | MIT | Formatting (development only) |
| @cyclonedx/cyclonedx-npm | 6.0.1 | Apache-2.0 | SBOM (development only) |
| license-checker-rseidelsohn | 5.0.1 | BSD-3-Clause | Licence report and notices (development only; needs Node.js 24 and npm 11) |
| openapi-typescript | 7.13.0 | MIT | Admin client types (development only; peer TypeScript 5) |
| Node.js | minimum 24.16.0 (`.nvmrc` 24), npm 11 or later (11.13.0 bundled) | MIT; npm Artistic-2.0 (build tool, not shipped) | Runtime and package manager |
