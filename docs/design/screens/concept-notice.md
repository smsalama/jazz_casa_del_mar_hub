# Screen: Concept notice

- Stories: US-20, US-21
- Requirements: FR-17, FR-18
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: every prototype page (first element after the skip link)
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Make clear on every page that this is an unofficial concept.

## Layout

### 375 px

- Full width strip, Driftwood background, 13 px text, 43 px tall (limit 48 px, AC-20.3), info icon at the left, text wraps to two lines at most.

### 768 px

- One line, 14 px, 34 px tall.

### 1440 px

- One line, centred text, 14 px.

## Components

- Concept notice strip (static, in flow, role region label "Concept notice")

## Content

- Fixed sentence, English: "Unofficial design concept. Not affiliated with or endorsed by JAZ Hotels."
- German: "Inoffizielles Designkonzept. Nicht mit JAZ Hotels verbunden und nicht von JAZ Hotels unterstützt."
- Italian: "Concept di design non ufficiale. Non affiliato né approvato da JAZ Hotels."
- Russian: "Неофициальная дизайн-концепция. Не связана с JAZ Hotels и не одобрена ими."
- Optional extra sentence from settings (up to 200 characters) appears after the fixed one if set. Title suffix on every page: " | Concept", " | Konzept", " | Concept", " | Концепт".
- The sentence repeats in the footer.

## States

- Loading: Present in the server HTML, so it is visible before any script runs.
- Empty: The optional sentence empty: only the fixed sentence shows.
- Error: Also shown on 404 and 500 pages and form result pages and every admin screen.
- Success: Not applicable.

## Interactions

- None. No close button, no dismiss, no focusable child; it does not float or overlap content (a static strip, not fixed), so it can never hide other content at 200 percent zoom.

## Accessibility

- Contrast 10.7 to 1. Because the notice is a banner and not body text, 13 px at 375 px is a deliberate exception to the 16 px body rule (flag for QA, system.md 4.3).
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
