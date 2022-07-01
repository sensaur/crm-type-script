import axios, { AxiosResponse } from 'axios';
import { LOGIN } from '../../urls/urls';

class Client {
  // eslint-disable-next-line class-methods-use-this
  encodeObject(obj: any) {
    const filters: string[] = [];
    if (obj) {
      Object.keys(obj).forEach((k) => {
        const value = obj[k];
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

  async fetchAuthToken(login: string, password: string) {
    const response: AxiosResponse = await axios({
      url: LOGIN,
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
