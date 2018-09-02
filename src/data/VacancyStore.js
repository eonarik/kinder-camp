import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import {
  RECEIVE_VACANCIES_LIST,
  UPDATE_VACANCY
} from "./ActionTypes";
import _Dispatcher from "./_Dispatcher";

class VacancyStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      vacancies: null,
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case RECEIVE_VACANCIES_LIST:
        return state.set('vacancies', action.vacancies);

      case UPDATE_VACANCY:
        return state.set('updatedVacancyProps', action.updatedVacancyProps);

      default:
        return state;
    }
  }
}
export default new VacancyStore();