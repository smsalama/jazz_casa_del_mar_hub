# Traceability: Jazz Casa del Mar resort website

- Task: P2-T1a (Requirements Analyst)
- Sources: `docs/requirements.md` (requirements), `docs/stories.md` (stories and acceptance criteria)
- How it is built: each acceptance criterion in `docs/stories.md` carries the IDs of the requirements it checks in square brackets. This table is generated from those tags, so a requirement lists only the criteria that actually check it. A criterion marked "P" depends on an open question (see `docs/requirements.md`, Open questions).
- Test column: left empty for QA to complete in Phase 8 with the test ID and result for each criterion.
- Coverage: 48 functional requirements, 33 non-functional requirements, 78 stories, 338 acceptance criteria. Every requirement has at least one story and at least one acceptance criterion, and every acceptance criterion traces to at least one requirement.

## Functional requirements

| Requirement | Title | Stories | Acceptance criteria | Tests (QA) |
| --- | --- | --- | --- | --- |
| FR-1 | Page inventory | US-1 | AC-1.1, AC-1.2, AC-1.3, AC-1.4(P) |  |
| FR-2 | Rooms content | US-3 | AC-3.1, AC-3.2, AC-3.3 |  |
| FR-3 | Dining content | US-4 | AC-4.1, AC-4.2, AC-4.3 |  |
| FR-4 | Pools, beach, activities and facilities content | US-5 | AC-5.1, AC-5.2, AC-5.3 |  |
| FR-5 | Home content | US-2 | AC-2.1, AC-2.2, AC-2.3(P) |  |
| FR-6 | Location content | US-6 | AC-6.1, AC-6.2, AC-6.3 |  |
| FR-7 | Offers content | US-7 | AC-7.1, AC-7.2 |  |
| FR-8 | Gallery | US-8 | AC-8.1, AC-8.2, AC-8.3, AC-8.4 |  |
| FR-9 | FAQ | US-9 | AC-9.1, AC-9.2, AC-9.3 |  |
| FR-10 | Global navigation and footer | US-1 | AC-1.5, AC-1.6, AC-1.7, AC-1.8 |  |
| FR-11 | Book now links | US-10 | AC-10.1, AC-10.2, AC-10.3, AC-10.4, AC-10.5(P) |  |
| FR-12 | Contact details and external links | US-11 | AC-11.1, AC-11.2, AC-11.3, AC-11.4(P) |  |
| FR-13 | Error pages | US-12 | AC-12.1, AC-12.2 |  |
| FR-14 | Privacy notice content | US-17 | AC-17.1, AC-17.2, AC-17.3, AC-17.4(P) |  |
| FR-15 | Cookie and storage notice | US-18 | AC-18.1, AC-18.2 |  |
| FR-16 | Terms, accessibility statement and about this concept | US-19 | AC-19.1, AC-19.2, AC-19.3(P) |  |
| FR-17 | Concept marking | US-20 | AC-20.1, AC-20.2, AC-20.3, AC-20.4, AC-20.5(P) |  |
| FR-18 | Placeholder content rules | US-2, US-21 | AC-2.3(P), AC-21.1, AC-21.2, AC-21.3(P), AC-21.4(P) |  |
| FR-19 | Contact form fields and validation | US-13 | AC-13.1, AC-13.2, AC-13.3, AC-13.4, AC-13.9 |  |
| FR-20 | Contact form submission | US-13 | AC-13.4, AC-13.5, AC-13.6, AC-13.7, AC-13.8 |  |
| FR-21 | Enquiry email notification (optional) | US-14 | AC-14.1(P), AC-14.2(P), AC-14.3(P), AC-14.4(P) |  |
| FR-22 | Newsletter sign-up | US-15 | AC-15.1, AC-15.2, AC-15.3, AC-15.4, AC-15.5, AC-15.6(P) |  |
| FR-23 | Newsletter unsubscribe | US-16 | AC-16.1(P), AC-16.2(P), AC-16.3 |  |
| FR-24 | Four languages | US-22 | AC-22.1, AC-22.2, AC-22.3, AC-22.4, AC-22.5 |  |
| FR-25 | Default language and detection | US-23 | AC-23.1(P), AC-23.2(P), AC-23.3(P) |  |
| FR-26 | Missing translations | US-24 | AC-24.1(P), AC-24.2(P) |  |
| FR-27 | Immersive 3D hero | US-25 | AC-25.1, AC-25.2, AC-25.3, AC-25.4 |  |
| FR-28 | Landing scenes | US-26 | AC-26.1(P), AC-26.2(P) |  |
| FR-29 | Loader and page transitions | US-27 | AC-27.1, AC-27.2, AC-27.3, AC-27.4, AC-27.5, AC-27.6 |  |
| FR-30 | Motion controls | US-28 | AC-28.1, AC-28.2, AC-28.3, AC-28.4 |  |
| FR-31 | 3D asset authoring and delivery | US-29 | AC-29.1, AC-29.2, AC-29.3 |  |
| FR-32 | Admin sign in and sign out | US-30 | AC-30.1, AC-30.2, AC-30.3, AC-30.4, AC-30.5, AC-30.6 |  |
| FR-33 | Two-step verification | US-31 | AC-31.1, AC-31.2, AC-31.3, AC-31.4, AC-31.5 |  |
| FR-34 | Admin accounts | US-32 | AC-32.1, AC-32.2, AC-32.3, AC-32.4, AC-32.5(P), AC-32.6 |  |
| FR-35 | Edit all content | US-33 | AC-33.1, AC-33.2(P), AC-33.3, AC-33.4 |  |
| FR-36 | Manage list items | US-34 | AC-34.1, AC-34.2, AC-34.3, AC-34.4, AC-34.5(P) |  |
| FR-37 | Translation editing and completeness | US-35 | AC-35.1, AC-35.2, AC-35.3 |  |
| FR-38 | Publishing and change visibility | US-36 | AC-36.1(P), AC-36.2(P), AC-36.3(P), AC-36.4(P) |  |
| FR-39 | Site settings | US-37 | AC-37.1, AC-37.2, AC-37.3, AC-37.4(P) |  |
| FR-40 | Media library | US-38 | AC-38.1, AC-38.2, AC-38.3, AC-38.4, AC-38.5, AC-38.6 |  |
| FR-41 | Image processing | US-39 | AC-39.1, AC-39.2, AC-39.3, AC-39.4, AC-39.5 |  |
| FR-42 | Enquiries | US-40 | AC-40.1, AC-40.2, AC-40.3, AC-40.4, AC-40.5 |  |
| FR-43 | Subscribers and export | US-41 | AC-41.1, AC-41.2, AC-41.3, AC-41.4, AC-41.5 |  |
| FR-44 | Data subject request tools | US-42 | AC-42.1, AC-42.2, AC-42.3 |  |
| FR-45 | Retention enforcement | US-43 | AC-43.1, AC-43.2, AC-43.3, AC-43.4(P), AC-43.5 |  |
| FR-46 | Audit log | US-44 | AC-44.1, AC-44.2, AC-44.3, AC-44.4 |  |
| FR-47 | Local review package | US-45 | AC-45.1, AC-45.2, AC-45.3, AC-45.4, AC-45.5 |  |
| FR-48 | Backup and restore | US-46 | AC-46.1, AC-46.2, AC-46.3 |  |

## Non-functional requirements

| Requirement | Title | Stories | Acceptance criteria | Tests (QA) |
| --- | --- | --- | --- | --- |
| NFR-1 | WCAG 2 | US-50 | AC-50.1, AC-50.2, AC-50.3 |  |
| NFR-2 | Keyboard and focus | US-47 | AC-47.1, AC-47.2, AC-47.3, AC-47.4, AC-47.5, AC-47.6 |  |
| NFR-3 | Screen reader support | US-48 | AC-48.1, AC-48.2, AC-48.3, AC-48.4, AC-48.5, AC-48.6 |  |
| NFR-4 | Visual presentation | US-49 | AC-49.1, AC-49.2, AC-49.3, AC-49.4, AC-49.5, AC-49.6 |  |
| NFR-5 | Authentication accessibility and time | US-51 | AC-51.1, AC-51.2, AC-51.3, AC-51.4 |  |
| NFR-6 | Core Web Vitals budgets | US-52 | AC-52.1, AC-52.2, AC-52.3, AC-52.4 |  |
| NFR-7 | Weight budgets | US-52 | AC-52.5, AC-52.6, AC-52.7, AC-52.8 |  |
| NFR-8 | 3D runtime budget | US-53 | AC-53.1, AC-53.2, AC-53.3, AC-53.4, AC-53.5, AC-53.6 |  |
| NFR-9 | Transition and loader timing | US-54 | AC-54.1, AC-54.2, AC-54.3, AC-54.4 |  |
| NFR-10 | Server and admin performance | US-55 | AC-55.1(P), AC-55.2, AC-55.3, AC-55.4 |  |
| NFR-11 | Reduced motion | US-56 | AC-56.1, AC-56.2, AC-56.3, AC-56.4 |  |
| NFR-12 | Non-WebGL and low-capability fallback | US-57 | AC-57.1, AC-57.2, AC-57.3, AC-57.4, AC-57.5 |  |
| NFR-13 | Progressive enhancement | US-58 | AC-58.1, AC-58.2, AC-58.3 |  |
| NFR-14 | Data protection by design | US-59 | AC-59.1, AC-59.2, AC-59.3, AC-59.4, AC-59.5, AC-59.6 |  |
| NFR-15 | Cookies, storage and third-party requests (PECR) | US-60 | AC-60.1, AC-60.2, AC-60.3, AC-60.4, AC-60.5, AC-60.6 |  |
| NFR-16 | Individual rights | US-42, US-61 | AC-42.4, AC-61.1, AC-61.2 |  |
| NFR-17 | Retention | US-17, US-62 | AC-17.2, AC-62.1, AC-62.2, AC-62.3(P) |  |
| NFR-18 | Storage location and protection | US-63 | AC-63.1, AC-63.2, AC-63.3, AC-63.4 |  |
| NFR-19 | Admin authentication strength | US-64 | AC-64.1, AC-64.2, AC-64.3, AC-64.4 |  |
| NFR-20 | Sessions | US-65 | AC-65.1, AC-65.2, AC-65.3, AC-65.4, AC-65.5 |  |
| NFR-21 | Rate limiting | US-66 | AC-66.1, AC-66.2, AC-66.3, AC-66.4, AC-66.5 |  |
| NFR-22 | Request forgery protection | US-67 | AC-67.1, AC-67.2, AC-67.3 |  |
| NFR-23 | Upload validation | US-68 | AC-68.1, AC-68.2, AC-68.3, AC-68.4, AC-68.5, AC-68.6, AC-68.7 |  |
| NFR-24 | Injection and output safety | US-69 | AC-69.1, AC-69.2, AC-69.3, AC-69.4, AC-69.5, AC-69.6 |  |
| NFR-25 | Authorisation | US-70 | AC-70.1, AC-70.2(P), AC-70.3, AC-70.4, AC-70.5(P) |  |
| NFR-26 | Secrets, errors and dependencies | US-71 | AC-71.1, AC-71.2, AC-71.3, AC-71.4 |  |
| NFR-27 | Noindex everywhere | US-72 | AC-72.1, AC-72.2, AC-72.3, AC-72.4, AC-72.5 |  |
| NFR-28 | Internationalisation | US-73 | AC-73.1, AC-73.2, AC-73.3, AC-73.4, AC-73.5 |  |
| NFR-29 | Browser, device and viewport support | US-74 | AC-74.1, AC-74.2, AC-74.3, AC-74.4 |  |
| NFR-30 | Brand | US-75 | AC-75.1, AC-75.2, AC-75.3(P) |  |
| NFR-31 | Zero running cost | US-76 | AC-76.1, AC-76.2, AC-76.3, AC-76.4(P), AC-76.5 |  |
| NFR-32 | Operability | US-77 | AC-77.1, AC-77.2, AC-77.3 |  |
| NFR-33 | Data integrity | US-78 | AC-78.1, AC-78.2, AC-78.3 |  |

## Stories to requirements

| Story | Title | Requirements | Acceptance criteria |
| --- | --- | --- | --- |
| US-1 | Find my way around the site | FR-1, FR-10 | AC-1.1 to AC-1.8 (8) |
| US-2 | Understand the resort from the Home page | FR-5 | AC-2.1 to AC-2.3 (3) |
| US-3 | Compare rooms and suites | FR-2 | AC-3.1 to AC-3.3 (3) |
| US-4 | Browse the dining venues | FR-3 | AC-4.1 to AC-4.3 (3) |
| US-5 | See the pools, beach and activities | FR-4 | AC-5.1 to AC-5.3 (3) |
| US-6 | Find the resort and what is nearby | FR-6 | AC-6.1 to AC-6.3 (3) |
| US-7 | See the current offers | FR-7 | AC-7.1 to AC-7.2 (2) |
| US-8 | Look through the photo gallery | FR-8 | AC-8.1 to AC-8.4 (4) |
| US-9 | Read the frequently asked questions | FR-9 | AC-9.1 to AC-9.3 (3) |
| US-10 | Follow Book now to the JAZ booking engine | FR-11 | AC-10.1 to AC-10.5 (5) |
| US-11 | Contact the resort by phone, chat or social media | FR-12 | AC-11.1 to AC-11.4 (4) |
| US-12 | Land on a helpful page when something goes wrong | FR-13 | AC-12.1 to AC-12.2 (2) |
| US-13 | Send an enquiry to the resort | FR-19, FR-20 | AC-13.1 to AC-13.9 (9) |
| US-14 | Let staff know by email when an enquiry arrives (optional) | FR-21 | AC-14.1 to AC-14.4 (4) |
| US-15 | Subscribe to the newsletter | FR-22 | AC-15.1 to AC-15.6 (6) |
| US-16 | Unsubscribe from the newsletter | FR-23 | AC-16.1 to AC-16.3 (3) |
| US-17 | Understand how my data is used | FR-14 | AC-17.1 to AC-17.4 (4) |
| US-18 | Know what my browser stores | FR-15 | AC-18.1 to AC-18.2 (2) |
| US-19 | Read the terms, the accessibility statement and what this concept is | FR-16 | AC-19.1 to AC-19.3 (3) |
| US-20 | See clearly that this is a concept | FR-17 | AC-20.1 to AC-20.5 (5) |
| US-21 | Be sure all content is placeholder content | FR-18 | AC-21.1 to AC-21.4 (4) |
| US-22 | Read the site in my own language | FR-24 | AC-22.1 to AC-22.5 (5) |
| US-23 | Arrive in a sensible language | FR-25 | AC-23.1 to AC-23.3 (3) |
| US-24 | Never see a blank where text should be | FR-26 | AC-24.1 to AC-24.2 (2) |
| US-25 | Be drawn in by the 3D hero | FR-27 | AC-25.1 to AC-25.4 (4) |
| US-26 | Experience motion on each section page | FR-28 | AC-26.1 to AC-26.2 (2) |
| US-27 | See a loader and smooth transitions between pages | FR-29 | AC-27.1 to AC-27.6 (6) |
| US-28 | Pause the motion | FR-30 | AC-28.1 to AC-28.4 (4) |
| US-29 | Receive 3D content the agency created | FR-31 | AC-29.1 to AC-29.3 (3) |
| US-30 | Sign in and out of the admin portal | FR-32 | AC-30.1 to AC-30.6 (6) |
| US-31 | Protect my account with a second step | FR-33 | AC-31.1 to AC-31.5 (5) |
| US-32 | Manage staff accounts | FR-34 | AC-32.1 to AC-32.6 (6) |
| US-33 | Edit every piece of text in every language | FR-35 | AC-33.1 to AC-33.4 (4) |
| US-34 | Add, remove and reorder items in lists | FR-36 | AC-34.1 to AC-34.5 (5) |
| US-35 | See which translations are missing | FR-37 | AC-35.1 to AC-35.3 (3) |
| US-36 | Preview and publish changes safely | FR-38 | AC-36.1 to AC-36.4 (4) |
| US-37 | Keep contact details and site-wide settings up to date | FR-39 | AC-37.1 to AC-37.4 (4) |
| US-38 | Upload and manage photos | FR-40 | AC-38.1 to AC-38.6 (6) |
| US-39 | Have uploaded photos prepared automatically | FR-41 | AC-39.1 to AC-39.5 (5) |
| US-40 | Read enquiries | FR-42 | AC-40.1 to AC-40.5 (5) |
| US-41 | Export subscribers | FR-43 | AC-41.1 to AC-41.5 (5) |
| US-42 | Answer a data request from an individual | FR-44, NFR-16 | AC-42.1 to AC-42.4 (4) |
| US-43 | Have old personal data deleted automatically | FR-45 | AC-43.1 to AC-43.5 (5) |
| US-44 | Review who did what | FR-46 | AC-44.1 to AC-44.4 (4) |
| US-45 | Review the site on one computer | FR-47 | AC-45.1 to AC-45.5 (5) |
| US-46 | Back up and restore the site's data | FR-48 | AC-46.1 to AC-46.3 (3) |
| US-47 | Use the whole site with a keyboard | NFR-2 | AC-47.1 to AC-47.6 (6) |
| US-48 | Use the site with a screen reader | NFR-3 | AC-48.1 to AC-48.6 (6) |
| US-49 | Read the site comfortably | NFR-4 | AC-49.1 to AC-49.6 (6) |
| US-50 | Meet WCAG 2.2 AA across the whole site | NFR-1 | AC-50.1 to AC-50.3 (3) |
| US-51 | Sign in and work in the admin portal without barriers | NFR-5 | AC-51.1 to AC-51.4 (4) |
| US-52 | Get pages quickly on a mid range phone | NFR-6, NFR-7 | AC-52.1 to AC-52.8 (8) |
| US-53 | Enjoy smooth 3D | NFR-8 | AC-53.1 to AC-53.6 (6) |
| US-54 | Move between pages without waiting for animations | NFR-9 | AC-54.1 to AC-54.4 (4) |
| US-55 | Have the server and admin portal respond briskly | NFR-10 | AC-55.1 to AC-55.4 (4) |
| US-56 | See a calm site when I ask for reduced motion | NFR-11 | AC-56.1 to AC-56.4 (4) |
| US-57 | Get a complete site when 3D cannot run | NFR-12 | AC-57.1 to AC-57.5 (5) |
| US-58 | Use the key functions without JavaScript | NFR-13 | AC-58.1 to AC-58.3 (3) |
| US-59 | Share only the data that is needed | NFR-14 | AC-59.1 to AC-59.6 (6) |
| US-60 | Browse without being tracked | NFR-15 | AC-60.1 to AC-60.6 (6) |
| US-61 | Exercise my data protection rights | NFR-16 | AC-61.1 to AC-61.2 (2) |
| US-62 | Have backups kept no longer than needed | NFR-17 | AC-62.1 to AC-62.3 (3) |
| US-63 | Keep personal data safe where it lives | NFR-18 | AC-63.1 to AC-63.4 (4) |
| US-64 | Make passwords and sign in hard to attack | NFR-19 | AC-64.1 to AC-64.4 (4) |
| US-65 | Keep sessions short-lived and safe | NFR-20 | AC-65.1 to AC-65.5 (5) |
| US-66 | Stop automated abuse | NFR-21 | AC-66.1 to AC-66.5 (5) |
| US-67 | Refuse forged requests | NFR-22 | AC-67.1 to AC-67.3 (3) |
| US-68 | Accept only safe uploads | NFR-23 | AC-68.1 to AC-68.7 (7) |
| US-69 | Block injected scripts and set safe headers | NFR-24 | AC-69.1 to AC-69.6 (6) |
| US-70 | Restrict each admin function to the right people | NFR-25 | AC-70.1 to AC-70.5 (5) |
| US-71 | Ship without secrets or known vulnerabilities | NFR-26 | AC-71.1 to AC-71.4 (4) |
| US-72 | Keep the concept out of search engines | NFR-27 | AC-72.1 to AC-72.5 (5) |
| US-73 | Have the whole site properly translated and laid out in four languages | NFR-28 | AC-73.1 to AC-73.5 (5) |
| US-74 | Use the site on the browsers and devices people actually have | NFR-29 | AC-74.1 to AC-74.4 (4) |
| US-75 | Look and feel like the resort's brand | NFR-30 | AC-75.1 to AC-75.3 (3) |
| US-76 | Run the site at no running cost | NFR-31 | AC-76.1 to AC-76.5 (5) |
| US-77 | Install, configure and check the site easily | NFR-32 | AC-77.1 to AC-77.3 (3) |
| US-78 | Never lose or corrupt confirmed data | NFR-33 | AC-78.1 to AC-78.3 (3) |

## Open questions to requirements

"Affects" is taken from the open question in `docs/requirements.md`. "Marked provisional" lists the requirements that carry a Provisional marker for that question. Provisional acceptance criteria are those whose text carries the marker.

| Open question | Requirements affected | Requirements marked provisional | Acceptance criteria marked provisional |
| --- | --- | --- | --- |
| OQ-1 | FR-34, FR-42, FR-43, FR-44, NFR-25 | FR-34, FR-42, FR-43, FR-44, NFR-25 | AC-32.5, AC-70.2, AC-70.5 |
| OQ-2 | FR-21, FR-34, NFR-31 | FR-21 | AC-14.1, AC-14.2, AC-14.3, AC-14.4 |
| OQ-3 | FR-24, FR-25, NFR-28 | FR-25 | AC-23.1, AC-23.2, AC-23.3 |
| OQ-4 | FR-35, FR-36, FR-39 | FR-35, FR-36 | AC-33.2, AC-34.5 |
| OQ-5 | FR-17, FR-39, NFR-27 | FR-17, FR-39 | AC-20.5, AC-37.4 |
| OQ-6 | FR-38 | FR-38 | AC-36.1, AC-36.2, AC-36.3, AC-36.4 |
| OQ-7 | FR-26, FR-37 | FR-26 | AC-24.1, AC-24.2 |
| OQ-8 | FR-14, FR-15, FR-16, NFR-28 | FR-16 | AC-19.3 |
| OQ-9 | FR-28, FR-1 | FR-28 | AC-26.1, AC-26.2 |
| OQ-10 | FR-45, NFR-17 | FR-45, NFR-17 | AC-43.4, AC-62.3 |
| OQ-11 | FR-22, FR-23, FR-43 | FR-22, FR-23 | AC-15.6, AC-16.1, AC-16.2 |
| OQ-12 | FR-14, NFR-14, NFR-16 | FR-14, NFR-14 | AC-17.4 |
| OQ-13 | FR-47, NFR-27, NFR-31 | FR-47 | none |
| OQ-14 | FR-21, FR-47, FR-48, NFR-10, NFR-31, NFR-32 | FR-47, NFR-10, NFR-31 | AC-55.1, AC-76.4 |
| OQ-15 | FR-11, FR-39 | FR-11 | AC-10.5 |
| OQ-16 | FR-12, FR-19, FR-20 | FR-12 | AC-11.4 |
| OQ-17 | FR-17, FR-18, NFR-30 | FR-17, FR-18 | AC-21.3, AC-75.3 |
| OQ-18 | FR-1 | FR-1 | AC-1.4 |
| OQ-19 | FR-18 | FR-18 | AC-2.3, AC-21.4 |

