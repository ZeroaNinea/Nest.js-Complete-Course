import { sum } from '../src/index';

describe('sum()', () => {
  it('adds two numbers', () => {
    const a: number = Math.random();
    const b: number = Math.random();

    const c: number = a + b;

    expect(sum(a, b)).toBe(c);
  });
});
