# Screen: Book now link and label

- Stories: US-10
- Requirements: FR-11
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: every page header, hero, room pages, offers, closing panels
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Send a visitor to the JAZ booking engine while making clear it is not part of this concept.

## Layout

### 375 px

- In the menu panel and hero: button full width (hero: auto), label under it on its own line at 14 px.

### 768 px

- Button auto width, label beside or under.

### 1440 px

- Header right: sun or lagoon button, label to its right in two lines at 14 px.

## Components

- Button (primary, or sun on dark) with external icon and visually hidden text "(opens in a new tab)"
- Label "External site, not connected with this concept" (muted 14 px, contrast 6.8 to 1; soft text 11.2 to 1 on dark)

## Content

- Labels per language: Book now, Jetzt buchen, Prenota ora, Забронировать.
- Label per language: "External site, not connected with this concept", German "Externe Website, nicht mit diesem Konzept verbunden", Italian "Sito esterno, non collegato a questo concept", Russian "Внешний сайт, не связан с этой концепцией".
- Opens in a new tab with rel noopener noreferrer; destination is one admin setting.

## States

- Loading: Not applicable.
- Empty: Setting empty: the link falls back to the default resort page URL (OQ-21), never an empty href.
- Error: Not applicable (external).
- Success: Not applicable.

## Interactions

- Press feedback scale 0.97 in 90 ms. The label is never hidden, shortened or shown only on hover.

## Accessibility

- The label is linked to the link with aria-describedby (unique id for each instance on the page). Both the label text and the new tab warning reach screen readers.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
