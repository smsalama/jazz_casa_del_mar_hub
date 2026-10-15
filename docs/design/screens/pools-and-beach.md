# Screen: Pools and beach

- Stories: US-5, US-26
- Requirements: FR-4, FR-28
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (same pattern as rooms.html)
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Show the four water areas.

## Layout

### 375 px

- Section scene; four item blocks stacked.

### 768 px

- Two columns.

### 1440 px

- Two by two grid of large arch images with text beneath.

## Components

- Scene (section)
- Item block (arch image, h2, text)
- Closing panel

## Content

- Four items: infinity pool, relaxing pool, kids pool, private beach, each a name, description of at least 25 words and one image. No sizes, depths, hours or numbers.

## States

- Loading: As rooms.
- Empty: List below four: layout fills what exists.
- Error: As rooms.
- Success: Not applicable.

## Interactions

- Pause motion control; items are not interactive.

## Accessibility

- Each item is an article with an h2.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
