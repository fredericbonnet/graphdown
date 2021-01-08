// @ts-check
// @ts-ignore
import { renderGraphdown } from 'https://cdn.skypack.dev/graphdown';

/** @type {HTMLTextAreaElement} */
// @ts-ignore
const editor = document.getElementById('editor');

const output = document.getElementById('output');

/** Load editor data */
function loadData() {
  return localStorage.getItem('graphdown-editor-data');
}

/**
 * Save editor data
 * @param {string} data
 */
function saveData(data) {
  localStorage.setItem('graphdown-editor-data', data);
}

// Render data into target
let scheduledRefresh = null;
function scheduleRefresh(data, target) {
  cancelAnimationFrame(scheduledRefresh);
  scheduledRefresh = requestAnimationFrame(() => {
    target.innerHTML = renderGraphdown(data);
  });
}

// Refresh output from editor value
function refresh() {
  scheduleRefresh(editor.value, output);
}

// Load & render data on init
editor.value = loadData();

// Save data on edit
editor.addEventListener('input', () => saveData(editor.value));

// Render on edit
editor.addEventListener('input', () => refresh());

refresh();
