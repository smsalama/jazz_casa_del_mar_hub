# Screen: Consent and privacy wording

- Stories: US-13, US-15, US-17, US-33
- Requirements: FR-20 (privacy information line on the contact form), FR-22 (newsletter consent text), FR-35, NFR-14, glossary "Wording version" (D-2)
- Acceptance criteria: AC-13.12 (each stored enquiry keeps the wording version its visitor saw; the earlier archived text is unchanged and can be read), AC-33.2, the consent version AC lines of US-15
- Prototype: (pattern of `admin-editor.html`)
- Admin shell and rules: `admin-shell.md`
- Closes design gate finding DC-H4 (part c)

## Purpose

Edit the two texts that people agree to or are told about when they give their data, and keep every earlier wording. A save never changes an old version: it adds a new one (D-2). Each stored subscriber and enquiry keeps the label of the version its visitor was shown.

## The two texts

| Text | Where visitors see it | Version label | Required content |
| --- | --- | --- | --- |
| Newsletter consent text | Footer sign up form, next to the consent checkbox (FR-22) | N followed by a number, for example N-3 | Names the controller (`{controller}`), says the address will be used to send the resort's newsletter, says the person can unsubscribe at any time, and links to the Privacy notice (`{privacy_link}`) |
| Contact form privacy information line | Contact Us form, above the Send button (FR-20) | C followed by a number, for example C-2 | Says who is the controller (`{controller}`), why the details are used (to answer the enquiry) and links to the Privacy notice (`{privacy_link}`). No consent box (system.md) |

Labels are made by the system, never typed, never reused and never edited. `{controller}` is filled from the provider details in Settings; `{privacy_link}` becomes a link to the Privacy notice in the visitor's language. Both placeholders must stay in every language.

## Layout

### 375 px

- h1 "Consent and privacy wording", intro alert, then two sections one after the other. Each section: status block (current label, live since), language cells stacked or tabs (view control as `admin-site-text.md`, defaults to tabs), the checklist, "Earlier versions" as a disclosure listing cards. Sticky save bar.

### 768 px

- Sections in one column; cells two per row or tabs; earlier versions as a table.

### 1440 px

- Four columns of cells at 1440 and above, two at 1280 and below. Earlier versions table full width below each text. Content max 1160 px.

## Components

- Status block with the label chip ("Current version N-3") and "Live since 12 Oct 2026, 09:30"
- Language cells with live preview underneath each (text with the placeholders replaced by example values, marked "Preview")
- Placeholder chips (`{controller}`, `{privacy_link}`)
- "Before you save" checklist (read only list of what the text must say)
- Language tabs (ARIA tabs as in `admin-site-text.md`)
- Earlier versions table: Label, Live from, Live until, Saved by, Used by (count of stored subscribers or enquiries), View
- Version viewer (read only panel with all four languages and the label)
- Confirm dialog "Save as a new version?"
- Save bar, alerts, breadcrumb

## Content

- Intro (info alert): "Every change creates a new saved version. Earlier versions are kept exactly as they were, so each record shows the words the visitor saw. People who opened the form before you save are still recorded against the earlier version."
- Per text: heading, "Where visitors see it", cells, chips, checklist.
- Checklist for the newsletter text: "The text still says who runs the newsletter (the controller placeholder), that the address is used to send the newsletter, that people can unsubscribe at any time, and links to the Privacy notice." For the contact line: "The text still says who is responsible for the details, that they are used to answer the enquiry, and links to the Privacy notice."
- All four languages are required for these two texts. Visitors never see consent wording in a language other than their own, so there is no English fallback here. DE, IT and RU show "Machine assisted, not reviewed" plus the warning "Have this wording checked by a person before the site goes live."
- Earlier versions: newest first. Example synthetic rows (current version N-3 is shown in the status block, not in the list): N-2, live 03 Oct to 12 Oct 2026, used by 6 subscribers; N-1, live 20 Sep to 03 Oct 2026, used by 4 subscribers.
- "View" opens the version viewer; its action "Use as a starting point" copies the text into the editing cells as unsaved changes. It never edits or restores the old version itself; saving then creates a new version. There is no delete, rename or edit of a version.
- Confirm dialog: heading "Save as a new version?", text "This saves the newsletter consent text as version N-4 in all four languages. Visitors see it at once. Version N-3 is kept unchanged.", buttons "Save new version N-4" (primary) and "Keep editing". Focus on "Keep editing"; Escape equals Keep editing.
- If the controller name in Settings changes, the system adds a new version of both texts by itself, because the controller name is part of the words the visitor sees. The Settings screen warns before this happens (see `admin-settings.md`).

## States

- Loading: skeleton blocks.
- Empty: "No earlier versions yet. The first version is made when you save a change." shown in the Earlier versions area of a text that is still on its first version (empty tone, dashed panel).
- Error: save failed: error alert "Your changes were not saved. Your text is still here. Try again." Too long: "This text is too long. Use 400 characters or fewer." (consent) or "Use 300 characters or fewer." (privacy line). Language missing: "Add the Deutsch text. Consent wording must be complete in all four languages." Placeholder removed: "Keep {controller} in this text. It is replaced by the name of the controller." and "Keep {privacy_link} in this text. It becomes a link to the Privacy notice." Nothing changed: "You have not changed this text, so there is nothing to save." (the Save button stays available but this message is shown and no version is made). Conflict: "This wording was changed by someone else at HH:MM and is now version N-4. Reload to see it; your text is kept in a copy below." Version viewer failed: "We could not load that version. Try again."
- Success: "Saved as version N-4. It is live." Status block, Earlier versions table and chips update; focus moves to the success alert (role status); the dirty marker clears.

## Interactions

- Editing either text marks the section "Unsaved changes in 2 fields" and the save bar; one Save changes saves only the sections that changed, each as its own new version. Leaving with unsaved changes asks "Leave without saving?" (AC-81.2).
- Save changes opens the confirm dialog for each changed text (one dialog listing both when both changed).
- The version label that a visitor's form carried is fixed when the form is shown (signed token), so a save while a visitor is typing does not change what that visitor is recorded against (AC-13.12). The admin screen says so in the intro.
- Subscribers and enquiries link each consent or wording label to this screen's version viewer (`admin-subscribers.md`, `admin-enquiries.md`).
- No layout, colour, font or navigation controls (AC-33.5).

## Keyboard

- Language tabs: Left and Right Arrow, Home and End, automatic activation, Tab into the panel, as in `admin-site-text.md`.
- Earlier versions: a disclosure button (`aria-expanded`) opens the table; "View" is a button per row named with the label ("View version N-2"); the viewer is a region, not a dialog, and takes focus on its heading; Close returns focus to the View button.
- Confirm dialog: focus trapped, Escape keeps editing, Enter activates the focused button.

## Accessibility

- Every cell has a visible label (text name plus language) and `lang`; preview text carries the same `lang`; placeholders in the preview are shown with example values and the word "Preview" so no one thinks it is live.
- The status block uses text, not colour, to show "Current version".
- Errors are linked with `aria-describedby` and announced in a polite live region; first error receives focus after a failed save.
- Table has a caption, `th scope` and sits in a labelled focusable scroll region on narrow screens; counts are plain numbers.
- One h1; heading levels in order (text h2, subsection h3); landmarks from `frame.md`; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; reflows at 320 px and 200 percent zoom.
