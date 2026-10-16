# Screen: Pages index

- Stories: US-33, US-35
- Requirements: FR-1 (page inventory), FR-35, FR-37
- Acceptance criteria: AC-33.1, AC-33.2 (edit field for each type of text), AC-33.5 (no layout controls)
- Prototype: (table pattern of `admin-dashboard.html`)
- Admin shell and rules: `admin-shell.md`
- Closes design gate finding DC-H4 (part a)

## Purpose

One place to see every page of the public site, how complete its translations are, and open it in the page editor. Before this screen, "Pages" in the navigation led nowhere.

## Layout

### 375 px

- h1 "Pages", summary line, segmented control (All pages / Missing translations only), then one card per page: page name, public address, four language chips in a row (EN, DE, IT, RU, each with an icon and a word), button "Edit" (named with the page).

### 768 px

- Table with columns Page, Languages (four chips), Action. Address shown under the page name.

### 1440 px

- Table with columns Page, Public address, English, Deutsch, Italiano, Русский, Last saved, Action. Content max 1160 px.

## Components

- Segmented filter (same as the page editor)
- Data table with caption and `th scope`
- Completeness chips (icon, word and colour)
- Link buttons "Edit"
- Info alert pointing to Site text and Consent wording
- Empty, loading and error panels

## Content

- Intro: "Every public page is listed here. Choose a page to edit its text in all four languages. Text that appears on every page, such as the menu and the footer, is edited in Site text."
- Rows in the order of the site menu (the 21 page types of FR-1; the fixed set cannot change, AC-33.5): Home; Rooms and suites; the six room pages (Family Suite and the five other rooms); Dining; Pools and beach; Activities and facilities; Location; Offers; Gallery; FAQ; Contact Us; Privacy notice; Cookie notice; Terms; Accessibility statement; Newsletter unsubscribe.
- Each row: name, address (for example `/en/rooms/`), a chip per language: "Complete" (success, check icon) or "2 missing" (warning, alert icon) with the language name in its accessible name ("Русский: 2 missing"), "Last saved 14 Oct, 11:20 by Admin One".
- Room page rows: the action reads "Edit in Rooms list" and goes to `admin-list-management.md`, because room entries are edited there (FR-36). A room row is never deleted or added (OQ-20).
- Action text: "Edit" with `aria-label="Edit Home page"` style names so each link is distinct for a screen reader.
- Summary: "9 fields are missing text in at least one language, on 4 pages."
- Help line under the table: "Wording of the newsletter consent and the contact form privacy line is edited in Consent and privacy wording, because every change creates a new saved version."

## States

- Loading: skeleton rows (table) or skeleton cards (375).
- Empty: cannot happen because the 21 page types are fixed. If the list fails to load fully, the error state is used. Filter result empty: "Nothing is missing. Every page has text in all four languages." (success tone).
- Error: error alert with Retry: "We could not load the pages. Try again."
- Success: not applicable (read only list). After returning from the editor, the saved page row shows the new status and "Last saved" and the polite status says "Home page saved."

## Interactions

- Filter changes the rows without reload when JavaScript runs; works with query strings without it. The count is announced in a polite status ("12 pages shown").
- Row action opens the page editor for that page in the same tab; breadcrumb in the editor returns here.
- No reordering, adding, deleting, hiding or renaming pages, and no layout, navigation structure or colour controls (AC-33.5).

## Keyboard

- Tab through the filter, then each row's Edit link. Arrow keys move inside the segmented control as in `admin-page-editor.md`. Enter activates links and buttons. Whole row is not a link; only the Edit link is, so the tab order has one stop per row.

## Accessibility

- Table caption "Pages and translation status"; `th scope="col"` and row headers; at 375 the cards use a list with headings level 2 per page.
- Language cells carry `lang` for the Russian name; chips never rely on colour alone.
- One h1; heading levels in order; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; reflows at 320 px and 200 percent zoom (narrow table sits in a labelled focusable scroll region).
