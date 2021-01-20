import chai from 'chai';

import { segment, SegmentList } from '../src/shapes.js';

const { expect } = chai;

describe('Segment', () => {
  describe('isMergeable', () => {
    it('should not be mergeable with itself', () => {
      const s = segment({ from: [0, 0], to: [1, 1] });
      expect(s.isMergeable(s)).to.be.false;
    });
    it('should be mergeable on same from coordinate', () => {
      const s1 = segment({ from: [0, 0], to: [1, 1] });
      const s2 = segment({ from: [0, 0], to: [1, 2] });
      expect(s1.isMergeable(s2)).to.be.true;
      expect(s2.isMergeable(s1)).to.be.true;
    });
    it('should be mergeable on same to coordinate', () => {
      const s1 = segment({ from: [0, 0], to: [1, 1] });
      const s2 = segment({ from: [2, 2], to: [1, 1] });
      expect(s1.isMergeable(s2)).to.be.true;
      expect(s2.isMergeable(s1)).to.be.true;
    });
    it('should be mergeable on same from/to coordinate', () => {
      const s1 = segment({ from: [0, 0], to: [1, 1] });
      const s2 = segment({ from: [2, 2], to: [0, 0] });
      expect(s1.isMergeable(s2)).to.be.true;
      expect(s2.isMergeable(s1)).to.be.true;
    });
    it('should not be mergeable with disconnected segment', () => {
      const s1 = segment({ from: [0, 0], to: [1, 1] });
      const s2 = segment({ from: [0, 1], to: [1, 2] });
      expect(s1.isMergeable(s2)).to.be.false;
      expect(s2.isMergeable(s1)).to.be.false;
    });
    it('should not be mergeable with different attrs', () => {
      const s1 = segment({ from: [0, 0], to: [1, 1] });
      const s2 = segment({ from: [1, 1], to: [2, 2] }, 'class="foo"');
      expect(s1.isMergeable(s2)).to.be.false;
      expect(s2.isMergeable(s1)).to.be.false;
    });
  });

  describe('merge', () => {
    specify('with same from', () => {
      const s1 = segment({
        from: [0, 0],
        to: [1, 1],
        forward: 'l 1 0',
        backward: 'l 0 -1',
      });
      const s2 = segment({
        from: [0, 0],
        to: [2, 2],
        forward: 'l 2 0',
        backward: 'l 0 -2',
      });
      const merged = s1.merge(s2);
      expect(merged.from).to.deep.equal([2, 2]);
      expect(merged.to).to.deep.equal([1, 1]);
      expect(merged.forward).to.equal('l 0 -2 L 0 0 l 1 0');
      expect(merged.backward).to.equal('l 0 -1 L 0 0 l 2 0');
    });
    specify('with same to', () => {
      const s1 = segment({
        from: [0, 0],
        to: [2, 2],
        forward: 'l 2 0',
        backward: 'l 0 -2',
      });
      const s2 = segment({
        from: [1, 1],
        to: [2, 2],
        forward: 'l 1 0',
        backward: 'l 0 -1',
      });
      const merged = s1.merge(s2);
      expect(merged.from).to.deep.equal([0, 0]);
      expect(merged.to).to.deep.equal([1, 1]);
      expect(merged.forward).to.equal('l 2 0 L 2 2 l 0 -1');
      expect(merged.backward).to.equal('l 1 0 L 2 2 l 0 -2');
    });
    specify('with same to/from', () => {
      const s1 = segment({
        from: [0, 0],
        to: [1, 1],
        forward: 'l 1 0',
        backward: 'l 0 -1',
      });
      const s2 = segment({
        from: [1, 1],
        to: [3, 3],
        forward: 'l 2 0',
        backward: 'l 0 -2',
      });
      const merged = s1.merge(s2);
      expect(merged.from).to.deep.equal([0, 0]);
      expect(merged.to).to.deep.equal([3, 3]);
      expect(merged.forward).to.equal('l 1 0 L 1 1 l 2 0');
      expect(merged.backward).to.equal('l 0 -2 L 1 1 l 0 -1');
    });
    specify('with same from/to', () => {
      const s1 = segment({
        from: [1, 1],
        to: [3, 3],
        forward: 'l 2 0',
        backward: 'l 0 -2',
      });
      const s2 = segment({
        from: [0, 0],
        to: [1, 1],
        forward: 'l 1 0',
        backward: 'l 0 -1',
      });
      const merged = s1.merge(s2);
      expect(merged.from).to.deep.equal([0, 0]);
      expect(merged.to).to.deep.equal([3, 3]);
      expect(merged.forward).to.equal('l 1 0 L 1 1 l 2 0');
      expect(merged.backward).to.equal('l 0 -2 L 1 1 l 0 -1');
    });
  });
});

describe('SegmentList', () => {
  describe('merge', () => {
    it('should accept empty segments', () => {
      const segments = [];
      const list = new SegmentList();
      segments.forEach((segment) => list.add(segment));
      expect(list.segments).to.be.empty;
    });
    it('should accept single segment', () => {
      const segments = [segment({ from: [0, 0], to: [1, 1] })];
      const list = new SegmentList();
      segments.forEach((segment) => list.add(segment));
      expect(list.segments).to.have.lengthOf(1);
      expect(list.segments).to.include(segments[0]);
    });
    it('should not merge two disconnected segments', () => {
      const segments = [
        segment({ from: [0, 0], to: [1, 0] }),
        segment({ from: [1, 1], to: [1, 2] }),
      ];
      const list = new SegmentList();
      segments.forEach((segment) => list.add(segment));
      expect(list.segments).to.have.lengthOf(2);
      expect(list.segments).to.include(segments[0]);
      expect(list.segments).to.include(segments[1]);
    });
    it('should merge two segments with same from coordinate', () => {
      const segments = [
        segment({ from: [0, 0], to: [1, 1] }),
        segment({ from: [0, 0], to: [2, 2] }),
      ];
      const list = new SegmentList();
      segments.forEach((segment) => list.add(segment));
      expect(list.segments).to.have.lengthOf(1);
      expect(list.segments).to.not.include(segments[0]);
      expect(list.segments).to.not.include(segments[1]);
      const [first] = list.segments.values();
      expect(first.from).to.deep.equal([2, 2]);
      expect(first.to).to.deep.equal([1, 1]);
      expect(first.forward).to.equal('L 0 0');
      expect(first.backward).to.equal('L 0 0');
    });
    it('should merge two segments with same to coordinate', () => {
      const segments = [
        segment({ from: [0, 0], to: [2, 2] }),
        segment({ from: [1, 1], to: [2, 2] }),
      ];
      const list = new SegmentList();
      segments.forEach((segment) => list.add(segment));
      expect(list.segments).to.have.lengthOf(1);
      expect(list.segments).to.not.include(segments[0]);
      expect(list.segments).to.not.include(segments[1]);
      const [first] = list.segments.values();
      expect(first.from).to.deep.equal([0, 0]);
      expect(first.to).to.deep.equal([1, 1]);
      expect(first.forward).to.equal('L 2 2');
      expect(first.backward).to.equal('L 2 2');
    });
    it('should merge two segments with same to/from coordinate', () => {
      const segments = [
        segment({ from: [0, 0], to: [1, 1] }),
        segment({ from: [1, 1], to: [2, 2] }),
      ];
      const list = new SegmentList();
      segments.forEach((segment) => list.add(segment));
      expect(list.segments).to.have.lengthOf(1);
      expect(list.segments).to.not.include(segments[0]);
      expect(list.segments).to.not.include(segments[1]);
      const [first] = list.segments.values();
      expect(first.from).to.deep.equal([0, 0]);
      expect(first.to).to.deep.equal([2, 2]);
      expect(first.forward).to.equal('L 1 1');
      expect(first.backward).to.equal('L 1 1');
    });
    it('should merge two segments with same from/to coordinate', () => {
      const segments = [
        segment({ from: [1, 1], to: [2, 2] }),
        segment({ from: [0, 0], to: [1, 1] }),
      ];
      const list = new SegmentList();
      segments.forEach((segment) => list.add(segment));
      expect(list.segments).to.have.lengthOf(1);
      expect(list.segments).to.not.include(segments[0]);
      expect(list.segments).to.not.include(segments[1]);
      const [first] = list.segments.values();
      expect(first.from).to.deep.equal([0, 0]);
      expect(first.to).to.deep.equal([2, 2]);
      expect(first.forward).to.equal('L 1 1');
      expect(first.backward).to.equal('L 1 1');
    });
    it('should merge three connected segments', () => {
      const segments = [
        segment({ from: [0, 0], to: [1, 1] }),
        segment({ from: [1, 1], to: [2, 2] }),
        segment({ from: [0, 0], to: [3, 3] }),
      ];
      const list = new SegmentList();
      segments.forEach((segment) => list.add(segment));
      expect(list.segments).to.have.lengthOf(1);
      expect(list.segments).to.not.include(segments[0]);
      expect(list.segments).to.not.include(segments[1]);
      expect(list.segments).to.not.include(segments[2]);
      const [first] = list.segments.values();
      expect(first.from).to.deep.equal([3, 3]);
      expect(first.to).to.deep.equal([2, 2]);
      expect(first.forward).to.equal('L 0 0 L 1 1');
      expect(first.backward).to.equal('L 1 1 L 0 0');
    });
    it('should merge several connected segments', () => {
      const segments = [
        segment({ from: [0, 0], to: [1, 1] }),
        segment({ from: [1, 1], to: [2, 2] }),
        segment({ from: [0, 1], to: [2, 3] }),
        segment({ from: [0, 0], to: [3, 3] }),
        segment({ from: [2, 3], to: [4, 5] }),
      ];
      const list = new SegmentList();
      segments.forEach((segment) => list.add(segment));
      expect(list.segments).to.have.lengthOf(2);
      expect(list.segments).to.not.include(segments[0]);
      expect(list.segments).to.not.include(segments[1]);
      expect(list.segments).to.not.include(segments[2]);
      expect(list.segments).to.not.include(segments[3]);
      expect(list.segments).to.not.include(segments[4]);
      const [first, second] = list.segments.values();
      expect(first.from).to.deep.equal([3, 3]);
      expect(first.to).to.deep.equal([2, 2]);
      expect(first.forward).to.equal('L 0 0 L 1 1');
      expect(first.backward).to.equal('L 1 1 L 0 0');
      expect(second.from).to.deep.equal([0, 1]);
      expect(second.to).to.deep.equal([4, 5]);
      expect(second.forward).to.equal('L 2 3');
      expect(second.backward).to.equal('L 2 3');
    });
  });
});
