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
- Admin portal with staff login, to manage site content (see Open questions for exactly what)
- Loader / transition screens between pages
- Legal pages: privacy notice, cookie notice, terms (**assumption**: needed because of forms and the admin portal)

### Out

- A booking engine, room availability, pricing or online payment (**assumption**: the current site hands booking to the group's engine)
- JAZ group level content: About JAZ, Destinations, Our Brands, Cruises, Gift Cards, Blogs, mobile app pages (**assumption**: link out to the group site instead)
- Guest user accounts (only staff log in)
- Deployment and hosting; the agency packages the site and Steven or the client hosts it

### Unknown

- Languages: English only, or also Arabic, German, Russian, Italian and others common for Hurghada visitors
- Currency selector (only relevant if prices are shown)
- Meetings and events pages (not on the current hotel page)

## Content and brand

- Content: Steven: "Use Placeholders - and for 3D models create here." So the agency writes placeholder copy and uses placeholder imagery; the agency creates the 3D models itself.
- **Assumption:** placeholder imagery is royalty free or generated, not copied from jazhotels.com, unless the client confirms rights to its photos.
- Brand: Steven: "Use the branding from the current website".
- What the current page shows: theme colour #453536 (dark brown grey), JAZ wordmark, "JAZ go green" and "Green Star" badges, a Tripadvisor Travelers' Choice badge, an upbeat promotional tone with short labels. Fonts and the full palette were not visible from the page text; the UI/UX designer extracts them in Phase 4.
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
- Booking: "Book now" link to the existing JAZ booking flow (**assumption**)
- Social links (Instagram, Facebook, LinkedIn, X, YouTube) and WhatsApp click to chat
- Analytics: not requested; none planned unless confirmed

## Data and legal flags

- Steven: "No Personal Data". This conflicts with the requested features, see Open questions 1.
- Children: not stated. The site advertises a kids' club, but the audience is adults booking for families (**assumption**: the site is not directed at children).
- Sector: Steven: "Hospitality".
- Flags for the UK legal role in Phase 3: UK GDPR and PECR (forms, newsletter consent, cookies), Egyptian data protection law (the operator is in Egypt), consumer protection rules on offers and price claims, accessibility (WCAG 2.2 AA is the agency standard), and trade mark and copyright in the JAZ name, logo, photos and text (see Open questions 2).

## Constraints

- Dates: "No Deadlines".
- Running costs: "Low Runnings cost". No figure given.
- Hosting: questionnaire not filled in; Steven: "will do after release".
- Devices: no stated limits ("None" to things that must not happen). Agency default: current evergreen browsers, mobile first, graceful fallback where WebGL is unavailable.

## Success measures

- Steven: "Modernised Design and client feedback".
- **Assumption:** measured by the client's review of the release, plus Lighthouse and accessibility scores that meet the agency budgets.

## Open questions

1. **Conflict: personal data.** The answer was "No Personal Data", but a Contact Us form (name, email, message), a newsletter (email) and admin logins (staff accounts) all process personal data. Which do you want: (a) keep the forms and accounts and treat them as personal data, with a privacy notice, consent and retention rules, or (b) avoid collecting data, for example a mailto or WhatsApp link instead of a form, and a third party newsletter tool?
2. **Brand and content rights.** Is Jaz Hotels the actual client and has it authorised use of the JAZ name, logo and branding, or is this a speculative redesign or internal test? If speculative, the agency would mark the build as a concept, keep placeholder imagery, and set it to not be indexed by search engines.
3. **Admin portal scope.** What can staff do: edit pages, rooms, dining and offers, upload images, read contact enquiries, export newsletter subscribers? How many admin users?
4. **Booking.** Should "Book now" link out to the existing JAZ booking engine, or is there no booking action at all?
5. **Languages.** English only, or which other languages?
6. **Running cost ceiling.** A monthly figure, for example "under 20 GBP a month".
7. **Brand assets.** Can you supply the logo files, fonts and colour palette, or should the designer extract them from the current site?
