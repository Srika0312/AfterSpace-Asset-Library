import { P } from '../lib/palette.js';

export default {
  key: 'utility-cabinet',
  name: 'Utility Cabinet',
  category: 'environmental',
  blurb: 'Freestanding telecommunications and fiber utility cabinet with rain-shed roof and double doors.',
  what: 'a utility cabinet',
  footprint: [1.4, 0.9],
  height: 1.55,
  tags: ['environmental', 'utility', 'cabinet', 'telecom', 'fiber'],
  refs: ['AF-PRP-022'],
  hero: 0,
  status: 'review',
  draw(g) {
    // elevated concrete equipment base
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 0.8, h: 0.18, c: P.steelDark });

    // double-bay weatherized utility cabinet body
    g.box({ x: 0, y: 0, z: 0.18, w: 1.15, d: 0.65, h: 1.15, c: P.offWhite });

    // overhanging rain shed roof canopy
    g.roof({ x: 0, y: 0, z: 1.33, w: 1.25, d: 0.75, h: 0.18, c: P.steel, gable: P.steelDark, ridge: 'x' });

    // twin access door panel line
    g.box({ x: 0, y: 0.33, z: 0.25, w: 0.95, d: 0.04, h: 0.95, c: P.steel });

    // telecommunications transceiver disc
    g.circle({ x: 0.35, y: 0.36, z: 1.1, r: 0.07, c: P.teal, bias: 0.55 });
  },
};
