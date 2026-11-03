import { P } from '../lib/palette.js';

export default {
  key: 'automated-irrigation-system',
  name: 'Automated Irrigation System',
  category: 'agriculture',
  blurb: 'Drip-feed agricultural irrigation manifold skid with pressure booster pump, filter canisters, and dosing controller.',
  what: 'an automated irrigation system',
  footprint: [1.6, 1.2],
  height: 1.4,
  tags: ['agriculture', 'irrigation', 'water', 'drip', 'farming'],
  refs: ['AF-AGR-002'],
  hero: 0,
  status: 'review',
  draw(g) {
    // structural equipment skid base
    g.box({ x: 0, y: 0, z: 0, w: 1.5, d: 1.1, h: 0.2, c: P.steelDark });

    // high-pressure distribution pump drum
    g.cyl({ x: -0.35, y: 0, z: 0.2, r: 0.36, h: 0.75, axis: 'x', c: P.steel, segments: 12 });

    // dual microfiltration canisters
    g.cyl({ x: 0.35, y: -0.15, z: 0.2, r: 0.22, h: 0.85, c: P.offWhite, segments: 10 });

    // dosing controller and telemetry cabinet
    g.box({ x: 0.35, y: 0.25, z: 0.2, w: 0.55, d: 0.35, h: 0.75, c: P.offWhite });

    // overhead supply feeder pipe
    g.cyl({ x: 0, y: 0, z: 1.05, r: 0.09, h: 1.4, axis: 'x', c: P.canopy, segments: 8 });
  },
};
