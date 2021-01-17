import { path, filledPath } from '../shapes.js';
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
 * Shapes
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
  t:  filledPath([ 5  , -5], arrowShapes.t),
  b:  filledPath([ 5  , 25], arrowShapes.b),
  tl: filledPath([-2.5, -5], arrowShapes.tl),
  tr: filledPath([12.5, -5], arrowShapes.tr),
  bl: filledPath([-2.5, 25], arrowShapes.bl),
  br: filledPath([12.5, 25], arrowShapes.br),
};

// prettier-ignore
const decoratedBranches = {
  t:  path([ 5, 20], 'l  0   -15'),
  b:  path([ 5,  0], 'l  0    15'),
  tl: path([10, 20], 'l -7.5 -15'),
  tr: path([ 0, 20], 'l  7.5 -15'),
  bl: path([10,  0], 'l -7.5  15'),
  br: path([ 0,  0], 'l  7.5  15'),
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
    shapes: [anchoredArrows.t],
    rules: [
      {
        pattern: connections({ b: true }),
        shapes: [longBranches.b],
      },
      {
        pattern: connections({ bl: true }),
        shapes: [longBranches.bl],
      },
      {
        pattern: connections({ br: true }),
        shapes: [longBranches.br],
      },
    ],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ b: include(arrowTop) }),
    shapes: [ticks['─']],
    rules: rays(allDirections),
  },

  /* Bottom */
  {
    hotspot: arrowBottom,
    size: 1,
    pattern: connections({ b: include(anchor) }),
    shapes: [anchoredArrows.b],
    rules: [
      {
        pattern: connections({ t: true }),
        shapes: [longBranches.t],
      },
      {
        pattern: connections({ tl: true }),
        shapes: [longBranches.tl],
      },
      {
        pattern: connections({ tr: true }),
        shapes: [longBranches.tr],
      },
    ],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ t: include(arrowBottom) }),
    shapes: [ticks['─']],
    rules: rays(allDirections),
  },

  /* Left */
  {
    hotspot: arrowLeft,
    size: 1,
    pattern: connections({ l: include(anchor) }),
    shapes: [anchoredArrows.l, longBranches.r],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ r: include(arrowLeft) }),
    shapes: [ticks['│']],
    rules: rays(allDirections),
  },

  /* Right */
  {
    hotspot: arrowRight,
    size: 1,
    pattern: connections({ r: include(anchor) }),
    shapes: [anchoredArrows.r, longBranches.l],
  },
  {
    hotspot: anchor,
    size: 1,
    pattern: connections({ l: include(arrowRight) }),
    shapes: [ticks['│']],
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
        shapes: [decoratedArrows.tl, decoratedBranches.tl],
      },
      {
        pattern: connections({ t: include(decorations) }),
        shapes: [decoratedArrows.t, decoratedBranches.t],
      },
      {
        pattern: connections({ tr: include(decorations) }),
        shapes: [decoratedArrows.tr, decoratedBranches.tr],
      },
    ],
  },
  {
    hotspot: arrowBottom,
    size: 1,
    rules: [
      {
        pattern: connections({ bl: include(decorations) }),
        shapes: [decoratedArrows.bl, decoratedBranches.bl],
      },
      {
        pattern: connections({ b: include(decorations) }),
        shapes: [decoratedArrows.b, decoratedBranches.b],
      },
      {
        pattern: connections({ br: include(decorations) }),
        shapes: [decoratedArrows.br, decoratedBranches.br],
      },
    ],
  },
  {
    hotspot: arrowLeft,
    size: 1,
    pattern: connections({ l: include(decorations) }),
    shapes: [arrows.l],
  },
  {
    hotspot: arrowRight,
    size: 1,
    pattern: connections({ r: include(decorations) }),
    shapes: [arrows.r],
  },

  /*
   * Arrows
   */

  /* Top */
  {
    hotspot: arrowTop,
    size: 1,
    pattern: connections({ b: true }, { br: true, bl: true }),
    shapes: [arrows.t],
    rules: [
      {
        pattern: connections({ b: true }),
        shapes: [branches.b],
      },
      {
        pattern: connections({ bl: true }),
        shapes: [branches.bl],
      },
      {
        pattern: connections({ br: true }),
        shapes: [branches.br],
      },
    ],
  },

  /* Top-left */
  {
    hotspot: arrowTop,
    size: 1,
    pattern: connections({ br: true }),
    shapes: [arrows.tl, branches.br],
  },

  /* Top-right */
  {
    hotspot: arrowTop,
    size: 1,
    pattern: connections({ bl: true }),
    shapes: [arrows.tr, branches.bl],
  },

  /* Bottom */
  {
    hotspot: arrowBottom,
    size: 1,
    pattern: connections({ t: true }, { tr: true, tl: true }),
    shapes: [arrows.b],
    rules: [
      {
        pattern: connections({ t: true }),
        shapes: [branches.t],
      },
      {
        pattern: connections({ tl: true }),
        shapes: [branches.tl],
      },
      {
        pattern: connections({ tr: true }),
        shapes: [branches.tr],
      },
    ],
  },

  /* Bottom-left */
  {
    hotspot: arrowBottom,
    size: 1,
    pattern: connections({ tr: true }),
    shapes: [arrows.bl, branches.tr],
  },

  /* Bottom-right */
  {
    hotspot: arrowBottom,
    size: 1,
    pattern: connections({ tl: true }),
    shapes: [arrows.br, branches.tl],
  },

  /* Left */
  {
    hotspot: arrowLeft,
    size: 1,
    pattern: connections({ r: true }),
    shapes: [arrows.l],
  },

  /* Right */
  {
    hotspot: arrowRight,
    size: 1,
    pattern: connections({ l: true }),
    shapes: [arrows.r],
  },
];
