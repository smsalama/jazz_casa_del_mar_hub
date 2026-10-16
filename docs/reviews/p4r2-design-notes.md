# P4R2-DESIGN notes: items needing a requirement, contract or architecture decision

These are recorded here because the task may not edit requirements, stories, contract or ADRs. Scope: fixes for design gate findings DC-H3, DC-H4 and A-1 only. Medium and low findings go to T2 as known items (Steven's decision). DC-H1 and DC-H2 are untouched.

## From the session timeout design (DC-H3, `docs/design/screens/admin-session-timeout.md`)

1. Warning lead time. The design warns 3 minutes before the 30 minute idle limit. NFR-5 and AC-51.3 require at least 2 minutes, so no change is needed, but the lead time should be a configuration value with a floor of 2 minutes. Architecture to confirm.
2. Server must send the session expiry time with responses and accept an "extend" request ("Stay signed in"). A "typing is activity" report at most once a minute is also assumed. Needs an API contract entry (contract/ is not edited here).
3. Eight hour absolute limit cannot be extended. WCAG 2.2.1 allows the exception for essential limits; Accessibility and Security roles should confirm that a security driven absolute limit qualifies. The design warns 5 minutes ahead and asks the user to save and sign in again.
4. Restoring unsaved editor text after a forced sign in needs (a) a return address on sign in and (b) tab session storage of unsaved field text. No visitor personal data is involved, but the Architect should confirm it is acceptable (no cookie or storage rule conflict) and whether the sign in return address needs an open redirect guard (it must accept only admin paths).
5. Possible new acceptance criteria for US-51: ended state message and focus; hard limit variant; extend failure message. Not added (stories.md is read only here).

## From the DC-H4 screens

6. Pages index lists the six room pages with the action "Edit in Rooms list" because FR-36 places room entries in list management. If room page level text (browser title, meta description) is meant to be edited in a page editor, FR-35 and FR-36 should say so.
7. Consent wording: the design requires all four languages before a consent text can be saved (no English fallback for consent). This is a design choice for Legal to confirm. Requirement text does not say it.
8. Consent wording: provider (controller) name feeds `{controller}`; the design says a change of the controller name in Settings creates new versions of both texts automatically, so that D-2 holds. Needs a data model and requirement line (glossary "Wording version"). 
9. Archived versions are immutable and never deleted by the admin; the retention schedule has no row for archived wording. Legal or the Architect should add one.
10. The text kept per version stores the resolved controller name; placeholders `{controller}` and `{privacy_link}` are a design device. FR-20 and FR-22 should name them as required content or the Architect should choose a different mechanism.
11. Site text groups (Navigation, Footer, Form labels and help, Form messages, Buttons and common labels, Error pages) and character limits are design proposals; data model and contract need matching string keys (AC-33.2).
12. Missing translation count (nav chip and dashboard) now also counts Site text and consent wording cells; the Dashboard stat "Fields missing a translation" should match.

## Prototype and navigation

13. `design/prototype/admin-*.html` navigation lists were not extended with Site text and Consent and privacy wording; those screens have no prototype. The Pages nav link in the prototypes still goes to the editor, not to a Pages index page. This is a known gap (medium item A or T2).
14. CLAUDE.md asks every task to update `state/project.json` and `status.md`; this task was forbidden to edit them, so the Orchestrator must record it.
15. The axe `color-contrast` rule reports "incomplete" (not a violation) on the dialog because of the translucent scrim over the page; manual check: dialog text on white and the countdown (#7A4B00 on #FFF1D6) both exceed 4.5 to 1.
