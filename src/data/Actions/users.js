import { 
  USERS
} from "../../const/url";

import {
  RECEIVE_USER_PROFILE,
  UPDATE_USER_PROFILE
} from "../ActionTypes.js";
import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

let Actions = {};

// users
Actions.receiveUserProfile = function () {
  return new Promise((resolve, reject) => {
    request(USERS.OWN_PROFILE, {}, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_USER_PROFILE,
        profile: response.object
      });
      resolve(response.object);
    });
  });
};
Actions.updateUser = function (params = {}) {
  return new Promise((resolve, reject) => {
    request(USERS.UPDATE, params, (response) => {
      _Dispatcher.dispatch({
        type: UPDATE_USER_PROFILE,
        profile: response.object
      });
      resolve(response.object);
    });
  });
};

export default Actions;