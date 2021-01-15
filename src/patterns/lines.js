import { wide } from '../svg.js';
import { vline, hline, dline, uline, bline } from '../characters.js';

/*
 * SVG templates
 */
export const lines = {
  '─': `<path d="M 0 10, l 10   0"/>`,
  '│': `<path d="M 5  0, l  0  20"/>`,
  '╲': `<path d="M 0  0, l 10  20"/>`,
  '╱': `<path d="M 0 20, l 10 -20"/>`,
  _: `<path d="M 0 20, l 10   0"/>`,
};

/*
 * Character patterns
 */
export default [
  /* Horizontal line */
  {
    hotspot: '━',
    svg: wide(lines['─']),
  },
  {
    hotspot: '─',
    svg: lines['─'],
  },
  {
    hotspot: hline,
    svg: lines['─'],
  },

  /* Vertical line */
  {
    hotspot: '┃',
    svg: wide(lines['│']),
  },
  {
    hotspot: '│',
    svg: lines['│'],
  },
  {
    hotspot: vline,
    svg: lines['│'],
  },

  /* Downward diagonal */
  {
    hotspot: '╲',
    svg: lines['╲'],
  },
  {
    hotspot: dline,
    svg: lines['╲'],
  },

  /* Upward diagonal */
  {
    hotspot: '╱',
    svg: lines['╱'],
  },
  {
    hotspot: uline,
    svg: lines['╱'],
  },

  /* Bottom line */
  {
    hotspot: bline,
    svg: lines['_'],
  },
];
