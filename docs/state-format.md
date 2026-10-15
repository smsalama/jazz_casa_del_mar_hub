# State file format

`state/project.json` is the project's single source of truth. The Orchestrator reads it at the start of every session and updates it at the end of every task. `scripts/validate-gates.mjs` checks its required fields on every verify run.

| Field | Meaning |
| --- | --- |
| `client`, `project` | Slugs used in repo names |
| `agency_version` | Agency release tag the project was started from |
| `created` | Start date, YYYY-MM-DD |
| `phase` | Current lifecycle phase, for example "6 Implementation" |
| `repos` | hub, web and api: name, URL, status |
| `touchpoints` | T1, T2, T3: status (pending, waiting, approved) and the approval file in `approvals/` |
| `budgets` | Token budget per phase for subagent work |
| `usage` | One entry per subagent run: `{ "date", "phase", "role", "task", "tokens" }` |
| `tasks` | `{ "id", "title", "role", "repo", "branch", "status", "depends_on", "evidence" }`; status is todo, doing, review, done or blocked |
| `decisions` | `{ "date", "decision", "by", "file" }` for decisions Steven made or ADRs |
| `open_questions` | `{ "id", "question", "for", "asked" }` |

`status.md` is the human-readable summary of the same state, in the Orchestrator's status report format.
