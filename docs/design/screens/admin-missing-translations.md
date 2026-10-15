# Screen: Missing translations

- Stories: US-35
- Requirements: FR-37
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (table pattern of admin-dashboard.html)
- Admin shell and rules: `admin-shell.md`

## Purpose

One list of every field missing in any language, filterable by language.

## Layout

### 375 px

- Language filter as a segmented control (All, EN, DE, IT, RU) wrapping to two rows; list of cards: page, field, missing languages, "Edit" link.

### 768 px

- Table with columns.

### 1440 px

- Table with page, field, languages missing as chips, Edit link.

## Components

- Segmented filter
- Data table
- Chips
- Empty panel

## Content

- Summary line "9 fields are missing text in at least one language." Link "Edit" goes to the field in the page editor (anchor).

## States

- Loading: Skeleton rows.
- Empty: "Nothing is missing. Every field has text in all four languages." (success tone).
- Error: Load error with Retry.
- Success: Not applicable.

## Interactions

- Filter changes the list without a page reload when JavaScript runs; works with query strings without it.

## Accessibility

- Filter is a radio group; count announced in a polite status after filtering.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
