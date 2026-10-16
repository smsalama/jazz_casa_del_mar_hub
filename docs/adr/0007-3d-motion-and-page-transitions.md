# ADR-0007: Three.js for the six scenes, meshopt compressed glTF, swup for page transitions, CSS first motion

- Status: Proposed (for T2)
- Date: 2026-10-15, amended 2026-10-16 in P4R2-ARCH (architecture gate finding AC-H2: swup containers)
- Author: System Architect (P4-T2)
- Requirements: FR-27 to FR-31, NFR-2, NFR-3, NFR-6 to NFR-9, NFR-11, NFR-12, NFR-13, NFR-15, NFR-24, NFR-26, NFR-29, NFR-31; G-18; threat model section 9 ("3D, animation and transition libraries, decoders"), TM-53 to TM-57; RSK-3, RSK-9, RSK-17, RSK-20, RSK-28

## Context

Six real-time scenes (Home hero plus five section overview pages, FR-27, FR-28, OQ-9), each with its own root model and poster, loaded only after text and poster have rendered (NFR-7), within 350 KB compressed for the 3D code chunk, 3 MB of assets for the hero and 2 MB for each other scene (NFR-7), at a median of 50 frames per second on the reference phones with adaptive quality and automatic fallback (NFR-8, NFR-12). A branded loader on first visit (only after 300 ms) and a transition screen between pages, removed when the next page is ready and never after 8 seconds, with focus moved to the new main heading, title and address updated, back and forward working, and plain links without JavaScript (FR-29, NFR-9). A pause control (FR-30), reduced motion (NFR-11). Only one WebGL context at a time and at most 25 MB heap growth after 20 navigations (NFR-8). All under a strict CSP: no `unsafe-eval`, no `unsafe-inline`, `wasm-unsafe-eval` only for a 3D decoder (NFR-24, RSK-17). The design standard prefers the lightest tool: CSS, then Motion, then GSAP, then Three.js or React Three Fiber. All licences must be on the allow-list (NFR-31).

## Options considered

3D:

1. **Three.js used directly** (vanilla TypeScript scene modules).
2. **React Three Fiber** on top of Three.js. Brings React to every public page (about 60 KB compressed plus the reconciler), which the public site otherwise does not need (ADR-0002).
3. **Babylon.js or PlayCanvas.** Larger engines; their base bundles alone approach or exceed the 350 KB chunk budget.

Geometry and textures:

- Draco geometry compression: three's `DRACOLoader` runs the decoder in a Worker created from a `blob:` URL, which needs `worker-src blob:` and a separate WebAssembly file.
- **meshopt compression (`EXT_meshopt_compression`) with quantisation (`KHR_mesh_quantization`)**: three's bundled `MeshoptDecoder` instantiates a small WebAssembly module embedded in the JavaScript, on the main thread when workers are not enabled. Needs only `wasm-unsafe-eval`.
- KTX2 or Basis textures: the transcoder runs in a `blob:` Worker plus a WebAssembly file.
- **WebP textures (`EXT_texture_webp`)** decoded by the browser itself (every browser in NFR-29 supports WebP).

Page transitions:

- Astro `<ClientRouter />`: incompatible with a strict CSP (Astro documentation).
- Native cross-document View Transitions only (CSS): no JavaScript, but not supported in every NFR-29 browser, and every navigation would recreate the WebGL context and reparse the 3D chunk.
- **swup 4** (small, framework free page transition library): fetches the next page, swaps the content containers it is configured with, updates title and history, keeps scripts and the 3D renderer alive, and has an accessibility plugin that announces the new page and moves focus to its heading.
- Barba.js: similar idea, less active.

Animation:

- **CSS transitions, keyframes and scroll-driven animations** first.
- **Motion (vanilla JavaScript API, MIT)** where CSS cannot do it.
- GSAP: excluded, its licence ("Standard no charge license") is not on the NFR-31 allow-list.

## Decision

**Three.js 0.186.1, used directly**, in one lazily imported chunk:

- A **scene engine** (`src/client/scenes/engine.ts`) owns a single `WebGLRenderer` and its canvas for the whole tab session. swup keeps JavaScript state across navigations, so the canvas is moved into the new page's scene slot and the old scene is disposed (geometries, materials, textures) before the next loads. One WebGL context exists at a time (NFR-8).
- A **capability gate** runs before any 3D download: `prefers-reduced-motion` not set, motion not paused (session key absent), `navigator.connection.saveData` false and `effectiveType` not `2g` or `slow-2g`, and a WebGL 2 context created on the engine's own canvas (the same context is then handed to `WebGLRenderer`, so the gate never creates a second context). Failing any check leaves the poster in place and downloads no 3D code or asset (NFR-12). The gate re-runs on Resume, on a live change of the reduced motion setting and on every swup navigation.
- **Loading order** (amended in P4-T5a after the motion specification, decision D3):
  1. The poster `<img>` is the LCP element and is in the HTML with fixed dimensions.
  2. The text and the poster paint.
  3. When the poster has painted (LCP candidate reported, or `img.decode()` resolved plus one frame) the gate runs.
  4. **At that point, not after `load` and an idle period**, the engine imports the 3D chunk and the scene module and fetches the `.glb` in parallel. NFR-7 requires only that 3D is requested after the text and poster have rendered; this start is what allows the first frame within 4 s on profile L1 (`docs/design/budgets.md` section 6).
  5. Decode and build in slices of at most 50 ms, render the first frame into the transparent canvas, then fade the canvas in over the poster, which stays underneath (FR-27, NFR-7, NFR-8).
  6. After a swup navigation the next scene starts only when the transition has finished (`is-animating` removed plus one idle callback or 200 ms), so scene work stays out of the transition (NFR-9).
- **Quality governor**: device pixel ratio capped at 1.5 on touch devices and 2 elsewhere; the median frame time is measured over 2 second windows; above 22 ms quality steps down (render scale, effects, shadows) up to three steps; above 33 ms for 3 seconds at the lowest step the page switches to fallback (NFR-8). Rendering stops within 1 second when the tab is hidden (`visibilitychange`) or the slot leaves the viewport (`IntersectionObserver`).
- **Context loss**: on `webglcontextlost`, wait up to 3 seconds for restore, otherwise switch to fallback (NFR-12).
- **Interaction**: pointer movement, touch drag that does not block vertical scroll (`touch-action: pan-y` on the canvas), and device tilt only where no permission prompt is needed or after the visitor taps a labelled control (FR-27). The canvas is `aria-hidden="true"`; the hero text is real HTML (NFR-3).
- **Six scene modules** (`home`, `rooms`, `dining`, `pools`, `activities`, `location`), each with its own root `.glb` and poster (FR-28), each importing only its own assets (FR-31).
- **Assets**: authored by the agency in Blender (source files in the web repo under `3d/source/`), exported as glTF binary, then optimised by `npm run assets:3d` with glTF Transform 4.5.1: meshopt compression with quantisation, WebP textures (EXT_texture_webp), texture sizes capped per scene, all images embedded in the `.glb` (no external URIs). Each output must pass the Khronos glTF validator with no errors and no external URI (G-18), checked in `npm test`. Files are imported with `?url` so they get fingerprinted names under `/_astro/` and a one year cache lifetime (NFR-35).
- **CSP consequences, checked against the three.js 0.186.1 source**: `MeshoptDecoder` needs `script-src 'wasm-unsafe-eval'` and must not be switched to worker mode (its workers use `blob:` URLs). `GLTFLoader` turns embedded images into `blob:` URLs and loads them with `fetch` (ImageBitmapLoader) or, on Safari before 17, an `<img>`, so the public policy includes `connect-src 'self' blob:` and `img-src 'self' blob:`. No Draco, no KTX2, no workers. Because swup keeps the first page's policy for the whole tab session, every public page sends the same policy (ADR-0008).

**Page transitions: swup 4.10.0** with `@swup/a11y-plugin` 5.2.1 (announces "Loading" and the new page, moves focus to the `h1`), `@swup/head-plugin` 2.3.1 (merges the new `head`: title, description, robots meta, stylesheets; updates `lang` and `dir` on `html`), `@swup/preload-plugin` 3.2.12 (prefetch on hover or focus, same origin only) and `@swup/forms-plugin` 3.6.0 (optional: submits the public forms through the same transition; the server endpoints are unchanged).

- The transition screen and the first visit loader are HTML elements in the layout, animated with CSS classes that swup sets (`is-animating`, `is-leaving`, `is-rendering`). The loader appears on a full document load only if the page is not ready after 300 ms and is timed by CSS alone (hidden at 8,300 ms at the latest, hidden without JavaScript by a linked `noscript` stylesheet). "Ready" means `h1` text painted, hero poster decoded and above the fold fonts loaded (or 1.5 s): **the loader does not wait for the 3D first frame**; the scene fades in over the visible page afterwards (motion specification decision D2; the poster is the hero asset of FR-29 in every mode). Both screens are removed when the next page is ready and never after 8 seconds (FR-29, NFR-9).
- Without JavaScript, links navigate normally and forms post normally (NFR-13). If swup fails to fetch a page it falls back to a normal navigation.

**What swup replaces and what persists** (amended for gate finding AC-H2; FR-10, FR-17, FR-24, FR-29, NFR-3). Replacing only `main` would leave the header, the language switcher, `aria-current`, the footer newsletter form (with a token signed for the old page and language) and the footer concept sentence from the first page loaded, and `html lang` unchanged. The decision:

- `containers: ['#swup-top', '#swup-main', '#swup-footer']`. Every visit replaces all three, in one swap task:
  - `#swup-top` wraps the skip link, the top concept notice (fixed sentence and the optional sentence, FR-10), and the whole `header`: logo link, primary navigation with `aria-current="page"` rendered by the server for the new page, the menu button and panel, and the language switcher (links to the same page in the other languages, current language marked, FR-24).
  - `#swup-main` is the `main` element (`id="main"`, the skip link target): `h1`, page content, the scene slot with its poster and scene controls (Pause or Resume, tilt).
  - `#swup-footer` wraps the whole `footer`: the concept sentence (FR-10), legal links, and the newsletter form with its action `/{lang}/newsletter`, the consent wording shown, and a `formToken` signed for that response (form, language, issue time, nonce; ADR-0006).
- The one public layout renders all three containers with these ids on every public page and on every public HTML response that swup or the forms plugin can receive: form results and errors, 404, 429 and 500 pages. If a fetched document lacks a container, swup falls back to a normal navigation.
- **Head and `html`**: `@swup/head-plugin` with `attributes: ['lang', 'dir']` (only these; never `data-*`, so `data-motion="paused"` on `html` survives every visit) and `awaitAssets: true`, so new stylesheets (for example the Cyrillic font face file on `ru` pages, ADR-0011) have loaded before the swap. Orphaned stylesheets of the previous page are removed (plugin default). `body` carries no page specific attribute or class; anything page specific lives inside a container or in `html lang` and `dir`.
- **Persistent elements**, direct children of `body` outside the containers: the transition panel, the first visit loader and swup's announcement live region; nothing else. The 3D canvas belongs to the engine: before the swap (`content:replace`, before hook) it is detached from the old scene slot, and after the swap it is attached to the new page's slot if there is one (section above and architecture section 13).
- **Language of persistent elements**: the panel's and loader's visually hidden "Loading" text and their `lang` attribute are copied from the same elements in the fetched document right after the swap (`content:replace`, after hook, from `visit.to.document`), so the next transition speaks the new page's language. The a11y plugin gets `announcements` keyed by `en`, `de`, `it` and `ru` (exactly the `html lang` values), filled from the fixed resource files at build time, plus `headingSelector: 'main h1'`. Its `respectReducedMotion` is `false` because reduced motion is handled by the project's CSS (a fade of at most 150 ms, NFR-11).
- **Scripts after a swap**: public client modules use event delegation on `document` or re-initialise on swup's `page:view` hook, so the menu button, the switcher, form validation and the scene controls work on the new elements; the menu panel closes at `visit:start`.
- **swup page cache**: used only to hand a preloaded page to the visit that follows. Entries are time stamped when stored and dropped at `visit:start` when older than 30 seconds, and the cache is cleared after every `page:view`. A cached document is therefore shown at most once, so a footer or contact form token is never shown twice from cache (the contact form's used nonce check would otherwise reject a second submission), and saved edits appear on the next visit (FR-38). Back and forward fetch again (the browser may revalidate with the `ETag`, architecture section 12).
- **Server side**: no change of request or response shape. swup's `X-Requested-With: swup` header is ignored; the server always returns the same complete document, never a fragment (`contract/openapi.yaml`, `HtmlDocument`).
- **Tests** (end-to-end, JavaScript on): after a swup visit from Home to Rooms, `aria-current="page"` is on the Rooms link only; after following the language switcher from `/en/rooms` to `/de/rooms`, `html[lang]` is `de`, the title, navigation labels, switcher state, both concept sentences and the "Loading" label are German, the newsletter form action is `/de/newsletter` and its token's language is `de`; a footer newsletter sign up after two swup visits is accepted (no retry message); revisiting a page within the tab shows a different form token nonce from the first render; `html[data-motion="paused"]` survives a visit; on a `ru` page the Cyrillic font stylesheet has loaded before the swap (no fallback font in the first frame after the swap).
- Reduced motion or paused motion: swup animations become an instant swap or an opacity change of at most 150 ms (NFR-11, FR-30).
- The pause choice is kept in `sessionStorage` under one key, `jcdm-motion-paused`, with value `1` only while paused (removed on Resume); it is the only public storage item (FR-15, FR-30). Pause freezes the scene on its current frame mid page. A reload or navigation in the same tab while paused shows the poster with no 3D download (NFR-12), and the **Resume motion control stays visible** on the poster although 3D is not running, so the visitor can get the scene back; Resume removes the key, runs the gate and loads the scene as on a fresh page (motion specification decision D4). In every other no-3D case the scene controls stay hidden.

**Motion: CSS first; Motion 13.4.6 (vanilla API from `motion`, no React) is allowed** for scroll-linked or sequenced effects that CSS cannot express in every NFR-29 browser (for example scroll-driven animations where the browser lacks `animation-timeline`). The Motion Designer records any use in the motion specification. GSAP is not used.

## Consequences

- Starting the 3D download at poster paint (amendment of P4-T5a) does not compete with the LCP, which has already happened, but it does overlap with the rest of the page's loading (fonts below the fold, lazy images). The Performance Engineer checks TBT and the 3D first frame together on profile L1. The CSP is unchanged by the new order: the same chunk, decoder and `blob:` texture loading run, only earlier.
- Estimated 3D chunk: Three.js core with `WebGLRenderer`, `GLTFLoader` and `MeshoptDecoder` is roughly 150 to 180 KB compressed, leaving about 150 KB for the engine and scene code under the 350 KB cap. The Performance Engineer measures this in the Phase 4 spike (RSK-3).
- Public JavaScript outside 3D: swup and plugins about 15 KB compressed, Motion (if used) up to about 20 KB, project scripts (menu, lightbox, FAQ enhancement, motion controls, scene loader) about 20 KB: well under 200 KB.
- `wasm-unsafe-eval` is present on public pages. It permits compiling WebAssembly only; it does not permit JavaScript `eval`. Accepted by NFR-24 for a 3D decoder.
- Keeping a single renderer across swup navigations needs careful disposal; the 20 navigation heap test (NFR-8) is part of the end-to-end suite on Chromium.
- If meshopt or WebP textures cannot meet the visual bar within budget, the alternative is uncompressed quantised geometry (no WebAssembly at all) at a larger size; Draco and KTX2 stay excluded because of their `blob:` workers.

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| three | 0.186.1 | MIT | 3D engine, GLTFLoader, MeshoptDecoder (bundled from `three/examples/jsm`) |
| @types/three | 0.186.0 | MIT | Types (development only) |
| swup | 4.10.0 | MIT | Page transitions |
| @swup/a11y-plugin | 5.2.1 | MIT | Announcements and focus after navigation |
| @swup/head-plugin | 2.3.1 | MIT | Head updates on navigation |
| @swup/preload-plugin | 3.2.12 | MIT | Same origin prefetch |
| @swup/forms-plugin | 3.6.0 | MIT | Optional enhanced form submission |
| motion | 13.4.6 | MIT | Optional animation (vanilla API only) |
| @gltf-transform/cli | 4.5.1 | MIT | 3D asset optimisation (build only) |
| meshoptimizer | 1.3.0 | MIT | Encoder used by glTF Transform (build only) |
| gltf-validator | 2.0.0-dev.3.10 | Apache-2.0 | Khronos glTF validation in tests (only development builds are published on npm; pinned exactly) |
| Blender | 4.x LTS on the agency machine | GPL-3.0-or-later (authoring tool only; its output is not covered by the GPL) | Model authoring, not shipped |
