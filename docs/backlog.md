# Backlog: Jazz Casa del Mar resort website

- Client slug: jazz_casa_del_mar
- Project slug: site
- Task: P2-T1b (Product Owner), updated by P2-T3 on 2026-10-15 after the T1 approval
- Status: updated after T1. Steven replied "Approve T1" (`approvals/T1-scope.md`), which approved section A of `docs/t1-decisions.md` (the MVP, the backlog promotions in C2 and the Won't list), his answers to OQ-1 to OQ-19, the legal and security adoptions, the accepted deferral of two-step verification and the repo names. He later answered OQ-20 ("no") and OQ-21 ("ignore booking"). See `docs/change-log.md` (CL-2, CL-3).
- Sources: `docs/brief.md` (its "Decisions from Steven" section is authoritative), `docs/requirements.md`, `docs/stories.md`, `docs/assumptions.md`, `docs/traceability.md`, `docs/t1-decisions.md`, `docs/threat-model.md`, `docs/legal-register.md`.
- Companion files: `docs/mvp.md` (the MVP built from the Must stories), `docs/change-log.md` (scope decisions).

## How priorities were set

The brief's goal is "Modernise and Re-design with high quality, modern, professional UI as well as 3D animations and landing pages and loader pages between pages", and the success measure is "Modernised Design and client feedback" (checked by Steven's verdict at T2 and T3, NFR-36). There is no deadline, so priority is about value and risk, not date.

- **Must**: Steven asked for it in the brief or in his seven decisions (D1 to D7), he approved it at T1, or the agency standard (WCAG 2.2 AA, non 3D fallback, reduced motion, security baseline) makes the site unacceptable without it. Nothing Steven explicitly asked for is below Must.
- **Should**: valuable and low risk, but the MVP is still a real concept without it. Build after the Musts if capacity allows.
- **Could**: an analyst addition or a refinement with a cheaper substitute. Build only if Steven asks, or when a hosting condition (T1 section D) requires it.
- **Won't this release**: an analyst addition or provisional feature that the smallest scope does without, approved as Won't at T1. Each carries a revisit trigger.
- **Size**: S is a few days of one role, M about a week or two, L a multi week build with real technical risk. Sizes are rough and are for ordering, not for dating.
- Counts are of active acceptance criteria. Seven criteria are WITHDRAWN in `docs/stories.md` (they keep their numbers and are not counted).

## Summary

| Priority | Stories | Size S | Size M | Size L | Active criteria |
| --- | --- | --- | --- | --- | --- |
| Must | 61 | 22 | 33 | 6 | 330 |
| Should | 11 | 7 | 4 | 0 | 36 |
| Could | 5 | 3 | 2 | 0 | 20 |
| Won't this release | 3 | 0 | 2 | 1 | 15 |
| Total | 80 | 32 | 41 | 7 | 401 |

- Must: 61 stories (330 active criteria). This is the MVP (see `docs/mvp.md`).
- Should (11): US-12, US-18, US-23, US-24, US-29, US-35, US-58, US-74, US-77, US-78, US-80
- Could (5): US-42, US-44, US-55, US-61, US-62
- Won't this release (3): US-14, US-31, US-36
- Criteria still provisional: 2 (AC-15.1 and AC-17.4, both on OQ-12, pending the solicitor's answer to Q3). Both sit in Must stories.

Before T1 the backlog had 78 stories with 58 Must. The T1 amendments added two new stories (US-79 and US-80) and promoted US-46 and US-66, giving 61 Must. The Must set is still large. That is the direct result of what Steven asked for and approved: an immersive 3D site with six scenes, loaders, four languages, a form, a newsletter and an admin portal that edits all text and lists, with personal data handled properly, at no running cost, and to the agency accessibility standard.

## Backlog

Every story, by story ID. "Depends on" lists stories that should be built first (or open questions and Phase 4 decisions that must be answered first). Cross cutting stories apply to the work of many other stories and are verified at the end.

| ID | Story | Requirements | Priority | Size | Depends on | Reason for priority |
| --- | --- | --- | --- | --- | --- | --- |
| US-1 | Find my way around the site | FR-1, FR-10 | Must | M | None (foundation). Needs the Phase 4 design system and architecture. | Brief In: the full page set on one navigation and footer, 84 URLs. Every other page story hangs off this shell. |
| US-2 | Understand the resort from the Home page | FR-5 | Must | M | US-1, US-7, US-25 | Brief In: Home with the immersive hero, overview, key facts and offers summary. Qualitative facts only (OQ-19). The first thing the client reviews. |
| US-3 | Compare rooms and suites | FR-2 | Must | M | US-1, US-10 | Brief In: rooms overview plus one page per room type (six pages). Staff edit the six entries but cannot add a seventh (OQ-20 resolved: no). |
| US-4 | Browse the dining venues | FR-3 | Must | S | US-1 | Brief In: Dining overview with the ten named venues as items with anchors (A-15, no per-venue pages). |
| US-5 | See the pools, beach and activities | FR-4 | Must | S | US-1 | Brief In: pools and beach, activities and facilities. Plain content pages. |
| US-6 | Find the resort and what is nearby | FR-6 | Must | S | US-1 | Brief In: surroundings and location. A static map image and a link keep cost and third party requests at zero. |
| US-7 | See the current offers | FR-7 | Must | S | US-1, US-10 | Brief In: offers. T1 (OQ-19, LR-29): a "Sample offer" label, no price, date, deadline or scarcity wording. Small and low legal risk. |
| US-8 | Look through the photo gallery | FR-8 | Must | M | US-1 | Brief In: photo gallery. The lightbox keyboard and focus rules make this more than a simple grid. |
| US-9 | Read the frequently asked questions | FR-9 | Must | S | US-1 | Brief In: FAQ. Small, answers readable without JavaScript. |
| US-10 | Follow Book now to the JAZ booking engine | FR-11 | Must | S | US-37 | Decision D4 and T1 OQ-15: Book now links out to the JAZ site as one setting, with a visible "external site" label. OQ-21 resolved ("ignore booking"): keep the default resort page address; Book now stays in scope. |
| US-11 | Contact the resort by phone, chat or social media | FR-12 | Must | S | US-37 | Brief Integrations: phone, WhatsApp, email, map and social links from settings. Defaults are synthetic (OQ-16). |
| US-12 | Land on a helpful page when something goes wrong | FR-13 | Should | S | US-1, US-20, US-72 | Analyst addition. The concept notice and noindex rules already apply to error pages through Must stories (FR-17, NFR-27, AC-71.2), so a safe error page exists anyway; this story adds the localised, branded 404 and 500 pages. |
| US-13 | Send an enquiry to the resort | FR-19, FR-20 | Must | M | US-1, US-17, US-59, US-63 | Primary visitor action. T1 (LR-2, LR-5): no consent tick, privacy information line, a data protection complaint subject, and a visible retry message instead of a silent drop (M7). Decision D1 makes storage and privacy rules part of the story. |
| US-14 | Let staff know by email when an enquiry arrives (optional) | FR-21 | Won't this release | M | US-13 | T1 section A: Won't. OQ-2 settled as admin portal only, so no mail server is needed. FR-21 is kept with its security terms (G-16) so it can be reinstated. Revisit if Steven wants email alerts. |
| US-15 | Subscribe to the newsletter | FR-22 | Must | M | US-1, US-17, US-59, US-66 | Explicit ask (newsletter) and D1. T1 (OQ-11, LR-3): single opt in, consent text names the controller, spam trap, signed token and equal response time (G-9, G-11, G-12) make it larger than before. |
| US-16 | Unsubscribe from the newsletter | FR-23 | Must | S | US-15 | PECR needs a working unsubscribe route when subscribers are collected (D1). Same abuse protections as sign up (G-9). |
| US-17 | Understand how my data is used | FR-14 | Must | M | US-1, US-43, US-59 | Decision D1: privacy notice, consent and retention. T1 (LR-4, LR-5, LR-8): a fuller notice, a basis other than consent for enquiries and a complaint route. Controller stays a marked placeholder until the solicitor answers Q3 (OQ-12). |
| US-18 | Know what my browser stores | FR-15 | Should | S | US-1, US-60 | The Cookie notice page itself is in the page inventory (FR-1) and ships with US-1. This story adds the accuracy checks. Note that AC-60.2 and AC-60.5 in the Must story US-60 refer to it, so promote to Must if Steven wants those criteria to stay in the MVP unchanged. |
| US-19 | Read the terms, the accessibility statement and what this concept is | FR-16 | Must | M | US-1 | D2 needs the "About this concept" section; Terms are in the brief scope. T1 (LR-32): a "Who runs this site" section and a register of 12 translated legal pages. The Accessibility statement is a small analyst addition that rides along. |
| US-20 | See clearly that this is a concept | FR-17 | Must | S | US-1 | Decision D2: every page marked as a concept. T1 (OQ-5, G-6): a fixed sentence per language plus an optional 200 character line, and an automatic title suffix. |
| US-21 | Be sure all content is placeholder content | FR-18 | Must | M | Phase 4 asset sourcing; applies to all content stories | Decision D2: placeholder content only, nothing copied from jazhotels.com, licence register now covering every 3D input (LR-39), forbidden claims list (OQ-19). |
| US-22 | Read the site in my own language | FR-24 | Must | M | US-1 | Decision D5 and an explicit ask: English, German, Italian and Russian on all public content. Translation effort is spread over every content story. |
| US-23 | Arrive in a sensible language | FR-25 | Should | S | US-22 | T1 (OQ-3) approved English default with detection from the browser. Not asked for by Steven, so Should: a visible switcher already meets the ask. |
| US-24 | Never see a blank where text should be | FR-26 | Should | S | US-22, US-33 | T1 (OQ-7): show the English text for a missing translation. A safety net that matters once staff edit text; cheap, so build it with US-33. |
| US-25 | Be drawn in by the 3D hero | FR-27 | Must | L | US-1, US-56, US-57, US-28; 3D library chosen in Phase 4 | Explicit ask: immersive, 3D. Highest risk (RSK-3), so spike first. T1 (L5): tilt only where the browser allows it, touch drag is the base interaction. |
| US-26 | Experience motion on each section page | FR-28 | Must | L | US-25 (shared 3D framework), US-3 to US-6 | Explicit ask and T1 (OQ-9): each of the five section pages gets its own scene, six with the hero. The lighter option (hero plus two) was offered and not chosen. Keep the framework generic so scenes are cheap to add. |
| US-27 | See a loader and smooth transitions between pages | FR-29 | Must | L | US-1, US-25, US-28, US-56, US-57 | Explicit ask: loader and transition screens between pages. The hard parts are focus, announcements and the back and forward buttons (RSK-9). The loader appears only if a page is not ready within 300 ms (M6). |
| US-28 | Pause the motion | FR-30 | Must | S | US-25 | Needed for WCAG 2.2.2 because the hero moves for more than 5 seconds. Small, and AA is the agency standard. |
| US-29 | Receive 3D content the agency created | FR-31 | Should | S | US-25, US-26, US-21 | Making the 3D models is Must inside US-25 and US-26, and the licence register (US-21) already covers every 3D input. This story adds delivery of source files and the authorship statement, which can follow. |
| US-30 | Sign in and out of the admin portal | FR-32 | Must | M | US-45 (first Administrator), US-64, US-65 | Explicit ask: admin portal with staff login. T1 (G-23): the portal shows the previous sign in and failed attempts. Everything else in the admin area depends on it. |
| US-31 | Protect my account with a second step | FR-33 | Won't this release | M | US-30 | T1 section D: Won't, accepted risk for local review with synthetic data. Condition (G-22, AC-63.2): the package refuses to start on any non local address. Promote to Must before any hosting (FR-33). A strong password policy (US-64), lockout and rate limits (US-66) stand in for now. |
| US-32 | Manage staff accounts | FR-34 | Must | M | US-30 | Needed to create staff accounts and change passwords. T1 (OQ-1): one Administrator role. T1 (G-19, G-21): sessions end on password change and a server command unlocks accounts. |
| US-33 | Edit every piece of text in every language | FR-35 | Must | L | US-30, US-22 | Explicit ask (D3): edit titles and text in four languages. T1 (OQ-4): text, titles, images, links, list items and settings within fixed page designs; Steven approved this narrowing with "Approve T1" (A-38). |
| US-34 | Add, remove and reorder items in lists | FR-36 | Must | L | US-33, US-38 | Explicit ask (D3): edit everything. Lists (venues, offers, FAQ, gallery and so on) hold most editable content. Rooms are edited but not added or deleted (OQ-20). |
| US-35 | See which translations are missing | FR-37 | Should | M | US-33 | T1 (OQ-7): the admin portal flags gaps per page. The per page count (AC-35.1) is the minimum and can sit on the edit screen in US-33; the cross page missing translations screen can follow. |
| US-36 | Save changes and see them go live | FR-38 | Won't this release | L | US-33, US-34, US-37 | T1 section A: Won't for draft, preview and version history (OQ-6: edits go live on save). Its five remaining criteria (AC-36.2, AC-36.4 to AC-36.7) describe live on save, which is delivered by the Must stories US-33, US-34, US-37 and US-38 and should be tested there (see Consistency notes). |
| US-37 | Keep contact details and site-wide settings up to date | FR-39 | Must | M | US-30 | Decision D3 and brief Integrations: one place for the Book now URL, contact details, social links, optional concept sentence and provider details (LR-32). T1 (G-5) adds strict validation. |
| US-38 | Upload and manage photos | FR-40 | Must | M | US-30, US-68, US-39 | Explicit ask: upload photos, with alt text and captions in four languages. |
| US-39 | Have uploaded photos prepared automatically | FR-41 | Must | M | US-38 | Without resizing, staff uploads would break the performance budgets and leak photo location data. Candidate to trim (not decided at T1): WebP only at three widths. |
| US-40 | Read enquiries | FR-42 | Must | M | US-13, US-30 | Explicit ask: read enquiries. T1 (LR-5): label and "acknowledge by" date for data protection complaints. |
| US-41 | Export subscribers | FR-43 | Must | M | US-15, US-30, US-79 | Explicit ask: export subscribers. T1 (G-4, G-12): stricter CSV quoting. The export record (AC-41.4) is now carried by the security event record (US-79). |
| US-42 | Answer a data request from an individual | FR-44, NFR-16 | Could | M | US-40, US-41 | Analyst addition. T1 section D: promote to Must before any hosting (FR-44). Until then staff search and delete in US-40 and US-41. |
| US-43 | Have old personal data deleted automatically | FR-45 | Must | M | US-13, US-15, US-30, US-79 | Decision D1 asks for retention rules, so a purge job with configurable periods is required. T1 (OQ-10, LR-8) adds retention rows. Purge runs are recorded in the security event record (US-79). |
| US-44 | Review who did what | FR-46 | Could | M | US-30, US-79 | Analyst addition. T1 section D: promote to Must before any hosting (FR-46). The minimum record of security events is now the Must story US-79. |
| US-45 | Review the site on one computer | FR-47 | Must | M | All other Must stories; OQ-13, OQ-14 | Decision D2: local review package, which is how Steven sees the result. T1 (G-1, LR-12, LR-40): first Administrator by console code, draft record of processing and third party notices file. No hosting until the solicitor answers and section D is met. |
| US-46 | Back up and restore the site's data | FR-48 | Must | M | US-30, US-45 | Promoted to Must at T1 (G-3): with no version history (US-36 Won't) a daily automatic backup is the only recovery from defacement or mass deletion. Also carries the 35 day expiry (AC-46.3). |
| US-47 | Use the whole site with a keyboard | NFR-2 | Must | M | Cross cutting: US-1, US-8, US-25, US-27, US-30 | Agency standard (WCAG 2.2 AA) and a quality bar for a "high quality, professional" redesign. |
| US-48 | Use the site with a screen reader | NFR-3 | Must | M | Cross cutting; DEP-6 | Agency standard. T1 gate finding M4: if NVDA or an iPhone is not available an automated role and name run stands in and the gap is an open item for T3. |
| US-49 | Read the site comfortably | NFR-4 | Must | M | Cross cutting: design tokens from Phase 4 | Agency standard and part of "high quality" UI. Cheapest if contrast and type scale are tokens from day one (US-75). |
| US-50 | Meet WCAG 2.2 AA across the whole site | NFR-1 | Must | M | US-47, US-48, US-49 | Agency standard: evidence that WCAG 2.2 AA is met, including the admin portal. |
| US-51 | Sign in and work in the admin portal without barriers | NFR-5 | Must | S | US-30, US-65 | A 30 minute admin idle timeout needs a warning and an extend option (WCAG 2.2.1). The one-time code part of AC-51.1 applies only if US-31 is built. |
| US-52 | Get pages quickly on a mid range phone | NFR-6, NFR-7 | Must | L | Cross cutting; US-25, US-57 | Primary goal is a modern, high quality site on mid range phones. Budgets are the analyst proposals (A-12) and are re-baselined with the Performance Engineer. |
| US-53 | Enjoy smooth 3D | NFR-8 | Must | M | US-25, US-26, US-57 | Jerky 3D would defeat the 3D ask. T1 (M4): lab profile L2 may stand in for a physical phone, with the result labelled "emulated" and confirmation on a phone left open for T3. |
| US-54 | Move between pages without waiting for animations | NFR-9 | Must | S | US-27 | Part of getting loaders and transitions right: they must not slow visitors down. |
| US-55 | Have the server and admin portal respond briskly | NFR-10 | Could | S | US-30, US-40, US-41 | Load targets (25 simultaneous visitors, 5,000 enquiries, 10,000 subscribers) are generous for a locally reviewed concept. Check by a simple test and revisit if hosted. |
| US-56 | See a calm site when I ask for reduced motion | NFR-11 | Must | M | US-25, US-26, US-27 | Agency standard and WCAG 2.3.3. Needed to ship 3D responsibly. |
| US-57 | Get a complete site when 3D cannot run | NFR-12 | Must | M | US-25, US-26 | Agency design standard requires a non 3D fallback. It also protects the performance goal. Candidate to trim (not decided at T1): the Save-Data and 2g triggers in AC-57.2. |
| US-58 | Use the key functions without JavaScript | NFR-13 | Should | M | US-13, US-15, US-16 | Analyst addition (NFR-13). Plain form posts with server rendered pages give most of it cheaply, but making every function work without JavaScript is not asked for and can follow. |
| US-59 | Share only the data that is needed | NFR-14 | Must | M | US-13, US-15 | Decision D1: handle personal data properly. T1 (LR-2): the contact form has no consent tick; the newsletter consent box is unticked. |
| US-60 | Browse without being tracked | NFR-15 | Must | S | US-1 | Decision D6 and PECR: no cookies, no analytics, no outside hosts. Also makes the zero cost rule checkable. T1 (LR-21): public form tokens use no cookie or storage (AC-60.7). |
| US-61 | Exercise my data protection rights | NFR-16 | Could | S | US-42 | Depends on the data subject tool. The Privacy notice already states rights, the one month answer time and the 30 day complaint acknowledgement (AC-17.1, AC-17.5). Promote with US-42 before hosting. |
| US-62 | Have backups kept no longer than needed | NFR-17 | Could | S | US-46 | The 35 day backup expiry is tested in Must story US-46 (AC-46.3). The remaining statements about backups are also required in the Privacy notice (AC-17.1). Promote with the hosting conditions if Steven wants the three way check. |
| US-63 | Keep personal data safe where it lives | NFR-18 | Must | S | US-45 | Decision D1: personal data stored only on the server. T1 (G-22): AC-63.2 refuses every non local start, which is the compensating control for the deferred two-step verification. |
| US-64 | Make passwords and sign in hard to attack | NFR-19 | Must | S | US-30 | Staff login must resist guessing. Replaces the deferred two-step verification (US-31) for now. |
| US-65 | Keep sessions short-lived and safe | NFR-20 | Must | S | US-30 | Basic session safety for a login that can read personal data. T1 (G-19): all sessions end on password change, reset, disable or delete. |
| US-66 | Stop automated abuse | NFR-21 | Must | M | US-13, US-15, US-16, US-30 | Promoted to Must at T1 (G-10): with no CAPTCHA (D6) and no second factor (US-31 Won't) rate limits are the main control against automated abuse. Includes the trusted proxy rule (G-20). |
| US-67 | Refuse forged requests | NFR-22 | Must | S | US-13, US-15, US-30 | Standard protection for every state changing request. Cheap if built in from the start. T1 (LR-21): public forms use a signed token with no cookie. |
| US-68 | Accept only safe uploads | NFR-23 | Must | M | US-38 | Uploads are the main attack surface of the admin portal. T1 (G-14): header checks first and decoding in an isolated worker with limits. |
| US-69 | Block injected scripts and set safe headers | NFR-24 | Must | M | Cross cutting | Standard security baseline. A strict content security policy limits the choice of 3D and animation libraries (RSK-17), so decide early. T1 (G-7, G-8) widen the checks. |
| US-70 | Restrict each admin function to the right people | NFR-25 | Must | S | US-30 | Default deny on admin routes. T1 (OQ-1): one role, so the Editor versus Administrator criteria are withdrawn. |
| US-71 | Ship without secrets or known vulnerabilities | NFR-26 | Must | M | Cross cutting | Hub rules already require no secrets and clean dependencies. T1 (G-18) adds a software bill of materials, install script control and glTF validation, so it grew from small to medium. |
| US-72 | Keep the concept out of search engines | NFR-27 | Must | S | US-1 | Decision D2: every page set not to be indexed. |
| US-73 | Have the whole site properly translated and laid out in four languages | NFR-28 | Must | M | US-22, US-33 | Decision D5: four languages must be complete, not just present. Includes the longer text layout test. |
| US-74 | Use the site on the browsers and devices people actually have | NFR-29 | Should | M | Cross cutting | Agency default is evergreen browsers. For the MVP test Chrome, Safari (iOS and macOS) and Firefox; add Edge and Samsung Internet if capacity allows. |
| US-75 | Look and feel like the resort's brand | NFR-30, NFR-36 | Must | S | Phase 4 brand extraction; T2 and T3 touchpoints | Decision D7: use the current site brand, enhanced for hospitality. T1 (M3, NFR-36): Steven's own verdict at T2 and T3 is the check for the success measure "Modernised Design and client feedback". |
| US-76 | Run the site at no running cost | NFR-31 | Must | S | Cross cutting | Decision D6: no running costs. A licence check and a network blocked test run keep it honest. T1 (LR-40): third party notices file. |
| US-77 | Install, configure and check the site easily | NFR-32 | Should | S | US-45 | One configuration file is part of US-45. The health check and the 10 command limit are extras. AC-77.4 and AC-77.5 (G-17: file permissions and per install signing keys) ride here and are built with the first administrator setup in any case. |
| US-78 | Never lose or corrupt confirmed data | NFR-33 | Should | S | US-13, US-15, US-33 | Durable writes come with a normal embedded database. The two editors conflict check (AC-78.3) is an analyst addition and can follow. |
| US-79 | Keep a record of security events | NFR-34 | Must | S | US-30, US-41, US-43 | New at T1 (G-2, NFR-34, stated Must). A plain record of sign ins, lockouts, exports, deletions and purge runs, because the audit log screen (US-44) is Could. Also carries AC-41.4 and AC-43.3. |
| US-80 | Stay up under heavy or hostile traffic | NFR-35 | Should | M | US-13, US-38, US-30 | New at T1 (G-13, NFR-35). Body size limits, slow request timeout, job queues, long cache lifetimes and record caps protect a 1 CPU, 1 GB server. Residual risk is low for local review (threat model), so Should; promote before any hosting. |

## What changed since the first backlog

| Story | First backlog | Now | Why |
| --- | --- | --- | --- |
| US-46 Back up and restore the site's data | Could, M | Must, M | T1 section C2 (G-3): the only recovery from defacement or mass deletion now that history is Won't. Backup is automatic every 24 hours. |
| US-66 Stop automated abuse | Should, M | Must, M | T1 section C2 (G-10): no CAPTCHA and no second factor, so rate limits are the main abuse control. |
| US-79 Keep a record of security events | did not exist | Must, S | New story for NFR-34 (G-2, stated Must). |
| US-80 Stay up under heavy or hostile traffic | did not exist | Should, M | New story for NFR-35 (G-13). The threat model does not state a priority; low residual risk for local review, so Should. Needs Steven's confirmation if he wants it Must. |
| US-14 Enquiry email | Won't, M | Won't, M | Confirmed at T1 (OQ-2: admin portal only). |
| US-31 Two-step verification | Won't, M | Won't, M | Confirmed at T1 as an accepted risk (section D) under condition G-22. |
| US-36 Save changes and see them go live | Won't, L (draft and publish) | Won't, L | Confirmed at T1 (OQ-6). The story was retitled by the analyst and now holds only live on save criteria (see Consistency notes). |
| US-44 Review who did what | Could, M | Could, M | Unchanged. Its minimum (a record of events) moved into the Must story US-79. |
| US-26 Section scenes | Must, L (five scenes proposed as a cut candidate) | Must, L | OQ-9: Steven approved a scene on each section page (six in all). The "hero plus two" cut was not taken. |
| US-32, US-70 Accounts and authorisation | Must (two roles proposed) | Must | OQ-1: one Administrator role. Editor criteria withdrawn. |
| US-15 Newsletter sign up | Must, S | Must, M | Spam trap, signed token, address normalisation and equal response time (G-9, G-11, G-12). |
| US-19 Terms and legal pages | Must, S | Must, M | "Who runs this site" and the 12 entry translation register (LR-32, L1). |
| US-37 Settings | Must, S | Must, M | Provider details and strict validation (LR-32, G-5, L3). |
| US-71 Ship without secrets | Must, S | Must, M | Software bill of materials, install scripts and glTF validation (G-18). |

All other stories keep their first priority and size. Reasons were rewritten where the amendments touched them.

## Complexity worth cutting (status after T1)

Resolved at T1 (no further action unless Steven reopens them):

1. **Five distinct section scenes (US-26).** Not cut. Steven approved a scene on each of the five section pages plus the hero (OQ-9).
2. **Analyst additions Steven can reject.** Decided at T1: two-step verification (US-31), email alerts (US-14) and draft, preview and history (US-36) are Won't. The audit log (US-44), data subject tool (US-42) and their follow ons (US-61, US-62) stay Could. Backup (US-46) was promoted, not cut.
3. **Admin roles (OQ-1).** One Administrator role. Done.

Still open, inside Must or Should stories. Steven did not decide these at T1; the Orchestrator and the architect can take them when the design is clear:

4. **Image pipeline (US-39).** WebP only at three widths instead of AVIF and WebP at four widths. Keep metadata removal and orientation fixes.
5. **Fragile or long checks (AC-21.4, AC-43.5, AC-76.5, AC-46.3, AC-46.4).** The analyst replaced the live page comparison with a hash list (A-36). Use simulated time instead of real 24 and 48 hour waits.
6. **Performance measurement scope (US-52, US-53, US-55).** T1 gate finding M4 already lets lab profile L2 stand in for a phone, labelled "emulated". Treat the US-55 load targets as a smoke test.
7. **Browser and device matrix (US-74, Should).** Test Chrome, Safari and Firefox for the MVP. Edge, Samsung Internet and 2560 pixel width follow.
8. **Fallback triggers (AC-57.2).** Keep no WebGL, context loss and reduced motion. Save-Data and 2g triggers can be dropped from the MVP.

## Consistency notes for the Orchestrator and the analyst

These are places where a story's priority and its acceptance criteria point in different directions. They do not change any priority approved at T1. Where a fix needs a priority change, it needs Steven's yes in chat.

- **US-36 (Won't) holds the only criteria for FR-38.** AC-36.2, AC-36.4 and AC-36.5 to AC-36.7 describe live on save. Edits cannot work without it, so the Must stories US-33, US-34, US-37 and US-38 deliver it. Recommend the analyst move these five criteria into those stories (or into a new small Must story) so FR-38 has an active criterion in a story that is built. Until then QA should run them with US-33 and US-34.
- **US-18 (Should) versus US-60 and US-17 (Must).** The Cookie notice page ships with US-1. AC-60.2 and AC-60.5 expect the notice to list the pause choice and the admin session cookie. Either promote US-18 (size S) or accept that those two criteria are checked once the page content is written.
- **US-62 (Could) versus US-46 (Must).** The 35 day expiry is tested in AC-46.3, so no gap in behaviour. The extra statement criteria duplicate AC-17.1.
- **US-12 (Should).** Error pages are covered for the concept notice and noindex by Must criteria; only localisation is Should.
- **US-77 (Should) holds G-17.** AC-77.4 and AC-77.5 (configuration permissions and per install signing keys) are security controls inside a Should story. The architect will build them with first administrator setup (US-45); promote if Steven wants them tested in the MVP.
- **US-41 and US-43 criteria that need an audit trail** (AC-41.4, AC-43.3) are now carried by the security event record (US-79, Must), not by US-44.

## Before any hosting (T1 section D)

Nothing in this backlog allows hosting beyond local review. Before that: promote US-31 (FR-33), US-42 (FR-44) and US-44 (FR-46) to Must; promote US-80 and review US-18, US-61, US-62 and US-77; separate Editor and Administrator roles return (OQ-1); the solicitor's answers to Q1 to Q7 are recorded in `docs/legal-register.md`; the package must refuse non local starts until two-step verification is built (AC-63.2).

## Suggested delivery order

Not a schedule (there are no dates). The order puts the highest technical risk first and keeps every step reviewable by Steven.

1. **Foundations and spikes.** US-1 shell, US-75 brand tokens, US-20 concept notice, US-72 noindex, US-60 no outside requests, US-71 clean repo, US-63 start-up refusal. In parallel a 3D spike: US-25 poster, US-57 fallback and US-56 reduced motion, to test RSK-3 early. T2 design verdict (NFR-36) comes before implementation.
2. **Public content in English.** US-2 to US-11, US-19, US-21, then US-22 (language structure).
3. **Motion.** US-25, US-28, US-27, US-54, US-53, then US-26 (six scenes).
4. **Forms and personal data.** US-13, US-15, US-16, US-17, US-59, US-67, US-66, US-43.
5. **Admin portal.** US-45 (first Administrator), US-30, US-64, US-65, US-70, US-79, US-32, US-37, US-68, US-38, US-39, US-33, US-34, US-40, US-41, US-51, US-46.
6. **Four languages complete and hardening.** US-73, then US-24, US-23, US-35 (Should), US-47 to US-50, US-52, US-69, US-76. T3 verdict (NFR-36) on the running package.
7. **Remaining Should and Could** only if Steven asks after the first review: US-12, US-18, US-29, US-58, US-74, US-77, US-78, US-80, then US-42, US-44, US-55, US-61, US-62.

## Open questions that can still move priorities

- **OQ-12 (controller and lawful basis).** Placeholder until the solicitor answers Q3 and Q7. Does not block building.
- **Solicitor questions Q1 to Q7.** Answers may change US-17, US-19, US-10 or the content. All must be recorded before any hosting.
- **OQ-1 (roles), US-31, US-42, US-44.** Return before real enquiries or subscribers exist.
