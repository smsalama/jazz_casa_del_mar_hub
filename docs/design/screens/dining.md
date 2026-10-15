# Screen: Dining

- Stories: US-4, US-26
- Requirements: FR-3, FR-28
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (same pattern as rooms.html, not built separately)
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Present the ten venues, each reachable by anchor.

## Layout

### 375 px

- Section scene (Dining poster); a jump list of ten venue names (horizontal scroll avoided: wraps as buttons); venues stacked image over text.

### 768 px

- Venues in two columns of image and text.

### 1440 px

- Venues alternate image left and right in a two column band; jump list as a wrapped row of pills above.

## Components

- Scene (section)
- Jump list
- Venue block (image, h2, description)
- Book now block in closing panel

## Content

- Ten venues in order: Aqua Beach Restaurant, Oscar Restaurant, Italian Restaurant, Main Restaurant, French Cafe, Shisha Lounge, Lobby Bar, Lobby Lounge and Terrace, Twist Pool Bar, Splash Pool Bar. Each: name, description of at least 25 words, one image, anchor id in the URL (for example #oscar-restaurant).
- No opening hours, prices, dress codes or numbers.

## States

- Loading: Images reserve space.
- Empty: If a venue is removed in the admin the jump list and page update; below ten shows an admin warning only.
- Error: Anchor not found: the page opens at the top.
- Success: Not applicable.

## Interactions

- Jump list links scroll to the venue; focus moves to the venue heading (tabindex minus 1) so keyboard users land in the right place; scroll uses scroll-margin below the sticky header.

## Accessibility

- Jump list is a nav with a label "Venues on this page"; each venue is a section with its own h2.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
