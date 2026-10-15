# Screen: Contact Us (contact form)

- Stories: US-13, US-11, US-17
- Requirements: FR-12, FR-19, FR-20
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: contact.html, contact-errors.html, contact-sending.html, contact-retry.html, contact-success.html
- Frame (concept notice, header, footer, newsletter): `frame.md`

## Purpose

Let a visitor send an enquiry and see the other ways to reach the resort.

## Layout

### 375 px

- Heading band; form (name, email, telephone optional, subject radio, message, send, privacy line); contact details card below (telephone, WhatsApp, email, Google Maps).

### 768 px

- Same single column, form 640 px max.

### 1440 px

- Form 7 columns left, contact details card sticky 4 columns right.

## Components

- Form fields with labels, hints
- Radio group (subject)
- Textarea with live count only when JavaScript is on
- Error summary
- Field errors
- Button "Send message"
- Alerts (error, retry)
- Contact details card
- Privacy line

## Content

- Fields: Name (required), Email address (required), Telephone (optional), Subject (General enquiry selected by default; Data protection request or complaint), Message (required).
- No consent box. Privacy line under the button: "We use your details only to answer your message. Read how in the privacy notice."
- Contact details from settings: telephone link, WhatsApp, email, Google Maps; synthetic placeholders.
- Success page: heading "Thank you, your message has been sent", reference like ENQ-7KQ4MD, text "The resort will reply using the email address you gave. Keep this reference if you write again." Link to Home.

## States

- Loading: Sending: button shows "Sending..." and is disabled with aria-busy; fields stay editable text kept (contact-sending.html).
- Empty: Form empty on first view: normal. Contact details empty in settings: each missing row is hidden.
- Error: Validation: summary at top (role alert, receives focus) listing each problem as a link to its field; message beside each field with icon and words; typed values kept. Server refused: retry alert. Server unavailable: error alert with values kept. See messages below.
- Success: Confirmation page with reference (contact-success.html), reached by a normal redirect so it also works without JavaScript.

## Validation and form messages (plain language)

| Situation | Message shown |
| --- | --- |
| Name, empty | Enter your name. |
| Name, 1 character | Your name must be at least 2 characters. Add your full name or a short version. |
| Name, over 100 characters | Your name is too long. Use 100 characters or fewer. |
| Email, empty | Enter your email address so the resort can reply. |
| Email, wrong format | Enter an email address like this: name@example.com. |
| Telephone, wrong characters | The telephone number can only contain digits, spaces, plus signs, brackets and hyphens. |
| Subject, none chosen | Choose what your message is about. |
| Message, empty | Write your message. |
| Message, under 10 characters | Your message is too short. Write at least 10 characters so the team can help. |
| Message, over 2000 characters | Your message is too long. Use 2000 characters or fewer. |
| Error summary heading | Please fix these fields before sending |
| Server refused (trap, token, too fast) | We could not send your message. Please check it and send it again. |
| Server unavailable | We could not send your message because of a problem on our side. Your text is still in the form. Please try again in a few minutes. |

## Interactions

- Validation runs on submit; with JavaScript fields re-check on leaving the field (not while typing). Focus moves to the error summary. Hidden spam trap is off screen and aria-hidden; 2 second minimum time is server side only (no visible effect).
- Press feedback on Send message; the button label never changes meaning.

## Accessibility

- Every field has a visible label above it; required shown as the word "(required)"; hints and errors linked with aria-describedby; error text uses icon plus words; autocomplete tokens name, email, tel.
- Subject radios are a fieldset with legend; target is the whole 44 px row.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
