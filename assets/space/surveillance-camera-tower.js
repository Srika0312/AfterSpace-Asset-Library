import { P } from '../lib/palette.js';

export default {
  key: 'surveillance-camera-tower',
  name: 'Surveillance Camera Tower',
  category: 'space',
  blurb: 'Pole-mounted camera watching the perimeter of a habitat.',
  what: 'a surveillance camera tower',
  footprint: [1.4, 0.8],
  height: 1.9,
  tags: ['space', 'security', 'camera', 'surveillance'],
  refs: ['AF-SPACE-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // foot, pole and cantilever arm
    g.cyl({ x: 0, y: 0, z: 0, r: 0.2, h: 0.12, c: P.steelDark, segments: 8 });
    g.cyl({ x: 0, y: 0, z: 0.1, r: 0.06, h: 1.75, c: P.steel, segments: 8 });
    g.box({ x: 0.2, y: 0, z: 1.65, w: 0.4, d: 0.08, h: 0.08, c: P.steelDark, bias: 0.15 });

    // camera body and lens
    g.box({ x: 0.42, y: 0, z: 1.55, w: 0.3, d: 0.24, h: 0.2, c: P.offWhite, bias: 0.2 });
    g.circle({ x: 0.58, y: 0, z: 1.62, r: 0.08, c: P.slate, bias: 0.6 });
  },
};
