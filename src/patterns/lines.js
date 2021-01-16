import { wide, path } from '../svg.js';
import { vline, hline, dline, uline, bline } from '../characters.js';

/*
 * SVG templates
 */

// prettier-ignore
export const lines = {
  '─': path([0, 10], 'l 10   0'),
  '│': path([5,  0], 'l  0  20'),
  '╲': path([0,  0], 'l 10  20'),
  '╱': path([0, 20], 'l 10 -20'),
  _:   path([0, 20], 'l 10   0'),
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
