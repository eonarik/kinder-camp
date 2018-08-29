import { 
  RESOURCES, 
} from "../../const/url";
import {
  REQUEST,
  RECEIVE_MENU
} from "../ActionTypes.js";
import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

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

Actions.recieveMenu = () => {
  return new Promise ((resolve, reject) => {
    request(RESOURCES.LK_MENU, {}, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_MENU,
        menu: response.object
      });
      resolve(response.object);
    });
  });
}

// module.exports = Actions;
export default Actions;