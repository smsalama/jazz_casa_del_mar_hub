# Screen: FAQ

- Stories: US-9
- Requirements: FR-9
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (accordion component in system.md)
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Answer common questions without leaving the page.

## Layout

### 375 px

- One column of accordion items, 44 px high question buttons.

### 768 px

- Same, 62ch measure.

### 1440 px

- Heading left, accordion right in a two column split.

## Components

- Accordion (button, panel)

## Content

- At least 8 questions in plain language (check in and out, children, getting there, accessibility, languages, contacting the resort); no times, numbers or prices in answers; answers say "ask the resort" where the concept has no facts.

## States

- Loading: Not applicable (content in HTML).
- Empty: Empty list: "No questions have been added yet." with link to Contact Us.
- Error: Not applicable.
- Success: Not applicable.

## Interactions

- Enter or Space toggles; expanded state shown by rotating chevron and aria-expanded; expand animates height with opacity only if motion is allowed. Without JavaScript all answers are visible.

## Accessibility

- Each button has aria-controls; the chevron rotation is accompanied by the state, not alone.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
