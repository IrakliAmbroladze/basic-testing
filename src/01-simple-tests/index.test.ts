// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Add })).toEqual(6);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Subtract })).toEqual(
      2,
    );
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Multiply })).toEqual(
      8,
    );
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({ a: 4, b: 2, action: Action.Exponentiate }),
    ).toEqual(16);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(simpleCalculator({ a: 4, b: 2, action: 'something' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(
      simpleCalculator({ a: 'four', b: 'two', action: Action.Exponentiate }),
    ).toBeNull();
  });
});
