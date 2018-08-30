import React, { Component } from 'react';

import ReservationsParentList from './ReservationsParentList'; 

class ReservationsParent extends Component {
  render() {
    return (
      <div>
        <h4 className="text-success">Бронирования</h4>
        <ReservationsParentList />
      </div>
    );
  }
}

export default ReservationsParent;