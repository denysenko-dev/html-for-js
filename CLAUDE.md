# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this branch is

`lesson-19` is one snapshot in a per-lesson branch chain (`lesson-1` … `lesson-19`) built for a frontend
development course homework repo. Each lesson branch's tip commit is titled `lesson-N <type>: <description>`
and sits on top of the previous lesson's branch. This branch is a Gulp-based project living directly at the
**repo root**: `gulpfile.js`, `package.json`, `src/` → `build/` (gitignored).

The curated version of the whole course (`unit_01` … `unit_20_21`, one folder per lesson) lives on `main`,
where this same project sits under `main`'s `unit_19/` instead of the repo root. Don't expect `unit_NN/`
folders on this branch — see `main`'s `CLAUDE.md`/`README.md` for the full course structure.

## Commands

```
npm install    # installs devDependencies (gulp + plugins) and dependencies (bootstrap, fontsource fonts)
npx gulp       # one-shot build: clears build/, compiles html/css/js/images/fonts into build/
npx gulp watch # build + watch src/ + serves build/ via BrowserSync on http://localhost:3000
```

No lint/test tooling is configured; the `test` script in `package.json` is npm's unused default placeholder.
Use `npm ci --dry-run` to check `package.json`/`package-lock.json` are in sync without touching `node_modules`.

## Gulp pipeline (`gulpfile.js`)

Tasks, run in parallel after `clear` wipes `build/`:
- `css` — minifies `src/css/*` with `gulp-clean-css`, only rebuilds changed files
- `js` — copies changed `src/js/*` as-is
- `img` — optimizes `src/images/*` with `gulp-imagemin`
- `html` — copies `src/*.html`
- `fonts` — copies a **hardcoded list** of `.woff2` files out of `node_modules/@fontsource/*` (Roboto,
  IBM Plex Serif) into `build/fonts`; if a font package is added/changed, this file list in `gulpfile.js`
  must be updated by hand, it isn't derived automatically

`exports.default` runs the build once; `exports.watch` additionally runs the build first (`clear` +
all tasks), then watches `src/` and starts BrowserSync.
