import { P } from '../lib/palette.js';

export default {
  key: 'satellite-dish',
  name: 'Satellite Dish',
  category: 'space',
  blurb: 'Steerable parabolic dish for high-bandwidth surface and orbital links.',
  what: 'a satellite dish',
  footprint: [1.8, 1.2],
  height: 1.95,
  tags: ['space', 'comms', 'dish', 'uplink'],
  refs: ['AF-SPACE-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // pedestal and mount
    g.cyl({ x: 0, y: 0, z: 0, r: 0.24, h: 0.55, c: P.steelDark, segments: 10 });
    g.box({ x: 0, y: 0, z: 0.55, w: 0.28, d: 0.24, h: 0.22, c: P.steel });

    // parabolic face with a pale rim and a brass feed
    g.circle({ x: 0, y: 0, z: 1.15, r: 0.78, c: P.offWhite, bias: 0.55 });
    g.circle({ x: 0.03, y: -0.04, z: 1.1, r: 0.62, c: P.steel, bias: 0.7 });
    g.circle({ x: 0.03, y: -0.04, z: 1.1, r: 0.1, c: P.brass, bias: 0.72 });
  },
};
