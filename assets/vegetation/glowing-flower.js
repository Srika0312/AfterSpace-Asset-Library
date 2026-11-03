import { P } from '../lib/palette.js';

export default {
  key: 'glowing-flower',
  name: 'Glowing Flower',
  category: 'vegetation',
  blurb: 'Exotic alien blossom with slender stem, flared petal cup, and bioluminescent glowing stamen.',
  what: 'a glowing flower',
  footprint: [0.8, 0.8],
  height: 1.25,
  tags: ['vegetation', 'flower', 'glowing', 'bioluminescent', 'blossom'],
  refs: ['AF-VEG-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // ground root collar
    g.cyl({ x: 0, y: 0, z: 0, r: 0.35, h: 0.12, c: P.soil, segments: 8 });

    // slender twisting stem
    g.cyl({ x: 0, y: 0, z: 0.12, r: 0.07, h: 0.65, c: P.canopy, segments: 8 });

    // flared petal blossom cup
    g.cyl({ x: 0, y: 0, z: 0.72, r: 0.12, r2: 0.38, h: 0.32, c: P.teal, segments: 12 });

    // inner bioluminescent stamen
    g.cyl({ x: 0, y: 0, z: 0.88, r: 0.14, h: 0.22, c: P.amber, segments: 10 });

    // floating nectar halo disc
    g.circle({ x: 0, y: 0, z: 1.14, r: 0.12, c: P.amber, bias: 0.55 });
  },
};
