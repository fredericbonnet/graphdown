/**
 * Default style; kept in sync with css/graphdown.css
 *
 * @type {string}
 */
export const defaultStyle = `.graphdown {
  font-family: 'Consolas', monospace;
  font-size: 16px;
  stroke-width: 2;
  stroke: black;
  stroke-linecap: round;
  fill: black;
}
.graphdown .outline {
  fill: white;
}
.graphdown path.filled {
  fill: black;
  stroke: none;
}
.graphdown path,
.graphdown polyline {
  fill: none;
}
.graphdown polygon {
  stroke: none;
}
.graphdown text {
  white-space: pre;
  fill: black;
  stroke: none;
  font-size: 1em;
}
.graphdown .block {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  white-space: pre;
  font-size: 1em;
}
`;
