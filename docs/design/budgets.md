# Performance and 3D budgets: Jazz Casa del Mar concept resort site

- Task: P4-T3 (3D Motion and Interaction Designer), branch `p4-motion`
- Date: 2026-10-15
- Status: draft for the design gate and T2
- Companion file: `docs/design/motion-spec.md` (what the motion is); this file says how much it may cost and how to measure that
- Sources: `docs/requirements.md` NFR-6 to NFR-9, NFR-11, NFR-12 and the glossary (R1, R2, L1, L2); `docs/stories.md` AC-25.4, AC-27.5, AC-53.1 to 53.6, AC-54.1 to 54.4, AC-57.4; ADR-0007; ADR-0008; `docs/architecture.md` section 13; `docs/risk-register.md` RSK-3; `docs/assumptions.md` A-12 and A-27

## 1. How to read this file

- Column "Source" says where a number comes from. A requirement or AC id (for example NFR-6) means the number is copied from it. "Proposal" means I chose the number; no requirement fixes it, and the Performance Engineer and System Architect may change it before T2 under A-12 (any change recorded as a requirement change if it touches a requirement number).
- Where a requirement gives a cap and I propose a tighter internal target, both are shown: the cap is the pass/fail line for the gate, the target is what the design is built to so that normal variation does not fail the gate.
- "Where measurable" uses the three places in section 2. "Cloud" means the Linux cloud workspace used for the agency's work.
- Pass rule for lab profiles (glossary): for a budget marked "R1 or L1", the result is taken on R1 when a device exists and always on L1; if they disagree, the worse result counts.
- No estimate in this file is a measurement. Nothing has been built, and the cloud workspace used for this task has no browser and no GPU installed (checked: no Chrome, Chromium or Lighthouse on the path, no `/dev/dri`, 2 CPU cores). All numbers are budgets and arithmetic from the geometry plans in `motion-spec.md` section 9.

## 2. Measurement environments: what the cloud can and cannot measure

### 2.1 The environments

| Name | What it is | Source |
| --- | --- | --- |
| Cloud | Linux workspace, 2 CPU cores, no GPU; a headless Chromium (to be installed by DevOps in Phase 4, version recorded) renders WebGL in software (SwiftShader). Network and CPU throttling are applied through the Chrome DevTools Protocol | this task |
| L1 | Chrome stable with the Lighthouse mobile preset: simulated slow 4G (1.6 Mbit/s down, 150 ms round trip), 4 times CPU slowdown, cold cache. Runs in the cloud | glossary |
| L2 | Chrome stable on a desktop or laptop with hardware graphics acceleration on, 6 times CPU slowdown, device pixel ratio 2.6, viewport 412 by 915. Results are labelled "emulated" and R1 confirmation is an open item for T3 | glossary, A-27 |
| R1 | Mid range Android phone, 2022 to 2024 class (Snapdragon 6 or 7 series, Exynos 1380 or Dimensity 7000 class, 6 GB memory, 1080 by 2400, current Chrome; example Galaxy A54 5G) | glossary |
| R2 | iPhone 12 or later, Safari on iOS 16.4 or later | glossary |

### 2.2 What each environment can measure

Plain statement: **the cloud can check sizes, counts, correctness, request behaviour, memory growth and timing of CSS and script work in a throttled software renderer. It cannot say whether the 3D is smooth.** Frame rate, GPU memory, heat and the feel of touch need a real phone. L2 needs a machine with a real GPU, which the cloud does not have, so L2 is also not a cloud measurement.

| Budget or check | Cloud | L2 (GPU machine) | R1 | R2 | Notes |
| --- | --- | --- | --- | --- | --- |
| Transferred bytes by class (HTML, CSS, JS, fonts, 3D chunk, glb, images) | Yes | n/a | n/a | n/a | Exact; same on any device |
| Poster, glb, texture sizes; glTF validator; triangle and texture counts in the file | Yes | n/a | n/a | n/a | Exact |
| Triangles and draw calls per frame (renderer statistics) | Yes | n/a | n/a | n/a | Renderer independent; read from the engine in a test build |
| Number of WebGL contexts; `renderer.info.memory` returning to zero | Yes | n/a | n/a | n/a | Exact |
| JS heap growth after 20 navigations, forced GC | Yes | n/a | Confirm | n/a | Same JavaScript; GPU memory excluded |
| Zero 3D requests in fallback modes (reduced motion, no WebGL, Save-Data, 2g, paused, no JavaScript) | Yes | n/a | n/a | n/a | Network log |
| Loader appears only after 300 ms and is gone by 8 s; transition durations and ordering | Yes | n/a | Confirm | Confirm | Timestamps from CDP traces; feel not judged |
| LCP, CLS, FCP | Yes (L1) | n/a | Confirm | Confirm | The poster is the LCP element, so software WebGL does not affect it before 3D starts |
| TBT, Lighthouse Performance score in 3D mode | Yes (L1), labelled "software rendering" | n/a | Confirm | Confirm | RSK-3: software WebGL inflates TBT after 3D starts; a cloud failure caused only by software rendering is confirmed on R1 before it is treated as a defect |
| INP | Emulated only (4 times CPU throttle) | Emulated | Yes | Yes | Needs real touch and real CPU |
| First rendered 3D frame within 4 s | Yes, labelled "emulated, software rendering, pessimistic" | n/a | Yes | Yes | Real GPU compiles shaders faster than SwiftShader |
| Median fps, 1 percent slowest frames | No | Yes (labelled emulated) | Yes (gate) | Yes | Software rendering gives meaningless frame times |
| Adaptive quality step logic (triggers, order, fallback) | Yes, using the test hook that forces slow frames | n/a | Observe | Observe | Logic, not performance |
| GPU memory, thermal behaviour, battery | No | Partly | Yes | Yes | |
| Flash safety analysis of scene frames | Yes (frame capture works in software) | n/a | n/a | n/a | Section 9.4 |
| Poster to first frame match | Yes | n/a | n/a | n/a | Motion spec 8.10 |
| iOS tilt permission flow (AC-25.5), WebP and WebAssembly on Safari 16.4 | No | No | n/a | Yes | Only on a real iPhone, or Safari on a Mac for part of it |
| Reduced motion, paused and no JavaScript behaviour | Yes | n/a | Confirm | Confirm | Media emulation and script blocking |

Result labels used in every test report: "cloud (software GL)", "L1", "L2 emulated", "R1", "R2". A budget is only reported as passed when the environment named in the "Gate evidence" column of the tables below has been used; a cloud result may support but not replace it.

## 3. Page speed budgets (NFR-6)

Applies to each public page in each language, 3D mode, cold cache, on R1 or L1. Gate evidence: L1 (cloud) plus R1 confirmation at T3.

| Metric | Cap | Source | Design target | Source of target | How measured | Where measurable |
| --- | --- | --- | --- | --- | --- | --- |
| Largest Contentful Paint | at most 2.5 s | NFR-6 | at most 2.0 s (estimate 1.8 s from section 6) | Proposal | Lighthouse mobile preset, median of 5 cold runs per page; the LCP element must be the poster `<img>` on the six scene pages (check the reported element) | Cloud (L1); confirm R1 |
| Cumulative Layout Shift | at most 0.1 | NFR-6 | at most 0.02 overall; exactly 0 from the poster to canvas swap | AC-25.4 for the swap; target proposal | Lighthouse; plus a layout shift observer across the poster to canvas swap and across a swup transition | Cloud |
| Total Blocking Time | at most 300 ms | NFR-6 | at most 200 ms | Proposal | Lighthouse, median of 5. The 3D pipeline is built in tasks of at most 50 ms (motion spec 8.3) | Cloud (L1, software rendering inflates); confirm R1 |
| First Contentful Paint | at most 1.8 s | NFR-6 | at most 1.4 s | Proposal | Lighthouse, median of 5 | Cloud (L1) |
| Interaction to Next Paint | at most 200 ms | NFR-6 | at most 150 ms | Proposal | A scripted set of interactions (open menu, switch language, open and close a lightbox image, expand a FAQ item, type in a form field) with the web-vitals library's INP report (`reportAllChanges`), p75 over 5 runs; run with the scene running and with it paused | R1 and R2 (gate); cloud emulated at 4 times CPU throttle |
| Server response time for page HTML | at most 200 ms | NFR-6 | at most 120 ms | Proposal | Time to first byte, cold and warm | Cloud |
| Lighthouse Performance, 3D mode | at least 80 | NFR-6 | at least 85 | Proposal | Lighthouse mobile preset | Cloud (software rendering lowers it, RSK-3); confirm R1 |
| Lighthouse Performance, fallback mode | at least 90 | NFR-6 | at least 95 | Proposal | Same, with WebGL disabled | Cloud |
| Lighthouse Best Practices | at least 95 | NFR-6 | 100 | Proposal | Lighthouse | Cloud |
| Lighthouse Accessibility | at least 95 | NFR-1 | 100 | Proposal | Lighthouse plus axe-core | Cloud |

Sampling plan (proposal): weight and request counts on all 84 URLs (cheap, automated); full Lighthouse on all 24 scene URLs (six scenes by four languages) and on one non scene page per language; the Russian pages are the heaviest for fonts and must always be in the sample.

Rules that keep these true (from the motion spec): the poster is the LCP element, in the HTML, with explicit width and height and `fetchpriority="high"`; 3D never starts before the poster has painted; no layout property is animated; no main thread task from the 3D pipeline is longer than 50 ms.

## 4. Weight budgets (NFR-7)

Compressed bytes transferred on first load, cold cache, no scrolling. Gate evidence: cloud (exact), measured by classification of the network log; the "before any 3D loads" figure is cut at the first request for the 3D chunk.

### 4.1 Page level

| Item | Cap | Source | Design target | Source of target | Method | Where |
| --- | --- | --- | --- | --- | --- | --- |
| Everything needed before any 3D loads (HTML, CSS, JavaScript, fonts, largest above the fold image) | at most 600 KB | NFR-7 | at most 320 KB (Russian pages at most 350 KB) | Proposal; sum of the lines below | Network log, sum until the first 3D chunk request | Cloud |
| HTML | no cap | n/a | at most 30 KB | Proposal | Network log | Cloud |
| JavaScript excluding the 3D chunk | at most 200 KB | NFR-7 | at most 90 KB on any page; the main entry bundle at most 45 KB (swup and plugins about 15, project scripts about 20, preload) with the lightbox and `motion` loaded lazily on gallery pages | Proposal; `architecture.md` plans about 50 KB | Network log | Cloud |
| CSS | at most 60 KB | NFR-7 | at most 35 KB | Proposal | Network log | Cloud |
| Web fonts, total | at most 120 KB, at most 2 families, only the subsets the page needs | NFR-7 | Latin pages 44 KB (Prata 19, Manrope 25); Russian pages 71 KB (adds Cyrillic 13 and 14.5) | `docs/asset-register.md` file sizes | Network log; the Cyrillic files must not be requested on en, de, it pages | Cloud |
| Hero poster image | at most 150 KB | NFR-7, NFR-12, AC-57.4 | Home landscape at most 100 KB, Home portrait at most 80 KB | Proposal | File size, transfer size | Cloud |
| Every other poster and delivered image | at most 250 KB | NFR-7, AC-57.4 | Section posters at most 100 KB each | Proposal | File size, transfer size | Cloud |
| 3D code chunk (three, GLTFLoader, MeshoptDecoder, engine, shader library, the first scene module) | at most 350 KB | NFR-7 | at most 200 KB | Proposal; ADR-0007 estimates three core with the two loaders at 150 to 180 KB | Network log; plus the bundle analyser report | Cloud |
| 3D assets, Home hero | at most 3 MB | NFR-7 | at most 80 KB (glb with embedded textures) | Proposal | Network log | Cloud |
| 3D assets, each other scene | at most 2 MB | NFR-7 | at most 80 KB each | Proposal | Network log | Cloud |
| Total JavaScript on a 3D page (entry + 3D chunk) | derived 550 KB | NFR-7 (200 + 350) | at most 290 KB (45 + 200 + largest scene module 12, rounded with margin; at most 335 KB on gallery pages) | Proposal | Network log | Cloud |

Why the 3D asset targets are so far below the caps: the cap allows 3 MB but a first 3D frame within 4 seconds on L1 (AC-53.3) only leaves room for about 80 KB of glb after the page and the 3D chunk have been fetched, see section 6. Bytes beyond that would have to arrive after the first frame (a possible later "enrichment" stage, not planned). This is decision D1 in the motion spec.

### 4.2 Per scene weight (all six, step 0)

| Scene | Root file | Estimated glb KB | glb ceiling | Textures inside the glb | Texture KB (est.) | Max texture side | Poster KB target |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home hero | `home.glb` | 60 | 80 | 1 (512x128 clouds) | 8 | 512 | landscape 100, portrait 80 |
| Rooms and suites | `rooms.glb` | 55 | 80 | 1 (256x256 plaster) | 10 | 256 | 100 |
| Dining | `dining.glb` | 65 | 80 | 1 (256x256 grain) | 10 | 256 | 100 |
| Pools and beach | `pools.glb` | 70 | 80 | 1 (256x256 sand) | 10 | 256 | 100 |
| Activities and facilities | `activities.glb` | 40 | 80 | 1 (128x128 weave) | 4 | 128 | 100 |
| Location | `location.glb` | 75 | 80 | 1 (256x256 grain) | 10 | 256 | 100 |

Texture rules (proposal): no side above 512 pixels; at most one texture per scene embedded in the glb; every texture is WebP (EXT_texture_webp); decoded GPU size per scene at most 1 MB including mipmaps; sizes follow the largest display they appear at (tiled detail maps at four repeats across 1440 px stay crisp enough for the stylised look).

Quality line for model files: every glb passes the Khronos glTF validator with no errors and no external URI (G-18); geometry is meshopt compressed with quantisation (FR-31, ADR-0007); no Draco, no KTX2, no animation tracks.

## 5. 3D runtime budgets (NFR-8)

### 5.1 Frame rate and render cost

Gate evidence: R1 (or L2 labelled emulated when no R1 exists, A-27); R2 by proposal. Not measurable in the cloud.

| Budget | Value | Source | Method |
| --- | --- | --- | --- |
| Median frame rate, scripted 20 s run per scene including interaction | at least 50 fps | NFR-8, AC-53.1 | In page frame recorder (test build) using `requestAnimationFrame` timestamps; three runs per scene, reported as the median of the three run medians |
| Slowest 1 percent of frames | no slower than 30 fps (frame time at most 33.3 ms, 99th percentile) | NFR-8, AC-53.1 | Same recorder; worst of the three runs counts |
| Same thresholds on R2 | median at least 50 fps; slowest 1 percent no slower than 30 fps | Proposal (NFR names R1 and L2; the glossary names R1 and R2 as the mid range phone class) | Same recorder in Safari; Low Power Mode off |
| Main thread JavaScript per frame (update plus render submission), step 0 | median at most 4 ms, 99th percentile at most 8 ms on R1 | Proposal | Recorder measures `performance.now()` around `update` and `render` |
| Frame cap | 60 fps on 90 and 120 Hz screens | Proposal (motion spec D6) | Frame timestamps show at most 61 frames in any second |
| Triangles in any frame | at most 150,000 | NFR-8, AC-53.2 | `renderer.info.render.triangles`, maximum over the run; design ceilings per scene are in section 5.3 |
| Draw calls in any frame | at most 100 | NFR-8, AC-53.2 | `renderer.info.render.calls`, maximum over the run |
| Device pixel ratio | at most 1.5 on touch devices, at most 2 elsewhere | NFR-8, AC-53.2 | `renderer.getPixelRatio()` in every frame of the run, at every quality step |
| Shader programs per scene | at most 8 (proposal), so first frame compile stays short | Proposal | `renderer.info.programs.length` |
| Visibility | zero frames rendered in the second after the tab is hidden or the scene scrolls fully out; resume on return; stop within 1 second | NFR-8, AC-53.5 | Frame counter, hide the tab by CDP and by scrolling |
| Sustained use (5 minute soak, scene visible, light interaction) | median fps in minute 5 at least 45; no quality step beyond step 1; no fallback | Proposal | Same recorder on R1 |
| First rendered frame | within 4 s of navigation start on L1 | NFR-8, AC-53.3 | See section 6 |

The scripted 20 second run (proposal, so every tester does the same thing): 0 to 2 s settle after the first frame; 2 to 8 s pointer path (a slow circle across the scene on desktop profiles) or a horizontal touch drag back and forth on phones; 8 to 14 s drag/pointer stops, scroll down 300 px and back at a steady speed; 14 to 20 s idle.

### 5.2 Context and navigation (NFR-8, AC-53.6)

| Budget | Value | Source | Method | Where |
| --- | --- | --- | --- | --- |
| WebGL contexts alive at any time | 1 | NFR-8, AC-53.6 | Test build wraps `HTMLCanvasElement.prototype.getContext` and counts live contexts at each step of the 20 navigations; the capability gate's context is the engine's own context, so the count is 1 from the gate onward | Cloud |
| JS heap growth after 20 navigations among scene pages, after a forced garbage collection | at most 25 MB from the size after first load | NFR-8, AC-53.6 | CDP `HeapProfiler.collectGarbage`, then `Runtime.getHeapUsage`, after first load and after navigation 20; navigations cycle through all six scene pages and two non scene pages | Cloud; confirm R1 |
| Same, design target | at most 10 MB | Proposal | Same | Cloud |
| `renderer.info.memory.geometries` and `.textures` after a scene is disposed | 0 | Proposal (motion spec 8.7) | Read in the test build after each dispose, 20 times | Cloud |
| Scene dispose time | at most 15 ms | Proposal | `performance.measure` around dispose | Cloud |

### 5.3 Per scene render ceilings (design targets, step 0)

| Scene | Triangles estimate | Triangles ceiling | Draw calls estimate | Draw calls ceiling | Particles (step 0) |
| --- | --- | --- | --- | --- | --- |
| Home hero | 15.3k | 24k | 11 | 20 | 120 |
| Rooms and suites | 6.9k | 18k | 10 | 18 | 0 |
| Dining | 7.9k | 18k | 12 | 20 | 60 |
| Pools and beach | 9.6k | 20k | 11 | 20 | 80 |
| Activities and facilities | 4.5k | 12k | 12 | 18 | 0 |
| Location | 6.8k | 16k | 9 | 16 | 0 |

Source: proposal (ceilings), estimates from the geometry plans in `motion-spec.md` 9. Requirement caps: 150,000 triangles and 100 draw calls (NFR-8). The ceilings are less than a sixth of the cap on purpose: with up to 2.25 times the pixels of a 1x screen at the DPR cap, the fill cost, not the triangle count, limits a mid range phone, and the water shader is the most expensive item.

## 6. First 3D frame on L1: the arithmetic (AC-53.3, NFR-8, NFR-7)

This is the tightest budget in the project. The requirement: first rendered 3D frame within 4 seconds of navigation start on L1 (simulated 1.6 Mbit/s, which is 200 KB per second, 150 ms round trip, 4 times CPU slowdown). Estimates, to be replaced by measurements in the Phase 4 spike:

| Step | Home | A section scene | Assumption |
| --- | --- | --- | --- |
| HTML request sent to first byte | 0.35 s | 0.35 s | one round trip 0.15 s plus server time 0.2 s (NFR-6 cap) |
| HTML 30 KB received | 0.50 s | 0.50 s | 30 KB at 200 KB/s |
| CSS 35 KB, entry JS 45 KB, fonts 44 KB, poster 100 KB requested | 0.40 s | 0.40 s | discovered while HTML streams |
| First bytes of those arrive | 0.55 s | 0.55 s | one more round trip |
| Those 224 KB received | 1.67 s | 1.67 s | 224 KB at 200 KB/s, shared bandwidth |
| Poster decoded and painted (LCP) | 1.8 s | 1.8 s | decode and paint 0.1 s; LCP estimate 1.8 s against the cap 2.5 s |
| 3D chunk and glb requested | 1.8 s | 1.8 s | start at poster paint (motion spec D3) |
| First bytes arrive | 1.95 s | 1.95 s | round trip |
| 3D chunk 200 KB + glb received | 3.25 s (200 + 60 KB) | 3.35 s (200 + 80 KB) | at 200 KB/s |
| Parse, decode meshopt, build scene, compile shaders, render first frame | +0.5 s | +0.5 s | 4 times CPU slowdown; target at most 8 shader programs |
| **First rendered frame** | **3.75 s** | **3.85 s** | |
| Margin to 4.0 s | 0.25 s | 0.15 s | |

Conclusions, stated plainly:

1. With the payload ceilings in this file the budget can be met, but the margin is 0.15 to 0.25 s, which is smaller than the error of any estimate here. It must be measured first in Phase 4 (RSK-3).
2. The arithmetic only works if 3D is requested at poster paint, not after `load` and idle (decision D3), and if the glb stays at 80 KB or less. A 3 MB hero asset would take 15 s on this profile; the NFR-7 cap and the NFR-8 four second line are therefore not independent: the four seconds is the real limit.
3. The compute step (0.5 s) is the least certain. In the cloud it is measured with a software renderer and so is pessimistic. On R1 the same step is expected to be shorter (hardware shader compile), but R1 is not on L1's throttled network unless the test also throttles it. Report both: "cloud (software GL)" and "R1".

Levers if the measurement misses, in the order to try them:

| Lever | Saving (estimate) |
| --- | --- |
| Poster smaller (AVIF at 60 KB instead of 100 KB) | 0.2 s on both stages |
| 3D chunk smaller (tree shaking, no unused loaders, no controls or post effects): every 20 KB | 0.1 s |
| glb smaller (merge meshes, drop the texture, drop detail): every 20 KB | 0.1 s |
| Fewer shader programs (merge materials; at most 6) | 0.1 s |
| Precompute the scene as one merged mesh per material | 0.05 s |
| Change the requirement: raise AC-53.3 to 4.5 s (a proposal for T2, A-12 allows this before T2, recorded as a requirement change) | 0.5 s of allowance |

Subsequent navigations (swup, same tab) do not pay for the 3D chunk or the decoder again; only that page's glb (at most 80 KB) and the scene build are needed, so they are well inside the same budget.

## 7. Adaptive quality steps (NFR-8 adaptive rule)

Rule (NFR-8, AC-53.4): if the median frame time over any 2 second window is above 22 ms, reduce quality by one step, up to three steps; if after the lowest step the median frame time is still above 33 ms for 3 consecutive seconds, switch to fallback mode.

Proposal for how the engine applies it:

- The median is taken over fixed 2 second windows; the first window starts at the first full opacity frame of the canvas.
- A step takes effect on the next frame; the next window starts then. No automatic return to a higher step in the same tab (avoids visible oscillation). The step reached and the fallback flag are kept in memory for the tab, so navigating to the next scene starts at the same step; they are never stored (NFR-15).
- A rendering test hook can force slow frames to prove the rule (AC-53.4): see section 9.3.

| Step | Render scale (times the capped pixel ratio) | Effective pixel ratio on R1 (cap 1.5, touch) | Effects removed or reduced (all scenes) | Scene specific changes |
| --- | --- | --- | --- | --- |
| 0 | 1.00 | 1.5 | none | none |
| 1 | 0.85 | 1.28 | particles halved; one octave less on water waves and glints; cloth updates every second frame | motion spec 9.x "Steps" lines, step 1 |
| 2 | 0.70 | 1.05 | particles off; clouds and secondary layers off; shadows decals off; two waves only | step 2 lines |
| 3 | 0.55 (floor: effective ratio never below 0.75) | 0.83 | glint, caustic and shimmer layers off; water becomes a gradient with two waves; cloth static; camera drift continues | step 3 lines |
| Fallback | n/a | n/a | Canvas removed, poster shown, controls hidden, no further 3D requests for the tab | Rule: median above 33 ms for 3 consecutive seconds at step 3 |

Other fixed rules: pixel ratio cap 1.5 on touch devices (`(any-pointer: coarse)`), 2 elsewhere (NFR-8); render scale changes only the drawing buffer, never the CSS size, so there is no layout shift; antialiasing is chosen once at context creation (on only where the device pixel ratio is below 1.5); no shadow maps; no post processing.

Verification (AC-53.4): in the cloud with the slow frame hook, assert the order step 0 to 3, one step per window, and fallback after the 3 second condition; in R1 confirm the real device does not step beyond 1 during the 20 second run (otherwise the scene is too heavy and the scene's geometry or shader must be reduced, not the governor loosened).

## 8. Memory budgets

| Budget | Value | Source | Method | Where |
| --- | --- | --- | --- | --- |
| JS heap growth after 20 navigations | at most 25 MB (target 10 MB) | NFR-8, AC-53.6 (target proposal) | Section 5.2 | Cloud; confirm R1 |
| WebGL contexts | 1 | NFR-8 | Section 5.2 | Cloud |
| JS heap attributable to a running scene (scene graph, typed arrays, glTF result released after build) | at most 20 MB | Proposal | Heap snapshot after first frame minus before scene start | Cloud |
| GPU memory attributable to a scene (buffers, textures with mipmaps, drawing buffer) | Phone at most 24 MB; desktop at most 64 MB | Proposal | Android: `adb shell dumpsys meminfo` graphics lines for the Chrome process before and after; iOS: Xcode/Instruments or Safari timeline memory if available; in the cloud only an analytic estimate from `renderer.info` and canvas size | R1, R2 only (cloud: estimate) |
| Decoded texture memory per scene | at most 1 MB | Proposal | Computed from texture sizes with mipmaps (width * height * 4 * 1.33) | Cloud |
| Drawing buffer size | CSS box times the pixel ratio squared; for the Home hero on R1 about 618 by 1056 pixels | Derived from NFR-8 cap | Read from the renderer | Cloud |
| Scene dispose leaves zero geometries and textures | 0 | Proposal | `renderer.info.memory` | Cloud |
| Peak heap during scene build (glTF parse and meshopt decode) | at most 40 MB above the heap before the build | Proposal | Sampled with CDP during the build | Cloud |

## 9. Transition, loader and motion hygiene budgets

### 9.1 Transition and loader (NFR-9, FR-29)

| Budget | Value | Source | Method | Where |
| --- | --- | --- | --- | --- |
| Page transition, exit plus entry, when the next page is ready | at most 800 ms | NFR-9, AC-54.1 | Design value 720 ms (300 exit + 420 entry); trace from visit start (pointer down) to the removal of `is-animating`, 10 runs, worst counts | Cloud (CSS timing); confirm R1 |
| Input blocked during a transition | at most 100 ms in total | NFR-9, AC-54.2 | Sum of long task blocking time (task duration above 50 ms) between visit start and the end of the transition; design: swap task at most 50 ms, dispose at most 15 ms, no 3D work inside the window | Cloud (4 times CPU throttle); confirm R1 |
| Added LCP from the transition | at most 200 ms | NFR-9, AC-54.3 | The same page loaded with transitions on and off (feature flag in the test build), median of 5 on L1 | Cloud |
| Loader appears only if the page is not ready within 300 ms | 300 ms | NFR-9, AC-54.4 | Delay the HTML by 100 ms (no loader, check a screenshot at 400 ms) and by 600 ms (loader visible from 300 ms); CSS animation delay is the mechanism | Cloud |
| Loader never visible more than 8 s | 8 s | NFR-9, FR-29, AC-27.5 | Stall the page's scripts and 3D assets; screenshot at 7.9 s and 8.5 s | Cloud |
| Reduced motion transition | at most 150 ms (design 120 ms) | NFR-11, AC-56.3 | Media emulation, trace | Cloud |
| Loader removal choreography after ready | 620 ms (200 fill + 420 lift) | Proposal | Trace | Cloud |
| Transition 8 second abort | at 8 s since visit start the browser does a normal navigation | FR-29, AC-27.5 | Stall the fetch, check navigation | Cloud |

### 9.2 Motion hygiene checks (all cloud measurable; run in `npm test` or the performance script)

| Check | Pass rule | Source |
| --- | --- | --- |
| Animated properties | Stylelint rule or test fails any `transition` or `animation` on `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, `box-shadow` or `all` | Design standard (proposal for the rule) |
| Reduced motion | With `prefers-reduced-motion: reduce`, `document.getAnimations()` is empty on every page after load; zero requests for the 3D chunk or any glb | NFR-11, AC-56.1, AC-56.2 |
| Paused | After pressing Pause, all remaining animations have `playState` paused, canvas pixels are identical across 10 s of capture, a link click swaps without an overlay | FR-30, AC-28.2 |
| Pause persists | Reload keeps it paused; a new browser context runs normally | AC-28.3 |
| No WebGL | `--disable-gpu` and `--disable-webgl` give zero 3D requests, posters visible | AC-57.1 |
| Save-Data, 2g | Emulated through CDP: zero 3D requests | AC-57.2 |
| Flash safety | Capture the canvas at 30 frames per second for 20 s in each scene; for each frame compute mean relative luminance; assert no more than 3 reversals of a change above 10 percent of full scale in any one second, and that no region above 25 percent of the canvas does | WCAG 2.3.1 (proposal for the automated check) |
| Poster to first frame match | Mean absolute difference over the free scene space at most 6 percent at 1440 by 900 and 390 by 844 | Proposal (motion spec 8.10) |
| Layout shift at the swap | 0 across the poster to canvas swap | AC-25.4 |
| No third party requests | Zero requests to other hosts | NFR-15, NFR-31 |

### 9.3 Test hooks required in a test build (not shipped in production)

The Developer builds these behind a build time flag so they are removed from the production bundle (production CSP is unchanged, ADR-0008). Names are proposals.

| Hook | Purpose | Used by |
| --- | --- | --- |
| Scene statistics reader: triangles, draw calls, pixel ratio, quality step, geometries, textures, programs, context count | AC-53.2, AC-53.4, AC-53.6, section 7 | Performance Engineer, QA |
| Frame recorder: frame timestamps and per frame JavaScript time | Section 5.1 | Performance Engineer |
| Slow frame injector: busy waits N ms per frame | AC-53.4 | QA |
| Asset stall: holds back the glb and the 3D chunk | AC-27.5 | QA |
| Pixel ratio cap override (to force the touch cap on an emulated desktop for L2) | Section 5.1 | Performance Engineer |

## 10. Risks to these budgets and how they are handled

| Risk | Effect | Handling |
| --- | --- | --- |
| RSK-3: software WebGL in Lighthouse and the cloud | TBT, Performance score and first frame look worse than a real phone | Report cloud and real device separately; never relax a cap because of a software result; confirm on R1 before treating as a defect |
| First frame margin of 0.15 to 0.25 s (section 6) | AC-53.3 could fail on L1 | Levers in section 6; measure in the first Phase 4 spike; ask Steven at T2 about 4.5 s if needed |
| Meshopt decode and shader compile on the main thread | TBT and INP | Task slicing, at most 8 programs, parallel shader compile where supported |
| Transition cover time adds to LCP | AC-54.3 | Fallbacks in motion spec 5.4 |
| No physical R1 or R2 available | Frame rate stays "emulated" (L2) or unmeasured | A-27: L2 on a GPU machine labelled "emulated"; R1 and R2 confirmation listed as open items for T3; the cloud cannot stand in for either |
| Low Power Mode on iPhone | 30 Hz frame pacing reads as slow | Acceptable fallback to poster (motion spec R-M5) |

Re-baselining: the Performance Engineer may propose changes to any proposal in this file after the spike; numbers taken from a requirement can only be changed as a recorded requirement change (A-12).

## 11. What needs a real phone, and open items

### 11.1 Needs a real phone or a GPU machine (cannot be closed in the cloud)

1. Median fps and the slowest 1 percent per scene (NFR-8, AC-53.1): R1 gate; L2 emulated otherwise.
2. INP with real touch input (NFR-6): R1 and R2.
3. First rendered frame timing without software rendering (AC-53.3): R1.
4. GPU memory and heat: the 5 minute soak on R1 (section 5.1) and GPU memory on R1 and R2 (section 8).
5. iOS: the tilt permission flow (AC-25.5), WebP and WebAssembly on Safari 16.4, and touch scrolling over the canvas (AC-25.2).
6. Whether the scene looks right: colour, depth, feel of the springs and the transition. This is a human judgement on a real screen, at T2 and T3.

### 11.2 Open items

| Item | Owner |
| --- | --- |
| Install a headless Chromium (and Lighthouse) in the cloud workspace and record versions; none is present now | DevOps Engineer |
| Reaching the phones: the server binds to loopback only (FR-47). Android can use USB port forwarding (`adb reverse`); an iPhone needs a documented test only route that does not weaken the default binding | DevOps Engineer and Security Engineer |
| Agree the test hooks of section 9.3 and the build flag that removes them | Developer and Security Engineer |
| Confirm or change the proposals in this file (A-12) | Performance Engineer, System Architect |
| Decide the 4 second line if the Phase 4 spike misses it (section 6) | Orchestrator with Steven at T2 |
| Update `docs/architecture.md` section 13 and ADR-0007 step 4 for decisions D2 and D3 of the motion spec | System Architect |

## 12. Reporting format

Every performance report shall list, for each number: the budget id (this file's section and row), the environment label (section 2.1), the tool and version, the number of runs and whether the median or the worst is shown, the page or scene, the language, and the commit. A result from the cloud is never presented as a result from R1, R2 or L2.
