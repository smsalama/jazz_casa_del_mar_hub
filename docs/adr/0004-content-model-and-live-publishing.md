# ADR-0004: Schema driven content model, in-memory snapshot, and live publishing without rebuild

- Status: Proposed (for T2)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: FR-1 to FR-12, FR-17, FR-26, FR-35 to FR-40, FR-38 (US-81), NFR-6, NFR-10, NFR-28, NFR-33, OQ-4, OQ-6, OQ-7, OQ-20; threat model TM-30, TM-31, TM-33, TM-35, TM-37

## Context

Staff edit every piece of public text in four languages, the items of nine lists, six fixed room entries, images and global settings, within fixed page designs (FR-35, FR-36, FR-39, OQ-4). Rooms cannot be added or removed (OQ-20). Saved changes must be public within 60 seconds without a rebuild or restart (FR-38, AC-81.1 to AC-81.5), including shared values shown on many pages (an offer title on Offers and Home, the Book now URL on all 84 pages). Saves are all or nothing, and a second save of the same item based on stale data is refused (NFR-33). A missing translation falls back to English with `lang="en"` on the element (FR-26), and the portal shows completeness (FR-37).

## Options considered

1. **A headless CMS** (self hosted). Adds a second application, a second admin interface, its own database and its own security surface; most are larger than the site itself and need more than 1 GB.
2. **Hand written admin screens per page**, each with its own table. Maximum control, but 21 page types times four languages means a lot of repetitive code and many places to forget sanitising or a language.
3. **A typed content schema registry in code** that declares every editable entry (pages, global strings, rooms, list item types, settings) and its fields. The same registry drives validation on save, the admin editing forms, the completeness count and the public rendering.

## Decision

Option 3.

**Schema registry** (`src/lib/content/registry.ts`). Each entry or list item type is declared once with Zod 4.6.5, using a small set of field types:

| Field type | Stored value | Rules |
| --- | --- | --- |
| `text` | `{ en, de, it, ru }` plain strings | Length limit per field; Unicode category Cf rejected except soft hyphen (NFR-24, G-7); trimmed |
| `richText` | `{ en, de, it, ru }` rich text documents as JSON (ADR-0005) | Allow-list schema: paragraphs, bold, italic, links (`https:`, `http:`, `mailto:`, `tel:`), bulleted lists |
| `media` | media asset id | Must exist and have English alternative text (FR-40) |
| `textList` | ordered array of `text` values | For room features; add, remove, reorder |
| `url`, `phone`, `email` | plain string | Settings only, rules of FR-39 |

The fixed concept sentence and the title suffix are **not** in the registry: they live in the language resource files `src/i18n/fixed/{en,de,it,ru}.json` (FR-17, NFR-28), so no admin request can reach them.

**Storage** (ADR-0003): `content_entry` (one row per page, global group or room: `key`, `data` JSON, `version`, `updated_at`, `updated_by`), `list_item` (`list_key`, `id`, `position`, `data` JSON, `version`) and `settings` (one row, typed columns or JSON with `version`). `data` is validated against the registry on every write and on load. Seed content for all four languages ships in `seed/` and is loaded by `npm run seed` on a new install (FR-47).

**Saving**: every save sends the `version` it was based on. The server runs the registry validation, then one transaction that checks `version`, writes, increments `version` and bumps the global `content_revision` counter. A stale `version` returns HTTP 409 with the current values, so the editor can review the other change (NFR-33, TM-35). Each list also has a list order version (`ListSummary.version` in the contract), raised by 1 when an item is added, deleted or the list is reordered; `reorderList` must send it, so two simultaneous reorders cannot silently overwrite each other (data model D-7; the Database Engineer adds where it is stored). Deleting a list item needs a confirmation step in the portal and names the item (FR-36).

**Wording archive (data model D-2): proposed, pending Steven's decision at T2.** FR-20, FR-22 and NFR-14 require the version of the privacy information text and of the consent text to be stored with each enquiry and subscriber, but that text is editable content (FR-35), so a label alone proves nothing. Proposal: the registry marks those fields as `versioned`; a save that changes a versioned field also appends an immutable row to `legal_text_version` (kind, label, the four language texts, time, account) in the same transaction, and enquiries and subscribers reference its `label`. The label is also carried in the signed form token (ADR-0006) so the recorded version is the one on the page the visitor saw. No contract shape changes: `privacyTextVersion` and `consentVersion` stay strings.

**Live publishing**: the server keeps an immutable in-memory **content snapshot** (all entries, list items, settings and media metadata, a few megabytes) tagged with `content_revision`. After a successful save the same process rebuilds the snapshot at once and swaps the reference, so the next request renders the new content (well inside 60 seconds). Because server side commands such as restore could change the file from outside, the server also checks SQLite's `PRAGMA data_version` every 5 seconds and rebuilds when it changes. Pages are rendered on every request from the snapshot; there is no build step for content.

**HTTP caching for pages**: `Cache-Control: no-cache` with an `ETag` derived from the build id, `content_revision`, path and language, so browsers and swup revalidate every time and get `304 Not Modified` cheaply when nothing changed. Assets with fingerprinted names are cached for a year (NFR-35).

**Optional page cache** (only if the Performance Engineer's NFR-10 measurement needs it): rendered HTML may be cached in memory per path and `content_revision`, with every public form token written as a fixed placeholder that is replaced by a freshly signed token when the page is served (ADR-0006). There is no nonce in the CSP, so cached HTML stays valid.

**Rendering rules**: `.astro` templates escape every value by default. Rich text is rendered by a component that walks the allow-listed JSON and emits elements; there is no raw HTML insertion (`set:html` is banned by a lint rule except in one reviewed place, which has none in this design). A missing language value renders the English value with `lang="en"` (FR-26). The title suffix is appended by the layout, after the editable title (FR-17).

**Completeness** (FR-37): computed from the registry by walking every `text` and `richText` field and counting non-empty values per language; the portal lists missing fields per page and per language.

**List minimums** (FR-36): the registry declares each list's minimum count; the portal warns below it and never blocks a save.

## Consequences

- One place defines what is editable, so "edit everything" stays bounded by OQ-4 and cannot grow into a layout or 3D editor without a schema change and a review (RSK-4).
- The admin portal uses generic field editors driven by field descriptors returned by the API (`contract/openapi.yaml`, `ContentField`), so new fields need no new screens.
- Sanitising happens once, on save, for every language value; rendering still escapes (defence in depth, TM-30, TM-31).
- No draft, preview or history (US-36 Won't). The daily backup is the only way back from a bad save (ADR-0010, TM-33).
- The snapshot must stay small; media files are referenced, never held in memory.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| zod | 4.6.5 | MIT | Content registry, request validation, configuration parsing |
