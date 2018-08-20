import { 
  RESERVATIONS, 
} from "../../const/url";

import { 
  RECEIVE_RESERVATIONS_LIST,
  UPDATE_RESERVATION
} from "../ActionTypes.js";

import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

let Actions = {};

Actions.receiveReservationsList = function (options = {}) {
  return new Promise((resolve, reject) => {
    request(RESERVATIONS.LIST, {
      sort: 'createdon',
      dir: 'desc',
      ...options
    }, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_RESERVATIONS_LIST,
        reservations: response.object
      });
      resolve(response.object);
    });
  });
};

Actions.updateReservation = function (id, options = {}) {
  return new Promise((resolve, reject) => {
    request(RESERVATIONS.UPDATE, {
      id,
      ...options
    }, (response) => {
      resolve(response.object);
    });
  });
};

export default Actions;