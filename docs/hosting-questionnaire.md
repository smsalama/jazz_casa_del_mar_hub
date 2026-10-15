# Hosting questionnaire

One copy per client. Steven fills it in with the client during discovery; the DevOps role turns the answers into `docs/hosting-guide.md`.

**Never write passwords, keys or tokens in this form.** Credentials go from the client to Steven through a password manager share, and agents never receive production credentials.

## A. Ownership and access

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| A1 | Who owns the hosting account? | Client company; Steven on the client's behalf | |
| A2 | Who pays, and what is the monthly budget ceiling? | Card holder; GBP per month | |
| A3 | Who has admin access today, and is two-factor login on? | Names and roles | |
| A4 | How will the person deploying get access? | Team invite; deploy token held by them | |
| A5 | Who keeps access after handover? | Client only; client and Steven | |

## B. What is being hosted

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| B1 | What type of site is it? | Static site; Next.js with server rendering; web app with backend | |
| B2 | Which of these does it need? | Backend API, database, file uploads, scheduled jobs, email sending | |
| B3 | Will anyone edit content after launch? | No; headless CMS (name); admin panel | |
| B4 | Are there user logins or payments? | None; email login; Stripe | |

## C. Current hosting

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| C1 | Is there an existing site or hosting account? | URL, provider, plan name | |
| C2 | What kind of hosting is it? | Managed platform (Vercel, Netlify, Cloudflare Pages, Render); cloud (AWS, Azure, Google Cloud, DigitalOcean); shared hosting with cPanel or Plesk; VPS; client's own servers | |
| C3 | How are files deployed today? | Git integration; SSH; SFTP; control panel upload | |
| C4 | What does the hosting support? | Node.js version, Docker, PHP only, memory and build limits | |
| C5 | Must we stay with this provider? | Must stay; open to recommendation; preferred list | |

## D. Domain, DNS and email

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| D1 | Which domain names and subdomains? | example.co.uk, www, shop | |
| D2 | Where is the domain registered, and who can log in? | Registrar name; account holder | |
| D3 | Where is DNS managed? | Registrar; Cloudflare; hosting provider | |
| D4 | Is email used on this domain, and with whom? | Google Workspace; Microsoft 365; host mailboxes; none | |
| D5 | Which address is the main one, and what redirects? | Apex or www; old domains | |
| D6 | Who provides the SSL certificate? | Automatic from the platform; host's free certificate; purchased | |
| D7 | Which old URLs must keep working for search rankings? | List or current sitemap | |

## E. Environments and go-live

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| E1 | Is a staging site needed for client review? | Yes, password protected; no | |
| E2 | Should every change get a preview link? | Yes; no | |
| E3 | Who approves go-live, and when may it happen? | Name; allowed days and hours | |
| E4 | How much downtime is acceptable at launch? | None; a few minutes; a set maintenance window | |

## F. Data, privacy and location

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| F1 | What personal data does the site collect? | Contact forms, accounts, analytics, none | |
| F2 | Must data stay in a particular region? | UK; UK or EU; no requirement | |
| F3 | Where should the database live? | Managed Postgres (provider); same server; none | |
| F4 | How often are backups taken, and how long kept? | Daily, kept 30 days | |
| F5 | How much data loss and downtime is tolerable after an incident? | 24 hours of data; 4 hours offline | |

## G. Traffic and performance

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| G1 | Expected visitors per month, and any peaks? | 5,000 a month; launch campaign | |
| G2 | Where are visitors? | UK only; Europe; worldwide | |
| G3 | What uptime is expected? | Best effort; 99.9% with alerts | |
| G4 | Any large media to serve? | Video, 3D models, image libraries (sizes) | |

## H. Security and compliance

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| H1 | Is the client in a regulated sector? | Healthcare, finance, children's services, none | |
| H2 | Any required security features? | Firewall, admin IP allowlist, staff single sign-on | |
| H3 | Which analytics tool, and is cookie consent needed? | GA4; Plausible; none | |
| H4 | Will card payments be taken? | Hosted checkout such as Stripe; none | |

## I. Third-party services

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| I1 | Which service sends form and account emails? | Postmark; Resend; host SMTP | |
| I2 | Which error and uptime monitoring? | Sentry; Better Stack; none | |
| I3 | Any other services needing keys? | CRM, maps, booking system | |

## J. After launch

| # | Question | Examples or options | Answer |
| --- | --- | --- | --- |
| J1 | Who maintains the site after launch? | Steven; client team; nobody | |
| J2 | Who receives alerts, and at what hours? | Email or phone; office hours | |
| J3 | How often are updates and security patches applied? | Monthly; quarterly | |
| J4 | Are the repos transferred to the client at handover? | Yes, to organisation (name); stay with Steven | |
