import { wide } from './utils.js';

/*
 * SVG templates
 */
const ends = {
  '╷': `<path d="M 5 10, 5 20"/>`,
  '╵': `<path d="M 5 10, 5 0"/>`,
  '╶': `<path d="M 5 10, 10 10"/>`,
  '╴': `<path d="M 5 10, 0 10"/>`,
};
const ticks = {
  '┬': `<path d="M 2 10, 8 10, M 5 10, 5 20"/>`,
  '┴': `<path d="M 2 10, 8 10, M 5 10, 5 0"/>`,
  '├': `<path d="M 5 7, 5 13, M 5 10, 10 10"/>`,
  '┤': `<path d="M 5 7, 5 13, M 5 10, 0 10"/>`,
};

/*
 * Character patterns
 */
export default [
  /*
   * Open ends
   */

  /* Top */
  {
    hotspot: '╻',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(ends['╷']),
  },
  {
    hotspot: '╷',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: ends['╷'],
  },
  {
    hotspot: '.',
    size: 1,
    pattern: /^...[^-+].[|+].[^-+].$/,
    mask: [[], [false, true, false], []],
    svg: ends['╷'],
  },

  /* Bottom */
  {
    hotspot: '╹',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(ends['╵']),
  },
  {
    hotspot: '╵',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: ends['╵'],
  },
  {
    hotspot: "'",
    size: 1,
    pattern: /^.[|+].[^-+]...[^-+].$/,
    mask: [[], [false, true, false], []],
    svg: ends['╵'],
  },

  /* Left */
  {
    hotspot: '╺',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(ends['╶']),
  },
  {
    hotspot: '╶',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: ends['╶'],
  },

  /* Right */
  {
    hotspot: '╸',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: wide(ends['╴']),
  },
  {
    hotspot: '╴',
    size: 0,
    pattern: /^.$/,
    mask: [[true]],
    svg: ends['╴'],
  },

  /*
   * Terminal tick
   */

  /* Top */
  {
    hotspot: '+',
    size: 1,
    pattern: /^.[^|+].[^-+].[|+].[^-+].$/,
    mask: [[], [false, true, false], []],
    svg: ticks['┬'],
  },

  /* Bottom */
  {
    hotspot: '+',
    size: 1,
    pattern: /^.[|+].[^-+].[^|+].[^-+].$/,
    mask: [[], [false, true, false], []],
    svg: ticks['┴'],
  },

  /* Left */
  {
    hotspot: '+',
    size: 1,
    pattern: /^.[^|+].[-+].[^|+].[^-+].$/,
    mask: [[], [false, true, false], []],
    svg: ticks['├'],
  },

  /* Right */
  {
    hotspot: '+',
    size: 1,
    pattern: /^.[^|+].[^-+].[^|+].[-+].$/,
    mask: [[], [false, true, false], []],
    svg: ticks['┤'],
  },
];
