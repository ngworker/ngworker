import {
  createByAxis,
  createEnumerationList,
  findAxis,
  getAxisYCount,
} from '../cdk-key-manager-mapper.utils';
import { getIndexOfFixture } from './cdk-key-manager-mapper.utils.fixtures';

describe('CdkKeyManagerMapper utils', () => {
  describe('createEnumerationList', () => {
    it('should create enumeration list by count', () => {
      expect(createEnumerationList(-1)).toEqual([]);
      expect(createEnumerationList(0)).toEqual([]);
      expect(createEnumerationList(5)).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('getRowCount', () => {
    it('should get axis "y" count by enumeration list', () => {
      expect(getAxisYCount([], 0)).toEqual(0);
      expect(getAxisYCount([0], 3)).toEqual(0);
      expect(getAxisYCount([0, 1], 3)).toEqual(0);
      expect(getAxisYCount([1, 2, 3], 3)).toEqual(1);
      expect(getAxisYCount([1, 2, 3, 4], 3)).toEqual(0);
      expect(getAxisYCount([1, 2, 3, 4, 5], 3)).toEqual(0);
      expect(getAxisYCount([1, 2, 3, 4, 5, 6], 3)).toEqual(2);
    });
  });

  describe('createByAxis', () => {
    /**
     * represents the mat-cell dom-nodes how they are ordered in the mat-table dom-node
     * @see: inspect in browser
     */
    it('should create 3dList by y-axis, count and chunk', () => {
      const y3dList1 = createByAxis('y', 0, 0);
      expect(y3dList1).toEqual([]);

      const y3dList2 = createByAxis('y', 0, 3);
      expect(y3dList2).toEqual([]);

      const y3dList3 = createByAxis('y', 1, 3);
      expect(y3dList3).toEqual([]);

      const y3dList4 = createByAxis('y', 2, 3);
      expect(y3dList4).toEqual([]);

      const y3dList5 = createByAxis('y', 3, 3);
      expect(y3dList5).toEqual([[0, 1, 2]]);

      const y3dList6 = createByAxis('y', 9, 3);
      expect(y3dList6).toEqual([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ]);
    });

    /**
     * represents the directives how they are ordered in the QueryList
     * @see: cdk-spreadsheet-manager-factory.ts
     */
    it('should create 3dList by x-axis, count and chunk', () => {
      const x3dList1 = createByAxis('x', 0, 0);
      expect(x3dList1).toEqual([]);

      const x3dList2 = createByAxis('x', 0, 3);
      expect(x3dList2).toEqual([]);

      const x3dList3 = createByAxis('x', 1, 3);
      expect(x3dList3).toEqual([]);

      const x3dList4 = createByAxis('x', 2, 3);
      expect(x3dList4).toEqual([]);

      const x3dList5 = createByAxis('x', 3, 3);
      expect(x3dList5).toEqual([[0, 1, 2]]);

      const x3dList6 = createByAxis('x', 9, 3);
      expect(x3dList6).toEqual([
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ]);
    });
  });

  describe('findAxis', () => {
    it('should find in 3dList "x" and "y" position by value', () => {
      const x3dList = createByAxis('x', 9, 3);

      expect(findAxis(0, x3dList)).toEqual({ x: 0, y: 0 });
      expect(findAxis(1, x3dList)).toEqual({ x: 0, y: 1 });
      expect(findAxis(2, x3dList)).toEqual({ x: 0, y: 2 });

      expect(findAxis(3, x3dList)).toEqual({ x: 1, y: 0 });
      expect(findAxis(4, x3dList)).toEqual({ x: 1, y: 1 });
      expect(findAxis(5, x3dList)).toEqual({ x: 1, y: 2 });

      expect(findAxis(6, x3dList)).toEqual({ x: 2, y: 0 });
      expect(findAxis(7, x3dList)).toEqual({ x: 2, y: 1 });
      expect(findAxis(8, x3dList)).toEqual({ x: 2, y: 2 });

      expect(findAxis(99, x3dList)).toEqual({ x: -1, y: -1 });
    });
  });

  describe('findIndexOfEl', () => {
    it('should get indexOf Element in NodeList', () => {
      expect(getIndexOfFixture('.a1')).toEqual(0);
      expect(getIndexOfFixture('.a2')).toEqual(1);
      expect(getIndexOfFixture('.a3')).toEqual(2);
    });
  });
});
