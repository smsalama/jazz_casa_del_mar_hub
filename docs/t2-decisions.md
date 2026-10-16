# T2 decisions: design and architecture

- Prepared by: Orchestrator, 2026-10-16
- "Approve T2" in chat means: approve the design (`docs/design/`, `design/prototype/`), the architecture (`docs/architecture.md`, `docs/adr/`, `contract/openapi.yaml`, `docs/data-model.md`, `docs/repo-plan.md`), and every recommendation below. To change an item, reply "Approve T2 with changes:" and the item numbers with your answers.
- Gates: design and architecture PASS with conditions after your decision to fix only the high findings (`gates/design.json`, `gates/architecture.json`, `docs/reviews/phase4-rereview.md`). Medium and low findings are carried as known items, listed in `docs/reviews/phase4-gate-findings.md` and `docs/reviews/phase4-rereview.md`.
- Legal content is research, not legal advice.

## A. Things only you can judge

1. **Look and feel (NFR-36 design verdict).** Open `design/prototype/index.html` (and the other pages) in a browser on your Mac. The 3D scenes are NOT built yet: only flat poster images exist, and you chose to judge the 3D look blind. Recommendation: stylised low poly diorama scenes (see `docs/design/motion-spec.md`).
2. **Resort name (DC-H1).** The documents use "Jazz Casa del Mar". The real resort is "Jaz Elite Casa del Mar Beach". Options: the full real name, a short form ("Casa del Mar"), or a neutral codename. Recommendation: neutral codename or short form until your solicitor answers Q1.

## B. Architecture decisions

3. Astro (server rendering) instead of Next.js, embedded SQLite instead of PostgreSQL, no Docker, one web repo and no api repo. Recommendation: approve (zero running cost, one process).
4. **Node 24.16.0 and npm 11 are now required** (the old Node 22 plan could not install; Node 22 also ends support in April 2027). The cloud workspace has Node 22, so I need Node 24 there, or the registry binary checked against official checksums (ADR-0012), before building. You also need Node 24 on your Mac.
5. Licence approvals: SQLite (public domain), libvips via sharp (LGPL), packages under BlueOak-1.0.0 and Python-2.0 (argparse). Recommendation: approve all four.
6. Rich text allow-list reading, D-2 wording archive (built in, pending your OK), backup disk space caveat (backups use disk; set a limit in settings).
7. Two step verification stays out; the start guard keeps the package local only. Known residual: a deliberate header stripping proxy that rewrites the Host header could still publish the admin portal. Rule: do not publish this release.

## C. Open questions

8. OQ-22 newsletter suppression: recommendation: silent block for 36 months unless the person re-subscribes with fresh consent.
9. OQ-23 Russian й and ё search: recommendation: keep distinct.
10. OQ-24 concept notice size 13 px below 640 px and 14 px above, exempt from the 16 px minimum: recommendation: approve.
11. OQ-25 first 3D frame in 4 s, or 4.5 s if the spike misses: recommendation: 4 s target, 4.5 s allowed.
12. 8 hour admin session limit: is it an essential exception to WCAG 2.2.1? Recommendation: yes, with unsaved text restore after sign in.

## D. Known items carried (no decision needed)

All remaining medium and low findings (see the two review files). Nothing above blocks building the local review concept; the solicitor questions Q1 to Q7 still block any hosting.
