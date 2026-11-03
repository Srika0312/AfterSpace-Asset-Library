import { P } from '../lib/palette.js';

export default {
  key: 'cargo-boxes',
  name: 'Cargo Boxes',
  category: 'environmental',
  blurb: 'Stacked cluster of durable habitat supply boxes on pallet runners with payload markings.',
  what: 'cargo boxes',
  footprint: [1.4, 1.2],
  height: 1.0,
  tags: ['environmental', 'boxes', 'cargo', 'crates', 'storage'],
  refs: ['AF-PRP-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // pallet runner platform base
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 1.1, h: 0.14, c: P.steelDark });

    // large lower primary cargo crate
    g.box({ x: -0.15, y: -0.1, z: 0.14, w: 0.85, d: 0.75, h: 0.52, c: P.offWhite });

    // adjacent secondary cargo crate
    g.box({ x: 0.35, y: 0.22, z: 0.14, w: 0.55, d: 0.55, h: 0.42, c: P.steel });

    // top stacked smaller storage container
    g.box({ x: -0.15, y: -0.1, z: 0.66, w: 0.65, d: 0.55, h: 0.32, c: P.teal });

    // hazardous payload warning disc
    g.circle({ x: -0.15, y: 0.28, z: 0.4, r: 0.08, c: P.teal, bias: 0.55 });
  },
};
