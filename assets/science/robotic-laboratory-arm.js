import { P } from '../lib/palette.js';

export default {
  key: 'robotic-laboratory-arm',
  name: 'Robotic Laboratory Arm',
  category: 'science',
  blurb: 'Articulated precision multi-axis robotic arm on swivel turntable with micro-manipulator gripper.',
  what: 'a robotic laboratory arm',
  footprint: [1.2, 1.2],
  height: 1.6,
  tags: ['science', 'robotic', 'arm', 'manipulator', 'automation'],
  refs: ['AF-SCI-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // bench mount anchor turntable
    g.box({ x: 0, y: 0, z: 0, w: 0.95, d: 0.95, h: 0.18, c: P.steelDark });

    // rotating robotic shoulder turret
    g.cyl({ x: 0, y: 0, z: 0.18, r: 0.32, h: 0.28, c: P.steel, segments: 12 });

    // lower articulated bicep boom
    g.box({ x: -0.1, y: 0, z: 0.46, w: 0.22, d: 0.2, h: 0.65, c: P.offWhite });

    // upper forearm articulated link
    g.box({ x: 0.12, y: 0, z: 0.95, w: 0.18, d: 0.18, h: 0.45, c: P.teal });

    // micro-manipulator gripper end-effector
    g.cyl({ x: 0.12, y: 0, z: 1.4, r: 0.09, h: 0.18, axis: 'z', c: P.steelDark, segments: 8 });
  },
};
