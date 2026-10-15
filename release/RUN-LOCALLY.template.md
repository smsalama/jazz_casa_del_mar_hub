# PROJECT_NAME, version PACKAGE_VERSION: run it on your Mac

## What is in this folder

- `web/`: the website or web app
- `api/`: the backend, if the project has one
- `docs/`: the project records: brief, requirements, designs, gate results, evidence and the release report (`docs/docs/release/PACKAGE_VERSION/`)

## Steps

1. Open Terminal and go to this folder: `cd` followed by a space, then drag the folder onto the Terminal window, then press Return.
2. Run `bash setup.sh`. It checks your Mac has what is needed and tells you exactly what to install if not. Run it again after installing anything.
3. Run `bash verify.sh`. It repeats every check the agency ran. Compare its summary with the verify logs in `docs/EVIDENCE_DIR/` (they are committed to the hub shortly after this package is built, so they may be in the hub on GitHub rather than in this folder).
4. Start the site by following `web/RUN-LOCALLY.md` (and `api/RUN-LOCALLY.md` first, if there is an api folder).
5. Work through `docs/docs/release/PACKAGE_VERSION/review-checklist.md` in your browser.

## If something fails

Copy the error into the project's claude.ai chat. Nothing in this folder contains passwords or keys; fill in `.env` files yourself where `.env.example` asks.
