import { P } from '../lib/palette.js';

export default {
  key: 'pipeline-connector',
  name: 'Pipeline Connector',
  category: 'industrial',
  blurb: 'Multi-directional manifold tee junction with reinforced flanged junction box.',
  what: 'a pipeline connector',
  footprint: [1.2, 1.2],
  height: 0.9,
  tags: ['industrial', 'pipe', 'manifold', 'junction', 'fittings'],
  refs: ['AF-IND-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete anchor pier
    g.box({ x: 0, y: 0, z: 0, w: 0.7, d: 0.7, h: 0.15, c: P.steelDark });

    // vertical riser spool
    g.cyl({ x: 0, y: 0, z: 0.15, r: 0.16, h: 0.4, c: P.steel, axis: 'z', segments: 10 });

    // horizontal header line
    g.cyl({ x: 0, y: 0, z: 0.55, r: 0.16, h: 0.95, c: P.steel, axis: 'x', segments: 10 });

    // central manifold distribution block
    g.box({ x: 0, y: 0, z: 0.45, w: 0.38, d: 0.38, h: 0.22, c: P.slate });

    // brass pressure test port
    g.circle({ x: 0, y: 0, z: 0.68, r: 0.08, c: P.brass, bias: 0.6 });
  },
};
