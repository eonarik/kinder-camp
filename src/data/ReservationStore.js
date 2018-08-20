import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import {
  RECEIVE_RESERVATIONS_LIST,
  UPDATE_RESERVATION
} from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

class ReservationStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      reservations: null,
      updatedReservationProps: null
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case UPDATE_RESERVATION:
        return state.set('updatedReservationProps', action.updatedReservationProps);

      case RECEIVE_RESERVATIONS_LIST:
        return state.set('reservations', action.reservations);

      default:
        return state;
    }
  }
}
export default new ReservationStore();