# Assumptions, dependencies, risks and exclusions: Jazz Casa del Mar resort website

- Task: P2-T1a (Requirements Analyst)
- Sources: `docs/brief.md`, `docs/requirements.md`
- IDs: assumptions are A-n, dependencies are DEP-n, risks are RSK-n, exclusions are EXC-n. Open questions are OQ-n and live in `docs/requirements.md`. Steven's decisions are D1 to D7 as numbered in the brief's section "Decisions from Steven (2026-10-15)".
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

## Assumptions

### Carried over from the brief (marked as assumptions there)

- **A-1 Audience.** International leisure travellers (couples and families), mostly on mobile, plus travel agents and returning guests. Confirm: Steven.
- **A-2 Primary action.** Sending an enquiry through the Contact Us form is the primary visitor action; newsletter sign-up and the Book now link are secondary. Confirm: Steven.
- **A-3 Admin team size.** Fewer than 10 admin accounts (OQ-1). Confirm: Steven.
- **A-4 Admin interface language.** The admin portal screens are in English only (FR-32), while the content it edits is in four languages. Confirm: Steven.
- **A-5 Email.** Any email the site sends goes through the client's own mail server (OQ-2, OQ-14). Confirm: Steven.
- **A-6 Children.** The site is not directed at children, although it mentions a kids' club; no age data is collected (NFR-14). Confirm: UK legal role.
- **A-7 Currency selector and group content.** The currency selector is out because no prices are shown (OQ-18); JAZ group content (About JAZ, Destinations, Brands, Cruises, Gift Cards, Blogs, mobile app pages) is out and is not linked except through Book now. Confirm: Steven.
- **A-8 Map.** The Location page uses a static map image and a Google Maps link, not live map tiles, to avoid cost and third-party requests (FR-6). Confirm: Steven.
- **A-9 No analytics.** No analytics or tracking of any kind (NFR-15). Because of this, no cookie consent banner is shown on the public site; the cookie control in NFR-15 applies only if a non-essential item is ever added. Confirm: Steven and UK legal role.
- **A-10 Landing pages.** "Landing pages" means the section overview pages (OQ-9). Confirm: Steven.

### Chosen by the analyst

- **A-11 Reference devices and lab profile.** The brief names no devices and says only "mid range phones". The analyst defined R1 (mid range Android, 2022 to 2024 class, named example Samsung Galaxy A54 5G), R2 (iPhone 12 class or later) and lab profile L1 (Lighthouse mobile preset, simulated slow 4G, 4 times CPU slowdown). Confirm: Performance Engineer and System Architect in Phase 4. Physical R1 and R2 devices may not be available; in that case budgets are measured on L1 only (DEP-6).
- **A-12 Performance and 3D budgets.** All numbers in NFR-6 to NFR-10 (Largest Contentful Paint 2.5 s, 50 frames per second, 3 MB hero assets, and so on) are the analyst's proposals based on common web-performance practice, not figures from the client. The Performance Engineer and System Architect may propose changes before the T2 design touchpoint; any change is recorded as a change to the requirement. Confirm: Performance Engineer.
- **A-13 Browser matrix.** The matrix in NFR-29 is the analyst's reading of "current evergreen browsers" in the brief. Safari 16.4 is the floor because it is the first Safari version with WebGL 2. Confirm: System Architect.
- **A-14 Content volumes.** Minimum counts (for example 12 gallery images, 8 FAQ questions, 3 offers, 5 attractions, descriptions of 25 or 60 words, 3 images per room) are the analyst's choice so that placeholder content is checkable. The brief gives only the lists of rooms, venues, pools and activities. Confirm: Steven (low impact).
- **A-15 Page structure.** Only the six room types have their own page. Dining venues, pools and beach items, and activities appear as items on their section page, each with an anchor (FR-3, FR-4). The brief said "overview plus venues" for dining and did not say whether venues need their own pages. Confirm: UI/UX Designer, Steven.
- **A-16 Enquiries are answered outside the site.** Staff reply from their own email or telephone; the admin portal reads enquiries but does not send replies (EXC-9). Confirm: Steven.
- **A-17 Newsletters are sent outside the site.** The client exports subscribers (FR-43) and uses their own tool to send newsletters (OQ-11). Confirm: Steven.
- **A-18 Language in the address, no cookie.** The chosen language is carried by the web address, and the default language is chosen per request from the browser's language list without a cookie, so the public site needs no cookie (FR-25, NFR-15). Confirm: System Architect.
- **A-19 Server.** A single small Linux server (1 CPU, 1 GB memory, 10 GB disk), no database server, TLS provided in front of the site, as the working answer to OQ-14. Confirm: Steven (hosting questionnaire), System Architect.
- **A-20 Translation.** German, Italian and Russian placeholder copy is machine-assisted and unreviewed (OQ-8). Confirm: Steven.
- **A-21 Retention.** The Retention schedule in `docs/requirements.md` is a proposal (OQ-10). Confirm: UK legal role, Steven.
- **A-22 Robots rules.** Search engines can only obey `noindex` if they are allowed to fetch the page; so the analyst assumes the site will not use a `Disallow: /` rule in `robots.txt` (the `noindex` header and meta tag in NFR-27 do the work). With local review only, no crawler can reach the site in any case. Confirm: System Architect, UK legal role.
- **A-23 Pause choice storage.** The pause-motion choice (FR-30) is stored only in session storage because the visitor asked for it, and is treated as a user-requested item that does not need consent under PECR. Confirm: UK legal role.
- **A-24 Success measures.** Client review of the release plus the budgets in NFR-1 and NFR-6 to NFR-8 are the measures of success (brief Success measures). Confirm: Steven.
- **A-25 Time and dates.** No dates are computed or displayed by the site except free-text validity wording on offers and the date last reviewed on the Accessibility statement, so locale date formatting is not a requirement. Confirm: UI/UX Designer.
- **A-26 No deadlines.** The brief says "No Deadlines"; no date constraints are placed on requirements. Confirm: Product Owner.

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
| Draft, preview, publish and version history | Safety for an "edit everything" portal (provisional) | FR-38 |
| Backup and restore command | A site with no paid backup service needs its own | FR-48, NFR-17 |
| Image resizing and metadata removal on upload | Keeps performance budgets when staff upload large photos; removes location data from photos | FR-41 |
| Rate limits, anti-forgery tokens, security headers | Standard security controls | NFR-21, NFR-22, NFR-24 |
| Optimistic locking of content saves | Two editors must not silently overwrite each other | NFR-33 |

## Dependencies

- **DEP-1 Answers to open questions.** The 19 open questions in `docs/requirements.md` need Steven's answers (some with the UK legal role). Provisional criteria are re-checked once answered. Needed by the T1 scope touchpoint where possible; OQ-4, OQ-5, OQ-12, OQ-14 and OQ-17 affect design and architecture most.
- **DEP-2 UK legal review (Phase 3).** The retention schedule, lawful bases, controller identity, use of the JAZ name, the Book now link, translated legal text and cookie treatment are all pending the UK legal role's research. The UK legal role provides research support and not legal advice.
- **DEP-3 Brand extraction (Phase 4).** The UI/UX Designer extracts the brand from the current site (colours, fonts, tone); the brief says fonts and the full palette were not visible. NFR-30 cannot be fully checked until this is done.
- **DEP-4 Architecture decisions (Phase 4).** The System Architect chooses the stack, data storage, authentication approach, 3D library, language handling and testing approach, and confirms or adjusts the budgets in A-12. Requirements avoid naming technology.
- **DEP-5 Client server facts (OQ-14).** The hosting questionnaire (due after release) would normally say what the server offers. Architecture in Phase 4 needs the facts earlier or must stay within A-19.
- **DEP-6 Test devices and tools.** Physical R1 and R2 phones, NVDA on Windows (free), VoiceOver on an iPhone, and the free tools axe-core and Lighthouse are needed for NFR-1, NFR-3, NFR-6 and NFR-8. Without physical phones only L1 results exist and the 50 frames per second check cannot be made on a real device.
- **DEP-7 3D authoring.** The agency creates 3D models itself (brief). A free authoring tool (for example Blender) and a free export and compression toolchain are assumed; every tool and library must meet NFR-31.
- **DEP-8 Placeholder imagery.** Royalty-free or generated images with licences recorded in the licence register (FR-18). Photos and 3D scenes must show a Red Sea resort convincingly without copying jazhotels.com.
- **DEP-9 Access to the current resort page at test time.** AC-21.4 compares text with the live page; this needs the page to be reachable when tested.
- **DEP-10 Client mail server (only if OQ-2 or OQ-11 is yes).** SMTP host, port, account and a sending address for FR-21 and any confirmation email.

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

## Exclusions

These are explicitly not built. Several are Steven's decisions or the brief's "Out" list; the rest are analyst boundaries that keep the scope testable.

- **EXC-1** Booking engine, room availability, rates, prices and online payment (D4, brief Out). "Book now" only links out.
- **EXC-2** JAZ group-level content: About JAZ, Destinations, Our Brands, Cruises, Gift Cards, Blogs, mobile app pages (brief Out, A-7).
- **EXC-3** Guest user accounts, loyalty or member login. Only staff sign in (brief Out).
- **EXC-4** Deployment and hosting by the agency. The agency packages the site; Steven or the client hosts it (brief Out). Local review only (D2).
- **EXC-5** Currency selector (brief Unknown, assumed out, OQ-18).
- **EXC-6** Meetings and events pages (brief Unknown, assumed out, OQ-18).
- **EXC-7** Analytics, advertising, tracking, social media widgets, embedded video and embedded maps (D6, brief Integrations).
- **EXC-8** Live chat and chatbots. WhatsApp is only a click-to-chat link (FR-12).
- **EXC-9** Replying to enquiries from inside the admin portal (A-16).
- **EXC-10** Composing or sending newsletters from the site (A-17, OQ-11).
- **EXC-11** Displaying guest reviews, ratings, awards, certifications or Tripadvisor widgets (FR-18, OQ-17).
- **EXC-12** Search engine optimisation. The concept is deliberately noindex (D2, NFR-27): no sitemap, no structured data, no indexing aids.
- **EXC-13** Native mobile apps, offline mode and installable web app features.
- **EXC-14** An admin portal interface in languages other than English (A-4).
- **EXC-15** Admin editing of page layout, creation or deletion of whole pages, navigation structure, colours, fonts and 3D scene parameters, until OQ-4 is answered.
- **EXC-16** Legal advice. The legal pages are placeholder text for the concept, and the UK legal role provides research support only.
- **EXC-17** Real resort contact details, real social media accounts and real photos or text of the resort (D2, OQ-16).
- **EXC-18** Right-to-left languages and languages other than the four named.
- **EXC-19** Video upload and video content; uploads are photos only (NFR-23).
- **EXC-20** Visitor-generated content such as comments, reviews or photo uploads.
- **EXC-21** Third-party penetration testing. Security review is done inside the agency lifecycle (Phase 7).
