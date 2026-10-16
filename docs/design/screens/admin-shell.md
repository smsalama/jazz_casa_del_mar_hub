# Admin shell (applies to every admin screen)

- Stories: US-30, US-32 to US-41, US-51
- Requirements: FR-17, FR-32, FR-35 to FR-40, NFR-5
- Prototype: `design/prototype/admin-dashboard.html`, `admin-editor.html`, `admin-session-warning.html`, `css/admin.css`

The admin portal is in English. It shows the concept notice on every screen (FR-17). One role: Administrator.

## Layout

| Width | Layout |
| --- | --- |
| 375 | Concept notice, Abyss top bar (wordmark "Admin portal", account name and Sign out inside the navigation), navigation list in a Deep block above content (groups Overview, Content, Messages, Site), content in one column. |
| 768 | As 375, navigation as a two column block. |
| 1440 | Fixed 240 px Deep sidebar (sticky from 1024 px), top bar with account name and Sign out button, content max 1160 px on `#EDF2F1`. |

## Navigation items

Four groups, in this order. Items marked (new) close design gate finding DC-H4.

| Group | Items | Screen |
| --- | --- | --- |
| Overview | Dashboard | `admin-dashboard.md` |
| Content | Pages (new index) | `admin-pages-index.md`, then `admin-page-editor.md` per page |
| Content | Site text (new) | `admin-site-text.md` |
| Content | Lists | `admin-list-management.md` |
| Content | Missing translations (count chip) | `admin-missing-translations.md` |
| Content | Media library | `admin-media-library.md` |
| Messages | Enquiries (unread count), Subscribers | `admin-enquiries.md`, `admin-subscribers.md` |
| Site | Consent and privacy wording (new) | `admin-consent-wording.md` |
| Site | Settings, Accounts | `admin-settings.md`, `admin-accounts.md` |

Then Sign out. Current item has `aria-current="page"`, a bar and a filled background (not colour alone). Pages stays marked current while a page is open in the editor. The Missing translations count includes missing cells on Site text and on the consent wording.

## Shared patterns

- Save bar: sticky bottom; marker and words "Unsaved changes in 1 field"; Discard changes (secondary), Save changes (primary).
- Alerts: success (role status), error (role alert, focus), warning, info; each with icon and heading.
- Dialogs: modal, focus trapped, background inert, Escape cancels (or, for the session warning, extends), action buttons named for their effect.
- Tables: caption, th scope, focusable labelled scroll region on narrow screens, row actions named with the item.
- Empty, loading (skeleton lines), error (message and Retry) and success states are defined per screen.
- Session: 30 minutes idle limit and 8 hours absolute limit (retention schedule). A warning dialog appears 3 minutes before the idle limit (never less than 2 minutes, NFR-5, AC-51.3, WCAG 2.2.1) with the remaining time and the actions "Stay signed in" and "Sign out"; it is announced to assistive technology, takes and returns focus, and never saves or discards editor text. Full design in `admin-session-timeout.md`. When the session has ended the user sees "You were signed out because the session ended. Sign in again to continue." Unsaved text in an editor is kept in the tab and restored after sign in (see that file).
- Shared text area on every content screen: the language cells, "Missing" chip and unsaved marker patterns of `admin-page-editor.md` are reused by Site text and by the consent wording editor.
- Not built this release (documented as future screens only): two step verification (FR-33), data request records (FR-44), audit log review (FR-46). Their navigation items do not appear.

## Accessibility

Same rules as the public site (WCAG 2.2 AA). Drag and drop always has a button alternative (AC-47.6). Language cells carry `lang`. Status changes use polite live regions. The session warning is the only alert dialog; it uses `role="alertdialog"`.
