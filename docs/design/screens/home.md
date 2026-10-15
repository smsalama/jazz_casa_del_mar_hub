# Screen: Home

- Stories: US-2, US-1, US-20, US-25, US-27, US-28
- Requirements: FR-5, FR-10, FR-11, FR-17, FR-27, FR-29, FR-30
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: index.html, index.de.html, index.it.html, index.ru.html
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

First impression. Shows the 3D hero, a short overview, qualitative key facts, the offers summary and links to every section.

## Layout

### 375 px

- Hero poster fills the first screen below the header, portrait poster (800 by 1200), text block in the lower 52 percent on the Abyss scrim, scene controls at the top right of the poster.
- Order: heading (46 px Prata), lead (17 px), Book now block, Contact us button.
- Overview: arch image above text, one column. Facts: one column of six fact cards. Offers: one column of three cards. Explore tiles: two columns. Footer stacked.

### 768 px

- Hero landscape poster below 960 px uses the portrait poster crop; text left, max 30rem for the lead; controls top right.
- Overview: text and arch image side by side from 640 px. Facts two columns. Offers three columns. Explore tiles three columns.

### 1440 px

- Hero is a 16:10 landscape poster, left to right scrim, heading at most 9 characters wide ("Jazz Casa" / "del Mar"), lead 30rem, controls bottom right.
- Overview split: text 7 columns, arch image 5 columns. Facts three columns by two rows. Offers three columns. Explore tiles three by two. Footer four columns.

## Components

- Concept notice
- Header
- Scene (hero)
- Scene controls
- Book now block
- Buttons (primary, secondary, sun)
- Arch media
- Fact
- Card (offer) with Sample offer badge
- Tile
- Scallop edge
- Newsletter form
- Footer

## Content

- Heading: resort name as typeset text (h1). Lead: "A beach resort on the Red Sea in Hurghada, made for slow mornings, warm water and long dinners by the sea."
- Overview h2 "A resort that opens onto the sea" and two short paragraphs.
- Facts h2 "The resort at a glance": private beach, infinity pool, sea view rooms, kids club and playground, spa and gym, restaurants and bars by the water (qualitative only).
- Offers h2 "Current offers": titles Family stay, Slow season escape, Couples retreat, each with the badge "Sample offer"; link "See all offers".
- Explore h2 "Explore the resort": six tiles (Rooms and suites, Dining, Pools and beach, Activities and facilities, Location, Gallery).
- All copy in the four languages; German, Italian and Russian are machine assisted and marked unreviewed in the admin (OQ-8).

## States

- Loading: Poster shows at once (no layout shift); optional loader (loader-transition.md) if the page is not ready in 300 ms; 3D swaps in over the poster after content.
- Empty: Offers summary reads from the Offers list; if the list is empty the section shows "Offers will appear here." and no cards. Facts and tiles are fixed.
- Error: No 3D: poster stays, pause and tilt controls are hidden (nothing to control). Missing translation: English text with lang="en" on that element. Page error: error-pages.md.
- Success: Not applicable (no form). Footer newsletter has its own states (newsletter-signup.md).

## Interactions

- Pause motion toggles page wide motion (FR-30). Turn on tilt asks for motion permission on iOS only after a tap (AC-25.5). Mouse move and finger drag change the scene view (AC-25.2).
- Language list switches to the same page in another language.
- Cards and tiles respond on press (scale 0.97, 90 ms); the whole card is the link.

## Accessibility

- Hero heading, lead and buttons are real text above the canvas, not painted into it (AC-25.3). Canvas is aria-hidden; the poster alt is empty because the heading carries the meaning.
- Scrim keeps text at 8 to 1 or better on the worst frame (system.md 4.2).
- Reading order: skip link, concept notice, header, h1, lead, Book now, Contact us, scene controls, overview.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
