# Change log: Jazz Casa del Mar resort website

- Client slug: jazz_casa_del_mar
- Project slug: site
- Owner: Product Owner (task P2-T1b)
- Purpose: one entry per scope change, with the date, the request, the impact and the decision.
- Rules: a scope change after T1 needs Steven's approval in chat, quoted in the entry and in `approvals/`. Changes before T1 are recorded here as the baseline. Entries are added at the end and are never edited afterwards; a later change gets a new entry.
- Status of T1: approved on 2026-10-15 (CL-2, `approvals/T1-scope.md`). Entries CL-2 and CL-3 were added by P2-T3. The backlog (`docs/backlog.md`) and MVP (`docs/mvp.md`) now describe the approved scope.

## CL-1 2026-10-15: Steven's scope decisions from chat (baseline before T1)

- Date: 2026-10-15
- Source: Steven's answers in chat to the intake open questions, recorded in `docs/brief.md` under "Decisions from Steven (2026-10-15)" and applied to the brief in commit a0f5bde.
- Approval: given in chat by Steven; these are the client's decisions and are not a T1 scope approval.

| ID | Request (Steven's words) | Impact | Decision |
| --- | --- | --- | --- |
| D1 | Personal data: "keep them and handle the data properly, with a privacy notice, consent and retention rules". This reversed his first answer, "No Personal Data". | The contact form, newsletter and admin accounts stay in scope and are treated as personal data under UK GDPR and PECR. Adds the privacy and cookie notices, consent records, unsubscribe, retention rules and purge job, and data minimisation. Requirements FR-14, FR-15, FR-19 to FR-23, FR-44, FR-45, NFR-14 to NFR-18. Stories US-13 to US-18, US-42, US-43, US-59, US-61 to US-63. Backlog: the form, newsletter, unsubscribe, privacy notice, consent and retention are Must. Data subject tool (US-42) and its rights criteria (US-61) are Could, because staff can search and delete in US-40 and US-41. | Accepted. Personal data features stay in scope. UK legal role reviews lawful bases and retention periods in Phase 3 (OQ-10, OQ-12). |
| D2 | Brand and content rights: "Speculative". | The site is an unofficial concept, not commissioned or authorised by JAZ Hotels. Every page carries a concept notice, all imagery and text are placeholders (nothing copied from jazhotels.com), every page is set not to be indexed, and the agency packages it for local review only. Requirements FR-16 to FR-18, FR-47, NFR-27. Stories US-19 to US-21, US-45, US-72. Backlog: all Must. | Accepted. Concept marking, placeholder content rules, noindex and the local review package are in scope. Hosting beyond local review needs further clearance (OQ-13). |
| D3 | Admin portal: "Edit everything including all elements, titles and everything on the website, upload photos, ead enquiries, export subscribers." ("ead" read as "read".) | Large scope: staff sign in, edit all text in four languages, manage list items, settings, a media library with image processing, an enquiries inbox and subscriber export, with the security controls these need. Requirements FR-32 to FR-46, NFR-19 to NFR-25. Stories US-30 to US-44, US-64 to US-70. Backlog: sign in, accounts, text and list editing, settings, media, enquiries, export and the security baseline are Must. Two step verification (US-31), draft and publish with history (US-36) are Won't this release, and the audit log (US-44) is Could, as analyst additions beyond what Steven asked. Reading of "everything" is text, titles, images, links, list items and settings inside fixed templates until OQ-4 is answered. | Accepted. Admin portal stays in scope. Number of admin users is assumed under 10 (OQ-1). Proposed cuts to analyst additions are for Steven to confirm at T1. |
| D4 | Booking: "Book now" link out to the existing JAZ booking engine. | No booking engine, availability, prices or payment are built. One configurable Book now URL opens the JAZ site in a new tab. Requirements FR-7, FR-11. Stories US-7, US-10. Backlog: Must, both small. | Accepted. Exact target URL and any leaving notice are OQ-15. |
| D5 | Languages: "English, German, Italian & Russian". | All public content and all admin editable content in four languages, with its own URL per language, a switcher and a missing translation rule. The admin interface itself is assumed English only. Requirements FR-24 to FR-26, FR-37, NFR-28. Stories US-22 to US-24, US-35, US-73. Backlog: the language structure and complete translation (US-22, US-73) are Must; automatic detection (US-23), the missing translation fallback (US-24) and the translations screen (US-35) are Should. | Accepted. Default language and detection are open (OQ-3). Placeholder translations are machine assisted and unreviewed (OQ-8). |
| D6 | Running costs: "I don't want any running costs once hosted on their servers". | No paid third party service. Subscribers, enquiries, media and content live in the site's own storage, there is no CAPTCHA, CDN, hosted email or analytics, and any email uses the client's own mail server. Requirements NFR-15, NFR-31, NFR-32, FR-21. Stories US-60, US-76, US-77, US-14. Backlog: no tracking and zero cost are Must; enquiry email notification (US-14) is Won't this release because it needs a mail server. | Accepted. Server facts are OQ-14. |
| D7 | Brand assets: "The designer extract them from the current site", and "you are welcome to enhance the branding to suit the purpose of the website and the sector that it serves". | The UI/UX designer extracts colours, fonts and tone in Phase 4 and may enhance them for hospitality. No logo artwork or badges are copied. Requirement NFR-30. Story US-75. Backlog: Must, small. | Accepted. Brand extraction is a Phase 4 task. Use of the JAZ name and badges is OQ-17. |

Net effect on scope: the seven decisions confirm the whole scope listed in the brief and add personal data handling, concept marking and zero cost constraints. They remove nothing the brief had listed. The only items removed from the analyst's draft are proposals in `docs/backlog.md`, still subject to Steven's approval at T1.

## CL-2 2026-10-15: T1 scope approval (decision sheet sections A to F)

- Date: 2026-10-15
- Request: Steven was asked to approve the T1 scope decision sheet `docs/t1-decisions.md` (commit d2ceca0): the MVP, 19 recommended answers to the open questions, the adoption of the legal, security and gate review changes, one accepted risk, the solicitor question pack timing and the repo names.
- Approval: Steven in chat, recorded in `approvals/T1-scope.md`: "Approve T1". By the sheet's own rule this approves section A, every recommendation in sections B to E, and section F. No item was changed.
- Source of the changes: `docs/t1-decisions.md`, `docs/legal-register.md`, `docs/threat-model.md`, `gates/requirements.json`. Applied to the requirements by the analyst in P2-T2 (see `docs/requirements.md`, "Changes applied after T1") and to this backlog, MVP and log by the Product Owner in P2-T3.

### A. Scope

| Item | Impact | Decision |
| --- | --- | --- |
| MVP is the 58 Must stories, amended by the promotions in C2 | With the two promotions (US-46, US-66) and the new story US-79 (Must), the MVP is 61 stories and 330 active criteria out of 80 stories and 401 (`docs/mvp.md`). | Approved. |
| Won't this release: US-14 (enquiry email), US-31 (two-step verification), US-36 (draft, preview and history) | Three stories and their requirement notes (FR-21, FR-33, FR-38 draft part) are kept but not built. | Approved. |

### B. The 19 answers (OQ-1 to OQ-19)

All approved as recommended. "Differs" means the answer is not the analyst's earlier working answer.

| OQ | Answer | Impact on scope |
| --- | --- | --- |
| OQ-1 | One Administrator role, under 10 accounts | Differs. Editor role dropped. Five Editor criteria withdrawn or rewritten. Roles return before real data exists. |
| OQ-2 | Admin portal only, no enquiry email | Differs. US-14 Won't. No mail server, no reset by email, no SMTP in the tests. |
| OQ-3 | English default, detection from the browser | Same. US-23 stays Should. |
| OQ-4 | Edit all text, titles, images, links, list items and settings in four languages within fixed designs; not layout, navigation structure, colours, fonts or 3D settings | Same as the working answer. Narrows decision D3 ("edit everything"); "Approve T1" is read as the explicit confirmation Steven was asked for (A-38). |
| OQ-5 | Fixed concept sentence per language plus an optional 200 character sentence; no noindex setting | Differs. The whole notice is no longer editable. Title suffix added automatically. |
| OQ-6 | Edits go live on save | Differs. US-36 Won't; two criteria withdrawn. |
| OQ-7 | English text shown for a missing translation; gaps flagged per page; publishing not blocked | Same. US-24 and US-35 stay Should. |
| OQ-8 | Machine assisted, unreviewed, local review only | Same. 12 entry register of translated legal pages. |
| OQ-9 | Six scenes: Home plus the five section overview pages | Differs. The lighter option (hero plus two) was not chosen, so US-26 stays Must, size L. |
| OQ-10 | Retention schedule plus four added rows | Differs. Rows added for request records, photo originals, CSV exports and sessions. |
| OQ-11 | Single opt in, consent names the controller, nothing sent, public unsubscribe | Differs. No double opt in. |
| OQ-12 | Marked placeholder controller until the solicitor answers Q3 | Same. Stays open; two criteria provisional. |
| OQ-13 | Local review only until section D is met | Same. |
| OQ-14 | Small Linux server, no database server, no mail server | Same. |
| OQ-15 | Book now link out with a visible "external site, not connected with this concept" label | Differs. Label added (AC-10.6). |
| OQ-16 | Synthetic contact details | Same. |
| OQ-17 | Typeset name, no copied logo or badges; neutral codename if the solicitor advises | Same. |
| OQ-18 | Currency selector and meetings pages out | Same. |
| OQ-19 | No invented numbers, prices, ratings, awards, quotes, superlatives, deadlines or scarcity | Differs. Wider than the working answer. |

### C. Requirement changes adopted

| Item | Impact | Decision |
| --- | --- | --- |
| C1 Legal register rows LR-2, LR-3, LR-4, LR-5, LR-8, LR-12, LR-21, LR-29, LR-32, LR-39, LR-40 | No consent tick on the contact form; complaint route; fuller privacy notice; extra retention rows; draft record of processing; no cookie form tokens; sample offers without deadlines; "Who runs this site"; licence register for 3D inputs; third party notices. Stories US-13, US-15, US-17, US-19, US-21, US-29, US-40, US-45 and others grew. | Adopted. |
| C2 Security gaps G-1 to G-23, including promotion of US-46 (automatic daily backup) and US-66 (rate limiting) to Must | US-46 Could to Must, US-66 Should to Must. New stories US-79 (NFR-34 security event record, Must) and US-80 (NFR-35 resource limits, Should). Sizes up for US-15, US-19, US-37 and US-71. | Adopted. US-80 priority set by the Product Owner (see below). |
| C3 Gate findings M2 to M8 and L1 to L7 | Contradictions and unmeasurable criteria fixed by the analyst; the Product Owner re-checks them in the gate re-check. | Adopted. |
| C4 Design verdict from Steven at T2 and T3 (M3) | New requirement NFR-36 and criteria AC-75.4 to AC-75.6; success criteria 1 and 2 in `docs/mvp.md`. | Adopted. |

### D. Accepted risk: no two-step verification this release

- Impact: the admin portal is protected by a strong password, lockout and rate limits only. US-31 is Won't and FR-33 is not built.
- Decision: accepted for local review with synthetic data, on condition that the package refuses to start on any non local address (G-22, NFR-18, AC-63.2). Before any hosting, FR-33, FR-44 (US-42) and FR-46 (US-44) become Must and the open legal rows are closed.

### E and F. Solicitor pack and repo names

- E: the seven questions Q1 to Q7 in `docs/legal/questions-2026-10-15.md` go to Steven's solicitor when convenient. None blocks building. All must be answered before any hosting. Decision: approved.
- F: the repos keep the names `jazz_casa_del_mar_hub` and `jazz_casa_del_mar_web`. Decision: approved.

### Product Owner follow through (not Steven's decisions; the Orchestrator should confirm)

- US-80 (resource limits) is Should because the threat model gives it low residual risk for local review and states no priority. It becomes Must before any hosting. If Steven wants it Must now, the MVP grows by one medium story.
- US-36 stays Won't as approved, but its five live on save criteria (AC-36.2, AC-36.4, AC-36.5 to AC-36.7) are the only criteria for FR-38. They should move into a Must story or be tested with US-33 and US-34. See `docs/backlog.md`, Consistency notes.
- US-18 (Should) and US-62 (Could) are referred to by Must criteria (AC-60.2, AC-60.5) or duplicated by them. No priority was changed because that needs Steven's yes.

## CL-3 2026-10-15: OQ-20 and OQ-21 answered

- Date: 2026-10-15
- Source: Steven in chat after T1, recorded by the Orchestrator in `state/project.json` and applied in commit 502cb0c.

| Question | Request (Steven's words) | Impact | Decision |
| --- | --- | --- | --- |
| OQ-20 Can staff add a room type? (raised in P2-T2, finding L4) | "no" | Staff edit the six room entries but cannot add or delete a room type. A seventh room type is a scope change. FR-1 and FR-36 stand; EXC-27 and A-32 are confirmed. No change to US-3, US-34 or their sizes. | Accepted. AC-34.6 is no longer provisional. |
| OQ-21 Exact Book now address (raised in P2-T2) | "ignore booking" | Read by the Orchestrator as: keep the default Book now address (the resort page on the group site) and do not pursue the booking engine address. Book now stays in scope and still shows the external site label. No change to US-10 or US-37. Solicitor question Q2 about linking to the live site still applies before any hosting. | Accepted. AC-10.5 is no longer provisional. |

After CL-3 only two criteria remain provisional: AC-15.1 and AC-17.4 (OQ-12).
