# ADR-0011: Language in the URL path, shared English slugs, per request language negotiation, language scoped font loading

- Status: Proposed (for T2)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: FR-1, FR-10, FR-17, FR-24 to FR-26, FR-37, NFR-3, NFR-7, NFR-13, NFR-15, NFR-28, OQ-3, OQ-7, OQ-8, A-18; threat model TM-05

## Context

Four languages (en, de, it, ru), each with its own URL path (FR-24), English default; a request to the site root picks the first of en, de, it or ru from `Accept-Language`, without a cookie (FR-25, A-18). The language switcher must work without JavaScript (NFR-13). Missing translations show English with `lang="en"` (FR-26). All visible text comes from language resource files or the content store (NFR-28). Fonts must cover German, Italian and Cyrillic, but the Cyrillic file must not be requested on en, de or it pages (NFR-7), at most two families and 120 KB.

## Options considered

1. Language prefix with **shared English slugs** (`/de/rooms/family-suite`).
2. Language prefix with **translated slugs** (`/de/zimmer/familien-suite`).
3. Language by subdomain or query parameter.

## Decision

**Option 1.**

- Routes: `/{lang}/` plus the 20 other page paths of FR-1 (table in `docs/architecture.md` section 9). `lang` is validated against the fixed set `en`, `de`, `it`, `ru`; anything else is a 404. There is no other route parameter that becomes part of a redirect, so there is no open redirect (TM-05).
- Root: `GET /` returns `302` to `/{lang}/` chosen by parsing `Accept-Language` (quality values respected, first supported primary subtag wins, English otherwise), with `Vary: Accept-Language` and `Cache-Control: no-store`. No cookie (FR-25).
- Switcher: plain links to the same path in each language (`hreflang` and `lang` on each link; current language marked with `aria-current="true"`), so it works without JavaScript. Language names are in their own language and script (English, Deutsch, Italiano, Русский).
- `<html lang>` is the page language. A field falling back to English is wrapped with `lang="en"` by the rendering helper, never by hand (FR-26).
- **Resource files** `src/i18n/fixed/{lang}.json` hold only the fixed, non editable texts: the fixed concept sentence, the title suffix, and system strings that must exist before content loads (for example the 500 page fallback when the content store itself is unreadable). Everything else is editable content seeded in four languages (FR-35). A test checks that every language file has the same keys and no empty value (NFR-28, AC-45.4).
- Admin portal: English only (FR-32); its strings live in the admin application code as English text, which NFR-28 allows because the portal is not public. (If the Requirements Analyst reads NFR-28 as covering the admin portal, the strings move to an English resource file; no other change.)
- **Fonts**: self hosted WOFF2 files from Fontsource packages (SIL OFL-1.1), at most two families chosen by the UI/UX Designer, each split into `latin`, `latin-ext` and `cyrillic` subsets. The layout links a per language stylesheet: en, de and it pages declare only the `latin` and `latin-ext` faces; ru pages also declare the `cyrillic` faces. On en, de and it pages the switcher's "Русский" label is set in the system font stack, so no Cyrillic face is declared or requested there (NFR-7). `font-display: swap`, and the main text face is preloaded.
- **Sorting and search** in the admin portal: `Intl.Collator(lang)` for display sorting, normalised stored columns for search (ADR-0003).
- Long strings: the design is tested with every string 40 percent longer (NFR-28) by a pseudo-localised fixture in the end-to-end suite.
- Translations of seed content are machine assisted and marked unreviewed in the content register (OQ-8).

## Consequences

- One route table serves all languages; the switcher maps paths one to one, so "same page in the chosen language" (FR-24) is always available.
- English slugs in German, Italian and Russian URLs. Accepted for a noindex concept with no search engine goal; translated slugs would add a slug table per page and per language and more test cases for no visible benefit here.
- The cookie notice stays accurate: language needs no storage.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| Fontsource font packages (families chosen by the UI/UX Designer, for example `@fontsource-variable/inter`) | exact version pinned when chosen (for example 5.3.0) | SIL OFL-1.1 | Self hosted web fonts |
| `Intl` (ICU in Node.js and browsers) | runtime | Unicode licence (bundled with Node.js) | Collation and case folding |
