import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import ActionTypes from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";
import Actions from './Actions';

class TariffStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      tariffs: null,
      updatedTariff: null,
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.RECEIVE_TARIFFS_LIST:
        return state.set('tariffs', action.tariffs);

      case ActionTypes.UPDATE_TARIFF:
        return state.set('updatedTariff', action.updatedTariff);

      default:
        return state;
    }
  }
}
export default new TariffStore();