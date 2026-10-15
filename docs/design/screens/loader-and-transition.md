# Screen: Loader and page transition

- Stories: US-27, US-54, US-56
- Requirements: FR-29, FR-30
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: loader.html (?t=1.6 freezes a frame), transition.html (?t=0.6)
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Give a branded wait on first visit and a calm hand over between pages.

## Layout

### 375 px

- Loader: full screen Abyss, tide arch 100 by 140 px filling with water, resort name in Prata, "Beach resort, Hurghada", "Loading" with three dots.

### 768 px

- Same, arch 120 by 168 px.

### 1440 px

- Same, arch 140 by 196 px.

## Components

- Loader (role status)
- Tide arch
- Transition panel with scalloped top edge, resort name, progress line

## Content

- Text "Loading" in the page language (Wird geladen, Caricamento, Загрузка). The loader shows only if the page is not ready within 300 ms and ends when hero assets are ready, at most 8 seconds.
- Transition: panel rises in 300 ms, shows name and a gold progress line, lifts away in 420 ms (720 ms total, within NFR-9).

## States

- Loading: This is the loading state.
- Empty: Not applicable.
- Error: After 8 seconds the page shows with the poster, whatever is loading (AC-27.5).
- Success: Page ready: loader lifts, focus moves to the new h1, title and address update, back and forward work.

## Interactions

- Reduced motion: the arch shows static at half fill and the transition is a 120 ms crossfade. Paused motion: content swaps with no animation. No JavaScript: normal navigation, no overlay.
- The concept notice is part of the destination page, not covered by the loader for longer than the load, and the loader itself carries the resort name only.

## Accessibility

- role status with the word Loading; announcement stops when the page appears; the overlay is inert; focus not trapped.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.

## Motion note

Motion intent only: water level rises in an arch (loop 1.8 s), sun dot sits on the waterline; panel wipes up with a scalloped edge. The motion designer specifies timing curves and the real 3D loading handover.
