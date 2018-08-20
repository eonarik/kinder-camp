import { 
  PROGRAMS, 
} from "../../const/url";

import {
  RECEIVE_PROGRAMS_LIST,
  UPDATE_PROGRAM
} from "../ActionTypes.js";
import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

import { limitPrograms } from "../../config";

let Actions = {};

// programs
Actions.receiveProgramsList = function (params = {}) {
  return new Promise((resolve, reject) => {
    request(PROGRAMS.LIST, {
      limit: limitPrograms,
      ...params
    }, (response) => {
      if (!params.camp_id) {
        _Dispatcher.dispatch({
          type: RECEIVE_PROGRAMS_LIST,
          programs: response.object
        });
      }
      resolve(response.object);
    });
  });
};
Actions.addProgram = function (params = {}) {
  return new Promise((resolve, reject) => {
    request(PROGRAMS.CREATE, params, (response) => {
      Actions.receiveProgramsList().then(() => {
        resolve(response.object);
      });
    });
  });
};
Actions.updateProgram = function (id, nextProps) {
  return new Promise((resolve, reject) => {
    request(PROGRAMS.UPDATE, {
      id,
      ...nextProps
    }, (response) => {
      _Dispatcher.dispatch({
        type: UPDATE_PROGRAM,
        updatedProgramProps: response.object
      });
      resolve(response.object);
    });
  });
};

export default Actions;