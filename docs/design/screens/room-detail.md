# Screen: Room detail (one screen type for all six rooms)

- Stories: US-3, US-10, US-13
- Requirements: FR-2, FR-11
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: room-family-suite.html
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Describe one room in enough detail to decide, then send the visitor to Book now or to the contact form.

## Layout

### 375 px

- Header band with breadcrumb and h1 on a small arch art band; description; three photos (one large, two small); features list (one column); previous and next room links; booking panel; footer.

### 768 px

- Photos: one large, two below in two columns; features in two columns.

### 1440 px

- Two columns: description and photos left (7 columns), sticky booking panel right (4 columns) from 960 px.

## Components

- Breadcrumb (Rooms and suites / room name)
- Heading band
- Gallery of three images with captions
- Features list with icons
- Pager links (previous room, next room)
- Book now block
- Button "Ask about this suite"

## Content

- h1 room name. Description at least 60 words, plain (Family Suite: sleeping area apart from living space, balcony facing the pools, soft colours of sand and lagoon).
- Features (at least 5, six shown): separate sleeping area, balcony facing the pools, air conditioning, bathroom with a rain shower, tea and coffee corner, in room safe. No sizes or numbers.
- Photos: three placeholder illustrations with captions "Living area, placeholder illustration", and so on.
- Panel "Plan your stay": "Booking happens on the JAZ website. Message the resort first if you would like to ask about this suite."

## States

- Loading: Images reserve space (width and height set).
- Empty: Fewer than three photos: the grid shows what exists; the admin warns (FR-36).
- Error: Unknown room URL: 404 page.
- Success: Not applicable.

## Interactions

- Pager links keep the same page type. "Ask about this suite" goes to Contact Us with the subject General enquiry.

## Accessibility

- Breadcrumb is a nav with aria-current on the last item. Features are a real list; icons are decorative. Captions use figure and figcaption.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
