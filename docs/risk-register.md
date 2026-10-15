# Risk register: Jazz Casa del Mar resort website

- Client slug: jazz_casa_del_mar
- Project slug: site
- Task: P3-T2 (Security Engineer), created 2026-10-15
- This is the **single project risk register**. Every role adds risks here; nobody keeps a separate list. `docs/assumptions.md` (RSK-1 to RSK-20) remains the record of how those risks were first raised; from now on their status and mitigation are maintained here.
- Sources: `docs/assumptions.md` (RSK-1 to RSK-20, source "assumptions.md"), `docs/threat-model.md` (RSK-21 onward, source threats TM-n and requirement gaps G-n).

## How to read this register

- Likelihood and impact: High, Medium or Low.
- Rating, from likelihood and impact: High and High, High and Medium, or Medium and High give **High**; High and Low, Medium and Medium, or Low and High give **Medium**; Medium and Low, Low and Medium, or Low and Low give **Low**. This is the same matrix as section 6 of `docs/threat-model.md`.
- Ratings for RSK-21 onward are inherent (before the planned mitigations). The residual view for those risks is in the threat model.
- Categories: security, privacy, legal, delivery, performance, scope.
- Status: open, mitigating, accepted (needs Steven's decision in chat), closed. Every risk starts open.
- Owner: the role best placed to act. Steven is named where only he can decide.
- Where the Security Engineer added a cross reference to a seeded risk, it is marked "Added in P3-T2"; the original wording is unchanged.

## Summary

| Rating | Count |
| --- | --- |
| High | 20 |
| Medium | 22 |
| Low | 4 |

Counts include RSK-39 to RSK-46 added from the UK legal review; RSK-41 is counted at its local review rating (Medium).
| Total | 38 |

RSK-2 is counted as Low (local review release). Seeded risks: 8 High, 9 Medium, 3 Low. Security risks from the threat model: 10 High, 7 Medium, 1 Low.

Top five, ranked by rating, then impact, then likelihood; ties among the many Medium likelihood and High impact risks are broken by the Security Engineer's judgement of consequence and how soon the risk can bite:

1. RSK-3 3D budgets on mid range phones (High, High and High)
2. RSK-16 Scope too large for the budget (High, High and High)
3. RSK-21 Admin account takeover with no second factor (High; High if hosted)
4. RSK-22 Stored cross site scripting through four language "edit everything" content (High)
5. RSK-1 Trade mark, passing off and copyright claims (High)

Watch also RSK-25 (form spam and list poisoning): it has the highest likelihood of any security risk and is the first to occur if the site is ever hosted.

## Register

### Seeded from `docs/assumptions.md` (RSK-1 to RSK-20)

| ID | Risk | Category | Likelihood | Impact | Rating | Owner | Mitigation | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RSK-1 | Trade mark, passing off and copyright claims from using the JAZ name, brand style and a link to the live booking engine on an unauthorised concept | legal | Medium | High | High | UK legal role, Steven | Concept marking on every page (FR-17), placeholder content only (FR-18), noindex (NFR-27), local review only (FR-47), no logo or badge copied; legal review in Phase 3 (OQ-13, OQ-15, OQ-17). Added in P3-T2: protect the concept notice from being emptied or rewritten (threat model G-6, see RSK-35) | open | assumptions.md |
| RSK-2 | A real visitor sends a real enquiry to the concept and expects a reply, or a real person subscribes | privacy | Low (local review only); High if ever hosted | Medium | Low (local); High if hosted | Steven | Synthetic contact details (OQ-16); clear concept notice; no public hosting without clearance (OQ-13) | open | assumptions.md |
| RSK-3 | The immersive 3D hero and scenes cannot meet the performance budgets on mid range phones, and Lighthouse (which runs 3D in software) scores lower than the budget | performance | High | High | High | Motion Designer, Performance Engineer | Poster first, 3D code and assets loaded only after text and poster render (NFR-7), asset caps, adaptive quality and automatic fallback (NFR-8, NFR-12); early performance spikes in Phase 4; budgets re-baselined with the Performance Engineer (A-12) | open | assumptions.md |
| RSK-4 | "Edit everything including all elements" expands into a page layout or 3D editor, multiplying cost | scope | Medium | High | High | Product Owner | Scope fixed to content within fixed templates until OQ-4 is answered; changes handled through scope change. Added in P3-T2: a layout or 3D parameter editor would also widen the XSS and integrity surface (RSK-22), so any change needs a threat model update | open | assumptions.md |
| RSK-5 | The zero running cost rule removes standard tools: no hosted email, no CAPTCHA, no CDN, no managed database, no managed backups, no monitoring service | delivery | High | Medium | High | System Architect | Features degrade by design: admin only enquiry reading, honeypot and rate limits instead of CAPTCHA, local backups, single server performance targets (NFR-10, NFR-31); bot protection will be weaker than with a paid service. Added in P3-T2: see RSK-25, RSK-31, RSK-33 | open | assumptions.md |
| RSK-6 | The client's server turns out to lack a needed capability (runtime, storage, mail, TLS) and the architecture must be redone | delivery | Medium | High | High | System Architect, Steven | Ask for server facts before Phase 4 completes (OQ-14); keep the stack minimal and portable | open | assumptions.md |
| RSK-7 | Personal data rules are unclear: controller undefined for a speculative concept, Egyptian data protection law may apply, data stored outside the UK | privacy | Medium | Medium | Medium | UK legal role | Placeholder controller until OQ-12 is answered; UK legal role flags in Phase 3; data minimisation (NFR-14) | open | assumptions.md |
| RSK-8 | Machine assisted German, Italian and Russian text, especially the legal pages, is wrong or awkward | legal | High | Medium | High | Steven | Mark as unreviewed in the content register (FR-16); no use beyond local review without review (OQ-8) | open | assumptions.md |
| RSK-9 | Page transitions, loaders and scroll driven scenes break keyboard focus, screen reader flow or the browser back button | delivery | Medium | High | High | Motion Designer, Accessibility Specialist | Explicit requirements for focus, announcements and history (FR-29, NFR-2, NFR-3); screen reader testing on real tools (US-48) | open | assumptions.md |
| RSK-10 | Safari does not store `Secure` cookies on plain `http://localhost`, so admin sign in may fail in local review on Safari | delivery | Medium | Medium | Medium | System Architect | Architect to choose a localhost safe cookie setup that still meets NFR-20 when served over HTTPS; test on Safari early. Added in P3-T2: the workaround must not drop `Secure` on any non local address (threat model TM-22) | open | assumptions.md |
| RSK-11 | The unsubscribe page lets anyone unsubscribe any address without proof of ownership (no email can be sent to prove it) | security | Medium | Low | Low | Steven | Same result message whether or not subscribed (FR-23); rate limit (NFR-21); accepted harm is low; OQ-11. Added in P3-T2: same timing (G-11) and spam trap (G-9), see RSK-27 | open | assumptions.md |
| RSK-12 | Rate limiting by client address blocks many guests behind one shared address (resort Wi-Fi, mobile carrier) or is bypassed behind a proxy | security | Medium | Low | Low | Developer | Limits set generously for forms (5 per hour is for one address); trusted proxy header handling documented in the hosting guide. Added in P3-T2: trust forwarding headers only from a configured proxy (threat model G-20, TM-65) | open | assumptions.md |
| RSK-13 | Image decoders used for uploads and resizing contain vulnerabilities; no antivirus scanning is available at zero cost | security | Low | High | Medium | Security Engineer | Content type checking, re-encoding of every image, strict size limits (NFR-23), dependency audit (NFR-26), keep libraries current. Added in P3-T2: decode in an isolated worker with limits (G-14), see RSK-23 | open | assumptions.md |
| RSK-14 | Retention periods are not agreed, or are set too long | privacy | Medium | Medium | Medium | UK legal role | Periods are configuration (FR-45); OQ-10 and legal review | open | assumptions.md |
| RSK-15 | Backups are kept on the same server and are lost with it; backup archives also contain personal data | privacy | Medium | Medium | Medium | DevOps Engineer | Hosting guide tells the client to copy archives off the server and protect them; 35 day expiry (NFR-17). Added in P3-T2: see RSK-29 for exposure of archives | open | assumptions.md |
| RSK-16 | The scope is very large (84 URLs, four languages, several 3D scenes, a full admin portal) for a speculative concept with a fixed token budget | delivery | High | High | High | Product Owner | Product Owner defines an MVP and phases; requirements are written so any subset can be traced and tested | open | assumptions.md |
| RSK-17 | A strict content security policy (no inline scripts, no eval) conflicts with some 3D or animation libraries and decoders | security | Medium | Medium | Medium | System Architect | Architect to select libraries compatible with NFR-24; `wasm-unsafe-eval` is allowed only if a WebAssembly decoder is used. Added in P3-T2: threat model TM-56 and section 9 | open | assumptions.md |
| RSK-18 | Invented placeholder facts about a real resort mislead readers into thinking they are true | legal | Medium | Medium | Medium | Steven, UK legal role | Concept marking, qualitative copy only, no prices, awards or ratings (FR-18, OQ-19) | open | assumptions.md |
| RSK-19 | The Lighthouse SEO category will fail by design (noindex); tools that report an SEO score as a defect will raise false alarms | delivery | High | Low | Medium | QA Tester | Excluded from the budgets in NFR-6; QA records the exclusion in the test plan | open | assumptions.md |
| RSK-20 | Agency made 3D models are expensive in time and hard to make look premium within 3 MB per scene | delivery | Medium | Medium | Medium | Motion Designer | Stylised low polygon art direction and baked lighting; budgets confirmed early (A-12); fallback posters carry the look if 3D underperforms | open | assumptions.md |

Note on RSK-2: the source gives a likelihood range. The register rates it Low for the local review release and High if the concept is ever hosted; it must be re-rated if OQ-13 changes.

### Security risks from the threat model (RSK-21 onward)

| ID | Risk | Category | Likelihood | Impact | Rating | Owner | Mitigation | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RSK-21 | Admin account takeover by credential stuffing, phishing or a reused password, with no second factor because two step verification (US-31, FR-33) is Won't this release; a takeover gives control of all content and all personal data | security | Medium | High | High (Low in local review) | Security Engineer, Steven | NFR-19 (password policy, breached list, lockout, Argon2id), NFR-20 (sessions), FR-32 (generic errors); promote rate limiting to Must (G-10); show previous sign in and failures (G-23); unlock command (G-21); refuse a non local address unless FR-33 is built (G-22). Steven to accept the deferral explicitly for local review | open | threat-model.md TM-20, TM-21, TM-24 |
| RSK-22 | Stored cross site scripting through "edit everything" rich text and plain text fields in four languages (sanitiser bypass, scheme tricks, attribute or script contexts, data passed to 3D scenes), or through visitor input shown to staff | security | Medium | High | High | Developer, Security Engineer | FR-35 (limited formatting), NFR-24 (allow list sanitiser, context encoding, strict CSP); sanitise every language value on save and encode on render (G-7); headers on every response, admin included (G-8); architecture to pass content to scenes as data, not inline script | open | threat-model.md TM-09, TM-30, TM-31, TM-32 |
| RSK-23 | Malicious or oversized photo upload runs code, exploits a decoder, writes outside the media folder or exhausts memory on the 1 GB server | security | Low | High | Medium | Developer | NFR-23 (content based type check, raster only, no SVG, random names, no execution, limits), FR-41 (re-encode, strip metadata); check dimensions before decode and isolate decoding with time and memory limits (G-14); one processing job at a time (G-13) | open | threat-model.md TM-39 to TM-43; relates to RSK-13 |
| RSK-24 | CSV formula injection: a subscriber address such as `=HYPERLINK(...)@example.com` runs as a formula when staff open the export (data exfiltration or command execution on the staff machine) | security | Medium | High | High | Developer | FR-43 and AC-41.3 (escape `=`, `+`, `-`, `@`); extend to tab and carriage return, quote every cell, define the escape method (G-4) | open | threat-model.md TM-16, TM-47 |
| RSK-25 | Form spam and newsletter list poisoning without a third party captcha (D6): floods fill storage, bury real enquiries and add addresses without the owner's consent | security | High | Medium | High | Developer, Product Owner | FR-20 (spam trap, 2 second minimum); extend both to newsletter sign up and unsubscribe using a signed form token (G-9); promote rate limiting US-66 to Must (G-10); cap stored records (G-13); double opt in if OQ-11 or OQ-2 allows | open | threat-model.md TM-08, TM-14, TM-18; relates to RSK-5 |
| RSK-26 | Cross site request forgery against public forms or admin actions | security | Low | Medium | Low | Developer | NFR-22 (tokens, `Origin` check, no GET for changes), NFR-20 (`SameSite=Strict`); signed form token for the cookie free public site (G-9) | open | threat-model.md TM-10, TM-27 |
| RSK-27 | Subscriber enumeration through sign up or unsubscribe responses or timing, and unsubscribes that silently fail because addresses are compared with different case or spaces (PECR exposure) | privacy | Medium | Medium | Medium | Developer | FR-22, FR-23 (same message); same timing (G-11); normalised address comparison everywhere (G-12) | open | threat-model.md TM-15, TM-17, TM-19; relates to RSK-11 |
| RSK-28 | Supply chain compromise of 3D, WebGL, animation or build dependencies, WebAssembly decoders or the 3D toolchain injects code into every visitor's browser or the build machine | security | Medium | High | High | System Architect, Security Engineer | NFR-26 (lock file, dependency audit), NFR-31 (licence allow list), NFR-15 (same origin only), FR-31 (agency made models); software bill of materials, controlled install scripts, pinned same origin decoders, glTF validation (G-18); CSP never weakened for a library (RSK-17) | open | threat-model.md TM-53 to TM-57 |
| RSK-29 | Backup archives (all personal data, password hashes, settings) exposed in a served folder, readable by other accounts, kept too long or copied insecurely; a crafted archive restored with path traversal | security | Medium | High | High | DevOps Engineer | NFR-18 (no public URL), NFR-17 (35 days), FR-48 (marked as personal data); owner only permissions, exclude sessions, optional encryption, safe restore (G-15); hosting guide instructions (RSK-15) | open | threat-model.md TM-58, TM-59 |
| RSK-30 | SMTP credentials or signing keys exposed (configuration readable by others, logs, errors, admin screens, backups, repository) or sent without TLS; default or shared keys let tokens be forged | security | Low | High | Medium | DevOps Engineer, Developer | NFR-26 (no secrets in repo or package, no details in errors), NFR-32 (example file without secrets); SMTP over TLS and never displayed or logged (G-16); configuration and data folder owner only, per install random keys (G-17) | open | threat-model.md TM-60 to TM-63 |
| RSK-31 | Denial of service on a 1 CPU, 1 GB server: repeated 3D asset downloads, concurrent password hashing, image processing, large bodies, slow requests or regular expression backtracking | performance | Medium | Medium | Medium | System Architect, Performance Engineer | NFR-7, NFR-10, NFR-19, NFR-21, NFR-23; request size, time and concurrency limits and cache lifetimes (G-13); volumetric floods accepted under D6 | open | threat-model.md TM-06, TM-40, TM-49, TM-66, TM-67, TM-68 |
| RSK-32 | First run hijack: on a reachable fresh install, whoever arrives first creates the first Administrator | security | Medium | High | High | Developer, DevOps Engineer | FR-47 (local address by default, no default credentials), NFR-18; first Administrator only by server command or a console setup code (G-1) | open | threat-model.md TM-26 |
| RSK-33 | Defacement or mass deletion of content (compromised account, malicious user or mistake) with no version history (US-36 Won't) and no backup command in the MVP (US-46 Could) | security | Medium | High | High | Product Owner, DevOps Engineer | FR-36 (confirm delete), NFR-33 (all or nothing saves); automatic daily backups and promote US-46 to Must (G-3); revisit US-36 before hosting | open | threat-model.md TM-33 |
| RSK-34 | Misuse goes unnoticed and cannot be reconstructed: no audit log in the MVP (US-44 Could), so sign ins, exports, deletions and purge runs leave no record | security | Medium | Medium | Medium | Security Engineer, Product Owner | FR-46 (deferred), FR-45; minimal security event log as a Must (G-2) | open | threat-model.md TM-28, TM-48, TM-52, TM-64 |
| RSK-35 | The concept notice is emptied, hidden with invisible characters or rewritten to claim the site is official, or a settings link (Book now, social, maps) points to a phishing or script URL, undermining the legal safeguard of the concept | security | Medium | High | High | Developer, UK legal role | FR-17 (never empty), FR-39 (no setting removes it, `https://` for Book now), NFR-27; fixed non editable statement per language (G-6); strict validation of every URL and contact setting (G-5); reject bidirectional and invisible characters (G-7) | open | threat-model.md TM-01, TM-36, TM-37, TM-38; relates to RSK-1 |
| RSK-36 | Broken access control: enquiries, exports or accounts reached by direct request or guessed identifiers, or an Editor gaining Administrator rights; in the MVP every staff user holds every permission (one role, OQ-1) | security | Medium | High | High | Developer, System Architect | FR-32, FR-34, NFR-25 (deny by default, server side roles, record level checks); restore separate Editor and Administrator roles before real personal data exists | open | threat-model.md TM-34, TM-45, TM-50 |
| RSK-37 | Personal or technical data leaks through logs, error pages, version headers, source maps or cached admin responses | privacy | Medium | Medium | Medium | Developer | FR-13, NFR-14 (no personal data in logs), NFR-20 (`no-store`), NFR-26; no version headers or source maps (G-8) | open | threat-model.md TM-03, TM-13, TM-46 |
| RSK-38 | Admin session theft, fixation, or a session that survives a password reset by an Administrator or the disabling of an account | security | Low | High | Medium | Developer | NFR-20 (random id, rotation, timeouts, cookie attributes), NFR-24 (CSP), NFR-18 (HTTPS); end all sessions on reset, disable or delete (G-19) | open | threat-model.md TM-22, TM-23, TM-29 |

## Legal risks (added after the UK legal review)

Added by the Orchestrator on 2026-10-15 from the UK legal role's Phase 3 report (task P3-T1). Research, not legal advice.

| ID | Risk | Category | Likelihood | Impact | Rating | Owner | Mitigation | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RSK-39 | Trade mark or passing off claim over the JAZ name and get up if the concept is shown or hosted beyond local review | legal | Medium | High | High | Steven | Local review only (OQ-13), concept notice and noindex (FR-17), resort name as typeset text, no copied logo artwork or badges (OQ-17); solicitor question Q1 | open | legal-register.md LR-33, LR-34 |
| RSK-40 | Live Book now link implies affiliation with JAZ and sends real visitors into real bookings | legal | Medium | Medium | Medium | Steven | Single configurable URL (FR-11), decision at T1 on OQ-15; solicitor question Q2 | open | legal-register.md LR-46 |
| RSK-41 | Misleading or unfair commercial practice finding under the DMCC Act 2024 if a hosted concept is taken for the real site | legal | Low (local) to Medium (hosted) | High | Medium (local), High (hosted) | Steven | Concept notice that cannot be emptied (FR-17, G-6), no prices, deadlines, scarcity or award claims (FR-7, LR-29), local review only | open | legal-register.md LR-25, LR-29 |
| RSK-42 | No lawful data controller for real enquiry or subscriber data if the site is hosted before the controller question is answered | legal | Medium | High | High | Steven | Placeholder controller in privacy notice (OQ-12), synthetic data only in review; solicitor question Q3 | open | legal-register.md LR-1 |
| RSK-43 | Consent wrongly used as the lawful basis for enquiries (a required consent tick on the contact form) | privacy | High | Low (local), Medium (hosted) | Medium | Requirements Analyst | Change FR-19, FR-20 and NFR-14 to a non consent basis with a privacy link and no required tick (LR-2), subject to solicitor question Q7 | open | legal-register.md LR-2 |
| RSK-44 | Egyptian data protection law or EU GDPR obligations not assessed if the concept is adopted | legal | Medium | Medium | Medium | Steven | Marked Requires qualified legal advice; reassess before any hosting | open | legal-register.md LR-16, LR-44, LR-45 |
| RSK-45 | Third party licence breach from generated images, textures, map imagery, fonts or missing open source notices | legal | Medium | Medium | Medium | Developer | Licence allow list (NFR-31), extend asset licence rules to textures and generated assets (LR-39), open source notices file in the package (LR-40) | open | legal-register.md LR-39, LR-40 |
| RSK-46 | UK data protection guidance is under review after the Data (Use and Access) Act 2025, so guidance based register rows go stale | legal | High | Low | Medium | UK Legal | Recheck register sources at the legal gate in Phase 7 and record new check dates | open | legal-register.md (source table) |

## Change history

| Date | Change | By |
| --- | --- | --- |
| 2026-10-15 | Register created: RSK-1 to RSK-20 seeded from `docs/assumptions.md`, RSK-21 to RSK-38 added from `docs/threat-model.md` | Security Engineer (P3-T2) |
| 2026-10-15 | RSK-39 to RSK-46 added from the UK legal review (`docs/legal-register.md`) | Orchestrator |
