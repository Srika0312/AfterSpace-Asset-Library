import { P } from '../lib/palette.js';

export default {
  key: 'research-computer-terminal',
  name: 'Research Computer Terminal',
  category: 'science',
  blurb: 'Scientific computing workstation with angled holographic display, keyboard deck, and mainframe pedestal.',
  what: 'a research computer terminal',
  footprint: [1.3, 1.1],
  height: 1.45,
  tags: ['science', 'terminal', 'computer', 'workstation', 'data'],
  refs: ['AF-SCI-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // console pedestal base
    g.box({ x: 0, y: 0, z: 0, w: 1.1, d: 0.9, h: 0.18, c: P.steelDark });

    // central compute mainframe tower
    g.box({ x: 0, y: -0.15, z: 0.18, w: 0.85, d: 0.55, h: 0.65, c: P.offWhite });

    // angled holographic display screen
    g.roof({ x: 0, y: 0.05, z: 0.83, w: 0.95, d: 0.45, h: 0.48, c: P.teal, gable: P.steelDark, ridge: 'x' });

    // input keyboard control ledge
    g.box({ x: 0, y: 0.3, z: 0.58, w: 0.75, d: 0.32, h: 0.08, c: P.steel });

    // optical network sensor disc
    g.circle({ x: 0.32, y: -0.15, z: 0.85, r: 0.07, c: P.teal, bias: 0.55 });
  },
};
