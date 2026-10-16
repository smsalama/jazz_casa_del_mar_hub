# User flows and screen list: Jazz Casa del Mar resort website (concept)

- Task: P4-T1
- Sources: `docs/stories.md`, `docs/requirements.md` (FR-1 to FR-48), `docs/t1-decisions.md`
- Screen files: `docs/design/screens/`. Tokens and components: `docs/design/system.md`.
- Prototype: `design/prototype/` (open `index.html` or `admin-sign-in.html`)

## 1. Visitor journeys

### J1 Explore the resort and book (US-1 to US-10)

1. Land on Home in the right language (root redirects by browser language, English default; AC-23). A loader appears only if the page takes longer than 300 ms.
2. Read the hero, then the overview. Choose Rooms and suites from the navigation or an Explore tile.
3. Transition screen (300 ms up, 420 ms away), focus lands on the new h1.
4. Compare six rooms, open one room page, read the description and features.
5. Follow Book now. The label "External site, not connected with this concept" is read with the link. The JAZ page opens in a new tab; the concept tab stays open.

Failure points: unknown address leads to the not found page (links back to Home and sections); a missing translation shows English; no 3D shows the poster.

### J2 Contact the resort (US-11, US-13, US-17)

1. From a room page choose "Ask about this suite", or choose Contact Us in the navigation.
2. Fill name, email, optional telephone, subject, message. Read the privacy line.
3. Send. If something is wrong, the error summary takes focus; each message names the field and how to fix it; typed values stay.
4. Success page shows a reference (for example ENQ-7KQ4MD) and what happens next.
5. Alternative routes on the same page: telephone, WhatsApp, email, Google Maps (all placeholders).

### J3 Newsletter (US-15, US-16)

Sign up from any footer: email, tick consent (unticked by default), Subscribe; result confirms without implying a send. Unsubscribe from the footer link: enter email, Unsubscribe; the same result message for every valid address.

### J4 Browse photos and answers (US-8, US-9)

Gallery: choose a photo, lightbox opens (arrows, Escape, focus kept), close returns focus to the photo. FAQ: expand questions; answers are present without JavaScript.

### J5 Change language (US-22 to US-24)

From any page choose a language in the header (own language names). The same page opens in that language; the current language has a tick. Fields without a translation show English marked `lang="en"`.

### J6 Control motion (US-25 to US-28, US-56, US-57)

Visitor sees the hero poster then the scene. Pause motion freezes it for the tab session. With reduced motion, no WebGL, Save-Data, or no JavaScript, the poster remains and nothing else changes.

### J7 Check what this is (US-19, US-20, US-21)

The concept notice is on every page and again in the footer. Terms has "About this concept". Privacy, Cookie notice and Accessibility statement are linked in the footer on every page.

## 2. Admin journeys

### A1 Sign in (US-30, US-64, US-65)

Open the admin path, enter email and password (generic failure message; lock message after repeated failures). A new account is taken to the forced first password change before anything else. After sign in the dashboard shows the last sign in time and failed attempts since.

### A2 Edit a page in four languages (US-33, US-35, US-81)

1. Pages (the Pages index lists every page with its translation status), choose Home. Chips show "3 of 4 languages complete".
2. Edit English, DE, IT and RU side by side; use "Missing translations only" to jump to gaps.
3. Unsaved marker shows; Save changes. Changes are live at once. Another person's change shows a conflict message.
4. Leaving with unsaved changes asks for confirmation.

### A3 Manage a list (US-34)

Choose a list (for example Offers). Add item, edit in four languages, Move up or Move down, Delete with a named confirmation. Rooms: six items, edit only, no add or delete.

### A4 Find and fix missing translations (US-35)

Missing translations screen lists every gap; filter by language; Edit opens the field in the editor.

### A5 Photos (US-38, US-39)

Media library, Upload photos (up to 20), wait for processing, add alt text in English at least (required before use) and captions in four languages, use in a page editor. Deleting a used photo is refused with the list of pages.

### A6 Enquiries and subscribers (US-40, US-41)

Open an enquiry (marked read), mark handled. Data protection subject shows an acknowledge by date chip. Export active subscribers as CSV.

### A7 Settings and accounts (US-37, US-32)

Settings: Book now URL, links, contact details, optional concept sentence. Accounts: create, set temporary password, disable, delete (never the last active administrator).

### A8 Session about to end (US-51, NFR-5)

1. The user has been idle for 27 minutes. A modal dialog "Your session is about to end" opens with the time left in words ("2 minutes 59 seconds"), "Stay signed in" (focused) and "Sign out". Screen readers hear the title and description at once and polite updates at 2 minutes, 1 minute, 30 seconds and 10 seconds.
2. Stay signed in: the dialog closes, focus returns to where it was, "Your session has been extended." is announced and the 30 minute clock restarts. Escape does the same.
3. Sign out: the user is signed out on purpose and lands on Sign in. Unsaved text is not kept.
4. Nothing chosen: at zero the dialog says "You were signed out" with "Sign in again". Unsaved editor text is kept in the tab, the user signs in, returns to the same editor and sees "We restored your unsaved text from before you were signed out. Check it, then choose Save changes."
5. Eight hours after sign in a variant warns 5 minutes ahead (no extension possible). Screen: `screens/admin-session-timeout.md`.

### A9 Edit site wide text (US-33, FR-35, AC-33.2)

Site text, choose a group (Navigation, Footer, Form labels and help, Form messages, Buttons and common labels). Each text has four language cells, with the same chips, "Missing" flags and save bar as the page editor. Saving goes live at once. Screens: `screens/admin-site-text.md`.

### A10 Change the consent or privacy wording (US-13, US-15, US-17, FR-20, FR-22, D-2, AC-13.12)

Consent and privacy wording shows two texts: the newsletter consent text and the contact form privacy information line, each with its current version label, four language cells and a list of earlier versions. Save asks for confirmation ("Save as a new version?") because it creates version V+1 and never changes an old one. Subscribers and enquiries keep the label of the version their visitor saw. Screen: `screens/admin-consent-wording.md`.

## 3. Screen list with states

Legend: L loading, E empty, X error, S success. A dash means the state cannot occur.

### Public

| Screen | File | L | E | X | S |
| --- | --- | --- | --- | --- | --- |
| Home | screens/home.md | poster, optional loader | offers empty text | poster fallback | n/a |
| Rooms and suites overview | screens/rooms-overview.md | reserved boxes | always six | image fallback | n/a |
| Room detail (six rooms, one type) | screens/room-detail.md | reserved boxes | fewer photos | 404 | n/a |
| Dining | screens/dining.md | reserved boxes | list changes | anchor missing | n/a |
| Pools and beach | screens/pools-and-beach.md | reserved boxes | list changes | image fallback | n/a |
| Activities and facilities | screens/activities-and-facilities.md | reserved boxes | list changes | image fallback | n/a |
| Location | screens/location.md | reserved map box | maps link hidden | map alt text | n/a |
| Offers | screens/offers.md | reserved cards | "no offers" text | image fallback | n/a |
| Gallery | screens/gallery.md | reserved squares | "no photos" text | image failed in lightbox | n/a |
| FAQ | screens/faq.md | content in HTML | "no questions" text | n/a | n/a |
| Contact Us (form) | screens/contact-us.md | Sending | first view | validation, retry, unavailable | result page with reference |
| Privacy notice | screens/privacy-notice.md | static | n/a | English fallback | n/a |
| Cookie notice | screens/cookie-notice.md | static | n/a | English fallback | n/a |
| Terms | screens/terms.md | static | n/a | English fallback | n/a |
| Accessibility statement | screens/accessibility-statement.md | static | n/a | English fallback | n/a |
| Newsletter unsubscribe | screens/newsletter-unsubscribe.md | Sending | first view | validation, retry | result message |
| Newsletter sign up (footer) | screens/newsletter-signup.md | Sending | unticked box | validation, retry | confirmation |
| Book now link and label | screens/book-now.md | n/a | URL fallback | n/a | n/a |
| Concept notice | screens/concept-notice.md | server rendered | optional sentence empty | n/a | n/a |
| Loader and transition | screens/loader-and-transition.md | the state | n/a | 8 second timeout | page shown |
| Error pages (404, 500) | screens/error-pages.md | n/a | n/a | the state | n/a |
| Six 3D scenes and posters | screens/scene-areas.md | poster | n/a | poster | n/a |
| Motion, reduced motion, no WebGL, no JS | screens/motion-and-fallbacks.md | n/a | n/a | fallbacks | n/a |
| Frame (notice, header, footer) | screens/frame.md | server rendered | hidden links | English fallback | n/a |
| Legal page layout | screens/legal-pages.md | static | n/a | English fallback | n/a |

### Admin

| Screen | File | L | E | X | S |
| --- | --- | --- | --- | --- | --- |
| Admin shell | screens/admin-shell.md | skeleton | n/a | session ended | n/a |
| Session timeout warning (dialog) | screens/admin-session-timeout.md | Extending | n/a | extend failed, ended | extended |
| Sign in | screens/admin-sign-in.md | Signing in | first view | wrong details, locked, session ended | redirect |
| Forced first password change | screens/admin-first-password-change.md | Saving | first view | six messages | redirect and alert |
| Dashboard | screens/admin-dashboard.md | skeleton | no enquiries | retry | n/a |
| Pages index | screens/admin-pages-index.md | skeleton | no pages (cannot happen, 21 fixed) | retry | n/a |
| Page editor (four languages) | screens/admin-page-editor.md | skeleton | four missing cells | save failed, too long, conflict | saved and live |
| Missing translations | screens/admin-missing-translations.md | skeleton | "nothing missing" | retry | n/a |
| Site text (four languages) | screens/admin-site-text.md | skeleton | all cells missing | save failed, too long, conflict | saved and live |
| List management (rooms fixed at six) | screens/admin-list-management.md | skeleton | "no items yet" | reorder failed | saved |
| Media library | screens/admin-media-library.md | skeleton | "no photos yet" | delete refused | replaced, deleted |
| Media upload | screens/admin-media-upload.md | per file progress | no files chosen | per file messages | uploaded |
| Enquiries (list and detail) | screens/admin-enquiries.md | skeleton | "no enquiries yet" | retry | handled |
| Subscribers and export | screens/admin-subscribers.md | skeleton | "no subscribers yet" | export failed | export ready |
| Consent and privacy wording | screens/admin-consent-wording.md | skeleton | no earlier versions | save failed, too long, missing link, conflict | new version saved |
| Settings | screens/admin-settings.md | skeleton | optional fields empty | seven messages | saved and live |
| Account management | screens/admin-accounts.md | skeleton | n/a | five messages | created, disabled, deleted |

Not built this release (future screens only, no design here): two step verification (FR-33), data request records (FR-44), audit log (FR-46).

Form messages for all forms are collected in `screens/forms-validation.md`.

## 4. Page coverage check against FR-1

Home; Rooms overview; six rooms (one screen type); Dining; Pools and beach; Activities and facilities; Location; Offers; Gallery; FAQ; Contact Us; Privacy notice; Cookie notice; Terms; Accessibility statement; Newsletter unsubscribe: 21 page URLs per language, 84 in total, all covered by the screen files above.

## 5. Prototype coverage

Built in `design/prototype/`: Home (four languages), Rooms overview, Family Suite, Contact (empty, errors, sending, retry, success), 404, loader, transition, admin sign in (and error), dashboard, page editor, session timeout warning (`admin-session-warning.html`). Other public screens reuse these components and are specified in the screen files without a prototype.
