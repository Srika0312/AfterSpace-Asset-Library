import { P } from '../lib/palette.js';

export default {
  key: 'water-pumping-station',
  name: 'Water Pumping Station',
  category: 'water-atmos',
  blurb: 'High-pressure centrifugal distribution pump skid with electric drive motor, volute casing, and discharge header.',
  what: 'a water pumping station',
  footprint: [2.0, 1.4],
  height: 1.55,
  tags: ['water', 'pump', 'station', 'booster', 'infrastructure'],
  refs: ['AF-WAT-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // vibration isolation foundation slab
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.3, h: 0.22, c: P.steelDark });

    // primary heavy-duty electric drive motor
    g.cyl({ x: -0.42, y: -0.15, z: 0.22, r: 0.32, h: 0.75, axis: 'y', c: P.teal, segments: 12 });

    // volute centrifugal pump casing
    g.cyl({ x: -0.42, y: 0.35, z: 0.52, r: 0.36, h: 0.32, axis: 'y', c: P.steel, segments: 12 });

    // auxiliary booster pump and control cabinet
    g.box({ x: 0.42, y: 0, z: 0.22, w: 0.7, d: 1.05, h: 0.72, c: P.offWhite });

    // high-pressure discharge header manifold
    g.cyl({ x: 0, y: 0.38, z: 1.05, r: 0.13, h: 1.6, axis: 'x', c: P.steel, segments: 10 });
  },
};
