import jwt_decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
import {
  Navigate,
} from 'react-router-dom';

interface UserToken {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number,
  username: string
  is_employee: boolean
  is_admin: { number: true }
  offices_agencies: { number: number },
  role: number
}

export const USER_TOKEN = 'token';
export const CURRENT_USER_OFFICE = 'office';

export function pushToken(token: string) {
  localStorage.setItem(USER_TOKEN, token);
}

export function removeToken() {
  localStorage.removeItem(USER_TOKEN);
}

export function removeCurrentOffice() {
  localStorage.removeItem(CURRENT_USER_OFFICE);
}

export function deauthenticateUser() {
  removeToken();
  removeCurrentOffice();
}

export function pushCurrentOffice(office: any) {
  try {
    localStorage.setItem(CURRENT_USER_OFFICE, JSON.stringify(office));
    return true;
  } catch (e) {
    return false;
  }
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem(USER_TOKEN) || '';
}

export function getUserInfoByToken(token: string) {
  return jwt_decode<UserToken>(token);
}

export function getUserInfo() {
  try {
    return getUserInfoByToken(getTokenFromLocalStorage());
  } catch (e) {
    return null;
  }
}

export function checkTokenExpirationDate(timestamp: number) {
  return timestamp > (new Date().getTime() / 1000);
}

export function getCurrentOfficeFromLocalStorage() {
  return localStorage.getItem(CURRENT_USER_OFFICE);
}

export function getCurrentOfficeId() {
  const office = getCurrentOfficeFromLocalStorage();
  let officeData: { id?: any } = {};
  let officeId = 0;

  if (typeof office !== 'string') {
    return 0;
  }

  try {
    officeData = JSON.parse(office);
  } catch (e) {
    return 0;
  }

  if (typeof officeData !== 'object' || !officeData) {
    return 0;
  }

  officeId = parseInt(officeData.id, 10);

  return Number.isNaN(officeId) ? 0 : officeId;
}
export function AuthRequired({ children }: { children: JSX.Element }) {
  const userInfo = getUserInfo();
  console.log(userInfo);
  const officeId = getCurrentOfficeId();
  console.log(officeId);

  if (!userInfo || !checkTokenExpirationDate(userInfo.exp) || !officeId) {
    deauthenticateUser();
    return <Navigate to="/login" />;
  }

  // @ts-ignore
  // if (!userInfo.is_admin || !Object.keys(userInfo.is_admin).includes(officeId.toString())) {
  //   // deauthenticateUser();
  //   console.log('deauth');
  //   // return navigate('login');
  // }

  return (children);
}
