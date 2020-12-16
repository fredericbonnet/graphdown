import { connections, include } from '../utils.js';
import { wide } from '../svg.js';
import {
  blank,
  arcTop,
  arcBottom,
  anchor,
  vline,
  hline,
  endTop,
  endBottom,
} from './characters.js';

/*
 * SVG templates
 */
export const corners = {
  '┌': `<path d="M 10 10, 5 10, 5 20"/>`,
  '┐': `<path d="M 0 10, 5 10, 5 20"/>`,
  '└': `<path d="M 10 10, 5 10, 5 0"/>`,
  '┘': `<path d="M 0 10, 5 10, 5 0"/>`,
  '╭': `<path d="M 5 20, 5 15, Q 5 10, 10 10"/>`,
  '╮': `<path d="M 5 20, 5 15, Q 5 10, 0 10"/>`,
  '╰': `<path d="M 5 0, 5 5, Q 5 10, 10 10"/>`,
  '╯': `<path d="M 5 0, 5 5, Q 5 10, 0 10"/>`,
};

/*
 * Character patterns
 */
export default [
  /*
   * Square corners
   */

  /* Top-left */
  {
    hotspot: '┌',
    size: 0,
    svg: corners['┌'],
  },
  {
    hotspot: '┏',
    size: 0,
    svg: wide(corners['┌']),
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: true, b: true, l: false }),
    svg: corners['┌'],
  },

  /* Top-right */
  {
    hotspot: '┐',
    size: 0,
    svg: corners['┐'],
  },
  {
    hotspot: '┓',
    size: 0,
    svg: wide(corners['┐']),
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: false, b: true, l: true }),
    svg: corners['┐'],
  },

  /* Bottom-left */
  {
    hotspot: '└',
    size: 0,
    svg: corners['└'],
  },
  {
    hotspot: '┗',
    size: 0,
    svg: wide(corners['└']),
  },
  {
    hotspot: '└',
    size: 0,
    svg: corners['└'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: true, b: false, l: false }),
    svg: corners['└'],
  },

  /* Bottom-right */
  {
    hotspot: '┘',
    size: 0,
    svg: corners['┘'],
  },
  {
    hotspot: '┛',
    size: 0,
    svg: wide(corners['┘']),
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: false, b: false, l: true }),
    svg: corners['┘'],
  },

  /*
   * Rounded corners
   */

  /* Top-left */
  {
    hotspot: '╭',
    size: 0,
    svg: corners['╭'],
  },
  {
    hotspot: arcTop,
    size: 1,
    pattern: connections({
      t: false,
      r: include(hline + anchor),
      b: include(vline + anchor + endBottom + blank),
      l: false,
    }),
    svg: corners['╭'],
  },

  /* Top-right */
  {
    hotspot: '╮',
    size: 0,
    svg: corners['╮'],
  },
  {
    hotspot: arcTop,
    size: 1,
    pattern: connections({
      t: false,
      r: false,
      b: include(vline + anchor + endBottom + blank),
      l: include(hline + anchor),
    }),
    svg: corners['╮'],
  },

  /* Bottom-left */
  {
    hotspot: '╰',
    size: 0,
    svg: corners['╰'],
  },
  {
    hotspot: arcBottom,
    size: 1,
    pattern: connections({
      t: include(vline + anchor + endTop + blank),
      r: include(hline + anchor),
      b: false,
      l: false,
    }),
    svg: corners['╰'],
  },

  /* Bottom-right */
  {
    hotspot: '╯',
    size: 0,
    svg: corners['╯'],
  },
  {
    hotspot: arcBottom,
    size: 1,
    pattern: connections({
      t: include(vline + anchor + endTop + blank),
      r: false,
      b: false,
      l: include(hline + anchor),
    }),
    svg: corners['╯'],
  },
];
