import { P } from '../lib/palette.js';

export default {
  key: 'engineer',
  name: 'Engineer',
  category: 'inhabitants',
  blurb: 'Habitat engineer in high-visibility amber flightsuit with hard hat, headset, and utility tool belt.',
  what: 'an engineer',
  footprint: [0.6, 0.6],
  height: 1.48,
  tags: ['inhabitants', 'engineer', 'technician', 'maintenance', 'personnel'],
  refs: ['AF-INH-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy safety boots
    g.box({ x: 0, y: 0, z: 0, w: 0.36, d: 0.3, h: 0.55, c: P.steelDark });

    // high-visibility utility flightsuit
    g.box({ x: 0, y: 0, z: 0.55, w: 0.48, d: 0.35, h: 0.55, c: P.amber });

    // head with radio headset
    g.cyl({ x: 0, y: 0, z: 1.1, r: 0.14, h: 0.24, c: P.clay, segments: 10 });

    // engineering hard hat helmet
    g.roof({ x: 0, y: 0, z: 1.3, w: 0.36, d: 0.36, h: 0.16, c: P.amber, gable: P.offWhite, ridge: 'x' });

    // utility belt and tool holster
    g.box({ x: 0, y: 0, z: 0.55, w: 0.52, d: 0.38, h: 0.1, c: P.steelDark });
  },
};
