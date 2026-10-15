# Project brief: Jazz Casa del Mar resort website

- Client slug: jazz_casa_del_mar
- Project slug: site
- Brief date: 2026-10-15
- Source: intake answers from Steven (acting for the client) in chat on 2026-10-15, plus a review of the current hotel page on jazhotels.com on the same date.
- Agency version: 0.1.1+ef1fb3c

Anything marked **assumption** was inferred by the Orchestrator and needs confirming.

## Client and audience

- Client: Jaz Elite Casa del Mar Beach, a beach resort in Hurghada on the Red Sea, Egypt, part of the JAZ Hotel Group. Steven's words: "Jazz Casa del Mar Hotels - Hotels in Hurghada and the site is for their resort."
- Current site: the resort's page on the group site, https://www.jazhotels.com/hoteldetail/57-egypt-hurghada-jaz-elite-casa-del-mar-beach
- Audience (**assumption**): international leisure travellers (couples and families) researching a Red Sea beach holiday, mostly on mobile, plus travel agents and returning guests.
- Admin users: resort staff who manage site content through an admin portal.

## Goal and primary action

- Goal, in Steven's words: "Modernise and Re-design with high quality, modern, professional UI as well as 3D animations and landing pages and loader pages between pages."
- Primary visitor action (**assumption**): send an enquiry through the Contact Us form. Secondary actions: subscribe to the newsletter, and follow a "Book now" link to the existing JAZ booking engine (see Open questions).

## Scope

### In

The pages and sections of the current hotel page, rebuilt as a dedicated resort site. Steven: "I want to replicate the pages that are on the real website".

- Home / landing: resort overview, key facts, current offer summary, immersive 3D hero
- Rooms and suites: overview plus one page per room type. Room types seen on the current site: Family Suite, Executive Suite, Superior Twin Sea View, Superior Queen Sea View, Triple Deluxe Twin (pool view), Triple Deluxe Queen (pool view)
- Dining: overview plus venues. Venues seen: Aqua Beach Restaurant, Oscar Restaurant, Italian Restaurant, Main Restaurant, French Café, Shisha Lounge, Lobby Bar, Lobby Lounge and Terrace, Twist Pool Bar, Splash Pool Bar
- Pools and beach: infinity pool, relaxing pool, kids' pool, private beach
- Activities and facilities: spa, gym, tennis court, kids' club and playground, entertainment
- Surroundings / location: map and nearby attractions
- Offers: summary of current deals
- Photo gallery
- FAQ
- Contact Us: enquiry form, phone, WhatsApp and map link
- Newsletter sign up
- Admin portal with staff login: edit all content and titles on every page in all four languages, upload photos, read enquiries, export newsletter subscribers
- Loader / transition screens between pages
- Legal pages: privacy notice, cookie notice, terms (**assumption**: needed because of forms and the admin portal)

### Out

- A booking engine, room availability, pricing or online payment (decided: "Book now" links out to the JAZ booking engine)
- JAZ group level content: About JAZ, Destinations, Our Brands, Cruises, Gift Cards, Blogs, mobile app pages (**assumption**: link out to the group site instead)
- Guest user accounts (only staff log in)
- Deployment and hosting; the agency packages the site and Steven or the client hosts it

### Unknown

- Currency selector (**assumption**: out, since no prices are shown)
- Meetings and events pages (not on the current hotel page)

## Content and brand

- Content: Steven: "Use Placeholders - and for 3D models create here." So the agency writes placeholder copy and uses placeholder imagery; the agency creates the 3D models itself.
- Placeholder imagery is royalty free or generated, never copied from jazhotels.com (decided: the project is speculative).
- Brand: Steven: "Use the branding from the current website".
- What the current page shows: theme colour #453536 (dark brown grey), JAZ wordmark, "JAZ go green" and "Green Star" badges, a Tripadvisor Travelers' Choice badge, an upbeat promotional tone with short labels. Fonts and the full palette were not visible from the page text; the UI/UX designer extracts them in Phase 4 and may enhance them for the resort and the hospitality sector.
- Logo files and brand guidelines: not supplied.

## References

- Sites the client likes or dislikes: none given ("N/A").
- Reference: the current resort page above, as the content baseline to modernise.

## Motion appetite

- Steven: "Immersive".
- Expect: an immersive 3D hero (**assumption**: a Red Sea seascape or resort scene), 3D or scroll driven scenes on landing pages, animated loaders and page transitions.
- Bounded by the design standard: respects reduced motion, has a non 3D fallback, and stays within performance budgets on mid range phones.

## Integrations

- Contact Us form
- Newsletter sign up
- Admin portal with logins
- Maps: link to Google Maps (**assumption**: a static map or link to keep running costs low)
- Booking: "Book now" links out to the existing JAZ booking engine (decided)
- Social links (Instagram, Facebook, LinkedIn, X, YouTube) and WhatsApp click to chat
- Analytics: not requested; none planned (no running costs, and a speculative concept)

## Data and legal flags

- Steven first answered "No Personal Data", then decided to keep the forms and accounts and handle the data properly (see Decisions 1).
- Children: not stated. The site advertises a kids' club, but the audience is adults booking for families (**assumption**: the site is not directed at children).
- Sector: Steven: "Hospitality".
- Flags for the UK legal role in Phase 3: UK GDPR and PECR (forms, newsletter consent, cookies), Egyptian data protection law (the operator is in Egypt), consumer protection rules on offers and price claims, accessibility (WCAG 2.2 AA is the agency standard), and trade mark, passing off and copyright risk in using the JAZ name, logo and brand for a speculative concept (see Decisions 2).

## Constraints

- Dates: "No Deadlines".
- Running costs: none once hosted on the client's servers (see Decisions 6).
- Hosting: the client's own servers. Questionnaire not filled in; Steven: "will do after release".
- Languages: English, German, Italian and Russian.
- Devices: no stated limits ("None" to things that must not happen). Agency default: current evergreen browsers, mobile first, graceful fallback where WebGL is unavailable.

## Success measures

- Steven: "Modernised Design and client feedback".
- **Assumption:** measured by the client's review of the release, plus Lighthouse and accessibility scores that meet the agency budgets.

## Decisions from Steven (2026-10-15)

Answers given in chat on 2026-10-15 to the brief's open questions:

1. Personal data: "keep them and handle the data properly, with a privacy notice, consent and retention rules". The contact form, newsletter and admin accounts stay in scope and are treated as personal data under UK GDPR and PECR.
2. Brand and content rights: "Speculative". This is a speculative concept, not commissioned or authorised by JAZ Hotels. Consequences: the build is clearly marked as a concept, all imagery stays placeholder (nothing copied from jazhotels.com), every page is set not to be indexed by search engines, and the agency packages it for local review only.
3. Admin portal: "Edit everything including all elements, titles and everything on the website, upload photos, ead enquiries, export subscribers." ("ead" read as "read".) Number of admin users not stated (**assumption**: a small team, under 10).
4. Booking: "“Book now” link out to the existing JAZ booking engine". No booking engine is built.
5. Languages: "English, German, Italian & Russian". All public content and all admin editable content in four languages (**assumption**: the admin portal interface itself is English only).
6. Running costs: "I don't want any running costs once hosted on their servers". So no paid third party services: newsletter subscribers, enquiries, media and content live in the site's own storage on the client's server, and any email sending uses the client's own mail server (**assumption**).
7. Brand assets: "The designer extract them from the current site - you are welcome to enhance the branding to suit the purpose of the website and the sector that it serves."

## Open questions

1. Number of admin users and whether they need different permission levels (for example editor versus administrator).
2. Whether enquiry notifications should be emailed to staff (needs the client's mail server) or only appear in the admin portal.
3. Which language is the default, and whether the language is chosen automatically from the visitor's browser.
