import { 
  TARIFFS, 
} from "../../const/url";

import request from '../../inc/request';

let Actions = {};

// tariffs
Actions.receiveTariffsList = function ({ camp_id }) {
  return new Promise((resolve, reject) => {
    request(TARIFFS.LIST, {
      camp_id
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.addTariff = function ({ camp_id }) {
  return new Promise((resolve, reject) => {
    request(TARIFFS.CREATE, {
      camp_id
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.updateTariff = function (id, params) {
  return new Promise((resolve, reject) => {
    request(TARIFFS.UPDATE, {
      id,
      ...params
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.deleteTariff = function (id) {
  return new Promise((resolve, reject) => {
    request(TARIFFS.UPDATE, {
      id,
      deleted: 1
    }, (response) => {
      resolve();
    });
  });
}

export default Actions;