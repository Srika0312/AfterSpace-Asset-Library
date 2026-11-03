import { P } from '../lib/palette.js';

export default {
  key: 'robotic-delivery-vehicle',
  name: 'Robotic Delivery Vehicle',
  category: 'transport',
  blurb: 'Autonomous last-mile courier rover with gullwing parcel hold and sensor navigation array.',
  what: 'a robotic delivery vehicle',
  footprint: [1.3, 0.9],
  height: 0.9,
  tags: ['transport', 'delivery', 'robotic', 'courier', 'logistics'],
  refs: ['AF-TRN-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // 4-wheel independent hub drive chassis
    g.box({ x: 0, y: 0, z: 0.06, w: 1.15, d: 0.75, h: 0.2, c: P.steelDark });

    // secure parcel locker body
    g.box({ x: 0, y: 0, z: 0.26, w: 1.0, d: 0.65, h: 0.44, c: P.offWhite });

    // aerodynamic top canopy cowl
    g.roof({ x: 0, y: 0, z: 0.7, w: 0.8, d: 0.55, h: 0.15, c: P.teal, gable: P.offWhite, ridge: 'x' });

    // forward optical sensor visor bar
    g.box({ x: 0.48, y: 0, z: 0.42, w: 0.12, d: 0.45, h: 0.14, c: P.steelDark });

    // status alert beacon puck
    g.circle({ x: -0.2, y: 0, z: 0.86, r: 0.06, c: P.amber, bias: 0.55 });
  },
};
