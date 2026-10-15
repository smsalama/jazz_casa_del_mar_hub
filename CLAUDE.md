# Rules for this hub repo

- This is a project hub created by the SSS agency. Use the `agency:orchestrate` skill to work on it.
- Never write an em-dash or an en-dash in any file or commit message. Use commas, colons, parentheses or full stops; write ranges with "to". The git hooks and `scripts/verify.sh` reject both.
- `state/project.json` is the source of truth. Update it and `status.md` at the end of every task.
- Never edit files in `evidence/`; they are raw outputs. Never write files in `approvals/` except to record Steven's own approval from chat, quoted verbatim.
- No client secrets, passwords or personal data in this repo. Synthetic data only.
- Never use `git commit --no-verify`, force push, or rewrite pushed history.
