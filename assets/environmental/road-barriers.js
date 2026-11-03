import { P } from '../lib/palette.js';

export default {
  key: 'road-barriers',
  name: 'Road Barriers',
  category: 'environmental',
  blurb: 'Interlocking concrete Jersey barrier with hi-vis warning stripes and flat crown ledge.',
  what: 'road barriers',
  footprint: [2.0, 0.8],
  height: 0.85,
  tags: ['environmental', 'barrier', 'road', 'traffic', 'concrete'],
  refs: ['AF-PRP-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base wide stabilizer foot
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 0.65, h: 0.22, c: P.steelDark });

    // sloped concrete wall profile
    g.roof({ x: 0, y: 0, z: 0.22, w: 1.9, d: 0.55, h: 0.55, c: P.steel, gable: P.steelDark, ridge: 'x' });

    // top flat crown ledge
    g.box({ x: 0, y: 0, z: 0.77, w: 1.9, d: 0.22, h: 0.08, c: P.offWhite });

    // hazard warning chevron band
    g.box({ x: 0, y: 0.28, z: 0.35, w: 1.5, d: 0.04, h: 0.18, c: P.amber });

    // reflective end marker disc
    g.circle({ x: 0.85, y: 0.29, z: 0.44, r: 0.07, c: P.amber, bias: 0.55 });
  },
};
