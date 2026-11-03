import { P } from '../lib/palette.js';

export default {
  key: 'hydroponic-growing-rack',
  name: 'Hydroponic Growing Rack',
  category: 'agriculture',
  blurb: 'Multi-tiered vertical hydroponic plant rack with nutrient fluid troughs, lush crop beds, and LED grow canopy.',
  what: 'a hydroponic growing rack',
  footprint: [2.0, 1.2],
  height: 1.75,
  tags: ['agriculture', 'hydroponic', 'farming', 'plants', 'food'],
  refs: ['AF-AGR-001'],
  hero: 0,
  status: 'review',
  draw(g) {
    // base nutrient sump and frame
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.1, h: 0.22, c: P.steelDark });

    // lower vegetative growing tray
    g.box({ x: 0, y: 0, z: 0.22, w: 1.8, d: 0.95, h: 0.35, c: P.canopy });

    // mid vegetative growing tray
    g.box({ x: 0, y: 0, z: 0.72, w: 1.8, d: 0.95, h: 0.35, c: P.canopy });

    // top LED luminaire canopy
    g.box({ x: 0, y: 0, z: 1.25, w: 1.85, d: 1.0, h: 0.18, c: P.offWhite });

    // vertical plumbing feed riser
    g.cyl({ x: 0.75, y: -0.35, z: 0.22, r: 0.08, h: 1.35, c: P.steel, segments: 8 });
  },
};
