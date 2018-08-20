import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import { REQUEST } from "./ActionTypes.js";
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

      default:
        return state;
    }
  }
}
export default new RequestStore();