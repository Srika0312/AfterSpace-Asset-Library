import { P } from '../lib/palette.js';

export default {
  key: 'exterior-staircase',
  name: 'Exterior Staircase',
  category: 'residential',
  blurb: 'Multi-tiered exterior access stairway with stepped risers, elevated landing deck, and safety handrail.',
  what: 'an exterior staircase',
  footprint: [1.8, 1.2],
  height: 1.45,
  tags: ['residential', 'staircase', 'stairs', 'access', 'walkway'],
  refs: ['AF-RES-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base anchor footing
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.1, h: 0.16, c: P.steelDark });

    // lower stair step tier
    g.box({ x: -0.45, y: 0, z: 0.16, w: 0.7, d: 0.85, h: 0.38, c: P.steel });

    // upper stair step tier
    g.box({ x: 0.05, y: 0, z: 0.16, w: 0.6, d: 0.85, h: 0.76, c: P.steel });

    // elevated landing platform
    g.box({ x: 0.55, y: 0, z: 0.16, w: 0.55, d: 0.85, h: 1.05, c: P.offWhite });

    // safety guardrail barrier
    g.box({ x: 0.05, y: -0.44, z: 0.6, w: 1.55, d: 0.06, h: 0.75, c: P.teal });
  },
};
