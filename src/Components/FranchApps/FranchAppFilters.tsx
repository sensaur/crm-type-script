import Select from 'react-select';
import { FormEvent, useState } from 'react';

interface Country {
  label: string
  value: string
}

interface ArrayObjectSelectState {
  selectedCountry: Country | null
  offices: []
}

const FRANCHAISE_COUNTRY_OPTIONS = [
  { label: 'Россия', value: 'russia' },
  { label: 'Казахстан', value: 'kazakhstan' },
  { label: 'Беларусь', value: 'belorussia' },
];

function FranchAppFilters(props: any) {
  const [state, setState] = useState<ArrayObjectSelectState>({
    selectedCountry: null,
    offices: [],
  });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };
  const inputHandler = (option: Country | null) => {
    console.log(option);
    setState((prev: ArrayObjectSelectState) => ({ ...prev, selectedCountry: option }));
  };
  const { isFiltersShown } = props;
  const filters: any = () => (
    <div className="container-fluid">
      <form action="" className="d-flex align-items-center" onSubmit={submitHandler}>
        <Select
          className="py-2 px-4"
          value={state.selectedCountry}
          getOptionLabel={(country: Country) => country.label}
          getOptionValue={(country: Country) => country.value}
          options={FRANCHAISE_COUNTRY_OPTIONS}
          isClearable
          backspaceRemovesValue
          onChange={inputHandler}
        />
        <button
          type="submit"
          className="btn btn-primary px-4"
        >
          Найти
        </button>
      </form>
    </div>
  );
  return (
    <div>
      {isFiltersShown ? filters() : ''}
    </div>
  );
}

export default FranchAppFilters;
