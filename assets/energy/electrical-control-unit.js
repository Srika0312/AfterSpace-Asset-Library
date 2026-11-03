import { P } from '../lib/palette.js';

export default {
  key: 'electrical-control-unit',
  name: 'Electrical Control Unit',
  category: 'energy',
  blurb: 'Weatherproof distribution switchgear cabinet regulating power distribution loops.',
  what: 'an electrical control unit',
  footprint: [1.2, 0.8],
  height: 1.35,
  tags: ['energy', 'control', 'switchgear', 'breaker', 'distribution'],
  refs: ['AF-ENG-008'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete mounting foundation pad
    g.box({ x: 0, y: 0, z: 0, w: 1.05, d: 0.65, h: 0.15, c: P.sand });

    // main switchgear cabinet body
    g.box({ x: 0, y: 0, z: 0.15, w: 0.9, d: 0.5, h: 0.95, c: P.steelDark });

    // weather eaves rain hood
    g.roof({ x: 0, y: 0, z: 1.1, w: 1.0, d: 0.58, h: 0.12, c: P.steelDark, gable: P.steelDark });

    // front double maintenance doors
    g.box({ x: 0, y: 0.26, z: 0.25, w: 0.75, d: 0.03, h: 0.7, c: P.offWhite });

    // active circuit status indicator
    g.circle({ x: 0.25, y: 0.28, z: 0.85, r: 0.06, c: P.amber, bias: 0.55 });
  },
};
