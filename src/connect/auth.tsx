export const USER_TOKEN = 'token';

export function pushToken(token: string) {
  localStorage.setItem(USER_TOKEN, token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem(USER_TOKEN) || '';
}
