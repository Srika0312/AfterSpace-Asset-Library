import { P } from '../lib/palette.js';

export default {
  key: 'artificial-river-section',
  name: 'Artificial River Section',
  category: 'vegetation',
  blurb: 'Engineered biosphere water canal segment with concrete retaining banks and flowing water current.',
  what: 'an artificial river section',
  footprint: [2.2, 1.2],
  height: 0.35,
  tags: ['vegetation', 'river', 'canal', 'water', 'biosphere'],
  refs: ['AF-VEG-015'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete canal channel bank
    g.box({ x: 0, y: 0, z: 0, w: 2.2, d: 1.2, h: 0.16, c: P.steelDark });

    // channel embankment stone revetment
    g.box({ x: 0, y: 0, z: 0.12, w: 2.1, d: 1.0, h: 0.08, c: P.steel });

    // flowing stream water body
    g.box({ x: 0, y: 0, z: 0.18, w: 2.2, d: 0.65, h: 0.06, c: P.teal });

    // river current ripple wave
    g.box({ x: 0, y: 0.05, z: 0.23, w: 1.6, d: 0.15, h: 0.02, c: P.offWhite });

    // water level gauge sensor marker
    g.circle({ x: 0.7, y: -0.4, z: 0.25, r: 0.07, c: P.offWhite, bias: 0.55 });
  },
};
