# Screen: Forced first password change

- Stories: US-30, US-32, US-64
- Requirements: FR-34, FR-32
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (sign in layout with three password fields)
- Admin shell and rules: `admin-shell.md`

## Purpose

Make a new account replace its temporary password before anything else.

## Layout

### 375 px

- Form card: h1 "Choose a new password", explanatory line, current (temporary) password, new, confirm, each with Show toggle, button "Save new password".

### 768 px

- As sign in.

### 1440 px

- Split layout as sign in.

## Components

- Form fields
- Password toggle
- Strength hints as text list (length met, not common), not a colour bar
- Alert

## Content

- Lead: "Your account was set up with a temporary password. Choose your own to continue." No other screen is reachable until done.

## States

- Loading: Button "Saving..." disabled.
- Empty: First view.
- Error: Messages below.
- Success: Redirect to dashboard with a success alert "Your password has been changed."

## Validation and form messages (plain language)

| Situation | Message shown |
| --- | --- |
| Current password, empty | Enter your current password. |
| Current password, wrong | The current password is not right. |
| New password, too short | Your new password is too short. Use at least 12 characters. |
| New password, too common | That password is too easy to guess. Choose a longer one with words only you would pick. |
| New password, same as current | Choose a password that is different from your current one. |
| Confirm, different | The two new passwords do not match. Type the same password in both fields. |

## Interactions

- Requirements list updates on input and is announced politely (aria-live polite) only after a pause.

## Accessibility

- autocomplete new-password; paste allowed.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
