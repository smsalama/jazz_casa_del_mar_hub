# ADR-0014: Supply chain controls, licence allow-list checks, software bill of materials, and the lint and type tooling

- Status: Proposed (for T2); two licences need Steven's recorded approval
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: NFR-26, NFR-31, FR-18, FR-31, FR-47; G-18; LR-39, LR-40; threat model TM-53, TM-54, TM-57; RSK-28, RSK-45

## Context

NFR-26 requires a lock file, a dependency audit with no high or critical findings at release, a software bill of materials (SBOM), install scripts disabled except for an approved list, pinned same origin decoders, and glTF validation. NFR-31 requires every shipped or run time component to use an allow-listed licence (MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, 0BSD, CC0-1.0, MPL-2.0, SIL OFL-1.1 for fonts), a written approval for anything else, and a generated third party notices file (LR-40).

## Decision

**Install scripts**: the web repo's `.npmrc` sets `ignore-scripts=true`, `engine-strict=true`, `save-exact=true` and `audit-level=high`. The approved list of packages allowed to run install scripts is **empty**: every native dependency in this design ships prebuilt binaries without an install script (checked with `npm view <package> scripts` on 2026-10-15: better-sqlite3 13.0.3, sharp 0.35.5, @node-rs/argon2 2.2.1 have none). esbuild's `postinstall` is only an optimisation and is not needed. If a future dependency needs a script, it is added to `scripts/allowed-install-scripts.txt` with a reason and run explicitly by `setup.sh`.

**Pinning**: exact versions in `package.json` (no ranges) and `package-lock.json` committed; `npm ci` everywhere. Upgrades go through a reviewed change with the audit and the full verify.

**Audit**: `npm audit --omit=dev --audit-level=high` runs in `npm run lint` (fails the verify when a shipped dependency has a high or critical advisory). It needs the registry; when offline, the step reports "audit skipped: offline" and the release checklist requires one online run.

**SBOM and notices**: `npm run licences` runs `@cyclonedx/cyclonedx-npm` 6.0.1 to write `release/sbom.cdx.json` and `license-checker-rseidelsohn` 5.0.1 to produce `release/THIRD-PARTY-NOTICES.txt` (name, version, licence, copyright, licence text) for production dependencies, plus the fonts and 3D assets from the licence register. The same command fails when a production dependency's licence is not on the allow-list and not listed in `licences/approved-exceptions.json` with the approval reference.

**Licence exceptions that need Steven's approval at T2** (recorded in the licence register once approved):

| Component | Licence | Why it is needed | Alternative if refused |
| --- | --- | --- | --- |
| SQLite 3.53.4 (inside better-sqlite3) | Public domain dedication | The data store (ADR-0003) | None without a database server; JSON files would lose transactions |
| libvips 8.18.7 and bundled codecs (`@img/sharp-libvips-*` 1.3.4) | LGPL-3.0-or-later | Fast, streaming image processing within NFR-10 on one CPU (ADR-0009) | WebAssembly codecs (slower; their JPEG codec also carries the IJG licence) |

Development only tools that are not shipped (npm itself under Artistic-2.0, Blender under GPL for authoring) are listed in the register for transparency but need no approval because NFR-31 covers shipped and run time software.

**Decoders** (G-18): the only decoder is three's `MeshoptDecoder`, bundled from the pinned `three` package into the fingerprinted 3D chunk and served from the site's own origin. No CDN, no runtime download.

**3D assets** (FR-31, G-18): every `.glb` passes the Khronos glTF validator with no errors and no external URI (`npm test`). Source files and the authorship statement live in `3d/source/` and the licence register.

**Code quality tooling**:

- TypeScript **6.0.3** in strict mode. TypeScript 7.0.2 (the native compiler) is out but typescript-eslint 8.71.0 supports TypeScript below 6.1 only, so 6.0.3 is the stable choice.
- ESLint 10.11.0 with typescript-eslint 8.71.0, eslint-plugin-astro 3.2.1 and eslint-plugin-jsx-a11y 6.10.2. Project rules: no `set:html` and no `dangerouslySetInnerHTML`; no string built SQL (`sql.raw` banned outside migrations); import boundaries (browser code cannot import `src/lib/**` server modules or `node:*`); no `eval` or `new Function`; no `console.log` in server code (use the logger).
- Prettier 3.9.9 for formatting (`prettier --check` in lint).
- `npm run typecheck` = `astro check && tsc --noEmit`.

## Consequences

- A compromised package cannot run code at install time; it can still run at build or run time, which the lock file, the audit, the SBOM and review of upgrades limit (TM-53).
- The two licence approvals are a T2 decision. Without them the design changes as in the table.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| typescript | 6.0.3 | Apache-2.0 | Type checking (development only) |
| eslint | 10.11.0 | MIT | Lint (development only) |
| typescript-eslint | 8.71.0 | MIT | TypeScript lint rules (development only) |
| eslint-plugin-astro | 3.2.1 | MIT | Astro lint rules (development only) |
| eslint-plugin-jsx-a11y | 6.10.2 | MIT | Accessibility lint for the admin JSX (development only) |
| prettier | 3.9.9 | MIT | Formatting (development only) |
| @cyclonedx/cyclonedx-npm | 6.0.1 | Apache-2.0 | SBOM (development only) |
| license-checker-rseidelsohn | 5.0.1 | BSD-3-Clause | Licence report and notices (development only) |
