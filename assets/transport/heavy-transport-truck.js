import { P } from '../lib/palette.js';

export default {
  key: 'heavy-transport-truck',
  name: 'Heavy Transport Truck',
  category: 'transport',
  blurb: 'Multi-axle heavy industrial freight hauler with cab-over driver pod and enclosed bulk cargo container.',
  what: 'a heavy transport truck',
  footprint: [2.6, 1.4],
  height: 1.6,
  tags: ['transport', 'truck', 'heavy', 'freight', 'logistics'],
  refs: ['AF-TRN-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // multi-axle heavy chassis frame
    g.box({ x: 0, y: 0, z: 0.12, w: 2.4, d: 1.2, h: 0.32, c: P.steelDark });

    // raised cab-over command module
    g.box({ x: 0.75, y: 0, z: 0.44, w: 0.75, d: 1.1, h: 0.92, c: P.steel });

    // forward windshield visor strip
    g.box({ x: 0.96, y: 0, z: 0.85, w: 0.32, d: 0.98, h: 0.32, c: P.teal });

    // heavy enclosed freight cargo container
    g.box({ x: -0.4, y: 0, z: 0.44, w: 1.45, d: 1.15, h: 0.98, c: P.offWhite });

    // vertical filtration / exhaust stack
    g.cyl({ x: 0.42, y: 0.42, z: 0.44, r: 0.09, h: 1.05, c: P.steelDark, segments: 8 });
  },
};
