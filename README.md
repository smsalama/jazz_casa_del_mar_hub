# Project hub

This repo holds the project's records, not its code: brief, requirements, designs, architecture decisions, the API contract, the legal register, the threat model, gate records, evidence, approvals and release documents. The code lives in the sibling `-web` and `-api` repos.

| Folder | Holds |
| --- | --- |
| `state/` | `project.json`, the single source of truth for phase, tasks, budgets and usage |
| `docs/` | Brief, requirements, stories, backlog, designs, architecture, ADRs, registers, test plan, hosting questionnaire and guide, release documents |
| `contract/` | `openapi.yaml`, the API contract web and api are built against |
| `gates/` | One JSON record per quality gate (`_template.json` shows the format) |
| `evidence/` | Raw verify logs, screenshots and test outputs that gates cite |
| `approvals/` | Steven's approvals at T1, T2 and T3, quoted from chat |
| `scripts/` | setup, doctor, verify, validate-gates and package |

Run `bash scripts/setup.sh` once, then `bash scripts/verify.sh` at any time.
