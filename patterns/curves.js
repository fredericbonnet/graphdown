import { connections, include, exclude } from '../utils.js';
import { ends } from './ends.js';
import {
  blank,
  arcTop,
  arcBottom,
  anchor,
  vline,
  endBottom,
  endTop,
} from './characters.js';

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
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: include(blank),
      tr: include(arcTop),
      r: false,
      br: include(arcBottom),
      b: include(blank),
      l: false,
    }),
    svg: '',
  },

  /* Right arc junctions */
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: include(blank),
      r: false,
      b: include(blank),
      bl: include(arcBottom),
      l: false,
      tl: include(arcTop),
    }),
    svg: '',
  },

  /* Top left arc */
  {
    hotspot: arcTop,
    size: 1,
    pattern: connections({
      br: exclude(anchor),
      b: false,
      bl: include(vline + anchor),
      l: include(vline + endTop + blank),
    }),
    svg: arcs['╭'],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: include(blank),
      tr: include(arcTop),
      r: exclude(vline + anchor),
    }),
    svg: ends['╷'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: include(blank), tr: include(arcTop), l: true }),
    svg: ends['╴'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: include(blank), tr: include(arcTop), r: true }),
    svg: ends['╶'],
  },

  /* Top right arc */
  {
    hotspot: arcTop,
    size: 1,
    pattern: connections({
      r: include(vline + endTop + blank),
      br: include(vline + anchor),
      b: exclude(vline + anchor),
      bl: exclude(anchor),
    }),
    svg: arcs['╮'],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      t: include(blank),
      l: exclude(vline + anchor),
      tl: include(arcTop),
    }),
    svg: ends['╷'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: include(blank), r: true, tl: include(arcTop) }),
    svg: ends['╶'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: include(blank), l: true, tl: include(arcTop) }),
    svg: ends['╴'],
  },

  /* Bottom left arc */
  {
    hotspot: arcBottom,
    size: 1,
    pattern: connections({
      t: exclude(vline + anchor),
      tr: exclude(anchor),
      l: include(vline + endBottom + blank),
      tl: include(vline + anchor),
    }),
    svg: arcs['╰'],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      r: exclude(vline + anchor),
      br: include(arcBottom),
      b: include(blank),
    }),
    svg: ends['╵'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({
      br: include(arcBottom),
      b: include(blank),
      l: true,
    }),
    svg: ends['╴'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({
      r: true,
      br: include(arcBottom),
      b: include(blank),
    }),
    svg: ends['╶'],
  },

  /* Bottom right arc */
  {
    hotspot: arcBottom,
    size: 1,
    pattern: connections({
      t: exclude(vline + anchor),
      tr: include(vline + anchor),
      r: include(vline + endBottom + blank),
      tl: exclude(anchor),
    }),
    svg: arcs['╯'],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections({
      b: include(blank),
      bl: include(arcBottom),
      l: exclude(vline + anchor),
    }),
    svg: ends['╵'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({
      r: true,
      b: include(blank),
      bl: include(arcBottom),
    }),
    svg: ends['╶'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({
      b: include(blank),
      bl: include(arcBottom),
      l: true,
    }),
    svg: ends['╴'],
  },
];
