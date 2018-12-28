import React, { Component } from 'react';

import ReservationsList from './ReservationsList'; 
import ReservationsListItem from './ReservationsListItem';

class Reservations extends Component {
  render() {
    return (
      <div>
        <h4 className="text-success">Бронирования</h4>
        <ReservationsList
          ItemTpl={ReservationsListItem}
        />
      </div>
    );
  }
}

export default Reservations;