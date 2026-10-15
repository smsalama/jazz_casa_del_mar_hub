# Design system: Jazz Casa del Mar resort website (concept)

- Task: P4-T1 (UI/UX Designer)
- Status: draft for the design gate and for Steven's T2 design verdict (NFR-36, AC-75.4)
- Sources: `docs/brief.md` (Decisions from Steven are authoritative), `docs/t1-decisions.md`, `docs/requirements.md` (FR-1 to FR-48, NFR-1 to NFR-36), `docs/stories.md`, `docs/legal-register.md`
- Prototype: `design/prototype/` (open `index.html`; no build step, no external requests). Screenshots: `evidence/design/`. Asset licences: `docs/asset-register.md`.
- Companion files: `docs/design/flows.md`, `docs/design/screens/*.md`.

This is an unofficial, speculative concept (Decision 2). Nothing here uses JAZ logo artwork, badges or photographs (FR-18). The resort name is typeset text.

## 1. Brand direction in three lines

1. Name: **Driftwood and Lagoon**. The one verified brand value, the dark brown grey `#453536`, stays as the anchor (concept notice, footer, brand moments); a Red Sea lagoon teal family, a pale sea foam ground and one low sun gold are added.
2. Signature device: the **arch** (Casa del Mar, arcades on the shore). Image windows are arch shaped, section edges scallop like a row of arches, and the loader is an arch filling with water like a tide.
3. Voice: calm, sentence case, plain verbs. The current page uses short promotional labels; the redesign keeps the shortness and drops the promotion (no superlatives, no numbers, no urgency: OQ-19).

## 2. Brand extraction record (NFR-30, AC-75.1)

Method: the current resort page (`https://www.jazhotels.com/hoteldetail/57-egypt-hurghada-jaz-elite-casa-del-mar-beach`) was read with WebFetch on 2026-10-15. WebFetch returns page text, not stylesheets. A direct download of the page and its CSS from this workspace was refused by the agent proxy (HTTP 403 on the tunnel); that block was not worked around.

### Extracted and verified

| Element | Value | How verified |
| --- | --- | --- |
| Theme colour | `#453536` (dark brown grey) | `meta theme-color` in the fetched page |
| Tone of labels | Short, plain, promotional ("Offers & Deals", "View gallery", "View map", "Share this hotel") | Link and label text in the fetched page |
| Section structure | Offer summary, Resort overview, Dining, Room overview, Activities, Surroundings, FAQ | Section labels in the fetched page |

### Not verified (could not be read from this workspace)

| Element | Status | What the design does instead |
| --- | --- | --- |
| Fonts in use on the current site | Not found in the fetched text | New open licence fonts chosen (section 5) |
| Full colour palette, button colours, hover colours | Not found | New palette built around `#453536` (section 4) |
| JAZ wordmark shape and colours | Not visible as text; must not be copied anyway (FR-18) | Resort name typeset in Prata; original arch glyph |
| Badges (JAZ go green, Green Star, Tripadvisor Travelers' Choice) | Named in the brief; forbidden on this concept (FR-18, OQ-17, Forbidden claims list) | Not reproduced anywhere |

A person with access to the live page can open its stylesheet and confirm or replace the unverified rows; none of the design depends on them.

### Enhanced for a premium Red Sea beach resort

| Enhancement | Reason |
| --- | --- |
| Lagoon teal family (`#064247` to `#7FD6CF`) and sea foam ground `#F3F7F6` | The sector is a sea resort; teal reads as water, and a cool ground makes the warm driftwood brown read as wood and shade rather than as heavy brown |
| Sun gold `#E8B04B`, used only for the Book now call to action on dark, focus on dark and the loader sun | One warm accent with a job (the action), never decoration |
| Sand `#E6D9C3` and `#F0E8DA` as quiet band colours | Echoes the beach; keeps long pages from becoming a single cool block |
| Prata (display) and Manrope (text) | A high contrast display serif for a hospitality voice, a warm geometric sans for reading; both support Cyrillic (Russian) |
| Arch window shape, arch scallop edges, tide arch loader | One memorable, ownable motif tied to the name ("Casa") instead of generic rounded cards |
| Sentence case, no all caps labels, no numbered section markers | Calmer, more premium; numbering only where content is a sequence |

## 3. Design plan and review (frontend-design process)

First plan: warm cream ground, a high contrast serif and a terracotta accent, full width hero with a gradient wash, identical rounded cards. Review result: that combination is the common default for hospitality and for generated pages, and it would hide the one real brand value (a dark brown grey). Changes made: cool foam ground instead of cream; teal and gold instead of terracotta; the brown moved to the framing elements (notice, footer) rather than the ground; cards differ by role (arch image cards, plain fact tiles, full bleed image tiles, a raised panel) instead of one card repeated; one signature motion (the tide arch loader and its panel transition) rather than reveal animations on every section.

Layout concept: strata. Pages read top to bottom as water to shore: poster scene (water), content bands (shallows), a sand band, a dark band, then the driftwood footer, joined by scalloped arch edges. Alignment: left aligned text; images and facts in an asymmetric split on wide screens; centred text is used only on the loader and error pages.

## 4. Tokens

All tokens are CSS custom properties in `design/prototype/css/tokens.css`. The real build shall define them once and import them everywhere (NFR-30, AC-75.2). Raw hex values are allowed only in that file.

### 4.1 Colour palette

| Token | Hex | Role |
| --- | --- | --- |
| `--color-driftwood` | `#453536` | Brand colour extracted from the current site: concept notice, footer, brand surfaces |
| `--color-ink` | `#241C1D` | Body text |
| `--color-ink-soft` | `#51423F` | Lead text, secondary text |
| `--color-muted` | `#625251` | Captions, hints, Book now label |
| `--color-abyss` | `#0C2229` | Dark band, hero scrim, loader, admin top bar |
| `--color-deep` | `#123642` | Admin sidebar, placeholder art |
| `--color-lagoon-900` | `#064247` | Focus ring on light, link hover |
| `--color-lagoon-800` | `#075659` | Primary button hover |
| `--color-lagoon-700` | `#0B6B6E` | Primary button, links, icons |
| `--color-lagoon-500` | `#1E8F90` | Art and decoration only (never text) |
| `--color-aqua-300` | `#7FD6CF` | Icons and links on dark |
| `--color-aqua-100` | `#D5F0EC` | Hover fills, info tint |
| `--color-foam` | `#F3F7F6` | Page ground |
| `--color-white` | `#FFFFFF` | Cards, inputs |
| `--color-sand-200` | `#E6D9C3` | Badges, art |
| `--color-sand-100` | `#F0E8DA` | Quiet band |
| `--color-sun` | `#E8B04B` | Call to action on dark, focus on dark |
| `--color-line` | `#D3CBC7` | Decorative hairlines (never the only boundary of a control) |
| `--color-line-strong` | `#7A6A68` | Input and control borders |
| `--color-error` / `-bg` | `#A8201A` / `#FBE9E7` | Errors (always with an icon and words) |
| `--color-success` / `-bg` | `#17673F` / `#E4F3EA` | Success |
| `--color-warning` / `-bg` | `#7A4B00` / `#FFF1D6` | Warnings, missing translation |
| `--color-info` / `-bg` | `#0B6B6E` / `#E3F4F2` | Information |

Role tokens (`--bg`, `--surface`, `--text`, `--link`, `--cta-bg`, `--focus`, `--on-dark`, `--border-strong` and the rest) map the palette to jobs; components use role tokens. There is no separate dark theme in this release: dark bands are designed surfaces with their own `on-dark` tokens. The admin portal uses the same palette (ground `#EDF2F1`).

### 4.2 Contrast ratios (NFR-4, AC-49.1)

Ratios are computed with the WCAG relative luminance formula (script kept outside the repo; method reproducible with any WCAG calculator). Text needs 4.5 to 1 (3 to 1 for 24 px or larger, or 19 px bold); components and graphics need 3 to 1.

| Role | Foreground | Background | Ratio | Result | Used for |
| --- | --- | --- | --- | --- | --- |
| Body text | #241C1D | #F3F7F6 | 15.45 | AA text | Text on page ground |
| Body text on cards | #241C1D | #FFFFFF | 16.68 | AA text | Cards and panels |
| Secondary text | #51423F | #F3F7F6 | 8.84 | AA text | Lead paragraphs, section intros |
| Muted text | #625251 | #F3F7F6 | 6.83 | AA text | Captions, hints, Book now label |
| Muted text on sand | #625251 | #F0E8DA | 6.07 | AA text | Hints on the sand band |
| Body text on sand | #241C1D | #F0E8DA | 13.71 | AA text | Sand band |
| Link text | #0B6B6E | #F3F7F6 | 5.82 | AA text | Links on page ground |
| Link text on sand | #0B6B6E | #F0E8DA | 5.16 | AA text | Links on the sand band |
| Link text on white | #0B6B6E | #FFFFFF | 6.28 | AA text | Links on cards |
| Link hover | #064247 | #F3F7F6 | 10.35 | AA text | Hover |
| Primary button | #FFFFFF | #0B6B6E | 6.28 | AA text | Button label |
| Primary button hover | #FFFFFF | #075659 | 8.45 | AA text | Hover |
| Sun button | #0C2229 | #E8B04B | 8.42 | AA text | Book now on dark, newsletter button |
| Sun button hover | #0C2229 | #F2C46A | 10.09 | AA text | Hover |
| Secondary button text | #241C1D | #F3F7F6 | 15.45 | AA text | Outline button |
| Secondary hover | #241C1D | #D5F0EC | 13.91 | AA text | Hover |
| Text on Abyss | #F3F7F6 | #0C2229 | 15.23 | AA text | Dark band, loader |
| Soft text on Abyss | #C9D8D6 | #0C2229 | 11.18 | AA text | Book now label on dark |
| Aqua link on Abyss | #7FD6CF | #0C2229 | 9.73 | AA text | Links inside the dark band |
| Text on Driftwood | #F3F7F6 | #453536 | 10.71 | AA text | Concept notice, footer |
| Sand text on Driftwood | #E6D9C3 | #453536 | 8.30 | AA text | Spare |
| Sun on Driftwood | #E8B04B | #453536 | 5.92 | AA text | Focus on the footer |
| Error text on Driftwood | #FFD6D2 | #453536 | 8.70 | AA text | Footer field errors |
| Text on Deep | #F3F7F6 | #123642 | 11.92 | AA text | Admin sidebar |
| Soft text on Deep | #C9D8D6 | #123642 | 8.75 | AA text | Admin group titles |
| Count badge | #0C2229 | #E8B04B | 8.42 | AA text | Admin unread count |
| Error text | #A8201A | #F3F7F6 | 6.74 | AA text | Field errors |
| Error alert | #8F1B16 | #FBE9E7 | 7.67 | AA text | Error alert |
| Success alert | #17673F | #E4F3EA | 6.01 | AA text | Success alert |
| Warning alert | #7A4B00 | #FFF1D6 | 6.64 | AA text | Missing translation notes |
| Info alert | #064247 | #E3F4F2 | 9.84 | AA text | Info alert |
| Badge text | #241C1D | #E6D9C3 | 11.98 | AA text | Sample offer badge |
| Chip, warning | #7A4B00 | #FFFFFF | 7.41 | AA text | Admin chip |
| Admin text | #241C1D | #EDF2F1 | 14.75 | AA text | Admin main |

Non text contrast (3 to 1 needed): input border `#7A6A68` on foam 4.76, on white 5.14; focus ring `#064247` on foam 10.35, on white 11.18, on sand 9.19; focus ring sun `#E8B04B` on Abyss 8.42, on Driftwood 5.92, on Deep 6.58; radio and checkbox accent `#0B6B6E` on white 6.28; error marker 6.74; warning dashed border 6.64; aqua icons on Deep 7.61.

`--color-lagoon-500` (`#1E8F90`) reaches 3.61 on foam, so it is allowed only for decoration and graphics, never for text.

#### Text over posters and 3D scenes (NFR-4, AC-49.2)

Text over a scene never sits on the scene itself. It sits on a solid or gradient backing (the scrim) of Abyss. Worst case is a pure white pixel under the scrim:

| Scrim opacity under the text | Resulting worst case background | Foam text | White text | Soft text `#C9D8D6` | Sun text |
| --- | --- | --- | --- | --- | --- |
| 0.60 | #6D7A7F | 4.10 | 4.43 | 3.01 | 2.27 |
| 0.70 | #556469 | 5.70 | 6.15 | 4.18 | 3.15 |
| 0.75 | #49595F | 6.76 | 7.30 | 4.96 | 3.73 |
| 0.80 | #3D4E54 | 8.05 | 8.69 | 5.91 | 4.45 |
| 0.84 | #33454B | 9.29 | 10.03 | 6.82 | 5.13 |
| 0.90 | #24383E | 11.37 | 12.28 | 8.35 | 6.28 |

Rules that follow: (1) every text block over a scene shall lie where the scrim is at least 0.84 (this holds whatever frame the 3D scene is on, because the scrim is a layer above the canvas); (2) large display text may use 0.70 or more; (3) scene controls carry their own 0.80 Abyss backing; (4) no text sits on the right part of a hero where the scrim fades out. The prototype scrim: desktop is a left to right gradient (0.92 at the left edge, 0.86 at 44 percent of the width, fading to 0 at 88 percent) with text limited to the left 44 percent (heading at most 9 characters wide, lead text at most 30rem); mobile is a bottom up gradient (0.92 at the bottom, 0.84 up to 52 percent of the height, fading to 0 at 82 percent) with the text block kept inside the bottom 52 percent and the scene controls moved to the top of the poster.

### 4.3 Typography

| Role | Family | Weight | Licence |
| --- | --- | --- | --- |
| Display (headings, wordmark, loader) | Prata (Latin and Cyrillic) | 400 (only weight) | SIL OFL 1.1, Cyreal / The Prata Project Authors |
| Text (body, UI, labels) | Manrope variable (Latin and Cyrillic) | 200 to 800; used: 500, 600, 700, 800 | SIL OFL 1.1, The Manrope Project Authors |

Fallback stacks: display `"Prata", "Iowan Old Style", "Palatino Linotype", Georgia, serif`; text `"Manrope", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. German umlauts and ß, Italian accents and the Russian alphabet are all inside the delivered subsets. Fonts are self hosted from the site's own origin as WOFF2 with `font-display: swap`; no Google Fonts or CDN request is made (NFR-15, NFR-31).

Delivered files (copied into `design/prototype/fonts/`, 2026-10-15, from the npm packages `@fontsource/prata` 5.3.0 and `@fontsource-variable/manrope` 5.3.0, both declared OFL-1.1):

| File | Bytes | Loaded on |
| --- | --- | --- |
| `prata-latin-400-normal.woff2` | 19,224 | Every page |
| `manrope-latin-wght-normal.woff2` | 24,836 | Every page |
| `prata-cyrillic-400-normal.woff2` | 13,132 | Russian pages only (by `unicode-range`) |
| `manrope-cyrillic-wght-normal.woff2` | 14,500 | Russian pages only |

Budget check (NFR-7: at most 2 families, at most 120 KB, no Cyrillic file on en, de, it): en, de and it pages request 44,060 bytes (43 KB); ru pages request 71,692 bytes (70 KB). The `unicode-range` split means a Latin page never downloads the Cyrillic files (AC-52.6).

Type scale (fluid; body never below 16 px, AC-49.5):

| Token | Value | At 375 px | At 1440 px | Line height | Tracking | Use |
| --- | --- | --- | --- | --- | --- | --- |
| `--text-hero` | clamp(2.75rem, 1.4rem + 6.2vw, 6.5rem) | 46 px | 104 px | 1.08 | -0.015em | Home heading |
| `--text-3xl` | clamp(2.375rem, 1.6rem + 3.6vw, 4.25rem) | 39 px | 68 px | 1.08 | -0.015em | Page h1 |
| `--text-2xl` | clamp(1.875rem, 1.45rem + 2vw, 3rem) | 31 px | 48 px | 1.08 | -0.015em | h2 |
| `--text-xl` | clamp(1.5rem, 1.3rem + 0.9vw, 2rem) | 24 px | 32 px | 1.25 | -0.015em | h3, card titles |
| `--text-lg` | clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem) | 20 px | 24 px | 1.25 | -0.015em | h4 |
| `--text-md` | clamp(1.0625rem, 1.02rem + 0.2vw, 1.1875rem) | 17 px | 19 px | 1.6 | 0 | Lead paragraphs |
| `--text-base` | 1rem | 16 px | 16 px | 1.6 | 0 | Body, form text, buttons |
| `--text-xs` | 0.875rem | 14 px | 14 px | 1.3 to 1.6 | 0.01em | Book now label, captions, chips, admin hints |
| `--text-2xs` | 0.8125rem | 13 px | 13 px | 1.25 | 0 | Concept notice at 375 px only |

Tracking is size specific: display sizes tighten, small sizes open slightly (apple-design rule). Line length is capped at 62ch. Headings use `text-wrap: balance`, body `text-wrap: pretty`. No all caps labels and no eyebrow labels. Lists of numbers use Manrope tabular figures only in admin tables.

Concept notice size decision (flag for QA and Steven): the notice is 13 px at 375 px wide, 14 px from 640 px wide. AC-20.3 (notice at most 48 px tall at 390 px in every language) and AC-49.5 (body text at least 16 px) cannot both hold for the German sentence, which is 98 characters. The notice is treated as a banner, not body text. Measured with the prototype: 43 px tall at 375 px in English, German, Italian and Russian. If QA reads AC-49.5 as covering the notice, the German notice would need three lines and exceed 48 px, so the requirement itself would need to change.

### 4.4 Spacing, layout, radius

| Token | Value | Token | Value |
| --- | --- | --- | --- |
| `--space-1` | 4 px | `--space-6` | 32 px |
| `--space-2` | 8 px | `--space-7` | 48 px |
| `--space-3` | 12 px | `--space-8` | 64 px |
| `--space-4` | 16 px | `--space-9` | 96 px |
| `--space-5` | 24 px | `--space-10` | 128 px |

Gutter `clamp(16px, 8px + 2.5vw, 40px)` (16 px at 375). Container 1280 px (`--max-width: 80rem`). Section padding 64 px (`--space-8`) below 960 px, 96 px above.

Breakpoints (CSS thresholds; design reference widths 375, 768 and 1440 px; layout works from 320 px, NFR-4):

| Threshold | Change |
| --- | --- |
| 640 px (40rem) | Two column grids; concept notice grows from 13 to 14 px |
| 960 px (60rem) | Header becomes two rows with inline navigation; hero switches from portrait to landscape poster and from bottom scrim to left scrim; split layouts become two columns |
| 1024 px (64rem) | Admin sidebar becomes fixed |
| 1440 px (90rem) | Admin editor shows four language columns (two columns below) |

Radius: `--radius-s` 6 px, `--radius-m` 14 px, `--radius-l` 28 px, `--radius-pill` 999 px, `--radius-arch` (999 px top corners, 6 px bottom) for arch windows. Hierarchy: pills for actions, arch for hero imagery, large radius for panels, small radius for inputs.

### 4.5 Shadow and elevation

| Level | Token | Value | Use |
| --- | --- | --- | --- |
| 0 | none | | Page, bands |
| 1 | `--shadow-1` | `0 1px 2px rgba(12,34,41,.14), 0 1px 1px rgba(12,34,41,.08)` | Cards at rest, facts |
| 2 | `--shadow-2` | `0 10px 28px -10px rgba(12,34,41,.32), 0 2px 6px rgba(12,34,41,.1)` | Hovered cards, raised panels |
| 3 | `--shadow-3` | `0 28px 64px -24px rgba(12,34,41,.5), 0 6px 16px rgba(12,34,41,.14)` | Menu panel, dialogs, lightbox, skip link |

Bigger surfaces read as thicker: stronger blur and deeper shadow (apple-design). z-index tokens: base 0, header 20, menu 30, sheet and save bar 40, lightbox 80, loader and transition 90, dialog 95, skip link 200.

### 4.6 Motion (durations, easings, springs)

Rules: respond on press, not release (`:active` scale 0.97 in 90 ms); animate only `transform` and `opacity`; every motion is interruptible; one signature moment (the tide arch loader and its panel transition); reduced motion removes movement and keeps opacity.

| Token | Value | Use |
| --- | --- | --- |
| `--dur-press` | 90 ms | Press feedback |
| `--dur-fast` | 160 ms | Colour, border, small state changes |
| `--dur-base` | 280 ms | Menu, disclosure, arrows |
| `--dur-slow` | 480 ms | Larger reveals |
| `--dur-page-exit` | 300 ms | Transition panel covers the page |
| `--dur-page-enter` | 420 ms | Panel leaves and reveals the new page (exit plus enter 720 ms, within the 800 ms budget of NFR-9) |
| `--dur-spring` | 520 ms | Duration to run the spring curves below |
| `--ease-standard` | cubic-bezier(0.2, 0, 0, 1) | Default |
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | Entering, arrows |
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | Leaving |
| `--ease-inout` | cubic-bezier(0.65, 0, 0.35, 1) | Panel cover |
| `--ease-spring-calm` | `linear(0, .205, .499, .715, .848, .921, .96, .981, .991, .998, 1)` | Damping 1.0, response 0.4: cards, tiles, menu (no overshoot) |
| `--ease-spring-flick` | `linear(0, .223, .565, .813, .947, 1.001, 1.015, 1.013, 1.008, 1.003, 1)` | Damping 0.8, response 0.4: only for motion that follows a flick or drag (lightbox swipe, admin reorder drop) |

Reduced motion (`prefers-reduced-motion: reduce`): all duration tokens become 0 ms; CSS animations are removed; the transition panel becomes an opacity change of 120 ms (within the 150 ms limit of NFR-11); the loader shows a static half filled arch. When the visitor pauses motion (FR-30) the page sets `data-motion="paused"` on `html`: animations are paused, transitions are cut to 0 ms, 3D freezes on its current frame.

### 4.7 Focus, targets, forms

Focus: 3 px solid `--focus` (`#064247` on light, `#E8B04B` on dark) with 3 px offset on every focusable element; never removed. The sticky header (below 960 px) and the admin save bar are accounted for with `scroll-padding` so a focused element is never fully hidden (WCAG 2.4.11). Targets: every pointer target is at least 44 by 44 px (`--target: 2.75rem`); where the visible control is smaller (24 px checkbox and radio) the whole label row is the 44 px target. Inputs: 48 px high, 2 px border `#7A6A68`, visible label above (never placeholder only), errors beside the field with an icon and words, plus an error summary at the top of the form.

## 5. Imagery, scenes and illustration

- Placeholder imagery is original SVG illustration made for this concept (asset register): six scene posters, one portrait Home poster, twelve abstract tiles. No photograph, no person, no third party artwork. Images are delivered at the aspect ratio shown with explicit `width` and `height` so swapping poster for 3D causes no layout shift (AC-25.4).
- Photographs added later through the admin media library are processed per FR-41. The arch crop is applied by CSS so any photo can sit in an arch.
- Poster aspect ratios: landscape 16:10 (1600 by 1000), portrait 2:3 (800 by 1200) for widths below 960 px (Home; the five section posters crop with `object-position`, see `docs/design/screens/scene-areas.md`).
- Six scenes (FR-27, FR-28): Home hero and one on each of Rooms and suites, Dining, Pools and beach, Activities and facilities, Location. Layout space, poster, reading order and brief motion intent are in `docs/design/screens/scene-areas.md`. The motion designer specifies the motion.

## 6. Components

Each component has states for rest, hover, press, focus, disabled and error where relevant. Details per screen are in `docs/design/screens/`.

| Component | Key rules |
| --- | --- |
| Concept notice | Static, in flow, first element after the skip link, no focusable child, `role="region"` with label "Concept notice", Driftwood on foam text, 43 px tall at 375 px, repeated in the footer (FR-17) |
| Skip link | First focusable element, visible on focus, targets `#main` |
| Header | Below 960 px: sticky 56 px bar (wordmark, menu button) with a panel holding navigation, language list and Book now. From 960 px: static two rows (wordmark with place line plus languages and Book now; then navigation). Current page has `aria-current="page"` and a 3 px bar, never colour alone |
| Language list | Four links in their own language (English, Deutsch, Italiano, Русский), current one marked with a tick and `aria-current="true"`, each with `lang` and `hreflang` |
| Book now block | One link (primary or sun button, external icon, hidden text "opens in a new tab") plus the label "External site, not connected with this concept" at 14 px, muted, `aria-describedby` on the link, unique id per instance (FR-11) |
| Buttons | Primary (lagoon), secondary (outline), sun (on dark), ghost on dark, danger (admin delete). 48 px high (44 px small), pill, press scale 0.97 |
| Scene (hero or section) | Poster `<picture>`, canvas `aria-hidden`, scrim, content, controls. See scene-areas |
| Scene control | Pause motion (`aria-pressed`, label swaps to Resume motion), Turn on tilt (labelled control for the iOS permission). 44 px, dark backing 0.80 |
| Arch media | 4:5 arch image with large shadow, used once per page as the hero companion |
| Card | Arch topped image, title as the only link (stretched), short text, "View room" hint; hover lifts 4 px on a calm spring (not in reduced motion) |
| Tile | Full image tile with title and arrow, 208 px minimum height, whole tile is the link |
| Fact | Icon plus short phrase on white; icon is decorative (`aria-hidden`) |
| Badge | "Sample offer" pill with tag icon (word and icon, not colour) |
| Scallop edge | Decorative row of arches between bands (`aria-hidden`) |
| Forms | Labels, required marks as words ("(required)"), hints linked by `aria-describedby`, errors with icon, summary with links to fields, hidden spam trap (`aria-hidden`, `tabindex="-1"`, off screen), privacy line beside the send button |
| Alerts | Error, success, warning, info; each has icon plus heading; error and retry use `role="alert"` with `tabindex="-1"` for focus; success and info use `role="status"` |
| Loader | Full screen Abyss, tide arch filling, resort name, "Loading" text; `role="status"` |
| Page transition | Abyss panel with scalloped top edge rises (300 ms), shows name and progress line, then lifts away (420 ms) |
| Footer | Driftwood; newsletter form first, then address, links, contact, social, legal, concept sentence again, copyright |
| Lightbox | Large image, caption, counter "3 of 12", previous, next, close; focus trapped inside; Escape closes; swipe with spring flick |
| Accordion (FAQ) | Native button, `aria-expanded`, answers present in HTML (no JS needed) |
| Admin shell | Abyss top bar, Deep sidebar (sticky from 1024 px), content on `#EDF2F1` |
| Language cell | Language tag (EN, DE, IT, RU), language name, "Default language" or "Machine assisted, not reviewed", the field, a missing note when empty (icon, word "Missing", dashed border) |
| Rich text | Toolbar of four 44 px buttons (Bold, Italic, Link, Bulleted list) plus an editable region |
| Chip | Word plus icon on a tint with a border; statuses Handled, Unread, Missing, Complete |
| Save bar | Sticky bottom, "Unsaved changes in 1 field" with a diamond marker, Discard changes, Save changes |
| Data table | Real table with caption, `th scope`, unread rows marked by a bar and bold subject, scroll region focusable |
| Dialog | Modal, focus trapped, Escape cancels, primary action named for its effect ("Delete Executive Suite") |
| Empty, loading, error, success | Each list and screen has all four (see screen files); loading uses skeleton lines, empty uses a dashed panel with one action |

## 7. Accessibility and internationalisation rules built into the system

- Landmarks: skip link, concept notice region, header, nav (main and language), main, footer; exactly one `h1`; no skipped heading levels; `lang` on `html` and on any foreign text (including fallback English text, FR-26).
- Colour is never the only signal: current page (bar), current language (tick), errors (icon, words, left bar), required (words), unread (bar and bold), missing (icon, word, dashed border), unsaved (marker and words).
- Text spacing override and 200 percent zoom: components use `rem`, `min-height` and wrapping, never fixed heights for text; checked with 40 percent longer strings in German and Russian prototypes.
- Reflow at 320 px, no horizontal scroll (prototype measured at 375, 768, 1440: none).
- Touch: no hover only function; press feedback on `pointerdown`/`:active`.
- `prefers-reduced-motion`, `prefers-reduced-transparency` (header and scene controls turn opaque), `prefers-contrast: more` (stronger borders) and `forced-colors` are handled in the stylesheet.
- Forms follow FR-19, FR-22 and FR-23 wording; no age or birth date field; no consent box on the contact form.

## 8. Content rules the design enforces

No digits in main page copy other than counts of listed items, list numbering and the copyright year (FR-18, AC-21.5); no prices, percentages, ratings, awards, certifications, superlatives, deadlines or scarcity wording (Forbidden claims list; "best", "finest", "largest" are never used); no logos or badges of JAZ or Tripadvisor; placeholder text is original. All Book now links carry the external site label. The concept sentence and title suffix are fixed in resource files, not editable.

## 9. Prototype versus production notes

The prototype is plain HTML and CSS plus `js/proto.js` (menu, pause control, password toggle). Points the build shall treat differently:

1. The prototype inlines an SVG icon sprite on each page for simplicity; the build shall serve one sprite file from its own origin.
2. The prototype's `js/proto.js` adds the `js` class that collapses the menu; in the build this class shall be set by a small blocking script served from the site's own origin (no inline script, CSP `script-src 'self'`).
3. No inline `style` attributes are used (CSP forbids them); poster crops are classes (`pos-sun` and so on).
4. The Book now link in the prototype points to the default URL; in the build it comes from the admin setting (FR-11, FR-39).
5. Posters are SVG in the prototype; the delivered posters are raster (AVIF and WebP) within the 150 KB and 250 KB budgets (NFR-7).
6. `design/prototype/` is a design reference, not production code.
