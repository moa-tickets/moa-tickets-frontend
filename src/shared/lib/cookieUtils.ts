/**
 * 쿠키를 읽는 유틸리티 함수
 */
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

/**
 * 쿠키가 존재하는지 확인
 */
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};

/**
 * 모든 쿠키를 확인하여 인증 관련 쿠키가 있는지 판단
 * 일반적인 인증 쿠키 이름들을 확인
 */
export const checkAuthCookie = (): boolean => {
  const authCookieNames = [
    'accessToken',
    'refreshToken',
    'sessionId',
    'token',
    'auth',
    'access_token',
    'refresh_token',
    'Authorization',
  ];

  return authCookieNames.some((name) => hasCookie(name));
};

/**
 * 쿠키 제거 함수
 */
export const deleteCookie = (
  name: string,
  path: string = '/',
  domain?: string,
): void => {
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  if (domain) {
    cookieString += ` domain=${domain};`;
  }
  document.cookie = cookieString;
};

/**
 * 모든 인증 관련 쿠키 제거
 */
export const clearAuthCookies = (): void => {
  const authCookieNames = [
    'accessToken',
    'refreshToken',
    'sessionId',
    'token',
    'auth',
    'access_token',
    'refresh_token',
    'Authorization',
  ];

  authCookieNames.forEach((name) => {
    // 다양한 경로와 도메인에서 쿠키 제거 시도
    deleteCookie(name, '/');
    deleteCookie(name, '/', globalThis.location.hostname);
    deleteCookie(name, '/', `.${globalThis.location.hostname}`);
  });
};
