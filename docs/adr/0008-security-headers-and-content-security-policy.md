# ADR-0008: Security headers, a fixed Content Security Policy without nonces, and noindex on every response

- Status: Proposed (for T2)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: NFR-15, NFR-18, NFR-20, NFR-23, NFR-24, NFR-26, NFR-27, FR-13, FR-17; G-8; threat model TM-03, TM-09, TM-30, TM-31, TM-38, TM-56; RSK-17, RSK-22, RSK-37

## Context

NFR-24 lists headers that must be on every response of the public site, the error pages and the admin portal, including a CSP with `default-src 'self'` and no `unsafe-inline` or `unsafe-eval` in `script-src`. NFR-27 requires `X-Robots-Tag` and a robots meta tag on every page and the header on image and file responses, with no admin setting. Version headers and source maps are forbidden (G-8). `frame-ancestors` only works as an HTTP header, not in a `<meta>` policy.

## Options considered

1. Nonce based CSP generated per request (the usual Next.js approach). Prevents reusing rendered HTML.
2. Hash based CSP written into a `<meta>` tag by Astro's CSP feature. Cannot carry `frame-ancestors`, and is incompatible with Astro's client router.
3. **A fixed policy sent as an HTTP header** by the project's middleware, with the build guaranteeing no inline scripts.

## Decision

Option 3. One middleware function (`src/lib/security/headers.ts`) runs for every response the Node.js server sends, including static files, media, errors and redirects (the custom server applies it to `sirv` and media responses too).

**Public policy** (pages under `/`, the language pages, error pages, form result pages):

```
default-src 'self';
script-src 'self' 'wasm-unsafe-eval';
style-src 'self';
img-src 'self' blob:;
font-src 'self';
connect-src 'self' blob:;
media-src 'self';
worker-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
frame-src 'none';
manifest-src 'self';
upgrade-insecure-requests   (only when PUBLIC_ORIGIN is https)
```

`wasm-unsafe-eval` and the `blob:` sources are required by the meshopt decoder and three's glTF image loading (ADR-0007). They are on every public page because swup keeps the first page's policy for the whole tab session.

**Admin policy** (`/admin` and below): the same without `'wasm-unsafe-eval'` and without `blob:` in `connect-src`; `img-src 'self' blob:` stays for local previews of a chosen file before upload.

**Other headers on every response**: `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()` (device tilt uses `accelerometer` and `gyroscope`, which stay allowed for self); `Cross-Origin-Opener-Policy: same-origin`; `Cross-Origin-Resource-Policy: same-origin`; `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` (NFR-27); `Strict-Transport-Security: max-age=31536000` only when served over HTTPS (NFR-24 asks for at least 15,552,000). No `X-Powered-By`, no `Server` version (Node.js sends none by default; Astro's generator meta tag is removed from layouts). Admin responses add `Cache-Control: no-store` (NFR-20).

**Inline code rules**, enforced in tests rather than trust:

- No inline `<script>` without `src` in any rendered page, other than `type="application/json"` data blocks if one is ever needed (none are planned; data goes in `data-*` attributes). A test renders all 84 pages, the error pages and the admin shell and fails on any inline script or inline event handler attribute.
- No `<style>` elements and no `style=""` attributes in server rendered HTML (`build.inlineStylesheets: 'never'`). The loader's no JavaScript rule is a `<noscript>` containing only a `<link rel="stylesheet">` to a same origin file, which `style-src 'self'` allows (motion specification section 4.1); the loader's 300 ms and 8,300 ms timings are CSS animations, so they need no script either. Scripts may still set styles through the CSSOM (for example `element.style.transform`), which CSP allows.
- The Playwright suite listens for `securitypolicyviolation` events and console CSP messages on every page and fails on any (NFR-24, AC-69.x).

**Noindex** (NFR-27): the layout always writes `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">`; the header is set by middleware on every response. There is no setting, environment variable or code path that removes either. No `sitemap.xml`, canonical link, alternate language link to the JAZ domain, or structured data is produced. `robots.txt` is served with `Disallow: /admin/` only, so crawlers can fetch public pages and see the noindex rule.

**Source maps**: `vite.build.sourcemap: false`; a build check fails if any `.map` file exists under `dist/`.

**Error pages** (FR-13): localised 404 and 500 pages rendered from the content snapshot; on an exception the server logs a correlation id and shows only the page with that id, never a stack trace, path or version (NFR-26).

## Consequences

- The policy can be read and tested as a constant; no per request work.
- Astro's built-in CSP feature and `<ClientRouter />` stay off (ADR-0002).
- A library that needs `eval`, inline styles in HTML or `blob:` workers cannot be adopted without an ADR change and a Security Engineer review (RSK-17).

## Versions and licences

No additional dependencies. Implemented in project code on Node.js and Astro (ADR-0001, ADR-0002).
