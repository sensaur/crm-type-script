import Select from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchToken } from '../../connect/auth';
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
          Authorization: `JWT ${fetchToken()}`,
        },
      });
      setState((prev: ArrayObjectSelectState) => ({ ...prev, offices: response?.data || [] }));
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    (async function resolve() { await fetchOffices(); }());
  }, []);

  return (
    <div className="flex-row align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-block">
                  <form action="">
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
