import { okPromise, okAsync, noAsync, noPromise } from './asyncFunction';

test('okPromise 테스트', () => {
  const okSpy = jest.fn(okPromise);
  return expect(okPromise()).resolves.toBe('ok');
});

test('noPromise 테스트1', () => {
  const noSpy = jest.fn(noPromise);
  return noSpy().catch((result) => {
    expect(result).toBe('no');
  });
});

test('noPromise 테스트2', () => {
  const noSpy = jest.fn(noPromise);
  return expect(noSpy()).rejects.toBe('no');
});

test('async 테스트', async () => {
  const noSpy = jest.fn(noAsync);
  try {
    const result = await noSpy();
    expect(result).toBe('no');
  } catch (err) {
    expect(err).toBe('no');
  }
});
