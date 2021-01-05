import { connections, include, except } from '../utils.js';
import { wide } from '../svg.js';
import {
  endTop,
  endBottom,
  anchor,
  linkLeft,
  linkRight,
  linkTopLeft,
  linkTopRight,
  linkBottomLeft,
  linkBottomRight,
} from '../characters.js';
import { rays } from './ends.js';

/*
 * SVG templates
 */
export const corners = {
  tl: `<path d="M 5 20, 5 10, 10 10"/>`,
  tr: `<path d="M 5 20, 5 10,  0 10"/>`,
  bl: `<path d="M 5  0, 5 10, 10 10"/>`,
  br: `<path d="M 5  0, 5 10,  0 10"/>`,
  t: `<path d="M 0 20, 5 10, 10 20"/>`,
  b: `<path d="M 0  0, 5 10, 10  0"/>`,
  r: `<path d="M 0  0, 5 10,  0 20"/>`,
  l: `<path d="M 10 0, 5 10, 10 20"/>`,
};

export const roundedCorners = {
  tl: `<path d="M 5 20, 5 15, Q 5 10, 10 10"/>`,
  tr: `<path d="M 5 20, 5 15, Q 5 10,  0 10"/>`,
  bl: `<path d="M 5  0, 5  5, Q 5 10, 10 10"/>`,
  br: `<path d="M 5  0, 5  5, Q 5 10,  0 10"/>`,
  t: `<path d="M 0 20, Q 5 10, 10 20"/>`,
  b: `<path d="M 0  0, Q 5 10, 10  0"/>`,
  r: `<path d="M 0  0, Q 5 10,  0 20"/>`,
  l: `<path d="M 10 0, Q 5 10, 10 20"/>`,
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
    svg: corners.tl,
  },
  {
    hotspot: '┏',
    svg: wide(corners.tl),
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: true, b: true, l: false }),
    svg: corners.tl,
    rules: rays,
  },

  /* Top */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: false, tr: false, br: true, bl: true }),
    svg: corners.t,
    rules: rays,
  },

  /* Top-right */
  {
    hotspot: '┐',
    svg: corners.tr,
  },
  {
    hotspot: '┓',
    svg: wide(corners.tr),
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: false, r: false, b: true, l: true }),
    svg: corners.tr,
    rules: rays,
  },

  /* Right */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tr: false, br: false, tl: true, bl: true }),
    svg: corners.r,
    rules: rays,
  },

  /* Bottom-right */
  {
    hotspot: '┘',
    svg: corners.br,
  },
  {
    hotspot: '┛',
    svg: wide(corners.br),
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: false, b: false, l: true }),
    svg: corners.br,
    rules: rays,
  },

  /* Bottom */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tl: true, tr: true, br: false, bl: false }),
    svg: corners.b,
    rules: rays,
  },

  /* Bottom-left */
  {
    hotspot: '└',
    svg: corners.bl,
  },
  {
    hotspot: '┗',
    svg: wide(corners.bl),
  },
  {
    hotspot: '└',
    svg: corners.bl,
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: true, r: true, b: false, l: false }),
    svg: corners.bl,
    rules: rays,
  },

  /* Left */
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ tr: true, br: true, tl: false, bl: false }),
    svg: corners.l,
    rules: rays,
  },

  /*
   * Rounded corners
   */

  /* Top-left */
  {
    hotspot: '╭',
    svg: roundedCorners.tl,
  },
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({
      r: except(endTop) + include(linkRight),
      l: false,
    }),
    svg: roundedCorners.tl,
  },

  /* Top */
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({ br: true, bl: true }),
    svg: roundedCorners.t,
  },

  /* Top-right */
  {
    hotspot: '╮',
    svg: roundedCorners.tr,
  },
  {
    hotspot: endTop,
    size: 1,
    pattern: connections({
      r: false,
      l: except(endTop) + include(linkLeft),
    }),
    svg: roundedCorners.tr,
  },

  /* Right */
  {
    hotspot: ')',
    size: 1,
    rules: [
      {
        pattern: connections({ tl: include(linkTopLeft + anchor + endTop) }),
      },
      {
        pattern: connections({
          bl: include(linkBottomLeft + anchor + endBottom),
        }),
      },
    ],
    svg: roundedCorners.r,
  },

  /* Bottom-right */
  {
    hotspot: '╯',
    svg: roundedCorners.br,
  },
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({
      r: false,
      l: except(endBottom) + include(linkLeft),
    }),
    svg: roundedCorners.br,
  },

  /* Bottom */
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({ tl: true, tr: true }),
    svg: roundedCorners.b,
  },

  /* Bottom-left */
  {
    hotspot: '╰',
    svg: roundedCorners.bl,
  },
  {
    hotspot: endBottom,
    size: 1,
    pattern: connections({
      r: except(endBottom) + include(linkRight),
      l: false,
    }),
    svg: roundedCorners.bl,
  },

  /* Left */
  {
    hotspot: '(',
    size: 1,
    rules: [
      {
        pattern: connections({ tr: include(linkTopRight + anchor + endTop) }),
      },
      {
        pattern: connections({
          br: include(linkBottomRight + anchor + endBottom),
        }),
      },
    ],
    svg: roundedCorners.l,
  },
];
