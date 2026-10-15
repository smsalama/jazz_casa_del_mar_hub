# ADR-0009: Media upload with sharp in a short-lived child process, one job at a time

- Status: Proposed (for T2); needs Steven's licence approval for the libvips binaries (LGPL-3.0-or-later)
- Date: 2026-10-15
- Author: System Architect (P4-T2)
- Requirements: FR-40, FR-41, NFR-7, NFR-10, NFR-18, NFR-23, NFR-35, NFR-31; G-13, G-14; A-29; threat model section 9 ("Image processing library"), TM-39 to TM-44; RSK-13, RSK-23

## Context

Signed-in staff upload JPEG, PNG, WebP or AVIF photos of up to 10 MB and 40 megapixels, up to 20 at once (NFR-23). For each, the server makes AVIF and WebP copies at 480, 768, 1280 and 1920 pixels wide (never wider than the original), applies the camera orientation, strips all metadata, keeps the original out of the public area (FR-41), and must finish a 10 MB photo within 30 s on one CPU (NFR-10). Dimensions are read from the header before decoding; decoding happens in a separate worker or process limited to 60 s and 256 MB; a failure rejects the upload and leaves the site serving (G-14). At most one image job at a time (NFR-35). Media storage is capped at 2 GB by default with a warning at 80 percent (NFR-23).

## Options considered

1. **sharp** (libvips), with prebuilt binaries. Fast (shrink on load for JPEG), streams large images, mature, used widely. Its prebuilt libvips package is licensed LGPL-3.0-or-later, which is not on the NFR-31 allow-list.
2. **WebAssembly codecs** (the jSquash packages: mozjpeg, libwebp, libavif, oxipng, resize). Licences are permissive (Apache-2.0 wrappers; BSD and IJG codecs, the IJG licence is also not on the allow-list), but AVIF encoding in WebAssembly on one CPU is several times slower than native, and a 40 megapixel image needs about 160 MB of decoded pixels in WebAssembly memory with no streaming.
3. ImageMagick or another system binary: depends on what the client's server has installed (RSK-6), larger attack surface.

## Decision

Option 1: **sharp 0.35.5** (Apache-2.0) with its pinned prebuilt **libvips 8.18.7** (`@img/sharp-libvips-*` 1.3.4, LGPL-3.0-or-later), subject to Steven's approval of that licence in the licence register at T2. LGPL obligations are met by shipping libvips unmodified as a separate dynamically loaded library, including its licence text and a source pointer in the third party notices file (LR-40). If Steven does not approve, option 2 replaces it behind the same worker interface, and the Performance Engineer re-measures NFR-10.

Flow:

1. The admin portal sends one file per request (`POST /admin/api/media`, raw bytes, `Content-Type: application/octet-stream`, display name in the `name` query parameter, batch id and position in `batch` and `index`). A batch of up to 20 is a sequence of requests; the server refuses `index` above 19 for a batch (NFR-23). One file per request keeps the request body at 10 MB or less instead of 200 MB.
2. The request stream is written to `DATA_DIR/tmp/<random>` with a byte counter; above 10 MB the request is cut off with 413 and the file deleted. `Content-Length` above the limit is refused before reading.
3. **Type and size check before decoding**: the first bytes must be a JPEG, PNG, WebP or AVIF signature; SVG, GIF, PDF, HTML, archives and anything else are refused with 415, whatever the name or declared type (NFR-23). Dimensions are read from the header by the worker with `sharp(file).metadata()` (header only) and refused above 40 megapixels before any pixel is decoded.
4. The job waits in a single-slot queue (NFR-35), then the server starts a **fresh child process** (`child_process.fork('dist/workers/image-worker.mjs')`, `--max-old-space-size=96`, no inherited environment except what it needs, working directory `DATA_DIR/tmp`). Inside: `sharp.cache(false)`, `sharp.concurrency(1)`, `limitInputPixels: 40000000`, `failOn: 'error'`, `.rotate()` (applies EXIF orientation), then for each width up to the original: `.resize({ width, withoutEnlargement: true })`, AVIF (quality about 50, effort 4) and WebP (quality about 78). sharp drops all metadata unless asked to keep it, so EXIF, XMP, IPTC and GPS are removed from every copy (FR-41, TM-42).
5. **Limits**: the parent kills the child with `SIGKILL` after 60 s, and every 250 ms reads the child's resident memory (from `/proc/<pid>/status` on Linux, `ps -o rss=` on macOS) and kills it above 256 MB (G-14). A killed or failed job rejects the upload with a clear message and deletes every partial file; the site keeps serving because the work never ran in the server process.
6. Output: the original moves to `DATA_DIR/media/originals/<fileKey>.<ext>` (never served, NFR-18); variants go to `DATA_DIR/media/public/<fileKey>-<rev>-<width>.<avif|webp>`. `<fileKey>` is a random 26 character lower case base32 key (not the API id); `<rev>` changes when the file is replaced, so variant URLs can be cached for a year. User supplied names are stored only as display text and never reach the file system (TM-43).
7. Serving: `GET /media/{file}` matches the file name against `^[0-9a-z]{26}-[0-9]{1,4}-(480|768|1280|1920)\.(avif|webp)$` and serves only from the public variants folder with the correct media type, `nosniff`, `X-Robots-Tag` and `Cache-Control: public, max-age=31536000, immutable`. Nothing else under `DATA_DIR` has a URL (AC-63.3).
8. Public pages use `<picture>` with AVIF and WebP `srcset`, `sizes`, explicit width and height, and `loading="lazy"` below the first screen (FR-41).
9. Rules in the library: a photo is not selectable for a public field until it has English alternative text (FR-40); deletion of a used photo is refused with the list of pages that use it (`media_usage` is rebuilt from the content snapshot on every save); public copies of a deleted photo are removed at once, the original 30 days later by the purge job (Retention schedule).
10. Quota: total bytes of originals and variants are tracked; the portal warns at 80 percent and the upload is refused at 100 percent (NFR-23, TM-44).

Build time images (posters, design assets in the repo) are processed by Astro's image pipeline at build, which also uses sharp, on the developer's machine; nothing changes at run time.

## Consequences

- Uploads are processed one at a time; a batch of 20 large photos takes a few minutes. The portal shows per file progress.
- The worker is a separate program that loads only sharp; a decoder exploit is contained to a short-lived process with a time and memory limit and no network use (TM-41). The hosting guide adds that the site's account should have no write access outside the app and data folders.
- sharp's native binary must match the platform; `npm ci` picks the right optional package for macOS (arm64 or x64) and Linux (glibc x64 or arm64). No install script runs.
- A browser outside NFR-29 that lacks AVIF and WebP shows alternative text (A-29).

## Versions and licences

| Component | Version | Licence | Use |
| --- | --- | --- | --- |
| sharp | 0.35.5 | Apache-2.0 | Image decode, resize, encode |
| @img/sharp-libvips-* (libvips 8.18.7 and its bundled codecs) | 1.3.4 | LGPL-3.0-or-later (needs recorded approval) | Native image library |
| @img/sharp-* platform binding | 0.35.5 | Apache-2.0 | Native binding |
