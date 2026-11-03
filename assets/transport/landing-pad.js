import { P } from '../lib/palette.js';

export default {
  key: 'landing-pad',
  name: 'Landing Pad',
  category: 'transport',
  blurb: 'Reinforced concrete touchdown apron with circular blast deck, alignment rings, and approach beacons.',
  what: 'a landing pad',
  footprint: [2.4, 2.4],
  height: 0.35,
  tags: ['transport', 'landing-pad', 'shuttle', 'drone', 'infrastructure'],
  refs: ['AF-TRN-014'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete apron foundation
    g.box({ x: 0, y: 0, z: 0, w: 2.3, d: 2.3, h: 0.14, c: P.steelDark });

    // elevated circular blast shield pad
    g.cyl({ x: 0, y: 0, z: 0.14, r: 1.05, h: 0.12, c: P.steel, segments: 16 });

    // inner high-contrast touchdown circle
    g.cyl({ x: 0, y: 0, z: 0.26, r: 0.68, h: 0.04, c: P.offWhite, segments: 14 });

    // central touchdown target bullseye
    g.cyl({ x: 0, y: 0, z: 0.3, r: 0.28, h: 0.04, c: P.teal, segments: 12 });

    // perimeter approach guidance beacon
    g.circle({ x: 0.95, y: 0.95, z: 0.2, r: 0.08, c: P.teal, bias: 0.55 });
  },
};
