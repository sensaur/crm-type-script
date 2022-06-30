export const USER_TOKEN = 'token';

/**
 * Функция для записи токена в localStorage
 * @param token {string}
 */
export function pushToken(token: string) {
  localStorage.setItem(USER_TOKEN, token);
}

export function fetchToken() {
  return localStorage.getItem(USER_TOKEN) || '';
}
