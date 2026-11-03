import { P } from '../lib/palette.js';

export default {
  key: 'industrial-pipeline',
  name: 'Industrial Pipeline',
  category: 'industrial',
  blurb: 'Elevated overland process pipeline with dual structural stanchions and flange couplings.',
  what: 'an industrial pipeline',
  footprint: [2.2, 0.8],
  height: 0.9,
  tags: ['industrial', 'pipe', 'pipeline', 'fluid', 'infrastructure'],
  refs: ['AF-IND-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // twin stanchion support bents
    g.box({ x: -0.65, y: 0, z: 0, w: 0.16, d: 0.5, h: 0.45, c: P.steelDark });
    g.box({ x: 0.65, y: 0, z: 0, w: 0.16, d: 0.5, h: 0.45, c: P.steelDark });

    // main continuous process pipe
    g.cyl({ x: 0, y: 0, z: 0.55, r: 0.16, h: 2.1, c: P.steel, axis: 'x', segments: 10 });

    // central flange coupling collar
    g.cyl({ x: 0, y: 0, z: 0.55, r: 0.22, h: 0.14, c: P.slate, axis: 'x', segments: 10 });

    // pipeline flow marker
    g.circle({ x: 0, y: 0.18, z: 0.55, r: 0.07, c: P.amber, bias: 0.55 });
  },
};
