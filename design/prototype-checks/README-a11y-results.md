# Accessibility check of the new prototype page (axe-core, wcag2a/2aa/21a/21aa/22aa and best-practice tags)

Page: design/prototype/admin-session-warning.html. Script: design/prototype-checks/h3-session-warning-check.mjs. Headless Chromium, one context.

- axe-admin-session-warning-1440.json: 0 violations, 1 incomplete (color-contrast), 30 passes
- axe-admin-session-warning-375.json: 0 violations, 1 incomplete (color-contrast), 30 passes
- axe-admin-session-warning-ended-1440.json: 0 violations, 1 incomplete (color-contrast), 28 passes

Incomplete color-contrast: the translucent scrim over the page stops axe computing the background. Manual: countdown text #7A4B00 on #FFF1D6 is 6.6 to 1 (computed); dialog text is on white.
Behaviour checks: h3-results.json (12 of 12 pass: alertdialog role and name, initial focus, inert background, focus trap, Escape, live region, 320 px reflow, ended state).
A-1 checks: a1-results.json (6 of 6 pass; 4 failed before the defer fix).
