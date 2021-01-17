import { segment, wide } from '../shapes.js';
import { vline, hline, dline, uline, bline } from '../characters.js';

/*
 * Shapes
 */

// prettier-ignore
export const lines = {
  '─': segment({from: [0, 10], to: [10, 10]}),
  '│': segment({from: [5,  0], to: [ 5, 20]}),
  '╲': segment({from: [0,  0], to: [10, 20]}),
  '╱': segment({from: [0, 20], to: [10,  0]}),
  _:   segment({from: [0, 20], to: [10, 20]}),
};

// prettier-ignore
const wideLines = {
  '─': segment({from: [0, 10], to: [10, 10]}, wide),
  '│': segment({from: [5,  0], to: [ 5, 20]}, wide),
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
