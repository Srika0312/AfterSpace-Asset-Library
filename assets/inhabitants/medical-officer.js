import { P } from '../lib/palette.js';

export default {
  key: 'medical-officer',
  name: 'Medical Officer',
  category: 'inhabitants',
  blurb: 'Habitat healthcare physician in clean clinical coat with diagnostic HUD glasses and hypospray.',
  what: 'a medical officer',
  footprint: [0.6, 0.6],
  height: 1.45,
  tags: ['inhabitants', 'medical', 'doctor', 'officer', 'healthcare'],
  refs: ['AF-INH-014'],
  hero: 0,
  status: 'review',
  draw(g) {
    // clinical boots
    g.box({ x: 0, y: 0, z: 0, w: 0.35, d: 0.28, h: 0.55, c: P.steelDark });

    // medical officer coat with teal trim
    g.box({ x: 0, y: 0, z: 0.55, w: 0.46, d: 0.32, h: 0.58, c: P.offWhite });

    // head
    g.cyl({ x: 0, y: 0, z: 1.13, r: 0.14, h: 0.24, c: P.clay, segments: 10 });

    // medical scanner hypospray
    g.cyl({ x: 0.22, y: 0.12, z: 0.65, r: 0.05, h: 0.2, c: P.teal, segments: 8 });

    // diagnostic HUD glasses visor
    g.circle({ x: 0, y: 0.13, z: 1.25, r: 0.06, c: P.teal, bias: 0.55 });
  },
};
