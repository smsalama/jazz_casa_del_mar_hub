# Motion and 3D specification: Jazz Casa del Mar concept resort site

- Task: P4-T3 (3D Motion and Interaction Designer), branch `p4-motion`
- Date: 2026-10-15
- Status: draft for the design gate and T2
- Requirements: FR-27 to FR-31, NFR-6 to NFR-9, NFR-11, NFR-12, NFR-15, NFR-24; stories US-25 to US-28, US-53, US-54, US-56, US-57, US-58
- Companion file: `docs/design/budgets.md` (every number used here is explained and measured there)
- Inputs: `docs/design/system.md` section 4.6 (motion tokens), `docs/design/screens/scene-areas.md`, `motion-and-fallbacks.md`, `loader-and-transition.md`, `home.md`, ADR-0007 and ADR-0008, `docs/architecture.md` section 13, prototype `design/prototype/` (loader.html, transition.html, css/loader.css, js/proto.js)
- Skills loaded for this task: `agency:role-motion-designer`, `agency:design-standard`, `anthropic-skills:apple-design`, `core-3d-animation:threejs-webgl`, `core-3d-animation:motion-framer`, `meta-skills:web3d-integration-patterns`. All six loaded. `ui-ux-pro-max` and `react-three-fiber` were not needed (no React on public pages, ADR-0007).

This is a design time specification. It contains no code for the web repo. Where a short formula or pseudo step is given, it is there so a developer cannot misread the intent.

Wording conventions: "proposal" marks a value I chose that no requirement fixes. A value with a requirement or AC id in brackets comes from that line. All copy in this file has no dashes (system rule).

---

## 1. How to read this file

1. Section 2 fixes the principles and the tool ladder.
2. Section 3 is the state matrix: what every motion does in normal, reduced motion, paused, no WebGL, no JavaScript and Save-Data modes. Every later section follows it.
3. Sections 4 to 7 are the non-3D motion: loader, page transition, pause and tilt controls, micro-interactions.
4. Section 8 is the 3D engine contract that all six scenes share (loading, camera, input, framing, quality, disposal, authoring).
5. Section 9 holds the six scenes, each with storyboard, procedural content plan, fallback and budget.
6. Sections 10 to 13 cover accessibility, requirement traceability, decisions for Steven at T2 and the asset register entries to add.

---

## 2. Principles and tool ladder

### 2.1 Principles (from design-standard and apple-design)

1. 3D never blocks first paint. The poster is the LCP element; 3D code is requested only after the poster has painted (NFR-7).
2. Respond on press, not on release. Feedback is continuous during drags, tilt and scroll. Nothing waits for a gesture to end.
3. Every motion is interruptible and starts from the current on screen value, never from its target. No input is locked out during a transition.
4. Springs for anything the visitor can touch (critically damped by default, bounce only after a flick). Fixed duration curves for everything the system plays by itself.
5. Enter and exit use the same path. The transition panel rises from the bottom and leaves through the top, continuing in the same direction, so it reads as one curtain passing through.
6. Transform and opacity only in CSS. In 3D, uniforms and transforms only; no per frame allocation.
7. Reduced motion gets a calm equivalent, never a broken page. Nothing essential exists only in motion. Nothing flashes.
8. One signature moment per scene, one for the loader and transition pair. Everything else stays quiet.

### 2.2 Tool ladder (lightest tool that works)

| Need | Tool | Why | Where it lives |
| --- | --- | --- | --- |
| Press, hover, focus, menu, disclosure, loader, transition panel, scroll reveal, control states, canvas fade in | CSS (transitions, keyframes, `linear()` spring curves, scroll driven animations where supported) | Zero JavaScript, compositor only | `src/styles/` |
| Page transition sequencing and state classes | swup 4.10.0 hooks setting classes `is-animating`, `is-leaving`, `is-rendering`; CSS does the animating | Already chosen in ADR-0007; no animation library needed | `src/client/transitions.ts` |
| Lightbox swipe and release with velocity handoff | `motion` 13.4.6 vanilla `animate` (spring with initial velocity) | CSS cannot inherit release velocity | `src/client/lightbox.ts` (public bundle) |
| 3D scenes | three 0.186.1 used directly | ADR-0007 | lazy 3D chunk |
| Camera springs, easing in 3D | A 20 line critically damped spring and a cubic bezier solver inside the engine | Keeps the 3D chunk small and keeps CSS and 3D on the same curves | `src/client/scenes/engine.ts` |
| GSAP, React Three Fiber, Lottie, Rive, Spline, Lenis style smooth scroll | Not used | GSAP licence not on the allow-list (ADR-0007); no React on public pages; smooth scroll is banned by the reduced motion rule | none |

Motion library use is limited to the lightbox. If the developer finds the lightbox can be built to the spec in section 7 (M-18) with CSS plus a tiny pointer handler, `motion` is dropped from the bundle entirely. The decision and the measured size go into the task report.

### 2.3 Tokens used (all from `docs/design/system.md` 4.6; none invented for CSS)

`--dur-press` 90 ms, `--dur-fast` 160 ms, `--dur-base` 280 ms, `--dur-slow` 480 ms, `--dur-page-exit` 300 ms, `--dur-page-enter` 420 ms, `--dur-spring` 520 ms; `--ease-standard`, `--ease-out`, `--ease-in`, `--ease-inout`, `--ease-spring-calm`, `--ease-spring-flick`.

3D time constants (proposals, engine constants, not CSS tokens; they are listed once here so every scene cites them by name):

| Name | Value | Meaning |
| --- | --- | --- |
| `T_FADE` | 480 ms (`--dur-slow`) with `--ease-out` | Canvas fades in over the poster |
| `T_RAMP` | 1200 ms with `--ease-out` | Ambient motion (waves, glints, particles) ramps from zero amplitude after the fade, so the poster to scene hand over is invisible |
| `SPRING_INPUT` | critically damped, response 0.45 s | Pointer, drag and tilt following |
| `SPRING_RETURN` | critically damped, response 1.2 s | View returns to neutral after 2.5 s without input |
| `SPRING_SCROLL` | critically damped, response 0.25 s | Scroll linked camera parallax |
| `MIN_PERIOD` | 1.5 s | No repeating luminance change is faster than this (flash safety, section 10) |

The cubic bezier solver in the engine takes the same four numbers as the CSS tokens, so a camera move "ease-out" is the same curve as a CSS "ease-out".

---

## 3. State matrix (applies to every item in this file)

| Mode | How detected | Loader | Page transition | Micro-interactions | 3D scenes | Scene controls |
| --- | --- | --- | --- | --- | --- | --- |
| Normal (3D) | WebGL 2 ok, no reduced motion, not paused, no Save-Data, not 2g | Section 4 | Section 5 | Section 7 | Section 9 | Pause motion; Turn on tilt on iOS only |
| Reduced motion | `prefers-reduced-motion: reduce` (re-checked live with a media query listener) | Static half filled arch and the word Loading (no wave, no dots) | 120 ms opacity crossfade of `main` (60 ms out, 60 ms in) | Colour change only, no lift or scale | Not started, no 3D code or asset requested; poster | Not shown (no autonomous motion, AC-28.4) |
| Paused by the visitor, same page | Pause motion pressed (FR-30) | n/a (no loader mid page) | Instant swap, no overlay | `data-motion="paused"` on `html`: CSS animations paused, transitions 0 ms | Frozen on the current frame; input ignored | Resume motion (`aria-pressed="true"`) |
| Paused, then reload or navigate in the same tab | Session key present | Static half filled arch, no motion | Instant swap | as above | Fallback: poster, no 3D download (NFR-12 lists "visitor has paused motion") | Resume motion stays visible so the visitor can get 3D back; pressing it runs the capability gate and loads the scene |
| No WebGL 2, context creation fails, context lost over 3 s, Save-Data, 2g | Capability gate (section 8.2) | Unchanged (it is not 3D) | Unchanged | Unchanged | Poster only, zero 3D requests | Hidden (nothing to control) |
| Adaptive rule triggered | Governor (section 8.6) | Unchanged | Unchanged | Unchanged | Poster for the rest of the tab session (held in memory, not storage) | Hidden |
| No JavaScript | `html` lacks class `js` | Hidden by a linked `noscript` stylesheet; never shown | None, normal navigation | CSS only ones still work | Poster | Not shown |
| `prefers-reduced-transparency`, `prefers-contrast: more`, `forced-colors` | media queries | Backing opaque | Backing opaque | Borders stronger | Unchanged | Opaque backing |

Notes:

- The scene control rule in `scene-areas.md` says the controls are hidden before the first frame and when 3D cannot run. This file refines one case: after a visitor paused, the Resume control stays visible on the poster, because otherwise the visitor has no way back.
- The pause key. ADR-0007 names the session storage key `jcdm-motion-paused`; the prototype uses `jcdm-motion` with values `1` and `0`. The Cookie notice (FR-15) must list the real name. Use the ADR name `jcdm-motion-paused` with value `1` only when paused (remove the key on resume). This is flagged in section 12.
- Reduced motion beats everything: a visitor with reduced motion on never sees a Pause control, because there is nothing to pause. NFR-11 says the controls "shall still be present where motion exists"; with reduced motion on, no motion longer than 5 seconds exists.

---

## 4. Loader (first load of a document)

### 4.1 Purpose and trigger

- Purpose: a branded, calm wait that only appears when the page is slow, so a fast page is never delayed (FR-29a, NFR-9).
- "First visit in a browser tab" is implemented as "any full document load" (a typed address, reload, link from outside). swup soft navigations use the transition (section 5), not the loader. No storage is needed, which keeps NFR-15 true.
- Trigger: purely CSS, so it works before any script runs and cannot hang if scripts fail.
  - The loader markup is in the page layout, hidden by default (`visibility: hidden`).
  - A CSS animation with `animation-delay: 300ms` makes it visible. If the page is ready before 300 ms the script marks `html.is-ready` and the loader never appears (AC-54.4).
  - The same animation ends visibility at 8300 ms (visible 300 ms to 8300 ms, so never more than 8 seconds, with no script needed; AC-27.5, NFR-9).
  - No JavaScript: a `noscript` linked stylesheet (not an inline style, CSP) sets `.loader { display: none }`.
- "Ready" is defined as: the h1 text is painted, the hero poster has decoded (`img.decode()` resolved, or error), and fonts used above the fold are loaded (`document.fonts.ready` or 1.5 s timeout). Ready does not wait for 3D (see decision D2 in section 12 and the arithmetic in `budgets.md` section 6).

### 4.2 Storyboard

| Time (from loader appearing, t0 = 300 ms after navigation start) | Frame | Easing and duration |
| --- | --- | --- |
| 0 to 160 ms | Abyss ground fades in. The tide arch outline (aqua 300 stroke, 2.5 px) is already drawn. Resort name in Prata (white), the line "Beach resort, Hurghada" (soft text), and the word "Loading" with three dots appear with the ground. | opacity 0 to 1, `--dur-fast`, linear |
| 0 to 5.4 s | The arch fills like a tide. Water level is a rectangle clipped by the arch, moved with `translateY`. The level follows real milestones: HTML parsed 20 percent, stylesheet and fonts 45, poster decoded 75, scripts ready 90. Each milestone adds a class (`is-p1` to `is-p4`) and the level moves with a transition of `--dur-base` and `--ease-out`, so it never jumps and never goes backward. Without milestones a CSS keyframe creeps the level from 0 to 80 percent over 6 s with `--ease-out`, so the loader never looks frozen. | transform, `--ease-out` |
| 0 to 3.6 s | A wave crest on the water surface slides sideways in a seamless loop of 1.8 s (two iterations). The sun dot (sun token) sits on the waterline and rides the level. The three dots after "Loading" hop in a 1.2 s loop (two iterations of the prototype keyframe `dot`). | `linear` for the crest, `--ease-inout` for dots |
| 3.6 s to the end | The crest and the dots hold still. The level keeps creeping. Rationale: the loader is shown to a visitor who cannot reach the Pause control yet, so the repeating motion stops by itself after 5 seconds at most (WCAG 2.2.2); progress is still shown by the slow level change and the word "Loading". | n/a |
| Ready | The level runs to 100 percent. The sun dot sits at the top of the arch. | 200 ms, `--ease-out` |
| Ready + 200 ms | The whole loader lifts away upward with a scalloped bottom edge (the same shape as the transition panel). The page, already painted underneath, is revealed. | translateY 0 to -100%, `--dur-page-enter` 420 ms, `--ease-inout` |
| Ready + 620 ms | Loader removed from the DOM. If the loader was shown, focus moves to the h1 (tabindex -1, programmatic focus, visible ring) so keyboard and screen reader users start at the page's main heading (FR-29). If the loader was never shown, focus is left alone. | instant |

Total removal choreography is 620 ms after ready. It is not subject to the 800 ms limit of NFR-9 (that limit is for page transitions) and the page is interactive underneath from "Ready" (the overlay has `pointer-events: none` once `is-done` is set).

The arch is drawn as an inline SVG of about 0.6 KB; its shape is the brand arch (round top, `--radius-arch`). Sizes follow `loader-and-transition.md`: arch 100 by 140 px at 375, 120 by 168 at 768, 140 by 196 at 1440.

### 4.3 Variants

- Reduced motion or paused: the arch is shown with the level fixed at 50 percent, no wave, no dots animation, the word "Loading" as text. When ready: opacity 1 to 0 in 120 ms (`linear`), no lift.
- No WebGL, no JavaScript, Save-Data: unchanged except no JavaScript means no loader (hidden by the `noscript` stylesheet).
- Failure: after 8 seconds the CSS hides the loader whatever the scripts are doing; the page is already visible with the poster (AC-27.5).

### 4.4 Accessibility

- `role="status"`, visible text "Loading" in the page language (Wird geladen, Caricamento, Загрузка). The status text is in the DOM from the first byte so assistive technology announces it; when the element is removed the announcement ends (AC-27.4).
- The loader is `inert` and `aria-hidden` is not used on the status text; the page behind it is not hidden from assistive technology (the loader is an overlay, not a modal; focus is never trapped).
- No flashing: the only repeated changes are a 1.8 s wave and 1.2 s dots at low contrast change.
- Contrast: Foam text on Abyss 15.23 (system.md 4.3). The aqua stroke on Abyss 9.73.
- Nothing essential is only in motion: the word "Loading" carries the meaning.

### 4.5 Budget impact

CSS about 1.2 KB, inline SVG about 0.6 KB, script about 40 lines (milestone classes, ready check, focus move). No 3D, no library. No effect on LCP (the overlay does not delay painting of the poster beneath it). Adds no layout shift (fixed, `position: fixed`, `inset: 0`).

---

## 5. Page transition (swup)

### 5.1 Purpose and trigger

- Purpose: a calm hand over between pages that keeps the JavaScript state alive (the single WebGL context, the 3D chunk) and hides the swap (FR-29b, NFR-9).
- Trigger: activation of a same origin link that swup handles (primary click, Enter on a focused link, back and forward buttons). Links with `target`, `download`, `mailto:`, `tel:`, hash only links and the language switcher's hard locale changes follow swup's default ignore rules (the language switcher is a normal link to the other language's page and uses the transition; the head plugin then sets `html lang` to the new language, and the panel label, announcements, header, navigation and footer all switch language at the swap).
- Prefetch: `@swup/preload-plugin` starts the fetch on pointer down (not hover only), keyboard focus on a link, and touch start. On pointer down the pressed state (M-10) shows in 90 ms.

### 5.2 Storyboard (page ready within the cover time, the best case)

| Time from visit start (t = 0 on pointer down or Enter) | Frame | Easing and duration |
| --- | --- | --- |
| 0 | Visit starts. `html` gets `is-animating is-leaving`. The 3D engine receives `visit:start`: abort any in flight scene fetch (AbortController), stop reading input. | instant |
| 0 to 300 ms | The Abyss panel rises from below the viewport. Its top edge is scalloped (a row of arches, 4.5 rem wide). The page beneath is not animated. | translateY 100% to 0, `--dur-page-exit`, `--ease-inout` |
| 100 to 400 ms | Inside the panel the resort name appears in Prata and below it a gold progress line (sun token, 3 px high, 16 rem or 60 vw wide) fills from 5 to 90 percent. Text fades in over 160 ms starting when the panel covers about a third of the viewport. | line: transform scaleX from left, 700 ms, `--ease-out` |
| 300 ms (earliest) or later when the page is ready | Swap: swup replaces the three containers `#swup-top` (skip link, top concept notice, header with navigation and `aria-current`, language switcher), `#swup-main` (`main`) and `#swup-footer` (concept sentence, legal links, newsletter form with its fresh `formToken`); the head plugin merges the new head (title, description, robots, stylesheets, waiting for new stylesheets such as the Cyrillic font file) and updates `lang` and `dir` on `html`; the panel's "Loading" label takes the new page's language; resets scroll to the top (restores the saved offset on back and forward, kept in memory), the a11y plugin announces the new page and moves focus to the new h1. The engine disposes the old scene and moves the canvas (section 8.7). All of this must fit in one task of at most 50 ms; scene start is deferred (section 5.4). | instant |
| Swap | The progress line completes to 100 percent. | 120 ms, `--ease-out` |
| Swap + 0 to 420 ms | The panel continues upward and leaves through the top (scalloped bottom edge), revealing the new page. | translateY 0 to -100%, `--dur-page-enter`, `--ease-inout` |
| Swap + 420 ms | `is-animating` removed. The new page's poster is already visible; the 3D canvas (if allowed) fades in later by itself (section 8.3). | instant |

Best case total: 300 ms + 420 ms = 720 ms, inside the 800 ms limit (NFR-9, AC-54.1) with a 80 ms margin. The 800 ms counts exit plus entry once the next page is ready; if the page is not ready at 300 ms, the panel holds covered (the line creeps to 90 percent at most) and the entry starts when the page is ready.

### 5.3 Interruption and failure

- A second click during the transition starts a new visit: the panel stays covered, nothing re-animates, the new fetch starts. A developer check: confirm swup 4.10.0 aborts the earlier visit and keeps the leave class; if it does not, set the plugin option so it does and record it in the task report. The page must never be left under a stuck panel.
- Back and forward use the same transition (AC-27.7). The forward button after back shows the cover, swap, lift, focus on the Rooms h1.
- The 8 second rule: a timer started at visit start. If the next page is not ready at 8000 ms, swup is told to abort and the browser performs a normal navigation (`location.assign`). The panel is removed by a CSS animation that ends its visibility at 8000 ms regardless of script state (same pattern as the loader). The visitor then sees the browser's own loading and the target page with its poster (AC-27.5). 3D assets never gate a transition, so a stalled glb cannot hold the panel (the scene simply stays on its poster).
- swup fetch failure (offline, 5xx): hard navigation, the browser shows its own error page. Without JavaScript nothing changes (AC-27.6).

### 5.4 Blocking and cost rules (NFR-9)

- Input blocking at most 100 ms in total (AC-54.2). Definition used in `budgets.md`: the sum of main thread blocking time (long task time above 50 ms per task) between visit start and `is-animating` removed. Budget by step: pointer down handler 5 ms, swap task at most 50 ms (replace of the three containers, head merge and `html lang` update; waiting for a new stylesheet happens before the swap and is not part of the task), scene dispose at most 15 ms, scene start deferred so that none of the 3D work lands inside the 720 ms window. The page behind the panel is not set `inert` and the panel has `pointer-events: none`: the visitor can scroll, press Escape or click again (see interruption). Focus moves only at swap.
- Scene start is deferred: the engine waits for `is-animating` removal plus one idle callback (or 200 ms, whichever first) before importing the new scene module and glb. That is how the transition does not add to the next page's LCP beyond the cover time and how the heap and GPU work stay out of the 720 ms.
- LCP: the new page's poster is painted at the swap. Added delay compared with a plain navigation is bounded by the cover time (300 ms minus how early the page was prefetched). Budget: at most 200 ms added (NFR-9, AC-54.3). If the measurement exceeds 200 ms on L1, the first fallback is to start the swap at 240 ms (panel about 90 percent covered on the `--ease-inout` curve), and the second is to cut `--dur-page-exit` to 240 ms; both keep the 800 ms limit. Recorded as risk R-M2 in section 12.

### 5.5 Variants

- Reduced motion: no panel. the three containers fade out in 60 ms and the new ones fade in over 60 ms (`linear`), as one swap, 120 ms in all (limit 150 ms, NFR-11, AC-56.3). No scroll animation. The same swap, focus and announcement rules apply.
- Paused: instant swap, no panel, no fade (FR-30, AC-28.2).
- No JavaScript: normal navigation, no overlay.
- Panel under `prefers-reduced-transparency` or `forced-colors`: already opaque.

### 5.6 Accessibility

- The a11y plugin announces the new page title through its live region, using announcement wording keyed by the new `html lang` (en, de, it, ru, from the fixed resource files); the panel contains a visually hidden "Loading" in a `role="status"` element while the panel is up (translated, AC-27.4). Announcements stop when the panel is removed.
- Focus lands on the new h1 and is visible (3 px ring). Focus is never trapped; the panel is not a dialog.
- The panel adds no flashing: one monotonic rise, one monotonic leave.
- Contrast on the panel is as on the loader.
- Meaning is never carried by the transition alone: the title, address and focus change tell the visitor where they are.

### 5.7 Budget impact

CSS about 1.0 KB; swup and the four plugins about 15 KB compressed (ADR-0007); hook script about 60 lines. Counts toward the 200 KB limit for JavaScript excluding 3D (NFR-7), together with the rest of the public bundle (about 50 KB planned, `architecture.md`).

---

## 6. Pause motion control and tilt control

### 6.1 Pause motion (FR-30, AC-28.1 to 28.4)

- Placement: in the scene control group of every scene (Home hero, five section scenes), 44 px high, dark backing 0.80, in the corner defined in `scene-areas.md`. On a page with a scene it is the next tab stop after the scene's last text link, so it is reachable directly after the scene text. Pages with no motion longer than 5 seconds do not have it (AC-28.4).
- Label: "Pause motion" / "Resume motion", in the page language (de, it, ru in `motion-and-fallbacks.md`); a button with `aria-pressed`, the visible word changes and the icon changes (never icon only).
- Press feedback: scale 0.97 in 90 ms on pointer down; in reduced motion a colour change. Responding on press: the freeze happens on the pointer down event itself (not on click), so the first frame after the press is already the frozen one.

What "Pause" does, in order, in one task:

1. Sets `data-motion="paused"` on `html` and writes `jcdm-motion-paused=1` to session storage (the only public storage item, FR-15, NFR-15).
2. The engine stops its animation loop. The canvas keeps its last drawn frame (the drawing buffer is presented; no `preserveDrawingBuffer` needed because nothing redraws). The scene clock stops, so a later resume continues exactly where it stopped; on resume the first frame uses `dt` clamped to 1/30 s so nothing jumps.
3. Input handlers for pointer, drag and tilt are ignored; the camera does not move (a frozen frame, AC-28.2).
4. CSS: all running animations pause (`animation-play-state: paused`), transitions become 0 ms, scroll driven effects are switched off by the same attribute selector.
5. A canvas resize while paused renders exactly one frame at the new size (so the frame is not cleared), but advances no time.
6. Swup transitions become instant swaps (section 5.5).

Resume reverses it. If the scene was not loaded (paused on load), Resume runs the capability gate and loads the scene exactly as on a fresh page (section 8.2).

Paused on load, reload or navigation within the tab: poster only, no 3D download, Resume visible (state matrix, section 3).

### 6.2 Turn on tilt (iOS only, FR-27, AC-25.5, A-28)

- Shown only where `DeviceOrientationEvent.requestPermission` exists (iOS and iPadOS Safari) and 3D is running. On other browsers with tilt available without a prompt (Android Chrome), tilt is simply active and no control is shown; the Pause control covers it (paused scene ignores tilt), and no function depends on tilt (WCAG 2.5.4).
- Label "Turn on tilt" / "Turn off tilt" with `aria-pressed`. Translations in the content register (de: Neigung aktivieren, it: Attiva inclinazione, ru: Включить наклон; machine assisted, unreviewed, OQ-8).
- Behaviour: the permission prompt is requested inside the press handler only (a user gesture). Granted: the control becomes "Turn off tilt", tilt drives the view. Denied: the control shows "Tilt unavailable" disabled with `aria-disabled`, touch drag still works. No prompt before the tap (AC-25.5).
- Tilt mapping (proposals): neutral pose captured as the average of the first 500 ms of readings after enabling; `gamma` (left to right) maps 20 degrees to the maximum yaw; `beta` (front to back) 15 degrees to the maximum pitch; values clamped; low pass through `SPRING_INPUT`. Readings are stored by the event handler and applied once per rendered frame.

---

## 7. Micro-interactions

Rule for all of them: transform and opacity only (colour and border colour allowed where stated); respond on press; interruptible; reduced motion and paused versions as in section 3. The build adds a stylelint (or test) rule that fails on `transition` or `animation` of `width`, `height`, `top`, `left`, `margin` or `box-shadow` blur values, see `budgets.md` section 9.

| ID | Element | Trigger | Motion | Duration | Easing | Reduced motion | Tool | Budget impact |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M-10 | Buttons, cards, tiles, scene controls, links styled as buttons | Pointer down, touch start, Enter or Space key down | `transform: scale(0.97)` on `:active`; released by spring back | In 90 ms (`--dur-press`), out 160 ms | in: `--ease-out`; out: `--ease-spring-calm` | Background colour change only, 160 ms | CSS | negligible |
| M-11 | Offer cards, room cards, Explore tiles | Pointer hover (fine pointers only, `@media (hover: hover)`), keyboard focus-visible | Lift `translateY(-4px)` plus image inner scale 1.00 to 1.03; shadow swap by cross-fading two stacked pseudo elements (opacity), not by animating `box-shadow` | `--dur-spring` 520 ms | `--ease-spring-calm` | None; border colour change instead | CSS | negligible |
| M-12 | Header menu panel (below 960 px) | Press on menu button | Panel slides down 8 px and fades in; items are not staggered | `--dur-base` 280 ms | `--ease-spring-calm` in; `--ease-in` out (out 160 ms) | Opacity only, 120 ms | CSS | negligible |
| M-13 | FAQ and disclosure answers | Press on question | Answer opacity 0 to 1 and `translateY(-4px)` to 0; the height change is instant (no height animation); chevron rotates 180 degrees | 280 ms | `--ease-out` | No rotation, no movement; opacity 0 ms | CSS (`<details>` enhanced) | negligible |
| M-14 | Text links, nav items | Hover, focus-visible | Underline colour change and an underline offset change | `--dur-fast` 160 ms | `--ease-standard` | Same (it is colour only) | CSS | negligible |
| M-15 | Focus ring | Focus-visible | Appears instantly (no animation) | 0 ms | n/a | n/a | CSS | none |
| M-16 | Section content blocks below the fold (headings, fact cards, offer cards) | Block enters the viewport | Opacity 0 to 1 and `translateY(16px)` to 0, once. Only where `animation-timeline: view()` is supported, with `animation-range: entry 0% entry 35%`. In other browsers (Safari before 26, Firefox) nothing animates and content is simply visible. Content is never hidden without the supported feature. | scroll linked over 35 percent of the entry range; time based equivalent not provided | `--ease-out` | Removed entirely | CSS scroll driven animation, wrapped in `@supports (animation-timeline: view())` | negligible |
| M-17 | Arch media image (Home overview, room detail hero) | Block enters the viewport | Image inside the arch scales 1.06 to 1.00 as it enters, once | 480 ms equivalent (scroll linked range `entry 0% entry 50%`) | `--ease-out` | Removed | CSS scroll driven | negligible |
| M-18 | Gallery lightbox | Press on thumbnail; swipe, arrow keys, Escape | Open: image grows from the thumbnail's box to the viewport (FLIP: `transform` and `opacity` only), scrim fades in. Close: reverse to the thumbnail, same path (spatial consistency). Swipe: the image tracks the finger 1:1 (pointer capture), grab offset respected; on release the next or previous image is chosen from the projected rest point (velocity times 0.998 decay form, section 8.5) and a spring (damping 0.8, response 0.4, flick token `--ease-spring-flick`) finishes with the release velocity; a rubber band resists at the first and last image | Open 280 ms; close 220 ms; swipe settle 520 ms (`--dur-spring`) | open `--ease-out`; close `--ease-in`; swipe `--ease-spring-flick` | Open and close are a 120 ms opacity change; swipe changes image with a 120 ms cross fade and no tracking movement beyond the drag itself | CSS for open and close; `motion` `animate` for the swipe settle | `motion` about 20 KB at most (ADR-0007), counted in the 200 KB limit; none if built without it |
| M-19a | Form field error message | Validation fails (on blur or submit) | Message fades in 4 px from above; the field border changes colour; the summary at the top receives focus (no shake) | 160 ms | `--ease-out` | Fade only, 0 ms | CSS | negligible |
| M-19b | Form submit "sending" state | Submit press | Button shows pressed state at once; a thin gold line (the same as the transition progress line) runs at the button's bottom edge (scaleX 0.05 to 0.9, 700 ms, `--ease-out`, one shot, not looping) | 700 ms | `--ease-out` | Static line at 50 percent | CSS | negligible |
| M-19c | Form success | Server returns the success page or message | Success icon draws its stroke (stroke dashoffset), then the message fades in | 480 ms | `--ease-out` | Icon shown at once | CSS | negligible |
| M-20 | Scene controls appearing | First 3D frame rendered | Controls fade in and rise 4 px | 160 ms | `--ease-out` | n/a (controls absent) | CSS | negligible |
| M-21 | Language list, Book now block, concept notice | any | No animation (the notice must stay still and readable) | n/a | n/a | n/a | n/a | none |
| M-22 | Admin portal | any | Only M-10, M-13, M-14, M-15, M-19. No scene, loader or transition in the admin (the admin is a separate document set, not served through swup) | as above | as above | as above | CSS | none |

Notes:

- Anything that loops for more than 5 seconds is a 3D scene or the loader (section 4); no micro-interaction loops. That is why the Pause control exists only where 3D exists.
- Sound and haptics: none. The design adds no audio (autoplay audio is excluded) and no vibration.

---

## 8. The 3D engine contract (shared by all six scenes)

### 8.1 Files and responsibilities (design level)

One engine, six scene modules, per ADR-0007 and `architecture.md` section 13.

| Part | Responsibility |
| --- | --- |
| Capability gate | Decides 3D or poster before any 3D byte is requested |
| Loader of scenes | Imports the 3D chunk, the scene module and the scene's glb; owns the AbortController |
| Engine | One `WebGLRenderer`, one canvas, one animation loop, input model, governor, visibility handling, disposal |
| Scene module (one per page) | `build(gltf)` returns `{ update(dt, input, scroll), setQuality(step), dispose() }` and nothing else; knows nothing about swup |
| Shared shader library | Sky, water, glow, cloth, soft point sprite (original GLSL, each under 2 KB) |

### 8.2 Capability gate (NFR-12)

Run in this order; any failure leaves the poster and requests nothing:

1. Reduced motion media query true.
2. Visitor paused (session key present).
3. `Save-Data` on, or `navigator.connection.effectiveType` is `2g` or `slow-2g` (browsers without that API pass this step).
4. The gate creates the engine's own canvas and calls `getContext('webgl2', { antialias })` on it (the antialias choice is made here, see 8.6). This costs no 3D code. If it succeeds, that same context is later handed to three's `WebGLRenderer` (the `canvas` and `context` options), so no second context is ever created and nothing needs a forced context loss. If a later step fails (the glb will not load, for example), the canvas is dropped and the context is released with it.
5. The adaptive rule has not triggered earlier in this tab (flag in memory).

The check re-runs when the visitor presses Resume, when the reduced motion setting changes live, and on every swup navigation (for the new page's scene).

### 8.3 Loading sequence and the timeline of one scene

| Step | When | What | Notes |
| --- | --- | --- | --- |
| 0 | HTML arrives | Poster `<img>` (the LCP element, `fetchpriority="high"`, explicit width and height) is in the slot; `data-scene` and `data-poster` attributes present | CSS reserves the box, so nothing shifts later (AC-25.4) |
| 1 | Poster has painted (LCP candidate reported, or `img.decode()` resolved plus one frame) | Gate runs. If OK, `import()` the 3D chunk and fetch the scene glb in parallel | Earlier than "after load and idle" in ADR-0007 step 4; NFR-7 only requires after text and poster have rendered. Decision D3 |
| 2 | Chunk and glb arrived | Parse with `GLTFLoader` plus `MeshoptDecoder` (main thread, no worker, ADR-0007). Scene build and shader compile are sliced into tasks of at most 50 ms with a yield between slices (`scheduler.yield()` if present, else `setTimeout(0)`); `compileAsync` where `KHR_parallel_shader_compile` exists | Keeps TBT and INP clean |
| 3 | Scene built | Render one frame offscreen of the canvas (canvas is `opacity: 0`). That frame uses the poster pose `t0` | "First rendered frame" for NFR-8 and AC-53.3 is this render |
| 4 | Next animation frame | Canvas fades in over the poster, `T_FADE` 480 ms, `--ease-out`. Scene controls appear (M-20). The poster stays underneath (needed for context loss recovery) | The canvas has the same box and explicit size as the poster |
| 5 | End of fade | Ambient motion ramps from zero amplitude over `T_RAMP`; the scene's one shot signature moment starts | The fade and ramp together make the hand over from still image to live scene unnoticeable |

The first frame of every scene must match its poster (decision D7): posters are rendered from the real scene at pose `t0` by the same build step, see 8.9.

Scene errors after load (shader failure, glb parse error, thrown exception in `update`): the engine catches it, removes the canvas (`hidden`), shows the poster again, hides the scene controls, and sets the in memory fallback flag for that scene. No message (matches `scene-areas.md`).

### 8.4 Framing rule: the canvas shows exactly what the poster's CSS crop shows

Posters are `object-fit: cover` images (1600 by 1000 landscape for all, plus 800 by 1200 portrait for Home below 960 px). The canvas must not reframe the picture when it fades in. Rule:

1. Each scene is composed on a reference frame: 16:10 landscape (1600 by 1000), and for Home only also 2:3 portrait (800 by 1200). The reference camera (position, target, field of view) is part of the scene definition.
2. At runtime compute the same crop rectangle as CSS `cover` with the poster's `object-position` (default 50 percent 50 percent; the `pos-right` class used at 375 px uses 85 percent 50 percent) for the real box size.
3. Apply it with `camera.setViewOffset(refWidth, refHeight, cropX, cropY, cropWidth, cropHeight)`. The canvas then shows the same pixels as the poster, for every box size, with no extra code per page.
4. A section scene's box is wide (about 1440 by 576, 2.5:1). Only the middle 64 percent of the reference frame is visible, so all section scene content is composed inside the "safe band": the horizontal strip from 18 percent to 82 percent of the reference frame's height. Nothing important lives outside it.
5. The free scene space (the part not under the scrim) is respected: bright and moving content stays in the right 56 percent (Home 1440), right 40 percent (section scenes), upper 48 percent (Home 375 and 768), see `scene-areas.md`. Moving elements may cross the left part only under the scrim and only slowly.

### 8.5 Input model (all in the engine; scenes receive a normalised `input = {x, y}` in the range -1 to 1)

| Input | Mapping (proposals) | Spring | Notes |
| --- | --- | --- | --- |
| Mouse pointer move (fine pointer) | `x`, `y` from pointer position over the scene's box; no effect while the pointer is outside it | `SPRING_INPUT` | Response is continuous: the target changes on every pointer event, the spring follows (feedback is continuous, never end only) |
| Touch drag, horizontal | 1:1 contact: 0.06 degrees of yaw per pixel up to the limit; vertical movement is not captured | `SPRING_INPUT` while touching | `touch-action: pan-y` on the canvas wrapper so vertical swipes scroll the page (AC-25.2). The canvas never calls `preventDefault` on touch. Grab offset is respected: motion starts from the current pose, not a centre jump |
| Release | The release velocity is projected with the exponential decay form `p = v / 1000 * 0.998 / (1 - 0.998)` (apple-design, momentum projection), clamped to the limit, then after 2.5 s without input the view eases back to neutral | `SPRING_RETURN` | Momentum only when a flick preceded it |
| Limit | Maximum yaw/pitch from the table below; past the limit the rubber band `r = (d * D * 0.55) / (D + 0.55 * |d|)` (D = 40 degrees) resists | n/a | Hard stops read as frozen |
| Device tilt | Section 6.2 | `SPRING_INPUT` | Android Chrome: active without prompt; iOS: after the labelled control |
| Scroll (section scenes, and Home) | `s` = clamp(scrollY / sceneHeight, 0, 1) while the scene is on screen; read once per frame in the loop (passive listener not needed) | `SPRING_SCROLL` | Parallax only: the page scrolls normally and the scene never captures scroll (NFR in `scene-areas.md`). Scroll maps to camera dolly and light position, see each scene |
| Keyboard | No keyboard control of the scene | n/a | The canvas is not focusable and not in the tab order (no trap, NFR-2) |

Maximum view offsets (degrees of yaw / pitch) and translation: Home 3.5 / 2.0 and 0.35 m; section scenes 2.0 / 1.2 and 0.2 m. These are deliberately small: they give a sense of depth (parallax), not a camera the visitor must operate (vestibular safety, section 10).

Springs are critically damped (damping ratio 1.0) everywhere: the step is `a = w*w*(target - x) - 2*w*v` with `w = 2*pi / response`. No bounce, because no motion in the scenes follows a flick that needs it. Time based events (signature moments, drift) are driven by the scene clock and the easing tokens.

### 8.6 Quality governor (NFR-8 adaptive rule; numbers in `budgets.md` section 7)

- Starting state: step 0 or the step reached earlier in this tab.
- Every 2 seconds the engine takes the median frame time of that window. Above 22 ms: go down one step (up to step 3). A step takes effect on the next frame; the next evaluation window starts after the step. No automatic step back up in the same tab (avoids oscillation, which is itself a visible flicker).
- At step 3, if the median frame time stays above 33 ms for 3 consecutive seconds: set the in memory fallback flag, remove the canvas, show the poster and hide the scene controls. The flag survives swup navigations (the next scenes are not started) and is lost on a full reload.
- Frame cap: the loop skips frames to hold 60 fps on 90 and 120 Hz screens (the reference phone R1, Galaxy A54, has a 120 Hz display). Saves heat and battery; proposal.
- Pixel ratio: `min(devicePixelRatio, cap) * renderScale`, cap 1.5 on touch devices (`(any-pointer: coarse)` true) and 2 elsewhere (NFR-8); floor of 0.75 for the product. Changing it resizes the drawing buffer only, never the CSS size, so there is no layout shift. `antialias` is chosen once when the context is created: on only if `devicePixelRatio < 1.5`, because high density screens hide aliasing and MSAA costs bandwidth.
- Visibility: render nothing, and run no timers, while `document.hidden`, or while the scene box is fully outside the viewport (`IntersectionObserver`, threshold 0). Zero frames in the following second (AC-53.5). On return, resume with `dt` clamped.
- Context loss: `webglcontextlost` calls `preventDefault`, stops the loop, waits up to 3 seconds for `webglcontextrestored`; on restore, rebuild the scene; otherwise fallback (NFR-12, AC-57.2).

### 8.7 Disposal on navigation (memory; NFR-8, AC-53.6)

The renderer and canvas live for the whole tab session (one WebGL context). Each scene must leave no trace.

On `visit:start`: abort pending fetches; stop input; remove the scene controls' listeners.

On content replace (inside the covered phase of the transition):

1. Stop the loop and cancel any timers and animation frame requests.
2. Call the scene's `dispose()`: remove every event listener registered with the scene's `AbortSignal`; traverse the scene graph and call `dispose()` on every geometry, every material, every texture in every material slot and in every shader uniform (`map`, `alphaMap`, data textures built at runtime), every `InstancedMesh` and every `Points` object; remove children; drop the references to the glTF result, the scene, the camera and any typed arrays; revoke any blob URLs this scene created (the glTF loader's image blob URLs are revoked by three after load; the scene module must not create any of its own without revoking).
3. `renderer.renderLists.dispose()`; clear the canvas once (`renderer.clear()`) while it is hidden (`opacity: 0`).
4. Move the canvas element into the new page's scene slot (or detach it to a hidden parent when the next page has no scene; the renderer and its context stay alive but idle).
5. Verify in test builds: `renderer.info.memory.geometries` and `renderer.info.memory.textures` are both 0 after step 3 (these counters are exact). Test hook only, see `budgets.md` section 9.

Do not call `renderer.dispose()` or force context loss on navigation: it would destroy the single context and force a rebuild of shader programs for every page. The meshopt decoder module (a small WebAssembly instance, kept once) and the shader library programs are kept; each scene's own programs are released when their materials are disposed.

Targets: after 20 navigations among the six scene pages, JS heap growth after a forced garbage collection at most 25 MB (NFR-8, AC-53.6), proposal target 10 MB; never more than one WebGL context at any step.

### 8.8 Shared visual language: "Driftwood and Lagoon" stylised diorama (decision D1)

RSK-20 already recommended a stylised low polygon direction. This spec follows it, because it fits the brand (the arch motif is geometric), keeps assets original and tiny (FR-31), and holds the frame rate on mid range phones. Photographic realism is not attempted; richness comes from light, colour, depth and slow motion.

- Units: 1 unit = 1 metre. Y up. Right handed. Origin at the water level at the viewer's feet.
- Shading: flat shaded arches and architecture (crisp facets echo the brand), smooth gradients for sky and water. No shadow maps anywhere (cost). Ambient occlusion is baked into vertex colours in Blender. Soft contact shadows under furniture and boats are small dark gradient quads built from a runtime generated 64 by 64 data texture (no download).
- Materials in the glb are authored as Principled BSDF with roughness 1 and metallic 0 and named `m_<role>`. At load the engine replaces them: `m_*` with vertex colours become `MeshLambertMaterial` (vertex colours on, `flatShading` true for roles `arch`, `wall`, `furniture`); `m_glow_*` become `MeshBasicMaterial` with additive blending where noted; water, sky, cloth and glow planes use the shared shaders. Cost: no PBR in any scene. No `MeshStandardMaterial`, no transmission, no environment map (so no HDR file at all, LR-39).
- Lights: one `DirectionalLight` (the sun) and one `HemisphereLight` per scene; no point lights (fake glows use additive sprites). No tone mapping (`NoToneMapping`), `outputColorSpace` sRGB; colours are authored to be final.
- Fog: linear fog tinted to the horizon colour of each scene to melt distant geometry (also hides low detail).
- Palette (tokens from `system.md` 4.1 for the architecture, plus scene only sky colours derived from them, proposals; these are not text colours, so the contrast tables do not apply):

| Role | Colour |
| --- | --- |
| Deep water | Abyss `#0C2229` to Deep `#123642` |
| Shallow water | Lagoon 700 `#0B6B6E` to Lagoon 500 `#1E8F90` |
| Foam, highlights | Aqua 100 `#D5F0EC` and Foam `#F3F7F6` |
| Architecture, sand | Sand 200 `#E6D9C3` and Sand 100 `#F0E8DA` |
| Wood, posts, furniture | Driftwood `#453536` and a lighter tint `#6B5757` |
| Sun, lantern glow | Sun `#E8B04B` with a core `#FFE2A8` |
| Sky top, dusk | `#1B3A4B` (proposal) |
| Sky horizon, dusk | `#F2C48D` (proposal, a warm peach between Sun and Sand 200) |

- Arch construction (used in five of the six scenes): a round arch of width `W`, height `H`, wall thickness `T`, depth `D`: outline = rectangle `W` wide from `y = 0` to `y = H - W/2`, topped by a half circle of radius `W/2` (24 segments in the foreground, 16 for distant arches, 12 for tiny ones). The opening is the same outline inset by `T`. Extrude along `D`. This matches `--radius-arch` (round top, square bottom).
- Procedural water (all scenes with a sea): a grid plane with a vertex shader summing four travelling sine waves (direction, wavelength, amplitude set per scene) and a fragment shader mixing depth colour, a sky reflection by a Fresnel term, and a sun glint term thresholded from the analytic normal plus a hash noise. No water texture.
- Procedural sky: one screen aligned quad (2 triangles) at the far plane with a vertical gradient between the two sky colours and an analytic sun disc and glow.
- Flash safety: every repeating luminance change in any scene has a period of at least `MIN_PERIOD` 1.5 s and a small amplitude; glint sparkles are individually slow (fade in and out over at least 1.2 s each) and no more than 4 percent of the canvas area changes brightness at the same moment. One time events (light sweeps, ripples, glows) last at least 600 ms. This keeps the scenes under the WCAG 2.3.1 threshold with a wide margin (section 10).
- Vestibular safety: no rotation of the whole view beyond the limits in 8.5, no zoom larger than 6 percent in total, no parallax faster than 0.1 m/s, no sway loop between 4 and 6 seconds (the drift uses two incommensurate periods of 31 s and 47 s with amplitude at most 0.6 degrees yaw and 0.3 degrees pitch).

### 8.9 Authoring pipeline, originality and licences (FR-31, LR-39)

Everything that goes into a scene is made by the agency from nothing but mathematics and Blender primitives. No scan, no stock model, no HDRI, no downloaded texture, no photograph.

| Layer | How it is made | Shipped as | Record |
| --- | --- | --- | --- |
| Models | A Blender 4.x LTS Python script per scene (`3d/source/<scene>/build_<scene>.py`) creates the meshes from primitives, curves, array and bevel operations with fixed random seeds, bakes ambient occlusion into vertex colours, and exports glTF binary. The script and the saved `.blend` are the editable source. | `<scene>.glb`, optimised by the pipeline in ADR-0007 (glTF Transform: join, weld, simplify off, quantise, meshopt, WebP textures) | Asset register id `3D-<scene>-GLB`; source files listed |
| Textures | Small tileable detail maps generated by the same script (Blender procedural noise baked to an image), 256 by 256 or smaller except the Home cloud strip at 512 by 128, lossless or q85 WebP, embedded in the glb | inside the glb | `3D-<scene>-TEX` |
| Runtime content | GLSL shaders (sky, water, glow, cloth, points), generated data textures (soft disc, contact shadow, noise), all written for this project | inside the 3D chunk | `3D-SHADERS`, `3D-RUNTIME-TEX` |
| Posters | Rendered from the scene itself at pose `t0` with the engine in a test build (headless Chromium, software rendering is fine for a still), encoded to WebP and AVIF with explicit width and height | `.avif`, `.webp` in `<picture>` | `POSTER-<scene>` |
| Environment maps | None used | n/a | n/a |
| Tools | Blender (GPL-3.0-or-later; authoring only, its output is not covered), glTF Transform and meshoptimizer (MIT) | not shipped | ADR-0007 table |

Rules:

- No texture larger than 512 pixels on any side. Tiled detail maps are sized for their on screen use (a repeated 256 by 256 tile at 4 repeats across a 1440 px canvas stays crisp enough for a stylised look).
- Every glb must pass the Khronos glTF validator with no errors and no external URIs (G-18); all `m_*` material names present; no animation tracks are required (all motion is in code), keeping the file smaller.
- Each scene loads only its own glb (FR-31, AC-26.3). Six different root files: `home.glb`, `rooms.glb`, `dining.glb`, `pools.glb`, `activities.glb`, `location.glb`. The shader library and runtime textures are code, shared by the engine, and are not assets of any scene.
- The authorship and licence statement (AC-29.2) must say that models, textures and shaders were made by the agency, name the tool chain, state that AI assistance was used in writing the generation scripts if that is the case (LR-36 recommends recording the generating tool), and record that no recognisable third party work, person or real building was reproduced. The "marker arch" and all arch shapes are original geometry, not a copy of any logo, building or the resort's real architecture.

### 8.10 Poster generation and match check

Each poster is a render of the scene's first frame at `t0` (all ambient amplitudes zero, signature moment not started), so that the crossfade has no visible change. The build step renders the two crops (Home also the portrait). Check (proposal): the mean absolute difference between the poster and a screenshot of the canvas's first frame, over the free scene space only, is at most 6 percent of full scale at 1440 by 900 and 390 by 844. Measurable in the cloud workspace.

---

## 9. The six scenes

Common to all six: canvas `aria-hidden="true"`, not focusable; text alternative given below (used as the poster `alt` on the five section pages, see decision D8; the Home poster keeps an empty `alt` as designed in `home.md`, the sentence is still the description used by the accessibility review); reduced motion, no WebGL, Save-Data, paused on load and no JavaScript all give the poster (section 3); scene controls as in section 6.

Common start sequence: sections 8.3 to 8.6. Intro times below count from the end of the 480 ms fade (t = 0 is the first frame at full opacity).

Triangle and draw call figures are step 0 estimates from the geometry plans, with a ceiling I propose; the requirement caps are 150,000 triangles and 100 draw calls (NFR-8, AC-53.2). Glb sizes are estimates against a first frame payload ceiling of 80 KB per glb, see `budgets.md`.

### 9.1 Scene 1: Home hero, "Dusk lagoon"

- Page and slot: Home, first section, box `clamp(36rem, 88svh, 54rem)` high, full width. Poster `poster-home` (1600 by 1000) and `poster-home-portrait` (800 by 1200 below 960 px). Root file `home.glb`.
- Purpose: the immersive first impression of the Red Sea setting (FR-27, brief "Immersive").
- Signature moment: at dusk the three arches on the horizon light up one after another as the poster comes alive, and the sun's gold path across the water follows your pointer, finger or tilt.
- Text alternative: "A calm lagoon at dusk. The low sun lays a gold path across the water toward three stone arches standing on the horizon."
- Trigger: poster painted and gate passed (section 8.3).
- Free scene space: 1440 right 56 percent; 375 and 768 the upper 48 percent. Sun and arches sit there on both references; the water below them runs under the text and scrim.

Procedural content plan (starting values, tuned by eye at camera review; budgets must hold):

| Element | Build recipe | Triangles | In glb |
| --- | --- | --- | --- |
| Sky | Full frame quad, gradient `#1B3A4B` to `#F2C48D`, sun disc and glow in the shader. Sun direction: 8 degrees right of the view axis and 4 degrees above the horizon | 2 | no (code) |
| Clouds | One instanced mesh of 6 thin quads (3 to 8 m wide, at 90 to 140 m), alpha from the 512 by 128 cloud strip; drift 0.4 m/s to the left; wrap around outside the view | 12 | texture yes |
| Water | Grid plane 80 by 48 m, 96 by 56 segments, 4 wave sum (wavelengths 7, 11, 17, 5 m; amplitudes 0.06, 0.04, 0.03, 0.015 m). Colour mix Abyss far to Lagoon 700 near, Fresnel toward the sky colour, a glint band centred under the sun | 10,752 | no (code) |
| Three arches | Arch recipe with W / H / T / D = 3.2 / 5.0 / 0.45 / 0.8 at (2.0, -34), 3.6 / 5.8 / 0.5 / 0.9 at (6.4, -44), 4.0 / 6.4 / 0.55 / 1.0 at (11.5, -56); 24 segment half circles; stepped plinth in the water; Sand 200 and Sand 100 vertex colours with baked occlusion; flat shaded | 1,260 | yes |
| Arch glow | One quad per arch filling the opening, additive, vertical gradient Sun core to Sun to transparent, intensity driven by a uniform | 6 | no (code) |
| Sandbar and dunes | 3 low poly dune bodies on the left horizon, Sand 200 vertex colours graded to the fog colour | 1,400 | yes |
| Far ridge | Eastern Desert mountain silhouette strip, 640 triangles, Deep to fog gradient | 640 | yes |
| Felucca | Hull 300 triangles, lateen sail 2 by 60 triangles, mast 40; Driftwood hull, Sand 100 sail; sails slowly across the middle distance from right to left in 150 s then re-enters after a wrap hidden beyond the fog; gentle bob (0.04 m, two incommensurate periods) | 520 | yes |
| Jetty posts | 8 weathered posts and a rail in the left foreground corner, Driftwood vertex colours | 700 | yes |
| Sparkle particles | 120 soft points (Points, additive, size 2 to 5 px at 1x) drifting up 0.05 m/s through the warm light on the right; each fades in and out over 2 to 4 s | 0 (points) | no |
| Contact shadows | Under the felucca and plinths, 4 small quads | 8 | no |

Materials: `MeshLambertMaterial` with vertex colours (arches, dunes, ridge, boat, posts); shader materials for sky, water, glow, clouds, points.

Lights: HemisphereLight sky `#7FD6CF` at 0.5 over ground `#123642` at 0.35; DirectionalLight `#FFD9A0` at 1.1 from the sun direction; fog colour `#C98F6E` near 40 m to 160 m.

Camera: reference frame 16:10, position (-1.5, 1.4, 14), target (3.0, 2.4, -50), vertical field of view 32 degrees; portrait reference 2:3 with position (0, 1.6, 15), target (4.5, 4.0, -50), field of view 38 degrees, so the arches and sun sit in the upper 48 percent.

Storyboard (t = 0 at full opacity of the canvas):

| Time | Frame | Easing |
| --- | --- | --- |
| 0 | Identical to the poster: still water, three dark arches against the peach horizon, sun low. | n/a |
| 0 to 1.2 s | Wave amplitude, glints and particle opacity ramp up from zero; the water starts to move. | `--ease-out` (`T_RAMP`) |
| 0.4 s to 1.0 s | Arch 1 glow rises over 600 ms, arch 2 starts at 0.7 s, arch 3 at 1.0 s (each 600 ms to full): the three arches fill one after another with warm light, nearest first. The glint band on the water brightens by 25 percent over the same 1 s. | `--ease-out`, 600 ms each |
| 0 to 3.6 s | The camera dollies 6 percent toward the arches (position moves 0.84 m along the view axis) while drifting 0.2 degrees right. It then stops. | `--ease-out`, 3.6 s |
| 3.6 s onward | Idle life, no end: waves, glints, particles, clouds, the felucca crossing, camera drift (31 s and 47 s periods, at most 0.6 degrees). Visitor input adds the view offset of section 8.5; the glint band slides under the sun position as the camera yaws, so "the gold path follows" the visitor. | continuous |
| Scroll | As the hero scrolls away, the camera dollies a further 3 percent and the sun sinks 2 degrees (scroll position 0 to 100 percent of the hero height). | `SPRING_SCROLL` |

Interaction: pointer, drag, tilt, scroll as in 8.5 with the Home limits.

Reduced motion: poster only. No WebGL, Save-Data, paused on load: poster only; hero text and links identical (AC-57.3).

Pause behaviour: freezes at the current frame (including a half lit arch if paused during the intro); resume continues the intro from that point.

Accessibility: text over the scene sits on the Abyss scrim, 0.84 or more; the sun and glints stay in the free space; sparkle changes follow the flash rules in 8.8; no function depends on interaction.

Tool: three, ShaderMaterial. CSS only for the fade.

Budget impact (step 0): about 15.3k triangles (ceiling 24k), 11 draw calls (ceiling 20), glb about 60 KB, one 512 by 128 texture (about 8 KB), 120 particles; first frame within 4 s on L1 by the arithmetic in `budgets.md` 6. Quality steps: step 1 halves particles, drops wave 4 and the glint noise octave; step 2 removes particles and clouds, 2 waves only; step 3 drops the felucca update and the arch glow gradient to a flat fill.

### 9.2 Scene 2: Rooms and suites, "Arched balcony"

- Page and slot: Rooms and suites overview, box `clamp(22rem, 56svh, 36rem)`. Poster `poster-rooms`, crop `pos-right` at 375. Root file `rooms.glb`.
- Purpose: suggest the feeling of waking up behind arched balcony openings with the sea beyond, without showing any real room (FR-28).
- Signature moment: a pane of golden evening light slides once across the three arched openings while the curtain in the middle one breathes in the sea air, and reflected water light starts to ripple on the ceiling.
- Text alternative: "Evening light falls through three arched balcony openings onto a pale floor, with the sea shimmering beyond."
- Free scene space: right 40 percent; 375 bottom 45 percent is scrim and text, so the camera frames the openings toward the right edge.

Procedural content plan:

| Element | Build recipe | Triangles | In glb |
| --- | --- | --- | --- |
| Arcade wall | One extruded wall 11 m wide, 5.6 m high, 0.5 m deep with three arch openings (W 2.6, H 4.4, 20 segment half circles, 0.8 m piers); Sand 100 vertex colours, baked occlusion in the reveals | 1,500 | yes |
| Floor | 24 by 12 grid with a terrazzo vertex colour pattern from the generator (Sand 200, Sand 100, speckles in Driftwood tint), plus 2 inlay stripes | 776 | yes |
| Soffit and beams | Ceiling plane with 3 shallow barrel vault bays and 2 beams in Driftwood; its fragment shader adds the moving water reflection pattern (two crossing sine lattices, Aqua 100 at 12 percent) | 600 | yes + shader |
| Curtain | Single 20 by 40 grid cloth hanging in the middle opening, vertex shader sine displacement (amplitude 0.05 m, travelling, period 7 s and 11 s), Foam colour, rim light tint | 1,600 | no (grid in code) |
| Daybed and table | Low daybed (box, 2 cushions, 4 legs) and a round side table (lathe, 16 segments); Driftwood and Foam | 820 | yes |
| Pendant lamp | Lathe, 20 segments by 12 rings, hanging in the middle bay; glow sprite beneath | 480 | yes |
| Olive in a pot | Low poly trunk and 5 cloud shaped leaf clumps in a Sand 200 pot, left of the first opening | 500 | yes |
| Sea beyond | Water plane 30 by 15 m, 24 by 12 segments, same water shader at lower amplitude and a wide glint | 576 | no |
| Sky | Shared quad, dusk gradient | 2 | no |
| Light shafts | 3 additive quads, one per opening, slight angle from the sun, Sun at 18 percent | 6 | no |
| Light patch | The sun pane on the floor and piers: computed in the floor and wall fragment shaders from the analytic arch outline (the arch signed distance function with a soft edge), shifted by a uniform `uSweep` | 0 | shader |

Materials: Lambert with vertex colours and flat shading (wall, floor, furniture); shaders for curtain, ceiling and sea.

Lights: Hemisphere sky `#F2C48D` 0.45 over ground `#E6D9C3` 0.3; Directional `#FFD9A0` 1.0 from the right, grazing 12 degrees; fog `#E8C9A0` 18 m to 70 m.

Camera: reference 16:10, position (0.6, 1.5, 7.5), target (1.8, 1.9, -2), field of view 34 degrees; safe band keeps the three openings and the floor.

Storyboard:

| Time | Frame | Easing |
| --- | --- | --- |
| 0 | Poster pose: the light pane already sits at the left edge of the first opening; curtain still. | n/a |
| 0 to 1.2 s | Curtain, sea and ceiling reflection ramp from still to moving. | `--ease-out` |
| 0.5 s to 8.5 s | The golden light pane crosses left to right: `uSweep` runs from -1.2 to +1.2 over 8 seconds, sliding across opening 1, opening 2, opening 3 on the floor and piers, lengthening and warming as it goes (Sun at 100 percent hue shift of 6 percent toward orange). Once only. | `--ease-inout` |
| 2.0 s to 5.0 s | The curtain's breathing amplitude eases from 0.02 to 0.05 m as the light reaches the middle opening, then settles to 0.035 m. | `--ease-standard` |
| 8.5 s onward | Idle: ceiling water ripple (travelling, slow, period 9 s), curtain, sea glints; the light pane rests on the right pier at 0.4 intensity. | continuous |
| Scroll | The camera dollies 0.5 m toward the openings and the light shafts lengthen as the visitor scrolls past the scene. | `SPRING_SCROLL` |

Interaction: pointer and drag parallax (limits 2.0 / 1.2 degrees, 0.2 m); tilt on supported devices.

Fallback and reduced motion: poster only. Pause: freezes the light pane wherever it is; resume continues the sweep.

Accessibility: the pane of light is large, slow and warm; no flashing; the text sits on the left scrim; nothing informational is in the scene.

Tool: three, ShaderMaterial for curtain and ceiling.

Budget impact (step 0): about 6.9k triangles (ceiling 18k), 10 draw calls (ceiling 18), glb about 55 KB, one 256 by 256 plaster tile (about 10 KB), no particles. Steps: step 1 halves the curtain grid update rate; step 2 removes the ceiling ripple and shafts; step 3 renders the sea as a flat gradient.

### 9.3 Scene 3: Dining, "Terrace at dusk"

- Page and slot: Dining, same box as Rooms. Poster `poster-dining`. Root file `dining.glb`.
- Purpose: evoke long dinners by the sea (FR-28).
- Signature moment: the terrace lanterns kindle one by one along the string, and each one draws its own long soft streak of light across the water.
- Text alternative: "A terrace of round tables at dusk, with paper lanterns glowing along a string above the sea."
- Free scene space: right 40 percent: tables and lanterns.

Procedural content plan:

| Element | Build recipe | Triangles | In glb |
| --- | --- | --- | --- |
| Deck | 12 planks (5.2 m by 0.28 m, 1 cm gaps), Driftwood with per plank colour variation; substructure box | 244 | yes + 256 by 256 grain tile |
| Arcade parapet | 5 arches (W 2.2, H 3.4, T 0.3, D 0.5) as a low sea wall with the sea visible through them, Sand 200 | 1,300 | yes |
| Tables | 5 round tables, top disc 24 segments, pedestal | 550 | yes |
| Chairs | 14 chairs with arch shaped backs, 70 triangles each | 980 | yes |
| Lanterns | 9 lanterns on the string: lathe 12 segments by 8 rings, glass part Sun at emissive 0.6, Driftwood cap | 1,710 | yes |
| String of lights | Catenary tube 6 sides by 48 segments across the terrace | 576 | yes |
| Planters | 4 lathe planters with low poly herbs | 400 | yes |
| Sea | 40 by 20 m grid, 40 by 20 segments, water shader at low wave amplitude, no sun (the sun has set); glint comes from lantern positions | 1,600 | no |
| Headland | Far silhouette in Deep | 500 | yes |
| Sky | Shared quad, deeper dusk: top `#0E2A38`, horizon `#B97A5E` (proposal) | 2 | no |
| Lantern glows | 9 additive sprites (quads) with a soft disc | 18 | no |
| Reflection streaks | 9 vertical gradient quads on the water below each lantern, additive, stretched, wobbled by a slow noise | 18 | no |
| Motes | 60 slow points (fireflies like dust) near the lanterns | 0 | no |

Lights: Hemisphere `#7FD6CF` 0.28 over `#123642` 0.2; Directional `#F2C48D` 0.35 low from the right (afterglow); vertex baked warm light near each lantern (a second colour set from the generator) gives the deck its warm pools without real lights; fog `#6A5560` 20 m to 90 m.

Camera: reference 16:10, position (-0.5, 1.7, 9), target (1.5, 1.4, -6), field of view 36 degrees.

Storyboard:

| Time | Frame | Easing |
| --- | --- | --- |
| 0 | Poster pose: deck, tables, lanterns dark; sea dark violet with a peach horizon. | n/a |
| 0 to 1.2 s | Sea and motes ramp from still. | `--ease-out` |
| 0.5 s to 3.3 s | Lanterns kindle from left to right, one every 350 ms, each rising to full glow over 700 ms; its water streak extends from nothing to full length over 900 ms with it. Total 3.3 s. Once only. | `--ease-out` |
| 3.3 s onward | Idle: each flame breathes with band limited noise (amplitude plus or minus 6 percent, no component faster than 0.6 Hz); streaks wobble; motes drift. | continuous |
| Scroll | Camera pulls back 0.4 m and rises 0.15 m, revealing more of the sea. | `SPRING_SCROLL` |

Interaction: pointer and drag parallax; streaks shift slightly with the view.

Fallback, reduced motion, pause: poster only; pause freezes flames and any half lit lantern.

Accessibility: lantern flicker is slow and low amplitude (flash safety 8.8); the scrim covers text; no information in the scene.

Tool: three.

Budget impact (step 0): about 7.9k triangles (ceiling 18k), 12 draw calls (ceiling 20), glb about 65 KB, one 256 by 256 tile (about 10 KB), 60 particles. Steps: step 1 halves motes, drops streak wobble; step 2 removes motes and streaks; step 3 lanterns use a static glow.

### 9.4 Scene 4: Pools and beach, "Where the pool meets the sea"

- Page and slot: Pools and beach, same box. Poster `poster-pools`. Root file `pools.glb`.
- Purpose: show an infinity pool edge meeting the sea, with simple loungers (FR-28).
- Signature moment: a slow wave runs up the sand and, as it slides back, the light patterns on the pool floor swell and ripple with it.
- Text alternative: "A pale infinity pool whose edge meets the sea, with loungers on the sand and small waves reaching the beach."
- Free scene space: right 40 percent.

Procedural content plan:

| Element | Build recipe | Triangles | In glb |
| --- | --- | --- | --- |
| Pool basin | Floor grid 32 by 16, walls and coping, lip at the infinity edge; Aqua 100 and Sand 100 | 1,524 | yes |
| Pool water | 24 by 12 grid, nearly flat surface, edge fades into the sea colour at the lip; the shader draws the caustics on the basin floor visible through the surface by two layered travelling sine lattices (the "min of two lattices" trick), brightened Aqua 100 | 576 | no |
| Sea | 64 by 24 grid, shoreline wave shader: a foam line position `f = 0.5 + 0.5 * sin(2 * pi * t / 9)` (period 9 s) with a second slower sine of period 14 s, foam as thresholded noise, wet sand darkening behind it | 3,072 | no |
| Beach | Height field 64 by 16 with gentle slope and ripples baked in vertex colours (Sand 200 to Sand 100 with a damp band) | 2,048 | yes |
| Loungers | 7 loungers (each 150 triangles: frame, 2 slats, cushion), Foam and Driftwood | 1,050 | yes |
| Parasols | 3 parasols with a scalloped canopy (16 gores, scallop edge echoes the brand), a pole | 270 | yes |
| Pergola | 2 arches with a beam between them at the pool side (W 2.4, H 3.2) | 520 | yes |
| Headland, sky | Far headland in Deep; shared sky quad | 402 | partly |
| Foam strip | Flat strip along the shoreline carrying the foam shader | 128 | no |
| Glints | 80 slow points on the pool and sea surface | 0 | no |

Lights: Hemisphere `#D5F0EC` 0.5 over `#E6D9C3` 0.4 (a high bright afternoon rather than dusk: this scene is the brightest, with the sun at 25 degrees); Directional `#FFE2A8` 1.1; fog `#CFE6E2` 30 m to 130 m. Because it is the brightest scene the scrim does the work; the sun glow stays in the right 40 percent.

Camera: reference 16:10, position (-1, 2.4, 10), target (2.5, 0.8, -8), field of view 38 degrees.

Storyboard:

| Time | Frame | Easing |
| --- | --- | --- |
| 0 | Poster pose: pool still, caustics frozen at a neutral pattern, sea calm, foam line at its lowest. | n/a |
| 0 to 1.2 s | Caustics, wave shader and glints ramp up. | `--ease-out` |
| 0.5 s to 6.5 s | The first wave: the foam line advances up the sand by 1.4 m over 3 s (`--ease-out`), pauses, then withdraws over 3 s (`--ease-in`); while it withdraws the pool caustic contrast rises by 30 percent and its scale breathes by 6 percent, then relaxes. Once as a showpiece, afterwards the same wave repeats every 9 s at 40 percent of that strength. | as stated |
| 6.5 s onward | Idle: small waves on the beach (period 9 s, never 5 s), caustics, glints. | continuous |
| Scroll | The camera lowers 0.3 m and moves 0.4 m toward the pool edge. | `SPRING_SCROLL` |

Interaction: pointer and drag parallax.

Fallback, reduced motion, pause: poster only; pause freezes the wave and the caustics.

Accessibility: caustic patterns have low contrast change (at most 12 percent luminance) and move slowly; no flashing; the bright scene stays under the scrim for text.

Tool: three.

Budget impact (step 0): about 9.6k triangles (ceiling 20k), 11 draw calls (ceiling 20), glb about 70 KB, one 256 by 256 sand tile (about 10 KB), 80 particles. Steps: step 1 one caustic layer, halves glints; step 2 removes glints and foam noise octave; step 3 flat pool floor tint, sea gradient only.

### 9.5 Scene 5: Activities and facilities, "Wind and play"

- Page and slot: Activities and facilities, same box. Poster `poster-activities`. Root file `activities.glb`.
- Purpose: suggest things to do (court, sailing, a balloon) without people (FR-28, `scene-areas.md`: "no people").
- Signature moment: a striped balloon lifts off from behind the court and drifts up across the sky while the sail fills with wind.
- Text alternative: "A sunny court beside the sea, a small sailing boat, a striped balloon rising and flags moving in the breeze."
- Free scene space: right 40 percent. Layered parallax: this scene uses five depth layers (sky and sea, dunes and sail, court, flags and net, near props) so slow parallax between layers is visible.

Procedural content plan:

| Element | Build recipe | Triangles | In glb |
| --- | --- | --- | --- |
| Court | A single quad for the surface (Lagoon 700 with Sand 100 border) with 40 line strips (court lines in Foam, each 4 triangles); two glass back walls with arch tops (W 4.2, H 3.0) | 360 | yes |
| Net | 24 by 6 grid net (alpha cut out by a tiny procedural pattern in the shader) and 2 posts | 328 | yes |
| Sea | 24 by 12 grid water shader, small amplitude | 576 | no |
| Dunes | 5 low poly dunes behind the court | 640 | yes |
| Sailing boat | Hull 260 triangles, mast 24, sail cloth 14 by 20 grid (vertex shader fills the cloth with the wind: curvature uniform eased from 0.1 to 0.6 and a travelling ripple) with a 128 by 128 weave tile; hull bobs 0.05 m | 850 | yes + tile |
| Flags | 4 poles with 6 by 14 grid cloth, vertex shader flutter (period 2.1 s and 3.3 s) in Sun, Aqua 300, Foam, Driftwood | 770 | partly |
| Balloon | Lathe 24 segments by 14 rings with 12 coloured gores (Sun, Foam, Lagoon 500 alternating, scalloped lower edge), basket 60 triangles, two ropes as lines | 860 | yes |
| Kite | Diamond 8 triangles plus a 12 segment ribbon tail simulated in JS (a chain of 12 points with damping, 48 flops per frame) | 40 | no |
| Clouds, sky | 5 instanced cloud quads, shared sky quad | 12 | texture shared with the sky only in code (a runtime soft disc) |

Lights: Hemisphere `#D5F0EC` 0.5 over `#E6D9C3` 0.35; Directional `#FFE2A8` 1.0 from the upper right; fog `#BFE0DC` 40 m to 140 m.

Camera: reference 16:10, position (0, 2.0, 12), target (1.5, 2.6, -10), field of view 34 degrees. Pointer and scroll move the layers at different rates (near layers 1.0, court 0.6, dunes 0.3, sea 0.15, sky 0.05 of the camera translation).

Storyboard:

| Time | Frame | Easing |
| --- | --- | --- |
| 0 | Poster pose: balloon resting just behind the court, sail slack, flags limp. | n/a |
| 0 to 1.2 s | Flags, cloth, sea ramp from still. | `--ease-out` |
| 0.3 s to 3.3 s | The sail fills: curvature eases from 0.1 to 0.6 and the boat leans 2 degrees. | `--ease-out` |
| 1.0 s to 10.0 s | The balloon lifts: it rises 3.2 m while drifting 1.5 m to the right and turns 12 degrees; its basket sways with a pendulum of period 6.5 s decaying to a small amplitude. Once; it then hovers with a gentle bob (period 11 s, 0.08 m). | `--ease-inout` |
| 10 s onward | Idle: flags, kite ribbon, sail ripple, sea; slow parallax from the camera drift only. | continuous |
| Scroll | Layers separate by up to 0.5 m as the scene scrolls out. | `SPRING_SCROLL` |

Interaction: pointer and drag parallax, with visibly different depth per layer.

Fallback, reduced motion, pause: poster only; pause freezes everything including the balloon in the middle of its climb.

Accessibility: flags flutter at 0.3 to 0.5 Hz, under the flash threshold; no sudden changes; text on the left scrim.

Tool: three.

Budget impact (step 0): about 4.5k triangles (ceiling 12k), 12 draw calls (ceiling 18), glb about 40 KB, one 128 by 128 weave tile (about 4 KB), no particles (the kite ribbon is geometry). Steps: step 1 flags update at 30 Hz; step 2 kite and cloud layer removed; step 3 cloth becomes static curved geometry.

### 9.6 Scene 6: Location, "Along the coast"

- Page and slot: Location, same box; the static map follows below the scene. Poster `poster-location`. Root file `location.glb`.
- Purpose: show the resort's place on a stylised Red Sea coast from above (FR-28). The coastline is invented and stylised, not to scale and not a navigation aid; the real map link and the static map image are on the page (map placeholder, NFR-15 forbids embedded maps).
- Signature moment: a single ripple spreads out from the marker arch on the shore, then the arch glows steadily while the camera drifts slowly along the coast.
- Text alternative: "A stylised view from above of a curving coastline with turquoise shallows, a coastal road and one small arch marking the resort."
- Free scene space: right 40 percent: the marker arch stands in it.

Procedural content plan:

| Element | Build recipe | Triangles | In glb |
| --- | --- | --- | --- |
| Terrain | Height field 64 by 40 (5,120 triangles) with a coastline cut by an S curve; vertex colours encode depth (sea: Aqua 100 shallow, Lagoon 500, Lagoon 700 to Abyss deep) and land (Sand 200, Sand 100, desert hills in Driftwood tint); heights quantised to 12 bits | 5,120 | yes |
| Reef shimmer | One additive plane over the shallows, fragment noise in Aqua 100 at 10 percent, moving slowly | 2 | no |
| Marker arch | Arch recipe W / H / T / D = 1.6 / 2.6 / 0.28 / 0.5 (round, 24 segments), Sand 100 with a Sun glow inside (quad) | 420 | yes |
| Ripple rings | Two ring meshes (48 segments each) scaled by the signature moment, Aqua 300, additive | 96 | no |
| Coastal road | Ribbon 64 segments by 2 along the coast in Driftwood tint with a dashed Foam centre in the vertex colour | 128 | yes |
| Boats | 6 instanced boats (40 triangles each) with a small wake quad each, moving slowly along two paths | 252 | yes |
| Resort cluster | 5 small arched blocks near the marker, 60 triangles each | 300 | yes |
| Town blocks | 40 instanced cubes in the distance, 12 triangles each | 480 | yes |
| Horizon fog | Distance fog only (no sky; the camera looks down at 38 degrees) | 0 | no |

Lights: Hemisphere `#D5F0EC` 0.55 over `#E6D9C3` 0.35; Directional `#FFE2A8` 0.9 from the upper left; fog `#A6D3CF` 60 m to 200 m.

Camera: reference 16:10, position (-6, 22, 26), target (4, 0, 0), field of view 30 degrees (pitch about 38 degrees). Drift path: a gentle pan of 14 m along the coast over 60 s, ease in and out at both ends, ping pong (a full cycle 120 s, no period near 5 s); on top of it the usual 31 s and 47 s breathing at 0.3 degrees.

Storyboard:

| Time | Frame | Easing |
| --- | --- | --- |
| 0 | Poster pose: coastline, arch dark, rings at zero scale. | n/a |
| 0 to 1.2 s | Reef shimmer, boat motion and the camera drift ramp up. | `--ease-out` |
| 0.6 s to 2.0 s | The arch's inner glow rises to 70 percent (600 ms). At 0.9 s the first ripple ring expands from the arch's foot from radius 0 to 9 m while its opacity falls from 0.8 to 0 (1.4 s); at 1.3 s a second ring follows, smaller and fainter (1.4 s). Once only ("pulses once, then rests"). | `--ease-out` |
| 2.0 s onward | The arch rests, glowing steadily at 55 percent. Idle: boats, shimmer, camera drift along the coast. | continuous |
| Scroll | Camera pitch increases from 38 to 52 degrees and descends 4 m toward the marker as the scene scrolls out, like leaning over a map. | `SPRING_SCROLL` |

Interaction: pointer and drag parallax at the section limits. Hovering the arch does nothing (no hidden function).

Fallback, reduced motion, pause: poster only; pause freezes the ripple in whatever stage it is in.

Accessibility: the single pulse is one time and one second long, low contrast (additive Aqua at 0.8 fading to 0), no repetition; nothing in the scene is the only source of the location, which is stated in page text, the address and the map link.

Tool: three.

Budget impact (step 0): about 6.8k triangles (ceiling 16k), 9 draw calls (ceiling 16), glb about 75 KB (the terrain grid compresses well), one 256 by 256 grain tile (about 10 KB), no particles. Steps: step 1 drops the shimmer layer and boat wakes; step 2 drops town blocks and reef noise; step 3 stops the boats.

### 9.7 Scene totals against the budgets

| Scene | Triangles (est., ceiling) | Draw calls (est., ceiling) | glb KB (est., ceiling 80) | Textures | Particles |
| --- | --- | --- | --- | --- | --- |
| Home | 15.3k, 24k | 11, 20 | 60 | 512x128 clouds | 120 |
| Rooms | 6.9k, 18k | 10, 18 | 55 | 256x256 plaster | 0 |
| Dining | 7.9k, 18k | 12, 20 | 65 | 256x256 grain | 60 |
| Pools | 9.6k, 20k | 11, 20 | 70 | 256x256 sand | 80 |
| Activities | 4.5k, 12k | 12, 18 | 40 | 128x128 weave | 0 |
| Location | 6.8k, 16k | 9, 16 | 75 | 256x256 grain | 0 |

All are far under the requirement caps (150,000 triangles, 100 draw calls, 3 MB hero, 2 MB others). The headroom is deliberate: the 4 second first frame on L1 (AC-53.3) needs the first frame payload to stay small, see `budgets.md` section 6. Steven can choose to spend the headroom (decision D1).

---

## 10. Accessibility summary

| Topic | Rule applied | Where |
| --- | --- | --- |
| Reduced motion (WCAG 2.3.3, NFR-11) | No 3D, no parallax, no scroll driven effects, no loops, no slide or zoom; loader static; transition a 120 ms fade | Sections 3, 4.3, 5.5, 7 |
| Pause, stop, hide (WCAG 2.2.2, FR-30) | Pause motion on every page with motion over 5 s; loader loops stop by 3.6 s; one shot events end by 10 s | Sections 4, 6 |
| Three flashes (WCAG 2.3.1) | No luminance change faster than `MIN_PERIOD` 1.5 s; area of simultaneous brightness change at most 4 percent of the canvas; all light events at least 600 ms; flame breathing under 0.6 Hz | 8.8 |
| Motion actuation (WCAG 2.5.4) | Tilt is optional, can be turned off, pausing disables it; no function depends on it | 6.2 |
| Pointer gestures (WCAG 2.5.1, 2.5.7) | Nothing requires dragging the scene; the lightbox has buttons and arrow keys as well as swipe | 7 (M-18) |
| Text over scenes (NFR-4, AC-49.2) | Abyss scrim at least 0.84 under text, set by `system.md` 4.2; bright and moving content stays in the free space | 8.4 |
| Screen reader (NFR-3) | Canvas `aria-hidden`, not focusable; scene meaning carried by h1 and lead; text alternatives given for each scene; announcements "Loading" for loader and transition | 4.4, 5.6, section 9 |
| Keyboard (NFR-2) | No keyboard trap; controls are real buttons with visible focus; the canvas is never in the tab order; focus moves to the h1 after a transition | 5.6, 6 |
| Vestibular | Small parallax limits, 6 percent maximum dolly, no sway near 0.2 Hz, no full view rotation | 8.5, 8.8 |
| Nothing essential only in motion | Every fact and function exists in text; scenes carry mood only | all |
| Contrast of controls | Controls have their own 0.80 Abyss backing (system.md); 44 by 44 px targets | 6 |

---

## 11. Requirement and acceptance criteria traceability

| Requirement or AC | Where addressed |
| --- | --- |
| FR-27, AC-25.1 to 25.5 | 8.3 to 8.5, 6.2, 9.1 |
| FR-28, AC-26.1 to 26.3 | Section 9, 8.9 (six root files) |
| FR-29, AC-27.1 to 27.7 | Sections 4 and 5 |
| FR-30, AC-28.1 to 28.4 | Section 6.1, state matrix in 3 |
| FR-31, AC-29.1, AC-29.2 | 8.9, section 13 |
| NFR-6 | `budgets.md` section 3 |
| NFR-7 | `budgets.md` sections 4 and 6; load order 8.3 |
| NFR-8, AC-53.1 to 53.6 | 8.6, 8.7, `budgets.md` sections 5 to 8 |
| NFR-9, AC-54.1 to 54.4 | 4.1, 5.2 to 5.4 |
| NFR-11, AC-56.1 to 56.4 | Section 3, 4.3, 5.5, 7 |
| NFR-12, AC-57.1 to 57.5 | 8.2, 8.6, state matrix |
| NFR-13, AC-58.1 to 58.3 | Section 3 (no JavaScript row), 4.1 |
| NFR-15 | 3 (storage key), 6.1 |
| NFR-24, ADR-0008 | 8.3 (meshopt on the main thread, `wasm-unsafe-eval` only), 8.9 (no Draco, no KTX2, no workers) |
| RSK-3, RSK-17, RSK-20 | `budgets.md` sections 6 and 10; 2.2; 8.8 |

---

## 12. Decisions for Steven at T2, deviations, and open items

### 12.1 Decisions to show Steven

| ID | Decision | Recommendation | Why it matters |
| --- | --- | --- | --- |
| D1 | Art direction of the 3D: stylised low polygon "Driftwood and Lagoon" diorama (this spec) or a richer, more photographic look | Stylised | Keeps all assets original and tiny, fits the arch motif, holds 50 frames per second on mid range phones and the 4 second first frame on L1. A richer look needs 10 to 30 times the bytes and needs a second loading stage after the first frame; the requirement caps would allow it (3 MB and 2 MB) but the timing budget would not at the first frame |
| D2 | The loader ends when the page's 2D hero is ready (text, poster, fonts), not when the 3D first frame is drawn | Adopt | `architecture.md` section 13 says the loader waits for the hero's first frame or 8 s. On L1 the 3D chunk and glb arrive about 1.5 s after the poster, so a loader that waits would hide a finished page for that long. FR-29 says "until the hero assets are ready"; the poster is the hero asset in every mode. The scene then fades in over the visible page |
| D3 | The 3D chunk and glb are requested when the poster has painted, not after the window `load` event and an idle period | Adopt | ADR-0007 step 4 says after `load` and idle; NFR-7 only requires after text and poster have rendered. Starting at poster paint is the only way the first frame can arrive inside 4 s on L1 (`budgets.md` 6). Needs the System Architect to update the ADR and `architecture.md` 13 |
| D4 | Visitor paused, then reloads: poster only and a visible Resume control (not a frozen 3D frame) | Adopt | Reconciles FR-30 (freeze on current frame) with NFR-12 (paused means fallback mode). Mid page the scene freezes; on the next load nothing heavy is downloaded |
| D5 | Reduced motion visitors get no 3D and no way to opt in | Keep as written (NFR-11) | The requirement says no scene starts. If Steven's "immersive" appetite wants an opt-in "Play 3D" button for these visitors, that is a requirement change (NFR-11 and AC-56.1) |
| D6 | The scene loop is capped at 60 frames per second on 90 and 120 Hz screens | Adopt | Heat and battery on R1 (120 Hz display); no visual loss |
| D7 | Posters in the build are rendered from the real scenes, replacing the T1 SVG illustrations for the final site | Adopt | The poster then matches the first frame exactly; the SVGs stay as the prototype. Size caps in `budgets.md` |
| D8 | Five section posters get a short descriptive `alt` (the sentences in section 9); the Home poster keeps the empty `alt` chosen in `home.md` | Adopt | The section scenes are informative previews of the areas; Home's meaning is in its h1 and lead. Content register needs the sentences in four languages (machine assisted, OQ-8) |
| D9 | Tilt on Android Chrome is active without a control, covered by Pause; the labelled control appears on iOS only | Adopt (confirms A-28) | Matches FR-27 and WCAG 2.5.4 |
| D10 | Session storage key name: use `jcdm-motion-paused` (ADR-0007), value `1` only while paused | Adopt | The prototype uses `jcdm-motion`; the Cookie notice (FR-15) must list the real name. Needs the Orchestrator to have `proto.js` and the cookie notice aligned; I did not edit them |

### 12.2 Requirements or ADR lines I could not satisfy as written

| Item | Issue | What this spec does |
| --- | --- | --- |
| `architecture.md` section 13, last paragraph ("the loader waits for the hero's first frame or 8 s") | Conflicts with the L1 timing arithmetic and with FR-29's wording; see D2 | Loader ends at 2D hero ready; 3D fades in afterwards. Needs an architecture edit by the System Architect |
| ADR-0007 loading order step 4 ("after load and the next idle period") | Too late for the 4 s first frame on L1; see D3 | Start at poster paint; NFR-7 is still met |
| FR-30 against NFR-12 | FR-30 says freeze on the current frame; NFR-12 lists "paused" as a fallback trigger | D4 resolves it without breaking either |
| NFR-8 first frame within 4 s on L1 | Feasible on paper with about 0.3 s margin only, and L1 is run on a machine that renders WebGL in software (RSK-3) | Payload ceilings in `budgets.md` 6; flagged as the tightest budget; real confirmation needs a real phone for the render cost |
| `scene-areas.md`: "controls hidden when 3D cannot run" | After a visitor paused, a hidden Resume control would trap them in poster mode | Resume stays visible in that one case (section 3) |

No FR or NFR is withdrawn or weakened by this spec.

### 12.3 Risks and assumptions

| ID | Risk or assumption | Mitigation or check |
| --- | --- | --- |
| R-M1 | Meshopt decode, scene build and shader compile on the main thread could exceed 50 ms tasks and hurt TBT and INP | Task slicing in 8.3; measure in the Phase 4 performance spike |
| R-M2 | The transition's 300 ms cover could add more than 200 ms to LCP (AC-54.3) | Fallbacks in 5.4 (swap at 240 ms, then a 240 ms cover) |
| R-M4 | The head plugin's `awaitAssets` can delay the swap on a first visit to a `ru` page while the Cyrillic font stylesheet loads; counts within the cover time | Performance Engineer measures on L1 |
| R-M3 | swup 4.10.0 behaviour on a click during a transition is assumed, not verified | Developer verifies and records |
| R-M4 | The Lighthouse 3D mode Performance score (at least 80) may be low because Lighthouse renders WebGL in software (RSK-3) | Poster as LCP, task slicing; report cloud and real phone numbers separately |
| R-M5 | iOS Low Power Mode caps requestAnimationFrame at 30 Hz, a frame time of 33.3 ms, which the governor reads as above 33 ms and answers with fallback | Accepted: such a device gets the poster; Steven can ask for a softer rule |
| R-M6 | Phone testing needs the server reachable from the phone, but the server binds to loopback only (FR-47) | Android: USB port forwarding; iPhone: needs a documented test only route from DevOps; open item in `budgets.md` 11 |
| A-M1 | Triangle, byte and time numbers are estimates from the geometry plans and common figures, not measurements; no browser or GPU exists in the cloud workspace used for this task | First real numbers come from the Phase 4 spike; `budgets.md` says how |
| A-M2 | Authoring uses Blender 4.x LTS scripts; if Blender is not available on the agency machine the same geometry can be produced by a plain Node script writing glTF with glTF Transform's document API | Developer's choice; outputs must still pass the validator |

---

## 13. Asset register entries to add (for the asset register owner)

The asset register is not edited by this task. These rows are needed under "3D assets" (FR-31, LR-39) once the files exist; licence for all: original work of the agency, no third party rights.

| Id | File | Source | Notes |
| --- | --- | --- | --- |
| 3D-HOME-GLB | `home.glb` | `3d/source/home/build_home.py`, `home.blend` | model + embedded 512x128 cloud strip |
| 3D-ROOMS-GLB | `rooms.glb` | `3d/source/rooms/...` | model + 256x256 plaster tile |
| 3D-DINING-GLB | `dining.glb` | `3d/source/dining/...` | model + 256x256 grain tile |
| 3D-POOLS-GLB | `pools.glb` | `3d/source/pools/...` | model + 256x256 sand tile |
| 3D-ACTIVITIES-GLB | `activities.glb` | `3d/source/activities/...` | model + 128x128 weave tile |
| 3D-LOCATION-GLB | `location.glb` | `3d/source/location/...` | model + 256x256 grain tile |
| 3D-SHADERS | shader library in the 3D chunk | `src/client/scenes/shaders/` | sky, water, glow, cloth, points |
| 3D-RUNTIME-TEX | generated data textures | code | soft disc, contact shadow, noise; no download |
| POSTER-HOME, POSTER-HOME-PORTRAIT, POSTER-ROOMS, POSTER-DINING, POSTER-POOLS, POSTER-ACTIVITIES, POSTER-LOCATION | `.avif` and `.webp` | rendered from the scenes at `t0` | with tool version and render date (LR-36) |
