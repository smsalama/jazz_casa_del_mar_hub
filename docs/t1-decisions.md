# T1 scope decisions: Jazz Casa del Mar resort website

- Prepared by: Orchestrator, 2026-10-15
- Purpose: one sheet of everything Steven decides at T1 (scope). Each item has the Orchestrator's recommendation, drawn from the analyst's working answers, the product owner's backlog, the UK legal role's research views and the security engineer's threat model.
- "Approve T1" in chat means: approve section A, every recommendation in sections B to E, and section F. To change any item, reply "Approve T1 with changes:" followed by the item numbers and your answers.
- Legal content here is research, not legal advice.

## A. Scope

1. MVP: the 58 Must stories in `docs/mvp.md`, with the Should, Could and Won't lists in `docs/backlog.md`, amended by the backlog promotions in C2 below.
2. Won't this release: US-14 (enquiry email to staff), US-31 (two step verification, see D), US-36 (draft, preview and version history).

## B. Open questions (OQ numbers from `docs/requirements.md`)

| OQ | Question | Recommendation |
| --- | --- | --- |
| OQ-1 | Admin roles | One Administrator role for this release, fewer than 10 accounts. |
| OQ-2 | Enquiry emails | Admin portal only. No email, so no client mail server is needed. |
| OQ-3 | Default language | English default; the first visit to the site root picks de, it or ru from the browser, otherwise English. |
| OQ-4 | Meaning of "edit everything" | Edit all text, titles, images, links, list items (rooms, venues, offers, FAQ, gallery) and settings in all four languages, within fixed page designs. Not page layout, navigation structure, colours, fonts or 3D scene settings. This narrows your decision D3, so please confirm it explicitly. |
| OQ-5 | Concept notice and noindex | A fixed concept sentence per language that cannot be edited ("Unofficial design concept. Not affiliated with or endorsed by JAZ Hotels."), plus an optional editable sentence of up to 200 characters. Noindex has no admin setting. |
| OQ-6 | Publishing | Edits go live on save. No drafts or history this release (US-36 is Won't). |
| OQ-7 | Missing translations | Show the English text for that field; the admin portal flags gaps per page. Publishing is not blocked. |
| OQ-8 | German, Italian and Russian copy | Machine assisted, marked unreviewed, acceptable for local review only. |
| OQ-9 | "Landing pages" and 3D | The section overview pages (Home, Rooms, Dining, Pools and beach, Activities, Location), each with its own 3D scene, as you asked for an immersive site. Lighter option if you prefer: the hero scene plus two section scenes. |
| OQ-10 | Retention | The proposed schedule in `docs/requirements.md`, plus the rows the legal review adds: photos of people, records of rights requests (24 months), CSV exports (delete after use) and admin sessions. Periods stored as settings. |
| OQ-11 | Newsletter | Single opt in with an explicit consent tick naming the controller. The site stores and exports subscribers but sends nothing. Public unsubscribe page. |
| OQ-12 | Data controller | A clearly marked placeholder controller in the privacy notice until your solicitor answers question Q3. |
| OQ-13 | Hosting | Local review only. No hosting anywhere reachable by others until the solicitor's answers are recorded and the hosting conditions in D are met. |
| OQ-14 | Client server | Design for a small Linux server (1 CPU, 1 GB memory, 10 GB disk), no database server and no mail server. |
| OQ-15 | Book now target | Keep your decision: link out to the JAZ booking engine, as one configurable URL, with a visible "external site, not connected with this concept" label. |
| OQ-16 | Contact details and socials | Synthetic placeholder phone, WhatsApp, email, address and social links. Google Maps link to the resort's public location. |
| OQ-17 | JAZ name and badges | Resort name as typeset text, no copied logo artwork, and no award, certification, eco or review badges. If the solicitor advises against using the name, switch to a neutral codename. |
| OQ-18 | Currency and meetings pages | Both out. |
| OQ-19 | Facts in placeholder copy | No invented numbers, prices, star rating, awards, review quotes, superlatives such as "best beach in Hurghada", deadlines or scarcity claims. |

## C. Requirement changes to adopt after T1

The requirements analyst applies these to `docs/requirements.md`, `docs/stories.md`, `docs/assumptions.md` and `docs/traceability.md`, the product owner updates the backlog and change log, and the requirements gate is re-run.

1. UK legal remediation rows from `docs/legal-register.md`: LR-2 (enquiries rely on a non consent basis, no required consent tick), LR-3, LR-4, LR-5, LR-8, LR-12, LR-21, LR-29, LR-32, LR-39 and LR-40.
2. Security gaps G-1 to G-23 from `docs/threat-model.md`, including two backlog promotions to Must: US-46 (automatic daily backup) and US-66 (rate limiting).
3. Requirements gate findings M2 to M8 and L1 to L7 from `gates/requirements.json` (M1 is already fixed).
4. A design verdict from Steven at T2 and T3 as the check for the success measure "Modernised Design and client feedback" (finding M3).

## D. Accepted risk: no two step verification this release

Accept deferring US-31 for local review with synthetic data. Condition, enforced by G-22: the package refuses to start on a non-local address unless two step verification is built and enforced. Before any hosting, also promote FR-33 (two step verification), FR-44 (data subject tools) and FR-46 (audit log) to Must and close the open legal rows.

## E. Solicitor question pack

`docs/legal/questions-2026-10-15.md` holds seven questions (Q1 to Q7: JAZ name and brand, the live Book now link, data controller, DMCC Act, Egyptian and EU law, conditions for showing or hosting the concept, and the lawful basis for the contact form). None blocks building the local review concept; all must be answered before any hosting. Take it to your solicitor when convenient and paste the answers here in chat.

## F. Repo naming

The repos are named `jazz_casa_del_mar_hub` and `jazz_casa_del_mar_web` rather than the agency convention `jazz_casa_del_mar-site-hub`. Accept the existing names; no rename.
