// The Afterspace — shared palette
// One warm habitat palette for every asset. Keep accents rare and meaningful.

export const P = {
  // Ink / paper
  ink: '#3A3026',
  inkSoft: '#6F604E',
  paper: '#F7F4EC',
  cream: '#FBF8F0',
  line: '#E5DCC9',

  // Habitat greens
  canopy: '#4F6B3A',
  leaf: '#6E8A46',
  leafLight: '#8FA85C',
  pine: '#3C5733',
  moss: '#5C7038',

  // Timber / earth
  bark: '#6B4A34',
  barkDark: '#553A2A',
  soil: '#8A6A45',
  sand: '#D9C08A',
  wheat: '#E3C46E',
  straw: '#C9A85C',
  hay: '#D8B768',

  // Built
  clay: '#C97B54',
  terracotta: '#B5623F',
  brick: '#A9583D',
  roof: '#8E4B33',
  roofDark: '#733A28',
  timber: '#6B4A34',

  // Metal / tech
  brass: '#B08D3F',
  steel: '#7C8A8C',
  steelDark: '#5E6B6D',
  slate: '#55666B',
  glass: '#9FC0C4',
  glassDeep: '#7FA6AB',
  teal: '#3E7C7B',
  cyan: '#6FB3B0',

  // Signals
  rust: '#B5502F',
  red: '#C9564F',
  amber: '#E0A33E',
  white: '#FBF8F0',
  offWhite: '#EFEADC',
  black: '#2C2A26',
};

export const CATEGORIES = {
  space: {
    label: '1. Space Infrastructure and Communication',
    short: 'Space & Comms',
    color: '#4F6272',
    tint: '#E8EDF1',
  },
  industrial: {
    label: '2. Industrial and Warehouse Props',
    short: 'Industrial & Warehouse',
    color: '#8A6A45',
    tint: '#F4ECE4',
  },
  energy: {
    label: '3. Energy Infrastructure',
    short: 'Energy',
    color: '#E0A33E',
    tint: '#FBF5E6',
  },
  'water-atmos': {
    label: '4. Water and Atmospheric Infrastructure',
    short: 'Water & Atmosphere',
    color: '#3E7C7B',
    tint: '#E4F1F0',
  },
  waterAtmos: {
    label: '4. Water and Atmospheric Infrastructure',
    short: 'Water & Atmosphere',
    color: '#3E7C7B',
    tint: '#E4F1F0',
  },
  transport: {
    label: '5. Transportation',
    short: 'Transportation',
    color: '#C97B54',
    tint: '#F7ECE6',
  },
  transportation: {
    label: '5. Transportation',
    short: 'Transportation',
    color: '#C97B54',
    tint: '#F7ECE6',
  },
  residential: {
    label: '6. Residential and Habitat',
    short: 'Residential & Habitat',
    color: '#B5623F',
    tint: '#F6ECE6',
  },
  'residential-habitat': {
    label: '6. Residential and Habitat',
    short: 'Residential & Habitat',
    color: '#B5623F',
    tint: '#F6ECE6',
  },
  habitat: {
    label: '6. Residential and Habitat',
    short: 'Residential & Habitat',
    color: '#B5623F',
    tint: '#F6ECE6',
  },
  science: {
    label: '7. Science and Research',
    short: 'Science & Research',
    color: '#6FB3B0',
    tint: '#EAF5F5',
  },
  research: {
    label: '7. Science and Research',
    short: 'Science & Research',
    color: '#6FB3B0',
    tint: '#EAF5F5',
  },
  'science-research': {
    label: '7. Science and Research',
    short: 'Science & Research',
    color: '#6FB3B0',
    tint: '#EAF5F5',
  },
  agriculture: {
    label: '8. Agriculture and Biosphere',
    short: 'Agriculture & Biosphere',
    color: '#4F6B3A',
    tint: '#EDF2EA',
  },
  biosphere: {
    label: '8. Agriculture and Biosphere',
    short: 'Agriculture & Biosphere',
    color: '#4F6B3A',
    tint: '#EDF2EA',
  },
  'agriculture-biosphere': {
    label: '8. Agriculture and Biosphere',
    short: 'Agriculture & Biosphere',
    color: '#4F6B3A',
    tint: '#EDF2EA',
  },
  environmental: {
    label: '9. Small Environmental Props',
    short: 'Environmental Props',
    color: '#55666B',
    tint: '#EDF0F2',
  },
  'environmental-props': {
    label: '9. Small Environmental Props',
    short: 'Environmental Props',
    color: '#55666B',
    tint: '#EDF0F2',
  },
  props: {
    label: '9. Small Environmental Props',
    short: 'Environmental Props',
    color: '#55666B',
    tint: '#EDF0F2',
  },
  vegetation: {
    label: '10. Vegetation and Environmental Objects',
    short: 'Vegetation & Environment',
    color: '#6E8A46',
    tint: '#F1F5EB',
  },
  'vegetation-env': {
    label: '10. Vegetation and Environmental Objects',
    short: 'Vegetation & Environment',
    color: '#6E8A46',
    tint: '#F1F5EB',
  },
  inhabitants: {
    label: '11. Robots and Inhabitants',
    short: 'Robots & Inhabitants',
    color: '#A9583D',
    tint: '#F7ECE8',
  },
  'robots-inhabitants': {
    label: '11. Robots and Inhabitants',
    short: 'Robots & Inhabitants',
    color: '#A9583D',
    tint: '#F7ECE8',
  },
};

export const CATEGORY_ORDER = [
  'space',
  'industrial',
  'energy',
  'water-atmos',
  'transport',
  'residential',
  'science',
  'agriculture',
  'environmental',
  'vegetation',
  'inhabitants',
];

const colorCache = new Map();

/** Multiply a #rrggbb colour by a factor. Returns an `rgb()` string. */
export function shade(hex, factor = 1) {
  if (typeof hex !== 'string' || hex[0] !== '#') return hex;
  const key = hex + '|' + factor;
  const cached = colorCache.get(key);
  if (cached) return cached;

  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, Math.round(((n >> 16) & 255) * factor)));
  const g = Math.max(0, Math.min(255, Math.round(((n >> 8) & 255) * factor)));
  const b = Math.max(0, Math.min(255, Math.round((n & 255) * factor)));
  const out = `rgb(${r},${g},${b})`;
  colorCache.set(key, out);
  return out;
}

/** #rrggbb -> rgba(r,g,b,a) */
export function alpha(hex, a = 1) {
  if (typeof hex !== 'string' || hex[0] !== '#') return hex;
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/** Mix two #rrggbb colours. t=0 -> a, t=1 -> b */
export function mix(a, b, t) {
  const na = parseInt(a.slice(1), 16);
  const nb = parseInt(b.slice(1), 16);
  const ch = (shift) => {
    const av = (na >> shift) & 255;
    const bv = (nb >> shift) & 255;
    return Math.round(av + (bv - av) * t);
  };
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
}
