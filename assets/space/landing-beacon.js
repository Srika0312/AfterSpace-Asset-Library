import { P } from '../lib/palette.js';

const octagon = (r) => {
  const pts = [];
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 8) + (i / 8) * Math.PI * 2;
    pts.push([Math.cos(a) * r, -Math.sin(a) * r]);
  }
  return pts;
};

export default {
  key: 'landing-beacon',
  name: 'Landing Beacon',
  category: 'space',
  blurb: 'Illuminated landing pad marker for shuttle approaches after dark.',
  what: 'a landing beacon',
  footprint: [1.6, 1.6],
  height: 0.9,
  tags: ['space', 'landing', 'beacon', 'pad'],
  refs: ['AF-SPACE-012'],
  hero: 0,
  status: 'review',
  draw(g) {
    // pad, inset ring and warm beacon
    g.cyl({ x: 0, y: 0, z: 0, r: 0.7, h: 0.1, c: P.steelDark, segments: 12 });
    g.decal({ x: 0, y: 0, z: 0.1, points: octagon(0.6), c: P.teal, bias: 0.35 });
    g.decal({ x: 0, y: 0, z: 0.1, points: octagon(0.45), c: P.steelDark, bias: 0.36 });

    // mast and warm beacon
    g.cyl({ x: 0, y: 0, z: 0.1, r: 0.08, h: 0.55, c: P.steelDark, segments: 8 });
    g.box({ x: 0, y: 0, z: 0.62, w: 0.26, d: 0.26, h: 0.14, c: P.brass, bias: 0.2 });
    g.circle({ x: 0, y: 0, z: 0.7, r: 0.15, c: P.amber, bias: 0.6 });
  },
};
