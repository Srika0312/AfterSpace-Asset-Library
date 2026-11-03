# The Afterspace / Foundry

A local, zero-dependency asset library for **The Afterspace**. Every asset is
drawn entirely in code, hot-reloads into the browser as it is saved, and exports
to pure CSS and DOM elements from the same geometry used in the live preview.

![The Foundry gallery](docs/foundry-gallery.png)

## Quick start

Double-click **`start.cmd`**, or run:

```powershell
node tools\foundry\server.mjs --open
```

The library opens at **<http://127.0.0.1:4321/>**. Press `Ctrl+C` in the
terminal to stop it. If port 4321 is busy, the server tries 4322–4332 and prints
the URL it found.

No `npm install`, no build step, no CDN. The only runtime is Node's standard
library and the browser.

## What is in the library

Twelve seed assets across four categories:

| Category | Assets |
| --- | --- |
| Nature | Procedural Tree, Water Reed |
| Props | Street Lamp, Stop Sign, Hay Bale |
| Buildings | Suburban House, Farm Barn, Grain Silo, Windmill |
| Vehicles | Combine Harvester, Transit Bus, Vehicle Container |

The procedural tree, combine and transit bus are the visual benchmark. The rest
are in review.

## The live loop

1. Create or edit a file in `assets/`.
2. Save it.
3. The server detects the change, rebuilds the registry, and pushes an SSE
   event.
4. The open page refreshes the affected cards and keeps the inspector in sync.

A broken asset becomes a single error card with the import or draw error. It
never takes the rest of the library down. Turn **Follow edits** on in the rail to
open newly added assets automatically.

## Reviewing an asset

Click any card to open the inspector.

- **0° Front / 90° Right / 180° Back / 270° Left** are the canonical views.
- Drag the stage to orbit freely; release to snap to the nearest 90°.
- **Scale check** overlays a 1-tile grid and a 1.8 m citizen silhouette.
- **32 px test** renders the asset at thumbnail size.
- **Copy as CSS**, **Copy HTML/DOM** and **Download CSS** export pure CSS layers with clip-path.
- **Drawing snippet** shows the live `draw()` source.
- **Copy module** copies the whole asset file.

![The inspector](docs/foundry-inspector.png)

![Six assets across all four views](docs/foundry-views.png)

## Authoring

See [`docs/adding-assets.md`](docs/adding-assets.md) for the full guide and
[`docs/art-direction.md`](docs/art-direction.md) for the visual rules.

```powershell
# Scaffold a new asset
node tools\foundry\new-asset.mjs props "Market Stool"

# Validate every asset
node tools\foundry\validate.mjs

# JSON output for tooling
node tools\foundry\validate.mjs --json
```

An asset is a default-exported object with metadata and a `draw(g)` function:

```js
import { P } from '../lib/palette.js';

export default {
  key: 'market-stool',
  name: 'Market Stool',
  category: 'props',
  blurb: 'Low wooden stool used at the market stalls.',
  what: 'a low wooden stool',
  footprint: [0.6, 0.6],
  height: 0.5,
  tags: ['market', 'timber', 'seat'],
  refs: ['AF-REF-021'],
  hero: 0,
  status: 'review',
  draw(g) {
    g.box({ x: 0, y: 0, z: 0.34, w: 0.46, d: 0.46, h: 0.08, c: P.timber });
    g.box({ x: 0, y: 0, z: 0, w: 0.36, d: 0.36, h: 0.34, c: P.bark });
  },
};
```

## Project structure

```
assets/                 the library itself
  space/                one file per asset
  industrial/
  lib/
    palette.js          colour tokens and categories
    sketch.js           pure isometric geometry engine
    css.js              CSS and DOM export from sketch primitives
    parts.js            shared tree / wheel / panel / glow helpers
tools/
  foundry/
    server.mjs          static host, registry, SSE watcher, validation API
    library.mjs         scanner, loader, validator
    validate.mjs        CLI validator
    new-asset.mjs       asset scaffolder
  web/
    index.html          gallery and inspector shell
    css/                tokens and layout
    js/                 app, canvas scene, hover, inspector, API helpers
    fonts/              local Fredoka + Nunito (no CDN)
  qa/                   temporary browser QA scripts
docs/                   art direction, authoring guide, screenshots
start.cmd               double-click launcher
```

## How it works

- **One geometry engine.** `assets/lib/sketch.js` projects, sorts and shades
  primitives. The canvas renderer and the CSS generator both consume the same
  sorted primitive list, so preview and export cannot drift.
- **No image files.** Assets are JavaScript modules. There is no model, texture
  or sprite pipeline.
- **Generated registry.** The server writes a tiny ES module at
  `/generated/registry.js` that imports each valid asset with its mtime as a
  cache-buster. Only changed modules re-evaluate.
- **SSE, not polling.** The browser listens on `/api/events`. While the event
  stream is down, the UI falls back to a 5-second poll.
- **Validation in both places.** The server validates on load; the CLI uses the
  same scanner so `npm run validate` and the live error cards agree.
- **Local by default.** The server binds `127.0.0.1`. Use `--lan` only when you
  explicitly want another device on the network to see the library.

## Scripts

| Script | What it does |
| --- | --- |
| `node tools\foundry\server.mjs` | Serve the library on 127.0.0.1:4321 |
| `node tools\foundry\server.mjs --open` | Serve and open the browser |
| `node tools\foundry\server.mjs --lan` | Bind all interfaces (opt-in) |
| `node tools\foundry\validate.mjs` | Validate assets and budgets |
| `node tools\foundry\new-asset.mjs <category> <name>` | Scaffold an asset |

`package.json` mirrors these as `start`, `serve`, `validate` and `new` if you
prefer npm. No dependencies are installed by any script.

## Design constraints

- Flat isometric, fixed upper-left light, no outlines, gradients or textures.
- Aim for **3–6 primitives** and **4 palette colours** per asset.
- Must read at **32 px** and in all four canonical views.
- **1 tile = 2 m**; assets stay inside their declared footprint.
- Warm habitat palette with restrained teal glass and brass tech accents.
- The shared ground shadow comes from the engine; assets do not paint their own.

## Scope

This phase is asset creation and showcase only. There is no NPC economy,
Instagram integration or game runtime yet. The export surface is intentionally
focused: pure CSS/DOM layers per view and the source module. When the runtime arrives,
`draw()` remains the single source of truth.

## Fonts

Fredoka and Nunito are bundled locally as WOFF2 files for offline use. Both are
licensed under the SIL Open Font License. The UI makes no network requests.

## QA

`tools/qa/` contains temporary browser scripts used during the build:

- `cdp-check.mjs` — gallery, hover timing, inspector views, CSS, deep links,
  theme, live add / break / remove.
- `mobile-check.mjs` — 390 px layout and touch targets.
- `render-sheet.mjs` — CSS/DOM contact sheet.
- `views-sheet.mjs` — four-view audit for every asset.
- `hero-views.mjs` — large four-view crops for the hero assets.

They are development aids, not part of the runtime.
