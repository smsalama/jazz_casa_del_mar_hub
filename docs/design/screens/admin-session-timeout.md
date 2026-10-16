# Screen: Admin session timeout warning

- Stories: US-51 (and US-30 for the sign in that follows)
- Requirements: NFR-5 (WCAG 2.2.1 Timing Adjustable), NFR-20, retention schedule row "Admin session data" (30 minutes idle, 8 hours after sign in)
- Acceptance criteria: AC-51.3 and the AC lines of US-51 in `docs/stories.md`
- Prototype: `design/prototype/admin-session-warning.html` (open dialog with a live countdown; add `?remaining=20` to see a short run, `?remaining=0` for the ended state)
- Admin shell and rules: `admin-shell.md`
- Closes design gate findings DC-H3 and A-2

## Purpose

Warn a signed-in user before the idle limit ends the session, let them extend it with one action, and never lose their typing without telling them.

## Timing rules

| Item | Value |
| --- | --- |
| Idle limit | 30 minutes without a request that counts as activity (any save, page load or "Stay signed in"). Typing in a form counts as activity in the page and is reported to the server at most once per minute. |
| Warning appears | When 3 minutes of the idle limit remain (after 27 minutes idle). This is at least 2 minutes before expiry as NFR-5 and AC-51.3 require, with one extra minute so that a person who needs longer than 20 seconds to react still has more than 2 minutes. |
| Test configuration | For AC-51.3 the tester waits 28 minutes and then 2 more. The dialog is already on screen from minute 27, so it appeared 3 minutes before expiry, at least the 2 minutes required. The warning lead time is a setting (default 3 minutes) that must never be set below 2 minutes. |
| Extending | "Stay signed in" asks the server to restart the idle clock. The user may extend as many times as they like until the 8 hour limit. |
| Source of time | The server sends the expiry time with every response. The page counts down to that time and checks it against the server again when the tab becomes visible, so a sleeping laptop or throttled background tab cannot show a wrong time. |
| Several tabs | Tabs share the expiry time through the browser (storage event). Extending in one tab closes the dialog in the others. |
| Hard limit | 8 hours after sign in the session ends whatever the activity. A second variant of the dialog warns 5 minutes before (see States). See the note in "Open points" about WCAG 2.2.1. |

## Layout

The dialog is the existing `.dialog` pattern on a `.dialog-scrim` (z-index 95, above the save bar).

| Width | Layout |
| --- | --- |
| 375 | Dialog fills the width minus the 16 px gutter, centred vertically, the two buttons stacked full width with "Stay signed in" first. Content scrolls inside the dialog if the text is zoomed to 200 percent; the page behind does not scroll. |
| 768 | Dialog 30 rem wide, centred, buttons in one row aligned right, "Stay signed in" first (left) then "Sign out", so the visual order matches the focus order. |
| 1440 | As 768. |

## Components

- Modal dialog (`role="alertdialog"`, `aria-modal="true"`)
- Icon (clock), heading, countdown, explanation, unsaved changes note (conditional)
- Primary button "Stay signed in", secondary button "Sign out"
- Inline error alert (conditional)
- Polite live region for time announcements (visually hidden)

## Content

State: warning (idle limit).

- Heading (h2, id `st-title`): "Your session is about to end"
- Description (id `st-desc`): "You have been inactive for a while. For your security you will be signed out in" followed by the countdown.
- Countdown (visible, large, text not colour only): "2 minutes 59 seconds". It shows minutes and seconds in words, never "02:59", so it reads well aloud. It is `aria-hidden="true"` so it is not announced every second; the live region carries the announcements.
- Unsaved note (only when the page has unsaved changes): "You have unsaved changes in 1 field. Choose Stay signed in, then save them."
- Buttons: "Stay signed in" (primary, receives focus), "Sign out" (secondary).

## Announcements to assistive technology

- On opening, the dialog is announced by its role, title and description: "Your session is about to end. You have been inactive for a while. For your security you will be signed out in 3 minutes."
- Description text is written with the starting time as static words ("3 minutes"), and the visible countdown is separate, so the dialog name and description do not change every second.
- A visually hidden live region (`role="status"`, polite) announces the remaining time at 2 minutes, 1 minute, 30 seconds and 10 seconds: "About 1 minute left before you are signed out." Never every second.
- Result messages: after "Stay signed in": the dialog closes and the page status region says "Your session has been extended." After expiry see below.

## Focus management

1. On open, remember the element that had focus (for example a field in the editor).
2. Move focus to "Stay signed in" (the safe, non destructive action).
3. Trap Tab and Shift+Tab inside the dialog (two buttons and, if present, the error alert is not focusable). Everything behind is `inert`, so the page cannot be reached by keyboard, pointer or screen reader.
4. Escape does the same as "Stay signed in" (it is the non destructive way to dismiss, so it extends and does not sign out).
5. On close by "Stay signed in" or Escape, restore focus to the remembered element, with scroll position unchanged. If the remembered element no longer exists, focus the page h1.
6. Typed text in the page behind is never changed or cleared by the dialog opening.

## States

- Loading: "Stay signed in" pressed: the button shows a spinner and the words "Extending", is `aria-disabled="true"`, other button stays enabled. The countdown keeps running.
- Warning (default): as above.
- Hard limit variant (at 5 minutes before 8 hours after sign in): heading "Your session reaches its time limit"; description "For your security a session lasts at most 8 hours. You will be signed out at 17:42, in 4 minutes 59 seconds. Save your changes now, then sign in again to continue." The primary button is "Keep working" (closes the dialog and leaves a countdown chip "Signed out in 4 minutes" in the top bar) and the secondary is "Sign out". There is no extension because the server will not allow it.
- Error: extension failed (network or server): an alert inside the dialog, `role="alert"`, "We could not extend your session. Check your connection and try again." The countdown continues; "Stay signed in" returns to its normal label so the user can try again. If the server answers that the session has already ended, go to the Ended state.
- Success: dialog closes, focus restored, polite status "Your session has been extended."
- Empty: not applicable.
- Ended (countdown reaches zero, or the server reports the session has gone): the dialog content is replaced, still a modal alertdialog:
  - Heading: "You were signed out"
  - Text: "You were signed out because the session ended. Sign in again to continue."
  - If there was unsaved text: "Your unsaved text from this page is kept in this browser tab. After you sign in you will come back here and can save it."
  - Single button: "Sign in again" (receives focus). It goes to the sign in page with a return address for the page that was open.
  - The page behind is no longer usable: Save and other actions would fail, and `inert` stays on.

## Unsaved editor changes

- The warning never saves anything for the user and never discards anything.
- While the dialog is open, nothing changes in the form and the "Unsaved changes in N fields" marker stays.
- At the Ended state, every field with unsaved changes is written to this tab's session storage (key by page and field, English admin only, text of the content being edited, no personal data of visitors; cleared on a successful save, on sign out by choice, or when the tab closes). This is a convenience of the browser, so if storage is blocked the Ended message omits the second sentence and the text stays visible in the page until the tab is closed.
- After the next sign in the user is returned to the same editor and sees an info alert at the top: "We restored your unsaved text from before you were signed out. Check it, then choose Save changes." Restored cells carry the same "changed" marker as other unsaved cells. If the page was changed by someone else in the meantime, the conflict alert of `admin-page-editor.md` appears and the restored text is kept in a copy below, as in AC-78.3.
- Choosing "Sign out" in the dialog is a deliberate act: if there are unsaved changes the button label stays "Sign out" and the dialog already says in the unsaved note that changes are lost; the restore copy is not kept after a deliberate sign out.

## Keyboard

| Key | Result |
| --- | --- |
| Tab, Shift+Tab | Cycle between "Stay signed in" and "Sign out" only |
| Enter, Space | Activate the focused button |
| Escape | Same as Stay signed in |

## Accessibility

- WCAG 2.2.1 Timing Adjustable: a warning at least 2 minutes before the limit, and a one step extension that needs no more than one key press (well beyond the 20 seconds required).
- 4.1.2 and 4.1.3: role, name, description and polite status messages as above; the countdown is not announced every second.
- 2.4.3 and 2.4.11: focus order is the two buttons, the focus ring is the standard 3 px ring and the dialog sits above the sticky save bar so it never covers the focused control.
- 1.4.3 and 1.4.11: text at least 4.5 to 1, the clock icon is paired with the words; the warning tone is not conveyed by colour alone.
- 2.5.8: both buttons at least 44 by 44 px.
- 1.4.10: reflows at 320 px; at 200 percent zoom the dialog content scrolls inside the dialog.
- Reduced motion: the dialog appears without animation; the countdown is text only. No sound.
- The dialog does not depend on JavaScript for the security outcome: the server ends the session at the limit whether or not the warning is shown. Without JavaScript the person sees the Ended message on the next request.

## Open points (recorded in `docs/reviews/p4r2-design-notes.md`)

- The 8 hour absolute limit cannot be extended. WCAG 2.2.1 allows a limit that is essential, and a security driven absolute limit is usually argued to be one, but this should be confirmed by the Accessibility and Security roles.
- Restoring unsaved text after a forced sign in needs a return address on sign in and tab storage; this is a design intent that needs an architecture decision.
