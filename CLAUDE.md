# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`tilda-client` is a small TypeScript client library for the Tilda CMS API (`api.tildacdn.info`), published to npm as `tilda-client`. It has one consumer in this workspace: the Tilda Shopify app at `../tilda-shopify-app/` (see its own `CLAUDE.md`), which depends on it via the npm registry, not a local link — changes here are not visible there until a new version is published and the dependency is bumped.

## Commands

- `npm run build` — compile `src/` to `lib/` via `tsc` (also runs automatically before `npm publish` via the `prepare` script, and before `git push` via the husky `pre-push` hook)
- `npm run lint` — `eslint --fix` over `src/` and `test/`
- `npm run format` — `prettier --write` over `src/` and `test/`
- `npm run pub` — bump the patch version (`npm version patch`, which also runs `format`, commits `src`, and pushes commits+tags via the `version`/`postversion` hooks) and `npm publish`

There is no automated test suite (no Jest/Mocha config despite the leftover `"jest": true` ESLint env). `test/global.test.ts` is a manual smoke script that exercises every `TildaClient` method end-to-end against the real Tilda API — run it with `npx ts-node test/global.test.ts` after populating `TEST_PUBLIC_KEY`/`TEST_SECRET_KEY` in a `.env` (see `.env.sample`; get real keys from a Tilda account's API keys page). It requires live network access and a real Tilda project with at least one page.

The husky `pre-commit` hook runs `format` + `lint`; `pre-push` runs `build`. Both fire automatically on the corresponding git command — don't bypass them with `--no-verify`.

## Architecture

`TildaClient` (`src/tilda.client.ts`) is a thin wrapper: each of its 8 methods builds one Tilda API URL from `publicKey`/`secretKey` (plus a `projectid`/`pageid` where relevant), does a single `fetch`, and returns `.result` from the parsed `TildaResponse<T>` envelope (`src/tilda.types.ts`) on `res.ok`, or calls `throwTildaError(res)` (`src/tilda.error.ts`) otherwise, which parses the body as JSON and throws a `TildaError` carrying Tilda's own `status`/`message`.

Known architecture gotcha: every method calls `res.json()` directly with no fallback. If Tilda ever returns a non-JSON body (e.g. an HTML error/maintenance page) alongside an HTTP 200 (`res.ok === true`), `res.json()` rejects with a bare `FetchError` from the underlying `cross-fetch`/node-fetch — and that library discards the raw response body internally before throwing, so the rejection carries no information about what was actually returned. There is currently no `res.clone()`/`res.text()` fallback anywhere in this client to preserve that body for diagnostics.

Types (`src/tilda.types.ts`) mirror Tilda's API response shapes exactly (`TildaProject`, `TildaProjectData`, `TildaProjectExport`, `TildaPage`, `TildaPageData`, `TildaPageExport`) — the `...Data`/`...Export` variants add fields (`css`/`js`, or export-specific path/mapping fields) on top of the corresponding list-level type. `src/index.ts` re-exports everything; consumers only ever import from the package root.
