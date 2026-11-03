import { P } from '../lib/palette.js';

export default {
  key: 'wind-turbine',
  name: 'Wind Turbine',
  category: 'energy',
  blurb: 'Utility-scale aerodynamic wind turbine with high-altitude rotor generating kinetic power.',
  what: 'a wind turbine',
  footprint: [1.6, 1.6],
  height: 3.8,
  tags: ['energy', 'wind', 'turbine', 'power', 'renewable'],
  refs: ['AF-ENG-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete gravity foundation base
    g.cyl({ x: 0, y: 0, z: 0, r: 0.5, h: 0.15, c: P.steelDark, segments: 10 });

    // slender tapered tubular steel tower
    g.cyl({ x: 0, y: 0, z: 0.15, r: 0.22, h: 3.0, r2: 0.1, c: P.offWhite, segments: 10 });

    // aerodynamic generator nacelle housing
    g.box({ x: 0, y: 0, z: 3.15, w: 0.6, d: 0.26, h: 0.24, c: P.offWhite });

    // streamlined rotor hub nose cone
    g.cyl({ x: 0.36, y: 0, z: 3.27, r: 0.14, h: 0.18, r2: 0.04, c: P.slate, axis: 'x', segments: 8 });

    // tri-blade rotor sweep disc
    g.circle({ x: 0.46, y: 0, z: 3.27, r: 0.95, c: P.offWhite, bias: 0.55 });

    // nacelle tail aviation warning beacon
    g.circle({ x: -0.22, y: 0, z: 3.32, r: 0.08, c: P.red, bias: 0.6 });
  },
};
