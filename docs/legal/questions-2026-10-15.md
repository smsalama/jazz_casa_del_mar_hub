# Questions for Steven's solicitor: Jazz Casa del Mar concept site

> **Research, not legal advice.** Prepared by the SSS agency UK Technology Law and Compliance Specialist role as research support. It sets out facts and questions for a qualified solicitor. It does not state what the law requires in this case and does not approve anything.

- Date: 2026-10-15
- Project: speculative redesign concept of the website of Jaz Elite Casa del Mar Beach, Hurghada, Egypt (JAZ Hotel Group)
- Register: `docs/legal-register.md` (row IDs LR-n, source codes Sn with URLs, all opened on 2026-10-15)
- Requirements: `docs/requirements.md` (FR-n, NFR-n, open questions OQ-n)
- How to return answers: send the answer and its date to the Orchestrator; it is recorded in the "Answers from Steven's solicitor" table of the register and the named rows are updated.

## Shared facts

These facts apply to every question.

1. Steven runs the SSS agency (UK based, Hove and Brighton area). The agency is building a website concept for the resort above. JAZ Hotels has **not** commissioned, authorised or been told about it. Steven describes it as "Speculative" (brief, Decision 2).
2. The aim is a modernised redesign: four languages (English, German, Italian, Russian), immersive 3D scenes, and an admin portal where resort staff could edit content, read enquiries and export newsletter subscribers.
3. Current controls in the requirements:
   - Every page and admin screen carries a non-dismissible notice saying the site is an unofficial concept not affiliated with JAZ Hotels, and every browser title ends in "Concept" (FR-17).
   - A Terms section "About this concept" says the site is unofficial, not operated, authorised or endorsed by JAZ Hotels or the resort, uses placeholder images and text, and takes no bookings (FR-16).
   - All images, 3D models and text are placeholders made by the agency or licensed royalty free; nothing is copied from jazhotels.com; no JAZ, Tripadvisor or other logo or badge; no prices, ratings, awards or reviews (FR-18).
   - Every page is set not to be indexed by search engines (NFR-27).
   - Contact details and social links default to synthetic placeholders (FR-12).
   - The release is a package run locally on one computer for review, with synthetic data only (FR-47, NFR-26).
4. Steven asked the designer to "use the branding from the current website" and allowed enhancement (Decision 7). The brief records the theme colour #453536, the JAZ wordmark and an upbeat tone as seen on the current page.
5. The brief also says the client should have no running costs "once hosted on their servers" and that a hosting questionnaire will be completed "after release". Whether the concept will ever be hosted beyond local review is open (OQ-13).

## Q1. Using the JAZ and resort name and brand in a speculative concept

**Facts.** The concept shows the resort name (for example "Jaz Elite Casa del Mar Beach" or a shortened form) as typeset text in the header, page headings and browser titles, and follows the look of the current site (theme colour #453536, tone of labels). No logo artwork is copied. The concept notice and "About this concept" text state that it is unofficial and not affiliated. The UK trade mark register has not been searched for JAZ or Casa del Mar marks.

**Questions.**
1. Does showing the resort and group name, and a similar get-up, in a speculative concept create a material risk of trade mark infringement (Trade Marks Act 1994 s10) or passing off, (a) while it is only run locally and shown privately to Steven, (b) if shown to JAZ as an unsolicited pitch, (c) if shown in Steven's or the agency's portfolio, or (d) if hosted at a public address even with noindex and the concept notice?
2. Is the concept notice wording adequate as a disclaimer, and where must it appear?
3. Would using a neutral codename for the concept, with the real name only in the "About this concept" text, materially reduce the risk?
4. Does copyright subsist in the look of the current site in a way that "using the branding" (colour, tone, layout ideas) could infringe, as opposed to copying text, photos or code (CDPA 1988 s16)?

**Why it matters.** The answer decides whether the brand can appear at all, what the designer may extract (NFR-30), and whether the portfolio or pitch use is safe. It is the main risk in the project risk register (RSK-1).

**Sources found.** S49 Trade Marks Act 1994 s2(2) (passing off preserved); S50 s10(1) to (4) (infringement, including use in advertising and use of a mark with a reputation); S51 and S53 CDPA 1988 s1 and s16; S39 DMCC Act 2024 s226 (misleading action by creating confusion with another trader's trade mark or trade name). IPO guidance pages on infringement and passing off could not be opened on 2026-10-15.

## Q2. "Book now" linking to the live JAZ booking engine

**Facts.** Steven decided "Book now" links out to the existing JAZ booking engine (Decision 4). Requirements: one configurable URL, opening in a new tab, labelled "opens in a new tab", no prices or availability on the concept (FR-11, FR-7). The working target is the resort's page on the group site, https://www.jazhotels.com/hoteldetail/57-egypt-hurghada-jaz-elite-casa-del-mar-beach, with no "you are leaving this site" notice (OQ-15). The concept tells visitors it takes no bookings (FR-16).

**Questions.**
1. Is a link from an unauthorised concept to the real booking engine or hotel page lawful in itself, and does it increase the risk under Q1 (implied affiliation) or under consumer law (misleading action by confusion or about the trader)?
2. For the review package, should the link point to a placeholder address instead, with the real URL entered only if JAZ adopts the concept?
3. If a real link is kept, is a notice before leaving the site (or a visible "external site, not connected with this concept" label) advisable?
4. Could any liability arise if a real person reached the concept, followed the link and booked?

**Why it matters.** It decides the default value of the Book now setting (FR-11, FR-39) and whether an interstitial is required, and closes OQ-15.

**Sources found.** S39 DMCC Act 2024 s226; S43 Sch 20 para 4 (false claim of approval, endorsement or authorisation); S49; S50. S54 Package Travel Regulations 2018 reg 2 was checked and the research view is that a single link to the resort group's own engine, with nothing sold on the concept, does not create a package or linked travel arrangement (register LR-41); please confirm if you see otherwise.

## Q3. Who is the data controller, and does UK data protection law apply

**Facts.** Steven decided to keep the contact form, newsletter sign up and admin accounts and handle the data "properly, with a privacy notice, consent and retention rules" (Decision 1). The data collected: enquiry name, email, optional telephone, message; newsletter email address; admin account name and email; security logs (IP addresses in rate limit counters and web server logs). In local review all data is synthetic. The privacy notice currently names a marked placeholder controller (FR-14, OQ-12). Data would be stored only on the server running the site; if hosted on "the client's servers" these may be in Egypt (OQ-14).

**Questions.**
1. In local review with synthetic data only, is there any controller duty at all?
2. If the concept were hosted (for example for a pitch) and received real enquiries, who would be the controller: Steven personally, the agency, or nobody until JAZ adopts it? Could the agency be a controller for data collected under a brand it does not own?
3. If JAZ (an Egyptian operator) adopted the site, would UK GDPR apply to it under Art 3(2) (offering services to people in the UK), and would it need a UK representative under Art 27?
4. Would the controller need to pay the data protection fee under the Data Protection (Charges and Information) Regulations 2018, or would the processing fall within the exemptions (own marketing, staff administration)?
5. If data is stored on a server in Egypt, what transfer mechanism would the UK rules (as restructured by the Data (Use and Access) Act 2025) require, and on whose side?
6. Whose name should the privacy notice give, and is a placeholder acceptable for the review package?

**Why it matters.** The privacy notice (FR-14), consent text (FR-22), the record of processing (LR-12), the fee (LR-15), transfers (LR-16) and the UK representative (LR-17) all depend on this. Naming JAZ or the resort as controller without agreement would itself be a false statement.

**Sources found.** S1 UK GDPR Art 3; S7 Art 13(1)(a); S10 Art 27; S11 Art 30(5); S14 Art 44 (shown as omitted from 5 February 2026 by the Data (Use and Access) Act 2025); S15 Art 45A; S18 and S19 Charges Regulations reg 2 and Schedule; S28 ICO guidance on controllers and processors (marked under review for the 2025 Act). UK GDPR Art 12A could not be opened.

## Q4. Is the concept a "commercial practice" under the DMCC Act 2024

**Facts.** The concept is not offered to consumers. If shown publicly it would present a real resort's rooms, dining and offers (with no prices) under the resort's name, with a concept notice on every page, and would invite enquiries and newsletter sign ups.

**Questions.**
1. Is a speculative concept, made by an agency to win work, a commercial practice of a trader in relation to consumers (DMCC Act 2024 s225), given that it promotes another trader's product?
2. If so, are the concept notice and "About this concept" text enough to avoid a misleading action or omission (ss226, 227), in particular about the identity of the trader?
3. Do the placeholder offers (no prices, no deadlines) raise any issue?

**Why it matters.** It decides whether LR-25 and the consumer protection rows bite outside local review, and how strong the concept marking must be.

**Sources found.** S38 s225; S39 s226; S40 s227; S41 s230; S42 s245; S43 Sch 20 paras 1 to 4, 7, 13, 15, 25; S44 CMA207 publication page (the 64 page guidance PDF itself was not opened).

## Q5. Egyptian law and EU law

**Facts.** The resort and its operator are in Egypt. The site is in English, German, Italian and Russian, so it addresses EU visitors among others. No analytics or tracking (NFR-15).

**Questions.**
1. If the concept were adopted or hosted by the Egyptian operator, would Egypt's Personal Data Protection Law No. 151 of 2020 and its executive regulations apply, and do they require licensing, registration, local storage or consent formalities that affect the requirements?
2. Would the EU GDPR apply to the operator (Art 3(2), offering services to people in the EU, given German and Italian versions), and would an EU representative be needed (Art 27)?
3. Are there Egyptian rules on hotel or tourism advertising that affect content (star ratings, offers, licence numbers)?

**Why it matters.** Rows LR-16, LR-17, LR-42, LR-44 and LR-45 cannot be resolved by UK research. They matter only if the concept is adopted or hosted.

**Sources found.** S61 EUR-Lex text of Regulation (EU) 2016/679: only recitals 23, 24 and 80 were reached in the fetched text (recital 23: mere accessibility of a website is not enough, but use of a Member State language or currency with the possibility of ordering can show intent). No official Egyptian source was found or opened; only law firm and third party copies came up in search, which were not relied on.

## Q6. Conditions for showing or hosting the concept

**Facts.** See shared facts 3 and 5. The working answer to OQ-13 is local review only.

**Questions.**
1. What conditions, if any, would make it acceptable to (a) show the concept to JAZ in a meeting from a laptop, (b) send JAZ a private link to a hosted copy, (c) put screenshots or a video in a public portfolio?
2. If hosted, does the e-commerce information duty (Electronic Commerce (EC Directive) Regulations 2002 reg 6: name, geographic address, email, register and VAT numbers) fall on Steven or the agency, and what should a "Who runs this site" section say?
3. Does the Equality Act 2010 reasonable adjustments duty for service providers attach to a concept shown for a pitch (the agency builds to WCAG 2.2 AA in any case)?

**Why it matters.** It turns OQ-13 into a clear rule and decides whether the e-commerce information requirement (LR-32) needs real values.

**Sources found.** S46 and S47 E-commerce Regulations regs 2 and 6; S36 and S37 Equality Act 2010 ss20, 29; S35 GOV.UK accessibility guidance (public sector).

## Q7. Lawful basis for the contact form

**Facts.** The contact form requires a ticked consent box before an enquiry can be sent (FR-19). ICO guidance says consent is not appropriate where it is made a condition of the service, or where the controller would process anyway, and that contract (pre-contract steps at the person's request) or legitimate interests usually fit.

**Questions.**
1. Is it right to drop the required consent tick for enquiries, rely on Art 6(1)(b) or 6(1)(f), and show privacy information with a link instead?
2. For the newsletter, is single opt-in with a recorded unticked consent box and a public unsubscribe page (no confirmation email) adequate under PECR reg 22 and UK GDPR Art 7?

**Why it matters.** It decides the change to FR-19, FR-20 and NFR-14 (register LR-2) and confirms FR-22 and FR-23 (LR-3, LR-19).

**Sources found.** S3 UK GDPR Art 6(1); S4 Art 7; S22 PECR reg 22; S29 and S30 ICO consent guidance (pages dated 4 August 2026, marked under review).
