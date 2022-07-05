import Select from 'react-select';
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {
  checkTokenExpirationDate, getTokenFromLocalStorage, getUserInfo, pushCurrentOffice,
} from '../../auth/auth';
import { GET_OFFICES } from '../../urls/urls';

interface Office {
  address: string
  fp_type: string
  id: number
  name: string
}

interface ArrayObjectSelectState {
  selectedOffice: Office | null
  offices: []
}

function Officein() {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const [state, setState] = useState<ArrayObjectSelectState>({
    selectedOffice: null,
    offices: [],
  });

  const { offices } = state;

  const handleChange = (option: Office | null) => {
    setState((prev: ArrayObjectSelectState) => ({ ...prev, selectedOffice: option }));
  };

  const fetchOffices = async () => {
    try {
      const response = await axios.get(GET_OFFICES, {
        headers: {
          Accept: 'application/json',
          Authorization: `JWT ${getTokenFromLocalStorage()}`,
        },
      });
      setState((prev: ArrayObjectSelectState) => ({ ...prev, offices: response?.data || [] }));
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (state.selectedOffice) {
      pushCurrentOffice(state.selectedOffice);
      navigate('/dashboard');
    } else { swal('выберите офис'); }
  };

  useEffect(() => {
    (async function resolve() { await fetchOffices(); }());
  }, []);

  useEffect(() => {
    if (userInfo === null || !checkTokenExpirationDate(userInfo.exp)) {
      navigate('/login');
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
                  <form action="" onSubmit={handleSubmit}>
                    <h1 className="text-center">Выберете офис</h1>
                    <div
                      className="col-md-12 py-1"
                    />
                    <Select
                      className="py-2"
                      value={state.selectedOffice}
                      getOptionLabel={(office: Office) => office.address}
                      getOptionValue={(office: Office) => office.address}
                      options={offices}
                      isClearable
                      backspaceRemovesValue
                      onChange={handleChange}
                    />
                    <div className="row">
                      <div className="col-md-12 text-center py-2">
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
      </div>
    </div>
  );
}

export default Officein;
