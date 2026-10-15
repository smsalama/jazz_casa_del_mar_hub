# Approvals

One file per approval, written only when Steven approves in chat, quoting his message verbatim:

- `T1-scope.md`
- `T2-design.md`
- `T3-release-<version>.md`

Format:

```
Approved by: Steven (in chat)
Date: YYYY-MM-DD
Quote:
> his exact words
Scope of approval: one line
```

`scripts/package.sh` refuses to build a release without `T3-release-<version>.md` in this format.
