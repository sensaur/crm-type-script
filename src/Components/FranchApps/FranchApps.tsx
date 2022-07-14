import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import FranchAppList from './FranchAppList';
import { FRANCH } from '../../urls/urls';
import { getCurrentOfficeId, getTokenFromLocalStorage } from '../../auth/auth';
import Paginator from '../Paginator/Paginator';
import FranchAppFilterButton from './FranchAppFilterButton';
import FranchAppFilters from './FranchAppFilters';

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
    isFiltersShown: false,
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

  const handleShowFilters = () => {
    console.log(state.isFiltersShown);
    setState((prev: any) => ({ ...prev, isFiltersShown: !state.isFiltersShown }));
  };

  const {
    count, page, items, isFiltersShown,
  } = state;
  return (
    <>
      {/* <div className="container-fluid d-flex justify-content-between align-items-center"> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h5>
              Всего:&nbsp;
              {count}
            </h5>
          </div>
          <div className="col">
            <FranchAppFilterButton
              isFiltersShown={isFiltersShown}
              handleShowFilters={handleShowFilters}
            />
          </div>
          <div className="col">
            <Paginator
              total={count}
              onPageChange={handlePageChange}
              forcePage={0}
              initialPage={page - 1}
              curPage={page}
            />
          </div>
        </div>
        <FranchAppFilters
          isFiltersShown={isFiltersShown}
        />
      </div>
      <FranchAppList items={items} />
    </>
  );
}

export default FranchApps;
