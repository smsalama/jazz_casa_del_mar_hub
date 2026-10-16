# Screen: Admin sign in

- Stories: US-30, US-64, US-65, US-51
- Requirements: FR-32, FR-17
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: admin-sign-in.html, admin-sign-in-error.html
- Admin shell and rules: `admin-shell.md`

## Purpose

Sign in to the staff portal. English only.

## Layout

### 375 px

- Concept notice; art panel hidden; form card: h1 "Sign in", email, password with Show password button, Sign in button.

### 768 px

- Same, form card 480 px centred.

### 1440 px

- Split: art panel left (placeholder poster, "Admin portal" text), form right.

## Components

- Form fields
- Password toggle (button, aria-pressed)
- Alert (error)
- Button Sign in

## Content

- No "remember me", no guest account, no default password.
- After sign in the portal shows the time of the last successful sign in and the count of failed attempts.

## States

- Loading: Button "Signing in..." disabled.
- Empty: First view.
- Error: Generic message that does not say which part was wrong; lock message after repeated failures; session ended message.
- Success: Redirect to dashboard (or to first password change).

## Validation and form messages (plain language)

| Situation | Message shown |
| --- | --- |
| Email, empty | Enter your email address. |
| Email, wrong format | Enter an email address like this: name@example.com. |
| Password, empty | Enter your password. |
| Wrong details (generic) | The email address or password is not right. Check both and try again. |
| Account locked | Too many attempts. Sign in is paused for a short time. Try again later or ask another administrator for help. |
| Session ended | You were signed out because the session ended. Sign in again to continue. (After "Sign in again" from the timeout dialog, a successful sign in returns to the page that was open; see `admin-session-timeout.md`.) |

## Interactions

- Show password toggles the type and its own label; Enter submits; no autofocus tricks.

## Accessibility

- autocomplete username and current-password; error alert receives focus; paste is allowed in password.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
