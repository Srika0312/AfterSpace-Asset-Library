import { P } from '../lib/palette.js';

export default {
  key: 'exploration-robot',
  name: 'Exploration Robot',
  category: 'inhabitants',
  blurb: 'Six-wheel planetary scout robot equipped with elevated mast, stereo camera oculars, and dish antenna.',
  what: 'an exploration robot',
  footprint: [1.0, 0.8],
  height: 1.35,
  tags: ['inhabitants', 'robot', 'exploration', 'scout', 'planetary'],
  refs: ['AF-INH-007'],
  hero: 0,
  status: 'review',
  draw(g) {
    // 6-wheel articulated rocker bogie
    g.box({ x: 0, y: 0, z: 0, w: 0.85, d: 0.7, h: 0.22, c: P.steelDark });

    // scientific equipment body
    g.box({ x: 0, y: 0, z: 0.22, w: 0.6, d: 0.5, h: 0.42, c: P.offWhite });

    // elevated panoramic sensor mast
    g.cyl({ x: 0.18, y: 0, z: 0.64, r: 0.06, h: 0.6, c: P.steel, segments: 8 });

    // stereo camera ocular bar
    g.box({ x: 0.18, y: 0, z: 1.2, w: 0.22, d: 0.12, h: 0.1, c: P.teal });

    // miniature high-gain communications dish
    g.circle({ x: -0.18, y: 0, z: 0.82, r: 0.16, c: P.teal, bias: 0.55 });
  },
};
