import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import ActionTypes from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

class CampStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      camps: null,
      updatedCampProps: null,
      updatedCampId: null,
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.UPDATE_CAMP:
        return state.set('updatedCampProps', action.updatedCampProps);

      case ActionTypes.MAKE_UPDATE_CAMP:
        return state.set('updatedCampId', action.id);

      case ActionTypes.RECEIVE_CAMPS_LIST:
        return state.set('camps', action.camps);

      default:
        return state;
    }
  }
}

export default new CampStore();