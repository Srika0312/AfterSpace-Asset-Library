import { P } from '../lib/palette.js';

export default {
  key: 'balcony-module',
  name: 'Balcony Module',
  category: 'residential',
  blurb: 'Cantilevered habitat observation terrace with transparent balustrade and diagonal support struts.',
  what: 'a balcony module',
  footprint: [1.6, 1.2],
  height: 1.3,
  tags: ['residential', 'balcony', 'terrace', 'deck', 'observation'],
  refs: ['AF-RES-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // wall mounting bracket backplate
    g.box({ x: -0.65, y: 0, z: 0.15, w: 0.2, d: 1.1, h: 0.95, c: P.steelDark });

    // cantilevered deck platform slab
    g.box({ x: 0, y: 0, z: 0.15, w: 1.2, d: 1.05, h: 0.18, c: P.offWhite });

    // diagonal under-support wedge
    g.roof({ x: 0, y: 0, z: 0.0, w: 1.1, d: 0.9, h: 0.15, c: P.steel, gable: P.steelDark, ridge: 'y' });

    // observation safety balustrade
    g.box({ x: 0.1, y: 0, z: 0.33, w: 1.0, d: 0.95, h: 0.55, c: P.teal });

    // top handrail edge trim
    g.box({ x: 0.1, y: 0, z: 0.88, w: 1.02, d: 0.97, h: 0.06, c: P.steelDark });
  },
};
