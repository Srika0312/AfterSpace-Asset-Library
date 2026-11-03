import { P } from '../lib/palette.js';

export default {
  key: 'security-robot',
  name: 'Security Robot',
  category: 'inhabitants',
  blurb: 'Tracked security enforcement patrol droid with armored chassis, swiveling scanner dome, and red threat visor.',
  what: 'a security robot',
  footprint: [0.9, 0.8],
  height: 1.15,
  tags: ['inhabitants', 'robot', 'security', 'patrol', 'defense'],
  refs: ['AF-INH-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy tracked rover base
    g.box({ x: 0, y: 0, z: 0, w: 0.75, d: 0.65, h: 0.25, c: P.steelDark });

    // armored chassis torso
    g.box({ x: 0, y: 0, z: 0.25, w: 0.55, d: 0.48, h: 0.55, c: P.steel });

    // swiveling optical scanner dome
    g.cyl({ x: 0, y: 0, z: 0.8, r: 0.2, h: 0.25, c: P.offWhite, segments: 12 });

    // armored deterrent projector
    g.cyl({ x: 0.28, y: 0, z: 0.5, r: 0.07, h: 0.4, axis: 'x', c: P.steelDark, segments: 8 });

    // red warning threat visor
    g.circle({ x: 0, y: 0.18, z: 0.92, r: 0.08, c: P.red, bias: 0.55 });
  },
};
