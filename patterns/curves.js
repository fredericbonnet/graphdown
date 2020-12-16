import { connections } from '../utils.js';
import { ends } from './ends.js';

/*
 * SVG templates
 */
const arcs = {
  '╭': `<path d="M 10 10, Q -5 10, -5, 25, L -5 30"/>`,
  '╮': `<path d="M 0 10, Q 15 10, 15, 25, L 15 30"/>`,
  '╰': `<path d="M 10 10, Q -5 10, -5, -5, L -5 -10"/>`,
  '╯': `<path d="M 0 10, Q 15 10, 15, -5, L 15 -10"/>`,
};

/*
 * Character patterns
 */
export default [
  /* Left arc junctions */
  {
    hotspot: '|',
    size: 1,
    pattern: connections([`[ ]`, `[.]`, false, `[']`, `[ ]`, , false]),
    mask: [[], [, true], []],
    svg: '',
  },

  /* Right arc junctions */
  {
    hotspot: '|',
    size: 1,
    pattern: connections([`[ ]`, , false, , `[ ]`, `[']`, false, `[.]`]),
    mask: [[], [, true], []],
    svg: '',
  },

  /* Top left arc */
  {
    hotspot: '.',
    size: 1,
    pattern: connections([, , , `[^+]`, false, `[|+]`, `[|. ]`]),
    mask: [[], [, true], []],
    svg: arcs['╭'],
  },
  {
    hotspot: '|',
    size: 1,
    pattern: connections([`[ ]`, `[.]`, `[^|+]`]),
    mask: [[], [, true], []],
    svg: ends['╷'],
  },
  {
    hotspot: '+',
    size: 1,
    pattern: connections([`[ ]`, `[.]`, , , , , `[-+.']`]),
    mask: [[], [, true], []],
    svg: ends['╴'],
  },
  {
    hotspot: '+',
    size: 1,
    pattern: connections([`[ ]`, `[.]`, `[-+.']`]),
    mask: [[], [, true], []],
    svg: ends['╶'],
  },

  /* Top right arc */
  {
    hotspot: '.',
    size: 1,
    pattern: connections([, , `[|. ]`, `[|+]`, `[^|+]`, `[^+]`]),
    mask: [[], [, true], []],
    svg: arcs['╮'],
  },
  {
    hotspot: '|',
    size: 1,
    pattern: connections([`[ ]`, , , , , , `[^|+]`, `[.]`]),
    mask: [[], [, true], []],
    svg: ends['╷'],
  },
  {
    hotspot: '+',
    size: 1,
    pattern: connections([`[ ]`, , `[-+.']`, , , , , `[.]`]),
    mask: [[], [, true], []],
    svg: ends['╶'],
  },
  {
    hotspot: '+',
    size: 1,
    pattern: connections([`[ ]`, , , , , , `[-+.']`, `[.]`]),
    mask: [[], [, true], []],
    svg: ends['╴'],
  },

  /* Bottom left arc */
  {
    hotspot: "'",
    size: 1,
    pattern: connections([`[^|+]`, `[^+]`, , , , , `[|' ]`, `[|+]`]),
    mask: [[], [, true], []],
    svg: arcs['╰'],
  },
  {
    hotspot: '|',
    size: 1,
    pattern: connections([, , `[^|+]`, `[']`, `[ ]`]),
    mask: [[], [, true], []],
    svg: ends['╵'],
  },
  {
    hotspot: '+',
    size: 1,
    pattern: connections([, , , `[']`, `[ ]`, , `[-+.']`]),
    mask: [[], [, true], []],
    svg: ends['╴'],
  },
  {
    hotspot: '+',
    size: 1,
    pattern: connections([, , `[-+.']`, `[']`, `[ ]`]),
    mask: [[], [, true], []],
    svg: ends['╶'],
  },

  /* Bottom right arc */
  {
    hotspot: "'",
    size: 1,
    pattern: connections([`[^|+]`, `[|+]`, `[|' ]`, , , , , `[^+]`]),
    mask: [[], [, true], []],
    svg: arcs['╯'],
  },
  {
    hotspot: '|',
    size: 1,
    pattern: connections([, , , , `[ ]`, `[']`, `[^|+]`]),
    mask: [[], [, true], []],
    svg: ends['╵'],
  },
  {
    hotspot: '+',
    size: 1,
    pattern: connections([, , `[-+.']`, , `[ ]`, `[']`]),
    mask: [[], [, true], []],
    svg: ends['╶'],
  },
  {
    hotspot: '+',
    size: 1,
    pattern: connections([, , , , `[ ]`, `[']`, `[-+.']`]),
    mask: [[], [, true], []],
    svg: ends['╴'],
  },
];
