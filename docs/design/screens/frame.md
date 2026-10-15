# Screen frame: concept notice, header, footer (applies to every public page)

- Stories: US-1, US-20, US-22, US-47, US-48
- Requirements: FR-10, FR-17, FR-24, FR-25
- Prototype: every file in `design/prototype/` (public pages)

## Order in the page (reading and tab order)

1. Skip link "Skip to main content" (first focusable, visible on focus).
2. Concept notice (region, not focusable).
3. Header: wordmark link to Home, main navigation, language list, Book now block.
4. Main (`id="main"`): h1 first, then the page content.
5. Footer: newsletter form, address, explore links, contact, social, legal links, concept sentence again, copyright.

## Header

| Width | Layout |
| --- | --- |
| 375 | Sticky 56 px bar: wordmark left, Menu button right (button, 44 px, aria-expanded, aria-controls). Panel opens below with navigation links (44 px rows), language list, Book now block. Panel closes on Escape and on selecting a link; focus returns to the Menu button. |
| 768 | Same as 375 with a wider panel (two columns: navigation, language and Book now). |
| 1440 | Static, two rows: row one wordmark and place line left, language list and Book now block right; row two navigation (Rooms and suites, Dining, Pools and beach, Activities and facilities, Offers, Gallery, Location, Contact Us). Not sticky (the concept notice and scene need the space). |

Navigation without JavaScript: the panel is visible and in flow (html has no `js` class), so every link is reachable (AC-58.1). Translucent header background is used below 960 px; with reduced transparency or increased contrast it is opaque.

## Language list

English, Deutsch, Italiano, Русский, each in its own language with `lang` and `hreflang`. Current language has a tick and `aria-current="true"`. Switching goes to the same page in the other language. Without a translation of a field the English value shows (FR-26).

## Footer

375: stacked, newsletter first. 768: newsletter two columns, link groups in two columns. 1440: newsletter two columns, then four columns (brand and address, Explore, Contact, Follow), then legal links row (Privacy notice, Cookie notice, Terms, Accessibility statement, Newsletter unsubscribe), concept sentence, copyright with the year.

Footer content: placeholder address, telephone, WhatsApp, email (example.invalid) and the five social links from settings; empty ones are hidden. The concept sentence is repeated here.

## States

- Loading: header and footer are server rendered; no spinner.
- Empty: social links or WhatsApp empty are hidden; no empty headings.
- Error: not applicable (content is static); missing translation falls back to English with `lang="en"`.
- Success: not applicable.

## Accessibility

Landmarks banner, navigation (labelled "Main" and "Languages"), main, contentinfo; current page marked with `aria-current="page"` and a 3 px bar; menu state in `aria-expanded`; focus ring 3 px; targets 44 px; the sticky header never hides a focused element (scroll padding).
