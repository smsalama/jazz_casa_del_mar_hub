# Motion controls, reduced motion, no WebGL and no JavaScript

- Stories: US-27, US-28, US-56, US-57, US-58
- Requirements: FR-29, FR-30, NFR-11, NFR-12, NFR-13
- Prototype: `design/prototype/js/proto.js` (pause control, `data-motion` attribute), `css/site.css` and `css/loader.css` (reduced motion blocks), `loader.html`, `transition.html`

## Pause motion control (FR-30)

- Placement: inside every scene (Home and the five section pages), in the scene control group; on pages with only a loop (none today) at the top right of the section.
- Label "Pause motion" (de: Bewegung anhalten, it: Metti in pausa il movimento, ru: Остановить движение). When active the label is "Resume motion" with `aria-pressed="true"`; the icon changes and the word changes (not icon alone).
- Effect: all page animation stops (CSS, scroll driven, 3D frozen on the current frame, transitions swap without motion). The choice is kept in `sessionStorage` for the tab only.
- Size: 44 px high, dark backing 0.80 for contrast; keyboard reachable directly after the scene text.
- Pages with no motion longer than 5 seconds do not need the control (AC-28.4).

## Reduced motion (prefers-reduced-motion: reduce)

| Element | Behaviour |
| --- | --- |
| 3D scenes | Not started; poster shown |
| Loader | Static half filled arch, "Loading" text |
| Page transition | Opacity crossfade of 120 ms (limit 150 ms) |
| Cards and buttons | Press feedback becomes a colour change; no lift or scale |
| Accordion and menu | Open and close without movement |
| Scroll | No smooth scrolling |

Also handled: `prefers-reduced-transparency` (header and scene controls opaque), `prefers-contrast: more`, `forced-colors`.

## No WebGL (NFR-12)

Detection happens before any 3D file is requested. If WebGL is missing, context creation fails, a context is lost for more than 3 seconds, Save-Data is on or the connection is 2g: poster only. Text, links, forms and functions are the same as in 3D mode. The poster has the same aspect ratio and box.

## No JavaScript (NFR-13)

All text, images, navigation, language switching and the three forms work. Missing: gallery lightbox (thumbnails link to the large image), 3D, loader and transitions. The nav panel is open in flow; FAQ answers are visible; the contact, newsletter and unsubscribe forms submit normally and show a result page.

## Loader and transitions

Specified in `loader-and-transition.md`. The motion designer defines timing curves for the real scenes later.
