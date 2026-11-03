import { P } from '../lib/palette.js';

export default {
  key: 'modular-warehouse',
  name: 'Modular Warehouse',
  category: 'industrial',
  blurb: 'Prefabricated distribution unit with corrugated siding and a high-clearance roll-up bay.',
  what: 'a modular warehouse',
  footprint: [2.6, 2.0],
  height: 1.8,
  tags: ['industrial', 'warehouse', 'logistics', 'storage'],
  refs: ['AF-IND-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // main warehouse hall
    g.box({ x: 0, y: 0, z: 0.1, w: 2.2, d: 1.6, h: 1.2, c: P.offWhite });

    // pitched roof with clerestory eave
    g.roof({ x: 0, y: 0, z: 1.3, w: 2.3, d: 1.7, h: 0.45, c: P.steelDark, gable: P.steel });

    // roll-up freight bay door
    g.box({ x: -0.4, y: 0.81, z: 0.1, w: 0.7, d: 0.04, h: 0.8, c: P.steel });

    // personnel side access door
    g.box({ x: 0.5, y: 0.81, z: 0.1, w: 0.28, d: 0.04, h: 0.55, c: P.steelDark });

    // overhead dock beacon
    g.circle({ x: -0.4, y: 0.82, z: 0.95, r: 0.07, c: P.amber, bias: 0.4 });
  },
};
