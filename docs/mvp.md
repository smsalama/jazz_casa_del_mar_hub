# MVP: Jazz Casa del Mar resort website

- Client slug: jazz_casa_del_mar
- Project slug: site
- Task: P2-T1b (Product Owner)
- Date: 2026-10-15
- Status: proposal for the T1 scope touchpoint
- Sources: `docs/backlog.md` (priorities and reasons), `docs/brief.md` (decisions D1 to D7), `docs/requirements.md`, `docs/stories.md`, `docs/assumptions.md`

## MVP scope

The MVP is a locally installable, clearly marked, non indexed concept of the Jaz Elite Casa del Mar Beach resort website: 21 page types in English, German, Italian and Russian (84 public pages) built on placeholder text and images in a brand taken from the current page and enhanced for hospitality, with an immersive real time 3D hero, 3D or scroll driven scenes on the section landing pages, a branded loader and page transitions, a pause control, reduced motion support and a complete non 3D fallback, a Contact Us form and a newsletter sign up with recorded consent, an unsubscribe page, a privacy notice and automatic retention, Book now links out to the existing JAZ booking engine, and a staff admin portal where signed in staff edit every title and text and every list item in all four languages, upload photos, read enquiries and export subscribers, all at zero running cost and built to WCAG 2.2 AA and the agency performance and security baselines. The MVP is every Must story in `docs/backlog.md`: 58 of 78 stories and 272 of 338 acceptance criteria (25 small, 27 medium, 6 large).

## Stories in the MVP

58 stories. Sizes and reasons are in `docs/backlog.md`. 23 of the 272 criteria are provisional on an open question and keep their working answer until Steven answers.

### Public site: pages and content

| ID | Story | Size | Acceptance criteria |
| --- | --- | --- | --- |
| US-1 | Find my way around the site | M | 8 |
| US-2 | Understand the resort from the Home page | M | 3 |
| US-3 | Compare rooms and suites | M | 3 |
| US-4 | Browse the dining venues | S | 3 |
| US-5 | See the pools, beach and activities | S | 3 |
| US-6 | Find the resort and what is nearby | S | 3 |
| US-7 | See the current offers | S | 2 |
| US-8 | Look through the photo gallery | M | 4 |
| US-9 | Read the frequently asked questions | S | 3 |
| US-10 | Follow Book now to the JAZ booking engine | S | 5 |
| US-11 | Contact the resort by phone, chat or social media | S | 4 |
| US-19 | Read the terms, the accessibility statement and what this concept is | S | 3 |

### Languages, concept marking and placeholder content

| ID | Story | Size | Acceptance criteria |
| --- | --- | --- | --- |
| US-20 | See clearly that this is a concept | S | 5 |
| US-21 | Be sure all content is placeholder content | M | 4 |
| US-22 | Read the site in my own language | M | 5 |
| US-73 | Have the whole site properly translated and laid out in four languages | M | 5 |
| US-75 | Look and feel like the resort's brand | S | 3 |

### 3D, motion and fallback

| ID | Story | Size | Acceptance criteria |
| --- | --- | --- | --- |
| US-25 | Be drawn in by the 3D hero | L | 4 |
| US-26 | Experience motion on each section page | L | 2 |
| US-27 | See a loader and smooth transitions between pages | L | 6 |
| US-28 | Pause the motion | S | 4 |
| US-54 | Move between pages without waiting for animations | S | 4 |
| US-56 | See a calm site when I ask for reduced motion | M | 4 |
| US-57 | Get a complete site when 3D cannot run | M | 5 |
| US-53 | Enjoy smooth 3D | M | 6 |

### Forms, personal data and legal pages

| ID | Story | Size | Acceptance criteria |
| --- | --- | --- | --- |
| US-13 | Send an enquiry to the resort | M | 9 |
| US-15 | Subscribe to the newsletter | S | 6 |
| US-16 | Unsubscribe from the newsletter | S | 3 |
| US-17 | Understand how my data is used | M | 4 |
| US-59 | Share only the data that is needed | M | 6 |
| US-60 | Browse without being tracked | S | 6 |
| US-63 | Keep personal data safe where it lives | S | 4 |
| US-43 | Have old personal data deleted automatically | M | 5 |

### Admin portal

| ID | Story | Size | Acceptance criteria |
| --- | --- | --- | --- |
| US-30 | Sign in and out of the admin portal | M | 6 |
| US-32 | Manage staff accounts | M | 6 |
| US-33 | Edit every piece of text in every language | L | 4 |
| US-34 | Add, remove and reorder items in lists | L | 5 |
| US-37 | Keep contact details and site-wide settings up to date | S | 4 |
| US-38 | Upload and manage photos | M | 6 |
| US-39 | Have uploaded photos prepared automatically | M | 5 |
| US-40 | Read enquiries | M | 5 |
| US-41 | Export subscribers | M | 5 |
| US-51 | Sign in and work in the admin portal without barriers | S | 4 |
| US-64 | Make passwords and sign in hard to attack | S | 4 |
| US-65 | Keep sessions short-lived and safe | S | 5 |
| US-70 | Restrict each admin function to the right people | S | 5 |

### Security

| ID | Story | Size | Acceptance criteria |
| --- | --- | --- | --- |
| US-67 | Refuse forged requests | S | 3 |
| US-68 | Accept only safe uploads | M | 7 |
| US-69 | Block injected scripts and set safe headers | M | 6 |
| US-71 | Ship without secrets or known vulnerabilities | S | 4 |
| US-72 | Keep the concept out of search engines | S | 5 |

### Accessibility, performance, cost and delivery

| ID | Story | Size | Acceptance criteria |
| --- | --- | --- | --- |
| US-47 | Use the whole site with a keyboard | M | 6 |
| US-48 | Use the site with a screen reader | M | 6 |
| US-49 | Read the site comfortably | M | 6 |
| US-50 | Meet WCAG 2.2 AA across the whole site | M | 3 |
| US-52 | Get pages quickly on a mid range phone | L | 8 |
| US-76 | Run the site at no running cost | S | 5 |
| US-45 | Review the site on one computer | M | 5 |

## Deliberately left out

**Stories not in the MVP** (all 20 stay in the backlog with a revisit trigger):

- Won't this release: US-14 enquiry email notification (needs a mail server and OQ-2), US-31 two step verification, US-36 draft, preview, publish and version history. In the MVP a saved change goes live straight away.
- Could (built only if Steven asks): US-42 data subject request tool, US-44 audit log, US-46 backup and restore, US-55 load targets, US-61 individual rights criteria, US-62 backup expiry.
- Should (after the first review): US-12 localised error pages, US-18 cookie notice, US-23 language detection from the browser, US-24 missing translation fallback, US-29 delivery of 3D source files, US-35 missing translations screen, US-58 no JavaScript support, US-66 rate limiting, US-74 full browser matrix, US-77 health check, US-78 conflict check for two editors.

**Criteria inside MVP stories that are deferred or trimmed** (each is a proposal for Steven or the Orchestrator):

- AC-30.2 and AC-51.1 (the one time code part) until two step verification is built.
- AC-41.4 and AC-43.3 (audit log entries) until the audit log is built.
- AC-32.5, AC-70.2 and AC-70.5 (Editor role) until OQ-1 is answered. One staff role in the MVP.
- AC-21.4 (live text comparison with the current page), replaced by a one time recorded review.
- AC-57.2 for Save-Data and 2g triggers. No WebGL, context loss and reduced motion stay.
- AC-39.1 formats: WebP at three widths instead of AVIF and WebP at four. Metadata removal and orientation fixes stay.
- US-26: if Steven agrees at T1, the hero plus two distinct scenes instead of five (AC-26.1, AC-26.2 change accordingly).

**Out by the brief and the analyst's exclusions** (`docs/assumptions.md`, EXC-1 to EXC-21): a booking engine, availability, prices and payment; JAZ group pages; guest accounts; analytics, advertising and social widgets; live chat; replying to enquiries or sending newsletters from the site; reviews, ratings and awards; search engine optimisation (the concept is noindex); native apps; an admin interface in languages other than English; admin control of page layout, navigation, colours, fonts and 3D scene parameters (until OQ-4 is answered); video; right to left languages; hosting by the agency; legal advice.

## Measurable success criteria

The brief's success measure is "Modernised Design and client feedback". Criteria 1 and 2 measure that directly. The rest measure that the MVP is complete, usable and safe enough for Steven's feedback to be about design and not about defects. Thresholds are the requirement values; the analyst proposed them (A-12) and they can be re-baselined with the Performance Engineer before T2.

| No. | Criterion | Target | How measured | Source |
| --- | --- | --- | --- | --- |
| 1 | Design verdict from Steven | At T2 (design) he answers yes or yes with changes to "does this look modernised, high quality and professional compared with the current page"; at T3 (release) he answers yes | Answer quoted verbatim in the approval file in `approvals/` | Brief success measure |
| 2 | Client feedback handled | Every feedback item from T2 and T3 is recorded and either fixed or declined with a reason; zero open "must fix" items at T3; target of at most two feedback rounds to each approval | Feedback list in the change log and status | Brief success measure |
| 3 | Pages complete in four languages | 84 of 84 public URLs return HTTP 200 with exactly one `h1`; 100 percent of public strings non empty in en, de, it, ru | AC-1.1, AC-73.1 | FR-1, FR-24, NFR-28 |
| 4 | Primary action works | A valid contact form in each of the four languages stores one enquiry and shows an `ENQ-` reference; a spam trap submission stores none | AC-13.4, AC-13.5, AC-13.6 | FR-19, FR-20 |
| 5 | Staff can run the content | A test editor changes a heading in all four languages and sees it live within 60 seconds; uploads 3 photos; reads an enquiry; exports a subscriber CSV with the right rows | AC-33.1, AC-37.1, AC-38.1, AC-40.1, AC-41.1 | FR-35, FR-39 to FR-43 |
| 6 | Accessibility | Zero axe-core violations (wcag2a, wcag2aa, wcag21aa, wcag22aa) on all pages and states in 3D and fallback mode; Lighthouse Accessibility at least 95 on every public page; no failed WCAG 2.2 A or AA criterion in the manual report | AC-50.1, AC-50.2, AC-50.3 | NFR-1 |
| 7 | Speed | On L1 (and R1 if available), every public page: Largest Contentful Paint at most 2.5 s, Cumulative Layout Shift at most 0.1, Total Blocking Time at most 300 ms; Lighthouse mobile Performance at least 80 in 3D mode and 90 in fallback mode; Best Practices at least 95 | AC-52.1 to AC-52.3 | NFR-6 |
| 8 | Smooth 3D | First 3D frame within 4 s on L1; median at least 50 frames per second and slowest 1 percent no slower than 30; at most 150,000 triangles and 100 draw calls. If no physical R1 phone exists, L1 results are recorded and the limitation is stated | AC-53.1 to AC-53.3 | NFR-8 |
| 9 | Fallback and reduced motion | With WebGL off or reduced motion on, zero 3D code or asset requests and every function still present | AC-56.1, AC-57.1, AC-57.3 | NFR-11, NFR-12 |
| 10 | Concept and privacy controls | Concept notice on 100 percent of pages; `X-Robots-Tag` noindex on 100 percent of page responses; zero cookies and zero requests to any other host on public pages | AC-20.1, AC-72.1, AC-60.1, AC-60.3 | D1, D2, D6 |
| 11 | Zero running cost | The full journey suite passes with outgoing network blocked; 100 percent of runtime dependencies on the licence allow-list | AC-76.1, AC-76.3 | D6, NFR-31 |
| 12 | Security hygiene | Secret scan reports zero findings; dependency audit reports zero high or critical; every admin route returns 401 or a redirect without a session | AC-71.1, AC-71.3, AC-70.1 | NFR-25, NFR-26 |
| 13 | Acceptance | Every acceptance criterion in the 58 Must stories passes, or is listed with a waiver Steven has approved; provisional criteria are re-checked after Steven answers the open questions | QA traceability table in `docs/traceability.md` | Gate: testing |
| 14 | Runs for review | A reviewer installs from the package with the documented commands, creates the first Administrator and sees the full site; the site makes no outside connection | AC-45.1, AC-45.3, AC-45.5 | FR-47 |

## Decisions the MVP needs from Steven at T1

1. Accept or change the cuts above, especially two step verification, draft and publish, audit log, data subject tool, backup and email notification (analyst additions), and one staff role (OQ-1).
2. Confirm that "edit everything" means text, titles, images, links, list items and settings inside fixed page templates (OQ-4), and that the concept notice and noindex cannot be edited away (OQ-5).
3. Confirm what "landing pages" means (OQ-9) and whether the hero plus two scenes is enough for the immersive ask (US-26).
4. Confirm English as the default language (OQ-3), machine assisted translation for the concept (OQ-8) and the synthetic contact details (OQ-16).
5. Confirm local review only (OQ-13) and the working server assumptions (OQ-14).
