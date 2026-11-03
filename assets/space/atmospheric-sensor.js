import { P } from '../lib/palette.js';

export default {
  key: 'atmospheric-sensor',
  name: 'Atmospheric Sensor',
  category: 'space',
  blurb: 'Slim sensor mast with an anemometer crossarm and a shielded instrument pod.',
  what: 'an atmospheric sensor',
  footprint: [0.9, 0.6],
  height: 1.6,
  tags: ['space', 'weather', 'sensor', 'atmosphere'],
  refs: ['AF-SPACE-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // foot and mast
    g.cyl({ x: 0, y: 0, z: 0, r: 0.18, h: 0.1, c: P.steelDark, segments: 8 });
    g.cyl({ x: 0, y: 0, z: 0.08, r: 0.045, h: 1.4, c: P.steel, segments: 8 });

    // anemometer crossarm and cups
    g.box({ x: 0, y: 0, z: 1.42, w: 0.75, d: 0.08, h: 0.06, c: P.steelDark, bias: 0.2 });
    g.circle({ x: -0.32, y: 0, z: 1.45, r: 0.1, c: P.offWhite, bias: 0.6 });
    g.circle({ x: 0.32, y: 0, z: 1.45, r: 0.1, c: P.offWhite, bias: 0.6 });

    // shielded instrument pod
    g.box({ x: 0.12, y: 0.08, z: 0.85, w: 0.28, d: 0.18, h: 0.16, c: P.teal, bias: 0.15 });
  },
};
