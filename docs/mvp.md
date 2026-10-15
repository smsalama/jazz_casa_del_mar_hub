# MVP: Jazz Casa del Mar resort website

- Client slug: jazz_casa_del_mar
- Project slug: site
- Task: P2-T1b (Product Owner), updated by P2-T3 on 2026-10-15 after the T1 approval
- Status: scope approved at T1 ("Approve T1", `approvals/T1-scope.md`). The MVP is the Must set in `docs/backlog.md` with the T1 promotions of US-46 and US-66 and the new story US-79. OQ-20 and OQ-21 were answered afterwards (`docs/change-log.md`, CL-3).
- Sources: `docs/backlog.md` (priorities and reasons), `docs/brief.md` (decisions D1 to D7), `docs/t1-decisions.md`, `docs/requirements.md`, `docs/stories.md`, `docs/assumptions.md`

## MVP scope

The MVP is a locally installable, clearly marked, non indexed concept of the Jaz Elite Casa del Mar Beach resort website: 21 page types in English, German, Italian and Russian (84 public pages) built on placeholder text and images in a brand taken from the current page and enhanced for hospitality, with an immersive real time 3D hero and a distinct scene on each of the five section overview pages (six scenes), a branded loader and page transitions, a pause control, reduced motion support and a complete non 3D fallback, a Contact Us form (no consent tick, a privacy information line and a data protection complaint subject) and a newsletter sign up with recorded consent, an unsubscribe page, a privacy notice, automatic retention, rate limits and a daily automatic backup, Book now links out to the existing JAZ site with a visible external site label, and a staff admin portal with one Administrator role where signed-in staff edit all text, titles, images, links, list items and settings in all four languages inside fixed page designs, upload photos, read enquiries and export subscribers, with a record of security events, all at zero running cost, sending no email, and built to WCAG 2.2 AA and the agency performance and security baselines. The package refuses to start on any non local address. The MVP is every Must story in `docs/backlog.md`: 61 of 80 stories and 330 of 401 active acceptance criteria (22 small, 33 medium, 6 large).

## Stories in the MVP

61 stories. Sizes and reasons are in `docs/backlog.md`. 2 of the 330 criteria are provisional on an open question (AC-15.1 and AC-17.4 on OQ-12, pending the solicitor's answer to Q3) and keep their working answer until it arrives.

### Public site: pages and content

| ID | Story | Size | Active criteria |
| --- | --- | --- | --- |
| US-1 | Find my way around the site | M | 8 |
| US-2 | Understand the resort from the Home page | M | 3 |
| US-3 | Compare rooms and suites | M | 3 |
| US-4 | Browse the dining venues | S | 3 |
| US-5 | See the pools, beach and activities | S | 3 |
| US-6 | Find the resort and what is nearby | S | 3 |
| US-7 | See the current offers | S | 3 |
| US-8 | Look through the photo gallery | M | 4 |
| US-9 | Read the frequently asked questions | S | 3 |
| US-10 | Follow Book now to the JAZ booking engine | S | 6 |
| US-11 | Contact the resort by phone, chat or social media | S | 4 |
| US-19 | Read the terms, the accessibility statement and what this concept is | M | 4 |

### Languages, concept marking, placeholder content and brand

| ID | Story | Size | Active criteria |
| --- | --- | --- | --- |
| US-20 | See clearly that this is a concept | S | 5 |
| US-21 | Be sure all content is placeholder content | M | 5 |
| US-22 | Read the site in my own language | M | 5 |
| US-73 | Have the whole site properly translated and laid out in four languages | M | 5 |
| US-75 | Look and feel like the resort's brand | S | 6 |

### 3D, motion and fallback

| ID | Story | Size | Active criteria |
| --- | --- | --- | --- |
| US-25 | Be drawn in by the 3D hero | L | 5 |
| US-26 | Experience motion on each section page | L | 3 |
| US-27 | See a loader and smooth transitions between pages | L | 7 |
| US-28 | Pause the motion | S | 4 |
| US-54 | Move between pages without waiting for animations | S | 4 |
| US-56 | See a calm site when I ask for reduced motion | M | 4 |
| US-57 | Get a complete site when 3D cannot run | M | 5 |
| US-53 | Enjoy smooth 3D | M | 6 |

### Forms, personal data and legal pages

| ID | Story | Size | Active criteria |
| --- | --- | --- | --- |
| US-13 | Send an enquiry to the resort | M | 10 |
| US-15 | Subscribe to the newsletter | M | 8 |
| US-16 | Unsubscribe from the newsletter | S | 6 |
| US-17 | Understand how my data is used | M | 5 |
| US-59 | Share only the data that is needed | M | 6 |
| US-60 | Browse without being tracked | S | 7 |
| US-63 | Keep personal data safe where it lives | S | 4 |
| US-43 | Have old personal data deleted automatically | M | 6 |

### Admin portal

| ID | Story | Size | Active criteria |
| --- | --- | --- | --- |
| US-30 | Sign in and out of the admin portal | M | 7 |
| US-32 | Manage staff accounts | M | 7 |
| US-33 | Edit every piece of text in every language | L | 5 |
| US-34 | Add, remove and reorder items in lists | L | 6 |
| US-37 | Keep contact details and site-wide settings up to date | M | 6 |
| US-38 | Upload and manage photos | M | 6 |
| US-39 | Have uploaded photos prepared automatically | M | 5 |
| US-40 | Read enquiries | M | 7 |
| US-41 | Export subscribers | M | 7 |
| US-51 | Sign in and work in the admin portal without barriers | S | 4 |
| US-64 | Make passwords and sign in hard to attack | S | 4 |
| US-65 | Keep sessions short-lived and safe | S | 6 |
| US-70 | Restrict each admin function to the right people | S | 4 |
| US-79 | Keep a record of security events | S | 4 |

### Security, abuse protection and backup

| ID | Story | Size | Active criteria |
| --- | --- | --- | --- |
| US-66 | Stop automated abuse | M | 6 |
| US-67 | Refuse forged requests | S | 5 |
| US-68 | Accept only safe uploads | M | 9 |
| US-69 | Block injected scripts and set safe headers | M | 10 |
| US-71 | Ship without secrets or known vulnerabilities | M | 7 |
| US-72 | Keep the concept out of search engines | S | 5 |
| US-46 | Back up and restore the site's data | M | 6 |

### Accessibility, performance, cost and delivery

| ID | Story | Size | Active criteria |
| --- | --- | --- | --- |
| US-47 | Use the whole site with a keyboard | M | 6 |
| US-48 | Use the site with a screen reader | M | 6 |
| US-49 | Read the site comfortably | M | 6 |
| US-50 | Meet WCAG 2.2 AA across the whole site | M | 3 |
| US-52 | Get pages quickly on a mid range phone | L | 8 |
| US-76 | Run the site at no running cost | S | 6 |
| US-45 | Review the site on one computer | M | 6 |

## Deliberately left out

**Stories not in the MVP** (19 stories stay in the backlog with a revisit trigger):

- Won't this release (approved at T1): US-14 enquiry email to staff (OQ-2: admin portal only), US-31 two-step verification (accepted risk for local review with synthetic data; the package refuses non local starts, G-22), US-36 draft, preview and version history (OQ-6: edits go live on save).
- Could (built only if Steven asks, or when hosting requires it): US-42 data subject request tool, US-44 audit log screen, US-55 load targets, US-61 individual rights criteria, US-62 backup expiry statements. US-42 and US-44 become Must before any hosting (T1 section D).
- Should (after the first review): US-12 localised error pages, US-18 cookie notice accuracy checks (the page itself ships with US-1), US-23 language detection from the browser, US-24 missing translation fallback, US-29 delivery of 3D source files, US-35 missing translations screen, US-58 no JavaScript support, US-74 full browser matrix, US-77 health check and configuration extras, US-78 conflict check for two editors, US-80 resource limits.

**Criteria inside MVP stories that are deferred or trimmed:**

- The one-time code parts of AC-30.2 and AC-51.1 apply only if two-step verification is built.
- AC-39.1 formats, AC-57.2 Save-Data and 2g triggers, AC-46.3 and AC-46.4 real time waits: possible trims for the architect, not decided at T1 (`docs/backlog.md`, "Complexity worth cutting").
- AC-36.2, AC-36.4 and AC-36.5 to AC-36.7 (live on save) sit in the Won't story US-36 but describe behaviour the Must admin stories deliver. They are tested with US-33, US-34, US-37 and US-38 (`docs/backlog.md`, Consistency notes).

**Out by the brief and the analyst's exclusions** (`docs/assumptions.md`, EXC-1 to EXC-27): a booking engine, availability, prices and payment; JAZ group pages; guest accounts; analytics, advertising and social widgets; live chat; any email sent by the site; replying to enquiries or sending newsletters from the site; reviews, ratings, awards and eco or quality badges; search engine optimisation and site search (the concept is noindex); native apps; an admin interface in languages other than English; admin control of page layout, navigation structure, colours, fonts and 3D scene settings; adding or deleting a room type; separate Editor and Administrator roles; video; right to left languages; hosting by the agency; legal advice.

## Measurable success criteria

The brief's success measure is "Modernised Design and client feedback". Criteria 1 and 2 measure that directly (NFR-36). The rest measure that the MVP is complete, usable and safe enough for Steven's feedback to be about design and not about defects. Thresholds are the requirement values; the analyst proposed them (A-12) and they can be re-baselined with the Performance Engineer before T2.

| No. | Criterion | Target | How measured | Source |
| --- | --- | --- | --- | --- |
| 1 | Design verdict from Steven | At T2 (approved designs) his verdict is Approve or Approve with changes, and at T3 (release package running locally) it is Approve or Approve with changes; no implementation before the T2 verdict | Reply quoted verbatim in `approvals/` as the matching file | NFR-36, AC-75.4, AC-75.5 |
| 2 | Client feedback handled | Every change listed in an "Approve with changes" verdict is either done and shown again to Steven, or recorded in the change log as declined by him; zero open must-fix items at T3 | Change log and the T3 approval file | NFR-36, AC-75.6 |
| 3 | Pages complete in four languages | 84 of 84 public URLs return HTTP 200 with exactly one `h1`; every language has the same number of non-empty strings as English | AC-1.1, AC-45.4, AC-73.1 | FR-1, FR-24, NFR-28 |
| 4 | Primary action works | A valid contact form in each of the four languages stores one enquiry and shows an `ENQ-` reference; a submission under 2 seconds shows the retry message and stores nothing, and a resend is accepted | AC-13.4, AC-13.5, AC-13.10 | FR-19, FR-20 |
| 5 | Staff can run the content | A test Administrator changes a heading in two languages and sees it live within 60 seconds; uploads 3 photos; reads an enquiry; exports a subscriber CSV with the right rows | AC-33.1, AC-37.1, AC-38.1, AC-40.1, AC-41.1 | FR-35, FR-38 to FR-43 |
| 6 | Accessibility | Zero axe-core violations (wcag2a, wcag2aa, wcag21aa, wcag22aa) on all pages and states in 3D and fallback mode; Lighthouse Accessibility at least 95 on every public page; no failed WCAG 2.2 A or AA criterion in the manual report | AC-50.1 to AC-50.3 | NFR-1 |
| 7 | Speed | On L1 (and R1 if available), every public page: Largest Contentful Paint at most 2.5 s, Cumulative Layout Shift at most 0.1, Total Blocking Time at most 300 ms; Lighthouse mobile Performance at least 80 in 3D mode and 90 in fallback mode; Best Practices at least 95 | AC-52.1 to AC-52.3 | NFR-6 |
| 8 | Smooth 3D | First 3D frame within 4 s on L1; median at least 50 frames per second and slowest 1 percent no slower than 30; at most 150,000 triangles and 100 draw calls. If no physical R1 phone exists, the lab profile L2 result is labelled "emulated" and confirmation on a phone is an open item for T3 | AC-53.1 to AC-53.3 | NFR-8 |
| 9 | Fallback and reduced motion | With WebGL off or reduced motion on, zero 3D code or asset requests and every function still present | AC-56.1, AC-57.1, AC-57.3 | NFR-11, NFR-12 |
| 10 | Concept and privacy controls | Concept notice on 100 percent of pages, error pages and admin screens; `X-Robots-Tag` noindex on 100 percent of page responses; zero cookies and zero requests to any other host on public pages | AC-20.1, AC-72.1, AC-60.1, AC-60.3 | D1, D2, D6 |
| 11 | Zero running cost | The full journey suite passes with outgoing network blocked entirely; 100 percent of runtime dependencies on the licence allow-list | AC-76.1, AC-76.3 | D6, NFR-31 |
| 12 | Security hygiene | Secret scan reports zero findings; dependency audit reports zero high or critical; every admin route returns 401 or a redirect without a session | AC-71.1, AC-71.3, AC-70.1 | NFR-25, NFR-26 |
| 13 | Abuse limits and records | The 21st sign in attempt in 15 minutes and the 6th contact form in an hour receive HTTP 429; one entry per sign in, lockout, export, enquiry deletion and purge run exists in the security event record with no personal data | AC-66.1, AC-66.2, AC-79.1, AC-79.2 | NFR-21, NFR-34 |
| 14 | Recovery and safe start | A backup is created without anyone running the command and restores into an empty install with all records; the package exits with `STARTUP-REFUSED` on any non local listen address | AC-46.2, AC-46.4, AC-63.2 | FR-48, NFR-18 |
| 15 | Acceptance | Every active acceptance criterion in the 61 Must stories passes, or is listed with a waiver Steven has approved; the two provisional criteria are re-checked after the solicitor answers Q3 | QA traceability table in `docs/traceability.md` | Gate: testing |
| 16 | Runs for review | A reviewer installs from the package with the documented commands, creates the first Administrator with the setup code or command and sees the full site; the site makes no outside connection | AC-45.1, AC-45.3, AC-45.5 | FR-47 |

## Decisions the MVP needed from Steven at T1: resolved

All were settled by "Approve T1" on 2026-10-15 (`approvals/T1-scope.md`) except the two noted. Details are in `docs/change-log.md` (CL-2, CL-3).

| Decision needed | Outcome |
| --- | --- |
| Accept or change the cuts (two-step verification, draft and publish, audit log, data subject tool, backup, email alerts, one role) | Accepted: US-14, US-31 and US-36 Won't; US-42 and US-44 Could; US-46 promoted to Must; one Administrator role (OQ-1). |
| What "edit everything" covers, and the concept notice and noindex (OQ-4, OQ-5) | Text, titles, images, links, list items and settings inside fixed designs. Fixed concept sentence plus an optional 200 character line; no noindex setting. |
| What "landing pages" means and how many scenes (OQ-9) | Home and the five section overview pages, six scenes. The lighter option was not chosen. |
| Default language, translation quality, synthetic contact details (OQ-3, OQ-8, OQ-16) | English default with browser detection; machine assisted, unreviewed, local review only; synthetic details. |
| Local review only and server assumptions (OQ-13, OQ-14) | Local review only; small Linux server with no database or mail server. |
| Seventh room type (OQ-20, raised after T1) | Answered "no". Six room pages only. |
| Exact booking address (OQ-21, raised after T1) | Answered "ignore booking". Keep the default resort page address; Book now stays in scope. |

Still open and not blocking: the solicitor's answers to Q1 to Q7 (`docs/legal/questions-2026-10-15.md`), all needed before any hosting, and OQ-12 (the controller name).
