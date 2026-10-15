# Screen: Privacy notice

- Stories: US-17
- Requirements: FR-14
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (legal page layout, see legal-pages.md)
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Explain who is responsible for personal data, what is collected, why, how long it is kept and the visitor rights.

## Layout

Shared legal page layout, see `legal-pages.md`. 375: single column, 16 px gutter, table of contents as a disclosure at the top. 768: single column, 62ch measure. 1440: contents list sticky at the left (3 columns), text at the right (7 columns).

## Components

Heading band, contents list, long text (h2 and h3, lists, tables where needed), last updated line, frame.

## Content outline

- Who is responsible (clearly marked placeholder controller, Q3 pending)
- What data we collect and why: contact form, newsletter, admin accounts, server logs
- Lawful basis per purpose (placeholder pending the solicitor)
- Who receives data and where it is processed
- How long each kind of data is kept (retention table)
- Your rights and how to use them (link to Contact Us, subject Data protection request or complaint)
- Complaints to the supervisory authority (placeholder)
- Version and date of this notice (version recorded with each enquiry and sign up)

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
