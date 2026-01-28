import { obj } from './toStrictEqual';

test("obj에는 {a: 'hello'} 와 같아야 한다", () => {
  expect(obj()).toStrictEqual({ a: 'hello' });
  expect(obj()).not.toStrictEqual({ b: 'hello' });
});
