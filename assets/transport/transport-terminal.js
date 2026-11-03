import { P } from '../lib/palette.js';

export default {
  key: 'transport-terminal',
  name: 'Transport Terminal',
  category: 'transport',
  blurb: 'Multi-modal transit station with glazed passenger concourse, aerodynamic roof canopy, and schedule display.',
  what: 'a transport terminal',
  footprint: [2.6, 2.0],
  height: 2.1,
  tags: ['transport', 'terminal', 'station', 'transit', 'infrastructure'],
  refs: ['AF-TRN-019'],
  hero: 0,
  status: 'review',
  draw(g) {
    // passenger boarding apron base
    g.box({ x: 0, y: 0, z: 0, w: 2.5, d: 1.9, h: 0.2, c: P.steelDark });

    // glazed terminal concourse lobby
    g.box({ x: 0, y: -0.2, z: 0.2, w: 1.9, d: 1.1, h: 1.1, c: P.teal });

    // ticketing and airlock entry vestibule
    g.box({ x: 0.45, y: 0.45, z: 0.2, w: 0.85, d: 0.55, h: 0.85, c: P.offWhite });

    // swept aerodynamic roof canopy
    g.roof({ x: 0, y: -0.1, z: 1.3, w: 2.2, d: 1.5, h: 0.45, c: P.steel, gable: P.steelDark, ridge: 'x' });

    // station transit schedule screen
    g.box({ x: -0.55, y: 0.45, z: 0.2, w: 0.6, d: 0.15, h: 0.65, c: P.steel });
  },
};
