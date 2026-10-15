# Screen: Admin media library

- Stories: US-38, US-39
- Requirements: FR-40, FR-41
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (table and card patterns)
- Admin shell and rules: `admin-shell.md`

## Purpose

See, describe, replace and delete photos.

## Layout

### 375 px

- Grid of two columns of thumbnails with name and status; upload button at the top.

### 768 px

- Three columns.

### 1440 px

- Table view: thumbnail, name, size, uploaded date, used on, alt text status, actions.

## Components

- Thumbnail grid or table
- Chips (Needs alt text)
- Dialog (delete refused, delete confirm)
- Alt text and caption editor in four languages

## Content

- A photo cannot be used on a public page until it has alt text in English (FR-40). Used on shown as page names.
- Delete refused: "This photo is used on Rooms and suites and Home. Remove it there first." with links.

## States

- Loading: Skeleton tiles.
- Empty: "No photos yet. Upload your first photo." with Upload button.
- Error: Load error with Retry.
- Success: "Photo replaced." "Photo deleted."

## Interactions

- Replace keeps the uses; metadata edits use the language cell pattern.

## Accessibility

- Thumbnails have alt text from the library; table headers real; actions named with the photo name.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
