import {
  endTop,
  endBottom,
  bline,
  linkBottom,
  linkTop,
  linkTopRight,
  linkTopLeft,
} from '../characters.js';
import { wide } from '../svg.js';
import { connections, include, except } from '../utils.js';
import { lines } from './lines.js';

/*
 * SVG templates
 */
export const ends = {
  t: `<path d="M 5 10,  5 20"/>`,
  b: `<path d="M 5 10,  5  0"/>`,
  l: `<path d="M 5 10, 10 10"/>`,
  r: `<path d="M 5 10,  0 10"/>`,
  tl: `<path d="M 5 10, 10 20"/>`,
  tr: `<path d="M 5 10,  0 20"/>`,
  br: `<path d="M 5 10,  0  0"/>`,
  bl: `<path d="M 5 10, 10  0"/>`,
};
const bottomEnds = {
  l: `<path d="M  -5 20,  0 20"/>`,
  r: `<path d="M  10 20, 15 20"/>`,
  ll: `<path d="M -10 20,  0 20"/>`,
  rr: `<path d="M  10 20, 20 20"/>`,
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
