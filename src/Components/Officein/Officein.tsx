import Select from 'react-select';
import { useState } from 'react';

interface Animal {
  name: string;
  type: string;
  age: number;
}

interface ArrayObjectSelectState {
  selectedAnimal: Animal | null
}

function Officein() {
  const animals: Animal[] = [
    {
      name: 'Tom',
      type: 'dinosaur',
      age: 25,
    },
    {
      name: 'Alfred',
      type: 'turtle',
      age: 12,
    },
    {
      name: 'Jeff',
      type: 'snail',
      age: 19,
    },
  ];

  const [state, setState] = useState<ArrayObjectSelectState>({
    selectedAnimal: null,
  });

  const handleChange = (option: Animal | null) => {
    console.log(option);
    console.log(typeof option);
    setState((prev: ArrayObjectSelectState) => ({ ...prev, selectedAnimal: option }));
  };

  // const handleOptionLoad = () => {
  // let status;
  // UsersAPI
  //   .fetchOffices()
  //   .then((r) => {
  //     status = r.status;
  //     return r.json();
  //   })
  //   .then((r) => {
  //     if (status === POSITIVE_ACTION_STATUSES.retrieve) {
  //       this.setState({
  //         offices: r || [],
  //       });
  //     }
  //   });
  // };

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
                      value={state.selectedAnimal}
                      getOptionLabel={(animal: Animal) => animal.name}
                      getOptionValue={(animal: Animal) => animal.type}
                      options={animals}
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
