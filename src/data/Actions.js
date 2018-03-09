import ActionTypes from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

import request from '../inc/request';

const URL = require('../const/url');

const config = require('../config');

let Actions = {};

Actions.startRequest = function () {
  _Dispatcher.dispatch({
    type: ActionTypes.REQUEST,
    loading: true
  });
}
Actions.endRequest = function () {
  _Dispatcher.dispatch({
    type: ActionTypes.REQUEST,
    loading: false
  });
}

// camps
Actions.receiveCampsList = function () {
  return new Promise((resolve, reject) => {
    request(URL.CAMPS.LIST, {
      limit: config.limitCamps
    }, (response) => {
      _Dispatcher.dispatch({
        type: ActionTypes.RECEIVE_CAMPS_LIST,
        camps: response.object
      });
      resolve(response.object);
    });
  });
};
Actions.addCamp = function (params = {}) {
  return new Promise((resolve, reject) => {
    request(URL.CAMPS.CREATE, params, (response) => {
      Actions.receiveCampsList().then(() => {
        resolve(response.object);
      });
    });
  });
};
Actions.updateCamp = function (id, nextProps = null) {
  return new Promise((resolve, reject) => {
    request(URL.CAMPS.UPDATE, {
      id,
      ...nextProps
    }, (response) => {
      _Dispatcher.dispatch({
        type: ActionTypes.UPDATE_CAMP,
        updatedCampProps: response.object
      });
      resolve(response.object);
    });
  });
};
Actions.makeUpdatedCamp = function (id) {
  _Dispatcher.dispatch({
    type: ActionTypes.MAKE_UPDATE_CAMP,
    id
  });
}

// programs
Actions.receiveProgramsList = function (params = {}) {
  return new Promise((resolve, reject) => {
    request(URL.PROGRAMS.LIST, {
      limit: config.limitPrograms,
      ...params
    }, (response) => {
      if (!params.camp_id) {
        _Dispatcher.dispatch({
          type: ActionTypes.RECEIVE_PROGRAMS_LIST,
          programs: response.object
        });
      }
      resolve(response.object);
    });
  });
};
Actions.addProgram = function (params = {}) {
  return new Promise((resolve, reject) => {
    request(URL.PROGRAMS.CREATE, params, (response) => {
      Actions.receiveProgramsList().then(() => {
        resolve(response.object);
      });
    });
  });
};
Actions.updateProgram = function (id, nextProps) {
  return new Promise((resolve, reject) => {
    request(URL.PROGRAMS.UPDATE, {
      id,
      ...nextProps
    }, (response) => {
      _Dispatcher.dispatch({
        type: ActionTypes.UPDATE_PROGRAM,
        updatedProgramProps: response.object
      });
      resolve(response.object);
    });
  });
};

// files
Actions.receiveFilesList = function ({ camp_id, types }) {
  return new Promise((resolve, reject) => {
    request(URL.IMAGES.LIST, {
      camp_id,
      types
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.deleteFile = function (id) {
  return new Promise((resolve, reject) => {
    request(URL.IMAGES.UPDATE, {
      id,
      delete: true,
    }, (response) => {
      resolve();
    });
  });
};
Actions.addFile = function ({ camp_id, file, type }) {
  return new Promise((resolve, reject) => {
    let post = new FormData();
    post.append('file', file);
    post.append('type_id', type);
    post.append('camp_id', camp_id);
    request(URL.IMAGES.CREATE, post, (response) => {
      resolve(response.object);
    });
  });
};

// tariffs
Actions.receiveTariffsList = function ({ camp_id }) {
  return new Promise((resolve, reject) => {
    request(URL.TARIFFS.LIST, {
      camp_id
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.addTariff = function ({ camp_id }) {
  return new Promise((resolve, reject) => {
    request(URL.TARIFFS.CREATE, {
      camp_id
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.updateTariff = function (id, params) {
  return new Promise((resolve, reject) => {
    request(URL.TARIFFS.UPDATE, {
      id,
      ...params
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.deleteTariff = function (id) {
  return new Promise((resolve, reject) => {
    request(URL.TARIFFS.UPDATE, {
      id,
      deleted: 1
    }, (response) => {
      resolve();
    });
  });
}

// camp_program
Actions.addProgramToCamp = function ({ program_id, camp_id }) {
  return new Promise((resolve, reject) => {
    request(URL.CAMP_PROGRAM.CREATE, {
      program_id,
      camp_id
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.deleteProgramToCamp = function ({ program_id, camp_id }) {
  return new Promise((resolve, reject) => {
    request(URL.CAMP_PROGRAM.UPDATE, {
      program_id,
      camp_id,
      deleted: true
    }, (response) => {
      resolve();
    });
  });
}

// module.exports = Actions;
export default Actions;