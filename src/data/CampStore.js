import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import {
  UPDATE_CAMP,
  MAKE_UPDATE_CAMP,
  RECEIVE_CAMPS_LIST,
  RECEIVE_STATUSES_LIST
} from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

class CampStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      statuses: null,
      tags: null,
      camps: null,
      updatedCampProps: null,
      updatedCampId: null,
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case UPDATE_CAMP:
        let camps = state.get('camps');
        for (let i in camps) {
          if (camps[i].id === action.updatedCampProps.id) {
            Object.assign(camps[i], action.updatedCampProps);
            state.set('camps', camps)
            break;
          }
        }
        return state.set('updatedCampProps', action.updatedCampProps);

      case MAKE_UPDATE_CAMP:
        return state.set('updatedCampId', action.id);

      case RECEIVE_CAMPS_LIST:
        return state.set('camps', action.camps);

      case RECEIVE_STATUSES_LIST:
        return state.set('statuses', action.statuses);

      default:
        return state;
    }
  }
}

export default new CampStore();