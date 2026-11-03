import { P } from '../lib/palette.js';

export default {
  key: 'metal-fence',
  name: 'Metal Fence',
  category: 'environmental',
  blurb: 'Perimeter security wire mesh fence segment with concrete footings, tubular posts, and top rail.',
  what: 'a metal fence',
  footprint: [2.2, 0.6],
  height: 1.3,
  tags: ['environmental', 'fence', 'security', 'barrier', 'perimeter'],
  refs: ['AF-PRP-018'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete post ground footings
    g.box({ x: 0, y: 0, z: 0, w: 2.1, d: 0.4, h: 0.14, c: P.steelDark });

    // left terminal fence post
    g.cyl({ x: -0.95, y: 0, z: 0.14, r: 0.07, h: 1.15, c: P.steel, segments: 8 });

    // right terminal fence post
    g.cyl({ x: 0.95, y: 0, z: 0.14, r: 0.07, h: 1.15, c: P.steel, segments: 8 });

    // heavy steel mesh fence infill screen
    g.box({ x: 0, y: 0, z: 0.22, w: 1.85, d: 0.06, h: 0.95, c: P.offWhite });

    // top security anti-intrusion cap rail
    g.box({ x: 0, y: 0, z: 1.18, w: 2.05, d: 0.1, h: 0.08, c: P.steelDark });
  },
};
