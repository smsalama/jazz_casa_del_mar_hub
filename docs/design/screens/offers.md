# Screen: Offers

- Stories: US-7, US-10
- Requirements: FR-7, FR-11
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: Offer cards appear on index.html
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Show the sample offers and send the visitor to Book now.

## Layout

### 375 px

- Heading band; three offer cards stacked, each with badge, title, description, Book now block.

### 768 px

- Two columns.

### 1440 px

- Three columns.

## Components

- Card (offer)
- Badge "Sample offer" (icon and word)
- Book now block per offer

## Content

- At least three offers: Family stay, Slow season escape, Couples retreat, each with a description of at least 25 words. No price, discount, percentage, currency, date, deadline, countdown, or urgency wording.
- Note under the heading: "Sample offers show how deals will appear on this page."

## States

- Loading: Reserved card heights.
- Empty: No offers: "There are no offers at the moment. Look again soon, or write to the resort." (no urgency wording) with a link to Contact Us.
- Error: As rooms.
- Success: Not applicable.

## Interactions

- Each Book now link has its own label with a unique id (FR-11).

## Accessibility

- Each card is an article; the badge text is real text.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
