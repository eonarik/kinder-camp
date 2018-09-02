import { 
  VACANCIES, 
} from "../../const/url";

import { 
  RECEIVE_VACANCIES_LIST,
} from "../ActionTypes.js";
import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

let Actions = {};

// vacancies
Actions.receiveVacanciesList = function (options = {}) {
  return new Promise((resolve, reject) => {
    request(VACANCIES.LIST, {
      sort: 'createdon',
      dir: 'desc',
      ...options
    }, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_VACANCIES_LIST,
        vacancies: response.object
      });
      resolve(response.object);
    });
  });
};
Actions.addVacancy = function (params = {}) {
  return new Promise((resolve, reject) => {
    request(VACANCIES.CREATE, params, (response) => {
      if (response.success) {
        Actions.receiveVacanciesList().then(() => {
          resolve(response.object);
        });
      } else { 
        reject(response.data);
      }
    });
  });
};
Actions.updateVacancy = function (id, nextProps = null) {
  if (nextProps instanceof FormData) {
    nextProps.append('id', id);
  } else {
    nextProps = {
      id,
      ...nextProps
    }
  }
  return new Promise((resolve, reject) => {
    request(VACANCIES.UPDATE, nextProps, (response) => {
      if (response.success) {
        Actions.receiveVacanciesList().then(() => {
          // _Dispatcher.dispatch({
          //   type: UPDATE_VACANCY,
          //   updatedVacancyProps: response.object
          // });
          resolve(response.object);
        });
      } else {
        reject(response.data);
      }
    });
  });
};

export default Actions;