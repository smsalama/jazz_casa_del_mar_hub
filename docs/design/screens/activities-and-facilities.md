# Screen: Activities and facilities

- Stories: US-5, US-26
- Requirements: FR-4, FR-28
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (same pattern as rooms.html)
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Show the five activity and facility areas.

## Layout

### 375 px

- Section scene; five item blocks stacked.

### 768 px

- Two columns.

### 1440 px

- Three columns, second row of two centred.

## Components

- Scene (section)
- Item block
- Closing panel

## Content

- Five items: spa, gym, tennis court, kids club and playground, entertainment; each name, description of at least 25 words, one image.

## States

- Loading: As rooms.
- Empty: As pools.
- Error: As rooms.
- Success: Not applicable.

## Interactions

- Pause motion control.

## Accessibility

- As pools.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
