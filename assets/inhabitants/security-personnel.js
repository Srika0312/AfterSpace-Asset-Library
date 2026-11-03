import { P } from '../lib/palette.js';

export default {
  key: 'security-personnel',
  name: 'Security Personnel',
  category: 'inhabitants',
  blurb: 'Habitat security guard in tactical body armor with ballistic helmet, visor slit, and stun sidearm.',
  what: 'security personnel',
  footprint: [0.6, 0.6],
  height: 1.48,
  tags: ['inhabitants', 'security', 'guard', 'tactical', 'officer'],
  refs: ['AF-INH-015'],
  hero: 0,
  status: 'review',
  draw(g) {
    // armored tactical boots
    g.box({ x: 0, y: 0, z: 0, w: 0.36, d: 0.3, h: 0.55, c: P.steelDark });

    // tactical body armor vest
    g.box({ x: 0, y: 0, z: 0.55, w: 0.5, d: 0.36, h: 0.58, c: P.steelDark });

    // armored ballistic helmet
    g.cyl({ x: 0, y: 0, z: 1.13, r: 0.16, h: 0.26, c: P.steel, segments: 10 });

    // visor slit / face
    g.box({ x: 0, y: 0.14, z: 1.22, w: 0.2, d: 0.05, h: 0.08, c: P.clay });

    // sidearm holster
    g.cyl({ x: 0.26, y: 0, z: 0.5, r: 0.05, h: 0.35, c: P.offWhite, segments: 6 });
  },
};
