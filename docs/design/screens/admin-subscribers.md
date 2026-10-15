# Screen: Admin subscribers and export

- Stories: US-41
- Requirements: FR-43
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (table pattern)
- Admin shell and rules: `admin-shell.md`

## Purpose

See subscribers and export the active list.

## Layout

### 375 px

- Summary card (active count), Export button, list cards.

### 768 px

- Table.

### 1440 px

- Table with status filter, export button top right.

## Components

- Data table
- Button "Export active subscribers (CSV)"
- Chips (Active, Unsubscribed)
- Status alert

## Content

- Columns: email, language, signed up, consent wording version, status.
- Export contains active subscribers only by default; a checkbox "Include unsubscribed" is unticked by default.

## States

- Loading: Skeleton rows; export button disabled.
- Empty: "No subscribers yet." export disabled with a text reason.
- Error: "The export could not be created. Try again."
- Success: "Export ready. Your download should start." with a fallback link.

## Interactions

- Download is a normal link to a generated file.

## Accessibility

- Disabled export button keeps its reason in text beside it.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
