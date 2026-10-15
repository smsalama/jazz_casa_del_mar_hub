# Screen: Admin dashboard

- Stories: US-30, US-35, US-40
- Requirements: FR-32, FR-37
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: admin-dashboard.html
- Admin shell and rules: `admin-shell.md`

## Purpose

Overview after sign in: last sign in, unread enquiries, translations needing attention, shortcuts.

## Layout

### 375 px

- Top bar, menu button for the sidebar (nav at the top as a disclosure), stat cards stacked, latest enquiries as a scrollable table.

### 768 px

- Stat cards in two columns.

### 1440 px

- Fixed sidebar 240 px, stat cards in three columns, table below.

## Components

- Admin shell
- Stat card
- Data table
- Chips
- Alerts

## Content

- Welcome line with last sign in time and failed attempts since.
- Cards: Unread enquiries, Missing translations (count with chip), Subscribers.
- Latest enquiries table: reference, name, subject, received, status chip.

## States

- Loading: Skeleton lines in cards and table.
- Empty: "No enquiries yet." with a dashed panel.
- Error: "We could not load this. Try again." with a Retry button.
- Success: Not applicable.

## Interactions

- Cards are links to the matching screens; table rows link to the enquiry.

## Accessibility

- Region for the table is focusable with a label; unread rows marked by a bar and bold subject plus the word Unread in the chip.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
