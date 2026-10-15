# Screen: Newsletter sign up (footer form)

- Stories: US-15
- Requirements: FR-22
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: footer on every prototype page
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Collect an email address with explicit consent.

## Layout

### 375 px

- Footer top band: heading, lead, label, field, consent checkbox with text, Subscribe button, all stacked.

### 768 px

- Heading and lead left, form right.

### 1440 px

- Same two columns, field and button inline is not used (consent text needs room).

## Components

- Email field
- Checkbox with 24 px control inside a 44 px high row
- Button Subscribe (sun on Driftwood)
- Alerts
- Hidden spam trap

## Content

- Heading "Newsletter", lead "News and offers from the resort, sent to your inbox."
- Consent text: "I would like to receive the resort's newsletter. The controller is [controller to be confirmed]. I can unsubscribe at any time. Read the privacy notice." (privacy notice is a link).
- Success text: see messages.

## States

- Loading: Button "Sending..." disabled.
- Empty: Checkbox unticked by default.
- Error: Messages below, shown in the footer in the light error colour on Driftwood (8.7 to 1) with icon; focus moves to the first problem.
- Success: Replace the form with a success alert and the sentence; works without JavaScript through a result page.

## Validation and form messages (plain language)

| Situation | Message shown |
| --- | --- |
| Email, empty | Enter your email address. |
| Email, wrong format | Enter an email address like this: name@example.com. |
| Email, over 254 characters | That email address is too long. Use 254 characters or fewer. |
| Consent not ticked | Tick the box to confirm you want to receive the newsletter. |
| Server refused | We could not sign you up. Please check the form and try again. |
| Success | Thank you. Your address is on the list. You can unsubscribe at any time. |
| Already subscribed | Thank you. Your address is on the list. You can unsubscribe at any time. |

## Interactions

- The whole consent row is the checkbox target.

## Accessibility

- Label above field; checkbox label includes the controller name; errors linked with aria-describedby.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
