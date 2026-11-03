import { P } from '../lib/palette.js';

export default {
  key: 'maintenance-robot',
  name: 'Maintenance Robot',
  category: 'inhabitants',
  blurb: 'Compact tracked repair droid with tool-mount torso, swiveling sensor head, and wrench arm.',
  what: 'a maintenance robot',
  footprint: [0.8, 0.8],
  height: 1.1,
  tags: ['inhabitants', 'robot', 'maintenance', 'repair', 'droid'],
  refs: ['AF-INH-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // triangular track mobility base
    g.box({ x: 0, y: 0, z: 0, w: 0.65, d: 0.6, h: 0.22, c: P.steelDark });

    // torso tool chassis
    g.box({ x: 0, y: 0, z: 0.22, w: 0.5, d: 0.45, h: 0.48, c: P.steel });

    // swiveling sensor head
    g.cyl({ x: 0, y: 0, z: 0.7, r: 0.18, h: 0.24, c: P.offWhite, segments: 10 });

    // right utility wrench arm
    g.cyl({ x: 0.28, y: 0, z: 0.45, r: 0.05, h: 0.42, c: P.steelDark, segments: 6 });

    // optical sensor eye visor
    g.circle({ x: 0, y: 0.18, z: 0.82, r: 0.06, c: P.amber, bias: 0.55 });
  },
};
