import { 
  PARAMS 
} from "../../const/url";

import request from '../../inc/request';

let Actions = {};

// params
Actions.addParam = function (nextProps) {
  return new Promise((resolve, reject) => {
    request(PARAMS.CREATE, nextProps, (response) => {
      resolve(response.object);
    });
  });
}
Actions.updateParam = function (param_id, nextProps) {
  return new Promise((resolve, reject) => {
    request(PARAMS.UPDATE, {
      id: param_id,
      ...nextProps
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.deleteParam = function (param_id) {
  return new Promise((resolve, reject) => {
    request(PARAMS.UPDATE, {
      action: 'delete',
      id: param_id
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.receiveParamsList = function (nextProps) {
  return new Promise((resolve, reject) => {
    request(PARAMS.LIST, nextProps, (response) => {
      resolve(response.object);
    });
  });
}

export default Actions;