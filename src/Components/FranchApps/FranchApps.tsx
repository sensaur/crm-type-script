import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import FranchAppList from './FranchAppList';
import { FRANCH } from '../../urls/urls';
import { getCurrentOfficeId, getTokenFromLocalStorage } from '../../auth/auth';

function FranchApps() {
  const [state, setState] = useState({
    items: [],
    filter: '',
    page: 1,
    count: 0,
    selected: [],
    isSuccess: false,
    isLoading: false,
    isAction: false,
    isShowForm: false,
    errors: null,
  });
  const fetchFranchiseApplications = async () => {
    const response: AxiosResponse = await axios(`${FRANCH}?&page=${state.page}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${getTokenFromLocalStorage()}`,
        office: getCurrentOfficeId(),
      },
    });
    console.log(response.data);
    setState((prev: any) => ({ ...prev, items: response.data.results }));
    return response.data;
  };
  useEffect(() => { fetchFranchiseApplications(); }, []);
  return (
    <div className="container-fluid">
      <h1>Франч</h1>
      <FranchAppList />
    </div>
  );
}

export default FranchApps;
