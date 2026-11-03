import { P } from '../lib/palette.js';

export default {
  key: 'cryogenic-storage-unit',
  name: 'Cryogenic Storage Unit',
  category: 'science',
  blurb: 'Liquid nitrogen vacuum-jacketed cryobank dewar with dome head, controller console, and relief valve.',
  what: 'a cryogenic storage unit',
  footprint: [1.8, 1.4],
  height: 1.85,
  tags: ['science', 'cryogenic', 'storage', 'dewar', 'specimen'],
  refs: ['AF-SCI-013'],
  hero: 0,
  status: 'review',
  draw(g) {
    // vibration mount base skid
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.3, h: 0.22, c: P.steelDark });

    // cylindrical double-walled dewar vessel
    g.cyl({ x: -0.25, y: 0, z: 0.22, r: 0.55, h: 1.25, c: P.offWhite, segments: 14 });

    // cryo dome head collar
    g.cyl({ x: -0.25, y: 0, z: 1.47, r: 0.45, r2: 0.25, h: 0.25, c: P.teal, segments: 12 });

    // temperature monitoring controller console
    g.box({ x: 0.55, y: 0, z: 0.22, w: 0.45, d: 0.9, h: 0.85, c: P.steel });

    // vacuum relief valve stack
    g.cyl({ x: -0.25, y: 0, z: 1.72, r: 0.08, h: 0.18, c: P.steelDark, segments: 8 });
  },
};
