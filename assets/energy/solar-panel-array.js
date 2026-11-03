import { P } from '../lib/palette.js';

export default {
  key: 'solar-panel-array',
  name: 'Solar Panel Array',
  category: 'energy',
  blurb: 'Tiered photovoltaic panel bank capturing solar radiation with an integrated power inverter.',
  what: 'a solar panel array',
  footprint: [2.2, 1.4],
  height: 1.1,
  tags: ['energy', 'solar', 'power', 'photovoltaic', 'renewable'],
  refs: ['AF-ENG-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // ground stanchion ballast frame
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.1, h: 0.22, c: P.steelDark });

    // lower stepped solar collector tier
    g.box({ x: 0, y: 0.25, z: 0.22, w: 1.8, d: 0.46, h: 0.15, c: P.teal });

    // upper elevated solar collector tier
    g.box({ x: 0, y: -0.25, z: 0.37, w: 1.8, d: 0.46, h: 0.15, c: P.teal });

    // power inverter / charge controller cabinet
    g.box({ x: 0.82, y: -0.4, z: 0.15, w: 0.22, d: 0.2, h: 0.35, c: P.offWhite });

    // grid sync status beacon
    g.circle({ x: 0.82, y: -0.28, z: 0.45, r: 0.06, c: P.amber, bias: 0.55 });
  },
};
