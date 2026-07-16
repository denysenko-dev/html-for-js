# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this branch is

`lesson-15` is one snapshot in a per-lesson branch chain (`lesson-1` … `lesson-19`) built for a frontend
development course homework repo. Each lesson branch's tip commit is titled `lesson-N <type>: <description>`
and sits on top of the previous lesson's branch. This branch is a Gulp-based project living directly at the
**repo root**: `gulpfile.js`, `package.json`, `src/` → `build/` (gitignored).

The curated version of the whole course (`unit_01` … `unit_20_21`, one folder per lesson) lives on `main`,
where this same project sits under `main`'s `unit_15/` instead of the repo root. Don't expect `unit_NN/`
folders on this branch — see `main`'s `CLAUDE.md`/`README.md` for the full course structure.

## Commands

```
npm install    # installs devDependencies (gulp + plugins)
npx gulp       # one-shot build: clears build/, compiles html/css/js/images into build/
npx gulp watch # watches src/ and serves build/ via BrowserSync on http://localhost:3000
```

No lint/test tooling is configured; the `test` script in `package.json` is npm's unused default placeholder.
Use `npm ci --dry-run` to check `package.json`/`package-lock.json` are in sync without touching `node_modules`.

## Gulp pipeline (`gulpfile.js`)

Tasks: `clear` (wipes `build/`) → `html`, `js`, `css`, `img` in parallel:
- `css` — minifies `src/css/*` with **`gulp-cssnano`** (older/deprecated minifier; later lessons switch to
  `gulp-clean-css` — check the branch you're on before assuming which one applies), rebuilds only changed files
- `js` — copies changed `src/js/*` as-is
- `img` — optimizes `src/images/*` with `gulp-imagemin`
- `html` — copies `src/*.html`

`exports.default` runs the build once. `exports.watch` on this branch is `parallel(watchFiles, browserSync)` —
it does **not** run a build first, so `build/` must already exist (e.g. from a prior `npx gulp`) before
`npx gulp watch` will serve anything.
