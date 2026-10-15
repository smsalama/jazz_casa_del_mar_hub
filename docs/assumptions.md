# Assumptions, dependencies, risks and exclusions: Jazz Casa del Mar resort website

- Task: P2-T1a (Requirements Analyst), amended by P2-T2 after the T1 scope approval
- Sources: `docs/brief.md`, `docs/requirements.md`, `docs/t1-decisions.md` (approved by Steven at T1), `docs/legal-register.md`, `docs/threat-model.md`, `gates/requirements.json`
- IDs: assumptions are A-n, dependencies are DEP-n, risks are RSK-n, exclusions are EXC-n. Open questions are OQ-n and live in `docs/requirements.md`. Steven's decisions are D1 to D7 as numbered in the brief's section "Decisions from Steven (2026-10-15)". Legal register rows are LR-n, security gaps G-n and gate findings M-n and L-n. After T1 and the answers to OQ-20 and OQ-21 the only open item is OQ-12; the project risk register is `docs/risk-register.md`, and RSK-1 to RSK-20 below are the requirements-phase risks that it incorporates.
- An assumption is something the analyst believes true or has chosen to proceed on without confirmation. Unlike an open question, an assumption does not block work; each one says who confirms it.

## Steven's decisions and where they land

| Decision (brief) | Requirements |
| --- | --- |
| D1 Personal data kept and handled properly: privacy notice, consent, retention | FR-14, FR-15, FR-19 to FR-23, FR-44, FR-45, NFR-14 to NFR-18 |
| D2 Speculative: concept marking, placeholder imagery, noindex everywhere, local review only | FR-16, FR-17, FR-18, FR-47, NFR-27 |
| D3 Admin portal edits everything, uploads photos, reads enquiries, exports subscribers | FR-32 to FR-46, NFR-19 to NFR-25 |
| D4 Book now links out to the JAZ booking engine | FR-7, FR-11 |
| D5 Four languages: English, German, Italian, Russian | FR-24 to FR-26, FR-37, NFR-28 |
| D6 No running costs once hosted on the client's servers | NFR-15, NFR-31, NFR-32 |
| D7 Brand extracted from the current site and may be enhanced | NFR-30 |

At T1 (2026-10-15) Steven replied "Approve T1" (`approvals/T1-scope.md`), which approves every recommendation in `docs/t1-decisions.md`, including the answers to OQ-1 to OQ-19. Their effect on the requirements is listed in `docs/requirements.md`, sections "Resolved at T1" and "Changes applied after T1 (P2-T2)". Two answers narrow or reshape his earlier decisions: OQ-4 narrows D3 ("edit everything") to content within fixed page designs (see EXC-15), and OQ-2 means the site sends no email.

## Assumptions

### Carried over from the brief (marked as assumptions there)

- **A-1 Audience.** International leisure travellers (couples and families), mostly on mobile, plus travel agents and returning guests. Confirm: Steven.
- **A-2 Primary action.** Sending an enquiry through the Contact Us form is the primary visitor action; newsletter sign-up and the Book now link are secondary. Confirm: Steven.
- **A-3 Admin team size.** Fewer than 10 admin accounts, all with one Administrator role (OQ-1, settled at T1). Least privilege (separate roles) returns before real enquiries or subscribers exist. Confirm: Security Engineer before any hosting.
- **A-4 Admin interface language.** The admin portal screens are in English only (FR-32), while the content it edits is in four languages. Confirm: Steven.
- **A-5 Email.** The site sends no email in this release (OQ-2, settled at T1: admin portal only), so no client mail server is needed. If FR-21 is ever reinstated it uses the client's own SMTP host over TLS (G-16). Confirm: Steven if email is wanted later.
- **A-6 Children.** The site is not directed at children, although it mentions a kids' club; no age data is collected (NFR-14). Confirm: UK legal role.
- **A-7 Currency selector and group content.** The currency selector is out because no prices are shown (OQ-18); JAZ group content (About JAZ, Destinations, Brands, Cruises, Gift Cards, Blogs, mobile app pages) is out and is not linked except through Book now. Confirm: Steven.
- **A-8 Map.** The Location page uses a static map image and a Google Maps link, not live map tiles, to avoid cost and third-party requests (FR-6). Confirm: Steven.
- **A-9 No analytics.** No analytics or tracking of any kind (NFR-15). Because of this, no cookie consent banner is shown on the public site; the cookie control in NFR-15 applies only if a non-essential item is ever added. Public form tokens are held in the form, not in a cookie (NFR-22, LR-21). Confirm: UK legal role.
- **A-10 Landing pages.** "Landing pages" means the section overview pages (Home, Rooms and suites, Dining, Pools and beach, Activities and facilities, Location), each with its own 3D scene (OQ-9, settled at T1). Confirm: none.

### Chosen by the analyst

- **A-11 Reference devices and lab profile.** The brief names no devices and says only "mid range phones". The analyst defined R1 (mid range Android, 2022 to 2024 class, named example Samsung Galaxy A54 5G), R2 (iPhone 12 class or later) and lab profile L1 (Lighthouse mobile preset, simulated slow 4G, 4 times CPU slowdown). Confirm: Performance Engineer and System Architect in Phase 4. Physical R1 and R2 devices may not be available; in that case budgets are measured on L1 only (DEP-6).
- **A-12 Performance and 3D budgets.** All numbers in NFR-6 to NFR-10 (Largest Contentful Paint 2.5 s, 50 frames per second, 3 MB hero assets, and so on) are the analyst's proposals based on common web-performance practice, not figures from the client. The Performance Engineer and System Architect may propose changes before the T2 design touchpoint; any change is recorded as a change to the requirement. The T1 gate review asked for executable alternatives where a device is unavailable: lab profile L2 (see A-27). Confirm: Performance Engineer.
- **A-13 Browser matrix.** The matrix in NFR-29 is the analyst's reading of "current evergreen browsers" in the brief. Safari 16.4 is the floor because it is the first Safari version with WebGL 2. Confirm: System Architect.
- **A-14 Content volumes.** Minimum counts (for example 12 gallery images, 8 FAQ questions, 3 offers, 5 attractions, descriptions of 25 or 60 words, 3 images per room) are the analyst's choice so that placeholder content is checkable. The brief gives only the lists of rooms, venues, pools and activities. Confirm: Steven (low impact).
- **A-15 Page structure.** Only the six room types have their own page. Dining venues, pools and beach items, and activities appear as items on their section page, each with an anchor (FR-3, FR-4). The brief said "overview plus venues" for dining and did not say whether venues need their own pages. Confirm: UI/UX Designer, Steven.
- **A-16 Enquiries are answered outside the site.** Staff reply from their own email or telephone; the admin portal reads enquiries but does not send replies (EXC-9). Confirm: Steven.
- **A-17 Newsletters are sent outside the site.** The client exports subscribers (FR-43) and uses their own tool to send newsletters (OQ-11). Confirm: Steven.
- **A-18 Language in the address, no cookie.** The chosen language is carried by the web address, and the default language is chosen per request from the browser's language list without a cookie, so the public site needs no cookie (FR-25, NFR-15). Confirm: System Architect.
- **A-19 Server.** A single small Linux server (1 CPU, 1 GB memory, 10 GB disk), no database server, no mail server, TLS provided in front of the site (OQ-14, settled at T1). The client's actual server is still unknown until the hosting questionnaire is completed; the design must not need more. Confirm: Steven (hosting questionnaire), System Architect.
- **A-20 Translation.** German, Italian and Russian placeholder copy is machine-assisted and unreviewed, acceptable for local review only (OQ-8, settled at T1). The fixed concept sentence and the title suffix in those languages are in the same category. Confirm: a qualified translator before any hosting.
- **A-21 Retention.** The Retention schedule in `docs/requirements.md` (with the rows added after the legal review) is approved as defaults and is held as configuration (OQ-10, settled at T1). The periods are judgements, not legal rules. Confirm: UK legal role and the solicitor before any hosting.
- **A-22 Robots rules.** Search engines can only obey `noindex` if they are allowed to fetch the page; so the analyst assumes the site will not use a `Disallow: /` rule in `robots.txt` (the `noindex` header and meta tag in NFR-27 do the work). With local review only, no crawler can reach the site in any case. Confirm: System Architect, UK legal role.
- **A-23 Pause choice storage.** The pause-motion choice (FR-30) is stored only in session storage because the visitor asked for it, and is treated as a user-requested item that does not need consent under PECR. Confirm: UK legal role.
- **A-24 Success measures.** The measure "Modernised Design and client feedback" is checked by Steven's own verdict at T2 and T3 (NFR-36, AC-75.4 to AC-75.6), plus the budgets in NFR-1 and NFR-6 to NFR-8. Confirm: Steven.
- **A-25 Time and dates.** The site computes and shows no dates except the date last reviewed on the Accessibility statement and the "acknowledge by" date on data protection complaints in the admin portal (FR-42). Offers carry no dates or validity wording (FR-7, LR-29), so locale date formatting is not a requirement. Confirm: UI/UX Designer.
- **A-26 No deadlines.** The brief says "No Deadlines"; no date constraints are placed on requirements. Confirm: Product Owner.
- **A-27 Lab profile L2.** Not every environment has a physical mid range Android phone, an iPhone, NVDA or VoiceOver. To make the criteria executable, lab profile L2 (desktop Chrome with hardware graphics, 6 times CPU slowdown) may replace R1 for the frame rate checks, and an automated role-and-name run may replace the screen reader journeys; every such result is labelled "emulated" and confirmation on the real device or tool is an open item for T3 (gate finding M4). The 6 times slowdown and the thresholds are the analyst's judgement and a desktop GPU is more capable than a phone GPU, so L2 cannot prove a pass on R1. Confirm: Performance Engineer, QA Tester.
- **A-28 Device tilt on iOS.** iOS Safari asks the user for permission before it gives a page device orientation data. The hero therefore never depends on tilt; touch drag is the base interaction and tilt is offered only after a visitor taps a labelled control and accepts (FR-27, AC-25.5). Confirm: Motion Designer.
- **A-29 Image formats.** Public image copies are made only in AVIF and WebP (FR-41). Every browser in the NFR-29 matrix decodes both (Safari 16.4 and later does). A browser outside the matrix may fail to show images; its alternative text, text and links still show (AC-74.4). Confirm: System Architect.
- **A-30 No site search.** The brief lists no site search, so none is provided and none is a requirement (FR-1, EXC-22). Confirm: Steven.
- **A-31 Offers carry no validity wording.** The first draft required "validity wording" on each offer. Legal review (LR-29) showed that invented deadlines for offers that do not exist can be an unfair practice, so offers now carry no date, validity or urgency wording and a "Sample offer" label (FR-7). The earlier assumption that offer validity wording could contain digits no longer applies. Confirm: UK legal role.
- **A-32 Fixed rooms.** The page inventory fixes six room pages (FR-1) and T1 limits editing to "fixed page designs", so the working answer is that staff edit the six room entries but cannot add or delete a room type (OQ-20). Confirmed by Steven in chat on 2026-10-15 ("no").
- **A-33 Default Book now address.** The booking engine address was never supplied. The default is the resort's page on the group site given in the brief (OQ-21), shown with the external site label (FR-11). Steven in chat on 2026-10-15: "ignore booking", read as keep this default and do not pursue the booking engine address. Solicitor question Q2 still applies before any hosting.
- **A-34 Soft hyphen allowed.** FR-39 and NFR-24 reject invisible format characters (Unicode category Cf) in plain text fields, which would also reject characters some German and Russian typography uses. The analyst allows only the soft hyphen (U+00AD) as an exception. Confirm: Security Engineer.
- **A-35 Fixed concept sentence wording.** The English sentence is from the T1 sheet. The German, Italian and Russian versions and the title suffix words (Konzept, Concept, Концепт) were written by the analyst by machine assistance and are unreviewed (A-20). Confirm: a qualified translator before any hosting.
- **A-36 Text comparison method.** AC-21.4 compares lists of hashes of 8 word sequences rather than stored copies of the resort's text, so that no copied text is kept in the repository and the check can run offline from a saved list. Confirm: QA Tester.
- **A-37 Complaint handling by form.** Data protection complaints and requests come in through the Contact Us form subject (FR-19), because no email is sent or received by the site. The controller still needs a way to receive complaints by email or post once there is a controller (LR-5). Confirm: UK legal role.
- **A-38 Edit scope confirmed by approval.** OQ-4 narrows Steven's decision D3 and the T1 sheet asked him to confirm it explicitly; his "Approve T1" approves every item in section B, and the analyst has treated that as the confirmation (gate finding M2). If the Orchestrator reads it differently, EXC-15 needs a separate explicit confirmation from Steven. Confirm: Orchestrator.
- **A-39 Wording version archive.** The label recorded with an enquiry or subscriber identifies an immutable archived copy of the consent or privacy text (glossary, D-2). Archiving is one small extra store; without it the version label proves nothing. Confirm: Steven at T2 (data model decision 2).
- **A-40 Suppression at sign up.** The working answer for a suppressed address is to store nothing and show the same confirmation (OQ-22). The cost is that a change of mind is ignored for 36 months. Confirm: Steven at T2.
- **A-41 Concept notice size.** 13 px below 640 px and 14 px above, exempt from the 16 px body minimum, at most 48 px tall at 390 px (OQ-24). Confirm: Steven at T2.
- **A-42 Checkbox and radio targets.** A 24 px drawn control in a 44 px full-width row is accepted as meeting WCAG 2.5.8 (NFR-2, AC-47.7). Confirm: Accessibility Specialist.
- **A-43 First frame limit.** 4 s on L1 stays; 4.5 s only if Steven approves at T2 (OQ-25). Confirm: Steven at T2, Performance Engineer.
- **A-44 Cyrillic search.** Cyrillic letters stay distinct in admin search (OQ-23). Confirm: Steven or the UI/UX Designer.
- **A-45 No source addresses in the security record.** Failed sign ins record the account identifier only (NFR-34, D-17). Investigations rely on the counters. If a source address is wanted, NFR-34 must change first. Confirm: Steven at T2, Security Engineer.

### Analyst additions beyond the brief

These are requirements the brief did not state, added because the analyst judged them necessary or standard practice. Steven can reject any of them; if he does, the listed requirements are withdrawn.

| Addition | Why | Requirements |
| --- | --- | --- |
| Two-step verification (TOTP) for every admin account | The admin portal can change all content and reads personal data; a password alone is weak | FR-33, NFR-19 |
| Audit log of admin actions | Accountability for edits, exports and deletions of personal data | FR-46 |
| Data subject request tools (find, export, delete by email) | Needed to honour UK GDPR rights within one month | FR-44, NFR-16 |
| Automatic retention purge job | Retention rules cannot rely on someone remembering | FR-45 |
| Newsletter unsubscribe page | Required for compliant newsletter consent (PECR) when no email can be sent | FR-23 |
| Accessibility statement page | Supports the WCAG 2.2 AA claim | FR-16 |
| "About this concept" section in the Terms | Makes the concept status explicit | FR-16 |
| Error pages (404 and 500) | Basic usability and information-leak control | FR-13 |
| Pause-motion control | WCAG 2.2.2 for motion longer than 5 seconds | FR-30 |
| Draft, preview, publish and version history | Safety for an "edit everything" portal. Not built: OQ-6 settled at T1 as edits live on save | FR-38 (now "Changes go live on save") |
| Backup and restore command | A site with no paid backup service needs its own | FR-48, NFR-17 (Must at T1; automatic daily, G-3) |
| Image resizing and metadata removal on upload | Keeps performance budgets when staff upload large photos; removes location data from photos | FR-41 |
| Rate limits, anti-forgery tokens, security headers | Standard security controls | NFR-21 (Must at T1), NFR-22, NFR-24 |
| Optimistic locking of content saves | Two Administrators must not silently overwrite each other | NFR-33 |
| No prices, discounts or currency symbols on offers | Avoids price claims that a speculative concept cannot honour (consumer protection) | FR-7 (price rule only) |
| Spam trap field and 2 second minimum before a form is accepted | Cuts automated spam without a paid or third party captcha | FR-20 (rejection rules only) |
| Server load and admin speed targets on a 1 CPU, 1 GB server | Makes "no running costs" testable on a small server | NFR-10 |
| Data saving and slow connection triggers for the 3D fallback | Protects visitors on slow or metered mobile data | NFR-12 (`Save-Data` and 2g triggers only) |
| Every public function works with JavaScript turned off | Resilience and accessibility beyond the brief | NFR-13 |
| Package refuses to start on a non-local address without HTTPS | Stops personal data and admin passwords travelling unencrypted | NFR-18 (start-up refusal only) |
| Admin session timers (30 minutes idle, 8 hours maximum) | Limits damage from an unattended admin browser | NFR-20 |
| Upload type, size and storage limits | Stops malicious or oversized uploads filling the server | NFR-23 |
| Deny by default authorisation with record level checks | Standard access control for a portal holding personal data | NFR-25 |
| Secret handling, error hiding and dependency audit | Standard security hygiene | NFR-26 |
| Licence allow-list and a test suite run with outgoing network blocked | Proves the zero running cost rule rather than assuming it | NFR-31 (licence and blocked network test only) |
| Single configuration file, health check and install in at most 10 commands | Makes self hosting by the client practical | NFR-32 |

Added by the Orchestrator on 2026-10-15 after the requirements gate review (finding M1): the rows from "No prices" onward were sourced "Analyst" in `docs/requirements.md` but were missing from this table.

Added after T1 (P2-T2) from the approved legal and security reviews. These come from `docs/legal-register.md` and `docs/threat-model.md`, which Steven approved at T1, so they are not optional; they are listed so each can be traced to its source.

| Addition | Source | Requirements |
| --- | --- | --- |
| Enquiry form without a consent tick, with a privacy information line and a Data protection complaint subject; acknowledge by date in the admin portal | LR-2, LR-5 | FR-14, FR-19, FR-20, FR-42, NFR-14, NFR-16 |
| Newsletter consent text names the controller | LR-3 | FR-22 |
| Fuller privacy notice content, Information Commission name, backups statement | LR-4, LR-8 | FR-14, NFR-17 |
| Extra retention rows (request records, photo originals, sessions, CSV exports, security events) | LR-8 | Retention schedule, FR-45 |
| Draft record of processing activities in the package | LR-12 | FR-47 |
| Public form tokens carried in the form with no cookie | LR-21, G-9 | NFR-15, NFR-22, FR-15 |
| Offers carry no deadline or scarcity wording and a Sample offer label | LR-29, OQ-19 | FR-7 |
| "Who runs this site" section and provider settings | LR-32 | FR-16, FR-39 |
| Licence register and authorship statement cover every 3D input; third party notices file | LR-39, LR-40 | FR-18, FR-31, NFR-31 |
| First Administrator by server command or single use setup code | G-1 | FR-47 |
| Security event record | G-2 | NFR-34 |
| Automatic daily backup; safe archive permissions and restore | G-3, G-15 | FR-48 |
| Safer CSV export quoting | G-4 | FR-43 |
| URL, telephone and email setting validation | G-5 | FR-39 |
| Fixed concept sentence | G-6, OQ-5 | FR-17 |
| Sanitiser on save, hidden character rejection, headers on every response | G-7, G-8 | NFR-24 |
| Spam trap and minimum time on newsletter forms; response time equalisation; address normalisation | G-9, G-11, G-12 | FR-22, FR-23, FR-43, FR-44 |
| Rate limits are part of the first release; trusted proxy rule | G-10, G-20 | NFR-21 |
| Resource limits | G-13 | NFR-35 |
| Image header check and isolated decoding | G-14 | NFR-23 |
| TLS and credential handling for any future email | G-16 | FR-21 |
| Configuration permissions and per-install signing keys | G-17 | NFR-32 |
| Software bill of materials, install scripts, glTF validation | G-18 | NFR-26 |
| Sessions end on password change or account change | G-19 | NFR-20 |
| Lockout unlock command | G-21 | FR-34 |
| Start-up refusal unless HTTPS and two-step verification | G-22 | NFR-18 |
| Previous sign in shown after sign in | G-23 | FR-32 |
| Client design verdict at T2 and T3 | M3 | NFR-36 |

## Dependencies

- **DEP-1 Answers to open items.** OQ-1 to OQ-19 were settled at T1, and OQ-20 (seventh room type: no) and OQ-21 (booking engine address: keep the default) were answered by Steven later on 2026-10-15. Still open: OQ-12 (controller name, solicitor Q3 and lawful basis for the contact form Q7), and four Phase 4 decisions for Steven at T2: OQ-22 (suppression at sign up), OQ-23 (Russian search), OQ-24 (concept notice size) and OQ-25 (4.5 s first frame). The solicitor's questions Q1 to Q7 (`docs/legal/questions-2026-10-15.md`) must all be answered before any hosting (OQ-13). The provisional criteria are re-checked once the questions are answered.
- **DEP-2 UK legal review.** Phase 3 produced `docs/legal-register.md` (research, not legal advice). Rows needing a qualified lawyer, and the solicitor's answers, are still pending and gate any hosting. The UK legal role provides research support only.
- **DEP-3 Brand extraction (Phase 4).** The UI/UX Designer extracts the brand from the current site (colours, fonts, tone); the brief says fonts and the full palette were not visible. NFR-30 cannot be fully checked until this is done.
- **DEP-4 Architecture decisions (Phase 4).** The System Architect chooses the stack, data storage, authentication approach, 3D library, language handling and testing approach, and confirms or adjusts the budgets in A-12. Requirements avoid naming technology.
- **DEP-5 Client server facts (OQ-14).** The hosting questionnaire (due after release) would normally say what the server offers. Architecture in Phase 4 needs the facts earlier or must stay within A-19.
- **DEP-6 Test devices and tools.** Physical R1 and R2 phones, NVDA on Windows (free), VoiceOver on an iPhone, and the free tools axe-core and Lighthouse are needed for NFR-1, NFR-3, NFR-6 and NFR-8. Without physical phones the frame rate and screen reader checks use the executable alternatives in A-27 and the results are labelled "emulated".
- **DEP-7 3D authoring.** The agency creates 3D models itself (brief). A free authoring tool (for example Blender) and a free export and compression toolchain are assumed; every tool and library must meet NFR-31.
- **DEP-8 Placeholder imagery.** Royalty-free or generated images with licences recorded in the licence register (FR-18). Photos and 3D scenes must show a Red Sea resort convincingly without copying jazhotels.com.
- **DEP-9 Access to the current resort page at test time.** AC-21.4 uses a list of hashes made from the current page text. The package ships a dated list generated before release (FR-18); the live page is a second, optional source at test time, and if it is unreachable that comparison is skipped and reported with the date of the shipped list.
- **DEP-10 Client mail server (not needed).** Not needed in this release (OQ-2). Needed only if FR-21 or a confirmation email is ever reinstated: SMTP host, port, account and a sending address.

## Risks

Likelihood and impact are High, Medium or Low. "Owner" is the role best placed to act.

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- | --- |
| RSK-1 | Trade mark, passing off and copyright claims from using the JAZ name, brand style and a link to the live booking engine on an unauthorised concept | Medium | High | Concept marking on every page (FR-17), placeholder content only (FR-18), noindex (NFR-27), local review only (FR-47), no logo or badge copied; legal review in Phase 3 (OQ-13, OQ-15, OQ-17) | UK legal role, Steven |
| RSK-2 | A real visitor sends a real enquiry to the concept and expects a reply, or a real person subscribes | Low (local review only) to High (if ever hosted) | Medium | Synthetic contact details (OQ-16); clear concept notice; no public hosting without clearance (OQ-13) | Steven |
| RSK-3 | The immersive 3D hero and scenes cannot meet the performance budgets on mid range phones, and Lighthouse (which runs 3D in software) scores lower than the budget | High | High | Poster first, 3D code and assets loaded only after text and poster render (NFR-7), asset caps, adaptive quality and automatic fallback (NFR-8, NFR-12); early performance spikes in Phase 4; budgets re-baselined with the Performance Engineer (A-12) | Motion Designer, Performance Engineer |
| RSK-4 | "Edit everything including all elements" expands into a page-layout or 3D editor, multiplying cost | Medium | High | Scope fixed to content within fixed templates until OQ-4 is answered; changes handled through scope change | Product Owner |
| RSK-5 | The zero running cost rule removes standard tools: no hosted email, no CAPTCHA, no CDN, no managed database, no managed backups, no monitoring service | High | Medium | Features degrade by design: admin-only enquiry reading, honeypot and rate limits instead of CAPTCHA, local backups, single-server performance targets (NFR-10, NFR-31); bot protection will be weaker than with a paid service | System Architect |
| RSK-6 | The client's server turns out to lack a needed capability (runtime, storage, mail, TLS) and the architecture must be redone | Medium | High | Ask for server facts before Phase 4 completes (OQ-14); keep the stack minimal and portable | System Architect, Steven |
| RSK-7 | Personal data rules are unclear: controller undefined for a speculative concept, Egyptian data protection law may apply, data stored outside the UK | Medium | Medium | Placeholder controller until OQ-12 is answered; UK legal role flags in Phase 3; data minimisation (NFR-14) | UK legal role |
| RSK-8 | Machine-assisted German, Italian and Russian text, especially the legal pages, is wrong or awkward | High | Medium | Mark as unreviewed in the content register (FR-16); no use beyond local review without review (OQ-8) | Steven |
| RSK-9 | Page transitions, loaders and scroll-driven scenes break keyboard focus, screen reader flow or the browser back button | Medium | High | Explicit requirements for focus, announcements and history (FR-29, NFR-2, NFR-3); screen reader testing on real tools (US-48) | Motion Designer, Accessibility Specialist |
| RSK-10 | Safari does not store `Secure` cookies on plain `http://localhost`, so admin sign in may fail in local review on Safari | Medium | Medium | Architect to choose a localhost-safe cookie setup that still meets NFR-20 when served over HTTPS; test on Safari early | System Architect |
| RSK-11 | The unsubscribe page lets anyone unsubscribe any address without proof of ownership (no email can be sent to prove it) | Medium | Low | Same result message whether or not subscribed (FR-23); rate limit (NFR-21); accepted harm is low; OQ-11 | Steven |
| RSK-12 | Rate limiting by client address blocks many guests behind one shared address (resort Wi-Fi, mobile carrier) or is bypassed behind a proxy | Medium | Low | Limits set generously for forms (5 per hour is for one address); trusted proxy header handling documented in the hosting guide | Developer |
| RSK-13 | Image decoders used for uploads and resizing contain vulnerabilities; no antivirus scanning is available at zero cost | Low | High | Content-type checking, re-encoding of every image, strict size limits (NFR-23), dependency audit (NFR-26), keep libraries current | Security Engineer |
| RSK-14 | Retention periods are not agreed, or are set too long | Medium | Medium | Periods are configuration (FR-45); OQ-10 and legal review | UK legal role |
| RSK-15 | Backups are kept on the same server and are lost with it; backup archives also contain personal data | Medium | Medium | Hosting guide tells the client to copy archives off the server and protect them; 35-day expiry (NFR-17) | DevOps Engineer |
| RSK-16 | The scope is very large (84 URLs, four languages, several 3D scenes, a full admin portal) for a speculative concept with a fixed token budget | High | High | Product Owner defines an MVP and phases (the Product Owner task in P2-T1); requirements are written so any subset can be traced and tested | Product Owner |
| RSK-17 | A strict content security policy (no inline scripts, no eval) conflicts with some 3D or animation libraries and decoders | Medium | Medium | Architect to select libraries compatible with NFR-24; `wasm-unsafe-eval` is allowed only if a WebAssembly decoder is used | System Architect |
| RSK-18 | Invented placeholder facts about a real resort mislead readers into thinking they are true | Medium | Medium | Concept marking, qualitative copy only, no prices, awards or ratings (FR-18, OQ-19) | Steven, UK legal role |
| RSK-19 | The Lighthouse SEO category will fail by design (noindex); tools that report an SEO score as a defect will raise false alarms | High | Low | Excluded from the budgets in NFR-6; QA records the exclusion in the test plan | QA Tester |
| RSK-20 | Agency-made 3D models are expensive in time and hard to make look premium within 3 MB per scene | Medium | Medium | Stylised low-polygon art direction and baked lighting; budgets confirmed early (A-12); fallback posters carry the look if 3D underperforms | Motion Designer |

Status of risks after T1 (2026-10-15):

- RSK-2: lower; OQ-16 settled as synthetic contact details and OQ-13 as local review only.
- RSK-4: lower; OQ-4 fixed the edit scope to content within fixed page designs (EXC-15).
- RSK-5: unchanged; the loss of email is now certain (OQ-2) and form abuse relies on the trap, the signed token and rate limits, which are Must (NFR-21).
- RSK-8: unchanged; the content register covers all four legal pages (FR-16).
- RSK-11: unchanged; the response time and address normalisation rules (G-11, G-12) remove two side channels.
- RSK-12: lower; the trusted proxy rule is now a requirement (NFR-21, G-20).
- RSK-16: addressed by the MVP in `docs/mvp.md`; NFR-34, NFR-35 and US-46 and US-66 as Must add work.
- Security risks from RSK-21 are in `docs/risk-register.md`.
- Amendment risk (no RSK ID, to avoid clashing with the project risk register): an interpretation in the amended requirements is wrong because it needed a judgement (A-27 to A-38). Mitigation: each is listed with who confirms it; none changes a T1 decision.

## Exclusions

These are explicitly not built. Several are Steven's decisions or the brief's "Out" list; the rest are analyst boundaries that keep the scope testable.

- **EXC-1** Booking engine, room availability, rates, prices and online payment (D4, brief Out). "Book now" only links out.
- **EXC-2** JAZ group-level content: About JAZ, Destinations, Our Brands, Cruises, Gift Cards, Blogs, mobile app pages (brief Out, A-7).
- **EXC-3** Guest user accounts, loyalty or member login. Only staff sign in (brief Out).
- **EXC-4** Deployment and hosting by the agency. The agency packages the site; Steven or the client hosts it (brief Out). Local review only (D2).
- **EXC-5** Currency selector (brief Unknown, out at T1 via OQ-18).
- **EXC-6** Meetings and events pages (brief Unknown, out at T1 via OQ-18).
- **EXC-7** Analytics, advertising, tracking, social media widgets, embedded video and embedded maps (D6, brief Integrations).
- **EXC-8** Live chat and chatbots. WhatsApp is only a click-to-chat link (FR-12).
- **EXC-9** Replying to enquiries from inside the admin portal (A-16).
- **EXC-10** Composing or sending newsletters from the site (A-17, OQ-11).
- **EXC-11** Displaying guest reviews, ratings, awards, certifications or Tripadvisor widgets (FR-18, OQ-17).
- **EXC-12** Search engine optimisation. The concept is deliberately noindex (D2, NFR-27): no sitemap, no structured data, no indexing aids.
- **EXC-13** Native mobile apps, offline mode and installable web app features.
- **EXC-14** An admin portal interface in languages other than English (A-4).
- **EXC-15** Admin editing of page layout, creation or deletion of whole pages, navigation structure, colours, fonts and 3D scene settings (OQ-4, settled at T1). This narrows Steven's decision D3 "edit everything"; see A-38 and gate finding M2. Navigation and button labels remain editable text.
- **EXC-16** Legal advice. The legal pages are placeholder text for the concept, and the UK legal role provides research support only.
- **EXC-17** Real resort contact details, real social media accounts and real photos or text of the resort (D2, OQ-16).
- **EXC-18** Right-to-left languages and languages other than the four named.
- **EXC-19** Video upload and video content; uploads are photos only (NFR-23).
- **EXC-20** Visitor-generated content such as comments, reviews or photo uploads.
- **EXC-21** Third-party penetration testing. Security review is done inside the agency lifecycle (Phase 7).
- **EXC-22** A site search page or search box (A-30).
- **EXC-23** Draft, preview, publish step and version history of content (OQ-6; US-36 is Won't).
- **EXC-24** Any email sent by the site, including enquiry notifications, confirmation emails and password reset links (OQ-2; US-14 is Won't).
- **EXC-25** Two-step verification in the first release (US-31 is Won't, accepted at T1 for local review under the condition in NFR-18).
- **EXC-26** Separate Editor and Administrator roles in the first release (OQ-1).
- **EXC-27** Adding or deleting a room type from the admin portal (A-32, OQ-20).
