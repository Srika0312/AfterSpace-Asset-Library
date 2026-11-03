import { P } from '../lib/palette.js';

export default {
  key: 'microscope',
  name: 'Microscope',
  category: 'science',
  blurb: 'Advanced digital optical microscope with heavy cast arm, specimen stage, and binocular ocular head.',
  what: 'a microscope',
  footprint: [1.1, 1.0],
  height: 1.4,
  tags: ['science', 'microscope', 'optics', 'analysis', 'laboratory'],
  refs: ['AF-SCI-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy cast horseshoe base
    g.box({ x: 0, y: 0, z: 0, w: 0.9, d: 0.8, h: 0.18, c: P.steelDark });

    // specimen stage and illuminator block
    g.box({ x: 0, y: 0.1, z: 0.18, w: 0.55, d: 0.5, h: 0.28, c: P.steel });

    // structural vertical optic arm
    g.box({ x: 0, y: -0.22, z: 0.18, w: 0.28, d: 0.3, h: 0.92, c: P.offWhite });

    // optical magnification objective turret
    g.cyl({ x: 0, y: 0.08, z: 0.65, r: 0.14, h: 0.28, axis: 'z', c: P.steel, segments: 10 });

    // binocular digital eyepiece head
    g.box({ x: 0, y: -0.05, z: 1.1, w: 0.45, d: 0.28, h: 0.22, c: P.teal });
  },
};
