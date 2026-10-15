# User stories and acceptance criteria: Jazz Casa del Mar resort website

- Task: P2-T1a (Requirements Analyst), amended by P2-T2 after the T1 scope approval
- Source: `docs/requirements.md` (requirements FR-n and NFR-n, open questions OQ-n)
- Format: each story has an ID (US-n) and numbered acceptance criteria (AC-n.m). Every criterion is written as Given / When / Then, is tagged with the requirement or requirements it checks (in square brackets), and can be decided pass or fail by a person or a test without interpretation.
- A criterion marked **Provisional (OQ-n)** depends on an item still listed under "Open after T1" in `docs/requirements.md` (OQ-12, and OQ-22 to OQ-25 for decisions Steven takes at T2) and must be re-checked when it is answered. A criterion shown as **WITHDRAWN** keeps its number but is no longer a requirement of this release. A criterion shown as **MOVED** keeps its number but now lives under another number (for example in the story that carries the built behaviour); neither WITHDRAWN nor MOVED criteria are counted in coverage. Stories marked "Status at T1" are not built in the first release; their criteria apply if the story is reinstated. Priority notes at T1 are the analyst's record only; the backlog belongs to the Product Owner.
- Test data is synthetic only (for example `Test Visitor`, `visitor.one@example.com`, `+44 20 7946 0000`).
- Terms such as R1, L1, 3D mode, fallback mode, four languages and page inventory are defined in the glossary of `docs/requirements.md`.

## Visitor stories: content and navigation

## US-1 Find my way around the site
As a prospective guest, I want a clear menu and footer on every page, so that I can reach any part of the resort site quickly.
Requirements: FR-1, FR-10

- AC-1.1 [FR-1] Given the running site, when a tester requests each of the 21 page URLs in each of the four languages (84 requests), then every response is HTTP 200 and the page contains exactly one `h1`.
- AC-1.2 [FR-1] Given the Home page in each language, when a tester follows only on-page links, then all 21 page types are reached, so no page is reachable only by typing its address.
- AC-1.3 [FR-1] Given the Rooms and suites page, when a tester lists the room page links, then there are exactly six, named Family Suite, Executive Suite, Superior Twin Sea View, Superior Queen Sea View, Triple Deluxe Twin (pool view) and Triple Deluxe Queen (pool view) (translated names allowed in other languages).
- AC-1.4 [FR-1] Given the sitemap of internal links in each language, when a tester searches for a currency selector, a meetings page or an events page, then none exists.
- AC-1.5 [FR-10] Given any public page at a viewport 1280 CSS pixels wide, when a tester inspects the header, then it contains a resort name linking to Home, links to Rooms and suites, Dining, Pools and beach, Activities and facilities, Offers, Gallery, Location and Contact Us, a Book now link and a language switcher.
- AC-1.6 [FR-10] Given any public page at a viewport 390 CSS pixels wide, when a tester loads it, then the navigation links are hidden behind a menu button; and when the tester presses Enter on the focused button, then the links appear and can be reached with the Tab key; and when the tester presses Escape, then the menu closes and focus returns to the button.
- AC-1.7 [FR-10] Given the page for each of the eight header destinations, when a tester inspects the header link for that page, then exactly that link has `aria-current="page"`.
- AC-1.8 [FR-10] Given any public page, when a tester inspects the footer, then it contains the newsletter form, the contact links, the social links that have a value, links to Privacy notice, Cookie notice, Terms, Accessibility statement and Newsletter unsubscribe, and the concept notice.

## US-2 Understand the resort from the Home page
As a prospective guest, I want a Home page that explains the resort and shows the current offers, so that I can decide whether to look further.
Requirements: FR-5

- AC-2.1 [FR-5] Given the Home page in any language, when a tester inspects it, then it contains in this order: the hero with the resort name as the `h1`, a Book now link and a Contact Us link; an overview section; a key facts section; an offers summary; and links to Rooms, Dining, Pools and beach, Activities and facilities, Location and Gallery.
- AC-2.2 [FR-5] Given the Offers page lists offers titled A, B and C, when a tester opens the Home offers summary, then it shows exactly the titles A, B and C in the same order and each links to the Offers page.
- AC-2.3 [FR-5, FR-18] Given the Home page text in any language, when a tester searches the main content text (excluding header, footer and contact details) for digits, then the only numbers found are counts of items named in `docs/requirements.md` (six room types, ten venues, four pools and beach items, five activities) and none states a price, rating, distance or size.

## US-3 Compare rooms and suites
As a prospective guest, I want to see every room type with pictures and features, so that I can choose which one to enquire about.
Requirements: FR-2

- AC-3.1 [FR-2] Given the Rooms and suites page, when a tester counts the cards, then there are six, and each card has a name, one image, a short description and a link to its room page.
- AC-3.2 [FR-2] Given each of the six room pages, when a tester inspects the page, then it has the room name as the `h1`, a description of at least 60 words, at least 3 images, a features list of at least 5 items and a Book now link.
- AC-3.3 [FR-2] Given each room page in each language, when a tester clicks the link on its card from the Rooms page, then the page that opens is the matching room page in the same language.

## US-4 Browse the dining venues
As a prospective guest, I want to see all the restaurants and bars, so that I know what food and drink are on offer.
Requirements: FR-3

- AC-4.1 [FR-3] Given the Dining page, when a tester counts venues, then there are exactly ten, with the names Aqua Beach Restaurant, Oscar Restaurant, Italian Restaurant, Main Restaurant, French Cafe, Shisha Lounge, Lobby Bar, Lobby Lounge and Terrace, Twist Pool Bar and Splash Pool Bar.
- AC-4.2 [FR-3] Given each venue, when a tester inspects it, then it has a name, a description of at least 25 words and one image.
- AC-4.3 [FR-3] Given the address of the Dining page followed by the anchor of any venue, when a tester opens that address, then the browser scrolls to that venue and the venue heading is visible in the viewport.

## US-5 See the pools, beach and activities
As a prospective guest, I want to see the pools, beach, spa and activities, so that I know what there is to do on holiday.
Requirements: FR-4

- AC-5.1 [FR-4] Given the Pools and beach page, when a tester counts items, then there are four: infinity pool, relaxing pool, kids' pool and private beach.
- AC-5.2 [FR-4] Given the Activities and facilities page, when a tester counts items, then there are five: spa, gym, tennis court, kids' club and playground, entertainment.
- AC-5.3 [FR-4] Given every item on both pages, when a tester inspects it, then it has a name, a description of at least 25 words and one image.

## US-6 Find the resort and what is nearby
As a prospective guest, I want to see where the resort is and what is nearby, so that I can plan travel and outings.
Requirements: FR-6

- AC-6.1 [FR-6] Given the Location page, when a tester loads it with network recording on, then a map image is shown and no request goes to any host other than the site's own host.
- AC-6.2 [FR-6] Given the Location page, when a tester activates the Google Maps link, then a new tab opens at a `https://` Google Maps address and the original tab is unchanged.
- AC-6.3 [FR-6] Given the Location page, when a tester counts the nearby attractions, then there are at least 5, each with a name and a description of at least 15 words, and no text on the page states a distance or travel time.

## US-7 See the current offers
As a prospective guest, I want to read the current offers, so that I can see whether a deal suits me.
Requirements: FR-7

- AC-7.1 [FR-7] Given the Offers page, when a tester counts offers, then there are at least 3, each with a title, a description of at least 25 words, the label "Sample offer" in the page language and a Book now link.
- AC-7.2 [FR-7] Given the Offers page in all four languages, when a tester searches the visible text for the characters £, $, €, ₽, the codes EGP, USD, EUR, GBP, RUB, and the symbol %, then there are no matches.
- AC-7.3 [FR-7] Given the offer items on the Offers page (the title, description, "Sample offer" label and Book now link text of every offer) and the offer titles in the Home offers summary, in all four languages, when a tester searches that text for any digit and for any of these terms (whole words, ignoring case), then there are no matches. English: limited time, last chance, last rooms, hurry, countdown, expires, only today. German: nur heute, nur für kurze Zeit, letzte Chance, letzte Zimmer, beeilen. Italian: solo oggi, tempo limitato, ultima occasione, ultime camere, affrettati. Russian: только сегодня, ограниченное время, последний шанс, последние номера, спешите. The page header, footer, contact details and copyright year are not searched.

## US-8 Look through the photo gallery
As a prospective guest, I want to view the resort photos in large size, so that I can judge the place.
Requirements: FR-8

- AC-8.1 [FR-8] Given the Gallery page, when a tester counts the images in the grid, then there are at least 12, and each has non-empty alternative text in the page language.
- AC-8.2 [FR-8] Given the Gallery page, when a tester activates an image with the mouse or with Enter, then a lightbox opens showing the large image, its caption, previous and next controls, a close control and a counter such as "3 of 12".
- AC-8.3 [FR-8] Given an open lightbox, when a tester presses the right arrow, left arrow and Escape keys, then the image advances, goes back and the lightbox closes, and focus returns to the grid image that opened it.
- AC-8.4 [FR-8] Given an open lightbox, when a tester presses Tab 20 times, then focus never leaves the lightbox.

## US-9 Read the frequently asked questions
As a prospective guest, I want to expand questions and read answers, so that I get quick answers without contacting the resort.
Requirements: FR-9

- AC-9.1 [FR-9] Given the FAQ page, when a tester counts the questions, then there are at least 8, each as a button.
- AC-9.2 [FR-9] Given a collapsed question button, when a tester presses Enter or Space, then its answer becomes visible and the button's `aria-expanded` value changes from `false` to `true`; and pressing again reverses this.
- AC-9.3 [FR-9] Given JavaScript turned off in the browser, when a tester opens the FAQ page, then every answer is present and readable.

## US-10 Follow Book now to the JAZ booking engine
As a prospective guest, I want a Book now link to the real booking engine, so that I can make a reservation there.
Requirements: FR-11

- AC-10.1 [FR-11] Given the admin setting for the Book now URL is set to a value, when a tester collects every Book now link across all 84 pages, then every link points to that value.
- AC-10.2 [FR-11] Given any Book now link, when a tester activates it, then it opens in a new tab, the link has `rel="noopener noreferrer"`, and the original tab remains on the concept site.
- AC-10.3 [FR-11] Given any Book now link in each language, when a tester reads its accessible name, then it includes the words for "opens in a new tab" in that language.
- AC-10.4 [FR-11] Given the whole public site, when a tester searches pages and forms for fields for dates, guests, room availability, price or card details, then there are none.
- AC-10.5 [FR-11] Given the initial setting, when a tester reads the Book now URL, then it equals `https://www.jazhotels.com/hoteldetail/57-egypt-hurghada-jaz-elite-casa-del-mar-beach`. (OQ-21 resolved 2026-10-15: keep this default.)
- AC-10.6 [FR-11] Given any page with a Book now link, in each language, when a tester reads the text next to each Book now link, then the label "External site, not connected with this concept" (in the page language) is visible without hover or focus, its computed font size is at least 14 CSS pixels, its contrast meets NFR-4, and the link's `aria-describedby` points to it.

## US-11 Contact the resort by phone, chat or social media
As a prospective guest, I want contact links for phone, WhatsApp, email, map and social media, so that I can reach the resort in the way I prefer.
Requirements: FR-12

- AC-11.1 [FR-12] Given the Contact Us page, when a tester inspects the contact links, then the telephone is a `tel:` link, the WhatsApp link starts `https://wa.me/`, the email is a `mailto:` link, and the Google Maps link is present.
- AC-11.2 [FR-12] Given values set for all five social networks, when a tester views the footer, then it has five links labelled Instagram, Facebook, LinkedIn, X and YouTube, each opening in a new tab with `rel="noopener noreferrer"`.
- AC-11.3 [FR-12] Given the admin setting for LinkedIn is empty, when a tester views the footer, then no LinkedIn link or empty icon is rendered.
- AC-11.4 [FR-12] Given the delivered default settings, when a tester reads them, then the telephone is `+44 20 7946 0000`, the WhatsApp link is `https://wa.me/442079460001`, the email is `info@example.invalid`, each social link is `https://social.example.invalid/` followed by the network name, and the Google Maps link is a `https://` Google Maps address.

## US-12 Land on a helpful page when something goes wrong
As a visitor, I want an understandable error page, so that I can get back to the site when a link is wrong.
Requirements: FR-13

- AC-12.1 [FR-13] Given the address `/de/this-page-does-not-exist`, when a tester requests it, then the response is HTTP 404 and the page is in German, with the header, footer, concept notice and a link to the German Home page.
- AC-12.2 [FR-13] Given a server fault forced by a test hook, when a tester requests a page, then the response is HTTP 500 and the page shows a localised message and none of the following: a stack trace, a file path, a query, a software name or version.

## Visitor stories: forms

## US-13 Send an enquiry to the resort
As a prospective guest, I want to send a message through the Contact Us form, so that the resort can answer my questions.
Requirements: FR-19, FR-20

- AC-13.1 [FR-19] Given the Contact Us form, when a tester inspects it, then it has the fields name, email, telephone (marked optional), subject (the choices "General enquiry", selected by default, and "Data protection request or complaint"), message and a privacy information line next to the send button that links to the Privacy notice; it has no checkbox of any kind and no other field a person can see.
- AC-13.2 [FR-19] Given the form, when a tester submits it empty, then it is not accepted, and an error summary at the top and a message beside each of name, email and message name the field and the problem, in the page language.
- AC-13.3 [FR-19] Given the form, when a tester enters a name of 1 character, an email of `not-an-email`, a telephone of `abc`, a message of 9 characters and a message of 2001 characters in turn, then each is refused with a message naming that field, in browser and on the server (the server check is tested with the browser check bypassed).
- AC-13.4 [FR-19, FR-20] Given the form filled with `Test Visitor`, `visitor.one@example.com`, `+44 20 7946 0000`, and a message of 40 characters, when the tester submits, then a confirmation page in the page language shows a reference matching `ENQ-[A-HJ-NP-Z2-9]{6}` (the 32 character alphabet of FR-20, which also matches the wider contract pattern `ENQ-[A-Z2-9]{6}`).
- AC-13.5 [FR-20] Given the submission in AC-13.4, when an Administrator opens the enquiry list, then an enquiry with that reference exists holding the name, email, telephone, subject, message, page language, time received and privacy information version.
- AC-13.6 [FR-20] Given the hidden spam trap field is filled in by a script, or the form token is altered, when it submits, then no enquiry is stored, the visible retry message of AC-13.10 is shown, the typed values are kept, and the response does not say which test failed.
- AC-13.7 [FR-20] Given JavaScript is turned off, when a tester completes AC-13.4, then the same confirmation is shown.
- AC-13.8 [FR-20] Given the data store is made unavailable by a test hook, when a tester submits a valid form, then an error message is shown, the typed values are still in the fields, and no confirmation or reference is shown.
- AC-13.9 WITHDRAWN at T1 (LR-2: the contact form has no consent tick, see AC-13.1).
- AC-13.10 [FR-20] Given a visitor submits a valid form 1 second after it was displayed, when the server responds, then no enquiry is stored, a visible message in the page language ("We could not send your message. Please check it and send it again.") is shown, every typed value is still in its field and keyboard focus is on the retry message element (the element with `role="alert"` at the top of the form, which has `tabindex="-1"`); and when the visitor sends again 2 or more seconds later, then the enquiry is stored and the confirmation is shown.
- AC-13.11 [FR-19, FR-20] Given the subject "Data protection request or complaint" is chosen and the form is otherwise valid, when it is submitted, then the stored enquiry has that subject.
- AC-13.12 [FR-20, NFR-14] Given an Administrator changes the privacy information line of the contact form and saves, when one visitor posts a form that was displayed before the save and another posts a form displayed after it, then each stored enquiry carries the wording version of the text on the page that visitor was shown, and the earlier version's archived text is unchanged and can still be read.
- AC-13.13 [FR-20] Given a test hook that makes the first generated reference collide with an existing one, when a valid form is submitted, then the enquiry is stored with a different reference, the visitor sees one confirmation and one reference, and exactly one new enquiry exists.

## US-14 Let staff know by email when an enquiry arrives (optional)
As resort staff, I want an email when a new enquiry arrives, so that I can reply quickly without watching the admin portal.
Requirements: FR-21
Status at T1: not built this release (Won't; OQ-2 settled as admin portal only, no email). These criteria apply only if the story is reinstated.

- AC-14.1 [FR-21] Given no mail server is configured, when a tester submits a valid enquiry, then the enquiry is stored, the confirmation is shown and no email is attempted.
- AC-14.2 [FR-21] Given a test mail server and a staff address are configured, when a tester submits a valid enquiry, then exactly one email arrives at the staff address that contains the reference, the date and a link to the enquiry in the admin portal.
- AC-14.3 [FR-21] Given the email in AC-14.2, when a tester searches its subject and body, then the visitor's name, email address, telephone and message text do not appear.
- AC-14.4 [FR-21] Given the test mail server refuses the message, when a tester submits a valid enquiry, then the enquiry is still stored and the confirmation is still shown.
- AC-14.5 [FR-21] Given FR-21 is built and an SMTP host is configured, when a tester inspects the connection and the product, then the connection uses implicit TLS or required STARTTLS with certificate verification, and the SMTP credentials appear nowhere in the admin portal, application logs, error pages or backup archives.

## US-15 Subscribe to the newsletter
As a prospective guest, I want to sign up for the newsletter, so that I hear about offers.
Requirements: FR-22

- AC-15.1 [FR-22] Given the footer form on any public page, when a tester inspects it, then it has an email field and an unticked consent checkbox whose text names the controller (a clearly marked placeholder such as "[controller to be confirmed]"), says the address will be used to send the resort's newsletter and that unsubscribing is possible at any time, and links to the Privacy notice. Provisional (OQ-12).
- AC-15.2 [FR-22] Given the tester enters `visitor.two@example.com` and ticks consent, when the tester submits, then a confirmation message is shown in the page language, and an Administrator sees one subscriber with that address, the page language, the time, the consent wording version and status "active".
- AC-15.3 [FR-22] Given the same address is submitted a second time, when the tester submits, then the same confirmation message is shown and the subscriber list still has one record for it.
- AC-15.4 [FR-22] Given the consent box is unticked, or the address is `visitor.two@example` or longer than 254 characters, when the tester submits, then nothing is stored and a message names the problem.
- AC-15.5 [FR-22] Given JavaScript is turned off, when a tester completes AC-15.2, then the same result occurs.
- AC-15.6 WITHDRAWN at T1 (OQ-11 settled as single opt in; no confirmation email is sent).
- AC-15.7 [FR-22] Given 50 sign ups for an address that is already subscribed and 50 for new addresses, when a tester compares the median response times, then they differ by at most 100 ms.
- AC-15.8 [FR-22] Given the sign-up form is submitted with the spam trap field filled in, or 1 second after it was displayed, or with an altered form token, when it is submitted, then nothing is stored, a visible retry message in the page language is shown with the typed address kept, and a resubmission 2 or more seconds later is accepted.
- AC-15.9 [FR-22] Given `visitor.two@example.com` is subscribed, when a tester submits ` Visitor.Two@Example.COM ` (with a surrounding space and capital letters), then the same confirmation is shown and the subscriber list still has one record for it.
- AC-15.10 [FR-22, FR-23] Given `visitor.two@example.com` unsubscribed 10 days ago and a suppression entry exists, when a tester signs up that address with consent ticked, then the same confirmation message is shown, no subscriber record is created, and a sign up of a never-seen address still creates a record. Provisional (OQ-22).

## US-16 Unsubscribe from the newsletter
As a subscriber, I want to unsubscribe easily, so that I stop receiving the newsletter.
Requirements: FR-23

- AC-16.1 [FR-23] Given an active subscriber `visitor.two@example.com`, when a tester enters that address on the unsubscribe page and confirms, then the record's status is "unsubscribed" and it no longer appears in the default export (US-41).
- AC-16.2 [FR-23] Given the address `nobody@example.com` is not subscribed, when a tester enters it and confirms, then the page shows the same result message as in AC-16.1.
- AC-16.3 [FR-23] Given JavaScript is turned off, when a tester completes AC-16.1, then the same result occurs.
- AC-16.4 [FR-23] Given 50 unsubscribes for a subscribed address and 50 for an address that is not subscribed, when a tester compares the median response times, then they differ by at most 100 ms.
- AC-16.5 [FR-23] Given `visitor.two@example.com` is subscribed, when a tester enters ` VISITOR.TWO@example.com ` on the unsubscribe page, then its status becomes "unsubscribed".
- AC-16.6 [FR-23] Given the unsubscribe form is submitted with the spam trap field filled in, or 1 second after it was displayed, or with an altered form token, when it is submitted, then no record changes, a visible retry message is shown with the typed address kept, and a resubmission 2 or more seconds later is accepted.

## US-17 Understand how my data is used
As a visitor, I want a plain privacy notice in my language, so that I know what happens to my details.
Requirements: FR-14

- AC-17.1 [FR-14] Given the Privacy notice in each language, when a tester checks it against the list in FR-14, then it contains each of: the controller and contact (a marked placeholder until Q3); each purpose; the lawful basis per purpose (a basis other than consent for enquiries) and the legitimate interests pursued wherever legitimate interests is the basis; the data collected by each form; which fields are required and what happens if they are not given; the right to withdraw consent and how; recipients; storage location and transfers; the retention period per category; that deleted data can remain in backups for up to 35 days; the individual's rights and how to use them; how to complain to the controller; the right to complain to the Information Commission (formerly the Information Commissioner's Office); and a statement that no analytics, advertising or tracking cookies are used.
- AC-17.2 [FR-14, NFR-17] Given the retention periods stated in the Privacy notice, when a tester compares them with the configured values, then every period matches.
- AC-17.3 [FR-14] Given any public page and each form, when a tester looks for the Privacy notice link, then the footer has one on every page and the contact form's privacy information line and the newsletter form's consent text each have one.
- AC-17.4 [FR-14] Given the controller name in the Privacy notice, when a tester reads it, then it is a placeholder visibly marked "to be confirmed" until the solicitor's answer to Q3 is recorded, and the controller named in that answer afterwards. Provisional (OQ-12).
- AC-17.5 [FR-14, FR-19, FR-42] Given the Privacy notice, when a tester follows its route for data protection complaints, then it leads to the Contact Us page where the subject "Data protection request or complaint" can be chosen, and the notice states that the complaint is acknowledged within 30 days of receipt.

## US-18 Know what my browser stores
As a visitor, I want to see exactly what cookies and storage the site uses, so that I can trust it.
Requirements: FR-15

- AC-18.1 [FR-15] Given the Cookie notice in each language, when a tester reads it, then every row has a name, purpose, category, lifetime and the pages that set it.
- AC-18.2 [FR-15] Given a tester visits all 84 public pages with the browser's storage inspector open, when the visits are complete, then the cookies and storage items present are exactly those listed in the notice (the notice lists none for the public site other than the optional pause-motion item in session storage).

## US-19 Read the terms, the accessibility statement and what this concept is
As a visitor, I want to know the terms of use, how accessible the site is, and that this is a concept, so that I am not misled.
Requirements: FR-16

- AC-19.1 [FR-16] Given the Terms page in each language, when a tester reads the section "About this concept", then it says the site is an unofficial speculative concept, is not operated, authorised or endorsed by JAZ Hotels or Jaz Elite Casa del Mar Beach, uses placeholder images and text, and does not accept bookings.
- AC-19.2 [FR-16] Given the Accessibility statement in each language, when a tester reads it, then it states the target WCAG 2.2 level AA, the date it was last reviewed, a section of known limitations (which may say "none known"), and a way to report a problem.
- AC-19.3 [FR-16] Given the content register in the package, when a tester lists its entries, then each of the Privacy notice, Cookie notice, Terms and Accessibility statement in each of German, Italian and Russian (12 entries) is recorded with the status "not reviewed by a qualified person".
- AC-19.4 [FR-16, FR-39] Given the Terms page in each language, when a tester reads the section "Who runs this site", then it shows the provider's legal name, geographic address, contact email, trade register name and number, supervisory authority, professional details and VAT number, each as the value in settings or the marked placeholder "to be confirmed".

## US-20 See clearly that this is a concept
As a visitor or reviewer, I want every page to say it is a concept, so that nobody mistakes it for the real resort site.
Requirements: FR-17

- AC-20.1 [FR-17] Given any public page, error page, form result page or admin screen on load, when a tester views the first screen without scrolling at 1280 and at 390 CSS pixels wide, then the concept notice is visible and begins with the fixed concept sentence in the page language (English on admin screens), and the same notice appears again in the footer.
- AC-20.2 [FR-17] Given any page loaded with JavaScript on and with JavaScript off, when a tester inspects the concept notice element, then it is present, displayed and has a non-zero size, its computed position is static or relative (not fixed or sticky), and it contains no button, link, input or other focusable element.
- AC-20.3 [FR-17] Given a viewport 390 CSS pixels wide and no optional sentence set, when a tester measures the notice in each language, then its height is at most 48 CSS pixels. Provisional (OQ-24).
- AC-20.4 [FR-17, FR-35] Given any page in any language, when a tester reads the browser title, then it ends with a space, a vertical bar, a space and the title suffix for that language (Concept, Konzept, Concept, Концепт); and given an Administrator saves a page title of "Test Title" or an empty page title, then the public browser title is "Test Title" followed by the suffix, or the default page title followed by the suffix, and never lacks the suffix.
- AC-20.5 [FR-17, FR-39] Given the settings screen, when a tester looks for a field that edits the fixed concept sentence, then there is none; and given an Administrator saves an optional sentence of 200 characters, then it appears after the fixed sentence on every page in that language; and given 201 characters or any markup, then the save is refused with a message; and given the optional sentence is empty, then only the fixed sentence is shown.
- AC-20.6 [FR-17, NFR-4] Given the concept notice in each language, when a tester measures its computed font size at 375 and at 639 CSS pixels wide, then it is at least 13 CSS pixels, and at 640 and at 1280 CSS pixels wide it is at least 14 CSS pixels; and its text contrast against its background is at least 4.5 to 1. Provisional (OQ-24).

## US-21 Be sure all content is placeholder content
As the agency and the client, we want all content to be demonstrably placeholder content, so that no one's rights are infringed.
Requirements: FR-18

- AC-21.1 [FR-18] Given the licence register, when a tester lists every image, font and 3D input file (model, texture, HDR environment map, material and generated asset) in the release package, then each has an entry with source, licence and date, and no entry has the licence "unknown".
- AC-21.2 [FR-18] Given the whole public site and the package, when a tester searches file contents and recorded network requests for the host name `jazhotels.com`, then it appears in no image address, font address, script or stylesheet, and no request is made to it while pages load. (The Book now link, if set to a jazhotels.com address, is exempt because it is a link and not a request.)
- AC-21.3 [FR-18] Given the visible text of all 84 public pages other than the Privacy notice, Cookie notice, Terms, Accessibility statement, Newsletter unsubscribe and error pages (which may need words such as "expires" or "certified" for cookie lifetimes and legal statements), when a tester searches it for every term in the Forbidden claims list (whole words, ignoring case, in the language of the page), then there are no matches; and given every image file of all 84 pages, when a tester inspects each by file name and by eye for a logo or badge of JAZ or Tripadvisor, then there is none (this image check has no page exemption).
- AC-21.4 [FR-18] Given the dated list of hashes of every sequence of 8 consecutive words in the text of the current resort page that the package ships (generated before release, FR-18), and, when the live resort page is reachable at test time, a list freshly generated from it, when a tester hashes every 8 word sequence of the English public text and compares it with each list, then no hash is in either list; and if the live page is unreachable, then the comparison with the fresh list is skipped and the test report says so and states the date of the shipped list.
- AC-21.5 [FR-18] Given the main content of every page other than the Privacy notice, Cookie notice, Terms, Accessibility statement, Newsletter unsubscribe and error pages, in all four languages (excluding header, footer, contact details, form hints and the gallery counter), when a tester extracts every digit sequence, then each is a count of 4, 5, 6 or 10 used to count items the page lists, list numbering, or a copyright year, and none states a size, distance, time or capacity.

## Visitor stories: languages

## US-22 Read the site in my own language
As an international guest, I want to switch between English, German, Italian and Russian, so that I can read in the language I am most comfortable with.
Requirements: FR-24

- AC-22.1 [FR-24] Given any public page, when a tester opens the language switcher, then it lists English, Deutsch, Italiano and Русский, each in its own language, and marks the current one.
- AC-22.2 [FR-24] Given the German Dining page, when a tester chooses Italiano, then the Italian Dining page opens; and given a page that does not exist in the chosen language, then the Italian Home page opens.
- AC-22.3 [FR-24] Given each page in each language, when a tester reads the `lang` attribute of the `html` element, then it equals `en`, `de`, `it` or `ru` to match the page language.
- AC-22.4 [FR-24] Given the four language versions of one page, when a tester compares their addresses, then each language has its own path and no two are the same.
- AC-22.5 [FR-24] Given the contact form, newsletter form, confirmation pages, error pages and error messages, when a tester uses them in each language, then all their text is in that language.

## US-23 Arrive in a sensible language
As an international guest, I want the site to open in my browser's language, so that I do not have to look for the switcher first.
Requirements: FR-25

- AC-23.1 [FR-25] Given a request to the site root with `Accept-Language: de-DE,de;q=0.9,en;q=0.5`, when the tester sends it, then the response redirects to the German Home page.
- AC-23.2 [FR-25] Given `Accept-Language: fr-FR,fr;q=0.9`, or no header, when the tester sends the request, then the response redirects to the English Home page.
- AC-23.3 [FR-25] Given `Accept-Language: ru,en;q=0.5` and a visitor who then switches to English, when the visitor follows links, then every page stays in English, and the site has set no cookie.

## US-24 Never see a blank where text should be
As a visitor, I want text to appear even if a translation is missing, so that the page is never broken.
Requirements: FR-26

- AC-24.1 [FR-26] Given the Russian value of one page heading is removed in the admin portal and saved, when a tester opens that page in Russian, then the heading shows the English text and its element has `lang="en"`.
- AC-24.2 [FR-26] Given the Italian values of a button label and a paragraph are removed, when a tester opens the Italian page, then no button or paragraph is empty.

## Visitor stories: 3D and motion

## US-25 Be drawn in by the 3D hero
As a prospective guest, I want an immersive 3D opening on the Home page, so that I get a feel for the Red Sea setting.
Requirements: FR-27

- AC-25.1 [FR-27] Given the Home page in 3D mode on R1, when a tester loads it, then a canvas renders a 3D scene behind the hero text and the first rendered frame appears (see NFR-8 for timing).
- AC-25.2 [FR-27] Given a desktop browser, when a tester moves the mouse across the hero, then the scene's view changes in response; and given R1, when a tester drags a finger on the hero or tilts the phone, then the view changes, and a vertical swipe starting on the hero still scrolls the page.
- AC-25.3 [FR-27] Given the hero, when a tester selects the heading, text and links with a text cursor or the browser's accessibility tree, then they are real page elements and not part of the canvas.
- AC-25.4 [FR-27] Given the scene has not yet rendered its first frame, or the page is in fallback mode, when a tester views the hero, then a static poster image of the scene fills the same area with no change in page layout when the scene appears (layout shift caused by the swap is 0).
- AC-25.5 [FR-27] Given R2 (iOS Safari) and the Home page, when a tester loads the page without granting motion permission, then no permission prompt appears until the tester taps the labelled control, touch drag changes the view, and denying the prompt leaves touch drag working.

## US-26 Experience motion on each section page
As a prospective guest, I want each main section to open with its own scene, so that browsing feels immersive and varied.
Requirements: FR-28

- AC-26.1 [FR-28] Given the Rooms and suites, Dining, Pools and beach, Activities and facilities and Location pages loaded in 3D mode, when a tester loads each, then each shows a 3D scene (a canvas rendered by the 3D engine, which may be driven by scrolling) whose top edge lies within the first viewport height of the page.
- AC-26.2 [FR-28] Given each of those pages in fallback mode, when a tester loads it, then a static image replaces the scene and no scene code or 3D asset is requested.
- AC-26.3 [FR-27, FR-28] Given the Home page and the five section pages, when a tester lists the root .glb file or scene module requested by each, then there are six different files and no two pages request the same root file.

## US-27 See a loader and smooth transitions between pages
As a visitor, I want a branded loader and a transition between pages, so that moving around feels polished, not abrupt.
Requirements: FR-29

- AC-27.1 [FR-29] Given a first visit in a new tab on L1 (where the page is not ready within 300 ms), when a tester loads the site, then a loader with the resort name shows and disappears at the moment the main heading text is painted, the hero poster has decoded and the above-the-fold fonts are loaded, whether or not the 3D scene has drawn a frame.
- AC-27.2 [FR-29] Given the Home page, when a tester activates the Rooms link, then a transition screen with the resort name and a progress or motion indicator appears and then the Rooms page shows; the browser address and title update to Rooms.
- AC-27.3 [FR-29] Given a transition has completed, when a tester inspects the keyboard focus, then focus is on the new page's main heading; and when the tester presses the browser back button, then the previous page returns with the previous address.
- AC-27.4 [FR-29] Given the loader or a transition is showing, when a tester inspects it with a screen reader, then it announces "Loading" (translated) and the announcement stops when the page appears.
- AC-27.5 [FR-29] Given the network is stalled by a test hook so the next page's 3D assets never finish, when 8 seconds have passed since the transition began, then the page is shown with the poster image and the loader is gone.
- AC-27.6 [FR-29] Given JavaScript is turned off, when a tester follows a link, then the browser loads the target page normally with no transition.
- AC-27.7 [FR-29] Given a tester moved from Home to Rooms and then pressed the browser back button, when the tester presses the browser forward button, then the Rooms page is shown again with its address and title, a transition completes, and focus is on the Rooms main heading.
- AC-27.8 [FR-29, NFR-9] Given L1 and the Home page, when a tester records the time the loader disappears and the time of the first 3D frame, then the loader is gone before the first 3D frame (or when 3D is not running), and the scene then fades in over the visible page without the loader reappearing.

## US-28 Pause the motion
As a visitor who finds motion distracting, I want a control to pause it, so that I can read in peace.
Requirements: FR-30

- AC-28.1 [FR-30] Given any page with a 3D scene, a scroll-driven scene or a looping effect, when a tester tabs through the page, then a control labelled in the page language to pause motion can be focused and operated with Enter or Space, and its state (paused or running) is exposed to assistive technology.
- AC-28.2 [FR-30] Given the control is activated, when a tester watches the page for 10 seconds, then the 3D scene shows no frame change, no CSS animation or scroll-driven effect runs, and a following link click swaps pages with no transition animation.
- AC-28.3 [FR-30] Given motion is paused, when the tester reloads the page in the same tab, then motion remains paused: the poster is shown, no 3D code or asset is requested, a visible Resume control is present, and the session storage item `jcdm-motion-paused` has the value `1`; and when the tester opens the site in a new browser session, then motion runs again.
- AC-28.4 [FR-30] Given a page with no motion longer than 5 seconds, when a tester looks for the control, then it is not required.
- AC-28.5 [FR-30, NFR-12] Given a running 3D scene, when the tester activates Pause in the middle of the page, then the canvas keeps its last frame on screen (no blank, no switch to the poster) and the page does not enter fallback mode; and when the tester activates Resume after a reload while paused, then the scene loads and runs as on a fresh page and the session storage item is removed.

## US-29 Receive 3D content the agency created
As the client, I want the 3D models made by the agency and delivered with their sources, so that we own them and can change them later.
Requirements: FR-31

- AC-29.1 [FR-31] Given the release package, when a tester lists the 3D files, then every one is a `.glb` file with geometry compression, and each has a source file (for example a Blender project) in the package.
- AC-29.2 [FR-31] Given the package, when a tester opens the authorship and licence statement, then it states that all models were created by the agency and lists no third-party model.
- AC-29.3 [FR-31] Given the Home page and the Dining page loaded separately with network recording on, when a tester lists the 3D assets requested, then each page requests only its own scene's assets.
- AC-29.4 [FR-31, FR-18] Given the authorship and licence statement and the licence register, when a tester lists every 3D input (models, textures, HDR environment maps, materials and generated assets) in the package, then each is listed in both, with an author or licence.

## Admin stories

## US-30 Sign in and out of the admin portal
As a member of resort staff, I want to sign in to a private admin area, so that only authorised people can change the site.
Requirements: FR-32

- AC-30.1 [FR-32] Given a person who is not signed in, when they request the admin portal path and any admin screen or admin data address, then they are sent to the sign in page or refused, and no admin content is returned.
- AC-30.2 [FR-32] Given an existing account, when a tester signs in with the correct email address and password (and, only if two-step verification is built, a valid code), then the admin home screen shows.
- AC-30.3 [FR-32] Given the sign in page, when a tester submits a wrong password for an existing account and then a non-existing email address, then both attempts show exactly the same message, which does not say which part was wrong.
- AC-30.4 [FR-32] Given a signed in user, when they select Sign out and then press the browser back button and reload, then no admin content is shown, and replaying the old session cookie against an admin address is refused.
- AC-30.5 [FR-32] Given a fresh install and the delivered package, when a tester searches the package and the database for accounts and default passwords, then there are none.
- AC-30.6 [FR-32] Given the admin portal, when a tester reads all of its screens, then the interface text is in English.
- AC-30.7 [FR-32] Given an account that signed in successfully on an earlier day and has had 2 failed attempts since, when it signs in, then the portal shows the time of that previous successful sign in and "2 failed attempts since".

## US-31 Protect my account with a second step
As a member of resort staff, I want a one-time code as well as my password, so that a stolen password is not enough.
Requirements: FR-33
Status at T1: not built this release (Won't; accepted for local review with synthetic data). The compensating control is AC-63.2 (G-22). Promote to Must before any hosting. Criteria apply if the story is reinstated.

- AC-31.1 [FR-33] Given an account without enrolment, when a tester signs in with a correct password, then the portal shows only the enrolment screen with a code to scan or type into a free TOTP authenticator, and no other screen is reachable until a valid code is entered.
- AC-31.2 [FR-33] Given enrolment is completed, when the portal shows recovery codes, then there are exactly 10, each is shown once, and a search of the database finds no recovery code in readable form.
- AC-31.3 [FR-33] Given an enrolled account, when a tester signs in with the correct password and a wrong or expired code, then access is refused with a generic message; and a correct current code is accepted once only (re-using the same code within its validity is refused).
- AC-31.4 [FR-33] Given a recovery code, when a tester uses it in place of a code, then sign in succeeds and that recovery code can never be used again.
- AC-31.5 [FR-33] Given an Administrator resets another account's enrolment, when that account next signs in, then it must enrol again.

## US-32 Manage staff accounts
As the resort's administrator, I want to add and remove staff accounts, so that the right people have access.
Requirements: FR-34

- AC-32.1 [FR-34] Given a signed in Administrator, when they create an account with the email `admin.two@example.com` and a temporary password, then the new user can sign in, is forced to change the password at first sign in, and can then use every admin function.
- AC-32.2 [FR-34] Given an account, when an Administrator disables it, then its next request is refused and its sign in is refused until enabled; and deleting it removes it from the account list.
- AC-32.3 [FR-34] Given only one active Administrator, when that Administrator tries to delete or disable their own account, then the action is refused with a message.
- AC-32.4 [FR-34] Given a user who forgot their password, when an Administrator sets a new temporary password for them, then the user can sign in with it without any email being sent.
- AC-32.5 WITHDRAWN at T1 (OQ-1 settled as one Administrator role; there is no Editor role to restrict).
- AC-32.6 [FR-34, NFR-20] Given any user, when they use Change password with the current password and a new valid password, then all of the account's sessions, including the current one, end immediately, the sign in form is shown, and the user can sign in with the new password and not with the old.
- AC-32.7 [FR-34] Given an existing account, when a tester runs the documented server side password reset command and signs in with the temporary password it prints, then sign in succeeds and a password change is forced.
- AC-32.8 [FR-34] Given an account locked by 5 failed attempts, when a tester runs the documented unlock command for it, then the next sign in with the correct password succeeds within the lock period.

## US-33 Edit every piece of text in every language
As a member of resort staff, I want to edit all the words on the site in four languages, so that the site always says what we want.
Requirements: FR-35

- AC-33.1 [FR-35] Given an Administrator on the Home page edit screen, when they change the English hero heading and the German hero heading and save, then the public English Home page and the public German Home page show the new headings.
- AC-33.2 [FR-35] Given the list of editable text in FR-35, when a tester walks through each type (page headings and titles, body text, button and link labels, navigation labels, footer text, form labels, help text, validation messages, confirmation messages, browser title, meta description, legal pages, concept notice, image alt text, captions), then each type has an edit field for each of the four languages.
- AC-33.3 [FR-35] Given a body text field, when a tester enters bold, italic, a link, a list and a `<script>` tag, then bold, italic, link and list are kept and the script tag is removed or shown as plain text and never runs on the public page.
- AC-33.4 [FR-35] Given a Russian text in the field, when a tester saves and reopens it, then the text is unchanged, character for character.
- AC-33.5 [FR-35] Given every edit screen, when a tester looks for a control that changes page layout, navigation structure, colours, fonts or 3D scene settings, then there is none.

## US-34 Add, remove and reorder items in lists
As a member of resort staff, I want to manage the venues, offers, FAQ questions and other lists, so that the site stays current.
Requirements: FR-36

- AC-34.1 [FR-36] Given the offers list, when an Administrator adds an offer with a title and description in English and saves, then the new offer shows on the public Offers page and in the Home offers summary.
- AC-34.2 [FR-36] Given the FAQ list with items A, B, C, when an Administrator moves C to the first place and saves, then the public FAQ shows C, A, B.
- AC-34.3 [FR-36] Given a list item, when an Administrator selects Delete, then a confirmation names the item, and the item is deleted only after the Administrator confirms.
- AC-34.4 [FR-36] Given the gallery has 12 images, when an Administrator removes one, then the delete succeeds and the edit screen shows a warning that the gallery has fewer than the minimum of 12.
- AC-34.5 [FR-36] Given the lists named in FR-36 (rooms, dining venues, pools and beach items, activities and facilities items, offers, gallery images, FAQ questions, nearby attractions, room features), when a tester looks for a manage screen for each, then there is one for each.
- AC-34.6 [FR-36] Given the rooms list, when a tester looks for Add and Delete controls, then there are none for room types, and each of the six room entries can be edited. (OQ-20 resolved 2026-10-15: no seventh room type.)

## US-35 See which translations are missing
As a member of resort staff, I want to see what is not yet translated, so that I can complete all four languages.
Requirements: FR-37

- AC-35.1 [FR-37] Given a page whose Russian title is empty and other languages complete, when an Administrator opens the page's edit screen, then it shows "3 of 4 languages complete" and the four language values side by side.
- AC-35.2 [FR-37] Given the missing translations screen, when an Administrator filters by Russian, then it lists every field with no Russian value and no field that has one.
- AC-35.3 [FR-37] Given a field is filled in for the missing language and saved, when the Administrator reloads the missing translations screen filtered by that language, then the field is no longer listed.
- AC-35.4 [FR-37] Given a photo with alt text in all four languages and no caption in any language, when an Administrator opens the missing translations screen, then the photo adds no entry; and given the photo has an English caption and no Russian caption, then exactly one entry (Russian caption) is listed; and given the photo has no Russian alt text, then one entry (Russian alt text) is listed.

## US-36 Preview and publish changes safely, with version history
As a member of resort staff, I want to preview my changes before the public sees them, publish them as a separate step and restore an earlier version, so that mistakes can be undone.
Requirements: FR-38
Status at T1: not built this release (Won't; OQ-6 settled as edits live on save). Draft, preview, publish step and version history are not built. Both of its original criteria are WITHDRAWN and the five built live on save criteria have MOVED to US-81 (FR-38). The story is kept so the T1 record stays literal.

- AC-36.1 WITHDRAWN at T1 (OQ-6: there is no draft or preview).
- AC-36.2 MOVED to AC-81.1 (OQ-6: the built live on save behaviour is carried by US-81; US-36 keeps only the parts that are Won't).
- AC-36.3 WITHDRAWN at T1 (OQ-6: there is no version history).
- AC-36.4 MOVED to AC-81.2 (OQ-6: the built live on save behaviour is carried by US-81; US-36 keeps only the parts that are Won't).
- AC-36.5 MOVED to AC-81.3 (OQ-6: the built live on save behaviour is carried by US-81; US-36 keeps only the parts that are Won't).
- AC-36.6 MOVED to AC-81.4 (OQ-6: the built live on save behaviour is carried by US-81; US-36 keeps only the parts that are Won't).
- AC-36.7 MOVED to AC-81.5 (OQ-6: the built live on save behaviour is carried by US-81; US-36 keeps only the parts that are Won't).

## US-37 Keep contact details and site-wide settings up to date
As a member of resort staff, I want one place to change phone numbers, links and the Book now address, so that every page stays correct.
Requirements: FR-39

- AC-37.1 [FR-39] Given the settings screen, when an Administrator changes the Book now URL to `https://example.com/book` and the telephone number to `+44 20 7946 0001` and saves, then every Book now link and every telephone link on the public site uses the new values within 60 seconds.
- AC-37.2 [FR-39] Given the Book now URL field, when an Administrator enters `http://example.com`, `javascript:alert(1)`, `https://user:pw@example.com`, an empty value or a URL of 2,049 characters, then each save is refused with a message.
- AC-37.3 [FR-39] Given the telephone field, when an Administrator enters `call me`, then the save is refused with a message.
- AC-37.4 [FR-39, FR-17] Given the settings screen and the configuration file, when a tester looks for any setting that hides the concept notice, edits the fixed concept sentence or the title suffix, or changes the robots rules, then there is none.
- AC-37.5 [FR-39] Given the telephone and WhatsApp fields, when an Administrator enters `+44 20 7946 0001`, then the save is accepted; and when the Administrator enters `+44-20-7946-0001`, `4420abc` or `++44`, then each save is refused; and given the email field, `not-an-email` is refused.
- AC-37.6 [FR-39, FR-16] Given the provider details in settings, when a tester reads them on a fresh install, then each shows the marked placeholder "to be confirmed"; and when an Administrator saves the legal name `Test Provider Ltd`, then the Terms page in every language shows it within 60 seconds.
- AC-37.7 [FR-39] Given the Google Maps link field and each of the five social link fields (Instagram, Facebook, LinkedIn, X, YouTube), when an Administrator enters `https://example.com/page`, then the save is accepted; and when the Administrator enters `http://example.com`, `javascript:alert(1)`, `https://user:pw@example.com` or a URL of 2,049 characters, then each save is refused with a message naming the field; and when a social link field is left empty, then the save is accepted and no link for that network is shown (AC-11.3), while an empty Google Maps link is refused.

## US-38 Upload and manage photos
As a member of resort staff, I want to upload photos and describe them in four languages, so that the gallery and pages show our pictures.
Requirements: FR-40

- AC-38.1 [FR-40] Given a signed in Administrator, when they select 3 valid photos in one upload, then all 3 appear in the library with thumbnail, name, size, upload date and an empty "used on" list.
- AC-38.2 [FR-40] Given an uploaded photo, when the Administrator enters alt text and caption in each of the four languages and saves, then the values are stored and shown on a public page that uses the photo.
- AC-38.3 [FR-40] Given a photo with no alt text in the default language, when the Administrator tries to add it to a public page, then it is refused with a message.
- AC-38.4 [FR-40] Given a photo used on the Home page, when an Administrator selects Delete, then the delete is refused with a message listing the Home page, and the photo remains.
- AC-38.5 [FR-40] Given a photo used on two pages, when the Administrator replaces the file with another valid photo, then both pages show the new photo.
- AC-38.6 [FR-40] Given 21 files chosen in one upload, when the Administrator submits, then the upload is refused with a message stating the limit of 20.

## US-39 Have uploaded photos prepared automatically
As a member of resort staff, I want large photos to be resized automatically, so that the site stays fast without me editing them.
Requirements: FR-41

- AC-39.1 [FR-41] Given a valid 4000 pixel wide, 8 MB test photo, when an Administrator uploads it, then copies at 480, 768, 1280 and 1920 pixels wide exist in AVIF and WebP formats (8 files), and a 1000 pixel wide photo gets copies at 480 and 768 and no copy wider than 1000.
- AC-39.2 [FR-41] Given a test photo with GPS coordinates and a camera name in its metadata, when a tester downloads any public copy and inspects it, then it contains no GPS data and no camera data.
- AC-39.3 [FR-41] Given the original upload, when a tester requests its stored location from the public site, then the response is HTTP 404 or 403.
- AC-39.4 [FR-41] Given a public page showing a photo, when a tester inspects the image element, then it has `srcset`, `sizes`, `width` and `height`, and `loading="lazy"` unless the photo is in the first screen.
- AC-39.5 [FR-41] Given a test photo taken with a rotated camera orientation, when a tester views the public copy, then it is the right way up.

## US-40 Read enquiries
As a member of resort staff, I want to read the enquiries visitors send, so that I can reply to them.
Requirements: FR-42

- AC-40.1 [FR-42] Given 60 enquiries exist, when an Administrator opens the enquiries screen, then the 25 newest are listed first, with 25 per page and 3 pages.
- AC-40.2 [FR-42] Given a new enquiry, when the Administrator views the main screen, then an unread count including it is shown; and when the Administrator opens the enquiry and the portal shows it, then the portal sends an explicit mark-as-read request, and the count falls by one.
- AC-40.3 [FR-42] Given an enquiry, when the Administrator marks it Handled, then it shows in the Handled filter and not in the Unhandled filter, and can be set back.
- AC-40.4 [FR-42] Given enquiries from `Test Visitor` and `Other Visitor`, when the Administrator searches by `ENQ-` reference, by name and by email address in turn, then each search returns exactly the matching enquiry.
- AC-40.5 [FR-42] Given an enquiry, when the Administrator selects Delete and confirms, then it is removed from the list and is no longer retrievable by its address.
- AC-40.6 [FR-42] Given an enquiry received with the subject "Data protection request or complaint" on a known date, when an Administrator opens it, then it shows that label and an "acknowledge by" date 30 calendar days after the date received, and the subject filter lists it; and when the Administrator marks a General enquiry as one, then the label and date show on it.
- AC-40.7 [FR-42] Given an enquiry from `visitor.one@example.com`, when an Administrator searches for `VISITOR.ONE@EXAMPLE.COM`, then the enquiry is found.
- AC-40.8 [FR-42, NFR-22] Given an unread enquiry, when a tester requests it with GET by tool (not through the portal screen), then the enquiry is returned and it is still unread afterwards; and when the tester sends the explicit mark-as-read request with a valid token, then it becomes read; and when the tester sends that request without a token, then the response is HTTP 403 and it stays unread.

## US-41 Export subscribers
As a member of resort staff, I want to download the subscriber list, so that I can use it in our own newsletter tool.
Requirements: FR-43

- AC-41.1 [FR-43] Given 3 active and 2 unsubscribed subscribers, when an Administrator selects Export, then the downloaded CSV has a header row `email,language,status,subscribed_at,consent_version`, 3 data rows, a UTF-8 byte order mark, and opens in a spreadsheet with Cyrillic and German characters intact.
- AC-41.2 [FR-43] Given the same data, when the Administrator ticks "include unsubscribed" and exports, then the CSV has 5 data rows.
- AC-41.3 [FR-43] Given subscriber addresses beginning with `=`, `+`, `-` or `@` (for example `=cmd@example.com`), and test records created directly in the data store whose text begins with a tab or a carriage return, when the CSV is exported, then each such cell begins with a single quote before that character, every cell in the file is enclosed in double quotes, and a spreadsheet opens the file without running any formula.
- AC-41.4 [FR-43, NFR-34] Given any export, when a tester opens the security event record (and the audit log if it is built), then an entry shows the user, time and number of rows exported and contains no email address.
- AC-41.5 [FR-43] Given the subscribers screen, when the Administrator searches an address and removes the record after confirmation, then the record is gone from the list and from later exports.
- AC-41.6 [FR-43] Given every CSV file the site can produce, when a tester inspects each, then the quoting and single quote prefix rules of AC-41.3 hold in each.
- AC-41.7 [FR-43] Given `visitor.two@example.com` is subscribed, when an Administrator searches for ` Visitor.Two@Example.COM `, then the subscriber is found.

## US-42 Answer a data request from an individual
As the resort's administrator, I want to find, export and delete everything held about one person, so that I can answer their rights request.
Requirements: FR-44, NFR-16

- AC-42.1 [FR-44] Given enquiries and a subscriber record for `visitor.one@example.com`, when an Administrator enters that address in the data subject tool, then all enquiries, the subscriber record and any admin account for that address are listed, together with the number of security event or audit log entries that carry that account's identifier (the logs hold account identifiers only, never an email address).
- AC-42.2 [FR-44] Given the result in AC-42.1, when the Administrator selects Download, then a JSON file is saved containing exactly those records.
- AC-42.3 [FR-44] Given the result in AC-42.1, when the Administrator selects Delete and confirms, then the enquiries and subscriber record are deleted, the admin account row is pseudonymised ("deleted user") so log entries that carry its identifier no longer identify a person, and a second search finds nothing readable.
- AC-42.4 [NFR-16] Given 5,000 enquiries and 10,000 subscribers, when the Administrator searches an address, then the results appear within 5 seconds.
- AC-42.5 [FR-44] Given enquiries and a subscriber record for `visitor.one@example.com`, when an Administrator enters ` VISITOR.ONE@Example.com ` in the data subject tool, then the same records are listed as for the lower case address.
- AC-42.6 [FR-44] Given an Administrator records a request with type "access" and dates received, acknowledged and closed, when the Administrator views the request list, then the record shows no message text; and when the purge job runs under a test configuration of 1 day for such records and the closed date is 2 days ago, then the record is deleted.
- AC-42.7 [FR-44, FR-48] Given the enquiry for `visitor.one@example.com` was deleted through the data subject tool after a backup was taken, when the backup is restored into an empty install, then the enquiry is not present after the restore completes.

## US-43 Have old personal data deleted automatically
As the client, I want personal data to be deleted when its retention period ends, so that we comply with our own rules and the law.
Requirements: FR-45

- AC-43.1 [FR-45] Given a test with the retention setting for enquiries changed to 1 day and an enquiry dated 2 days ago, when the purge job runs, then the enquiry is permanently deleted and an enquiry dated today remains.
- AC-43.2 [FR-45] Given an unsubscribed subscriber older than the readable-address period, when the purge job runs, then the address is deleted and only a keyed hash entry remains that cannot be turned back into the address.
- AC-43.3 [FR-45, NFR-34] Given the purge job has run, when a tester opens the security event record, then an entry shows the run time and the number of records removed in each category.
- AC-43.4 [FR-45] Given the default configuration, when a tester reads the retention settings, then they equal the Retention schedule in `docs/requirements.md`, or the values confirmed in the answer to OQ-10.
- AC-43.5 [FR-45] Given the scheduler is left running for 48 hours with the test configuration, when a tester counts purge runs, then there are at least 2.
- AC-43.6 [FR-45] Given a test configuration of 1 day and one record dated 2 days ago in each of these categories (a closed request record, the original of an image deleted from the library, an expired session, a security event record) and one dated today in each, when the purge job runs, then the four older records are deleted and the four newer remain.
- AC-43.7 [FR-45] Given a test configuration of 1 day for inactive accounts, two active Administrator accounts and one with its last sign in 2 days ago, when the purge job runs, then the older account is disabled and the other two are not; and a disabled account cannot sign in until an Administrator enables it.
- AC-43.8 [FR-45] Given only one active Administrator account whose last sign in is older than the inactivity period, when the purge job runs, then that account stays active.

## US-44 Review who did what
As the resort's administrator, I want a log of admin activity, so that I can see changes and spot misuse.
Requirements: FR-46
Priority note at T1: Could in the first release (the minimum is the security event record, US-79); promote to Must before any hosting.

- AC-44.1 [FR-46] Given a tester performs one sign in failure, one sign in success, one content save, one settings change, one upload, one export, one enquiry delete and one sign out, when an Administrator opens the audit log, then there is one entry for each with time, user and result.
- AC-44.2 [FR-46] Given the audit log, when an Administrator filters by user, by date range and by event type in turn, then each filter returns only matching entries.
- AC-44.3 [FR-46] Given the events in AC-44.1 included a wrong password, a one-time code, an enquiry and a subscriber address, when a tester searches the whole audit log for them, then none of those values appears.
- AC-44.4 [FR-46] Given an entry in the log, when a tester tries to edit or delete it through the portal, then no such function exists.

## US-45 Review the site on one computer
As the client's reviewer, I want to install and run the site on my computer, so that I can judge the concept.
Requirements: FR-47

- AC-45.1 [FR-47] Given a clean computer with the documented prerequisites and the release package, when a tester follows the install and start steps, then the site opens at a local address and shows the Home page in 3D mode or fallback mode.
- AC-45.2 [FR-47] Given the site is running with default configuration, when a tester requests it from another computer on the same network, then the connection is refused.
- AC-45.3 [FR-47] Given a first start with no Administrator, when a tester requests any admin address, then it is refused; and the first Administrator can be created only with the documented server side command, or on a setup screen that requires a single use setup code printed on the server console, which fails after 60 minutes (1 minute in a test configuration) and after one use; and there is no default account.
- AC-45.4 [FR-47, NFR-28] Given the first start, when a tester visits the 84 public pages, then no page text contains, matched case sensitively, any of the tokens `TODO`, `TBD`, `XXX`, `undefined`, `NaN`, `[object Object]`, `(null)`, `{{`, `}}`, `%s` or `%d`, or, ignoring case, the words `lorem ipsum`; and each language has the same number of non-empty strings as English.
- AC-45.5 [FR-47] Given the install and run, when a tester watches network connections, then the software makes no connection to any outside address.
- AC-45.6 [FR-47] Given the package, when a tester opens the draft record of processing activities, then it lists purposes, categories of people and data, recipients, transfers, retention per the Retention schedule and a security summary, and is marked "draft for the controller to complete".

## US-46 Back up and restore the site's data
As the client's administrator, I want to save and restore all site data, so that we do not lose enquiries, content or photos.
Requirements: FR-48
Priority note at T1: Must (promoted, G-3).

- AC-46.1 [FR-48] Given a site with content, 3 photos, 2 enquiries, 2 subscribers and 2 accounts, when a tester runs the documented backup command, then one archive file is created whose name or accompanying text states that it contains personal data.
- AC-46.2 [FR-48] Given the archive and an empty install, when a tester runs the documented restore command, then the public site and the admin portal show the same pages, photos, enquiries, subscribers and accounts as before, and the restored accounts can sign in.
- AC-46.3 [FR-48] Given the backup command was run daily for 40 simulated days with default settings, when the tester lists archives, then only archives from the last 35 days remain. (Checks NFR-17 as well.)
- AC-46.4 [FR-48] Given the default configuration and a clock advanced by 25 hours, when a tester lists the archives, then at least one archive was created without anyone running the backup command.
- AC-46.5 [FR-48] Given a backup archive, when a tester inspects it, then it is outside every served folder and not reachable by any public URL, its permissions allow only the account running the site, and it contains no session data and no rate limit counters.
- AC-46.6 [FR-48] Given an archive that contains an absolute path, a `..` segment or a link, when a tester runs the restore command, then it refuses the archive and changes nothing.

## Non-functional stories: accessibility

## US-47 Use the whole site with a keyboard
As a visitor or staff member who cannot use a mouse, I want every function to work with the keyboard, so that I can use the site independently.
Requirements: NFR-2

- AC-47.1 [NFR-2] Given each public page and admin screen, when a tester uses only Tab, Shift+Tab, Enter, Space, Escape and arrow keys, then every link, button, form control, menu, accordion, lightbox and admin function can be reached and operated.
- AC-47.2 [NFR-2] Given each page, when a tester presses Tab once after loading, then the first focused element is a link "Skip to main content" (translated) that, when activated, moves focus to the main content.
- AC-47.3 [NFR-2] Given each focusable element, when it has focus, then a visible indicator at least 2 CSS pixels thick with a contrast ratio of at least 3 to 1 against adjacent colours is shown, and the element is not wholly hidden behind the concept notice or a sticky header.
- AC-47.4 [NFR-2] Given the 3D hero, the menu and the lightbox, when a tester tabs through and leaves each with Tab or Escape, then no keyboard trap exists.
- AC-47.5 [NFR-2] Given every button, link and form control on a 390 CSS pixel wide viewport, when a tester measures the pointer target, then it is at least 24 by 24 CSS pixels, or has equivalent spacing under WCAG 2.5.8, or (for checkboxes and radio buttons) follows the accepted pattern in AC-47.7.
- AC-47.6 [NFR-2] Given any function that can be done by dragging (the 3D drag, any reordering of lists in the admin portal), when a tester looks for an alternative, then a single-pointer or keyboard alternative exists (for list reordering, Move up and Move down controls).
- AC-47.7 [NFR-2] Given every checkbox and radio button, when a tester measures it at 390 CSS pixels wide, then the drawn control is 24 by 24 CSS pixels, the row containing it is at least 44 CSS pixels tall, and a click on any part of the row, including the label text, toggles the control.

## US-48 Use the site with a screen reader
As a blind visitor or staff member, I want the site to be understandable with a screen reader, so that I can find information and use the forms.
Requirements: NFR-3

- AC-48.1 [NFR-3] Given each page, when a tester lists the landmarks and headings, then header, nav, main and footer landmarks exist, there is one `h1`, and heading levels never skip a level.
- AC-48.2 [NFR-3] Given each page with a 3D canvas, when a tester reads the page with NVDA and with VoiceOver, then the canvas is not announced (`aria-hidden="true"`), and the hero heading and links are announced.
- AC-48.3 [NFR-3] Given the contact form submitted with errors, when a tester uses NVDA or VoiceOver, then focus moves to the error summary, which is announced, and each field is announced with its error.
- AC-48.4 [NFR-3] Given a successful form submission and a language change, when a tester uses a screen reader, then the confirmation message is announced without the tester moving focus, and text in another language carries the right `lang` attribute.
- AC-48.5 [NFR-3] Given the journeys Home to Rooms to a room page; submit the contact form; subscribe to the newsletter; and (admin) sign in, edit a text, upload a photo, when a tester completes each journey with NVDA on Windows with Firefox and with VoiceOver on iOS with Safari without looking at the screen, then every journey is completed. If NVDA, VoiceOver or the iOS device is not available, then every journey is instead completed by an automated run that finds each control only by its role and accessible name (no CSS, id or text selectors), together with VoiceOver on macOS Safari or NVDA where one of them is available; the report states which run was made and lists the missing screen reader run as an open item for T3.
- AC-48.6 [NFR-3] Given every informative image and every decorative image, when a tester checks the alternative text, then informative images have a text alternative that describes them and decorative images have `alt=""`.

## US-49 Read the site comfortably
As a visitor with low vision, I want good contrast and text that scales, so that I can read the site.
Requirements: NFR-4

- AC-49.1 [NFR-4] Given each text and interface colour pairing in the design tokens, when a tester measures contrast, then text is at least 4.5 to 1 (3 to 1 for text of 24 CSS pixels or more, or 19 pixels or more in bold), and interface components and graphics are at least 3 to 1.
- AC-49.2 [NFR-4] Given text over the hero poster and over each scene, when a tester captures 20 frames at 1 second intervals during a scripted 20 second run, then for every text element and every frame the contrast between the text colour and the lightest pixel (for light text) or darkest pixel (for dark text) inside the text's box is at least 4.5 to 1.
- AC-49.3 [NFR-4] Given each page at 320 CSS pixels wide, when a tester scrolls, then there is no horizontal scrolling and no content is cut off; and at browser zoom 200 percent, all content and functions remain available.
- AC-49.4 [NFR-4] Given the WCAG text spacing override (line height 1.5, paragraph spacing 2 times, letter spacing 0.12 em, word spacing 0.16 em), when a tester applies it, then no text is clipped or overlaps.
- AC-49.5 [NFR-4] Given body text (every text element other than the concept notice, whose size is covered by AC-20.6), when a tester measures it, then it is at least 16 CSS pixels. Provisional (OQ-24).
- AC-49.6 [NFR-4] Given form errors and required-field indications, when a tester views them in greyscale, then they can still be identified without colour.
- AC-49.7 [NFR-4] Given the real scene poster images rendered from the scenes (not the prototype illustrations), when a tester finds the brightest frame of each scene in the scripted run and measures text contrast over it as in AC-49.2, then the contrast is at least 4.5 to 1 for every text element over that frame and over the poster.

## US-50 Meet WCAG 2.2 AA across the whole site
As the client, I want proof that the site meets the accessibility standard, so that I can stand behind it.
Requirements: NFR-1

- AC-50.1 [NFR-1] Given the 84 public URLs, the error pages, the form result pages and every admin screen, when a tester runs axe-core (version recorded in the report), then there are zero violations tagged `wcag2a`, `wcag2aa`, `wcag21aa` or `wcag22aa`, in 3D mode and in fallback mode.
- AC-50.2 [NFR-1] Given every public page, when a tester runs Lighthouse, then the Accessibility score is at least 95.
- AC-50.3 [NFR-1] Given the manual checks in US-47, US-48 and US-49 are complete, when a tester compiles the report, then it lists each WCAG 2.2 A and AA success criterion with a result of pass or not applicable, and none fails.

## US-51 Sign in and work in the admin portal without barriers
As a staff member with a disability or a password manager, I want sign in and sessions to be accessible, so that I am not locked out.
Requirements: NFR-5

- AC-51.1 [NFR-5] Given the sign in page, when a tester pastes a password and a code into the fields, then both are accepted; and the fields carry `autocomplete` values `username`, `current-password` and, only if two-step verification is built, `one-time-code`.
- AC-51.2 [NFR-5] Given the sign in page and enrolment, when a tester looks for a puzzle, image selection or character transcription, then there is none.
- AC-51.3 [NFR-5] Given an idle session with 28 minutes elapsed (test configuration), when the tester waits 2 more minutes, then a warning dialog appeared at least 2 minutes before expiry, it is announced to a screen reader, and activating Stay signed in extends the session.
- AC-51.4 [NFR-5] Given the forced password change at first sign in, when a tester completes it, then within the change process the email address and the temporary password are not asked for again (the form asks only for the new password and its confirmation); and when the change ends all sessions as required by NFR-20, then the sign in form that follows is a separate process in which the email address and the new password are entered, and a test that checks for repeated entry treats that form as a new process.

## Non-functional stories: performance and motion

## US-52 Get pages quickly on a mid range phone
As a visitor on a mid range phone and a mobile connection, I want pages to show quickly and not jump around, so that I can read without waiting.
Requirements: NFR-6, NFR-7

- AC-52.1 [NFR-6] Given each public page in each language on R1 or L1 in 3D mode with a cold cache, when a tester measures it, then Largest Contentful Paint is at most 2.5 s, Cumulative Layout Shift at most 0.1, Total Blocking Time at most 300 ms and First Contentful Paint at most 1.8 s.
- AC-52.2 [NFR-6] Given the scripted interactions (open the menu, switch language, open and close a lightbox image, expand a FAQ item, type in a form field) on R1 or L1, when a tester measures them, then Interaction to Next Paint for each is at most 200 ms.
- AC-52.3 [NFR-6] Given each public page, when a tester runs Lighthouse with the mobile preset, then Performance is at least 80 in 3D mode and at least 90 in fallback mode, and Best Practices is at least 95.
- AC-52.4 [NFR-6] Given the package running on the review machine, when a tester requests each page's HTML 20 times, then the server response time is at most 200 ms for all.
- AC-52.5 [NFR-7] Given each public page on first load with a cold cache and no scrolling, when a tester sums the compressed bytes transferred, then content before any 3D (HTML, CSS, JavaScript, fonts and the largest above-the-fold image) is at most 600 KB, JavaScript excluding the 3D chunk is at most 200 KB, CSS is at most 60 KB, and fonts are at most 120 KB from at most 2 families.
- AC-52.6 [NFR-7] Given en, de and it pages, when a tester lists the font files requested, then no Cyrillic font file is requested.
- AC-52.7 [NFR-7] Given the Home page and each scene page, when a tester measures the 3D chunk and 3D assets, then the 3D code chunk is at most 350 KB, Home hero assets are at most 3 MB, every other scene's assets are at most 2 MB, the hero poster is at most 150 KB, and every other image file delivered is at most 250 KB.
- AC-52.8 [NFR-7] Given the network recording of the Home page, when a tester orders requests by time, then no 3D code or 3D asset request starts before the page text and the poster image have rendered.

## US-53 Enjoy smooth 3D
As a visitor, I want the 3D to run smoothly on my phone, so that it feels premium, not laggy.
Requirements: NFR-8

- AC-53.1 [NFR-8] Given each scene on R1 (or, when R1 is not available, on lab profile L2, with the result labelled "emulated" and confirmation on R1 listed as an open item for T3) during a scripted 20 second run with interaction, when a tester records frame times, then the median frame rate is at least 50 frames per second and the slowest 1 percent of frames are no slower than 30 frames per second.
- AC-53.2 [NFR-8] Given each scene, when a tester reads the renderer statistics in any frame during the run, then there are at most 150,000 triangles and at most 100 draw calls, and the device pixel ratio is at most 1.5 on a touch device and 2 elsewhere.
- AC-53.3 [NFR-8] Given the Home page on L1, when a tester measures it, then the first rendered 3D frame appears within 4 s of navigation start. This is the tightest budget (margin of about 0.3 s on paper). A fallback limit of 4.5 s is proposed and applies only if Steven approves it at T2. Provisional (OQ-25).
- AC-53.4 [NFR-8] Given a test hook that slows rendering so the median frame time exceeds 22 ms over 2 seconds, when a tester watches, then the scene reduces quality by one step; and after three steps with the median still above 33 ms for 3 seconds, the page switches to fallback mode.
- AC-53.5 [NFR-8] Given a scene is running, when the tab is hidden or the scene scrolls fully out of view, then the number of frames rendered in the following second is zero; and when the tab is shown or the scene returns, rendering resumes.
- AC-53.6 [NFR-8] Given a tester navigates among pages 20 times, when the tester counts WebGL contexts at each step and compares the JavaScript heap after a forced garbage collection, then there is never more than one context and heap growth from first load is at most 25 MB.

## US-54 Move between pages without waiting for animations
As a visitor, I want transitions to be quick, so that they do not slow me down.
Requirements: NFR-9

- AC-54.1 [NFR-9] Given a page whose next page is ready, when a tester times a transition on R1 or L1, then exit plus entry takes at most 800 ms.
- AC-54.2 [NFR-9] Given a transition in progress, when a tester measures input blocking, then total blocked input time is at most 100 ms.
- AC-54.3 [NFR-9] Given the same page loaded with and without the transition, when a tester measures Largest Contentful Paint, then the transition adds at most 200 ms.
- AC-54.4 [NFR-9] Given a page that is ready in under 300 ms, when a tester loads it, then no loader screen is shown; and given a page that takes 10 seconds, then the loader is gone no later than 8 seconds after it appeared, and for a page whose 2D hero is ready sooner, the loader is gone as soon as it is ready.

## US-55 Have the server and admin portal respond briskly
As a staff member, I want the admin portal to be responsive, so that I can work without delay.
Requirements: NFR-10

- AC-55.1 [NFR-10] Given a server of 1 CPU and 1 GB memory and 25 simultaneous simulated visitors for 5 minutes, when a tester records response times, then the 95th percentile for page HTML is at most 200 ms.
- AC-55.2 [NFR-10] Given 5,000 enquiries, when an Administrator opens the enquiries screen, then the first page shows within 1 s, and admin read requests respond within 500 ms at the 95th percentile.
- AC-55.3 [NFR-10] Given a valid 10 MB photo, when an Administrator uploads it, then the derived copies are ready within 30 s.
- AC-55.4 [NFR-10] Given 10,000 subscribers, when an Administrator exports them, then the file download completes within 10 s.

## US-56 See a calm site when I ask for reduced motion
As a visitor who has asked my device to reduce motion, I want no big animations, so that the site does not make me ill.
Requirements: NFR-11

- AC-56.1 [NFR-11] Given the system setting for reduced motion is on, when a tester loads the Home page and each scene page, then no 3D scene starts, the poster image is shown, and no 3D code or asset is requested.
- AC-56.2 [NFR-11] Given reduced motion is on, when a tester scrolls and navigates, then no parallax, scroll-driven animation, auto-playing or looping animation runs, and no element zooms, slides or spins.
- AC-56.3 [NFR-11] Given reduced motion is on, when a tester navigates between pages, then the loader and transition are replaced by an instant swap or an opacity change of at most 150 ms.
- AC-56.4 [NFR-11] Given reduced motion is on, when a tester uses all links, forms, menus, the lightbox and the FAQ, then all work as with motion on.
- AC-56.5 [NFR-11, FR-30] Given reduced motion is on, when a tester looks on every page for a control that turns on 3D or the scene, then none exists.

## US-57 Get a complete site when 3D cannot run
As a visitor with an older or restricted device, I want the full site without 3D, so that I can still get everything I need.
Requirements: NFR-12

- AC-57.1 [NFR-12] Given WebGL is disabled in the browser, when a tester loads the Home page, then fallback mode is used: poster images are shown and no 3D code or asset is requested.
- AC-57.2 [NFR-12] Given WebGL context creation is forced to fail, a context loss without restoration for 3 seconds is forced, Save-Data is on, and the connection type is 2g, in turn, when a tester loads the page or waits, then fallback mode is used in each case.
- AC-57.3 [NFR-12] Given fallback mode, when a tester compares each page's text, links, forms and functions with 3D mode, then they are identical.
- AC-57.4 [NFR-12] Given fallback mode, when a tester measures a poster image and layout shift against 3D mode, then the hero poster is at most 150 KB, every other poster is at most 250 KB, and layout shift from the swap is 0.
- AC-57.5 [NFR-12] Given fallback mode, when a tester runs axe-core and Lighthouse, then NFR-1 and the fallback scores in NFR-6 are met.

## US-58 Use the key functions without JavaScript
As a visitor whose JavaScript is blocked or has failed, I want the site to still work, so that I can read and send a message.
Requirements: NFR-13

- AC-58.1 [NFR-13] Given JavaScript is turned off, when a tester loads each of the 84 public pages, then all text and images show, the concept notice shows, and the navigation and language switching work.
- AC-58.2 [NFR-13] Given JavaScript is turned off, when a tester submits the contact form, the newsletter form and the unsubscribe form, then each works by a normal form submission with a result page.
- AC-58.3 [NFR-13] Given JavaScript is turned off, when a tester lists what is missing, then it is only the gallery lightbox, 3D, loader and transitions.

## Non-functional stories: privacy

## US-59 Share only the data that is needed
As a visitor, I want the site to ask only for what it needs and to ask clearly for my consent, so that I stay in control.
Requirements: NFR-14

- AC-59.1 [NFR-14] Given all forms and the admin portal, when a tester lists every data field collected, then they are only those named in FR-19, FR-20, FR-22, FR-23, FR-32 to FR-34 and FR-46.
- AC-59.2 [NFR-14] Given the contact form and the newsletter form, when a tester loads each, then the contact form has no checkbox, and the newsletter consent box is unticked.
- AC-59.3 [NFR-14] Given an enquiry and a subscriber record, when an Administrator opens each, then the enquiry shows the version of the privacy information text shown, and the subscriber shows the consent wording version and the time of consent.
- AC-59.4 [NFR-14] Given all forms, public and admin, when a tester inspects every field name and label in all four languages, then none contains the words age, birth, born, years old, Alter, Geburt, età, nascita, возраст or рождения.
- AC-59.5 [NFR-14] Given one enquiry, one newsletter sign up, one sign in and one failed sign in, when a tester searches the application logs and any exported log for the message text, the email addresses, the password and the one-time code, then none appears.
- AC-59.6 [NFR-14] Given network recording during all forms, when a tester lists requests, then no personal data is sent to any host other than the site's own.

## US-60 Browse without being tracked
As a visitor, I want no tracking and no outside connections, so that my visit stays private.
Requirements: NFR-15

- AC-60.1 [NFR-15] Given a fresh browser profile, when a tester loads each of the 84 public pages, then no cookie is set and nothing is written to local storage or session storage.
- AC-60.2 [NFR-15] Given the same profile, when a tester activates the pause motion control, then the only storage written is the session storage item listed in the Cookie notice.
- AC-60.3 [NFR-15] Given network recording on every public page, when a tester lists the hosts contacted, then the only host is the site's own.
- AC-60.4 [NFR-15] Given the page source and the site's dependencies, when a tester searches for analytics, advertising, tag manager, social widget, embedded video and embedded map code, then none is present.
- AC-60.5 [NFR-15] Given the admin portal, when a tester signs in, then the only cookie set is the session cookie, listed in the Cookie notice, and none is set on public pages by the sign in.
- AC-60.6 [NFR-15] Given the design for a future non-essential cookie is reviewed, when a tester reads the architecture notes, then they state that a consent control with the behaviour in NFR-15 is required before such an item is added. (Checked by inspection.)
- AC-60.7 [NFR-15] Given a fresh browser profile, when a tester loads each page that has a form and submits each public form with valid data, then no cookie is set and nothing is written to local storage or session storage.

## US-61 Exercise my data protection rights
As a person whose data the site holds, I want my rights to be honoured, so that I can see, correct and delete my data.
Requirements: NFR-16

- AC-61.1 [NFR-16] Given the Privacy notice and the hosting guide, when a tester reads them, then both state that requests are answered within one calendar month, that a data protection complaint is acknowledged within 30 days of receipt, and how to make a request.
- AC-61.2 [NFR-16] Given a request to correct an enquiry detail, when an Administrator follows the documented procedure (delete the record using the tool and re-enter the corrected data), then the corrected data is held and the old data is gone.

## US-62 Have backups kept no longer than needed
As the client, I want backups to expire, so that deleted personal data does not live on for ever.
Requirements: NFR-17

- AC-62.1 [NFR-17] Given default configuration, when a tester reads the backup settings, then the backup keep period is 35 days.
- AC-62.2 [NFR-17] Given an enquiry is deleted and backups exist from before the deletion, when 35 days of simulated time pass and the backup command runs, then no archive contains the enquiry. (Verified together with AC-46.3.)
- AC-62.3 [NFR-17] Given the retention periods in the Retention schedule, when a tester compares them to the configuration and to the Privacy notice, then all three agree.
- AC-62.4 [NFR-17] Given the Privacy notice, the hosting guide and the output of the backup command, when a tester reads each, then each states that data purged from the live store remains in backup archives until they expire.

## US-63 Keep personal data safe where it lives
As the client, I want personal data stored only on our server and protected, so that it cannot leak.
Requirements: NFR-18

- AC-63.1 [NFR-18] Given the running package, when a tester lists the places personal data is stored, then they are only the site's own data store and its backup archives on the same server.
- AC-63.2 [NFR-18] Given the configuration is set to listen on a non local address, whether or not HTTPS is configured, when the tester starts the software, then it exits with a non-zero status within 10 seconds, writes a message that begins `STARTUP-REFUSED` and names the listen address setting, and no port is listening (in this release two-step verification is not built, so every non local address is refused).
- AC-63.3 [NFR-18] Given a tester requests addresses where uploaded originals, backup archives and the data store are kept, when the requests are made as a visitor, then each returns HTTP 403 or 404.
- AC-63.4 [NFR-18] Given the account table, when a tester inspects it, then no password is readable and each password hash is a hash of the form required in NFR-19.

## Non-functional stories: security

## US-64 Make passwords and sign in hard to attack
As the client, I want strong admin sign in, so that attackers cannot guess their way in.
Requirements: NFR-19

- AC-64.1 [NFR-19] Given the Change password screen, when a tester tries `short1`, `password1234` (in the common list), and a password containing the account's email address, then each is refused; and a 12 character password not in the list is accepted; and a 128 character password is accepted.
- AC-64.2 [NFR-19] Given the account table, when a tester inspects a stored hash, then it is an Argon2id hash with memory at least 19 MiB and at least 2 iterations, or, if Argon2id is unavailable, a bcrypt hash of cost at least 12, and the choice is recorded in the architecture notes.
- AC-64.3 [NFR-19] Given an account, when a tester makes 5 failed sign in attempts within 15 minutes (from two different addresses), then the 6th attempt with the correct password is refused for 15 minutes, with the same generic message as a wrong password.
- AC-64.4 [NFR-19] Given 100 sign in attempts each with a known and an unknown email address, when a tester compares median response times, then they differ by at most 100 ms.

## US-65 Keep sessions short-lived and safe
As the client, I want admin sessions to end and be protected, so that an unattended screen is not a risk.
Requirements: NFR-20

- AC-65.1 [NFR-20] Given a signed in session on HTTPS, when a tester inspects the session cookie, then it has `HttpOnly`, `SameSite=Strict` and `Secure`, and its value is at least 128 bits of random data.
- AC-65.2 [NFR-20] Given a tester notes the session identifier before sign in and after, when they compare, then they differ.
- AC-65.3 [NFR-20] Given 30 minutes without activity, or 8 hours since sign in, when a tester makes an admin request, then it is refused and the user must sign in again.
- AC-65.4 [NFR-20] Given a sign out, a password change or a password reset, when a tester replays any earlier session cookie of that account (including the one that made the change), then the request is refused.
- AC-65.5 [NFR-20] Given any admin response, when a tester inspects its headers, then `Cache-Control: no-store` is present.
- AC-65.6 [NFR-20] Given an account with two open sessions, when an Administrator disables the account, and in a second test deletes it, then both sessions are refused at their next request.

## US-66 Stop automated abuse
As the client, I want limits on how often forms and sign in can be used, so that bots cannot flood or guess.
Requirements: NFR-21
Priority note at T1: Must (promoted, G-10).

- AC-66.1 [NFR-21] Given one client address, when a tester makes 21 sign in attempts in 15 minutes, then the 21st receives HTTP 429 with a `Retry-After` header.
- AC-66.2 [NFR-21] Given one client address, when a tester submits 6 valid contact forms in an hour, then the 6th receives HTTP 429 with `Retry-After`, and only 5 enquiries are stored.
- AC-66.3 [NFR-21] Given one client address, when a tester submits 6 newsletter sign ups and 11 unsubscribes in an hour, then the 6th sign up and the 11th unsubscribe receive HTTP 429.
- AC-66.4 [NFR-21] Given one signed in session and one user, when a tester makes 301 admin write requests in a minute and 31 uploads in an hour, then the 301st write request and the 31st upload receive HTTP 429.
- AC-66.5 [NFR-21] Given rate limit counters, when a tester checks the stored data after 25 hours, then no counter older than 24 hours exists.
- AC-66.6 [NFR-21] Given a request carrying `X-Forwarded-For: 203.0.113.9` from a peer that is not a configured trusted proxy, when the server counts it, then the limit key is the peer's own address; and given the peer is configured as a trusted proxy, then the forwarded address is used.

## US-67 Refuse forged requests
As the client, I want forms and admin actions to be safe from forged requests, so that outsiders cannot make changes on staff's behalf.
Requirements: NFR-22

- AC-67.1 [NFR-22] Given each admin action and sign out, when a tester sends the request without the anti-forgery token, then the response is HTTP 403 and nothing is changed.
- AC-67.2 [NFR-22] Given a valid token but an `Origin` header of `https://evil.example`, when a tester sends the request, then it is refused and nothing is changed.
- AC-67.3 [NFR-22] Given the list of addresses that change state, when a tester sends each with the GET method, then none changes state.
- AC-67.4 [NFR-22, NFR-15] Given each public form, when a tester inspects the page and the response, then the token is in a hidden field of the form and no cookie or storage item is set to carry it.
- AC-67.5 [NFR-22, FR-20] Given a public form submitted with a missing, altered or expired token, when the tester submits it, then nothing is stored or changed, the visible retry message is shown and the typed values are kept.

## US-68 Accept only safe uploads
As the client, I want only genuine photos to be accepted, so that uploads cannot harm the site or its visitors.
Requirements: NFR-23

- AC-68.1 [NFR-23] Given test files, when a tester uploads a valid JPEG, PNG, WebP and AVIF, then all four are accepted.
- AC-68.2 [NFR-23] Given these test files: an SVG, a GIF, a PDF, an HTML file, a ZIP, a text file renamed `photo.jpg` and a JPEG renamed `photo.png`, when a tester uploads each, then each is refused with a message.
- AC-68.3 [NFR-23] Given a file of 10 MB plus 1 byte, an image of 41 megapixels and a batch of 21 files, when a tester uploads each, then each is refused with a message naming the limit.
- AC-68.4 [NFR-23] Given a file named `../../evil.jpg`, when a tester uploads a valid image under that name, then the stored file name is random, no file is written outside the media folder, and the original name is shown only as encoded text.
- AC-68.5 [NFR-23] Given the public address of an uploaded copy, when a tester inspects the response, then the media type is correct and `X-Content-Type-Options: nosniff` is present; and a script file placed in the upload folder by a test is not executed when requested.
- AC-68.6 [NFR-23] Given media storage at 80 percent of the limit, when an Administrator opens the portal, then a warning shows; and at 100 percent, further uploads are refused with a message.
- AC-68.7 [NFR-23] Given a request to upload sent without a signed in session, when the tester sends it, then it is refused (HTTP 401).
- AC-68.8 [NFR-23] Given a crafted image whose header declares 50,000 by 50,000 pixels, when an Administrator uploads it, then it is rejected before decoding with a message naming the pixel limit, within 5 seconds, and the site keeps serving pages.
- AC-68.9 [NFR-23] Given a test hook that makes image decoding exceed 60 seconds or 256 MB, when an Administrator uploads an image, then the upload is rejected, the decoding process is ended, and the site keeps serving pages.

## US-69 Block injected scripts and set safe headers
As the client, I want the site to resist script injection, so that visitors and staff are safe.
Requirements: NFR-24

- AC-69.1 [NFR-24] Given the text `<img src=x onerror=alert(1)>` entered in each public form field, each admin text field and each admin search field, when it is saved and shown again anywhere, then no script runs and the text is shown inertly or removed.
- AC-69.2 [NFR-24] Given the text `' OR 1=1 --` entered in every input field, when submitted, then no error, no extra records and no data from other records are returned.
- AC-69.3 [NFR-24] Given a link value `javascript:alert(1)` in a body text link, when saved, then the link is removed or refused.
- AC-69.4 [NFR-24] Given any page response, when a tester inspects the headers, then `Content-Security-Policy` has `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` and `frame-ancestors 'none'`, and `script-src` contains neither `unsafe-inline` nor `unsafe-eval`; and `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` and a `Permissions-Policy` disabling camera, microphone, geolocation and payment are present.
- AC-69.5 [NFR-24] Given the site served over HTTPS, when a tester inspects the headers, then `Strict-Transport-Security` is present with `max-age` of at least 15552000.
- AC-69.6 [NFR-24] Given the end-to-end tests of all journeys, when a tester reads the browser console, then there are no Content Security Policy violation messages.
- AC-69.7 [NFR-24] Given plain text containing U+202E, U+2066 or a zero width joiner U+200D entered in a plain text field, when the Administrator saves, then the save is refused with a message; and given text containing a soft hyphen U+00AD, then it is accepted.
- AC-69.8 [NFR-24] Given the public site, an error page and an admin screen, when a tester inspects the response headers of each, then all the headers of AC-69.4 are present on each, no `Server` header shows a version, no `X-Powered-By` header exists, and a request for any `.map` file returns HTTP 404.
- AC-69.9 [NFR-24] Given a body text `<b>ok</b><script>alert(1)</script>` saved in German and another in Russian, when a tester reads the stored values from the data store, then neither contains a script element and both contain the bold text.
- AC-69.10 [NFR-24] Given an enquiry from the name `<b>x</b>`, a media file uploaded under the name `<i>.jpg`, and a subscriber list, when an Administrator views them in the admin portal, then the name and file name are shown as literal text and no markup is rendered.

## US-70 Restrict each admin function to the right people
As the client, I want admin functions to be checked on the server, so that no one can reach what they should not.
Requirements: NFR-25

- AC-70.1 [NFR-25] Given no session, when a tester requests every admin route and admin data address in the route list, then each returns 401 or a redirect to sign in, with no data.
- AC-70.2 WITHDRAWN at T1 (OQ-1: there is one role, so there is no Administrator-only route to deny to an Editor).
- AC-70.3 [NFR-25] Given an unlisted admin address added by a test, when it is requested, then access is denied by default.
- AC-70.4 [NFR-25] Given an enquiry address with identifier 17, when a tester changes it to 18 and 1 and to an identifier that does not exist, then access to an existing record is allowed only when signed in and a non-existing one returns 404.
- AC-70.5 WITHDRAWN at T1 (OQ-1: there is one role).
- AC-70.6 [NFR-25] Given two accounts, when each signs in, then each can open every admin screen (content, settings, media, enquiries, subscribers, accounts).

## US-71 Ship without secrets or known vulnerabilities
As the client, I want no secrets in the code and no known serious vulnerabilities, so that the release is safe to run.
Requirements: NFR-26

- AC-71.1 [NFR-26] Given the hub, web and api repositories and the release package, when a tester runs the secret scan, then it reports no secrets and no real personal data.
- AC-71.2 [NFR-26] Given a forced server error on every kind of page and admin screen, when a tester reads the response, then there is no stack trace, file path, query text or software version.
- AC-71.3 [NFR-26] Given the release, when a tester runs the dependency audit on everything shipped, then there are no vulnerabilities of severity high or critical, and a lock file pins all dependencies.
- AC-71.4 [NFR-26] Given the default configuration file, when a tester reads it, then debug is off and the listening address is local only.
- AC-71.5 [NFR-26] Given the release package, when a tester opens it, then it contains a software bill of materials listing every shipped dependency with its version and licence.
- AC-71.6 [NFR-26] Given the package manager configuration, when a tester inspects it, then dependency install scripts are disabled except for the names on an approved list kept in the repository, each with a stated reason.
- AC-71.7 [NFR-26] Given every `.glb` file in the package, when a tester runs the Khronos glTF validator, then there are no errors and no external URI; and any WebAssembly or worker decoder is pinned in the lock file and requested from the site's own origin.

## Non-functional stories: search engines, languages, devices, brand, cost, operations

## US-72 Keep the concept out of search engines
As the client, I want search engines told not to index anything, so that the concept never competes with or confuses the real resort site.
Requirements: NFR-27

- AC-72.1 [NFR-27] Given each of the 84 public pages, each error page, each form result page and each admin screen, when a tester inspects the response headers, then `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` is present.
- AC-72.2 [NFR-27] Given the same pages, when a tester inspects the HTML, then `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">` is present.
- AC-72.3 [NFR-27] Given image and uploaded file addresses, when a tester inspects the response headers, then `X-Robots-Tag` with the same value is present.
- AC-72.4 [NFR-27] Given a request for `/sitemap.xml`, when the tester sends it, then the response is HTTP 404; and given the HTML of all pages, then there is no canonical link or alternate-language link to the real JAZ domain and no JSON-LD or microdata describing a business or hotel.
- AC-72.5 [NFR-27] Given the settings screen and the configuration file, when a tester looks for a way to change the robots rules, then there is none.

## US-73 Have the whole site properly translated and laid out in four languages
As an international guest, I want a complete and well-laid-out site in my language, so that nothing looks broken or foreign.
Requirements: NFR-28

- AC-73.1 [NFR-28] Given the language resource files and the content store, when a tester counts public strings per language, then German, Italian and Russian each have the same count of non-empty strings as English.
- AC-73.2 [NFR-28] Given the source code, when a tester searches for visible text written directly in code (outside the resource files and content store), then there is none.
- AC-73.3 [NFR-28] Given pages in all four languages, when a tester checks the character encoding, then it is UTF-8; and the test text `ä ö ü ß à è é ì ò ù Привет, мир` displays with no missing glyph and no fallback font box.
- AC-73.4 [NFR-28] Given every string made 40 percent longer by a test script, when a tester views all pages at 320, 768, 1280 and 1920 CSS pixels, then no text is clipped, overlaps or overflows its container.
- AC-73.5 [NFR-28] Given the admin enquiries and subscribers search, when a tester searches for `Привет` and for `Müller` created as test data, then each is found.
- AC-73.6 [NFR-28] Given admin test data `Ёж` and `Йод` and `Муха`, when an Administrator searches for `ёж`, `еж`, `йод` and `иод`, then `ёж` finds `Ёж`, `йод` finds `Йод`, `еж` does not find `Ёж` and `иод` does not find `Йод`; and given `Müller`, then `muller` finds it. Provisional (OQ-23).

## US-74 Use the site on the browsers and devices people actually have
As a visitor, I want the site to work on my browser and screen, so that I am not left out.
Requirements: NFR-29

- AC-74.1 [NFR-29] Given the browser matrix (latest 2 stable versions of Chrome, Edge and Firefox on Windows and macOS; Chrome on Android; Safari 16.4 or later on macOS, iOS and iPadOS; latest 2 versions of Samsung Internet), when a tester runs the visitor journeys in each (browse pages, switch language, gallery, FAQ, contact form, newsletter), then every journey passes in 3D mode where WebGL 2 is available and in fallback mode otherwise.
- AC-74.2 [NFR-29] Given widths of 320, 360, 390, 768, 1024, 1280, 1920 and 2560 CSS pixels in portrait and landscape where applicable, when a tester loads the Home, a room, Gallery and Contact Us pages, then none has horizontal scrolling or overlapping elements.
- AC-74.3 [NFR-29] Given the admin portal in the desktop and tablet versions of the matrix browsers at widths from 768 CSS pixels, when a tester completes sign in, text edit, upload, enquiry read and subscriber export, then every function works.
- AC-74.4 [NFR-29] Given a browser outside the matrix (for example Internet Explorer 11 or a browser without module script support), when a tester loads the Home page, then the text and links are shown.

## US-75 Look and feel like the resort's brand
As the client, I want the design to build on the existing brand, so that it feels like our resort.
Requirements: NFR-30, NFR-36

- AC-75.1 [NFR-30] Given the design documents, when a tester opens the brand extraction record, then it lists each extracted brand element (theme colour #453536, the tone of short upbeat labels, any fonts and palette found) and each enhancement, with the reason for each.
- AC-75.2 [NFR-30] Given the design tokens, when a tester reads them, then the colour #453536 is defined as a token, brand colours and the type scale are defined once, and every colour pairing in use meets NFR-4.
- AC-75.3 [NFR-30] Given the logo, badge and image files in the package, when a tester compares them with the files on jazhotels.com by file hash and visual check, then none is the same.
- AC-75.4 [NFR-36] Given the T2 touchpoint, when the Orchestrator presents the approved designs to Steven, then his reply is recorded verbatim in a file in `approvals/` as "Approve", "Approve with changes" (the changes listed) or "Reject" before implementation starts.
- AC-75.5 [NFR-36] Given the T3 touchpoint, when Steven is given the release package running locally together with the measured accessibility and performance results, then his reply is recorded verbatim in a file in `approvals/` as Approve, Approve with changes or Reject, and release proceeds only on Approve or Approve with changes.
- AC-75.6 [NFR-36] Given a verdict of "Approve with changes", when release is prepared, then each listed change is either done and shown again to Steven, or recorded in the change log as declined by Steven.

## US-76 Run the site at no running cost
As the client, I want to run the site without paying anyone, so that it never adds a bill.
Requirements: NFR-31

- AC-76.1 [NFR-31] Given the list of runtime dependencies, when a tester reads the licence report, then every dependency has a licence in the allow-list (MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, 0BSD, CC0-1.0, MPL-2.0, SIL OFL-1.1 for fonts) or a written approval in the licence register.
- AC-76.2 [NFR-31] Given the configuration template, when a tester reads it, then it holds no key, token or account for any external service.
- AC-76.3 [NFR-31] Given the machine's outgoing network is blocked entirely, when a tester runs the full test suite of visitor and admin journeys, then every test passes.
- AC-76.4 [NFR-31] Given a server of 1 CPU and 1 GB memory, when a tester measures memory at rest and under the load in AC-55.1, then it is at most 512 MB at rest and at most 1 GB under load.
- AC-76.5 [NFR-31] Given the site running for 24 hours with a tester's journeys repeated, when a tester lists outgoing connections, then there are none.
- AC-76.6 [NFR-31] Given the release package, when a tester opens the generated third party notices file, then every dependency in the software bill of materials appears in it with its licence name and copyright notice, and the licence text is included wherever the licence requires it.

## US-77 Install, configure and check the site easily
As the client's technical person, I want one documented configuration and a health check, so that I can run the site without guesswork.
Requirements: NFR-32

- AC-77.1 [NFR-32] Given the documentation, when a tester lists every setting (address and port, data folder, SMTP host and credentials (only if FR-21 is reinstated), retention periods, session limits, upload limits), then each is read from the one documented configuration file or environment variables, and an example file with no secrets is provided.
- AC-77.2 [NFR-32] Given the health check address, when the data store is readable and writable, then it returns HTTP 200; and when the data store is made read-only by a test hook, then it returns a non-200 status.
- AC-77.3 [NFR-32] Given a clean machine, when a tester counts the commands in the documented install and first run, then there are at most 10.
- AC-77.4 [NFR-32] Given the configuration file made readable by other accounts (mode 0644), when a tester starts the software, then it refuses to start and the message names the file.
- AC-77.5 [NFR-32] Given two installs from the same package, when a tester compares their signing keys, then the keys differ, each is at least 256 bits, and no key appears in any file of the package.

## US-78 Never lose or corrupt confirmed data
As the client, I want confirmed enquiries, subscriptions and edits to be safe, so that nothing the system said it saved is lost.
Requirements: NFR-33

- AC-78.1 [NFR-33] Given a confirmation page has just been shown for an enquiry, when a tester kills the software process immediately and restarts it, then the enquiry is in the enquiries list. The same holds for a newsletter sign up and a published content change.
- AC-78.2 [NFR-33] Given a content save interrupted by killing the process midway, when the software restarts, then the previous content of that page is intact and readable.
- AC-78.3 [NFR-33] Given two Administrators open the same page and both change the title, when the second saves after the first, then the second save is refused with a message and the Administrator can review the other change; and the first editor's change is unchanged.


## Stories added after T1 (P2-T2)

## US-79 Keep a record of security events
As the client, I want a record of sign ins, exports, deletions and purges even before an audit log screen exists, so that misuse can be spotted and investigated.
Requirements: NFR-34
Priority note at T1: Must (G-2).

- AC-79.1 [NFR-34] Given a tester performs one sign in failure, one sign in success, a lockout (5 failures), one password change, one account creation, one subscriber export of 3 rows, one enquiry deletion and a purge run, when a tester opens the security event record, then there is one entry for each with time, account identifier, event and result; the export entry shows a row count of 3 and the purge entry shows counts per category.
- AC-79.2 [NFR-34] Given the events in AC-79.1, when a tester searches the record for the wrong password, a one-time code, a session identifier, an enquiry message text and a subscriber email address, then none appears.
- AC-79.3 [NFR-34] Given the audit log screen (FR-46) is not built, when a tester performs a sign in, then an entry is still recorded; and no admin function edits or deletes an entry.
- AC-79.4 [NFR-34] Given a test configuration of 1 day for the record and an entry dated 2 days ago, when the purge job runs, then that entry is deleted and an entry dated today remains.
- AC-79.5 [NFR-34] Given a failed sign in made from the address 203.0.113.9, when a tester inspects the security event record, then the entry holds the account identifier, event and result, and neither that address nor any other source address appears anywhere in the record.

## US-80 Stay up under heavy or hostile traffic
As the client, I want the small server to protect itself from oversized, slow and bulk requests, so that one visitor or bot cannot take the site down or fill its storage.
Requirements: NFR-35

- AC-80.1 [NFR-35] Given a POST of 65 KB to the contact form and a POST of 1.1 MB to an admin settings request, when the tester sends each, then each is refused with HTTP 413 and nothing is stored.
- AC-80.2 [NFR-35] Given a client that opens a connection and sends the request header one byte per second, when the tester waits, then the server closes the connection within 35 seconds of its first byte.
- AC-80.3 [NFR-35] Given 5 simultaneous image uploads and 5 simultaneous sign ins, when a tester watches the processes, then at most 1 image job and 2 password hash computations run at once, the rest are queued, and all requests complete.
- AC-80.4 [NFR-35] Given any fingerprinted static or 3D asset, when a tester inspects the response, then `Cache-Control` has a `max-age` of at least 31,536,000 seconds and the file name changes when the content changes.
- AC-80.5 [NFR-35, FR-20] Given the cap on stored enquiries is set to 10 in a test configuration, when 8 enquiries are stored then an admin warning shows; and when 10 are stored then the next submission is refused with the visible error message of FR-20 and nothing is stored.
- AC-80.6 [NFR-35, FR-22] Given the subscriber cap is set to 3 in a test configuration with 3 subscribers stored, when a tester signs up an address that already exists and then a new address, then both receive the same refusal message and the same response status, and the response times differ by at most 100 ms at the median over 50 pairs.

## US-81 Saved changes go live
As a member of resort staff, I want a change I save to appear on the public site at once without a rebuild or restart, so that visitors always see current information.
Requirements: FR-38
Origin: carries the live on save behaviour of FR-38 (OQ-6, T1). It replaces AC-36.2, AC-36.4, AC-36.5, AC-36.6 and AC-36.7, which are marked MOVED in US-36.

- AC-81.1 [FR-38] Given an Administrator changes the English text of a page and saves, when a visitor loads the public page within 60 seconds, then it shows the new text, with no software restart or rebuild.
- AC-81.2 [FR-38] Given unsaved changes in an edit screen, when the Administrator tries to leave it, then a warning appears and the Administrator can stay.
- AC-81.3 [FR-38] Given an offer title that is shown on both the Offers page and the Home offers summary, when an Administrator changes it and saves, then both pages show the new title within 60 seconds.
- AC-81.4 [FR-38] Given the Book now URL and the optional concept sentence, when an Administrator changes them and saves, then on all 84 public pages every Book now link and the concept notice show the new values within 60 seconds.
- AC-81.5 [FR-38] Given a photo used on two pages, when an Administrator changes its alternative text or caption and saves, then both pages show the new text within 60 seconds.