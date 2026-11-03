import { P } from '../lib/palette.js';

export default {
  key: 'loading-platform',
  name: 'Loading Platform',
  category: 'industrial',
  blurb: 'Raised concrete loading dock with rubber impact bumpers and safety perimeter bollards.',
  what: 'a loading platform',
  footprint: [2.0, 1.5],
  height: 0.95,
  tags: ['industrial', 'loading', 'dock', 'warehouse', 'logistics'],
  refs: ['AF-IND-017'],
  hero: 0,
  status: 'review',
  draw(g) {
    // reinforced concrete dock foundation
    g.box({ x: 0, y: 0, z: 0, w: 1.8, d: 1.3, h: 0.45, c: P.sand });

    // heavy rubber vehicle impact bumper
    g.box({ x: 0, y: 0.66, z: 0.18, w: 1.8, d: 0.06, h: 0.22, c: P.black });

    // safety kickplate barrier rail
    g.box({ x: 0, y: -0.62, z: 0.45, w: 1.7, d: 0.08, h: 0.45, c: P.amber });

    // dock edge steel bollard 1
    g.cyl({ x: -0.75, y: 0.55, z: 0.45, r: 0.06, h: 0.4, c: P.steelDark, segments: 8 });

    // dock edge steel bollard 2
    g.cyl({ x: 0.75, y: 0.55, z: 0.45, r: 0.06, h: 0.4, c: P.steelDark, segments: 8 });
  },
};
