/**
 * 쿠키를 읽는 유틸리티 함수
 * 대소문자 구분 없이 검색
 */
export const getCookie = (name: string): string | null => {
  if (!document.cookie) {
    return null;
  }

  const allCookies = document.cookie.split(';');
  const lowerName = name.toLowerCase();

  for (const cookie of allCookies) {
    const trimmed = cookie.trim();
    const equalIndex = trimmed.indexOf('=');

    if (equalIndex === -1) continue;

    const cookieName = trimmed.substring(0, equalIndex);
    const cookieValue = trimmed.substring(equalIndex + 1);

    // 정확한 이름 매칭 시도
    if (cookieName === name) {
      return cookieValue || null;
    }

    // 대소문자 구분 없이 매칭 시도
    if (cookieName.toLowerCase() === lowerName) {
      return cookieValue || null;
    }
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
  // document.cookie가 비어있으면 false
  if (!document.cookie || document.cookie.trim() === '') {
    return false;
  }

  const authCookieNames = [
    'accessToken',
    'refreshToken',
    'sessionId',
    'token',
    'auth',
    'access_token',
    'refresh_token',
    'Authorization',
    'authorization',
  ];

  const allCookies = document.cookie.split(';').map((c) => c.trim());

  const cookieDetails = allCookies.map((cookie) => {
    const equalIndex = cookie.indexOf('=');
    if (equalIndex === -1) {
      return { name: cookie, value: '', hasValue: false };
    }
    const name = cookie.substring(0, equalIndex).trim();
    const value = cookie.substring(equalIndex + 1).trim();
    return { name, value, hasValue: value.length > 0 };
  });

  // 정확한 이름 매칭 시도
  for (const name of authCookieNames) {
    if (hasCookie(name)) {
      return true;
    }
  }

  // 마지막 시도: 쿠키가 하나라도 있으면 인증 쿠키로 간주
  if (cookieDetails.some((c) => c.hasValue)) {
    return true;
  }

  return false;
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
