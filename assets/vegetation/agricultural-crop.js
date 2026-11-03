import { P } from '../lib/palette.js';

export default {
  key: 'agricultural-crop',
  name: 'Agricultural Crop',
  category: 'vegetation',
  blurb: 'Cultivated outdoor habitat crop bed with rich furrowed soil, vegetative foliage, and golden grain spikes.',
  what: 'an agricultural crop',
  footprint: [1.3, 1.0],
  height: 1.25,
  tags: ['vegetation', 'crop', 'agriculture', 'grain', 'plants'],
  refs: ['AF-VEG-016'],
  hero: 0,
  status: 'review',
  draw(g) {
    // furrowed planting soil mound
    g.box({ x: 0, y: 0, z: 0, w: 1.3, d: 1.0, h: 0.14, c: P.soil });

    // dense crop foliage hedge
    g.box({ x: 0, y: 0, z: 0.14, w: 1.15, d: 0.8, h: 0.55, c: P.canopy });

    // upper vegetative crop canopy
    g.roof({ x: 0, y: 0, z: 0.69, w: 1.2, d: 0.85, h: 0.35, c: P.leaf, gable: P.canopy, ridge: 'x' });

    // ripe grain harvest spikes
    g.roof({ x: 0, y: 0, z: 1.04, w: 0.9, d: 0.65, h: 0.25, c: P.wheat, gable: P.leaf, ridge: 'y' });

    // ripening grain berry disc
    g.circle({ x: 0.25, y: 0.15, z: 1.15, r: 0.08, c: P.wheat, bias: 0.55 });
  },
};
