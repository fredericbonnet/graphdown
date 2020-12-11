// @ts-check
import { patterns } from './patterns.js';

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

/** Map of patterns per hotspot character */
const patternsPerHotspot = patterns.reduce((acc, pattern) => {
  const { hotspot } = pattern;
  let patterns = [...(acc.get(hotspot) || []), pattern];
  acc.set(hotspot, patterns);
  return acc;
}, new Map());

/**
 * Render GraphDown string
 *
 * @param {string} data Source text
 */
export function renderGraphdown(data) {
  /** Global erasure mask */
  const globalMask = [];

  /** Generated SVG */
  const svgs = [];

  const lines = splitLines(data);
  // Dynamic width
  // const width = Math.max(...lines.map((line) => line.length));
  // Fixed width
  const width = 80;
  const height = lines.length;

  const matches = findMatchingPatterns(lines, hotspotsRE, patternsPerHotspot);
  for (let match of matches) {
    const {
      row,
      column,
      pattern: { mask, size, svg },
    } = match;

    // Apply pattern erasure mask
    addMask(globalMask, mask, row - size, column - size);

    // Add pattern SVG
    const x = column * 10;
    const y = row * 20;
    svgs.push(`<g transform="translate(${x} ${y})">${svg}</g>`);
  }

  // Apply erasure mask to text
  const rawText = applyMask(lines, globalMask);

  // Add masked text as SVG
  const texts = rawText.map(
    (text, row) =>
      `<text x="0" y="${(row + 1) * 20 - 5}" textLength="${
        text.length * 10
      }">${htmlEscape(text)}</text>`
  );

  return `<svg class="graphdown" viewBox="0 0 ${width * 10} ${height * 20}">${[
    ...texts,
    ...svgs,
  ].join('\n')}</svg>`;
}

/**
 * Find all matching patterns with locations
 *
 * @param {string[]} lines Lines of text to match
 * @param {RegExp} hotspotsRE RegExp matching hotspot characters
 * @param {*} patternsPerHotspot Map of patterns to match per hotspot character
 */
function findMatchingPatterns(lines, hotspotsRE, patternsPerHotspot) {
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

      // Try to find a matching pattern
      const patterns = patternsPerHotspot.get(hotspot);
      const blocks = [];
      for (let pattern of patterns) {
        // Extract a block around the hotspot and compare with pattern
        if (!blocks[pattern.size]) {
          blocks[patterns.size] = getBlock(lines, row, column, pattern.size);
        }
        const block = blocks[patterns.size];
        if (matchAll(block, pattern.patterns)) {
          // Found! stop there
          results.push({ row, column, pattern });
          break;
        }
      }
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
  return data.split('\n');
}

/**
 * Get square block of characters centered around (row, column)
 *
 * @param {string[]} lines Source lines
 * @param {number} row Row position of center character
 * @param {number} column Column position of center character
 * @param {number} size Size of square = Chebyshev distance from center (king moves)
 *
 * @return {string[]} array of block line strings
 */
export function getBlock(lines, row, column, size) {
  const rows = [];
  for (let r = row - size; r <= row + size; r++) {
    const line = lines[r] || '';
    const chars = [];
    for (let c = column - size; c <= column + size; c++) {
      const char = line[c] || ' ';
      chars.push(char);
    }
    rows.push(chars.join(''));
  }
  return rows;
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
 * Escape characters for RegExp range syntax
 *
 * @param {string} string String to escape
 */
function regexpEscape(string) {
  return string.replace(/([\\\[\]^-])/g, '\\$1');
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
