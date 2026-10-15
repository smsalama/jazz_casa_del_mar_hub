# Screen: Admin enquiries (list and detail)

- Stories: US-40
- Requirements: FR-20, FR-42
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (table pattern of admin-dashboard.html)
- Admin shell and rules: `admin-shell.md`

## Purpose

Read enquiries sent through the contact form.

## Layout

### 375 px

- List cards: reference, name, subject, time, status chip; tap opens detail as its own page.

### 768 px

- Table.

### 1440 px

- Table with filters (All, Unread, Handled, Data protection) above; detail opens as a page with back link.

## Components

- Data table
- Chips (Unread, Handled, Acknowledge by date for data protection subject)
- Button "Mark as handled"
- Delete dialog

## Content

- Detail: reference, name, email (mailto link), telephone, subject, message in a readable block, language, time received, privacy notice version.
- For "Data protection request or complaint" a chip shows the date by which to acknowledge; text only, no automation.

## States

- Loading: Skeleton rows.
- Empty: "No enquiries yet."
- Error: Load error with Retry.
- Success: "Marked as handled."

## Interactions

- Opening an enquiry marks it read; "Mark as unread" is available.

## Accessibility

- Unread shown by bar, bold subject and chip word.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
