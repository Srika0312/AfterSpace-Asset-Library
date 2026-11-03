import { P } from '../lib/palette.js';

export default {
  key: 'autonomous-utility-vehicle',
  name: 'Autonomous Utility Vehicle',
  category: 'transport',
  blurb: 'Cabless robotic runabout equipped with LiDAR navigation turret and modular equipment cradle.',
  what: 'an autonomous utility vehicle',
  footprint: [1.5, 1.1],
  height: 1.1,
  tags: ['transport', 'autonomous', 'utility', 'robotic', 'vehicle'],
  refs: ['AF-TRN-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // robotic skid drive chassis
    g.box({ x: 0, y: 0, z: 0.08, w: 1.35, d: 0.95, h: 0.26, c: P.steelDark });

    // central avionics and battery bay
    g.box({ x: 0, y: 0, z: 0.34, w: 1.05, d: 0.78, h: 0.42, c: P.offWhite });

    // elevated rotating LiDAR sensor dome
    g.cyl({ x: 0.25, y: 0, z: 0.76, r: 0.16, h: 0.22, c: P.teal, segments: 10 });

    // rear modular tool attachment cradle
    g.box({ x: -0.32, y: 0, z: 0.34, w: 0.45, d: 0.68, h: 0.28, c: P.steelDark });

    // forward navigation safety beacon
    g.circle({ x: 0.45, y: 0, z: 0.65, r: 0.07, c: P.amber, bias: 0.55 });
  },
};
