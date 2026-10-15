# Screen: Gallery

- Stories: US-8
- Requirements: FR-8
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: img/ph-01.svg to ph-12.svg
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Browse twelve or more images and view them large.

## Layout

### 375 px

- Grid of two columns of square thumbnails.

### 768 px

- Three columns.

### 1440 px

- Four columns; lightbox fills the viewport.

## Components

- Image grid (buttons)
- Lightbox (image, caption, counter, previous, next, close)

## Content

- At least 12 images with alt text and caption in four languages (placeholder illustrations).
- Lightbox counter "3 of 12".

## States

- Loading: Thumbnails reserve a square; lightbox shows a spinner line while the large image loads.
- Empty: No images: "No photos have been added yet." with no grid.
- Error: Large image fails: lightbox shows the caption and "This image could not be loaded." with Close.
- Success: Not applicable.

## Interactions

- Activate a thumbnail opens the lightbox on pointer down feedback, then on activation; arrows or swipe move; Escape closes; focus trapped inside and returned to the thumbnail (FR-8); swipe uses the flick spring.
- No JavaScript: each thumbnail links to the large image file so the images are still reachable (AC-58.3).

## Accessibility

- Lightbox is a dialog with aria-modal, label "Photo viewer"; counter announced politely; page behind is inert.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
