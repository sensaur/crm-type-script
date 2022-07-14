import Select from 'react-select';
import { useState } from 'react';

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

function FranchAppFilters(props: any) {
  const [state, setState] = useState<ArrayObjectSelectState>({
    selectedOffice: null,
    offices: [],
  });

  const handleSubmit = () => {
    console.log(111);
  };
  const handleChange = () => {
    console.log(222);
  };
  const { offices } = state;
  const { isFiltersShown } = props;
  console.log(setState);
  const filters: any = () => (
    <div className="container-fluid">
      <form action="" onSubmit={handleSubmit}>
        <div
          className="col-md-12 py-1"
        >
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
          <button
            type="submit"
            className="btn btn-primary px-4"
          >
            Найти
          </button>
        </div>
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
