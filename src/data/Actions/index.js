import {
  REQUEST
} from "../ActionTypes.js";
import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

import userActions from './users';
import campActions from './camps';
import programActions from './programs';
import fileActions from './files';
import tariffActions from './tariffs';
import campProgramActions from './camp_programs';
import paramActions from './params';
import vacancyActions from './vacancies';
import reservationActions from './reservations';

let Actions = {};

Actions.startRequest = function () {
  _Dispatcher.dispatch({
    type: REQUEST,
    loading: true
  });
}
Actions.endRequest = function () {
  _Dispatcher.dispatch({
    type: REQUEST,
    loading: false
  });
}

Object.assign(
  Actions
  ,userActions
  ,campActions
  ,programActions
  ,fileActions
  ,tariffActions
  ,campProgramActions
  ,paramActions
  ,vacancyActions
  ,reservationActions
);

// module.exports = Actions;
export default Actions;