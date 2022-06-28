import { ChangeEvent, useState } from 'react';
import { Alert } from 'reactstrap';
import APIClient from '../../api/Client/Client';
import POSITIVE_ACTION_STATUSES from '../../api/Client/PAStatuses';

interface User {
  login: string;
  password: string;
  showErrorMessage: boolean;
  errorMessages: object,
}

function Login() {
  const [state, setState] = useState<User>({
    login: '',
    password: '',
    showErrorMessage: false,
    errorMessages: {},
  });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev: User) => ({ ...prev, [name]: value }));
  };

  const error = (r: Response) => {
    setState((prev: User) => ({ ...prev, showErrorMessage: true }));
    console.log('еррор', r);
  };
  const success = (r: Response) => {
    console.log('саксесс', r);
  };

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login, password, showErrorMessage, errorMessages,
  } = state;

  const submitHandler = (e: any) => {
    e.preventDefault();
    let status: number;
    APIClient.fetchAuthToken(login, password).then((r: Response) => {
      status = r.status;
      return r.json();
    }).then((r) => {
      if (status === POSITIVE_ACTION_STATUSES.retrieve) { return success(r); }
      return error(r);
    });
  };

  // console.log({ errorMessages, error, success });

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
                      <span className="input-group-addon"><i className="icon-user" /></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Логин"
                        name="login"
                        value={login}
                        onChange={inputHandler}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock" /></span>
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
          <div className="col-md-4" />
          {showErrorMessage
            ? (
              <Alert color="warning">
                <strong>Ошибка!</strong>
                {' '}
                Не удалось войти
              </Alert>
            )
            : ''}
        </div>
      </div>
    </div>
  );
}

export default Login;
