import { wide } from '../svg.js';
import { connections } from '../utils.js';
import { endTop, endBottom, anchor } from './characters.js';

/*
 * SVG templates
 */
export const ends = {
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
    svg: wide(ends['╷']),
  },
  {
    hotspot: '╷',
    size: 0,
    svg: ends['╷'],
  },
  {
    hotspot: endTop,
    size: 1,
    pattern: connections([, , , , true, ,]),
    svg: ends['╷'],
  },

  /* Bottom */
  {
    hotspot: '╹',
    size: 0,
    svg: wide(ends['╵']),
  },
  {
    hotspot: '╵',
    size: 0,
    svg: ends['╵'],
  },
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections([true, , , , , ,]),
    svg: ends['╵'],
  },

  /* Left */
  {
    hotspot: '╺',
    size: 0,
    svg: wide(ends['╶']),
  },
  {
    hotspot: '╶',
    size: 0,
    svg: ends['╶'],
  },

  /* Right */
  {
    hotspot: '╸',
    size: 0,
    svg: wide(ends['╴']),
  },
  {
    hotspot: '╴',
    size: 0,
    svg: ends['╴'],
  },

  /*
   * Terminal tick
   */

  /* Top */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([false, , false, , true, , false]),
    svg: ticks['┬'],
  },

  /* Bottom */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([true, , false, , false, , false]),
    svg: ticks['┴'],
  },

  /* Left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([false, , true, , false, , false]),
    svg: ticks['├'],
  },

  /* Right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([false, , false, , false, , true]),
    svg: ticks['┤'],
  },
];
