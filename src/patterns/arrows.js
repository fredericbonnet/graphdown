import { filledPath, path } from '../svg';
import {
  anchor,
  arrowTop,
  arrowBottom,
  arrowLeft,
  arrowRight,
  decorations,
} from '../characters.js';
import { allDirections, connections, include } from '../utils.js';
import { rays } from './rays.js';
import { ticks } from './ticks.js';

/*
 * SVG templates
 */

// prettier-ignore
const arrowShapes = {
  t:  `l  -5  10, 10  0 z`,
  b:  `l  -5 -10, 10  0 z`,
  l:  `l  10  -5,  0 10 z`,
  r:  `l -10  -5,  0 10 z`,
  tl: `l   0  12,  9 -5 z`,
  tr: `l   0  12, -9 -5 z`,
  bl: `l   0 -12,  9  5 z`,
  br: `l   0 -12, -9  5 z`,
};

// prettier-ignore
const branches = {
  t:  path([5, 10], 'l  0 -10'),
  b:  path([5, 10], 'l  0  10'),
  tr: path([5, 10], 'l  5 -10'),
  tl: path([5, 10], 'l -5 -10'),
  br: path([5, 10], 'l  5  10'),
  bl: path([5, 10], 'l -5  10'),
};
// prettier-ignore
const arrows = {
  t:  filledPath([ 5,  0], arrowShapes.t),
  b:  filledPath([ 5, 20], arrowShapes.b),
  l:  filledPath([ 0, 10], arrowShapes.l),
  r:  filledPath([10, 10], arrowShapes.r),
  tl: filledPath([ 0,  0], arrowShapes.tl),
  tr: filledPath([10,  0], arrowShapes.tr),
  bl: filledPath([ 0, 20], arrowShapes.bl),
  br: filledPath([10, 20], arrowShapes.br),
};
// prettier-ignore
const longBranches = {
  t:  path([5,  0], 'l  0  20'),
  b:  path([5, 20], 'l  0 -20'),
  r:  path([5, 10], 'l  5   0'),
  l:  path([5, 10], 'l -5   0'),
  tr: path([5, 20], 'q 0 -10,  5 -20'),
  tl: path([5, 20], 'q 0 -10, -5 -20'),
  br: path([5,  0], 'q 0  10,  5  20'),
  bl: path([5,  0], 'q 0  10, -5  20'),
};
// prettier-ignore
const anchoredArrows = {
  t: filledPath([ 5, -10], arrowShapes.t),
  b: filledPath([ 5,  30], arrowShapes.b),
  l: filledPath([-5,  10], arrowShapes.l),
  r: filledPath([15,  10], arrowShapes.r),
};
// prettier-ignore
const decoratedArrows = {
  t:  path([ 5, 20], 'l  0   -15') + filledPath([ 5  , -5], arrowShapes.t),
  b:  path([ 5,  0], 'l  0    15') + filledPath([ 5  , 25], arrowShapes.b),
  tl: path([10, 20], 'l -7.5 -15') + filledPath([-2.5, -5], arrowShapes.tl),
  tr: path([ 0, 20], 'l  7.5 -15') + filledPath([12.5, -5], arrowShapes.tr),
  bl: path([10,  0], 'l -7.5  15') + filledPath([-2.5, 25], arrowShapes.bl),
  br: path([ 0,  0], 'l  7.5  15') + filledPath([12.5, 25], arrowShapes.br),
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
    rules: rays(allDirections),
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
    rules: rays(allDirections),
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
    rules: rays(allDirections),
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
    rules: rays(allDirections),
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
