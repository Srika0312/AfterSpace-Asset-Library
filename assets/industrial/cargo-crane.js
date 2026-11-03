import { P } from '../lib/palette.js';

export default {
  key: 'cargo-crane',
  name: 'Cargo Crane',
  category: 'industrial',
  blurb: 'Portal gantry jib crane for rapid container stacking and railhead transshipment.',
  what: 'a cargo crane',
  footprint: [2.2, 1.4],
  height: 2.85,
  tags: ['industrial', 'crane', 'cargo', 'shipping', 'heavy'],
  refs: ['AF-IND-018'],
  hero: 0,
  status: 'review',
  draw(g) {
    // wheel bogies and gantry chassis
    g.box({ x: 0, y: 0, z: 0, w: 1.9, d: 1.1, h: 0.35, c: P.steelDark });

    // heavy vertical crane tower column
    g.box({ x: -0.5, y: 0, z: 0.35, w: 0.28, d: 0.28, h: 1.7, c: P.amber });

    // cantilevered overhead crane boom
    g.box({ x: 0.1, y: 0, z: 2.05, w: 2.0, d: 0.24, h: 0.24, c: P.amber });

    // rear ballast counterweight block
    g.box({ x: -0.75, y: 0, z: 2.1, w: 0.45, d: 0.35, h: 0.35, c: P.steelDark });

    // hoist trolley cable and hook assembly
    g.cyl({ x: 0.55, y: 0, z: 1.4, r: 0.03, h: 0.65, c: P.black, segments: 6 });
  },
};
