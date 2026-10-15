# Screen: Accessibility statement

- Stories: US-19, US-47 to US-51
- Requirements: FR-16
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (legal page layout)
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

State the accessibility goal, status, known limits and how to report a problem.

## Layout

Shared legal page layout, see `legal-pages.md`. 375: single column, 16 px gutter, table of contents as a disclosure at the top. 768: single column, 62ch measure. 1440: contents list sticky at the left (3 columns), text at the right (7 columns).

## Components

Heading band, contents list, long text (h2 and h3, lists, tables where needed), last updated line, frame.

## Content outline

- Our goal: WCAG 2.2 level AA
- Status: tested with automated and manual checks; any known gaps listed plainly (machine assisted translations unreviewed, 3D scenes have a poster alternative)
- How to use the site: keyboard, pause motion, reduced motion, text size
- Report a problem: link to Contact Us
- Date of this statement

All legal text is placeholder wording pending the solicitor's answers (legal-register.md) and is marked as such at the top of the page.

## States

- Loading: static text, no loading state.
- Empty: not possible; the text is fixed content per language (editable in the admin).
- Error: missing translation shows English with lang="en".
- Success: not applicable.

## Interactions

Contents links scroll to sections and move focus to the section heading. Tables scroll inside a focusable labelled region on narrow screens.

## Accessibility

One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom. Tables use captions and th scope; no text is in images.
