import axios, { AxiosResponse } from 'axios';
import { AUTH } from '../../urls/urls';
// import { getCurrentOfficeId, getTokenFromLocalStorage } from '../../auth/auth';

interface ObjInt {
  username: string
  password: string
}

class APIClient {
  static encodeObject = (obj: ObjInt) => {
    const filters: string[] = [];
    if (obj) {
      Object.keys(obj).forEach((k: string) => {
        const value: string = obj[k as keyof typeof obj];
        if (Array.isArray(value)) {
          value.forEach((v) => {
            filters.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
          });
        } else {
          filters.push(`${encodeURIComponent(k)}=${encodeURIComponent(value)}`);
        }
      });
    }
    return `&${filters.join('&')}`;
  };

  static async fetchAuthTokenFromServer(login: string, password: string) {
    const response: AxiosResponse = await axios({
      url: AUTH,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data: APIClient.encodeObject({ username: login, password }),
    });
    return response;
  }

  // static async fetchJSON(url: string) {
  //   return fetch(`/frontend/api${url}`, {
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `JWT ${getTokenFromLocalStorage()}`,
  //       office: getCurrentOfficeId(),
  //     },
  //   });
  // }
  //
  // static async fetchList(p = 1, params = {
  //   page: 1,
  // }, url_suffix = '') {
  //   // eslint-disable-next-line no-param-reassign
  //   params.page = p;
  //   const encodedGetParams = APIClient.encodeObject(params);
  //   console.log(encodedGetParams);
  //   return APIClient.fetchJSON(`/franchising/${url_suffix}?${encodedGetParams}`);
  // }
}

export default APIClient;
