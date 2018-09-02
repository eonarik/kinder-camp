import { 
  MESSAGES, 
} from "../../const/url";

import { 
  RECEIVE_DIALOGS_LIST,
  RECEIVE_MESSAGES_LIST,
  SET_DIALOG,
} from "../ActionTypes.js";

import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';
import get2obj from '../../inc/get2obj';
let _get = get2obj();

let Actions = {};

Actions.receiveDialogList = function (options = {}) {
  return new Promise((resolve, reject) => {
    request(MESSAGES.DIALOG_LIST, options, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_DIALOGS_LIST,
        dialogs: response.object
      });
      resolve(response.object);
    });
  });
};

Actions.setDialog = function (dialog) {
  if (_get.d !== dialog.dialog_id) {
    window.history.pushState({
      dialog_id: dialog.dialog_id,
      ...window.history.state
    }, '', window.location.pathname + '?d=' + dialog.dialog_id);
  }

  _Dispatcher.dispatch({
    type: SET_DIALOG,
    activeDialog: dialog
  });
};

Actions.receiveMessages = function (dialog_id, options = {}) {
  return new Promise((resolve, reject) => {
    request(MESSAGES.LIST, {
      dialog_id,
      ...options
    }, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_MESSAGES_LIST,
        messages: response.object,
        totalMessages: response.total,
      });
      resolve(response.object);
    });
  });
};

Actions.addMessage = function (recipient, options = {}) {
  return new Promise((resolve, reject) => {
    request(MESSAGES.CREATE, {
      recipient,
      ...options
    }, (response) => {
      // _Dispatcher.dispatch({
      //   type: ADD_MESSAGE,
      //   msg: response.object
      // });
      if (response.success) {
        Actions.receiveMessages(response.object.dialog_id).then(() => {
          Actions.receiveDialogList().then(() => {
            resolve(response.object);
          });
        });
      } else {
        resolve(response.object);
      }
    });
  });
};

Actions.updateMessage = function (message_id, options = {}) {
  return new Promise((resolve, reject) => {
    request(MESSAGES.UPDATE, {
      id: message_id,
      ...options
    }, (response) => {
      resolve(response.object);
    });
  });
};

export default Actions;