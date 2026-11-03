import { P } from '../lib/palette.js';

export default {
  key: 'robotic-assembly-machine',
  name: 'Robotic Assembly Machine',
  category: 'industrial',
  blurb: 'Articulated multi-axis robotic arm anchored to a precision fabrication cell pedestal.',
  what: 'a robotic assembly machine',
  footprint: [1.1, 1.1],
  height: 1.55,
  tags: ['industrial', 'robotics', 'automation', 'assembly', 'manufacturing'],
  refs: ['AF-IND-015'],
  hero: 0,
  status: 'review',
  draw(g) {
    // rotary turntable pedestal base
    g.cyl({ x: 0, y: 0, z: 0, r: 0.36, h: 0.3, c: P.steelDark, segments: 12 });

    // lower primary bicep arm
    g.box({ x: -0.06, y: 0, z: 0.3, w: 0.18, d: 0.2, h: 0.6, c: P.amber });

    // articulated elbow pivot joint
    g.cyl({ x: 0.08, y: 0, z: 0.85, r: 0.14, h: 0.24, c: P.steel, axis: 'y', segments: 8 });

    // upper articulated forearm boom
    g.box({ x: 0.22, y: 0, z: 0.8, w: 0.38, d: 0.14, h: 0.14, c: P.amber });

    // precision tool tip and plasma arc glow
    g.circle({ x: 0.48, y: 0, z: 0.87, r: 0.08, c: P.cyan, bias: 0.6 });
  },
};
