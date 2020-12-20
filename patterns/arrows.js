import {
  anchor,
  arrowTop,
  arrowBottom,
  arrowLeft,
  arrowRight,
  decorations,
} from '../characters.js';
import { connections, include } from '../utils.js';
import { rays } from './ends.js';
import { ticks } from './ticks.js';

/*
 * SVG templates
 */

const arrowShapes = {
  t: `l  -5  10, 10  0 z`,
  b: `l  -5 -10, 10  0 z`,
  l: `l  10  -5,  0 10 z`,
  r: `l -10  -5,  0 10 z`,
  tl: `l 0  12, 9 -5 z`,
  tr: `l 0  12,-9 -5 z`,
  bl: `l 0 -12, 9  5 z`,
  br: `l 0 -12,-9  5 z`,
};

const branches = {
  t: `<path d="M 5 10,  5  0"/>`,
  b: `<path d="M 5 10,  5 20"/>`,
  tr: `<path d="M 5 10, 10  0"/>`,
  tl: `<path d="M 5 10,  0  0"/>`,
  br: `<path d="M 5 10, 10 20"/>`,
  bl: `<path d="M 5 10,  0 20"/>`,
};
const arrows = {
  t: `<path d="M  5  0, ${arrowShapes.t}" class="filled"/>`,
  b: `<path d="M  5 20, ${arrowShapes.b}" class="filled"/>`,
  l: `<path d="M  0 10, ${arrowShapes.l}" class="filled"/>`,
  r: `<path d="M 10 10, ${arrowShapes.r}" class="filled"/>`,
  tl: `<path d="M  0  0, ${arrowShapes.tl}" class="filled"/>`,
  tr: `<path d="M 10  0, ${arrowShapes.tr}" class="filled"/>`,
  bl: `<path d="M  0 20, ${arrowShapes.bl}" class="filled"/>`,
  br: `<path d="M 10 20, ${arrowShapes.br}" class="filled"/>`,
};
const longBranches = {
  t: `<path d="M 5  0,  5 20"/>`,
  b: `<path d="M 5 20,  5  0"/>`,
  r: `<path d="M 5 10, 10 10"/>`,
  l: `<path d="M 5 10,  0 10"/>`,
  tr: `<path d="M 5 20, Q 5 10, 10  0"/>`,
  tl: `<path d="M 5 20, Q 5 10,  0  0"/>`,
  br: `<path d="M 5  0, Q 5 10, 10 20"/>`,
  bl: `<path d="M 5  0, Q 5 10,  0 20"/>`,
};
const anchoredArrows = {
  t: `<path d="M  5 -10, ${arrowShapes.t}" class="filled"/>`,
  b: `<path d="M  5  30, ${arrowShapes.b}" class="filled"/>`,
  l: `<path d="M -5  10, ${arrowShapes.l}" class="filled"/>`,
  r: `<path d="M 15  10, ${arrowShapes.r}" class="filled"/>`,
};
const decoratedArrows = {
  t: `<path d="M 5 20, 5  5"/><path d="M 5 -5, ${arrowShapes.t}" class="filled"/>`,
  b: `<path d="M 5  0, 5 15"/><path d="M 5 25, ${arrowShapes.b}" class="filled"/>`,
  tl: `<path d="M 10 20, 2.5  5"/><path d="M -2.5 -5, ${arrowShapes.tl}" class="filled"/>`,
  tr: `<path d="M  0 20, 7.5  5"/><path d="M 12.5 -5, ${arrowShapes.tr}" class="filled"/>`,
  bl: `<path d="M 10  0, 2.5 15"/><path d="M -2.5 25, ${arrowShapes.bl}" class="filled"/>`,
  br: `<path d="M  0  0, 7.5 15"/><path d="M 12.5 25, ${arrowShapes.br}" class="filled"/>`,
};

/*
 * Character patterns
 */
export default [
  /*
   * Anchored arrows
   */
  {
    hotspot: arrowTop,
    size: 1,
    pattern: connections({ t: include(anchor) }),
    svg: anchoredArrows.t,
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
    svg: ticks['─'],
    rules: rays,
  },

  /* Bottom */
  {
    hotspot: arrowBottom,
    size: 1,
    pattern: connections({ b: include(anchor) }),
    svg: anchoredArrows.b,
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
    svg: ticks['─'],
    rules: rays,
  },

  /* Left */
  {
    hotspot: arrowLeft,
    size: 1,
    pattern: connections({ l: include(anchor) }),
    svg: anchoredArrows.l + longBranches.r,
  },
  {
    hotspot: anchor,
    pattern: connections({ r: include(arrowLeft) }),
    svg: ticks['│'],
    rules: rays,
  },

  /* Right */
  {
    hotspot: arrowRight,
    size: 1,
    pattern: connections({ r: include(anchor) }),
    svg: anchoredArrows.r + longBranches.l,
  },
  {
    hotspot: anchor,
    pattern: connections({ l: include(arrowRight) }),
    svg: ticks['│'],
    rules: rays,
  },

  /*
   * Decorated arrows
   */

  {
    hotspot: arrowTop,
    size: 1,
    rules: [
      {
        pattern: connections({ tl: include(decorations) }),
        svg: decoratedArrows.tl,
      },
      {
        pattern: connections({ t: include(decorations) }),
        svg: decoratedArrows.t,
      },
      {
        pattern: connections({ tr: include(decorations) }),
        svg: decoratedArrows.tr,
      },
    ],
  },
  {
    hotspot: arrowBottom,
    size: 1,
    rules: [
      {
        pattern: connections({ bl: include(decorations) }),
        svg: decoratedArrows.bl,
      },
      {
        pattern: connections({ b: include(decorations) }),
        svg: decoratedArrows.b,
      },
      {
        pattern: connections({ br: include(decorations) }),
        svg: decoratedArrows.br,
      },
    ],
  },
  {
    hotspot: arrowLeft,
    size: 1,
    pattern: connections({ l: include(decorations) }),
    svg: arrows.l,
  },
  {
    hotspot: arrowRight,
    size: 1,
    pattern: connections({ r: include(decorations) }),
    svg: arrows.r,
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
