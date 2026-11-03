import { P } from '../lib/palette.js';

export default {
  key: 'passenger-shuttle',
  name: 'Passenger Shuttle',
  category: 'transport',
  blurb: 'Sleek personnel orbital transport shuttle featuring panoramic cockpit, flight strakes, and ion drive nacelles.',
  what: 'a passenger shuttle',
  footprint: [2.4, 1.8],
  height: 1.45,
  tags: ['transport', 'shuttle', 'passenger', 'spacecraft', 'orbital'],
  refs: ['AF-TRN-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // sleek passenger transport fuselage
    g.box({ x: 0.1, y: 0, z: 0.28, w: 1.9, d: 1.0, h: 0.58, c: P.offWhite });

    // cockpit visor and nose cowl
    g.roof({ x: 0.95, y: 0, z: 0.28, w: 0.55, d: 1.0, h: 0.48, c: P.teal, gable: P.offWhite, ridge: 'y' });

    // swept flight strakes / wings
    g.box({ x: -0.2, y: 0, z: 0.32, w: 1.0, d: 1.7, h: 0.1, c: P.steelDark });

    // ion drive thruster nacelles
    g.cyl({ x: -0.75, y: 0, z: 0.52, r: 0.24, h: 0.45, axis: 'x', c: P.steel, segments: 12 });

    // dorsal stabilizer fin
    g.box({ x: -0.6, y: 0, z: 0.86, w: 0.45, d: 0.1, h: 0.35, c: P.teal });
  },
};
