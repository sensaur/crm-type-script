import { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FRANCH } from '../../urls/urls';
import { getCurrentOfficeId, getTokenFromLocalStorage } from '../../auth/auth';

function FranchAppList() {
  const fetchFranchiseApplications = async () => {
    const response: AxiosResponse = await axios(`${FRANCH}?&page=1`, {
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${getTokenFromLocalStorage()}`,
        office: 836,
        // @ts-ignore
        office: getCurrentOfficeId(),
      },
    });
    console.log(response);
    return response;
  };
  useEffect(() => { fetchFranchiseApplications(); }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">*</th>
          <th scope="col">Номер заявки</th>
          <th scope="col">Дата</th>
          <th scope="col">Статус</th>
          <th scope="col">Источник</th>
          <th scope="col">Заявитель</th>
          <th scope="col">Опыт в туризме</th>
          <th scope="col">Офис</th>
          <th scope="col">Страна</th>
          <th scope="col">Менеджер</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
}

export default FranchAppList;
