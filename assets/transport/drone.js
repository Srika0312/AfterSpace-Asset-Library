import { P } from '../lib/palette.js';

export default {
  key: 'drone',
  name: 'Drone',
  category: 'transport',
  blurb: 'Autonomous quadcopter aerial scout drone with central sensor pod and carbon rotor outriggers.',
  what: 'a drone',
  footprint: [1.2, 1.2],
  height: 0.75,
  tags: ['transport', 'drone', 'aerial', 'quadcopter', 'scout'],
  refs: ['AF-TRN-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // central avionics core cylinder
    g.cyl({ x: 0, y: 0, z: 0.32, r: 0.28, h: 0.25, c: P.offWhite, segments: 12 });

    // rotor crossarm longitudinal spar
    g.box({ x: 0, y: 0, z: 0.42, w: 1.05, d: 0.12, h: 0.08, c: P.steelDark });

    // rotor crossarm transverse spar
    g.box({ x: 0, y: 0, z: 0.42, w: 0.12, d: 1.05, h: 0.08, c: P.steelDark });

    // spinning rotor blade discs
    g.cyl({ x: 0, y: 0, z: 0.5, r: 0.55, h: 0.04, c: P.teal, segments: 12 });

    // ventral camera / sensor optical sphere
    g.circle({ x: 0, y: 0, z: 0.25, r: 0.12, c: P.amber, bias: 0.55 });
  },
};
