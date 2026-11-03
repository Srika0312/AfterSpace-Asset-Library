import { P } from '../lib/palette.js';

export default {
  key: 'maglev-train',
  name: 'Maglev Train',
  category: 'transport',
  blurb: 'High-speed magnetic levitation passenger car with aerodynamic nose and continuous panoramic glazing.',
  what: 'a maglev train',
  footprint: [2.6, 1.1],
  height: 1.15,
  tags: ['transport', 'maglev', 'train', 'transit', 'rail'],
  refs: ['AF-TRN-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // magnetic levitation stator channel
    g.box({ x: 0, y: 0, z: 0.08, w: 2.5, d: 0.88, h: 0.18, c: P.steelDark });

    // aerodynamic streamlined carbody
    g.box({ x: -0.1, y: 0, z: 0.26, w: 2.1, d: 0.82, h: 0.58, c: P.offWhite });

    // continuous passenger window band
    g.box({ x: -0.1, y: 0, z: 0.52, w: 2.0, d: 0.84, h: 0.2, c: P.teal });

    // sloped aerodynamic bullet nose
    g.roof({ x: 0.95, y: 0, z: 0.26, w: 0.5, d: 0.82, h: 0.45, c: P.offWhite, gable: P.steelDark, ridge: 'y' });

    // roof power receiver / antenna module
    g.box({ x: -0.6, y: 0, z: 0.84, w: 0.45, d: 0.35, h: 0.12, c: P.steel });
  },
};
