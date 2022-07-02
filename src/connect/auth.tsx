import jwt_decode from 'jwt-decode';

export const USER_TOKEN = 'token';

export function pushToken(token: string) {
  localStorage.setItem(USER_TOKEN, token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem(USER_TOKEN) || '';
}

export function getUserInfoByToken(token: string) {
  return jwt_decode(token);
}

export function getUserInfo() {
  try {
    return getUserInfoByToken(getTokenFromLocalStorage());
  } catch (e) {
    return null;
  }
}

export function checkTokenExpirationDate(timestamp: any) {
  return timestamp > (new Date().getTime() / 1000);
}
