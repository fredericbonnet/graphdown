import { connections, include, exclude } from '../utils.js';
import { ends } from './ends.js';
import {
  blank,
  arcTop,
  arcBottom,
  anchor,
  vline,
  hline,
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
    pattern: connections([
      include(blank),
      include(arcTop),
      false,
      include(arcBottom),
      include(blank),
      ,
      false,
    ]),
    svg: '',
  },

  /* Right arc junctions */
  {
    hotspot: vline,
    size: 1,
    pattern: connections([
      include(blank),
      ,
      false,
      ,
      include(blank),
      include(arcBottom),
      false,
      include(arcTop),
    ]),
    svg: '',
  },

  /* Top left arc */
  {
    hotspot: arcTop,
    size: 1,
    pattern: connections([
      ,
      ,
      ,
      exclude(anchor),
      false,
      include(vline + anchor),
      include(vline + arcTop + blank),
    ]),
    svg: arcs['╭'],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections([
      include(blank),
      include(arcTop),
      exclude(vline + anchor),
    ]),
    svg: ends['╷'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([
      include(blank),
      include(arcTop),
      ,
      ,
      ,
      ,
      include(hline + anchor + arcTop + arcBottom),
    ]),
    svg: ends['╴'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([
      include(blank),
      include(arcTop),
      include(hline + vline + arcTop + arcBottom),
    ]),
    svg: ends['╶'],
  },

  /* Top right arc */
  {
    hotspot: arcTop,
    size: 1,
    pattern: connections([
      ,
      ,
      include(vline + arcTop + blank),
      include(vline + anchor),
      exclude(vline + anchor),
      exclude(anchor),
    ]),
    svg: arcs['╮'],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections([
      include(blank),
      ,
      ,
      ,
      ,
      ,
      exclude(vline + anchor),
      include(arcTop),
    ]),
    svg: ends['╷'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([
      include(blank),
      ,
      include(hline + anchor + arcTop + arcBottom),
      ,
      ,
      ,
      ,
      include(arcTop),
    ]),
    svg: ends['╶'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([
      include(blank),
      ,
      ,
      ,
      ,
      ,
      include(hline + anchor + arcTop + arcBottom),
      include(arcTop),
    ]),
    svg: ends['╴'],
  },

  /* Bottom left arc */
  {
    hotspot: arcBottom,
    size: 1,
    pattern: connections([
      exclude(vline + anchor),
      exclude(anchor),
      ,
      ,
      ,
      ,
      include(vline + arcBottom + blank),
      include(vline + anchor),
    ]),
    svg: arcs['╰'],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections([
      ,
      ,
      exclude(vline + anchor),
      include(arcBottom),
      include(blank),
    ]),
    svg: ends['╵'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([
      ,
      ,
      ,
      include(arcBottom),
      include(blank),
      ,
      include(hline + anchor + arcTop + arcBottom),
    ]),
    svg: ends['╴'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([
      ,
      ,
      include(hline + anchor + arcTop + arcBottom),
      include(arcBottom),
      include(blank),
    ]),
    svg: ends['╶'],
  },

  /* Bottom right arc */
  {
    hotspot: arcBottom,
    size: 1,
    pattern: connections([
      exclude(vline + anchor),
      include(vline + anchor),
      include(vline + arcBottom + blank),
      ,
      ,
      ,
      ,
      exclude(anchor),
    ]),
    svg: arcs['╯'],
  },
  {
    hotspot: vline,
    size: 1,
    pattern: connections([
      ,
      ,
      ,
      ,
      include(blank),
      include(arcBottom),
      exclude(vline + anchor),
    ]),
    svg: ends['╵'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([
      ,
      ,
      include(hline + anchor + arcTop + arcBottom),
      ,
      include(blank),
      include(arcBottom),
    ]),
    svg: ends['╶'],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections([
      ,
      ,
      ,
      ,
      include(blank),
      include(arcBottom),
      include(hline + anchor + arcTop + arcBottom),
    ]),
    svg: ends['╴'],
  },
];
