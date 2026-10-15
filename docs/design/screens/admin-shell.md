# Admin shell (applies to every admin screen)

- Stories: US-30, US-32 to US-41, US-51
- Requirements: FR-17, FR-32, FR-35 to FR-40
- Prototype: `design/prototype/admin-dashboard.html`, `admin-editor.html`, `css/admin.css`

The admin portal is in English. It shows the concept notice on every screen (FR-17). One role: Administrator.

## Layout

| Width | Layout |
| --- | --- |
| 375 | Concept notice, Abyss top bar (wordmark "Admin portal", account name and Sign out inside the navigation), navigation list in a Deep block above content (groups Overview, Content, Messages, Site), content in one column. |
| 768 | As 375, navigation as a two column block. |
| 1440 | Fixed 240 px Deep sidebar (sticky from 1024 px), top bar with account name and Sign out button, content max 1160 px on `#EDF2F1`. |

## Navigation items

Dashboard; Pages, Lists, Missing translations (count chip), Media library; Enquiries (unread count), Subscribers; Settings, Accounts; Sign out. Current item has `aria-current="page"`, a bar and a filled background (not colour alone).

## Shared patterns

- Save bar: sticky bottom; marker and words "Unsaved changes in 1 field"; Discard changes (secondary), Save changes (primary).
- Alerts: success (role status), error (role alert, focus), warning, info; each with icon and heading.
- Dialogs: modal, focus trapped, Escape cancels, action buttons named for their effect.
- Tables: caption, th scope, focusable labelled scroll region on narrow screens, row actions named with the item.
- Empty, loading (skeleton lines), error (message and Retry) and success states are defined per screen.
- Session: signed out after inactivity with message "You were signed out because the session ended. Sign in again to continue." Unsaved work in a form is kept in the form where the browser allows.
- Not built this release (documented as future screens only): two step verification (FR-33), data request records (FR-44), audit log review (FR-46). Their navigation items do not appear.

## Accessibility

Same rules as the public site (WCAG 2.2 AA). Drag and drop always has a button alternative (AC-47.6). Language cells carry `lang`. Status changes use polite live regions.
