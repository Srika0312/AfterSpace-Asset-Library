import { P } from '../lib/palette.js';

export default {
  key: 'electrical-transformer',
  name: 'Electrical Transformer',
  category: 'energy',
  blurb: 'Step-up substation transformer with oil cooling radiators and ceramic high-voltage bushings.',
  what: 'an electrical transformer',
  footprint: [1.6, 1.3],
  height: 1.7,
  tags: ['energy', 'transformer', 'substation', 'high-voltage', 'grid'],
  refs: ['AF-ENG-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete secondary oil catchment basin
    g.box({ x: 0, y: 0, z: 0, w: 1.4, d: 1.1, h: 0.18, c: P.sand });

    // main sealed oil tank tank body
    g.box({ x: 0, y: 0, z: 0.18, w: 0.95, d: 0.75, h: 0.75, c: P.steelDark });

    // external radiator cooling bank
    g.box({ x: 0, y: -0.42, z: 0.28, w: 0.8, d: 0.12, h: 0.55, c: P.steel });

    // high-voltage ceramic bushing 1
    g.cyl({ x: -0.22, y: 0, z: 0.93, r: 0.07, h: 0.48, r2: 0.04, c: P.terracotta, segments: 8 });

    // high-voltage ceramic bushing 2
    g.cyl({ x: 0.22, y: 0, z: 0.93, r: 0.07, h: 0.48, r2: 0.04, c: P.terracotta, segments: 8 });
  },
};
