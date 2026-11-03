# The Afterspace — Art Direction

The Foundry draws every asset from a short list of code primitives. There are no
textures, models or image files. The art is the geometry.

## The one-sentence bar

A new asset should read as its object at **32 px**, in **four different views**,
using **three to six primitives** and **no more than four palette colours**.

If a detail disappears at thumbnail size, it is not a detail. Delete it.

## Projection

- Fixed isometric camera, 2:1 screen ratio. `x` runs right-ish, `y` runs
  depth-ish, `z` is up.
- One world unit is one tile. **One tile = 2 m.** A citizen is 1.8 m.
- Assets are centred on their own footprint and sit on `z = 0`.
- The engine sets the view; assets declare a `footprint: [w, d]` and a `height`
  in tiles, and stay inside them.

The four canonical views are `0° Front`, `90° Right`, `180° Back` and `270° Left`.
Free orbit is for inspection only; exported CSS layers use a canonical angle.

## Palette

A single warm habitat palette keeps the library coherent. Import it from
`assets/lib/palette.js` and use the tokens; never hard-code a new hex inside an
asset.

| Role | Tokens |
| --- | --- |
| Ink / paper | `ink`, `inkSoft`, `paper`, `cream`, `line` |
| Habitat greens | `canopy`, `leaf`, `leafLight`, `pine`, `moss` |
| Timber / earth | `bark`, `barkDark`, `soil`, `sand`, `wheat`, `straw`, `hay` |
| Built | `clay`, `terracotta`, `brick`, `roof`, `roofDark`, `timber` |
| Metal / tech | `brass`, `steel`, `steelDark`, `slate`, `glass`, `glassDeep`, `teal`, `cyan` |
| Signals | `rust`, `red`, `amber`, `white`, `offWhite`, `black` |

Rules of thumb:

- **Four colours per asset**, including the shadow. Prefer one dominant hue,
  one supporting hue and one signal/accent.
- **Top faces are lightest, left faces mid, right faces darkest.** The engine
  applies this automatically. Use `top`, `left` and `right` overrides only when
  an object needs a deliberate exception, such as a glass cab.
- Teal/cyan glass and brass tech accents are the only "future" notes. Use them
  sparingly; the habitat should feel warm, not sci-fi.
- Red is for transit, stop signs and danger — not decoration.
- Pure white and pure black are not in the palette. Use `offWhite` and `ink`.

## Geometry budget

| Budget | Target | Validator warning |
| --- | --- | --- |
| Primitive calls | 3–6 | over 12 |
| Distinct palette colours | 4 | over 6 |
| Drawn faces | 20–40 | — |

Primitive calls are `g.box`, `g.roof`, `g.cyl`, `g.circle` and `g.decal` calls in
`draw()`. One box draws up to three faces, so a six-call building still has a
clean silhouette.

The validator's limits are deliberately forgiving. The target is the number that
makes the art feel like The Afterspace, not the number that passes CI.

## Composition

1. **Block the silhouette first.** Build the largest volumes, render, then look
   at the 32 px test in the inspector. Only add a detail if it changes the read.
2. **One hero gesture per asset.** A cantilevered lamp arm, a windmill rotor, a
   bus window band. Everything else supports it.
3. **Stagger depth.** Offset a second bale, a cab, a chimney, a tank. A single
   centred box reads as a placeholder.
4. **Avoid visual noise.** No outlines, no gradients, no textures, no text in
   the artwork, no cast shadows except the shared ground plate.
5. **Use the ground.** The engine draws a two-layer contact shadow from the
   footprint. Do not paint a second one.
6. **Mind the roof overhang.** A pitched roof extends past the walls. Keep
   doors, windows and vents below the eaves or place them on the gable end.
7. **Billboards are a tool, not a crutch.** `circle` and `decal` are always
   camera-facing. Use them for foliage, glows and blade banks — not for a sign
   whose orientation matters in a side view.

## Naming and metadata

- File: `assets/<category>/<key>.js`, where `<key>` is lowercase kebab-case.
- `key` must match the filename.
- `name` is title case: `Transit Bus`, `Grain Silo`, `Stop Sign`.
- `what` is a lower-case noun phrase used by the 150 ms hover:
  `a passenger transit bus`, `a corrugated grain silo`.
- `blurb` is one short sentence used on the card and in the inspector.
- `tags` are searchable; include material, function and setting.
- `refs` point at the concept references, e.g. `AF-REF-014`.
- `status` is `review` or `approved`. Only the user approves assets.
- `hero` is the canonical angle in degrees. Vehicles usually use `90`.

## Review checklist

- [ ] Reads at 32 px in the inspector squint test.
- [ ] All four canonical views make sense.
- [ ] Inside the declared footprint and height.
- [ ] Four colours or fewer; no hard-coded off-palette hex.
- [ ] Three to six primitive calls.
- [ ] No detail that vanishes at card size.
- [ ] `what`, `blurb`, `tags`, `refs` filled.
- [ ] Validator reports no errors.

## What comes later

This phase is asset creation and showcase only. When the game runtime arrives,
`draw()` remains the single source of truth: the same geometry can be painted to
the game's isometric canvas, exported as CSS/DOM elements, or baked into an atlas. Do
not introduce a second drawing path.
