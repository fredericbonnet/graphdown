import { wide } from '../svg.js';
import { vline, hline, dline, uline } from '../characters.js';

/*
 * SVG templates
 */
export const lines = {
  '─': `<path d="M 0 10, 10 10"/>`,
  '│': `<path d="M 5  0,  5 20"/>`,
  '╲': `<path d="M 0  0, 10 20"/>`,
  '╱': `<path d="M 0 20, 10  0"/>`,
};

/*
 * Character patterns
 */
export default [
  /* Horizontal line */
  {
    hotspot: '━',
    size: 0,
    svg: wide(lines['─']),
  },
  {
    hotspot: '─',
    size: 0,
    svg: lines['─'],
  },
  {
    hotspot: hline,
    size: 0,
    svg: lines['─'],
  },

  /* Vertical line */
  {
    hotspot: '┃',
    size: 0,
    svg: wide(lines['│']),
  },
  {
    hotspot: '│',
    size: 0,
    svg: lines['│'],
  },
  {
    hotspot: vline,
    size: 0,
    svg: lines['│'],
  },

  /* Downward diagonal */
  {
    hotspot: '╲',
    size: 0,
    svg: lines['╲'],
  },
  {
    hotspot: dline,
    size: 0,
    svg: lines['╲'],
  },

  /* Upward diagonal */
  {
    hotspot: '╱',
    size: 0,
    svg: lines['╱'],
  },
  {
    hotspot: uline,
    size: 0,
    svg: lines['╱'],
  },
];
