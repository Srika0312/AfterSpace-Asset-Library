import { P } from '../lib/palette.js';

export default {
  key: 'battery-storage-unit',
  name: 'Battery Storage Unit',
  category: 'energy',
  blurb: 'Utility-scale modular battery bank with liquid cooling for grid load-leveling and backup reserves.',
  what: 'a battery storage unit',
  footprint: [2.2, 1.2],
  height: 1.25,
  tags: ['energy', 'battery', 'storage', 'grid', 'lithium'],
  refs: ['AF-ENG-005'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete pad footing
    g.box({ x: 0, y: 0, z: 0, w: 2.0, d: 1.0, h: 0.12, c: P.sand });

    // main insulated battery housing enclosure
    g.box({ x: 0, y: 0, z: 0.12, w: 1.9, d: 0.9, h: 0.9, c: P.offWhite });

    // thermal management chiller HVAC unit
    g.box({ x: 0.85, y: 0, z: 0.25, w: 0.25, d: 0.7, h: 0.65, c: P.steelDark });

    // battery module access door panel
    g.box({ x: -0.15, y: 0.46, z: 0.2, w: 1.2, d: 0.04, h: 0.7, c: P.teal });

    // charge level indicator LED
    g.circle({ x: -0.5, y: 0.48, z: 0.85, r: 0.07, c: P.teal, bias: 0.55 });
  },
};
