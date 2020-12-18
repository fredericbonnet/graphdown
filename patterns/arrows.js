import {
  anchor,
  arrowTop,
  arrowBottom,
  arrowLeft,
  arrowRight,
} from '../characters.js';
import { connections, include } from '../utils.js';
import { lines } from './lines.js';

/*
 * SVG templates
 */
const branches = {
  t: `<path d="M 5 10,  5  0"/>`,
  b: `<path d="M 5 10,  5 20"/>`,
  tr: `<path d="M 5 10, 10  0"/>`,
  tl: `<path d="M 5 10,  0  0"/>`,
  br: `<path d="M 5 10, 10 20"/>`,
  bl: `<path d="M 5 10,  0 20"/>`,
};
const arrows = {
  t: `<polygon points=" 5  0,  0 10, 10 10"/>`,
  b: `<polygon points=" 5 20,  0 10, 10 10"/>`,
  l: `<polygon points=" 0 10, 10  5, 10 15"/>`,
  r: `<polygon points="10 10,  0  5,  0 15"/>`,
  tl: `<polygon points=" 0  0,  0 12,  9  7"/>`,
  tr: `<polygon points="10  0, 10 12,  1  7"/>`,
  bl: `<polygon points=" 0 20,  0  8,  9 13"/>`,
  br: `<polygon points="10 20, 10  8,  1 13"/>`,
};
const longBranches = {
  t: `<path d="M 5  0, 5 20"/>`,
  b: `<path d="M 5 20, 5  0"/>`,
  r: `<path d="M 5 10, 10 10"/>`,
  l: `<path d="M 5 10,  0 10"/>`,
  tr: `<path d="M 5 20, Q 5 10, 10  0"/>`,
  tl: `<path d="M 5 20, Q 5 10,  0  0"/>`,
  br: `<path d="M 5  0, Q 5 10, 10 20"/>`,
  bl: `<path d="M 5  0, Q 5 10,  0 20"/>`,
};
const connectedArrows = {
  t: `<polygon points=" 5 -10,  0  0, 10  0"/>`,
  b: `<polygon points=" 5  30,  0 20, 10 20"/>`,
  l: `<polygon points="-5  10,  5  5,  5 15"/>`,
  r: `<polygon points="15  10,  5  5,  5 15"/>`,
};

/*
 * Character patterns
 */
export default [
  /*
   * Connected arrows
   */
  {
    hotspot: arrowTop,
    size: 1,
    pattern: connections({ t: include(anchor) }),
    svg: connectedArrows.t,
    rules: [
      {
        pattern: connections({ b: true }),
        svg: longBranches.b,
      },
      {
        pattern: connections({ bl: true }),
        svg: longBranches.bl,
      },
      {
        pattern: connections({ br: true }),
        svg: longBranches.br,
      },
    ],
  },
  {
    hotspot: anchor,
    pattern: connections({ b: include(arrowTop) }),
    svg: lines['─'],
  },

  /* Bottom */
  {
    hotspot: arrowBottom,
    size: 1,
    pattern: connections({ b: include(anchor) }),
    svg: connectedArrows.b,
    rules: [
      {
        pattern: connections({ t: true }),
        svg: longBranches.t,
      },
      {
        pattern: connections({ tl: true }),
        svg: longBranches.tl,
      },
      {
        pattern: connections({ tr: true }),
        svg: longBranches.tr,
      },
    ],
  },
  {
    hotspot: anchor,
    pattern: connections({ t: include(arrowBottom) }),
    svg: lines['─'],
  },

  /* Left */
  {
    hotspot: arrowLeft,
    size: 1,
    pattern: connections({ l: include(anchor) }),
    svg: connectedArrows.l + longBranches.r,
  },
  {
    hotspot: anchor,
    pattern: connections({ r: include(arrowLeft) }),
    svg: lines['│'],
  },

  /* Right */
  {
    hotspot: arrowRight,
    size: 1,
    pattern: connections({ r: include(anchor) }),
    svg: connectedArrows.r + longBranches.l,
  },
  {
    hotspot: anchor,
    pattern: connections({ l: include(arrowRight) }),
    svg: lines['│'],
  },

  /*
   * Arrows
   */

  /* Top */
  {
    hotspot: arrowTop,
    size: 1,
    pattern: connections({ b: true }, { br: true, bl: true }),
    svg: arrows.t,
    rules: [
      {
        pattern: connections({ b: true }),
        svg: branches.b,
      },
      {
        pattern: connections({ bl: true }),
        svg: branches.bl,
      },
      {
        pattern: connections({ br: true }),
        svg: branches.br,
      },
    ],
  },

  /* Top-left */
  {
    hotspot: arrowTop,
    size: 1,
    pattern: connections({ br: true }),
    svg: arrows.tl + branches.br,
  },

  /* Top-right */
  {
    hotspot: arrowTop,
    size: 1,
    pattern: connections({ bl: true }),
    svg: arrows.tr + branches.bl,
  },

  /* Bottom */
  {
    hotspot: arrowBottom,
    size: 1,
    pattern: connections({ t: true }, { tr: true, tl: true }),
    svg: arrows.b,
    rules: [
      {
        pattern: connections({ t: true }),
        svg: branches.t,
      },
      {
        pattern: connections({ tl: true }),
        svg: branches.tl,
      },
      {
        pattern: connections({ tr: true }),
        svg: branches.tr,
      },
    ],
  },

  /* Bottom-left */
  {
    hotspot: arrowBottom,
    size: 1,
    pattern: connections({ tr: true }),
    svg: arrows.bl + branches.tr,
  },

  /* Bottom-right */
  {
    hotspot: arrowBottom,
    size: 1,
    pattern: connections({ tl: true }),
    svg: arrows.br + branches.tl,
  },

  /* Left */
  {
    hotspot: arrowLeft,
    size: 1,
    pattern: connections({ r: true }),
    svg: arrows.l,
  },

  /* Right */
  {
    hotspot: arrowRight,
    size: 1,
    pattern: connections({ l: true }),
    svg: arrows.r,
  },
];
