import moment from 'moment';
import './FranchApp.css';

const FRANCH_STATUS = {
  deciding: 'новая',
  franchasing: 'франчайзинг',
  subagent: 'субагент',
  refuse: 'мы отказали',
  new: 'новая',
  call_three_days: 'звонок 3 дня',
  call_week: 'звонок неделя',
  call_month: 'звонок месяц',
  call_three_months: 'звонок 3 месяца',
  call_half_year: 'звонок полгода',
  choose_competitor: 'выбрали конкурента',
  cancel_business: 'отказ от бизнеса',
  touragent_online: 'турагент онлайн',
  no_call_answered: 'не дозвонились',
  potential: 'потенциал',
  freelancer: 'фрилансер',
};

const FRANCH_COUNTRIES = {
  russia: 'Россия',
  kazakhstan: 'Казахстан',
  belorussia: 'Белоруссия',
};

const FRANCH_SOURCE = {
  odnoklassniki: 'одноклассники',
  lead_from_site: 'заявка с сайта',
  VK: 'в контакте',
  mailing: 'рассылка',
  instagram: 'инстаграм',
  facebook: 'фейсбук',
  google: 'контекстная Гугл',
  yandex: 'контекстная Яндекс',
};

const FRANCH_STATUS_CLASS = {
  new: 'badge-danger',
  deciding: 'badge-danger',
  franchasing: 'badge-success',
  subagent: 'badge-primary',
  refuse: 'badge-brown',
  call_three_days: 'badge-purple',
  call_week: 'badge-purple',
  call_month: 'badge-purple',
  call_three_months: 'badge-purple',
  call_half_year: 'badge-purple',
  choose_competitor: 'badge-brown',
  cancel_business: 'badge-red',
  touragent_online: 'badge-primary',
  no_call_answered: 'badge-gray',
  potential: 'badge-pink',
  freelancer: 'badge-orange',
};

function FranchAppList(props: any) {
  const { items } = props;
  return (
    <div className="container-fluid">
      <table className="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th className="text-center">*</th>
            <th className="text-center">Номер</th>
            <th className="text-center">Дата</th>
            <th className="text-center">Статус</th>
            <th className="text-center">Источник</th>
            <th className="text-center">Заявитель</th>
            <th className="text-center">Опыт</th>
            <th className="text-center">Офис</th>
            <th className="text-center">Страна</th>
            <th className="text-center">Менеджер</th>
          </tr>
        </thead>
        <tbody>
          {items?.length ? items.map((item: any) => (
            <tr key={item.id}>
              <td className="text-center tableItem">
                <input
                  type="checkbox"
                  id={`application-${item.id}`}
                />
              </td>
              <td className="text-center tableItem">
                {item.id}
              </td>
              <td className="text-center tableItem">
                {/*   <Link to={`/franchising/${item.id}`}> */}
                {moment(item.created).format('DD.MM.YY HH:mm')}
                {/* </Link> */}
              </td>
              <td className="text-center tableItem">
                {Object.prototype.hasOwnProperty.call(FRANCH_STATUS, item.status) ? (
                  <span
                    className={`badge badge-pill ${FRANCH_STATUS_CLASS[item.status as keyof typeof FRANCH_STATUS_CLASS]}`}
                  >
                    {FRANCH_STATUS[item.status as keyof typeof FRANCH_STATUS]}
                  </span>
                )
                  : <span className="badge badge-default badge-pill">не задан</span>}
              </td>
              <td className="text-center tableItem">
                {(FRANCH_SOURCE[item?.source as keyof typeof FRANCH_SOURCE])
                  ? <span>{FRANCH_SOURCE[item.source as keyof typeof FRANCH_SOURCE]}</span>
                  : <span className="badge badge-default badge-pill">не задан</span>}
              </td>
              <td className="text-center tableItem">
                <div>
                  {item.applicant.name}
                </div>
                {/* {item.applicant.email} */}
                {/* , */}
                {/* &nbsp; */}
                {/* {item.applicant.phone} */}
              </td>
              <td className="text-center tableItem">
                {item.applicant.have_tourism_experience ? <span>да</span> : <span>нет</span>}
              </td>
              <td className="text-center tableItem">
                {item.office.address}
                {/* &nbsp; */}
                {/* {item.office.city.name} */}
              </td>
              <td className="text-center tableItem">
                {(FRANCH_COUNTRIES[item?.applicant.country as keyof typeof FRANCH_COUNTRIES])
                  ? (
                    <span>
                      {FRANCH_COUNTRIES[item?.applicant.country as keyof typeof FRANCH_COUNTRIES]}
                    </span>
                  )
                  : <span className="badge badge-default badge-pill">не задан</span>}
              </td>
              <td className="text-center tableItem">
                {item.manager ? `${item.manager.last_name} ${item.manager.first_name}` : ''}
              </td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
}

export default FranchAppList;
