import { P } from '../lib/palette.js';

export default {
  key: 'small-water-pool',
  name: 'Small Water Pool',
  category: 'vegetation',
  blurb: 'Natural habitat retention pond with rocky surround, sandy shoreline, still teal water, and ripple shimmer.',
  what: 'a small water pool',
  footprint: [1.6, 1.4],
  height: 0.35,
  tags: ['vegetation', 'water', 'pool', 'pond', 'hydro'],
  refs: ['AF-VEG-013'],
  hero: 0,
  status: 'review',
  draw(g) {
    // stone rim basin surround
    g.box({ x: 0, y: 0, z: 0, w: 1.6, d: 1.4, h: 0.18, c: P.steelDark });

    // sandy gravel pool verge
    g.cyl({ x: 0, y: 0, z: 0.12, r: 0.68, h: 0.08, c: P.sand, segments: 14 });

    // still reflective water surface
    g.cyl({ x: 0, y: 0, z: 0.18, r: 0.55, h: 0.04, c: P.teal, segments: 14 });

    // pool edge decorative stone
    g.box({ x: 0.45, y: -0.35, z: 0.18, w: 0.32, d: 0.28, h: 0.2, c: P.steelDark });

    // water specular shimmer ripple
    g.circle({ x: -0.1, y: 0.1, z: 0.23, r: 0.16, c: P.offWhite, bias: 0.55 });
  },
};
