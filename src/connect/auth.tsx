export const USER_TOKEN = 'token';

/**
 * Функция для записи токена в localStorage
 * @param token {string}
 */
export function pushToken(token: string) {
  localStorage.setItem(USER_TOKEN, token);
}
