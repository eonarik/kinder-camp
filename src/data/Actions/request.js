import {
  REQUEST,
} from "../ActionTypes.js";
import _Dispatcher from "../_Dispatcher.js";

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

export default Actions;