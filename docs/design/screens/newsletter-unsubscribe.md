# Screen: Newsletter unsubscribe

- Stories: US-16
- Requirements: FR-23
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (form pattern of contact.html)
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Let anyone remove their address.

## Layout

### 375 px

- Heading band; one field; button "Unsubscribe".

### 768 px

- Same, 480 px form.

### 1440 px

- Form centred in a 6 column panel.

## Components

- Email field
- Alert (success, error)
- Button "Unsubscribe"
- Hidden spam trap

## Content

- Lead: "Enter the email address you used to sign up. We will remove it from the list."
- Result page shows the same message for every valid address (no confirmation whether it was subscribed).

## States

- Loading: Button shows "Sending..." and is disabled.
- Empty: First view: empty field.
- Error: Validation and retry messages below; typed email kept.
- Success: Result message below in a success alert with heading "Request received".

## Validation and form messages (plain language)

| Situation | Message shown |
| --- | --- |
| Email, empty | Enter the email address you want to remove. |
| Email, wrong format | Enter an email address like this: name@example.com. |
| Result (same for every valid address) | If this address was on the newsletter list, it has been removed. You will not receive the newsletter any more. |
| Server refused | We could not process your request. Please check the form and try again. |

## Interactions

- Works without JavaScript by a normal form submission.

## Accessibility

- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
