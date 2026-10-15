# API contract

`openapi.yaml` (written by the System Architect at Phase 4) is the source of truth for the API. The web repo generates its typed client from it, and contract tests in the api repo check the implementation against it. Change the contract first, then the code.
