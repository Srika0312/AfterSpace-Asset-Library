import { P } from '../lib/palette.js';

export default {
  key: 'nuclear-reactor-module',
  name: 'Nuclear Reactor Module',
  category: 'energy',
  blurb: 'Modular fission power block with reinforced biological containment shield and heat exchanger.',
  what: 'a nuclear reactor module',
  footprint: [2.2, 2.0],
  height: 2.1,
  tags: ['energy', 'nuclear', 'fission', 'reactor', 'power'],
  refs: ['AF-ENG-003'],
  hero: 0,
  status: 'review',
  draw(g) {
    // concrete seismic foundation plinth
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.7, h: 0.35, c: P.sand });

    // cylindrical containment vessel
    g.cyl({ x: -0.15, y: 0, z: 0.35, r: 0.65, h: 1.1, c: P.offWhite, segments: 14 });

    // reinforced containment dome cap
    g.circle({ x: -0.15, y: 0, z: 1.45, r: 0.62, c: P.offWhite, bias: 0.5 });

    // auxiliary coolant manifold annex
    g.box({ x: 0.68, y: 0, z: 0.35, w: 0.45, d: 0.9, h: 0.75, c: P.steelDark });

    // core warning status beacon
    g.circle({ x: 0.68, y: 0, z: 1.15, r: 0.09, c: P.amber, bias: 0.6 });
  },
};
