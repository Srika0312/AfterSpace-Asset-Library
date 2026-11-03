import { P } from '../lib/palette.js';

export default {
  key: 'public-bench',
  name: 'Public Bench',
  category: 'environmental',
  blurb: 'Habitat concourse resting bench with cast stanchion legs, contoured seat slab, and ergonomic backrest.',
  what: 'a public bench',
  footprint: [1.8, 0.9],
  height: 0.85,
  tags: ['environmental', 'bench', 'seating', 'concourse', 'public'],
  refs: ['AF-PRP-016'],
  hero: 0,
  status: 'review',
  draw(g) {
    // left cast stanchion leg
    g.box({ x: -0.65, y: 0, z: 0, w: 0.16, d: 0.7, h: 0.48, c: P.steelDark });

    // right cast stanchion leg
    g.box({ x: 0.65, y: 0, z: 0, w: 0.16, d: 0.7, h: 0.48, c: P.steelDark });

    // contoured seating slab bench
    g.box({ x: 0, y: 0.05, z: 0.42, w: 1.6, d: 0.52, h: 0.08, c: P.offWhite });

    // ergonomic backrest slat
    g.box({ x: 0, y: -0.22, z: 0.55, w: 1.6, d: 0.08, h: 0.28, c: P.offWhite });

    // center divider / wireless power disc
    g.circle({ x: 0, y: 0.05, z: 0.51, r: 0.1, c: P.teal, bias: 0.55 });
  },
};
