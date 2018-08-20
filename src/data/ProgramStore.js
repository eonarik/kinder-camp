import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import {
  UPDATE_PROGRAM,
  RECEIVE_PROGRAMS_LIST
} from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

class ProgramStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      programs: null,
      updatedProgramProps: null
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case UPDATE_PROGRAM:
        return state.set('updatedProgramProps', action.updatedProgramProps);

      case RECEIVE_PROGRAMS_LIST:
        return state.set('programs', action.programs);

      default:
        return state;
    }
  }
}
export default new ProgramStore();