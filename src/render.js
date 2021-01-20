// @ts-check
import { regexpEscape } from './utils.js';
import { patterns } from './patterns.js';
import { blockRE } from './characters.js';
import { defaultStyle } from './default-style.js';
import { Segment, SegmentList } from './shapes.js';

/**
 * Escape special HTML chars
 *
 * @param {string} data Text data to escape
 */
function htmlEscape(data) {
  return data
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Set of distinct hotspot characters from all patterns */
const hotspotCharacters = [
  ...new Set(patterns.map((pattern) => pattern.hotspot)),
];

/** RegExp matching any hotspot character */
const hotspotsRE = charactersToRegExp(hotspotCharacters);

/**
 * @typedef {Object} Pattern
 * @property {string} hotspot
 * @property {number} [size]
 * @property {boolean[][]} [mask]
 * @property {RegExp} [pattern]
 * @property {string} [svg]
 * @property {Shape[]} [shapes]
 * @property {PatternRule[]} [rules]
 */
/**
 * @typedef {Object} PatternRule
 * @property {RegExp} pattern
 * @property {string} [svg]
 * @property {Shape[]} [shapes]
 */
/**
 * @typedef { string | (([x,y]:[number,number])=>string) | Segment } Shape
 */

/** Map of patterns per hotspot character
 * @type {Map<string, Pattern[]>}
 */
const patternsPerHotspot = patterns.reduce((acc, pattern) => {
  const { hotspot } = pattern;
  let patterns = [...(acc.get(hotspot) || []), pattern];
  acc.set(hotspot, patterns);
  return acc;
}, new Map());

/**
 * Render options
 * @typedef {Object} RenderOptions
 * @property {(string|boolean)} [style] Inline style; true = use default style; false or default = no style
 * @property {number} [width] Width (characters); negative or default = adapt to widest line
 * @property {number} [minWidth] Minimum width (characters); negative or default = no minimum
 */

/**
 * Render GraphDown string
 *
 * @param {string} data Source text
 * @param {RenderOptions} [options] Options
 *
 * @return SVG code
 */
export function renderGraphdown(data, options = {}) {
  /** Global erasure mask */
  const globalMask = [];

  /** Mergeable segments */
  const segments = new SegmentList();

  /** Generated SVGs */
  const globalSvgs = [];

  // Split source text into lines and blocks
  const { lines, blocks } = extractBlocks(data);

  // Compute output size
  const width = Math.max(
    options.minWidth || 0,
    ...(options.width > 0 ? [options.width] : lines.map((line) => line.length))
  );
  const height = lines.length;

  // Apply patterns to non-block text
  const matches = findMatchingPatterns(lines, hotspotsRE, patternsPerHotspot);
  for (let match of matches) {
    const { row, column, mask, size, svgs, shapes } = match;

    if (!mask) {
      // Erase hotspot
      addMask(globalMask, [[true]], row, column);
    } else {
      // Apply pattern erasure mask
      addMask(globalMask, mask, row - size, column - size);
    }

    // Add pattern SVGs
    const x = column * 10;
    const y = row * 20;
    if (svgs && svgs.length) {
      const code = svgs.join('');
      if (code) {
        globalSvgs.push(`<g transform="translate(${x} ${y})">${code}</g>`);
      }
    }

    // Add pattern shapes
    if (shapes && shapes.length) {
      for (let shape of shapes) {
        if (shape instanceof Segment) {
          // Mergeable segment
          segments.add(shape.offset([x, y]));
        } else if (shape) {
          // Render shape
          globalSvgs.push(
            typeof shape === 'function'
              ? shape([x, y])
              : `<g transform="translate(${x} ${y})">${shape}</g>`
          );
        }
      }
    }
  }

  // Render merged segments
  for (let segment of segments.segments) {
    globalSvgs.push(segment.render([0, 0]));
  }

  // Apply erasure mask to text
  const rawText = applyMask(lines, globalMask);

  const styleBlock = options.style
    ? `\n<style>\n${
        typeof options.style === 'string' ? options.style : defaultStyle
      }\n</style>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" class="graphdown" viewBox="0 0 ${
    width * 10
  } ${height * 20}">${styleBlock}\n${[
    ...renderTextLines(rawText),
    ...renderBlocks(blocks),
    ...globalSvgs,
  ].join('\n')}</svg>`;
}

/**
 * Render text lines
 *
 * @param {string[]} lines Text lines
 *
 * @return SVG code
 */
const renderTextLines = (lines) =>
  lines.map((line, row) => renderTextLine(line, row, 0));

/**
 * Render text line
 *
 * @param {*} line Text line
 * @param {*} row Row
 * @param {*} column Column of first character
 *
 * @return SVG code
 */
const renderTextLine = (line, row, column) =>
  line.trim().length
    ? `<text x="${column * 10}" y="${(row + 1) * 20 - 5}" textLength="${
        line.length * 10
      }">${htmlEscape(line)}</text>`
    : '';

/**
 * Render text blocks
 *
 * @param {*} blocks Blocks to render
 *
 * @return SVG code
 */
const renderBlocks = (blocks) => blocks.map(renderBlock);

/**
 * Render text block
 *
 * @return SVG code
 */
const renderBlock = ({ row, column, width, height, lines }) =>
  `<foreignObject x="${column * 10}" y="${row * 20}" width="${
    width * 10
  }" height="${height * 20}"><div class="block">${renderBlockContent(
    lines
  )}</div></foreignObject>`;

/**
 * Render text block content
 *
 * @param {string[]} lines Text lines
 *
 * @return HTML code
 */
const renderBlockContent = (lines) =>
  `<div>${htmlEscape(
    lines.map((line) => line.substring(1, line.length - 1)).join('\n')
  )}</div>`;

/**
 *
 * @typedef {Object} MatchedPattern
 * @property {number} row Row position of hotspot character
 * @property {number} column Column position of hotspot character
 * @property {number} [size] Pattern size
 * @property {boolean[][]} [mask] Mask
 * @property {string[]} [svgs] SVGs
 * @property {Shape[]} [shapes] Shapes
 */

/**
 * Find all matching patterns with locations
 *
 * @param {string[]} lines Lines of text to match
 * @param {RegExp} hotspotsRE RegExp matching hotspot characters
 * @param {Map<string, Pattern[]>} patternsPerHotspot Map of patterns to match per hotspot character
 */
function findMatchingPatterns(lines, hotspotsRE, patternsPerHotspot) {
  /** @type {MatchedPattern[]} */
  let results = [];

  // Try to find hotspots in text, row by row
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    // @ts-ignore
    const matches = line.matchAll(hotspotsRE);
    if (!matches) continue;

    // Iterate over all the row's hotspots
    for (let match of matches) {
      const { 0: hotspot, index: column } = match;

      // Add all matching patterns
      const patterns = patternsPerHotspot.get(hotspot);
      results.push(...getMatchingPatterns(lines, row, column, patterns));
    }
  }
  return results;
}

/**
 * Find all matching patterns at a given location
 *
 * @param {string[]} lines Lines of text to match
 * @param {number} row Row position of hotspot character
 * @param {number} column Column position of hotspot character
 * @param {Pattern[]} patterns Patterns to match for hotspot
 */
function getMatchingPatterns(lines, row, column, patterns) {
  /** @type {MatchedPattern[]} */
  const results = [];
  /** @type {string[]} */
  const blocks = [];

  // Try to find a matching pattern
  for (let pattern of patterns) {
    if (!pattern.pattern && !pattern.rules) {
      // Simple case: no pattern, no rules, simple hotspot matching rule
      results.push({
        row,
        column,
        ...pattern,
        svgs: [pattern.svg],
        shapes: pattern.shapes,
      });
      break;
    }

    // Extract a block around the hotspot and compare with pattern/rules
    if (!blocks[pattern.size]) {
      blocks[pattern.size] = getBlock(lines, row, column, pattern.size);
    }
    const block = blocks[pattern.size];

    if (pattern.pattern) {
      // Must match pattern
      if (!block.match(pattern.pattern)) continue;

      // Add main SVG
      /** @type {string[]} */
      let svgs = [];
      /** @type {Shape[]} */
      let shapes = [];
      if (pattern.svg) svgs.push(pattern.svg);
      if (pattern.shapes) shapes.push(...pattern.shapes);

      if (pattern.rules) {
        // Apply extra rules
        for (let rule of pattern.rules) {
          if (block.match(rule.pattern)) {
            if (rule.svg) svgs.push(rule.svg);
            if (rule.shapes) shapes.push(...rule.shapes);
          }
        }
      }

      // Add to results
      results.push({ row, column, ...pattern, svgs, shapes });
      break;
    } else if (pattern.rules) {
      // No pattern, must match at least one rule
      /** @type {string[]} */
      let svgs = [];
      /** @type {Shape[]} */
      let shapes = [];

      let match = false;
      for (let rule of pattern.rules) {
        if (block.match(rule.pattern)) {
          match = true;
          if (rule.svg) svgs.push(rule.svg);
          if (rule.shapes) shapes.push(...rule.shapes);
        }
      }
      if (!match) continue;

      // At least one rule matched
      if (pattern.svg) svgs.push(pattern.svg);
      if (pattern.shapes) shapes.push(...pattern.shapes);
      results.push({ row, column, ...pattern, svgs, shapes });
      break;
    }
  }
  return results;
}

/**
 * Split string into lines
 *
 * @param {string} data Text to split into lines
 */
export function splitLines(data) {
  return data.split(/\r?\n/);
}

/**
 * Encode spiral coordinates for a square block
 *
 * @param {number} size Size of square block to encode
 *
 * @return {[number,number][]} Coordinates in [column, row] format
 */
export function makeSpiral(size) {
  /** @type {[number,number][]} */
  const result = [[0, 0]];
  let column = 0,
    row = -1;
  for (let s = 1; s <= size; s++) {
    for (; column < s; column++) {
      result.push([column, row]);
    }
    for (; row < s; row++) {
      result.push([column, row]);
    }
    for (; column > -s; column--) {
      result.push([column, row]);
    }
    for (; row >= -s; row--) {
      result.push([column, row]);
    }
  }
  return result;
}

/**
 * Get square block of characters centered around (row, column)
 *
 * The block is encoded as a single string that follows a clockwise spiral path
 * around the center starting at top.
 *
 *  For example:
 *
 *     0 1 2 3 4
 *
 *  0  O 9 A B C
 *  1  N 8 1 2 D
 *  2  M 7 0 3 E
 *  3  L 6 5 4 F
 *  4  K J I H G
 *
 * The block of size 1 centered at (2, 2) is '012345678'
 *
 * @param {string[]} lines Source lines
 * @param {number} row Row position of center character
 * @param {number} column Column position of center character
 * @param {number} size Size of square = Chebyshev distance from center (king moves)
 *
 * @return {string} Spiral string around the center
 *
 * @see makeSpiral
 */
export function getBlock(lines, row, column, size) {
  const chars = [];
  for (let [c, r] of makeSpiral(size)) {
    const line = lines[row + r];
    chars.push(line ? line[column + c] || ' ' : ' ');
  }
  return chars.join('');
}

/**
 * Check that a block of lines matches a block of patterns
 *
 * @param {string[]} lines Strings to match
 * @param {(RegExp|string)[]} patterns Regexps to apply to each line
 */
export function matchAll(lines, patterns) {
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (!line.match(patterns[index])) return false;
  }
  return true;
}

/**
 * Add binary masks
 *
 * @param {boolean[][]} source Source mask
 * @param {boolean[][]} destination Destination mask (modified in-place)
 * @param {number} row Destination row
 * @param {number} column Destination column
 */
export function addMask(destination, source, row, column) {
  for (
    let sourceRow = 0, destinationRow = row;
    sourceRow < source.length;
    sourceRow++, destinationRow++
  ) {
    if (!destination[destinationRow]) destination[destinationRow] = [];
    const sourceLine = source[sourceRow];
    const destinationLine = destination[destinationRow];
    for (
      let sourceColumn = 0, destinationColumn = column;
      sourceColumn < sourceLine.length;
      sourceColumn++, destinationColumn++
    ) {
      destinationLine[destinationColumn] =
        !!sourceLine[sourceColumn] || !!destinationLine[destinationColumn];
    }
  }
  return destination;
}

/**
 * Build a RegExp from a list of characters to match
 *
 * @param {string[]} characters Array of characters
 */
export function charactersToRegExp(characters) {
  if (characters.length == 0) return null;
  return new RegExp(`[${characters.map(regexpEscape).join('')}]`, 'g');
}

/**
 * Erase (= replace by space) masked characters, i.e. those whose matching mask
 * value is true
 *
 * @param {string[]} lines String
 * @param {boolean[][]} mask Mask to apply
 */
export function applyMask(lines, mask) {
  let result = [];
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    const lineMask = mask[row];
    let maskedLine;
    if (!lineMask) {
      maskedLine = line;
    } else {
      maskedLine = '';
      for (let column = 0; column < line.length; column++) {
        maskedLine = maskedLine + (lineMask[column] ? ' ' : line[column]);
      }
    }
    result[row] = maskedLine;
  }
  return result;
}

/**
 * Extract text blocks
 *
 * @param {string} data Source text
 *
 * @return {{lines: string[], blocks: object[]}} Lines and blocks
 */
export function extractBlocks(data) {
  // Detect block lines
  let lines = splitLines(data);
  const blockLines = [];
  for (let row = 0; row < lines.length; row++) {
    let line = lines[row];
    // @ts-ignore
    const matches = line.matchAll(blockRE);
    if (!matches) continue;

    for (let match of matches) {
      const { 0: text, index: column } = match;

      // Remove block content from line
      line =
        line.substr(0, column) +
        ' '.repeat(text.length) +
        line.substr(column + text.length);

      // Add block line
      blockLines.push({
        row,
        column,
        width: text.length,
        height: 1,
        lines: [text],
      });
    }
    lines[row] = line;
  }

  // Merge multiline blocks, i.e. consecutive blocks with same column and width
  const canMerge = (previous, next) =>
    previous.column === next.column &&
    previous.width === next.width &&
    previous.row + previous.height === next.row;
  let blocks = [];
  let previousBlock;
  // Iterate column by column to find mergeable block lines
  for (let blockLine of blockLines.sort(
    (a, b) => a.column - b.column || a.row - b.row
  )) {
    if (!previousBlock) {
      previousBlock = blockLine;
      continue;
    }

    if (canMerge(previousBlock, blockLine)) {
      // Merge current line into previous block
      previousBlock.height += blockLine.height;
      previousBlock.lines.push(...blockLine.lines);
      continue;
    }

    // Add completed block
    blocks.push(previousBlock);
    previousBlock = blockLine;
  }
  if (previousBlock) blocks.push(previousBlock);

  // Ensure that blocks are in reading order (top-down, left-right)
  blocks = blocks.sort((a, b) => a.row - b.row || a.column - b.column);
  return { lines, blocks };
}
