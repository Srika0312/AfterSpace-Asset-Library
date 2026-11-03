import { P } from '../lib/palette.js';

export default {
  key: 'atmospheric-monitoring-tower',
  name: 'Atmospheric Monitoring Tower',
  category: 'water-atmos',
  blurb: 'Slender meteorological sensor mast with telemetry pod, dual crossarm transducers, and cup anemometer.',
  what: 'an atmospheric monitoring tower',
  footprint: [1.0, 1.0],
  height: 2.8,
  tags: ['weather', 'atmosphere', 'sensor', 'tower', 'telemetry'],
  refs: ['AF-WAT-010'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete pyramid footing
    g.box({ x: 0, y: 0, z: 0, w: 0.9, d: 0.9, h: 0.25, c: P.steelDark });

    // structural tubular mast
    g.cyl({ x: 0, y: 0, z: 0.25, r: 0.16, h: 2.1, c: P.steel, segments: 10 });

    // mid-height telemetry transceiver pod
    g.box({ x: 0, y: 0, z: 1.4, w: 0.38, d: 0.32, h: 0.42, c: P.offWhite });

    // upper sensor crossarm bracket
    g.cyl({ x: 0, y: 0, z: 2.2, r: 0.06, h: 0.75, axis: 'x', c: P.teal, segments: 8 });

    // anemometer and environmental sensor head
    g.cyl({ x: 0, y: 0, z: 2.35, r: 0.22, r2: 0.05, h: 0.35, c: P.teal, segments: 10 });
  },
};
