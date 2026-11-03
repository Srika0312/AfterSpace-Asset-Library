import { P } from '../lib/palette.js';

export default {
  key: 'radar-station',
  name: 'Radar Station',
  category: 'space',
  blurb: 'Rotating radar array scanning the airspace above the habitat perimeter.',
  what: 'a radar station',
  footprint: [1.4, 1],
  height: 1.25,
  tags: ['space', 'radar', 'detection', 'airspace'],
  refs: ['AF-SPACE-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // cabin and mast
    g.box({ x: 0, y: 0, z: 0, w: 0.95, d: 0.75, h: 0.45, c: P.sand });
    g.cyl({ x: 0, y: 0, z: 0.45, r: 0.08, h: 0.55, c: P.steelDark, segments: 8 });

    // scanning bar and hub
    g.box({ x: 0, y: 0, z: 1, w: 1.25, d: 0.12, h: 0.14, c: P.steel, bias: 0.1 });
    g.box({ x: 0, y: 0, z: 0.98, w: 0.18, d: 0.24, h: 0.18, c: P.steelDark, bias: 0.12 });
    g.circle({ x: 0.56, y: 0, z: 1.07, r: 0.07, c: P.red, bias: 0.6 });
  },
};
