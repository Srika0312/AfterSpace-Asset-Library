import { P } from '../lib/palette.js';

export default {
  key: 'thermal-energy-storage-tank',
  name: 'Thermal Energy Storage Tank',
  category: 'energy',
  blurb: 'Insulated molten salt reservoir storing thermal energy for deferred turbine generation.',
  what: 'a thermal energy storage tank',
  footprint: [1.8, 1.8],
  height: 2.1,
  tags: ['energy', 'thermal', 'storage', 'molten-salt', 'heat'],
  refs: ['AF-ENG-011'],
  hero: 0,
  status: 'review',
  draw(g) {
    // structural foundation ring base
    g.cyl({ x: 0, y: 0, z: 0, r: 0.8, h: 0.18, c: P.steelDark, segments: 12 });

    // heavily insulated cylindrical storage vessel
    g.cyl({ x: 0, y: 0, z: 0.18, r: 0.72, h: 1.5, c: P.terracotta, segments: 14 });

    // insulated vessel dome roof
    g.circle({ x: 0, y: 0, z: 1.68, r: 0.7, c: P.terracotta, bias: 0.5 });

    // vertical heat-transfer fluid piping loop
    g.cyl({ x: 0.62, y: 0, z: 0.35, r: 0.08, h: 1.25, c: P.steel, axis: 'z', segments: 8 });

    // inspection port and pressure relief valve
    g.circle({ x: 0, y: 0, z: 1.76, r: 0.14, c: P.brass, bias: 0.6 });
  },
};
