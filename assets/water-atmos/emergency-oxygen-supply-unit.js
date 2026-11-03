import { P } from '../lib/palette.js';

export default {
  key: 'emergency-oxygen-supply-unit',
  name: 'Emergency Oxygen Supply Unit',
  category: 'water-atmos',
  blurb: 'Rapid-deployment emergency oxygen station featuring dual pressurized bottles and rapid-access demand valve.',
  what: 'an emergency oxygen supply unit',
  footprint: [1.4, 1.0],
  height: 1.35,
  tags: ['oxygen', 'emergency', 'life-support', 'safety', 'first-aid'],
  refs: ['AF-WAT-013'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy-duty steel skid base
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 0.9, h: 0.18, c: P.steelDark });

    // high-visibility emergency oxygen bottle 1
    g.cyl({ x: -0.28, y: -0.1, z: 0.18, r: 0.22, h: 0.95, c: P.red, segments: 12 });

    // high-visibility emergency oxygen bottle 2
    g.cyl({ x: 0.28, y: -0.1, z: 0.18, r: 0.22, h: 0.95, c: P.red, segments: 12 });

    // rapid-release regulator and mask locker
    g.box({ x: 0, y: 0.24, z: 0.18, w: 0.85, d: 0.35, h: 0.8, c: P.offWhite });

    // manual manifold pressure equalization bar
    g.cyl({ x: 0, y: 0.24, z: 1.05, r: 0.08, h: 0.8, axis: 'x', c: P.steel, segments: 8 });
  },
};
