import axios, { AxiosResponse } from 'axios';
import { AUTH } from '../../urls/urls';

interface ObjInt {
  username: string
  password: string
}

class Client {
  // eslint-disable-next-line class-methods-use-this
  encodeObject(obj: ObjInt) {
    const filters: string[] = [];
    if (obj) {
      Object.keys(obj).forEach((k) => {
        const value: string = obj[k as keyof typeof obj];
        console.log(value, typeof value);
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
  }

  async fetchAuthTokenFromServer(login: string, password: string) {
    const response: AxiosResponse = await axios({
      url: AUTH,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data: this.encodeObject({ username: login, password }),
    });
    return response;
  }
}

const APIClient = new Client();
export default APIClient;
