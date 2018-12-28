import React, { Component } from 'react';

import { Container } from "flux/utils";
import ReservationStore from "../../data/ReservationStore";
import CampStore from "../../data/CampStore";
import Actions from '../../data/Actions/reservations';
import ActionsCamps from '../../data/Actions/camps';

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
      onReceiveStatusesList: ActionsCamps.receiveStatusesList,
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

  reservationsRender = () => {
    let _reservations = [];
    let ItemTpl = this.props.ItemTpl;
    if (typeof ItemTpl !== 'undefined') {
      for (let i in this.state.reservations) {
        let reservation = this.state.reservations[i];
        _reservations.push(
          <ItemTpl 
            key={reservation.id}
            obj={reservation}
            onUpdateReservation={this.state.onUpdateReservation}
            onUpdateReservationsList={this.onUpdateReservationsList}
            statuses={this.state.statuses}
          />
        );
      }
    }

    return _reservations;
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
    let _reservations = this.reservationsRender();
    let showFilterItems = this.props.showFilterItems

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
            {!(!showFilterItems || showFilterItems.date) ||
              <div className="col-auto">
                <input className="form-control" name="date" type="date"
                  ref={(input) => { this.inputs.date = input; }}
                  onChange={this.filter}
                />
              </div>
            }
            {!(!showFilterItems || showFilterItems.status_id) ||
              <div className="col-auto">
                <select className="form-control" name="status_id"
                  ref={(input) => { this.inputs.status_id = input; }}
                  onChange={this.filter}
                >
                  {statusesOptions}
                </select>
              </div>
            }
            <div className="col-auto">
              {!(!showFilterItems || showFilterItems.only_new) ||
                <div className="checkbox">
                  <label>
                    <input name="only_new" type="checkbox"
                      ref={(input) => { this.inputs.only_new = input; }}
                      onChange={this.filter}
                    /> Только новые
                  </label>
                </div>
              }
              {!(!showFilterItems || showFilterItems.show_deleted) ||
                <div className="checkbox">
                  <label>
                    <input name="show_deleted" type="checkbox"
                      ref={(input) => { this.inputs.show_deleted = input; }}
                      onChange={this.filter}
                    /> Только удаленные
                  </label>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="row flex-row">
          {_reservations}
        </div>
      </div>
    );
  }
}

export default Container.create(ReservationsList);