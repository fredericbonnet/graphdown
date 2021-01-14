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
export const discBranches = {
  t: `<path d="M 5  0, 5  5"></path>`,
  b: `<path d="M 5 20, 5 15"></path>`,
  tl: `<path d="M 0 0, 2.5 5"></path>`,
  tr: `<path d="M 10 0, 7.5 5"></path>`,
  bl: `<path d="M 0 20, 2.5 15"></path>`,
  br: `<path d="M 10 20, 7.5 15"></path>`,
};
const shapes = {
  disc: `<circle cx="5" cy="10" r="5"/>`,
  ring: `<circle cx="5" cy="10" r="5" class="outline"/>`,
};

/*
 * Character patterns
 */

const discRays = [
  {
    pattern: connections({ tl: except(decorations) + include(linkTopLeft) }),
    svg: discBranches.tl,
  },
  {
    pattern: connections({ t: except(decorations) + include(linkTop) }),
    svg: discBranches.t,
  },
  {
    pattern: connections({
      tr: except(decorations) + include(linkTopRight),
    }),
    svg: discBranches.tr,
  },
  {
    pattern: connections({ r: except(decorations) + include(linkRight) }),
    svg: discBranches.r,
  },
  {
    pattern: connections({
      br: except(decorations) + include(linkBottomRight),
    }),
    svg: discBranches.br,
  },
  {
    pattern: connections({ b: except(decorations) + include(linkBottom) }),
    svg: discBranches.b,
  },
  {
    pattern: connections({ bl: except(decorations) + include(linkBottomLeft) }),
    svg: discBranches.bl,
  },
  {
    pattern: connections({ l: except(decorations) + include(linkLeft) }),
    svg: discBranches.l,
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
        svg: ends.tl + ticks['╱'],
      },
      {
        /* Top */
        pattern: connections({ ...noDirection, b: true }),
        svg: ends.t + ticks['─'],
      },
      {
        /* Top-right */
        pattern: connections({ ...noDirection, bl: true }),
        svg: ends.tr + ticks['╲'],
      },
      {
        /* Right */
        pattern: connections({ ...noDirection, l: true }),
        svg: ends.r + ticks['│'],
      },
      {
        /* Bottom-right */
        pattern: connections({ ...noDirection, tl: true }),
        svg: ends.br + ticks['╱'],
      },
      {
        /* Bottom */
        pattern: connections({ ...noDirection, t: true }),
        svg: ends.b + ticks['─'],
      },
      {
        /* Bottom-left */
        pattern: connections({ ...noDirection, tr: true }),
        svg: ends.bl + ticks['╲'],
      },
      {
        /* Left */
        pattern: connections({ ...noDirection, r: true }),
        svg: ends.l + ticks['│'],
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
