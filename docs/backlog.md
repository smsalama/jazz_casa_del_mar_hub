# Backlog: Jazz Casa del Mar resort website

- Client slug: jazz_casa_del_mar
- Project slug: site
- Task: P2-T1b (Product Owner)
- Date: 2026-10-15
- Status: proposal for the T1 scope touchpoint. Priorities become the agreed scope only when Steven approves T1.
- Sources: `docs/brief.md` (its "Decisions from Steven" section is authoritative), `docs/requirements.md`, `docs/stories.md`, `docs/assumptions.md`, `docs/traceability.md`.
- Companion files: `docs/mvp.md` (the MVP built from the Must stories), `docs/change-log.md` (scope decisions).

## How priorities were set

The brief's goal is "Modernise and Re-design with high quality, modern, professional UI as well as 3D animations and landing pages and loader pages between pages", and the success measure is "Modernised Design and client feedback". There is no deadline, so priority is about value and risk, not date. The rules used:

- **Must**: Steven asked for it in the brief or in his seven decisions (D1 to D7), or the agency standard (WCAG 2.2 AA, non 3D fallback, reduced motion, security baseline) makes the site unacceptable without it. Nothing Steven explicitly asked for is below Must.
- **Should**: valuable and low risk, but the MVP is still a real concept without it. Build after the Musts if capacity allows.
- **Could**: an analyst addition or a refinement with a cheaper substitute. Build only if Steven asks for it.
- **Won't this release**: an analyst addition or provisional feature that adds real cost and that the smallest scope does without. Each carries a revisit trigger. Steven can overrule any of these at T1.
- **Size**: S is a few days of one role, M about a week or two, L a multi week build with real technical risk. Sizes are rough and are for ordering, not for estimating dates.
- Acceptance criteria marked Provisional (OQ-n) in `docs/stories.md` keep their working answer. Where a priority depends on an open question it is noted in the reason.

## Summary

| Priority | Stories | Size S | Size M | Size L | Acceptance criteria |
| --- | --- | --- | --- | --- | --- |
| Must | 58 | 25 | 27 | 6 | 272 |
| Should | 11 | 7 | 4 | 0 | 33 |
| Could | 6 | 3 | 3 | 0 | 20 |
| Won't this release | 3 | 0 | 2 | 1 | 13 |
| Total | 78 | 35 | 36 | 7 | 338 |

- Must: 58 stories (272 acceptance criteria). This is the MVP (see `docs/mvp.md`).
- Should (11): US-12, US-18, US-23, US-24, US-29, US-35, US-58, US-66, US-74, US-77, US-78
- Could (6): US-42, US-44, US-46, US-55, US-61, US-62
- Won't this release (3): US-14, US-31, US-36

The Must set is still large (58 of 78 stories). That is the direct result of what Steven asked for: an immersive 3D site, loaders, four languages, a form, a newsletter and an admin portal that edits everything, all with personal data handled properly, at no running cost, and to the agency accessibility standard. The next section names where it can be made smaller, with Steven's decision needed for each.

## Backlog

Every story, by story ID. "Depends on" lists stories that should be built first (or open questions and Phase 4 decisions that must be answered first). Cross cutting stories apply to the work of many other stories and are verified at the end.

| ID | Story | Requirements | Priority | Size | Depends on | Reason for priority |
| --- | --- | --- | --- | --- | --- | --- |
| US-1 | Find my way around the site | FR-1, FR-10 | Must | M | None (foundation story). Needs the Phase 4 design system and architecture. | Brief In: the full page set on one navigation and footer, 84 URLs. Every other page story hangs off this shell. |
| US-2 | Understand the resort from the Home page | FR-5 | Must | M | US-1, US-25, US-7 | Brief In: Home with immersive hero, overview, key facts and offers summary. The first thing the client reviews. |
| US-3 | Compare rooms and suites | FR-2 | Must | M | US-1, US-10 | Brief In: rooms overview plus one page per room type (six pages). Core content for the Contact Us enquiry journey. |
| US-4 | Browse the dining venues | FR-3 | Must | S | US-1 | Brief In: Dining overview with the ten named venues, as items with anchors (assumption A-15, no per-venue pages). |
| US-5 | See the pools, beach and activities | FR-4 | Must | S | US-1 | Brief In: pools and beach, activities and facilities. Plain content pages. |
| US-6 | Find the resort and what is nearby | FR-6 | Must | S | US-1 | Brief In: Surroundings and location. A static map image and a link keep cost and third party requests at zero. |
| US-7 | See the current offers | FR-7 | Must | S | US-1, US-10 | Brief In: offers summary. No prices or discounts, which also keeps consumer protection risk low. |
| US-8 | Look through the photo gallery | FR-8 | Must | M | US-1 | Brief In: photo gallery. The lightbox keyboard and focus rules make this more than a simple grid. |
| US-9 | Read the frequently asked questions | FR-9 | Must | S | US-1 | Brief In: FAQ. Small, answers readable without JavaScript. |
| US-10 | Follow Book now to the JAZ booking engine | FR-11 | Must | S | US-37 | Decision D4: Book now links out to the existing JAZ booking engine. One setting, no booking engine built. |
| US-11 | Contact the resort by phone, chat or social media | FR-12 | Must | S | US-37 | Brief Integrations: phone, WhatsApp, email, map and social links. Values come from settings; defaults are synthetic. |
| US-12 | Land on a helpful page when something goes wrong | FR-13 | Should | S | US-1, US-20 | Analyst addition. Information leak control is carried by US-71, so only the localised, branded presentation of 404 and 500 pages is optional; a framework default would be an acceptable fallback. |
| US-13 | Send an enquiry to the resort | FR-19, FR-20 | Must | M | US-1, US-17, US-59 | Primary visitor action and an explicit ask (contact form). Decision D1 makes the consent, validation and storage rules part of the story. |
| US-14 | Let staff know by email when an enquiry arrives (optional) | FR-21 | Won't this release | M | OQ-2, DEP-10, US-13 | Needs a client mail server, which brief decision D6 (no running costs) and the open question OQ-2 leave unanswered. Enquiries are read in the admin portal (US-40). Revisit if Steven answers yes to OQ-2. |
| US-15 | Subscribe to the newsletter | FR-22 | Must | S | US-1, US-17, US-59 | Explicit ask (newsletter) and decision D1. Single opt-in with recorded consent keeps it small; double opt-in is OQ-11 and not built. |
| US-16 | Unsubscribe from the newsletter | FR-23 | Must | S | US-15 | Compliance with PECR follows from collecting subscribers (decision D1). Cheap, and a newsletter list without an unsubscribe route would not be handled "properly". |
| US-17 | Understand how my data is used | FR-14 | Must | M | US-1, US-43, US-59, OQ-12 | Decision D1: privacy notice, consent and retention rules. Four languages. Controller stays a marked placeholder until OQ-12 is answered. |
| US-18 | Know what my browser stores | FR-15 | Should | S | US-17, US-60 | Brief lists a cookie notice as an assumption. The public site sets no cookies, so the notice is short, but the admin session cookie and the pause choice must be listed accurately. |
| US-19 | Read the terms, the accessibility statement and what this concept is | FR-16 | Must | S | US-1 | Decision D2 needs the "About this concept" statement on the Terms page, and Terms are in the brief scope. The accessibility statement is a small analyst addition that rides along. |
| US-20 | See clearly that this is a concept | FR-17 | Must | S | US-1 | Decision D2: every page clearly marked as a concept. Low cost, high legal value. |
| US-21 | Be sure all content is placeholder content | FR-18 | Must | M | Phase 4 asset sourcing; applies to all content stories | Decision D2: placeholder imagery only, nothing copied from jazhotels.com, licence register. AC-21.4 (live page text comparison) is fragile and a candidate to drop. |
| US-22 | Read the site in my own language | FR-24 | Must | M | US-1 | Decision D5 and an explicit ask: English, German, Italian and Russian on all public content. Translation effort is spread over every content story. |
| US-23 | Arrive in a sensible language | FR-25 | Should | S | US-22, OQ-3 | Not asked for by Steven (open question 3). English default with a visible switcher meets the ask; detection is a small nicety once the paths exist. |
| US-24 | Never see a blank where text should be | FR-26 | Should | S | US-22, US-33 | Safety net so no page is blank when a translation is missing. Matters mainly once staff edit text, but cheap, so build it with US-33. |
| US-25 | Be drawn in by the 3D hero | FR-27 | Must | L | US-1, US-57, US-56, US-28; architecture decision on the 3D library | Explicit ask: immersive, 3D. The centrepiece of the primary goal "Modernised Design". Highest risk item (RSK-3), so spike it first. |
| US-26 | Experience motion on each section page | FR-28 | Must | L | US-25 (shared 3D framework), US-3 to US-6 | Explicit ask: "3D animations and landing pages". Five distinct scenes is the analyst reading (OQ-9). Candidate to reduce at T1: build the scene system once, ship hero plus two scenes, and use lighter scroll driven treatments elsewhere. |
| US-27 | See a loader and smooth transitions between pages | FR-29 | Must | L | US-1, US-25, US-28, US-56, US-57 | Explicit ask: loader and transition screens between pages. Hard parts are focus, announcements and the back button (RSK-9). |
| US-28 | Pause the motion | FR-30 | Must | S | US-25 | Needed for WCAG 2.2 AA (2.2.2) because the hero moves for more than 5 seconds. Small, and AA is the agency standard. |
| US-29 | Receive 3D content the agency created | FR-31 | Should | S | US-25, US-26 | Making the 3D models is Must inside US-25 and US-26. This story adds delivery of source files and an authorship statement, which can follow. |
| US-30 | Sign in and out of the admin portal | FR-32 | Must | M | US-45 (first Administrator), US-64, US-65 | Explicit ask: admin portal with staff login. Everything else in the admin area depends on it. |
| US-31 | Protect my account with a second step | FR-33 | Won't this release | M | US-30 | Analyst addition that Steven can reject. A strong password policy (US-64), lockout and rate limits are enough for a concept run locally with synthetic data. Revisit before any hosted use (OQ-13). |
| US-32 | Manage staff accounts | FR-34 | Must | M | US-30 | Needed to create staff accounts and change passwords. Recommend one role for the MVP and defer Editor versus Administrator (OQ-1). |
| US-33 | Edit every piece of text in every language | FR-35 | Must | L | US-30, US-22 | Explicit ask (decision D3): edit all titles and text in four languages. Scope is text within fixed page templates until OQ-4 is answered. |
| US-34 | Add, remove and reorder items in lists | FR-36 | Must | L | US-33, US-38 | Explicit ask (decision D3): edit everything. Lists (rooms, venues, offers, FAQ, gallery and so on) are where most editable content lives. |
| US-35 | See which translations are missing | FR-37 | Should | M | US-33 | Useful for four languages, but staff can find gaps by reading the four values side by side (US-33). Build the per page completeness count first, the filtered screen later. |
| US-36 | Preview and publish changes safely | FR-38 | Won't this release | L | US-33 | Analyst addition, provisional on OQ-6. Smallest scope: saving a change publishes it (AC-36.2 still holds, and the unsaved changes warning in AC-36.4 is cheap, so keep it with US-33). Preview and the 10 version history are deferred. Revisit if OQ-6 is answered yes or the site is hosted. |
| US-37 | Keep contact details and site-wide settings up to date | FR-39 | Must | S | US-30 | Decision D3 and brief Integrations: one place for the Book now URL, contact details and social links. |
| US-38 | Upload and manage photos | FR-40 | Must | M | US-30, US-68, US-39 | Explicit ask: upload photos. Four language alt text and captions are needed for accessibility and for the gallery. |
| US-39 | Have uploaded photos prepared automatically | FR-41 | Must | M | US-38 | Without resizing, staff uploads would break the performance budgets the primary goal depends on, and photo location data would leak. Candidate to trim: WebP only and three widths instead of AVIF plus WebP at four widths. |
| US-40 | Read enquiries | FR-42 | Must | M | US-13, US-30 | Explicit ask: read enquiries. |
| US-41 | Export subscribers | FR-43 | Must | M | US-15, US-30 | Explicit ask: export subscribers. CSV safety rules are small but must be right. AC-41.4 needs the audit log (US-44), so it is deferred with it. |
| US-42 | Answer a data request from an individual | FR-44, NFR-16 | Could | M | US-40, US-41 | Analyst addition. At this volume, staff can search and delete in US-40 and US-41 and follow a documented procedure. Build the one screen tool only if Steven wants it. |
| US-43 | Have old personal data deleted automatically | FR-45 | Must | M | US-13, US-15, US-30, OQ-10 | Decision D1 explicitly asks for retention rules, so a purge job with configurable periods is required. AC-43.3 needs the audit log (US-44), so it is deferred with it. |
| US-44 | Review who did what | FR-46 | Could | M | US-30 | Analyst addition. Helpful accountability but not asked for. Recording an admin export or purge run in a plain application log line (without personal data) is a lighter substitute. Criteria AC-41.4 and AC-43.3 move with it. |
| US-45 | Review the site on one computer | FR-47 | Must | M | All other Must stories; OQ-13, OQ-14 | Decision D2: the agency packages the site for local review only. This is how Steven sees the result, so it is the delivery vehicle for client feedback. |
| US-46 | Back up and restore the site's data | FR-48 | Could | M | US-30, US-45 | Analyst addition. For local review the data folder can be copied by hand. Build the command only if the site is ever hosted. |
| US-47 | Use the whole site with a keyboard | NFR-2 | Must | M | Cross cutting: US-1, US-8, US-25, US-27, US-30 | Agency standard (WCAG 2.2 AA) and a quality bar for a "high quality, professional" redesign. |
| US-48 | Use the site with a screen reader | NFR-3 | Must | M | Cross cutting; DEP-6 (NVDA and an iPhone) | Agency standard. Semantic checks are cheap during build; the real screen reader journeys are a QA phase cost. |
| US-49 | Read the site comfortably | NFR-4 | Must | M | Cross cutting: design tokens from Phase 4 | Agency standard and part of "high quality" UI. Cheapest if contrast and type scale are tokens from day one (US-75). |
| US-50 | Meet WCAG 2.2 AA across the whole site | NFR-1 | Must | M | US-47, US-48, US-49 | Agency standard: evidence that WCAG 2.2 AA is met, including the admin portal. |
| US-51 | Sign in and work in the admin portal without barriers | NFR-5 | Must | S | US-30, US-65 | A 30 minute idle timeout on the admin portal needs a warning and an extend option to meet WCAG 2.2.1. AC-51.1 mentions the one-time code field and applies only if US-31 is built. |
| US-52 | Get pages quickly on a mid range phone | NFR-6, NFR-7 | Must | L | Cross cutting; US-25, US-57 | Primary goal is a modern, high quality site on mid range phones. Budgets are the analyst proposals (A-12) and should be re-baselined with the Performance Engineer. |
| US-53 | Enjoy smooth 3D | NFR-8 | Must | M | US-25, US-26, US-57 | Jerky 3D would defeat the point of the 3D ask. AC-53.1 needs a physical Android phone (DEP-6). |
| US-54 | Move between pages without waiting for animations | NFR-9 | Must | S | US-27 | Part of getting loaders and transitions right: they must not slow visitors down. |
| US-55 | Have the server and admin portal respond briskly | NFR-10 | Could | S | US-30, US-40, US-41, OQ-14 | Load targets (25 simultaneous visitors, 5,000 enquiries, 10,000 subscribers) are unrealistic for a locally reviewed concept. Check by a simple test and revisit if hosted. |
| US-56 | See a calm site when I ask for reduced motion | NFR-11 | Must | M | US-25, US-26, US-27 | Agency standard and WCAG 2.3.3. Needed to ship 3D responsibly. |
| US-57 | Get a complete site when 3D cannot run | NFR-12 | Must | M | US-25, US-26 | Agency design standard requires a non 3D fallback. It also protects the performance goal. Candidate to trim: Save-Data and slow connection triggers in AC-57.2. |
| US-58 | Use the key functions without JavaScript | NFR-13 | Should | M | US-13, US-15, US-16 | Analyst addition (NFR-13). Plain form posts with server rendered pages give most of it cheaply, but making every function work without JavaScript is not asked for and can follow. |
| US-59 | Share only the data that is needed | NFR-14 | Must | M | US-13, US-15 | Decision D1: handle personal data properly with consent. |
| US-60 | Browse without being tracked | NFR-15 | Must | S | US-1 | Decision D6 and PECR: no cookies, no analytics, no outside hosts. Also makes the zero cost rule checkable. |
| US-61 | Exercise my data protection rights | NFR-16 | Could | S | US-42 | Depends on the data subject tool. The Privacy notice already states rights and the one month answer time (US-17), and staff can delete records in US-40 and US-41. |
| US-62 | Have backups kept no longer than needed | NFR-17 | Could | S | US-46 | Only meaningful once backups exist (US-46). |
| US-63 | Keep personal data safe where it lives | NFR-18 | Must | S | US-45 | Decision D1: personal data stored only on the server. AC-63.2 (refuse to start on a non local address without HTTPS) is cheap protection. |
| US-64 | Make passwords and sign in hard to attack | NFR-19 | Must | S | US-30 | Staff login must resist guessing. Replaces the cut two step verification (US-31). |
| US-65 | Keep sessions short-lived and safe | NFR-20 | Must | S | US-30 | Basic session safety for a login that can read personal data. |
| US-66 | Stop automated abuse | NFR-21 | Should | M | US-13, US-15, US-16, US-30 | Under decision D6 there is no CAPTCHA, so limits are the main defence against form flooding. Sign in lockout in US-64 covers guessing, so the form limits can follow. |
| US-67 | Refuse forged requests | NFR-22 | Must | S | US-13, US-15, US-30 | Standard protection for every state changing request. Cheap if built in from the start. |
| US-68 | Accept only safe uploads | NFR-23 | Must | M | US-38 | Uploads are the main attack surface of the admin portal. |
| US-69 | Block injected scripts and set safe headers | NFR-24 | Must | M | Cross cutting | Standard security baseline. A strict content security policy limits the choice of 3D and animation libraries (RSK-17), so decide early. |
| US-70 | Restrict each admin function to the right people | NFR-25 | Must | S | US-30 | Default deny on admin routes. The Editor 403 criteria are provisional on OQ-1. |
| US-71 | Ship without secrets or known vulnerabilities | NFR-26 | Must | S | Cross cutting | Hub rules already require no secrets and clean dependencies. Cheap to keep from day one. |
| US-72 | Keep the concept out of search engines | NFR-27 | Must | S | US-1 | Decision D2: every page set not to be indexed. |
| US-73 | Have the whole site properly translated and laid out in four languages | NFR-28 | Must | M | US-22, US-33 | Decision D5: four languages must be complete, not just present. Includes the longer text layout test. |
| US-74 | Use the site on the browsers and devices people actually have | NFR-29 | Should | M | Cross cutting | Agency default is evergreen browsers. For the MVP test Chrome, Safari (iOS and macOS) and Firefox; add Edge and Samsung Internet if capacity allows. |
| US-75 | Look and feel like the resort's brand | NFR-30 | Must | S | Phase 4 brand extraction | Decision D7: use the current site brand, enhanced for hospitality. Tokens defined once also serve US-49. |
| US-76 | Run the site at no running cost | NFR-31 | Must | S | Cross cutting | Decision D6: no running costs. A licence check and a network blocked test run keep it honest. |
| US-77 | Install, configure and check the site easily | NFR-32 | Should | S | US-45 | One configuration file is part of US-45. The health check and the 10 command limit are extras. |
| US-78 | Never lose or corrupt confirmed data | NFR-33 | Should | S | US-13, US-15, US-33 | Durable writes come with a normal embedded database. The two editors conflict check (AC-78.3) is an analyst addition and can follow. |

## Complexity worth cutting

Ordered by how much build and test effort each would save. Items 1 to 3 need Steven's decision at T1. Items 4 to 8 are refinements of how a story is met and can be decided by the Orchestrator with the analyst.

1. **Five distinct section scenes (US-26, FR-28, AC-26.1, AC-26.2).** Steven asked for "3D animations and landing pages". The hero (US-25) is the clear ask; one distinct real time scene for each of five section pages is the analyst's reading (OQ-9) and multiplies 3D modelling, texture budget and testing (RSK-20). Proposal: build one reusable scene system, ship the hero plus two scenes (suggested: Pools and beach, Rooms and suites), and give the other section pages a lighter scroll driven treatment with a poster image. Decision needed: Steven.
2. **Analyst additions Steven can reject (listed in `docs/assumptions.md`).** This backlog already defers the heavy ones: two step verification (US-31, Won't), draft and publish with version history (US-36, Won't), enquiry email notification (US-14, Won't), audit log (US-44, Could), data subject request tool (US-42, Could), backup and restore (US-46 and US-62, Could), optimistic locking of saves (AC-78.3 inside US-78, Should). Together they defer 8 stories and 29 acceptance criteria (plus AC-78.3) and drop the SMTP dependency. Decision needed: Steven. Revisit all of them if the concept is ever hosted beyond local review (OQ-13).
3. **Admin roles (OQ-1; AC-32.5, AC-70.2, AC-70.5).** Ship one role for all staff in the MVP and keep the Editor versus Administrator split for later. Decision needed: Steven.
4. **Image pipeline (US-39, FR-41).** Produce WebP only at three widths (480, 1280, 1920) instead of AVIF and WebP at four widths. Keeps metadata removal and orientation fixes, which are the privacy parts.
5. **Fragile or heavy checks (AC-21.4, AC-43.5, AC-76.5, AC-46.3).** Replace the live comparison with jazhotels.com text (AC-21.4, depends on an outside site being reachable, DEP-9) with a recorded one time review. Replace the 48 hour and 24 hour waits with simulated time.
6. **Performance measurement scope (US-52, US-53, US-55).** The 50 frames per second target on a physical mid range Android phone (AC-53.1) cannot be checked without that device (DEP-6). Agree now that L1 results are accepted if no phone is available. Treat the 25 visitor and 5,000 enquiry load targets (US-55, Could) as a smoke test only.
7. **Browser and device matrix (US-74, Should).** Test Chrome, Safari and Firefox for the MVP. Edge, Samsung Internet and 2560 pixel width follow.
8. **Fallback triggers (AC-57.2).** Keep no WebGL, context loss and reduced motion. Save-Data and 2g triggers can be dropped from the MVP.

## Effects of deferrals on acceptance criteria

These criteria sit in stories with a different priority from the story they depend on. They are not rewritten here (the analyst owns `docs/stories.md`); the analyst should update them after T1 if Steven accepts the cuts.

| Deferred story | Criteria in other stories affected | What to do |
| --- | --- | --- |
| US-31 two step verification (Won't) | AC-30.2 (valid code), AC-51.1 (`one-time-code` field) | Apply only the password part until US-31 is built |
| US-36 draft, preview, publish (Won't) | AC-33.1, AC-34.1, AC-34.2, AC-24.1 and AC-35.x say "publish" | Read "publish" as "save"; changes go live on save within 60 seconds |
| US-44 audit log (Could) | AC-41.4, AC-43.3 (audit entries) | Defer these two criteria with the story |
| US-42 data subject tool (Could) | AC-61.2 (in US-61) | Defer with the story; use search and delete in US-40 and US-41 |
| US-46 backup (Could) | AC-62.1, AC-62.2 (via US-62) | Defer with the story |
| US-14 email notification (Won't) | None outside the story | OQ-2 stays "admin portal only" |
| Admin roles (OQ-1) | AC-32.5, AC-70.2, AC-70.5 | Leave provisional; test only after OQ-1 is answered |

## Suggested delivery order

Not a schedule (there are no dates). The order puts the highest technical risk first and keeps every step reviewable by Steven.

1. **Foundations and spikes.** US-1 shell, US-75 brand tokens, US-20 concept notice, US-72 noindex, US-60 no outside requests, US-71 clean repo. In parallel a 3D spike: US-25 poster, US-57 fallback and US-56 reduced motion, to test RSK-3 early.
2. **Public content in English.** US-2 to US-11, US-19, US-21, then US-22 (language structure).
3. **Motion.** US-25, US-28, US-27, US-54, US-53, then US-26.
4. **Forms and personal data.** US-13, US-15, US-16, US-17, US-59, US-63, US-43, then US-66 (Should).
5. **Admin portal.** US-30, US-64, US-65, US-70, US-32, US-37, US-68, US-38, US-39, US-33, US-34, US-40, US-41, US-51.
6. **Four languages complete and hardening.** US-73, then US-24, US-23, US-35 (Should), US-47 to US-50, US-52, US-69, US-76, US-45 (package).
7. **Remaining Should and Could** only if Steven asks after the first review: US-12, US-18, US-29, US-58, US-74, US-77, US-78, then US-42, US-44, US-46, US-55, US-61, US-62.

## Open questions that can still move priorities

- **OQ-4 (what "edit everything" covers).** If Steven means page layout, navigation, colours or 3D scene parameters, US-33 and US-34 grow from L to a different build. This backlog assumes content within fixed templates (RSK-4).
- **OQ-9 (meaning of "landing pages").** If separate campaign or offer pages are wanted, US-26 changes shape.
- **OQ-6 (publishing workflow)** decides whether US-36 stays Won't.
- **OQ-1 (roles)** decides the Editor criteria.
- **OQ-12, OQ-13, OQ-14** affect US-17, the hosting assumptions and the server load targets.
