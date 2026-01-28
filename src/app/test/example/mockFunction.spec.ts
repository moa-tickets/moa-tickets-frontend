import { objs } from './mockFunction';

test('objs.minus에 스파이를 심고, 리턴값이 서로 다르게 나오게 하고 싶다.', () => {
  jest
    .spyOn(objs, 'minus')
    .mockImplementationOnce((a, b) => a + b)
    .mockImplementationOnce(() => 5)
    .mockImplementation(() => 3);

  const result1 = objs.minus(1, 2);
  const result2 = objs.minus(1, 2);
  const result3 = objs.minus(1, 2);

  expect(objs.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(3);
});
