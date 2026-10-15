# Six 3D scenes: layout space, poster area, reading order

- Stories: US-25, US-26, US-28, US-29, US-53, US-57
- Requirements: FR-27, FR-28, FR-30, FR-31, NFR-11, NFR-12
- Prototype: Home hero in `index.html` (and the de, it, ru variants); section scene in `rooms.html`; posters in `design/prototype/img/poster-*.svg`

This file designs the space around each scene. The motion designer specifies the motion later (`docs/design/motion-spec.md`); the notes here are intent only. All six scenes are original assets made by the agency (FR-31); the posters here are SVG illustrations drawn for this concept.

## Common structure

```
.scene
  picture (poster: landscape, portrait source below 960 px)   always present, same box as the canvas
  canvas (aria-hidden, replaces nothing, sits above poster once first frame renders)
  scrim (CSS gradient of Abyss, above canvas, below text)
  content (h1, lead, buttons, Book now block)               real page elements
  controls (Pause motion, Turn on tilt)                      real buttons, own dark backing
```

Rules for every scene:

- The poster and the canvas occupy the same box with explicit width and height, so swapping poster for 3D causes no layout shift (AC-25.4).
- Text never sits on the scene itself. A scrim of Abyss lies above the canvas (system.md 4.2): at least 0.84 opacity under text blocks, so text stays at 6.8 to 1 or better on the brightest frame of any scene (AC-49.2).
- The canvas is `aria-hidden` and not focusable; no information exists only in the scene (NFR-12). A scene never captures scroll on touch devices (vertical swipes scroll the page).
- Poster budget: Home poster at most 150 KB; every other poster at most 250 KB (AC-57.4). The prototype SVGs are under 20 KB each.
- Pause motion freezes the scene at its current frame and the choice is kept for the tab session (FR-30). Reduced motion starts the scene paused on its poster frame.
- Controls sit in a corner outside the text block, with a dark backing at 0.80 opacity, 44 px high.

## Scene 1: Home hero

| Item | Design |
| --- | --- |
| Page | Home, the first section |
| Box | full width, minimum height clamp(36rem, 88svh, 54rem) (576 px to 864 px; about 704 px at 800 px viewport height); below 960 px the portrait poster (800 by 1200) is used, from 960 px the landscape poster (1600 by 1000), both cropped by `cover` |
| Text space | 375 and 768: bottom 52 percent of the box. 1440: left 44 percent, vertically centred; heading at most 9 characters per line, lead at most 30rem |
| Free scene space | 375 and 768: upper 48 percent (sun and arches). 1440: right 56 percent (sun, arches, water) |
| Controls | 375 and 768: top right. 1440: bottom right |
| Poster | `poster-home.svg` (landscape), `poster-home-portrait.svg` (below 960 px): dusk lagoon, low sun, three arches on the horizon, calm water lines |
| Reading order | h1 (resort name), lead, Book now block, Contact us button, Pause motion, Turn on tilt |
| Motion intent | Slow water surface, sun glow, gentle camera drift following pointer or tilt. Nothing flashes. |

## Scene 2: Rooms and suites

| Item | Design |
| --- | --- |
| Page | Rooms and suites overview |
| Box | full width, minimum height clamp(22rem, 56svh, 36rem) (352 px to 576 px) |
| Text space | Left 60 percent at 1440 and 768; bottom 55 percent at 375 (h1 and one sentence only) |
| Free scene space | Right 40 percent (arched balcony openings, light on water) |
| Controls | Top right at 375, bottom right otherwise |
| Poster | `poster-rooms.svg`, crop class `pos-right` at 375 |
| Reading order | Breadcrumb not used, h1 "Rooms and suites", lead, Pause motion; cards follow |
| Motion intent | Light moving across arched openings, curtains of water reflection. |

## Scene 3: Dining

| Item | Design |
| --- | --- |
| Page | Dining |
| Box | As Rooms |
| Text space | Left 60 percent (375: bottom 55 percent) |
| Free scene space | Right 40 percent: tables on a terrace at dusk, lantern shapes |
| Poster | `poster-dining.svg` |
| Reading order | h1 "Dining", lead, jump list follows after the scene, Pause motion |
| Motion intent | Lantern glow, soft shimmer on the water behind the terrace. |

## Scene 4: Pools and beach

| Item | Design |
| --- | --- |
| Page | Pools and beach |
| Box | As Rooms |
| Text space | Left 60 percent (375: bottom 55 percent) |
| Free scene space | Right 40 percent: pool edge meeting the sea, loungers as simple shapes |
| Poster | `poster-pools.svg` |
| Reading order | h1 "Pools and beach", lead, Pause motion |
| Motion intent | Water caustics on the pool floor, small waves on the beach. |

## Scene 5: Activities and facilities

| Item | Design |
| --- | --- |
| Page | Activities and facilities |
| Box | As Rooms |
| Text space | Left 60 percent (375: bottom 55 percent) |
| Free scene space | Right 40 percent: abstract court lines, a sail, a balloon shape (no people) |
| Poster | `poster-activities.svg` |
| Reading order | h1 "Activities and facilities", lead, Pause motion |
| Motion intent | Light wind movement in the sail and flags; slow parallax between layers. |

## Scene 6: Location

| Item | Design |
| --- | --- |
| Page | Location |
| Box | As Rooms |
| Text space | Left 60 percent (375: bottom 55 percent) |
| Free scene space | Right 40 percent: coastline from above, a marker arch |
| Poster | `poster-location.svg` |
| Reading order | h1 "Location", lead, Pause motion; static map follows below |
| Motion intent | Slow drift over the coast; marker arch pulses once, then rests. |

## Fallback and control states

| State | What shows |
| --- | --- |
| Before first frame | Poster, same box, controls hidden until the scene is running |
| 3D running | Canvas above poster; Pause motion and (iOS only) Turn on tilt |
| Paused | Frozen frame; control reads "Resume motion" (`aria-pressed="true"`) |
| Reduced motion | Poster only, no canvas; control not shown because there is no autonomous motion |
| No WebGL, context lost, Save-Data, slow network | Poster only; page text and functions identical (AC-57.3) |
| No JavaScript | Poster only; controls not shown |
| Scene error after load | Canvas removed, poster shown again, no message needed |

Details of each non 3D state are in `motion-and-fallbacks.md`.
