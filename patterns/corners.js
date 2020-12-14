import { wide } from './utils.js';

/*
 * SVG templates
 */
const corners = {
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
    pattern: /^.$/,
    mask: [[true]],
    svg: corners['┌'],
  },
  {
    hotspot: '┏',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(corners['┌']),
  },
  {
    hotspot: '+',
    size: 1,
    pattern: /^.[^|+].[-+].[|+].[^-+].$/,
    mask: [[], [false, true, false], []],
    svg: corners['┌'],
  },

  /* Top-right */
  {
    hotspot: '┐',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: corners['┐'],
  },
  {
    hotspot: '┓',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(corners['┐']),
  },
  {
    hotspot: '+',
    size: 1,
    pattern: /^.[^|+].[^-+].[|+].[-+].$/,
    mask: [[], [false, true, false], []],
    svg: corners['┐'],
  },

  /* Bottom-left */
  {
    hotspot: '└',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: corners['└'],
  },
  {
    hotspot: '┗',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(corners['└']),
  },
  {
    hotspot: '└',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: corners['└'],
  },
  {
    hotspot: '+',
    size: 1,
    pattern: /^.[|+].[-+].[^|+].[^-+].$/,
    mask: [[], [false, true, false], []],
    svg: corners['└'],
  },

  /* Bottom-right */
  {
    hotspot: '┘',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: corners['┘'],
  },
  {
    hotspot: '┛',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(corners['┘']),
  },
  {
    hotspot: '+',
    size: 1,
    pattern: /^.[|+].[^-+].[^|+].[-+].$/,
    mask: [[], [false, true, false], []],
    svg: corners['┘'],
  },

  /*
   * Rounded corners
   */

  /* Top-left */
  {
    hotspot: '╭',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: corners['╭'],
  },
  {
    hotspot: '.',
    size: 1,
    pattern: /^.[^|+].[-+].[|+' ].[^-+].$/,
    mask: [[], [false, true, false], []],
    svg: corners['╭'],
  },

  /* Top-right */
  {
    hotspot: '╮',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: corners['╮'],
  },
  {
    hotspot: '.',
    size: 1,
    pattern: /^.[^|+].[^-+].[|+' ].[-+].$/,
    mask: [[], [false, true, false], []],
    svg: corners['╮'],
  },

  /* Bottom-left */
  {
    hotspot: '╰',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: corners['╰'],
  },
  {
    hotspot: "'",
    size: 1,
    pattern: /^.[|+. ].[-+].[^|+].[^-+].$/,
    mask: [[], [false, true, false], []],
    svg: corners['╰'],
  },

  /* Bottom-right */
  {
    hotspot: '╯',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: corners['╯'],
  },
  {
    hotspot: "'",
    size: 1,
    pattern: /^.[|+. ].[^-+].[^|+].[-+].$/,
    mask: [[], [false, true, false], []],
    svg: corners['╯'],
  },
];
