import React, { Component } from 'react';

class ReservationsParentListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleted: props.obj.deleted,
      showExt: false,
    }
  }

  toggleDelete = () => {
    this.props.onUpdateReservation(this.props.obj.id, {
      deleted: this.state.deleted ? 0 : 1
    }).then(this.props.onUpdateReservationsList);
  }

  setStatus = (e) => {
    this.props.onUpdateReservation(this.props.obj.id, {
      status_id: e.target.value
    }).then(this.props.onUpdateReservationsList);
  }

  toggleShowExt = () => {
    this.setState({
      showExt: !this.state.showExt
    });
  }

  render() {
    let obj = this.props.obj;
    let _childs = [];
    for (let i in obj.childs) {
      let child = obj.childs[i];
      _childs.push(
        <p>{child.fullname}, {child.dob}</p>
      );
    }

    return (
      <div className="col-xs-12">
        <div className="reservation">
          <div className="row flex-row">
            <div className="reservation__block col-xs-12 col-md-2">
              <div className="reservation__external">
                {obj.external_id}
              </div>
            </div>
            <div className="reservation__block col-xs-12 col-md-5">
              <p>
                Ожидайте звонка представителя лагеря &nbsp;
                <a href={'/camps/' + obj.camp_external_id} className="text-underline">{obj.camp_name}</a>. Подробности заказа
                отправлены вам на <b>{obj.user_email}</b>
              </p>
              <p>
                Вы можете позвонить в лагерь самостоятельно: <b>{obj.manager_phone}</b><br />
                Не забудьте указать номер вашего бронирования: <b>{obj.external_id}</b>
              </p>
            </div>
            <div className="reservation__block col-xs-12 col-md-3">
              <div className="reservation__name">
                {obj.tariff_name}: {obj.tariff_longtitle} <br />
                (с {obj.tariff_period_start} до {obj.tariff_period_end})
              </div>
              <div className="reservation__price">
                {obj.count} х {obj.tariff_price} р. = <span>{obj.tariff_price * obj.count}</span> р.
              </div>
              <a className="btn btn-success btn-sm" href="#" target="_blank">Онлайн оплата</a>
            </div>
            <div className="reservation__block col-xs-12 col-md-2">
              <div className="reservation__status" style={{
                backgroundColor: obj.status_color
              }}>
                {obj.status_name}
              </div>

              <p>
                {this.state.deleted
                  ? <button className="btn btn-warning btn-sm btn-block"
                    type="button" onClick={this.toggleDelete}>Восстановить</button>
                  : <button className="btn btn-danger btn-sm btn-block"
                    type="button" onClick={this.toggleDelete}>Удалить</button>
                }
                {!this.state.showExt
                  ? <button className="btn btn-success btn-sm btn-block"
                    type="button" onClick={this.toggleShowExt}>Подробнее</button>
                  : <button className="btn btn-default btn-sm btn-block"
                    type="button" onClick={this.toggleShowExt}>Скрыть</button>
                }
              </p>
            </div>
          </div>

          {this.state.showExt
            ? (
              <div className="row flex-row">
                <div className="reservation__block col-xs-12 col-md-7">
                  <h5>Описание путёвки</h5>
                  <ul class="reservation__list">
                    <li>
                      <span>Дата бронирования</span>
                      <span>{obj.reserve_date}</span>
                    </li>
                    <li>
                      <span>Лагерь</span>
                      <span><span className="text-success">ID {obj.camp_external_id}</span> {obj.camp_name}</span>
                    </li>
                    <li>
                      <span>Тип путевки</span>
                      <span>Обычная</span>
                    </li>
                    <li>
                      <span>Кол-во путевок</span>
                      <span>{obj.count}</span>
                    </li>
                    <li>
                      <span>Стоимость</span>
                      <span>{obj.tariff_price}</span>
                    </li>
                    <li>
                      <span>Смена</span>
                      <span>{obj.tariff_name}</span>
                    </li>
                    <li>
                      <span>Гос.компенсация:</span>
                      <span>Нет</span>
                    </li>
                  </ul>

                  <h5>Контактное лицо</h5>
                  <ul class="reservation__list">
                    <li>
                      <span>Фио</span>
                      <span>{obj.user_fullname}</span>
                    </li>
                    <li>
                      <span>E-Mail</span>
                      <span>{obj.user_email}</span>
                    </li>
                    <li>
                      <span>Телефон</span>
                      <span>{obj.user_phone}</span>
                    </li>
                  </ul>

                  <h5>Информация о детях</h5>
                  {_childs}
                </div>
                <div className="reservation__block col-xs-12 col-md-5">
                  <div className="flex-row flex-row--vjustify">
                    <div>
                      <h5>Необходимые документы</h5>
                      <ul className="list-ul">
                        <li>Копия свидетельства о рождении или паспорта ребенка</li>
                        <li>Копия медецинского полиса ребенка</li>
                        <li>Медицинская справка 079-У с выпиской о прививках</li>
                        <li>Медицинская справка об отсутствии контактов с инфекционными больными (действительна 3 дня)</li>
                      </ul>
                    </div>
                    <div className="reservation__regards">
                      <p>Желаем отличного отдыха вашему
                      ребенку, руководитель отдела по работе
                  с клиентами</p>
                      {obj.director_fullname && (<h4>{obj.director_fullname}</h4>)}
                      <div>{obj.director_email}</div>
                      <div>{obj.director_phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : null
          }
        </div>
      </div>
    );
  }
}

export default ReservationsParentListItem;