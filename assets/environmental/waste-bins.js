import { P } from '../lib/palette.js';

export default {
  key: 'waste-bins',
  name: 'Waste Bins',
  category: 'environmental',
  blurb: 'Dual habitat refuse disposal bins with hygienic sloped flip lids and base stall frame.',
  what: 'waste bins',
  footprint: [1.3, 0.8],
  height: 1.05,
  tags: ['environmental', 'waste', 'bins', 'trash', 'sanitation'],
  refs: ['AF-PRP-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base concrete stall frame
    g.box({ x: 0, y: 0, z: 0, w: 1.2, d: 0.7, h: 0.14, c: P.steelDark });

    // general refuse bin body 1
    g.box({ x: -0.28, y: 0, z: 0.14, w: 0.48, d: 0.55, h: 0.65, c: P.steel });

    // general refuse bin body 2
    g.box({ x: 0.28, y: 0, z: 0.14, w: 0.48, d: 0.55, h: 0.65, c: P.steel });

    // sloped hygienic flip lid 1
    g.roof({ x: -0.28, y: 0, z: 0.79, w: 0.52, d: 0.58, h: 0.18, c: P.offWhite, gable: P.steelDark, ridge: 'x' });

    // sloped hygienic flip lid 2
    g.roof({ x: 0.28, y: 0, z: 0.79, w: 0.52, d: 0.58, h: 0.18, c: P.offWhite, gable: P.steelDark, ridge: 'x' });
  },
};
