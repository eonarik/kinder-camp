import React, { Component } from 'react';

import ReservationsParentListItem from './ReservationsParentListItem';
import ReservationsList from '../Reservations/ReservationsList';

class ReservationsParentList extends Component {  
  render() {
    return (
      <ReservationsList 
        ItemTpl={ReservationsParentListItem}
        showFilterItems={{
          date: true,
          show_deleted: true,
        }}
      />
    );
  }
}

export default ReservationsParentList;