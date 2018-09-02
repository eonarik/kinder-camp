import { 
  STATUSES,
  CAMPS, 
  TAGS, 
} from "../../const/url";

import {
  RECEIVE_STATUSES_LIST,
  RECEIVE_CAMPS_LIST,
  UPDATE_CAMP,
  MAKE_UPDATE_CAMP
} from "../ActionTypes.js";
import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

import { limitCamps } from "../../config";

let Actions = {};

// tags
Actions.updateTag = function (options) {
  return new Promise((resolve, reject) => {
    request(TAGS.UPDATE, options, (response) => {
      resolve(response.object);
    });
  });
};

// statuses
Actions.receiveStatusesList = function () {
  return new Promise((resolve, reject) => {
    request(STATUSES.LIST, {
      limit: limitCamps
    }, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_STATUSES_LIST,
        statuses: response.object
      });
      resolve(response.object);
    });
  });
};

// camps
Actions.receiveCampsList = function () {
  return new Promise((resolve, reject) => {
    request(CAMPS.LIST, {
      limit: limitCamps
    }, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_CAMPS_LIST,
        camps: response.object
      });
      resolve(response.object);
    });
  });
};
Actions.addCamp = function (params = {}) {
  return new Promise((resolve, reject) => {
    request(CAMPS.CREATE, params, (response) => {
      Actions.receiveCampsList().then(() => {
        resolve(response.object);
      });
    });
  });
};
Actions.updateCamp = function (id, nextProps = null) {
  return new Promise((resolve, reject) => {
    request(CAMPS.UPDATE, {
      id,
      ...nextProps
    }, (response) => {
      _Dispatcher.dispatch({
        type: UPDATE_CAMP,
        updatedCampProps: response.object
      });
      
      resolve(response.object);
    });
  });
};
Actions.makeUpdatedCamp = function (id) {
  _Dispatcher.dispatch({
    type: MAKE_UPDATE_CAMP,
    id
  });
}

export default Actions;