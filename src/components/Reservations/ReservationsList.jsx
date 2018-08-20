import React, { Component } from 'react';

import { Container } from "flux/utils";
import ReservationStore from "../../data/ReservationStore";
import CampStore from "../../data/CampStore";
import Actions from '../../data/Actions';

class ReservationsListItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      deleted: props.obj.deleted,
      // showExt: false,
    }
  }

  toggleDelete = () => {
    this.props.onUpdateReservation(this.props.obj.id, {
      deleted: this.state.deleted ? 0 : 1
    }).then(this.props.onUpdateReservationsList);
  }

  // toggleShowExt = () => {
  //   this.setState({
  //     showExt: !this.state.showExt,
  //   });
  // }

  setStatus = (e) => {
    this.props.onUpdateReservation(this.props.obj.id, {
      status_id: e.target.value
    }).then(this.props.onUpdateReservationsList);
  }

  render() {
    let obj = this.props.obj;

    let statusesOptions = [];
    for (let i in this.props.statuses) {
      let st = this.props.statuses[i];
      statusesOptions.push(
        <option key={st.id} value={st.id} style={{
          backgroundColor: st.color,
          fontSize: 17,
        }}>{st.name}</option>
      );
    }

    return (
      <div className="col-xs-12 col-md-6">
        <div className={"reservation " + (obj.updatedby ? "reservation--new" : "")}>
          <div className="row flex-row">
            <div className="col-xs-12 col-md-5">
              <div>ФИО:</div>
              <div className="reservation__title">{obj.user_fullname}</div>
              <div>Телефон:</div>
              <div className="reservation__title">{obj.user_phone}</div>
            </div>
            <div className="col-xs-12 col-md-7">
              <div className="reservation__title">
                {obj.camp_name}
              </div>
              <div className="reservation__title">
                {obj.tariff_name}: {obj.tariff_longtitle} <br />
                (с {obj.tariff_period_start} до {obj.tariff_period_end})
              </div>
            </div>
          </div>
          <div className="row flex-row flex-row--vcenter">
            <div className="col-xs-12 col-md-5">
              {obj.deleted
                ? <button className="btn btn-link text-success" onClick={this.toggleDelete}>Восстановить заявку</button>
                : <button className="btn btn-link text-danger" onClick={this.toggleDelete}>Удалить заявку</button>
              }
            </div>
            <div className="col-xs-12 col-md-7">
              <div className="row flex-row flex-row--justify flex-row--vcenter flex-row--nowrap">
                <div className="col-xs-6">
                  <div className="h5 mb-0">{obj.reserve_date}</div>
                </div>
                <div className="col-xs-6">
                  <select className="form-control input-sm" style={{
                    backgroundColor: obj.status_color,
                    color: '#FFF',
                  }} value={obj.status_id} onChange={this.setStatus}>
                    {statusesOptions}
                  </select>
                </div>
                {/* <div className="reservation__status" style={{
                  backgroundColor: status.color,
                  height: 26,
                  marginBottom: 0
                }}>{status.name}</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ReservationsList extends Component {

  inputs = {}

  static getStores() {
    return [ReservationStore, CampStore];
  }

  static calculateState(prevState) {
    return {
      onUpdateReservation: Actions.updateReservation,
      onReceiveReservationsList: Actions.receiveReservationsList,
      reservations: ReservationStore.getState().get('reservations'),
      onReceiveStatusesList: Actions.receiveStatusesList,
      statuses: CampStore.getState().get('statuses'),
    };
  }

  filter = () => {
    let data = {};
    for (let key in this.inputs) {
      let input = this.inputs[key];
      switch (key) {
        case 'show_deleted':
        case 'only_new':
          if (input.checked) {
            data[key] = 1;
          }
          break;

        default:
          data[key] = input.value;
      }
    }
    this.state.onReceiveReservationsList(data);
  }

  onUpdateReservationsList = () => {
    this.filter();
  }

  componentDidMount = () => {
    if (!this.state.reservations || !this.state.reservations.length) {
      this.state.onReceiveReservationsList();
    }
    if (!this.state.statuses || !this.state.statuses.length) {
      this.state.onReceiveStatusesList();
    }
  }

  render() {
    let reservations = [];

    for (let i in this.state.reservations) {
      var reservation = this.state.reservations[i];
      reservations.push(
        <ReservationsListItem 
          key={reservation.id}
          obj={reservation}
          onUpdateReservation={this.state.onUpdateReservation}
          onUpdateReservationsList={this.onUpdateReservationsList}
          statuses={this.state.statuses}
        />
      );
    }

    let statusesOptions = [
      <option key="0" value="0">...Выберите статус</option>
    ];
    for (let i in this.state.statuses) {
      let st = this.state.statuses[i];
      statusesOptions.push(
        <option key={st.id} value={st.id}>{st.name}</option>
      );
    }

    return (
      <div>
        <div className="form-group">
          <div className="row flex-row flex-row--vcenter">
            <div className="col-auto">
              <input className="form-control" name="date" type="date"
                ref={(input) => { this.inputs.date = input; }}
                onChange={this.filter}
              />
            </div>
            <div className="col-auto">
              <select className="form-control" name="status_id"
                ref={(input) => { this.inputs.status_id = input; }}
                onChange={this.filter}
              >
                {statusesOptions}
              </select>
            </div>
            <div className="col-auto">
              <div className="checkbox">
                <label>
                  <input name="only_new" type="checkbox"
                    ref={(input) => { this.inputs.only_new = input; }}
                    onChange={this.filter}
                  /> Только новые
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input name="show_deleted" type="checkbox"
                    ref={(input) => { this.inputs.show_deleted = input; }}
                    onChange={this.filter}
                  /> Показать удаленные
                </label>
              </div>
            </div>
            {/* <div className="col-auto">
              <button className="btn btn-lg btn-success" onClick={this.filter}>Показать</button>
            </div> */}
          </div>
        </div>
        <div className="row flex-row">
          {reservations}
        </div>
      </div>
    );
  }
}

export default Container.create(ReservationsList);

// <div className="reservation">
//   <div className="row flex-row">
//     <div className="reservation__block col-xs-12 col-md-2">
//       <div className="reservation__external">
//         {obj.external_id}
//       </div>
//     </div>
//     <div className="reservation__block col-xs-12 col-md-5">
//       <p> 
//         Ожидайте звонка представителя лагеря &nbsp;
//         <a href="#" className="text-underline">{obj.camp_name}</a>. Подробности заказа 
//         отправлены вам на <b>{obj.user_email}</b>
//       </p>
//       <p>
//         Вы можете позвонить в лагерь самостоятельно: <b>{obj.manager_phone}</b><br />
//         Не забудьте указать номер вашего бронирования: <b>{obj.external_id}</b>
//       </p>
//     </div>
//     <div className="reservation__block col-xs-12 col-md-3">
//       <div className="reservation__name">
//         {obj.tariff_name}: {obj.tariff_longtitle} <br />
//         (с {obj.tariff_period_start} до {obj.tariff_period_end})
//       </div>
//       <div className="reservation__price">
//         {obj.count} х {obj.tariff_price} р. = <span>{obj.tariff_price * obj.count}</span> р.
//       </div>
//       <a className="btn btn-success btn-sm" href="#" target="_blank">Онлайн оплата</a>
//     </div>
//     <div className="reservation__block col-xs-12 col-md-2">
//       <div className="reservation__status" style={{
//         backgroundColor: obj.status_color
//       }}>
//         {obj.status_name}
//       </div>

//       <p>
//         {this.state.deleted
//           ? <button className="btn btn-danger btn-sm btn-block" 
//               type="button" onClick={this.toggleDelete}>Восстановить</button>
//           : <button className="btn btn-danger btn-sm btn-block" 
//               type="button" onClick={this.toggleDelete}>Удалить</button>
//         }
//         {!this.state.showExt
//           ? <button className="btn btn-success btn-sm btn-block" 
//             type="button" onClick={this.toggleShowExt}>Подробнее</button>
//           : <button className="btn btn-default btn-sm btn-block" 
//             type="button" onClick={this.toggleShowExt}>Скрыть</button>
//         }
//       </p>
//     </div>
//   </div>

//   {this.state.showExt
//     ? (
//     <div className="row flex-row">
//       <div className="reservation__block col-xs-12 col-md-7">
//         <h5>Описание путёвки</h5>
//         <ul class="reservation__list">
//           <li>
//             <span>Дата бронирования</span>
//             <span>{obj.reserve_date}</span>
//           </li>
//           <li>
//             <span>Лагерь</span>
//             <span><span className="text-success">ID {obj.camp_external_id}</span> {obj.camp_name}</span>
//           </li>
//           <li>
//             <span>Тип путевки</span> 
//             <span>Обычная</span>
//           </li>
//           <li>
//             <span>Кол-во путевок</span> 
//             <span>{obj.count}</span>
//           </li>
//           <li>
//             <span>Стоимость</span> 
//             <span>{obj.tariff_price}</span>
//           </li>
//           <li>
//             <span>Смена</span> 
//             <span>{obj.tariff_name}</span>
//           </li>
//           <li>
//             <span>Гос.компенсация:</span> 
//             <span>Нет</span>
//           </li>
//         </ul>

//         <h5>Контактное лицо</h5>
//         <ul class="reservation__list">
//           <li>
//             <span>Фио</span>
//             <span>{obj.user_fullname}</span>
//           </li>
//           <li>
//             <span>E-Mail</span>
//             <span>{obj.user_email}</span>
//           </li>
//           <li>
//             <span>Телефон</span> 
//             <span>{obj.user_phone}</span>
//           </li>
//         </ul>

//         <h5>Информация о детях</h5>
//         <p>Сеньков Павел Валентинович 2003-08-01</p>
//       </div>
//       <div className="reservation__block col-xs-12 col-md-5">
//         <div className="flex-row flex-row--vjustify">
//           <div>
//             <h5>Необходимые документы</h5>
//             <ul className="list-ul">
//               <li>Копия свидетельства о рождении или паспорта ребенка</li>
//               <li>Копия медецинского полиса ребенка</li>
//               <li>Медицинская справка 079-У с выпиской о прививках</li>
//               <li>Медицинская справка об отсутствии контактов с инфекционными больными (действительна 3 дня)</li>
//             </ul>
//           </div>
//           <div className="reservation__regards">
//             <p>Желаем отличного отдыха вашему 
//             ребенку, руководитель отдела по работе 
//             с клиентами</p>
//             {obj.director_fullname && (<h4>{obj.director_fullname}</h4>)}
//             <div>{obj.director_email}</div>
//             <div>{obj.director_phone}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//     )
//     : null
//   }
// </div>