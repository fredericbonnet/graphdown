import chai from 'chai';
import fs from 'fs';
import path from 'path';
import { renderGraphdown } from '../src/render.js';

const { expect, Assertion } = chai;

Assertion.addMethod('matchSnapshot', function (filename, snapshot = false) {
  const filepath = path.join(__dirname, filename);
  const actual = this._obj;
  if (snapshot || !fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, actual);
  } else {
    const expected = fs.readFileSync(filepath).toString();
    expect(actual).to.equal(expected, 'expected data to match snapshot');
  }
});

function render(filename) {
  const data = fs.readFileSync(path.join(__dirname, filename)).toString();
  const style = fs
    .readFileSync(path.join(__dirname, '../src/graphdown.css'))
    .toString()
    .replace(/\r/g, '');

  return renderGraphdown(data, style);
}

describe('snapshots', () => {
  specify('kitchensink', function () {
    const gd = render('./examples/kitchensink.txt');
    expect(gd).to.matchSnapshot('./examples/kitchensink.svg');
  });
  specify('sample', function () {
    const gd = render('./examples/sample.txt');
    expect(gd).to.matchSnapshot('./examples/sample.svg');
  });
  specify('curves', function () {
    const gd = render('./examples/curves.txt');
    expect(gd).to.matchSnapshot('./examples/curves.svg');
  });
});
