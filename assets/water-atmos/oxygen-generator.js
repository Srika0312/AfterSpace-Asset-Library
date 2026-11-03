import { P } from '../lib/palette.js';

export default {
  key: 'oxygen-generator',
  name: 'Oxygen Generator',
  category: 'water-atmos',
  blurb: 'Electrolysis oxygen synthesis module with twin high-pressure reactor cells and separator block.',
  what: 'an oxygen generator',
  footprint: [1.8, 1.4],
  height: 1.8,
  tags: ['oxygen', 'life-support', 'generator', 'electrolysis', 'atmosphere'],
  refs: ['AF-WAT-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base equipment deck
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.3, h: 0.3, c: P.steelDark });

    // primary electrolysis core vessel
    g.cyl({ x: -0.38, y: -0.1, z: 0.3, r: 0.34, h: 1.3, c: P.teal, segments: 12 });

    // secondary electrolysis core vessel
    g.cyl({ x: 0.38, y: -0.1, z: 0.3, r: 0.34, h: 1.3, c: P.teal, segments: 12 });

    // central gas compression and separator console
    g.box({ x: 0, y: 0.25, z: 0.3, w: 0.9, d: 0.55, h: 1.1, c: P.offWhite });

    // high-pressure header distribution manifold
    g.cyl({ x: 0, y: -0.1, z: 1.45, r: 0.1, h: 1.25, axis: 'x', c: P.steel, segments: 10 });
  },
};
