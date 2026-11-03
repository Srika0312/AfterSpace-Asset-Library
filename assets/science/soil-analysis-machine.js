import { P } from '../lib/palette.js';

export default {
  key: 'soil-analysis-machine',
  name: 'Soil Analysis Machine',
  category: 'science',
  blurb: 'Regolith sample processing station with pulverizer grinder, intake hopper, and mass spectrometer.',
  what: 'a soil analysis machine',
  footprint: [1.7, 1.3],
  height: 1.55,
  tags: ['science', 'soil', 'regolith', 'spectrometer', 'analysis'],
  refs: ['AF-SCI-009'],
  hero: 0,
  status: 'review',
  draw(g) {
    // vibration isolating skid
    g.box({ x: 0, y: 0, z: 0, w: 1.6, d: 1.2, h: 0.22, c: P.steelDark });

    // regolith intake funnel hopper
    g.cyl({ x: -0.38, y: 0, z: 0.75, r: 0.36, r2: 0.2, h: 0.45, c: P.steel, segments: 12 });

    // mass spectrometer analytical console
    g.box({ x: 0.32, y: 0, z: 0.22, w: 0.85, d: 0.95, h: 0.88, c: P.offWhite });

    // lower sample pulverizer grinder body
    g.box({ x: -0.38, y: 0, z: 0.22, w: 0.65, d: 0.65, h: 0.55, c: P.steelDark });

    // chemical assay reagent column
    g.cyl({ x: 0.35, y: 0.3, z: 1.1, r: 0.12, h: 0.35, c: P.teal, segments: 10 });
  },
};
