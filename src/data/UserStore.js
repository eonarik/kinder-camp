import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import { 
  RECEIVE_USER_PROFILE,
  UPDATE_USER_PROFILE
} from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";
// import Actions from './Actions';

class TariffStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      profile: {},
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case RECEIVE_USER_PROFILE:
        return state.set('profile', action.profile);

      case UPDATE_USER_PROFILE:
        return state.set('profile', action.profile);

      default:
        return state;
    }
  }
}
export default new TariffStore();