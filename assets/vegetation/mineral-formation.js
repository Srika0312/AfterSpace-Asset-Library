import { P } from '../lib/palette.js';

export default {
  key: 'mineral-formation',
  name: 'Mineral Formation',
  category: 'vegetation',
  blurb: 'Stratified sedimentary rock outcrop showing oxidized terracotta iron bands and sand veins.',
  what: 'a mineral formation',
  footprint: [1.4, 1.2],
  height: 1.2,
  tags: ['vegetation', 'mineral', 'rock', 'geology', 'strata'],
  refs: ['AF-VEG-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // basal mineral shelf
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 1.1, h: 0.18, c: P.steelDark });

    // stratified red mineral deposit
    g.box({ x: 0, y: 0, z: 0.18, w: 1.1, d: 0.9, h: 0.52, c: P.terracotta });

    // upper weathered mineral outcrop
    g.roof({ x: -0.1, y: 0, z: 0.7, w: 0.95, d: 0.75, h: 0.45, c: P.clay, gable: P.sand, ridge: 'x' });

    // secondary mineral needle
    g.roof({ x: 0.32, y: -0.15, z: 0.7, w: 0.35, d: 0.35, h: 0.38, c: P.sand, gable: P.terracotta, ridge: 'y' });

    // exposed ore vein band
    g.box({ x: 0, y: 0.42, z: 0.35, w: 0.85, d: 0.08, h: 0.15, c: P.sand });
  },
};
