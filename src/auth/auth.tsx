import jwt_decode from 'jwt-decode';
import {
  Navigate,
} from 'react-router-dom';

interface UserToken {
  is_super_admin: boolean
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
  username: string
  is_employee: boolean
  is_admin: { [key: string]: boolean }
  offices_agencies: { number: number }
  role: number
}

interface Office {
  address?: string
  fp_type?: string
  id?: number
  name?: string
}

export const ADMIN = 'admin';
export const CURRENT_USER_OFFICE = 'office';
export const MANAGER = 'manager';
export const SUPER_ADMIN = 'super_admin';
export const USER_TOKEN = 'token';

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

export function pushCurrentOffice(office: Office) {
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

export function getCurrentOfficeFromLocalStorage() {
  return localStorage.getItem(CURRENT_USER_OFFICE);
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

export function getCurrentOfficeId() {
  try {
    const office: any = getCurrentOfficeFromLocalStorage();
    // console.log('office', office);
    // console.log('typeof office', typeof office);
    const officeData = JSON.parse(office);
    // console.log('officeData', officeData);
    const { id } = officeData;
    return Number.isNaN(id) ? 0 : id;
  } catch (e) {
    return 0;
  }
}

export function AuthRequired({ children }: { children: JSX.Element }) {
  const userInfo = getUserInfo();
  const officeId = getCurrentOfficeId();

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

export function getUserRole() {
  try {
    const info = getUserInfo();
    const office = getCurrentOfficeId();
    if (!info || !office) {
      return '';
    }
    if (info.is_super_admin) {
      return SUPER_ADMIN;
    }
    if (Object.prototype.hasOwnProperty.call(info.is_admin, office)) {
      return info.is_admin[office] ? ADMIN : MANAGER;
    }
    return '';
  } catch (e) {
    console.log(e);
    return e;
  }
}

export function fetchCurrentOffice() {
  return localStorage.getItem(CURRENT_USER_OFFICE);
}

export function getCurrentOfficeData() {
  const office = fetchCurrentOffice();
  let officeData = {};

  if (typeof office !== 'string') {
    return {};
  }

  try {
    officeData = JSON.parse(office);
  } catch (e) {
    return {};
  }

  if (typeof officeData !== 'object' || !officeData) {
    return {};
  }
  return officeData;
}
