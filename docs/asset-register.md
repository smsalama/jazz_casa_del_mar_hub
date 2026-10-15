# Asset register: Jazz Casa del Mar concept (design phase)

Every font, image and icon used in `design/prototype/`, with source, licence and date. Updated by P4-T1 (UI/UX Designer), 2026-10-15. 3D models and textures are not yet made; the 3D author adds them under "3D assets" (FR-31).

No JAZ logo, wordmark artwork, badge, photograph or text was copied. No third party image was used. No asset is loaded from outside the site's own files (no CDN, no hotlinking).

## Fonts (self hosted WOFF2)

| Asset | Files | Source | Licence | Date added | Notes |
| --- | --- | --- | --- | --- | --- |
| Prata, Latin subset, weight 400 | `fonts/prata-latin-400-normal.woff2` (19,224 bytes) | npm package `@fontsource/prata` 5.3.0, upstream Prata by Cyreal (The Prata Project Authors) | SIL Open Font License 1.1 (`fonts/OFL-Prata.txt`) | 2026-10-15 | Display font; open licence allows self hosting and embedding |
| Prata, Cyrillic subset, weight 400 | `fonts/prata-cyrillic-400-normal.woff2` (13,132 bytes) | same package | SIL OFL 1.1 | 2026-10-15 | Loaded only on Russian pages (unicode-range) |
| Manrope variable, Latin subset | `fonts/manrope-latin-wght-normal.woff2` (24,836 bytes) | npm package `@fontsource-variable/manrope` 5.3.0, upstream Manrope by Mikhail Sharanda (The Manrope Project Authors) | SIL OFL 1.1 (`fonts/OFL-Manrope.txt`) | 2026-10-15 | Text font, weights 200 to 800 |
| Manrope variable, Cyrillic subset | `fonts/manrope-cyrillic-wght-normal.woff2` (14,500 bytes) | same package | SIL OFL 1.1 | 2026-10-15 | Loaded only on Russian pages |

The licence text of each font is kept beside the font files and must ship with the site (OFL condition). Fonts are not sold on their own and are not renamed.

## Images (original SVG illustrations drawn for this concept)

Made by P4-T1 from geometric shapes and gradients using a script kept outside the repository. They depict no real place, building, person or brand. Licence for all: original work for this project, no third party rights; the agency owns them and may release them with the concept. Date: 2026-10-15.

| Asset | File | Use |
| --- | --- | --- |
| Home hero poster, landscape | `img/poster-home.svg` | Home hero below the scrim, 1600 by 1000 |
| Home hero poster, portrait | `img/poster-home-portrait.svg` | Home hero below 960 px, 800 by 1200 |
| Rooms scene poster | `img/poster-rooms.svg` | Rooms overview scene |
| Dining scene poster | `img/poster-dining.svg` | Dining scene |
| Pools and beach scene poster | `img/poster-pools.svg` | Pools and beach scene |
| Activities scene poster | `img/poster-activities.svg` | Activities and facilities scene |
| Location scene poster | `img/poster-location.svg` | Location scene |
| Map placeholder | `img/map-placeholder.svg` | Location page static map (no real map data) |
| Placeholder tiles 01 to 12 | `img/ph-01.svg` to `img/ph-12.svg` | Room cards, offer cards, gallery, explore tiles, room photos |

Real photographs, when added later through the admin media library, need their own rows here with source and licence (and for any person, a release; FR-18).

## Icons (drawn inline as SVG paths)

All icons in the sprite `<symbol>` block of each prototype page were drawn by P4-T1 as simple strokes and shapes (24 by 24 grid, 1.75 stroke, round caps). No icon set was copied or traced. Licence: original work for this project. Date: 2026-10-15.

Names: alert, arrow-left, arrow-right, bed, bold, chat, check, check-circle, chevron, clock, close, dining, down, download, dumbbell, edit, external, eye, file, globe, home, image, inbox, info, italic, key, kids, leaf, link, list, lock, logout, mail, mark (the arch glyph beside the name), menu, music, pause, phone, pin, play, plus, pool, racket, search, shield, sliders, sun, tag, tilt, translate, trash, up, upload, user, users, wave, x-circle.

## Brand items

| Item | Status |
| --- | --- |
| Resort name "Jazz Casa del Mar" | Typeset text in Prata; no logo artwork |
| Arch glyph | Original, drawn for this concept; not the JAZ mark |
| JAZ logo, JAZ go green badge, Green Star, Tripadvisor Travelers' Choice | Not used (FR-18, OQ-17) |
| Brand colour `#453536` | Read from the `theme-color` of the current resort page (a colour value is not protected artwork) |

## 3D assets

None yet. Rule (FR-31, AC-29.4): every model, texture, HDR environment and material is original or generated and listed here with source, licence and date before release.

## Tools

Playwright with a bundled Chromium and axe-core were used for screenshots and accessibility checks; they are test tools and are not part of the site.
