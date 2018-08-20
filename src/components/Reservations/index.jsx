import React, { Component } from 'react';

import ReservationsList from './ReservationsList'; 

class Reservations extends Component {
  render() {
    return (
      <div>
        <h4 className="text-success">Бронирования</h4>
        <ReservationsList />
      </div>
    );
  }
}

export default Reservations;