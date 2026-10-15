# Screen: Location

- Stories: US-6, US-26
- Requirements: FR-6, FR-12, FR-28
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: img/map-placeholder.svg
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Show where the resort is and what is near it without loading a third party map.

## Layout

### 375 px

- Section scene; static map image (3:2); "Open in Google Maps" link button; nearby list stacked.

### 768 px

- Map left, list right.

### 1440 px

- Map 6 columns, list 6 columns, five attractions as text blocks.

## Components

- Scene (section)
- Static map image with alt text
- External link button with external icon and hidden text "opens in a new tab"
- Nearby list

## Content

- Placeholder map drawing (coast, a marker arch, no real tiles). Link label "Open in Google Maps" uses the URL from settings.
- At least 5 nearby attractions, each with name and description of at least 15 words, no distances or travel times.

## States

- Loading: Map image reserves its aspect ratio.
- Empty: Maps URL empty in settings: the link is not shown (FR-39).
- Error: Image fails: alt text describes the area in words.
- Success: Not applicable.

## Interactions

- Map link opens in a new tab, labelled; no map is draggable (static).

## Accessibility

- Alt text for the map gives a text summary of the coast and resort position, so no information is image only.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
