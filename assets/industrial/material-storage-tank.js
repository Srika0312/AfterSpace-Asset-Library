import { P } from '../lib/palette.js';

export default {
  key: 'material-storage-tank',
  name: 'Material Storage Tank',
  category: 'industrial',
  blurb: 'Elevated conical-bottom silo for dry bulk aggregate, grain and minerals.',
  what: 'a material storage tank',
  footprint: [1.5, 1.5],
  height: 2.2,
  tags: ['industrial', 'tank', 'silo', 'aggregate', 'bulk'],
  refs: ['AF-IND-004'],
  hero: 0,
  status: 'review',
  draw(g) {
    // structural support frame
    g.box({ x: 0, y: 0, z: 0, w: 1.1, d: 1.1, h: 0.45, c: P.steelDark });

    // bottom discharge cone
    g.cyl({ x: 0, y: 0, z: 0.45, r: 0.18, h: 0.35, r2: 0.52, c: P.steel, segments: 10 });

    // main cylindrical storage silo drum
    g.cyl({ x: 0, y: 0, z: 0.8, r: 0.52, h: 1.1, c: P.offWhite, segments: 12 });

    // silo dome roof
    g.circle({ x: 0, y: 0, z: 1.9, r: 0.5, c: P.offWhite, bias: 0.5 });

    // top hatch and vent cap
    g.circle({ x: 0, y: 0, z: 1.95, r: 0.12, c: P.brass, bias: 0.55 });
  },
};
