# Screen: Admin account management

- Stories: US-32
- Requirements: FR-34
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (table, dialog and form patterns)
- Admin shell and rules: `admin-shell.md`

## Purpose

Create, disable, enable and delete admin accounts; set a temporary password; change your own password.

## Layout

### 375 px

- Account cards with name, email, status chip, actions in a disclosure.

### 768 px

- Table.

### 1440 px

- Table with actions column; "Add account" top right.

## Components

- Data table
- Dialogs (create, set temporary password, disable, delete)
- Chips (Active, Disabled, Must change password)
- Alerts

## Content

- Create account: email, display name, initial password (shown once, must be changed at first sign in).
- The last active Administrator cannot be disabled or deleted: the action is disabled with text "This is the last active administrator."
- Change my password: separate screen using the password messages.

## States

- Loading: Skeleton rows.
- Empty: Not possible (at least one account exists).
- Error: "We could not save the account. Try again." Duplicate email: "An account with this email already exists."
- Success: "Account created. Give the person their temporary password in person." "Account disabled." "Account deleted."

## Validation messages (plain language)

| Situation | Message shown |
| --- | --- |
| Email, empty | Enter the email address for this account. |
| Email, wrong format | Enter an email address like this: name@example.com. |
| Email, already used | An account with this email already exists. |
| Initial password, too short | The password is too short. Use at least 12 characters. |
| Display name, empty | Enter a name so other administrators can recognise this account. |

## Interactions

- Delete dialog names the person; focus returns to the row.

## Accessibility

- Actions named with the account name.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
