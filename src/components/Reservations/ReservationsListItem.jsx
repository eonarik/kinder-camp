import React, { Component } from 'react';

class ReservationsListItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      deleted: props.obj.deleted,
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
        <div className={"reservation " + (obj.updatedby ? " reservation--new" : "")}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationsListItem;