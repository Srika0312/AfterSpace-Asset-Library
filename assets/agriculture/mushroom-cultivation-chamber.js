import { P } from '../lib/palette.js';

export default {
  key: 'mushroom-cultivation-chamber',
  name: 'Mushroom Cultivation Chamber',
  category: 'agriculture',
  blurb: 'Dark humidity-controlled fungal mycelium incubation chamber with organic substrate beds and ultrasonic fogger.',
  what: 'a mushroom cultivation chamber',
  footprint: [1.8, 1.3],
  height: 1.45,
  tags: ['agriculture', 'mushroom', 'fungi', 'mycelium', 'cultivation'],
  refs: ['AF-AGR-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base condensation tray foundation
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.2, h: 0.2, c: P.steelDark });

    // insulated darkroom incubation cabinet
    g.box({ x: 0, y: 0, z: 0.2, w: 1.5, d: 1.0, h: 0.85, c: P.offWhite });

    // organic substrate mycelium bed block
    g.box({ x: 0, y: 0.1, z: 0.35, w: 1.25, d: 0.65, h: 0.45, c: P.canopy });

    // ultrasonic fogger and humidity generator pod
    g.cyl({ x: -0.45, y: -0.25, z: 1.05, r: 0.2, h: 0.35, c: P.teal, segments: 10 });

    // climate regulation and spore filter cowl
    g.roof({ x: 0.2, y: 0, z: 1.05, w: 0.9, d: 0.8, h: 0.28, c: P.steelDark, gable: P.offWhite, ridge: 'x' });
  },
};
