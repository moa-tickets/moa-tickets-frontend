import { sum, obj } from './toHaveBeenCalled';

test('sum 함수가 호출되었다', () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalled();
});

test('sum 함수가 1번 호출되었다', () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalledTimes(1);
});

test('sum함수가 1,2과 같이 호출되었다', () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalledWith(1, 2);
});

test('obj.minus 함수가 1번 호출되었다', () => {
  jest.spyOn(obj, 'minus');
  const result = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});
