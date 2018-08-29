import Actions from '../data/Actions';
import { notyConfig } from '../config';

// заменить на получение токена с сервера!
const userToken = '131a6f18175209af3e2f16a3150f960d';

const _TRANS = require('../const/trans');

const Noty = require('noty');
Noty.overrideDefaults(notyConfig);

const request = function (action, params, callback, error) {
  var formData;
  var is_notify = true;
  if (typeof params.not_notify !== 'undefined') {
    is_notify = false;
    delete params.not_notify;
  }
  var is_loader = true;
  if (typeof params.not_loader !== 'undefined') {
    is_loader = false;
    delete params.not_loader;
  }
  if (params instanceof FormData) {
    formData = params;
  } else {
    formData = new FormData();
    for (var key in params) {
      formData.append(key, params[key]);
    }
  }
  formData.append('userToken', userToken);

  var url = action;

  if (is_loader) {
    Actions.startRequest();
  }
  fetch(url, {
    method: 'post',
    // credentials: 'same-origin',
    // mode: 'no-cors',
    body: formData,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (is_loader) {
        Actions.endRequest();
      }
      if (data.success) {
        if (data.message && is_notify) {
          new Noty({
            text: data.message,
            type: 'success',
          }).show();
        }
      } else {
        if (data.message) {
          if (is_notify) {
            new Noty({
              text: data.message,
              type: 'error',
            }).show();
          }
        } else if (data.data.length) {
          if (is_notify) {
            for (let i in data.data) {
              new Noty({
                text: _TRANS('all', data.data[i].id) + '<br />' + data.data[i].msg,
                type: 'error',
              }).show();
            }
          }
        }
        if (typeof error === 'function') {
          error.call(this, data);
        }
      }
      if (typeof callback === 'function') {
        callback.call(this, data);
      }
    })
    .catch(function (error) {
      if (is_loader) {
        Actions.endRequest();
      }
      console.log(error);
      if (is_notify) {
        new Noty({
          text: 'Ошибка получения данных',
          type: 'error',
        }).show();
      }
    });
}

export default request;
