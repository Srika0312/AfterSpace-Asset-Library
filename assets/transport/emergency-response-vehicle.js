import { P } from '../lib/palette.js';

export default {
  key: 'emergency-response-vehicle',
  name: 'Emergency Response Vehicle',
  category: 'transport',
  blurb: 'Rapid-intervention medical rescue vehicle with reinforced patient pod, light bar, and high-visibility livery.',
  what: 'an emergency response vehicle',
  footprint: [2.2, 1.2],
  height: 1.35,
  tags: ['transport', 'emergency', 'medical', 'rescue', 'ambulance'],
  refs: ['AF-TRN-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // all-terrain emergency response frame
    g.box({ x: 0, y: 0, z: 0.1, w: 2.0, d: 1.05, h: 0.26, c: P.steelDark });

    // driver cockpit module
    g.box({ x: 0.6, y: 0, z: 0.36, w: 0.7, d: 0.9, h: 0.55, c: P.offWhite });

    // high-visibility patient rescue pod
    g.box({ x: -0.3, y: 0, z: 0.36, w: 1.15, d: 0.95, h: 0.72, c: P.red });

    // emergency high-intensity light bar
    g.box({ x: 0.45, y: 0, z: 0.92, w: 0.15, d: 0.65, h: 0.12, c: P.amber });

    // front armored windshield visor
    g.box({ x: 0.72, y: 0, z: 0.56, w: 0.22, d: 0.82, h: 0.25, c: P.steelDark });
  },
};
