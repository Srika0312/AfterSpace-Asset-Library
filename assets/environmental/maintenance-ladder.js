import { P } from '../lib/palette.js';

export default {
  key: 'maintenance-ladder',
  name: 'Maintenance Ladder',
  category: 'environmental',
  blurb: 'Industrial access ladder bolted to structural walls with safety hoop cage and tubular side rails.',
  what: 'a maintenance ladder',
  footprint: [0.9, 0.7],
  height: 2.2,
  tags: ['environmental', 'ladder', 'access', 'maintenance', 'safety'],
  refs: ['AF-PRP-017'],
  hero: 0,
  status: 'review',
  draw(g) {
    // wall standoff anchor brackets
    g.box({ x: 0, y: -0.2, z: 0.2, w: 0.7, d: 0.2, h: 1.9, c: P.steelDark });

    // left ladder vertical stringer rail
    g.cyl({ x: -0.22, y: 0, z: 0, r: 0.04, h: 2.15, c: P.steel, segments: 6 });

    // right ladder vertical stringer rail
    g.cyl({ x: 0.22, y: 0, z: 0, r: 0.04, h: 2.15, c: P.steel, segments: 6 });

    // ladder rungs array
    g.box({ x: 0, y: 0, z: 0.2, w: 0.42, d: 0.04, h: 1.8, c: P.steel });

    // upper safety grab hoop arch
    g.roof({ x: 0, y: 0.1, z: 2.0, w: 0.6, d: 0.35, h: 0.2, c: P.offWhite, gable: P.steelDark, ridge: 'x' });
  },
};
