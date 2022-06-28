import { ChangeEvent, useState } from 'react';

interface User {
  login: string;
  password: string;
  showErrorMessage: boolean;
}

function Login() {
  const [state, setState] = useState<User>({
    login: '',
    password: '',
    showErrorMessage: false,
  });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev: User) => ({ ...prev, [name]: value }));
  };

  const submitHandler = () => {
    console.log('privetiki iz SubmitHandler');
  };

  const { login, password } = state;

  return (
    <div className="flex-row align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-block">
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
                      value={password}
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-primary px-4"
                        onClick={submitHandler}
                      >
                        Войти
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4" />
        </div>
      </div>
    </div>
  );
}

export default Login;
