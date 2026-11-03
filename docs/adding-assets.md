# Adding an Asset

Every asset is one JavaScript module in `assets/`. Save the file and the open
Foundry page updates in about a second. There is no upload, build step or image
export.

## 1. Start the Foundry

Double-click `start.cmd`, or run:

```powershell
node tools\foundry\server.mjs --open
```

The library opens at <http://127.0.0.1:4321/>. Keep the terminal open.

## 2. Create the module

Use the scaffolder:

```powershell
node tools\foundry\new-asset.mjs props "Market Stool"
```

This writes `assets/props/market-stool.js` with a placeholder box. The Foundry
watches the folder, so the new card appears immediately.

You can also create the file by hand:

```js
import { P } from '../lib/palette.js';

export default {
  key: 'market-stool',           // must match the filename
  name: 'Market Stool',
  category: 'props',             // folder name, one of the categories below
  blurb: 'Low wooden stool used at the market stalls.',
  what: 'a low wooden stool',    // 150 ms hover descriptor
  footprint: [0.6, 0.6],         // [width, depth] in tiles; 1 tile = 2 m
  height: 0.5,                   // in tiles
  tags: ['market', 'timber', 'seat'],
  refs: ['AF-REF-021'],
  hero: 0,                       // preferred view angle
  status: 'review',
  draw(g) {
    g.box({ x: 0, y: 0, z: 0.34, w: 0.46, d: 0.46, h: 0.08, c: P.timber });
    g.box({ x: 0, y: 0, z: 0, w: 0.36, d: 0.36, h: 0.34, c: P.bark });
  },
};
```

## 3. Draw with primitives

All coordinates are in tiles, centred on the asset origin. The ground is `z = 0`.

### `g.box({ x, y, z, w, d, h, c, top, left, right, bias })`

An axis-aligned volume. `x/y/z` is the centre of the bottom face; `w/d/h` are
full sizes. `top`, `left` and `right` override the automatic face shading.
`bias` nudges a face forward in the painter sort. Use `bias: 0.2` on doors,
windows and other panels mounted to a tall wall; a face's sort depth is based on
its centroid, so an unpushed panel can lose to the wall behind it.

### `g.roof({ x, y, z, w, d, h, c, gable, ridge })`

A pitched roof. `ridge: 'x'` (default) runs the ridge along x; `'y'` runs it
along y. `gable` is the colour of the triangular end walls. The roof overhangs
the building, so keep openings below the eaves.

### `g.cyl({ x, y, z, r, h, c, axis, segments, r2, top })`

A cylinder, cone or tapered drum. `axis` is `'z'` (default), `'x'` or `'y'`.
`r2` tapers the top radius. Use `segments: 8–14`; fewer reads more graphic.
For wheels, use a full-width axle so the face is visible from every angle:

```js
g.cyl({ x: 0.7, y: 0, z: 0.22, r: 0.22, h: 0.94, c: P.black, axis: 'y' });
```

### `g.circle({ x, y, z, r, c, dx, dy, bias })`

A camera-facing circle anchored to a world point. Use it for canopies, berries,
seed heads, lamp glows. `dx`/`dy` nudge it in screen space.

### `g.decal({ x, y, z, points, c, rotate, scale, bias })`

A camera-facing polygon anchored to a world point. Points are in world units,
measured in screen axes. Use it for leaves, blade banks, flags and sign faces.
It always faces the camera, so avoid it where a side view must show a thin edge.

### Shared parts

`assets/lib/parts.js` has `tree()`, `wheel()`, `panel()` and `glow()` helpers.
They are optional; a self-contained `draw()` is easier to read for one-off props.

## 4. Save and review

The server watches `assets/` and pushes a change event over SSE. The page
rebuilds the card grid, keeps the open inspector in sync, and shows a toast for
new or changed files. A broken module becomes one error card; it never takes the
library down.

In the inspector:

- **0° / 90° / 180° / 270°** switch canonical views. Drag the stage to orbit;
  release to snap back to the nearest 90°.
- **Scale check** overlays a 1-tile grid and a 1.8 m citizen silhouette.
- **32 px test** renders the asset at thumbnail size in the corner.
- **Copy as CSS** and **Copy HTML/DOM** export the geometry as pure CSS layers and DOM elements with clip-path.
- **Drawing snippet** is the live `draw.toString()`; **Copy module** gets the
  whole file.

## 5. Validate

```powershell
node tools\foundry\validate.mjs
```

The validator checks imports, keys, categories, metadata, draw errors and the
primitive/colour budget. The same checks run in the server. Add `--json` for
machine-readable output.

## 6. Approve

Only the user moves `status` from `review` to `approved`. The approved set is
what future phases will export into the game.

## Categories

`nature`, `props`, `buildings`, `vehicles`, `tech`, `interior`, `characters`.

New categories can be added to `CATEGORIES` and `CATEGORY_ORDER` in
`assets/lib/palette.js`; the UI builds its sidebar and filters from that map.

## Rules of thumb

- Keep the artwork inside its footprint. The inspector's scale grid is the
  fastest way to check.
- Four colours, including the ground shadow.
- Three to six primitives. If you need a seventh, ask whether two shapes can
  merge.
- Big silhouette first. Add one accent. Stop.
- No gradients, outlines, textures, text or extra cast shadows.
- Use palette tokens from `assets/lib/palette.js`; do not hard-code hex values.
- Name the file after the `key`, and the key in kebab-case.

## Troubleshooting

**The card is a red error card.**
Open it; the inspector shows the import or draw error. Fix the file and save.
The error is isolated to that asset.

**The page did not update.**
Check the status dot in the rail. `watching` means SSE is connected. If it says
`reconnecting`, the server stopped; restart `start.cmd`. The UI also polls every
5 seconds while disconnected.

**The card is blank.**
The module imported, but `draw()` produced no geometry. Check that the asset
uses `g.*` calls and returns a non-zero footprint.

**The asset is clipped at the neck.**
Its geometry is taller than `height`, or wider than `footprint`. The renderer
fits the actual bounds, but the scale check and game footprint use the declared
values. Correct the metadata.
