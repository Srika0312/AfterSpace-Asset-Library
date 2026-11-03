import { P } from '../lib/palette.js';

export default {
  key: 'chemical-storage-tank',
  name: 'Chemical Storage Tank',
  category: 'industrial',
  blurb: 'Insulated hazardous chemical holding vessel enclosed within a sealed concrete retention bund.',
  what: 'a chemical storage tank',
  footprint: [1.8, 1.8],
  height: 1.7,
  tags: ['industrial', 'chemical', 'tank', 'containment'],
  refs: ['AF-IND-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete secondary containment bund
    g.box({ x: 0, y: 0, z: 0, w: 1.6, d: 1.6, h: 0.18, c: P.sand });

    // heavy equipment support pedestal
    g.box({ x: 0, y: 0, z: 0.18, w: 1.0, d: 1.0, h: 0.22, c: P.steelDark });

    // cylindrical pressure-rated storage vessel
    g.cyl({ x: 0, y: 0, z: 0.4, r: 0.55, h: 0.85, c: P.teal, segments: 12 });

    // domed vessel head
    g.circle({ x: 0, y: 0, z: 1.25, r: 0.52, c: P.teal, bias: 0.5 });

    // chemical hazard warning marker
    g.circle({ x: 0, y: 0.56, z: 0.82, r: 0.1, c: P.amber, bias: 0.6 });
  },
};
