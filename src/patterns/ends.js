import {
  endTop,
  endBottom,
  bline,
  linkBottom,
  linkTop,
  linkTopRight,
  linkTopLeft,
} from '../characters.js';
import { wide, path } from '../svg.js';
import { connections, include, except } from '../utils.js';
import { lines } from './lines.js';

/*
 * SVG templates
 */

// prettier-ignore
export const ends = {
  t:  path([5, 10], 'l  0  10'),
  b:  path([5, 10], 'l  0 -10'),
  l:  path([5, 10], 'l  5  0'),
  r:  path([5, 10], 'l -5  0'),
  tl: path([5, 10], 'l  5  10'),
  tr: path([5, 10], 'l -5  10'),
  br: path([5, 10], 'l -5 -10'),
  bl: path([5, 10], 'l  5 -10'),
};

// prettier-ignore
const bottomEnds = {
  l:  path([0,  20], 'l  -5 0'),
  r:  path([10, 20], 'l   5 0'),
  ll: path([0,  20], 'l -10 0'),
  rr: path([10, 20], 'l  10 0'),
};

/*
 * Character patterns
 */
export default [
  /*
   * Open ends
   */

  /* Top-left */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ br: true }),
    svg: ends.tl,
  },

  /* Top */
  {
    hotspot: '╻',
    svg: wide(ends.t),
  },
  {
    hotspot: '╷',
    svg: ends.t,
  },
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ b: true }),
    svg: ends.t,
  },

  /* Top-right */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ bl: true }),
    svg: ends.tr,
  },

  /* Right */
  {
    hotspot: '╸',
    svg: wide(ends.r),
  },
  {
    hotspot: '╴',
    svg: ends.r,
  },

  /* Bottom-right */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ tl: true }),
    svg: ends.br,
  },

  /* Bottom */
  {
    hotspot: '╹',
    svg: wide(ends.b),
  },
  {
    hotspot: '╵',
    svg: ends.b,
  },
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ t: true }),
    svg: ends.b,
  },

  /* Bottom-left */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ tr: true }),
    svg: ends.bl,
  },

  /* Left */
  {
    hotspot: '╺',
    svg: wide(ends.l),
  },
  {
    hotspot: '╶',
    svg: ends.l,
  },

  /* Bottom line */
  {
    hotspot: bline,
    size: 1,
    svg: lines['_'],
    rules: [
      {
        pattern: connections(
          { l: except(endTop) + include(linkTop) },
          { bl: except(endBottom) + include(linkBottom) }
        ),
        svg: bottomEnds.l,
      },
      {
        pattern: connections(
          { r: except(endTop) + include(linkTop) },
          { br: except(endBottom) + include(linkBottom) }
        ),
        svg: bottomEnds.r,
      },
      {
        pattern: connections({ l: include(linkTopRight) }),
        svg: bottomEnds.ll,
      },
      {
        pattern: connections({ r: include(linkTopLeft) }),
        svg: bottomEnds.rr,
      },
    ],
  },
];
