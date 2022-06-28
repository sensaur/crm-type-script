class Client {
  // constructor(resource_url) {
  //   this.resource_url = resource_url;
  // }

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
    const response: Response = await fetch('/frontend/api/auth/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: this.encodeObject({ username: login, password }),
    });
    return response;
  }
}

const APIClient = new Client();

export default APIClient;