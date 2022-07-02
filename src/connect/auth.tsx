import jwt_decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

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

export function AuthRequired(props: any) {
  // const navigate = useNavigate();
  const userInfo = getUserInfo();
  console.log(userInfo);
  const officeId = getCurrentOfficeId();
  console.log(officeId);

  if (!userInfo || !checkTokenExpirationDate(userInfo.exp)) {
    console.log('deauth');
    // deauthenticateUser();
    // return navigate('login');
  }
  if (!officeId) {
    console.log('deauth');
    // deauthenticateUser();
    // return navigate('officein');
  }

  // @ts-ignore
  if (!userInfo.is_admin || !Object.keys(userInfo.is_admin).includes(officeId.toString())) {
    // deauthenticateUser();
    console.log('deauth');
    // return navigate('login');
  }

  return (props.children);
}
