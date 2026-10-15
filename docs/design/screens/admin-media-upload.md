# Screen: Admin media upload

- Stories: US-38, US-39, US-68
- Requirements: FR-40, FR-41
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (form pattern)
- Admin shell and rules: `admin-shell.md`

## Purpose

Upload up to 20 photos at once, safely.

## Layout

### 375 px

- Dialog full screen: drop area becomes a "Choose photos" button; list of selected files with status; Upload button.

### 768 px

- Dialog 560 px.

### 1440 px

- Dialog 640 px with drop area.

## Components

- File input with visible button and drop area
- File list with per file status
- Progress bars with text
- Alerts

## Content

- Hint: "JPEG, PNG or WebP. Up to 20 photos at a time. Each photo up to the size shown in settings."
- Photos are resized to 480, 768, 1280 and 1920 pixels wide, location data is removed (FR-41).

## States

- Loading: Each file: "Uploading 40 percent", then "Processing".
- Empty: No files chosen: Upload disabled.
- Error: Per file: "photo-name.gif is not a supported type. Use JPEG, PNG or WebP." "photo-name.jpg is too large." "More than 20 photos chosen. Remove some and try again." "photo-name.jpg could not be processed. Choose it again." One bad file does not stop the others.
- Success: "20 photos uploaded. Add a description to each so they can be used." with a link to the library.

## Interactions

- Works without drag and drop: the Choose photos button opens the file dialog.
- Upload progress uses text and bar, not colour alone.

## Accessibility

- Status updates announced politely; each file row has a Remove button named with the file.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
