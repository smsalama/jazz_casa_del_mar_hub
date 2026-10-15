# Screen: Error pages (not found and something went wrong)

- Stories: US-12
- Requirements: FR-13
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: 404.html
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Help a visitor who followed a bad link or hit a server problem.

## Layout

### 375 px

- Centred text block on foam: arch icon, h1, text, Home button, links to main sections.

### 768 px

- Same, wider.

### 1440 px

- Same, with a two column list of links.

## Components

- Header and footer (frame)
- Concept notice
- Button "Go to Home"
- Link list

## Content

- Not found: h1 "This page could not be found", text "The link may be old or mistyped. Start from the Home page or choose a section below."
- Something went wrong: h1 "Something went wrong on our side", text "Please try again in a few minutes. If it keeps happening, write to the resort." Link to Contact Us.
- No technical detail (no path, stack trace, software or version).
- Localised in four languages.

## States

- Loading: Not applicable.
- Empty: Not applicable.
- Error: This screen is the error state. Offline browser errors are outside the site.
- Success: Not applicable.

## Interactions

- Focus lands on the h1 on load for in page transitions.

## Accessibility

- Correct HTTP status; title "Page not found | Concept"; one h1.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
