import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import FranchAppList from './FranchAppList';
import { FRANCH } from '../../urls/urls';
import { getCurrentOfficeId, getTokenFromLocalStorage } from '../../auth/auth';

// interface FranchItem {
//   id: number
//   username: string
//   first_name: string,
//   last_name: string
//   email: string
// }
//
// interface FranchProps {
//   items: FranchItem[];
// }

function FranchApps() {
  const [state, setState] = useState({
    items: [],
    filter: '&country=russia',
    page: 1,
    count: 0,
    selected: [],
    isSuccess: false,
    isLoading: false,
    isAction: false,
    isShowForm: false,
    errors: null,
  });

  const fetchFranchApps = async () => {
    const response: AxiosResponse = await axios(`${FRANCH}?${state.filter}&page=${state.page}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${getTokenFromLocalStorage()}`,
        office: getCurrentOfficeId(),
      },
    });
    // console.log(response.data);
    setState((prev: any) => (
      { ...prev, items: response.data.results, count: response.data.count }
    ));
    return response.data;
  };
  // const handleFilter = (filter: any) => {
  //   setState((prev: any) => ({ ...prev, filter }));
  // };
  useEffect(() => {
    fetchFranchApps();
  }, []);
  // console.log(handleFilter);
  return (
    <div className="container-fluid">
      <h3>
        Всего:&nbsp;
        {state.count}
      </h3>
      <FranchAppList items={state.items} />
    </div>
  );
}

export default FranchApps;
