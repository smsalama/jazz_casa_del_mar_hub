# Screen: Site text (navigation, footer, form labels and messages)

- Stories: US-33, US-35, US-22, US-24
- Requirements: FR-35 (navigation labels, footer text, form labels, help text, validation and confirmation messages), FR-37, FR-38
- Acceptance criteria: AC-33.2 (each type of text has an edit field per language), AC-33.4 (Russian unchanged), AC-33.5 (no layout, navigation structure, colour or font controls)
- Prototype: (pattern of `admin-editor.html`)
- Admin shell and rules: `admin-shell.md`
- Closes design gate finding DC-H4 (part b)

## Purpose

Edit, in English, German, Italian and Russian, the text that appears on many pages and so does not belong to one page: menu labels, footer text, form labels and help text, form messages, common buttons and the error pages.

## Layout

### 375 px

- h1 "Site text", group list as a select-like list of links (Navigation, Footer, Form labels and help, Form messages, Buttons and common labels, Error pages), then the chosen group. Language view defaults to "One language at a time" (tabs EN, DE, IT, RU) to keep each item to one cell. Sticky save bar.

### 768 px

- Group list as a horizontal wrapping list above the fields; two columns of cells (EN, DE / IT, RU) per item, or tabs if chosen.

### 1440 px

- Left column (220 px) with the group list and per group missing counts; right area with items. Four columns of cells at 1440 and above (cells 190 px or wider); at 1280 and below two columns.

## Components

- Group navigation (list of links, `aria-current="page"` on the open group, missing count chip per group)
- Language view control: "Side by side" and "One language at a time" (segmented, `aria-pressed`)
- Language tabs (ARIA tabs, see Keyboard)
- Language cell, single line field for labels and a multi line field for messages (as `admin-page-editor.md`)
- Where used note and protected placeholder chips
- Completeness chips, "Missing translations only" filter
- Save bar, alerts, breadcrumb

## Content

Items by group. Text in the public site's four languages; English shown here. Every item has a name, a "Where it appears" line, an optional help line and four cells. Limits are in brackets.

| Group | Items (examples) | Limit |
| --- | --- | --- |
| Navigation | Menu labels for Home, Rooms and suites, Dining, Pools and beach, Activities and facilities, Location, Offers, Gallery, FAQ, Contact Us; "Book now"; "Menu"; "Close menu"; "Skip to main content"; language switcher label; "Pause motion" and "Resume motion" | 40 characters each |
| Footer | Newsletter heading and intro line; headings "Explore", "Contact", "Follow"; legal link labels (Privacy notice, Cookie notice, Terms, Accessibility statement, Unsubscribe); copyright line; closing line | 120 characters, intro 200 |
| Form labels and help | Contact form: Name, Email, Telephone (optional), Subject, Message, Send message, help lines; Newsletter: Email address, Subscribe; Unsubscribe: Email address, Unsubscribe; subject list entries | label 60, help 200 |
| Form messages | Every validation message, the retry message ("We could not send your message. Please check it and send it again."), the sending and success text, the enquiry received text with the reference placeholder, newsletter confirmation, unsubscribe result | 300 characters each |
| Buttons and common labels | Read more, Back to top, Previous, Next, Close, Try again, image gallery controls, loader text | 60 characters |
| Error pages | 404 and 500 headings, text, link labels | heading 80, text 300 |

Not on this screen, and each shown in a note at the top ("Looking for something else?"):

- Text of one page: Pages.
- The wording of the newsletter consent and the contact form privacy line: Consent and privacy wording (these create saved versions).
- The optional concept sentence, links, contact details: Settings. The fixed concept sentence and the title ending "| Concept" cannot be edited anywhere (FR-17, FR-35).
- Menu order, which pages appear, colours, fonts and 3D scene settings: not editable at all (OQ-4, AC-33.5). The screen has no control for any of these.

Protected placeholders: some messages contain parts the site fills in, written in braces, for example `{reference}` or `{limit}`. They appear as chips in the label ("Keep {reference} in every language") and a message that loses one is refused on save.

Cell content as in `admin-page-editor.md`: default language note on EN; "Machine assisted, not reviewed" on DE, IT and RU; each cell has `lang`; missing cell has a dashed warning border, the "Missing" chip and the text "No Russian text yet. Visitors see the English text."

## States

- Loading: skeleton items.
- Empty: an item with no text in any language shows four dashed missing cells and "4 missing". If every item of a group is empty the group shows the count in its chip and an info alert "This group has no text yet. Visitors see no text here until you add some."
- Error: save failed: error alert above the save bar "Your changes were not saved. Your text is still here. Try again." Too long: "This text is too long. Use N characters or fewer." Placeholder removed: "Keep {reference} in this text. It is replaced by the real reference when a visitor sends a message." Empty English text: "Enter the English text. Visitors see it when a translation is missing." (see Interactions). Conflict: "This text was changed by someone else at HH:MM. Reload to see their changes; your text is kept in a copy below." (AC-78.3)
- Success: "Saved. Your changes are live." Chips and group counts update; dirty marker clears.

## Interactions

- Save changes saves every changed item and goes live at once (FR-38). No draft, preview or history.
- Unsaved marker "Unsaved changes in 3 fields"; leaving a group or the screen with unsaved changes asks "Leave without saving?" (AC-81.2).
- Missing translations only filter as on the page editor.
- Language view: "Side by side" shows the cells of every language together; "One language at a time" shows tabs. The choice is remembered for the session in the tab (per viewer convenience, not required to work).
- A required label (for example the menu item "Rooms and suites") can never be left empty in English; it can be empty in the other languages and then shows the English text with the Missing flag.
- Discard changes restores the last saved values after confirmation.

## Keyboard

- Tabs (language view): role `tablist` with four `tab` elements and one `tabpanel`; automatic activation. Left and Right Arrow move between tabs and wrap, Home and End go to the first and last tab, Tab moves from the tab list into the panel. The selected tab has `aria-selected="true"`, other tabs `tabindex="-1"`. The tab name includes the missing count: "Русский, 2 missing".
- Group list: Tab between links; Enter opens a group; focus moves to the group h2 after opening and the polite status says "Footer, 8 texts, 1 missing".
- Cells: all fields are in the normal tab order; the rich text fields (only on the footer intro and the error page text) follow the toolbar pattern of the page editor.

## Accessibility

- Each cell has a visible label (item name plus language name) and `lang`; the missing state uses icon, word and dashed border; the sticky save bar does not hide the focused field (scroll padding).
- Errors are linked with `aria-describedby`, announced in a polite live region and the first error receives focus after a failed save.
- One h1; heading levels in order (group h2, item h3); landmarks from `frame.md`; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; reflows at 320 px and 200 percent zoom.
