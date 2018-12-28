import { 
  RESUMES, 
} from "../../const/url";

import { 
  RECEIVE_RESUMES_LIST,
} from "../ActionTypes.js";

import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

let Actions = {};

Actions.receiveResumesFieldList = function (options = {}) {
  return new Promise((resolve, reject) => {
    request(RESUMES.FIELD_LIST, {}, (response) => {
      resolve(response.object);
    });
  });
};

Actions.receiveResumesList = function (options = {}) {
  return new Promise((resolve, reject) => {
    request(RESUMES.LIST, {
      sort: 'createdon',
      dir: 'desc',
      ...options
    }, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_RESUMES_LIST,
        resumes: response.object
      });
      resolve(response.object);
    });
  });
};

Actions.updateResume = function (id, options = {}) {
  return new Promise((resolve, reject) => {
    request(RESUMES.UPDATE, {
      id,
      ...options
    }, (response) => {
      resolve(response);
    });
  });
};

Actions.createResume = function (options = {}) {
  return new Promise((resolve, reject) => {
    request(RESUMES.CREATE, options, (response) => {
      Actions.receiveResumesList();
      resolve(response);
    });
  });
};

export default Actions;