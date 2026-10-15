# Screen: Rooms and suites overview

- Stories: US-3, US-26, US-10
- Requirements: FR-2, FR-28, FR-11
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: rooms.html
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Compare the six room types and reach each room page. Section scene sets the mood.

## Layout

### 375 px

- Section scene (poster 4:5 crop of the Rooms poster) with h1 and lead inside the scrim, controls top right; then one column of six room cards.

### 768 px

- Section scene landscape; cards in two columns.

### 1440 px

- Section scene 16:6 band, text left on the scrim; cards in three columns by two rows.

## Components

- Scene (section)
- Scene controls
- Card (room, arch image, name, short text, "View room")
- Breadcrumb not used (top level)
- Book now block in a closing panel

## Content

- h1 "Rooms and suites". Lead: one sentence about views of the sea and the pools.
- Six cards in the order: Family Suite, Executive Suite, Superior Twin Sea View, Superior Queen Sea View, Triple Deluxe Twin (pool view), Triple Deluxe Queen (pool view). Each: one image, short description, link to the room page.
- Closing panel "Plan your stay" with Book now block and Contact link.

## States

- Loading: Poster and card images have fixed aspect ratios, so nothing jumps.
- Empty: Always six cards (rooms are fixed, OQ-20). If a card text is missing the English text shows.
- Error: Image fails: the tile keeps its placeholder colour and alt text.
- Success: Not applicable.

## Interactions

- Card press scales 0.97; card hover lifts 4 px on the calm spring; whole card is the link (title is the accessible name).
- Pause motion control in the scene.

## Accessibility

- Cards are a list; each card has one link; "View room" is visual text inside the same link.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
