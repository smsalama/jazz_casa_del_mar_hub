# Phase 4 gate review findings (2026-10-16)

Independent reviews of the design gate (accessibility reviewer and consultant) and the architecture gate (consultant and security engineer), run on hub main at da40882. High and medium findings are in `gates/design.json` and `gates/architecture.json`. This file adds the low findings and the manual checks for Steven. Reviewers edited no files.

## Design: low findings

- Motion spec lists ADR-0007 step 4 and architecture section 13 as unresolved; both were amended (`docs/design/motion-spec.md` lines 786, 787, 808).
- Reduced motion contradiction: `scene-areas.md` line 100 says the scene starts paused on its poster; line 184 and NFR-11 say no canvas.
- Poster contrast figure disagrees: `home.md` line 72 says 8 to 1, `scene-areas.md` line 97 says 6.8 to 1.
- Explore tiles: `home.md` line 19 says two columns at 375, `site.css` line 185 gives one.
- Tilt control: prototype shows it on desktop and before 3D runs, spec D9 says iOS only after first frame; German labels differ; labels have no home in resource files.
- "Ask about this suite" goes to Contact without the room context.
- "Booking happens on the JAZ website" is a third party claim; Q2 is open.
- Static map source for the Location page not chosen (FR-6); OpenStreetMap would need ODbL attribution.
- SVG generator and contrast scripts are not in the repo (`asset-register.md` line 20, `system.md` line 93).
- Hover lift not limited to `(hover: hover)` (`site.css` line 189).
- swup needs the head plugin (`awaitAssets`) and an `html lang` update on language change.
- Duplicate `id="book-note-1"` on Home; card links 33 px tall; rich text textboxes need `aria-labelledby`; `li.card` clips under WCAG 1.4.12 text spacing; pause storage key is `jcdm-motion` not `jcdm-motion-paused`.

## Architecture and security: low findings

- 127.0.0.1 gets 421 because the canonical host is localhost (ADR-0015 line 119).
- Astro `checkOrigin` returns its own 403 before the contract's localised page (ADR-0002 line 44).
- Strong ETag conflicts with the per response footer form token (architecture line 264).
- Backup VACUUM and gzip run inside the server process and block the event loop (ADR-0010 lines 28 to 30).
- Backup encryption is a custom format; scrypt N 2^17 fails on Node 22 default `maxmem` (ADR-0010 line 31).
- swup forms plugin behaviour on 4xx and 5xx HTML responses is unverified (ADR-0007 line 60).
- Stale text: architecture line 8 and 284, ADR-0002 line 49, ADR-0004 line 10 ("nine lists" vs seven), ADR-0011 `/{lang}/` vs contract `/{lang}`, architecture line 227 omits `list_state`, data model lines 936 and 938.
- Drizzle is pre 1.0 and unproven for CHECKs, partial indexes, WITHOUT ROWID and triggers; prove in the first build step and record a plain SQL fallback in ADR-0003.
- Nine contract lint warnings (ambiguous paths, missing 4xx or 2xx).
- Verify builds twice (`test:e2e` then `build`).
- Rich text: strip Tiptap link `target`, `rel`, `class`; store normalised `href`; choose remove or reject for invisible format characters.
- Password hash queue has no upper bound; wrong current password on change password does not count toward lockout; `/healthz` writes to the database on an unauthenticated GET; restore trusts the SQLite file inside an archive and has no unpacked size cap; IPv6 rate limits should key on /64; localhost cookie is shared across ports; public site and admin share one origin (accepted residual risk); `FieldValueUpdate.path` has no pattern; `/_astro/{file}` allows leading dots; `npm run dev` skips custom server guards; background GETs may refresh the idle timeout.

## Manual checks for Steven on his Mac (VoiceOver, Safari)

1. Skip link and landmarks rotor names. 2. Hero: h1 and lead read, poster and canvas silent, Book now announces "opens in a new tab". 3. Pause motion announces pressed state (after the script fix). 4. Language switcher pronounces de, it, ru names and the current language. 5. Contact form: empty submit announces the error summary and links move focus; sending, success and retry announced once. 6. Loader and page transition: "Loading" announced once, focus lands on the new h1. 7. Admin: sign in error, Show password, four language editor and toolbars, unsaved changes, missing translations. 8. Text zoom to 200 and 400 percent: check header navigation between 960 and about 1500 px.

## Evidence

Axe-core 4.14.0 raw outputs and summary: `evidence/accessibility/`. No violations on 42 runs; the open items are manual (script not binding, session timeout, focus obscured, reflow, loader loops).
