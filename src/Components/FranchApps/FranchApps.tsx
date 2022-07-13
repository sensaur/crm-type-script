import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import FranchAppList from './FranchAppList';
import { FRANCH } from '../../urls/urls';
import { getCurrentOfficeId, getTokenFromLocalStorage } from '../../auth/auth';
import Paginator from '../Paginator/Paginator';

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
    filter: '',
    page: 1,
    count: '',
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
    setState((prev: any) => (
      { ...prev, items: response.data.results, count: response.data.count }
    ));
    return response.data;
  };
  // const handleFilter = (filter: any) => {
  //   setState((prev: any) => ({ ...prev, filter }));
  // };

  const handlePageChange = (data: any) => {
    console.log('data.selected==>', data.selected);
    setState((prev: any) => ({ ...prev, page: data.selected + 1 }));
  };

  useEffect(() => {
    fetchFranchApps();
  }, [state.page]);

  const { count, page, items } = state;
  return (
    <>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h5>
          Всего:&nbsp;
          {count}
        </h5>
        <Paginator
          total={count}
          onPageChange={handlePageChange}
          forcePage={0}
          initialPage={page - 1}
          curPage={page}
        />
      </div>
      <FranchAppList items={items} />
    </>
  );
}

export default FranchApps;
