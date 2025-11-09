// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 7, b: 4, action: Action.Subtract, expected: 3 },
  { a: 9, b: 1, action: Action.Subtract, expected: 8 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 3, b: 5, action: Action.Multiply, expected: 15 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 6, b: 3, action: 'something', expected: null },
  { a: 'nine', b: 3, action: Action.Divide, expected: null },
  { a: 6, b: 'other', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'returns value when inputs and action are valid and returns null in case of invalid of a, b or action',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  ); // Consider to use Jest table tests API to test all cases above
});
