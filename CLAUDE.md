# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Homework repository for a frontend development course (HTML5/CSS3 → Flexbox/Grid → Gulp build automation →
Bootstrap → JavaScript/deployment). See `README.md` (on `main`) for the unit-by-unit syllabus breakdown.

## Branching model (read this before assuming file layout)

The repo has two different structures depending on which branch is checked out, and this trips up anyone
expecting a single consistent layout:

- **`main`** — the curated branch. Every lesson lives in its own `unit_NN/` folder at the repo root
  (`unit_01` … `unit_20_21`). This is what gets reorganized/copied over from the lesson branches.
- **`lesson-1` … `lesson-19`** — one branch per lesson, pushed to `origin` as individual snapshots. Each
  branch's tip commit is titled `lesson-N <type>: <description>` and (mostly) has exactly one commit on top
  of the previous lesson's branch. From `lesson-15` onward these branches carry the project files (`gulpfile.js`,
  `package.json`, `src/`) directly at the **repo root**, not inside a `unit_NN/` subfolder — i.e. the same
  content that later lands in `main`'s `unit_15`–`unit_19` folders.

Because of this, `git log`/`git blame` on `main` and on a `lesson-N` branch tell different stories for what is
conceptually the same lesson. When asked to work on "unit_17" or similar, check whether you're on `main`
(look in `unit_17/`) or need to check out `lesson-17` (files at repo root).

Not every lesson branch has a `package.json`: only `lesson-15`–`lesson-19` do (Gulp was introduced at lesson 14,
formalized with a `package.json` at lesson 15). Only commit `package-lock.json` on branches/folders that already
have a `package.json` next to it.

## Two kinds of units

- **`unit_01`–`unit_13`** (static, no build step): each is just `unit_NN/unit_NN.html` +
  `unit_NN/css/unit_NN.css` (+ an `images/` folder). Open the HTML file directly in a browser — nothing to
  install or compile.
- **`unit_14`–`unit_19`** (Gulp-based; on `main` each is its own project under `unit_NN/`, on the `lesson-15`+
  branches the same files sit at repo root): source lives in `src/`, Gulp compiles it into `build/` (gitignored).
  `unit_14` has a `gulpfile.js` but no `package.json` — it predates the lockfile/package setup added at lesson 15.

## Commands (run from inside a Gulp-based unit, or repo root on a `lesson-15`+ branch)

```
npm install       # installs devDependencies (gulp + plugins) and dependencies (varies by lesson, see below)
npx gulp          # one-shot build: clears build/, compiles src/ into build/
npx gulp watch    # watches src/, serves build/ via BrowserSync on http://localhost:3000
                   # (unit_15-17: does NOT build first — run `npx gulp` once beforehand)
```

There is no lint/test tooling configured. The `test` script in `package.json` is npm's default placeholder
(`echo "Error: no test specified" && exit 1`) and is not meant to be run.

To verify a `package.json`/`package-lock.json` pair are in sync without touching `node_modules`, use
`npm ci --dry-run`.

## Gulp pipeline shape (`gulpfile.js`)

The pipeline is **not** identical across `unit_15`–`unit_19` (and their `lesson-15`–`lesson-19` equivalents) —
it evolved lesson by lesson. Base tasks present everywhere, run in parallel after `clear` wipes `build/`:
- `css` — minifies `src/css/*`, only rebuilds changed files (`gulp-changed`)
- `js` — copies changed `src/js/*` as-is
- `img` — optimizes `src/images/*` with `gulp-imagemin`
- `html` — copies `src/*.html`

Per-lesson differences, check the actual `gulpfile.js` on the unit/branch you're touching before assuming:
- **CSS minifier**: `unit_15` uses the older, deprecated `gulp-cssnano`; `unit_16`–`unit_19` use `gulp-clean-css`.
- **`fonts` task**: only exists from `unit_18` onward — copies a **hardcoded list** of `.woff2` files out of
  `node_modules/@fontsource/*` into `build/fonts`; if a font package is added/changed, this list must be
  updated by hand, it isn't derived automatically.
- **`exports.watch`**: on `unit_15`–`unit_17` it's `parallel(watchFiles, browserSync)` — it does **not** build
  first, so `build/` must already exist (run `npx gulp` once) before `npx gulp watch` serves anything. On
  `unit_18`–`unit_19` it runs the full build (`clear` + all tasks) before watching, so `npx gulp watch` alone
  is enough.

`exports.default` always runs the build once.
