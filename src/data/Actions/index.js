import { 
  RESOURCES, 
} from "../../const/url";
import {
  RECEIVE_MENU
} from "../ActionTypes.js";
import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

let Actions = {};

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

export default Actions;