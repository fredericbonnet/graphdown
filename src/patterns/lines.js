import { wide } from '../svg.js';
import { vline, hline, dline, uline, bline } from '../characters.js';

/*
 * SVG templates
 */
export const lines = {
  '─': `<path d="M 0 10, 10 10"/>`,
  '│': `<path d="M 5  0,  5 20"/>`,
  '╲': `<path d="M 0  0, 10 20"/>`,
  '╱': `<path d="M 0 20, 10  0"/>`,
  _: `<path d="M 0 20, 10 20"/>`,
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
