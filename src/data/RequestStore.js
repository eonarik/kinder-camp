import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import { REQUEST, RECEIVE_MENU } from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

class RequestStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      loading: false,
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case REQUEST:
        return state.set('loading', action.loading);

      case RECEIVE_MENU:
        return state.set('menu', action.menu);

      default:
        return state;
    }
  }
}
export default new RequestStore();