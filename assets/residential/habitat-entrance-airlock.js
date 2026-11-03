import { P } from '../lib/palette.js';

export default {
  key: 'habitat-entrance-airlock',
  name: 'Habitat Entrance Airlock',
  category: 'residential',
  blurb: 'Two-stage pressurized entrance vestibule connecting outdoor terrain with habitat interior.',
  what: 'a habitat entrance airlock',
  footprint: [1.8, 1.6],
  height: 1.6,
  tags: ['residential', 'airlock', 'entrance', 'vestibule', 'habitat'],
  refs: ['AF-RES-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete entry ramp and threshold
    g.box({ x: 0, y: 0, z: 0, w: 1.7, d: 1.5, h: 0.2, c: P.steelDark });

    // pressurized vestibule chamber
    g.box({ x: 0, y: 0, z: 0.2, w: 1.4, d: 1.25, h: 1.1, c: P.offWhite });

    // vaulted arch airlock roof
    g.roof({ x: 0, y: 0, z: 1.3, w: 1.45, d: 1.3, h: 0.28, c: P.teal, gable: P.offWhite, ridge: 'y' });

    // heavy outdoor pressure door frame
    g.box({ x: 0.71, y: 0, z: 0.22, w: 0.08, d: 0.65, h: 0.9, c: P.steelDark });

    // cycle status indicator beacon
    g.circle({ x: 0.72, y: 0, z: 1.2, r: 0.07, c: P.amber, bias: 0.55 });
  },
};
