import {
  ChangeEvent, useState, FormEvent, useEffect,
} from 'react';
import { Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { pushToken, getUserInfo, checkTokenExpirationDate } from '../../connect/auth';
import APIClient from '../../api/Client/Client';

interface User {
  login: string;
  password: string;
  showErrorMessage: boolean;
  errorMessage: string,
}

interface Token {
  access: string;
  refresh: string;
}

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState<User>({
    login: '',
    password: '',
    showErrorMessage: false,
    errorMessage: '',
  });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev: User) => ({ ...prev, [name]: value }));
  };

  const onError = (error: string) => {
    setState((prev: User) => ({ ...prev, errorMessage: error }));
    setState((prev: User) => ({ ...prev, showErrorMessage: true }));
    setTimeout(() => {
      setState((prev: User) => ({ ...prev, showErrorMessage: false }));
    }, 3e3);
  };
  const success = (r: Token) => {
    // console.log('саксесс', r);
    pushToken(r.access);
    navigate('/officein', { replace: true });
  };

  const {
    login, password, showErrorMessage,
  } = state;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    APIClient.fetchAuthTokenFromServer(login, password)
      .then((r: AxiosResponse) => success(r.data))
      .catch((error: AxiosError) => {
        const data: any = error.response?.data;
        onError(data.detail);
      });
  };

  if (!localStorage.getItem('auth')) {
    // console.log(localStorage);
    localStorage.clear();
    localStorage.setItem('auth', '1');
    // console.log(localStorage);
  }

  const userInfo = getUserInfo();
  // console.log('userInfoFROMLOGIN==>', userInfo);
  useEffect(() => {
    // console.log('!userInfo=>>', !userInfo);
    if (!!userInfo && checkTokenExpirationDate(userInfo.exp)) {
      navigate('/officein', { replace: true });
    }
  }, [userInfo]);

  return (
    <div className="flex-row align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-block">
                  <form action="" onSubmit={submitHandler}>
                    <h1>Вход</h1>
                    <div className="input-group mb-3">
                      <span className="input-group-sm mx-lg-2"><i className="icon-user align-bottom" /></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Логин"
                        name="login"
                        value={login}
                        onChange={inputHandler}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-sm mx-lg-2"><i className="icon-lock align-bottom" /></span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Пароль"
                        name="password"
                        autoComplete="on"
                        value={password}
                        onChange={inputHandler}
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button
                          type="submit"
                          className="btn btn-primary px-4"
                        >
                          Войти
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="py-2" />
          {showErrorMessage
            ? (
              <Alert className="col-md-4" color="warning">
                <strong>Ошибка!</strong>
                {' '}
                Не удалось войти
                <div>
                  {state.errorMessage}
                </div>
              </Alert>
            )
            : ''}
        </div>
      </div>
    </div>
  );
}

export default Login;
