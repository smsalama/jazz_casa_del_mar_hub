# Legal page layout (Privacy notice, Cookie notice, Terms, Accessibility statement)

- Stories: US-17, US-18, US-19, US-60
- Requirements: FR-14, FR-15, FR-16
- Prototype: not built separately; uses the heading band and text styles of `contact.html`

One layout for four screens. The content outline of each is in its own file (`privacy-notice.md`, `cookie-notice.md`, `terms.md`, `accessibility-statement.md`).

## Layout

- 375: heading band, a "Contents" disclosure (button, 44 px) listing the sections, then text in one column.
- 768: single column, 62ch measure, contents as a visible list at the top.
- 1440: contents list sticky at the left (3 columns), text at the right (7 columns).

## Components

Heading band, contents list (nav labelled "Contents"), long text (h2, h3, lists), tables (cookie table, retention table) in a labelled focusable scroll region on narrow screens, "Last updated" line, note at the top: "This text is placeholder wording for a concept site and has not been reviewed by a lawyer."

## States

Static content: no loading or empty state. Missing translations show English with `lang="en"`. The page is reachable from the footer on every page.

## Accessibility

One h1; sections have id anchors; focus moves to the section heading from the contents list; tables have captions and header cells.
