# Screen: Admin page editor (four languages side by side)

- Stories: US-33, US-35, US-81, US-51
- Requirements: FR-35, FR-37, FR-38
- Reached from: `admin-pages-index.md` (the Pages item in the navigation)
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: admin-editor.html
- Admin shell and rules: `admin-shell.md`

## Purpose

Edit every text of one page in English, German, Italian and Russian next to each other. Text that appears on many pages is not here: menu labels, footer, form labels and messages are in Site text (`admin-site-text.md`), and the newsletter consent text and contact form privacy line are in Consent and privacy wording (`admin-consent-wording.md`).

## Layout

### 375 px

- Language cells stacked per field in the order EN, DE, IT, RU; the field label first; chips row wraps; sticky save bar at the bottom.

### 768 px

- Two columns of cells (EN, DE / IT, RU).

### 1440 px

- Four columns at 1440 and above (cells 190 px or wider); at 1280 and below two columns.

## Components

- Completeness chips ("3 of 4 languages complete", per language)
- Segmented control All fields / Missing translations only
- Language cell
- Rich text with toolbar (Bold, Italic, Link, Bulleted list)
- Sticky save bar
- Info alert (goes live on save)
- Breadcrumb (Dashboard, Pages, page name; "Pages" goes to the Pages index)
- Language view control (Side by side or One language at a time, ARIA tabs as in `admin-site-text.md`; default one language at a time below 768 px)
- Pointer note "Looking for the menu, footer or form text?" with links to Site text and Consent and privacy wording (shown on Contact Us, Home, and every page that has a form or footer)

## Content

- Sections for the page (Browser and search, Hero, Overview, and so on). Each field has a label, a help line and four cells.
- Browser title shows the editable part and the fixed suffix as "Visitors see: Jazz Casa del Mar | Concept".
- Default language note: "Default language" on EN; "Machine assisted, not reviewed" on DE, IT and RU.
- Missing cell: dashed warning border, "Missing" chip with icon, text "No Russian text yet. Visitors see the English text."
- Alt text and captions for images edit here for images used on the page.
- On the Contact Us page the form labels, help and messages are not fields here; a note says "Form labels and messages are edited in Site text" with a link, and "The privacy information line is edited in Consent and privacy wording" with a link. Page text around the form (heading, intro) is edited here.

## States

- Loading: Skeleton cells.
- Empty: A field with no text in any language shows four dashed missing cells and the chip "4 missing".
- Error: Save failed: error alert above the save bar "Your changes were not saved. Your text is still here. Try again." Field too long: "This text is too long. Use N characters or fewer." Link not absolute: "Enter a full link that starts with https://".
- Success: "Saved. Your changes are live." Chips update. Dirty marker clears.

## Interactions

- Save changes saves all fields and goes live at once (FR-38). No draft, preview or history.
- Unsaved changes marker "Unsaved changes in 1 field"; leaving with unsaved changes asks "Leave without saving?" (AC-81.2).
- Another person saved the same page meanwhile: conflict alert "This page was changed by someone else at HH:MM. Reload to see their changes; your text is kept in a copy below." (AC-78.3).
- Session ending: if the session ends while text is unsaved, the unsaved text is kept in the tab and restored after sign in with an info alert (see `admin-session-timeout.md`). The editor must report typing as activity at most once per minute.
- Discard changes restores the last saved values after confirmation.

## Accessibility

- Language tabs follow the keyboard pattern of `admin-site-text.md` (arrow keys, Home, End).
- Each cell has a visible label (field label plus language name) and lang attribute set to its language; missing state uses icon, word and dashed border; save bar does not hide focused fields (scroll padding).
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
