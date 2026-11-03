import { P } from '../lib/palette.js';

export default {
  key: 'waste-collection-unit',
  name: 'Waste Collection Unit',
  category: 'industrial',
  blurb: 'Municipal and yard roll-off skip bin with dual hinged weather-resistant lids.',
  what: 'a waste collection unit',
  footprint: [1.5, 1.1],
  height: 1.0,
  tags: ['industrial', 'waste', 'recycling', 'dumpster', 'sanitation'],
  refs: ['AF-IND-020'],
  hero: 0,
  status: 'review',
  draw(g) {
    // heavy steel bottom skid runners
    g.box({ x: 0, y: 0, z: 0, w: 1.35, d: 0.85, h: 0.08, c: P.steelDark });

    // main tapered skip bin body
    g.box({ x: 0, y: 0, z: 0.08, w: 1.3, d: 0.8, h: 0.65, c: P.teal });

    // slanted protective cover lids
    g.roof({ x: 0, y: 0, z: 0.73, w: 1.34, d: 0.84, h: 0.18, c: P.steelDark, gable: P.teal });

    // trunnion lifting pin bracket
    g.cyl({ x: 0, y: 0.44, z: 0.42, r: 0.06, h: 0.12, c: P.steelDark, axis: 'y', segments: 8 });

    // hazardous waste classification placard
    g.circle({ x: 0.4, y: 0.42, z: 0.52, r: 0.08, c: P.amber, bias: 0.55 });
  },
};
