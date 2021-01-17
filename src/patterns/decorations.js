import { circle, filledCircle } from '../svg.js';
import { segment } from '../shapes.js';
import {
  anchor,
  arrowBottom,
  arrowLeft,
  arrowRight,
  arrowTop,
  disc,
  ring,
  decorations,
  linkBottom,
  linkBottomLeft,
  linkBottomRight,
  linkLeft,
  linkRight,
  linkTop,
  linkTopLeft,
  linkTopRight,
} from '../characters.js';
import { connections, include, except, noDirection } from '../utils.js';
import { ticks } from './ticks.js';
import { ends } from './ends.js';

/*
 * SVG templates
 */

const shapes = {
  disc: filledCircle([5, 10], 5),
  ring: circle([5, 10], 5),
};

/*
 * Shapes
 */

// prettier-ignore
export const discBranches = {
  t:  segment({from: [ 5,  0], to: [5  ,  5]}),
  b:  segment({from: [ 5, 20], to: [5  , 15]}),
  tl: segment({from: [ 0,  0], to: [2.5,  5]}),
  tr: segment({from: [10,  0], to: [7.5,  5]}),
  bl: segment({from: [ 0, 20], to: [2.5, 15]}),
  br: segment({from: [10, 20], to: [7.5, 15]}),
};

/*
 * Character patterns
 */

const discRays = [
  {
    pattern: connections({ tl: except(decorations) + include(linkTopLeft) }),
    shapes: [discBranches.tl],
  },
  {
    pattern: connections({ t: except(decorations) + include(linkTop) }),
    shapes: [discBranches.t],
  },
  {
    pattern: connections({
      tr: except(decorations) + include(linkTopRight),
    }),
    shapes: [discBranches.tr],
  },
  {
    pattern: connections({ r: except(decorations) + include(linkRight) }),
    shapes: [discBranches.r],
  },
  {
    pattern: connections({
      br: except(decorations) + include(linkBottomRight),
    }),
    shapes: [discBranches.br],
  },
  {
    pattern: connections({ b: except(decorations) + include(linkBottom) }),
    shapes: [discBranches.b],
  },
  {
    pattern: connections({ bl: except(decorations) + include(linkBottomLeft) }),
    shapes: [discBranches.bl],
  },
  {
    pattern: connections({ l: except(decorations) + include(linkLeft) }),
    shapes: [discBranches.l],
  },
];

const discArrows = [
  {
    pattern: connections(
      { tl: include(arrowBottom) },
      { t: include(arrowBottom) },
      { tr: include(arrowBottom) },
      { r: include(arrowLeft) },
      { br: include(arrowTop) },
      { b: include(arrowTop) },
      { bl: include(arrowTop) },
      { l: include(arrowRight) }
    ),
  },
];
const discRules = [...discRays, ...discArrows];

export default [
  /*
   * Terminal tick
   */

  {
    hotspot: anchor,
    size: 1,
    rules: [
      {
        /* Top-left */
        pattern: connections({ ...noDirection, br: true }),
        shapes: [ends.tl, ticks['╱']],
      },
      {
        /* Top */
        pattern: connections({ ...noDirection, b: true }),
        shapes: [ends.t, ticks['─']],
      },
      {
        /* Top-right */
        pattern: connections({ ...noDirection, bl: true }),
        shapes: [ends.tr, ticks['╲']],
      },
      {
        /* Right */
        pattern: connections({ ...noDirection, l: true }),
        shapes: [ends.r, ticks['│']],
      },
      {
        /* Bottom-right */
        pattern: connections({ ...noDirection, tl: true }),
        shapes: [ends.br, ticks['╱']],
      },
      {
        /* Bottom */
        pattern: connections({ ...noDirection, t: true }),
        shapes: [ends.b, ticks['─']],
      },
      {
        /* Bottom-left */
        pattern: connections({ ...noDirection, tr: true }),
        shapes: [ends.bl, ticks['╲']],
      },
      {
        /* Left */
        pattern: connections({ ...noDirection, r: true }),
        shapes: [ends.l, ticks['│']],
      },
    ],
  },

  /*
   * Disc
   */
  {
    hotspot: disc,
    size: 1,
    svg: shapes.disc,
    rules: discRules,
  },

  /*
   * Ring
   */
  {
    hotspot: ring,
    size: 1,
    svg: shapes.ring,
    rules: discRules,
  },
];
