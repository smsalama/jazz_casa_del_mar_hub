# Screen: Admin settings

- Stories: US-37
- Requirements: FR-39, FR-35 (concept sentence), D-2 (provider details feed the consent wording)
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (form pattern)
- Admin shell and rules: `admin-shell.md`

## Purpose

Edit Book now URL, maps and social links, telephone, WhatsApp, email, postal address, the optional concept sentence and the provider details.

## Layout

### 375 px

- Grouped form: Links, Contact details, Concept notice, Who runs this site; sticky save bar.

### 768 px

- Form 640 px.

### 1440 px

- Two columns: group list left, fields right.

## Components

- Form fields
- Four language cells for the optional concept sentence
- Save bar
- Alerts

## Content

- Where other texts live: a note at the top says "Menu, footer and form text: Site text. Newsletter consent and privacy line wording: Consent and privacy wording." with links. The optional concept sentence stays here.
- Placeholder defaults are marked "Placeholder, replace before use". Empty social links and WhatsApp hide the matching items on the public site; empty Maps link hides the link.

## States

- Loading: Skeleton fields.
- Empty: Optional fields empty by design.
- Error: Messages below.
- Success: "Settings saved. They are live."

## Validation messages (plain language)

| Situation | Message shown |
| --- | --- |
| Link, not https | Enter a full link that starts with https://, for example https://www.example.com. |
| Link, too long | That link is too long. Use 2048 characters or fewer. |
| Link, has user name or password | Remove the user name and password from the link. |
| Telephone or WhatsApp, wrong characters | Use digits, spaces and a plus sign at the start only. |
| Email, wrong format | Enter an email address like this: name@example.com. |
| Concept sentence, too long | This sentence is too long. Use 200 characters or fewer. |
| Server error | Your settings were not saved. Your text is still here. Try again. |

## Interactions

- As the page editor: unsaved marker and leave warning.
- Changing the provider (controller) name or details: the controller name is part of the words visitors agree to, so before saving a warning alert shows "This changes the controller name in the newsletter consent text and the contact form privacy line. New versions of both texts are saved at the same time and the old versions are kept." Save asks for confirmation with the button "Save and create new wording versions". Cross reference: `admin-consent-wording.md`.
- Session timeout: as the page editor.

## Accessibility

- Each field has a label and hint; types: url, tel, email; errors linked.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
