import { P } from '../lib/palette.js';

export default {
  key: 'cargo-shuttle',
  name: 'Cargo Shuttle',
  category: 'transport',
  blurb: 'Suborbital heavy lift freighter spacecraft with delta wing strakes, cargo bay, and rocket thruster cluster.',
  what: 'a cargo shuttle',
  footprint: [2.4, 2.0],
  height: 1.5,
  tags: ['transport', 'shuttle', 'cargo', 'spacecraft', 'orbital'],
  refs: ['AF-TRN-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // main lifting body fuselage
    g.box({ x: 0, y: 0, z: 0.25, w: 2.1, d: 1.2, h: 0.65, c: P.offWhite });

    // sloped aerodynamic nose cone
    g.roof({ x: 0.95, y: 0, z: 0.25, w: 0.5, d: 1.2, h: 0.55, c: P.steelDark, gable: P.offWhite, ridge: 'y' });

    // port and starboard stabilizing delta wings
    g.box({ x: -0.2, y: 0, z: 0.28, w: 1.2, d: 1.9, h: 0.12, c: P.teal });

    // dorsal cargo bay door enclosure
    g.box({ x: -0.2, y: 0, z: 0.9, w: 1.1, d: 0.7, h: 0.18, c: P.steel });

    // rocket propulsion nozzle cluster
    g.cyl({ x: -1.05, y: 0, z: 0.52, r: 0.28, h: 0.32, axis: 'x', c: P.steelDark, segments: 12 });
  },
};
