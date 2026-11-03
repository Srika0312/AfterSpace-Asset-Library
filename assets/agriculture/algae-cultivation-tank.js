import { P } from '../lib/palette.js';

export default {
  key: 'algae-cultivation-tank',
  name: 'Algae Cultivation Tank',
  category: 'agriculture',
  blurb: 'Continuous microalgae photobioreactor with transparent culture fluid vessel and centrifuge harvester console.',
  what: 'an algae cultivation tank',
  footprint: [2.0, 1.6],
  height: 1.5,
  tags: ['agriculture', 'algae', 'bioreactor', 'photobioreactor', 'oxygen'],
  refs: ['AF-AGR-006'],
  hero: 0,
  status: 'review',
  draw(g) {
    // reinforced containment basin
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.5, h: 0.22, c: P.steelDark });

    // dense green microalgae culture fluid drum
    g.cyl({ x: -0.25, y: 0, z: 0.22, r: 0.62, h: 0.95, c: P.canopy, segments: 14 });

    // transparent photobioreactor glass shroud
    g.cyl({ x: -0.25, y: 0, z: 0.22, r: 0.68, h: 1.05, c: P.teal, segments: 14 });

    // centrifuge harvester console
    g.box({ x: 0.6, y: 0, z: 0.22, w: 0.55, d: 1.05, h: 0.85, c: P.offWhite });

    // agitation motor and harvest pipe
    g.cyl({ x: -0.25, y: 0, z: 1.27, r: 0.2, h: 0.2, c: P.steelDark, segments: 10 });
  },
};
