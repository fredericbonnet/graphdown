import { path, wide } from '../shapes.js';
import { vline, hline, dline, uline, bline } from '../characters.js';

/*
 * Shapes
 */

// prettier-ignore
export const lines = {
  '─': path([0, 10], 'l 10   0'),
  '│': path([5,  0], 'l  0  20'),
  '╲': path([0,  0], 'l 10  20'),
  '╱': path([0, 20], 'l 10 -20'),
  _:   path([0, 20], 'l 10   0'),
};

// prettier-ignore
const wideLines = {
  '─': path([0, 10], 'l 10   0', wide),
  '│': path([5,  0], 'l  0  20', wide),
};

/*
 * Character patterns
 */
export default [
  /* Horizontal line */
  {
    hotspot: '━',
    shapes: [wideLines['─']],
  },
  {
    hotspot: '─',
    shapes: [lines['─']],
  },
  {
    hotspot: hline,
    shapes: [lines['─']],
  },

  /* Vertical line */
  {
    hotspot: '┃',
    shapes: [wideLines['│']],
  },
  {
    hotspot: '│',
    shapes: [lines['│']],
  },
  {
    hotspot: vline,
    shapes: [lines['│']],
  },

  /* Downward diagonal */
  {
    hotspot: '╲',
    shapes: [lines['╲']],
  },
  {
    hotspot: dline,
    shapes: [lines['╲']],
  },

  /* Upward diagonal */
  {
    hotspot: '╱',
    shapes: [lines['╱']],
  },
  {
    hotspot: uline,
    shapes: [lines['╱']],
  },

  /* Bottom line */
  {
    hotspot: bline,
    shapes: [lines['_']],
  },
];
