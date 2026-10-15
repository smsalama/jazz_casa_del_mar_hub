# ADR-0010: Daily backup archive, safe restore, retention purge and an in-process scheduler

- Status: Proposed (for T2)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: FR-45, FR-48 (US-46, Must), NFR-17, NFR-18, NFR-32, NFR-33, NFR-34; Retention schedule; G-3, G-15; threat model TM-33, TM-58, TM-59, TM-64; RSK-15, RSK-29, RSK-33, RSK-34

## Context

There is no paid backup service (NFR-31) and no version history (US-36 Won't), so the daily backup is the only way back from defacement, mass deletion or a lost disk (G-3). FR-48 requires one archive file with all site data, written automatically every 24 hours (configurable, on by default), kept 35 days (NFR-17), outside served folders with owner only permissions, excluding sessions and rate limit counters, optionally encrypted with a passphrase from configuration, marked as containing personal data, and a restore command into an empty install that refuses absolute paths, `..` segments and links (G-15). FR-45 requires a purge at least every 24 hours for every category in the Retention schedule, recorded with counts (NFR-34). The 1 CPU server has no cron guarantee (the hosting questionnaire is not filled in).

## Options considered

- Scheduling: (a) operating system cron or systemd timers documented in the hosting guide; (b) **an in-process scheduler** in the site server, plus the same jobs as commands.
- Archive format: (a) system `tar` (BSD tar on macOS and GNU tar on Linux differ in flags); (b) the `tar` npm package (BlueOak-1.0.0 licence, not on the allow-list); (c) **`tar-stream` (MIT)**, a low-level reader and writer where the project validates every entry itself; (d) zip libraries.
- Database copy: (a) copy the file (unsafe while writing); (b) `VACUUM INTO`; (c) **the SQLite online backup API through better-sqlite3**.

## Decision

**Scheduler: option b.** On start and then every 10 minutes the server checks `job_run` (last successful run per job). If a job is due (`now - last >= interval`), it runs it. Defaults: purge every 24 hours, backup every 24 hours (`BACKUP_ENABLED=true`, `BACKUP_INTERVAL_HOURS=24`). Because the check uses the stored time of the last run, a server that was stopped catches up at the next start, and a test that advances the injected clock by 25 hours sees a new archive (AC-46.4). The clock is injected through one `Clock` interface; tests replace it, production uses the system clock. Every job is also a command: `npm run purge`, `npm run backup`, `npm run restore -- <archive>`.

**Purge job** (FR-45): one transaction per category, each a parameterised delete or anonymise with the configured period: enquiries older than 12 months; data subject request records 24 months after closure (table exists for FR-44 later); unsubscribed readable addresses after 30 days (address removed, suppression HMAC kept); suppression entries after 36 months; personal data of deleted accounts after 30 days; security events after 12 months; rate limit counters and used form tokens after 24 hours; expired sessions; originals of deleted photos after 30 days (file removed, then row). Each run writes one `security_event` with the count per category (NFR-34). A failure is written as a failed run and retried at the next check, and the portal's main screen shows "purge last succeeded on ..." so a silent failure is visible (TM-64).

**Backup job** (FR-48):

1. Copy the database with the online backup API (`db.backup()`) to a temporary file in `BACKUP_DIR` (consistent while the site runs).
2. Open the copy and delete `session`, `rate_limit` and `used_form_token` rows, then `VACUUM` (G-15).
3. Write a gzip compressed tar with `tar-stream`: `manifest.json` (format version, app version, schema version, created time, file list with sizes and SHA-256), `site.db`, `media/originals/*`, `media/public/*`. Configuration and signing keys are **not** included: a restore on a new install generates new keys (sessions and form tokens are short-lived anyway).
4. If `BACKUP_PASSPHRASE` is set, encrypt the stream with AES-256-GCM in 64 KB chunks (each chunk authenticated, chunk index in the nonce, final chunk flagged to stop truncation), key derived with scrypt (N 2^17, r 8, p 1) and a random salt in the file header.
5. Name: `jcdm-backup-<UTC yyyymmddThhmmssZ>-CONTAINS-PERSONAL-DATA.tar.gz` (plus `.enc` when encrypted), mode 0600 in `BACKUP_DIR` (default `./backups`, mode 0700, outside every served folder and outside `DATA_DIR`). The command prints that the file holds personal data and that data purged from the live site remains in archives until they expire (NFR-17).
6. Delete archives created by the command (matched by the name pattern) that are older than `BACKUP_RETENTION_DAYS` (35).

The server writes a backup before applying any database migration at start (ADR-0003).

**Restore command** (FR-48, G-15): `npm run restore -- <archive>` with the server stopped.

1. Refuses unless the target install is empty (no accounts, no enquiries, no subscribers, no media; content equal to seed or absent).
2. Decrypts if needed (asks for the passphrase or reads `BACKUP_PASSPHRASE`); an authentication failure stops everything.
3. Reads every tar entry and refuses the whole archive, changing nothing, if any entry: is not a regular file or directory (symbolic links, hard links, devices refused); has an absolute path, a `..` segment, a backslash or a NUL; is outside the allowed names (`manifest.json`, `site.db`, `media/originals/<fileKey>.<ext>`, `media/public/<fileKey>-<rev>-<width>.<ext>`); exceeds the size in the manifest; or fails its SHA-256.
4. Extracts into a new temporary folder inside `DATA_DIR`, runs the database integrity check (`PRAGMA integrity_check`) and pending migrations on the copy, then swaps folders with atomic renames.
5. Prints a summary (counts of pages, media, enquiries, subscribers, accounts). Restored accounts can sign in; everyone must sign in again.

## Consequences

- Archives are on the same server by default; the hosting guide tells the operator to copy them elsewhere and protect them (RSK-15). This is outside the site's control.
- Disk use on a 10 GB disk: every archive is full (one archive restores everything, AC-46.2), so 35 daily archives need about 36 times the data size. With the placeholder content (expected well under 200 MB of media) this fits. With the 2 GB media cap of NFR-23 fully used it would need about 72 GB. The backup job therefore checks free space first and, when less than twice the expected archive size is free, skips the run, writes a failed `job_run` and a security event, and shows a warning on the portal's main screen. Before hosting, either the disk grows, the media cap is lowered, or the archive retention is shortened (a configuration value). This is a trade-off for Steven at T2 (`docs/architecture.md` section 17). Incremental archives were rejected because FR-48 asks for a single archive that restores everything.
- Restore is a server side command only; there is no restore button in the portal, which keeps archive parsing away from web requests (TM-59).
- Keys are not in backups, so a stolen archive cannot forge sessions or tokens; the suppression HMAC key is a deliberate exception and **is** stored inside the database settings so that suppression entries stay usable after a restore (it protects addresses only against casual reading, as the Retention schedule intends).

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| tar-stream | 3.2.1 | MIT | Archive writing and validated reading |
| better-sqlite3 online backup API | 13.0.3 | MIT | Consistent database copy |
| Node.js `zlib`, `crypto` | runtime | MIT | gzip, AES-256-GCM, scrypt, SHA-256 |
