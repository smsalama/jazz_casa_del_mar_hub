# Form validation and messages (plain language)

- Stories: US-13, US-15, US-16, US-30, US-32, US-33, US-37, US-38
- Requirements: FR-19, FR-20, FR-22, FR-23, FR-32, FR-34, FR-35, FR-39, FR-40
- Prototype: contact-errors.html, contact-sending.html, contact-retry.html, contact-success.html, admin-sign-in-error.html

## Rules for every message

- Say what is wrong and how to fix it, in the words of the person using the form. No codes, no blame, no apologies for the visitor's mistake.
- Shown beside the field with an icon and words, in the error colour (never colour alone), and again as a list of links in the summary at the top of the form.
- Linked to the field with aria-describedby; the summary has role alert and takes focus after a failed submit; links in the summary move focus to the field.
- The visitor's typed values are always kept (except passwords).
- Names the field. Never a generic "Invalid input".
- Texts below are English; the four language versions live in the language resource files and are edited by the translation process (FR-24). German, Italian and Russian follow the same pattern.
- Security messages (spam trap, token, speed) never say which check failed.

## Contact form (Contact Us)

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

## Newsletter sign up (footer)

| Situation | Message shown |
| --- | --- |
| Email, empty | Enter your email address. |
| Email, wrong format | Enter an email address like this: name@example.com. |
| Email, over 254 characters | That email address is too long. Use 254 characters or fewer. |
| Consent not ticked | Tick the box to confirm you want to receive the newsletter. |
| Server refused | We could not sign you up. Please check the form and try again. |
| Success | Thank you. Your address is on the list. You can unsubscribe at any time. |
| Already subscribed | Thank you. Your address is on the list. You can unsubscribe at any time. |

## Newsletter unsubscribe

| Situation | Message shown |
| --- | --- |
| Email, empty | Enter the email address you want to remove. |
| Email, wrong format | Enter an email address like this: name@example.com. |
| Result (same for every valid address) | If this address was on the newsletter list, it has been removed. You will not receive the newsletter any more. |
| Server refused | We could not process your request. Please check the form and try again. |

## Admin sign in

| Situation | Message shown |
| --- | --- |
| Email, empty | Enter your email address. |
| Email, wrong format | Enter an email address like this: name@example.com. |
| Password, empty | Enter your password. |
| Wrong details (generic) | The email address or password is not right. Check both and try again. |
| Account locked | Too many attempts. Sign in is paused for a short time. Try again later or ask another administrator for help. |
| Session ended | You were signed out because the session ended. Sign in again to continue. |

## Admin password change (forced first change, change my password)

| Situation | Message shown |
| --- | --- |
| Current password, empty | Enter your current password. |
| Current password, wrong | The current password is not right. |
| New password, too short | Your new password is too short. Use at least 12 characters. |
| New password, too common | That password is too easy to guess. Choose a longer one with words only you would pick. |
| New password, same as current | Choose a password that is different from your current one. |
| Confirm, different | The two new passwords do not match. Type the same password in both fields. |

## Other forms

Admin settings, accounts, page editor, media upload: messages are on their screen files (admin-settings.md, admin-accounts.md, admin-page-editor.md, admin-media-upload.md).
