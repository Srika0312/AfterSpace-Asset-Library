import { P } from '../lib/palette.js';

export default {
  key: 'technician',
  name: 'Technician',
  category: 'inhabitants',
  blurb: 'Utility service technician in teal coveralls equipped with portable multimeter and visor cap.',
  what: 'a technician',
  footprint: [0.6, 0.6],
  height: 1.45,
  tags: ['inhabitants', 'technician', 'utility', 'service', 'worker'],
  refs: ['AF-INH-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // insulated work boots
    g.box({ x: 0, y: 0, z: 0, w: 0.35, d: 0.28, h: 0.55, c: P.steelDark });

    // technical service coveralls
    g.box({ x: 0, y: 0, z: 0.55, w: 0.46, d: 0.32, h: 0.55, c: P.teal });

    // head with communication earpiece
    g.cyl({ x: 0, y: 0, z: 1.1, r: 0.14, h: 0.24, c: P.clay, segments: 10 });

    // portable multimeter / repair tester
    g.box({ x: 0.2, y: 0.14, z: 0.65, w: 0.14, d: 0.12, h: 0.18, c: P.offWhite });

    // protective work visor cap
    g.roof({ x: 0, y: 0.05, z: 1.3, w: 0.34, d: 0.34, h: 0.12, c: P.steelDark, gable: P.teal, ridge: 'x' });
  },
};
