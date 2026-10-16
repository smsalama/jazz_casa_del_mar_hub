# Phase 4 re-review of the high findings (2026-10-16)

Steven's decision (chat, 2026-10-16): "fix only the highs, skip the 3D hero preview, and take the remaining mediums to T2 as known items. I will judge the look blindly."

Independent re-reviews ran on hub main (a1bb7db plus the dialog fix 80210a8). Reviewers edited no files.

## Design (accessibility reviewer)

- A-1 RESOLVED: `defer` on every page; menu, Pause motion, Show password and admin menu verified in headless Chromium on more than six pages.
- DC-H3 PARTLY at review, then fixed: the reviewer found a new high (the session warning dialog could not scroll at 200 percent zoom, so its buttons were unreachable) and a stale dialog name in the signed out state. Both were fixed in 80210a8 and re-measured (`design/prototype-checks/h3-scroll-results.json`: buttons visible at 640x360 and 320x256).
- DC-H4 resolved at specification level. Gaps recorded as T2 known items below.
- 8 hour hard limit under WCAG 2.2.1: reviewer judged the "essential" argument acceptable only if unsaved text is restored. Decision for T2.

## Architecture (security reviewer)

- AC-H1 RESOLVED: with Node 24.16.0 and npm 11.13.0, `npm install --package-lock-only`, `npm ci` and `npm ls` exit 0; Node 22 is refused with EBADENGINE. The Node binary used was an unverified npm registry repackage because nodejs.org is blocked.
- AC-H2 RESOLVED: three swap containers, head plugin attributes and announcement keys checked against the installed plugin sources.
- SEC-H1 RESOLVED for local review only. A proxy that adds no forwarding header and rewrites `Host` to `localhost:<port>` still passes. Documents reworded to say so (ADR-0015, ADR-0006, architecture).

## Known items carried to T2 (medium and low)

New from the re-reviews:
- Focus does not land on the h1 after a transition: the swup a11y plugin focuses `body` unless `visit.a11y.focus` is set in a `visit:start` hook (FR-29). Docs assume h1 focus.
- Guard tests missing for: header free proxy with rewritten `Host`, HTTP/1.0 without `Host`, duplicate `Host`, absolute form targets, `HOST` as IP literal or `localhost` only, inspector flags. `npm run dev` and `astro preview` bypass the guard.
- Session warning: hard limit variant not prototyped; loading and error states not demonstrable; errors on a hidden language tab need a "select that tab, then focus the field" rule; Site text group switching without JavaScript; subject list editing; tabpanel naming; no prototypes for the three new admin screens; prototype navigation lacks the new screens.
- Duplicate ID R-M4 in the motion spec; ADR-0003 and ADR-0006 still argue against Node 22; template `doctor.sh` and `.nvmrc` say 22; a failed form post returning 500 loses its page through swup; development only advisories in `@gltf-transform/cli` and drizzle-kit.
- Design designer notes: `docs/reviews/p4r2-design-notes.md` (15 items). Architect notes: `docs/reviews/p4r2-arch-notes.md`.

Original mediums and lows: `gates/design.json`, `gates/architecture.json` (previous findings), `docs/reviews/phase4-gate-findings.md`.

## Node 24 requirement

The architect's fix moves the project minimum to Node 24.16.0 with npm 11. The cloud workspace has Node 22.22.0, so the web repo cannot be scaffolded or verified there until Node 24 is available. Steven's Mac also needs Node 24 (ADR-0012).
