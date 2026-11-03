import { P } from '../lib/palette.js';

export default {
  key: 'artificial-rock',
  name: 'Artificial Rock',
  category: 'vegetation',
  blurb: 'Synthetic bio-camouflage boulder concealing an environmental monitoring transceiver and sensor seam.',
  what: 'an artificial rock',
  footprint: [1.3, 1.1],
  height: 1.25,
  tags: ['vegetation', 'rock', 'artificial', 'camouflage', 'sensor'],
  refs: ['AF-VEG-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete bedrock foundation
    g.box({ x: 0, y: 0, z: 0, w: 1.25, d: 1.05, h: 0.16, c: P.steelDark });

    // faceted synthetic rock core
    g.box({ x: 0, y: 0, z: 0.16, w: 1.1, d: 0.9, h: 0.65, c: P.steel });

    // angular faceted upper cap
    g.roof({ x: 0, y: 0, z: 0.81, w: 1.05, d: 0.85, h: 0.42, c: P.offWhite, gable: P.steel, ridge: 'x' });

    // concealed monitoring seam
    g.box({ x: 0, y: 0.43, z: 0.45, w: 0.75, d: 0.06, h: 0.12, c: P.teal });

    // surveillance optical aperture
    g.circle({ x: 0.25, y: 0.45, z: 0.51, r: 0.06, c: P.teal, bias: 0.55 });
  },
};
