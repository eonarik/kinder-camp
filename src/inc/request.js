import Actions from '../data/Actions';


const Noty = require('noty');
Noty.overrideDefaults({
  layout: 'topRight',
  timeout: 3000,
  theme: 'kinder-camp',
  progressBar: false,
});

const request = function (action, params, callback, error) {
  var formData;
  if (params instanceof FormData) {
    formData = params;
  } else {
    formData = new FormData();
    for (var key in params) {
      formData.append(key, params[key]);
    }
  }

  var url = action;

  Actions.startRequest();
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
      Actions.endRequest();
      if (data.success) {
        if (data.message) {
          new Noty({
            text: data.message,
            type: 'success',
          }).show();
        }
        if (typeof callback === 'function') {
          callback.call(this, data);
        }
      } else {
        if (data.message) {
          new Noty({
            text: data.message,
            type: 'error',
          }).show();
        }
        if (typeof error === 'function') {
          error.call(this, data);
        }
      }
    })
    .catch(function (error) {
      Actions.endRequest();
      console.log(error);
      new Noty({
        text: 'Ошибка получения данных',
        type: 'error',
      }).show();
    });
}

export default request;
