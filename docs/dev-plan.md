# Development plan (Phase 5)

- Date: 2026-10-16. Basis: approved T2, `docs/repo-plan.md` section 7, `docs/mvp.md` (62 Must stories), the design in `docs/design/`, the ADRs and `contract/openapi.yaml`.
- Tasks P6-T1 to P6-T13 and their dependencies are in `state/project.json`. Order: scaffold, skeleton and database, then the 3D spike (before the other five scenes, RSK-3), public site and forms, admin, remaining scenes, operations, development gate.
- Each task: one branch in the web repo, small commits, `bash scripts/verify.sh --evidence <hub>/evidence/6-implementation` in the web and hub repos, tests written with the code (Vitest unit and integration, contract tests, Playwright, axe).
- Known items carried from Phase 4 (see `docs/reviews/phase4-rereview.md`) are assigned to the task that builds the affected area: focus on h1 (P6-T5), extra guard tests (P6-T2), error focus on hidden language tabs and Site text switching (P6-T9).
- Environment: the web repo needs Node 24.16.0 and npm 11 (ADR-0012). The workspace has Node 22.22.0, so P6-T1 must first provide Node 24 in the workspace; an unverified registry repackage may be used for building only, never shipped, and is recorded as a risk.
- Budget: Phase 6 is 4,000,000 subagent tokens. The Orchestrator pauses at 80% for Steven's decision.
