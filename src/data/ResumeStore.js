import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import {
  RECEIVE_RESUMES_LIST
} from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

class ResumeStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      resumes: null,
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case RECEIVE_RESUMES_LIST:
        return state.set('resumes', action.resumes);

      default:
        return state;
    }
  }
}
export default new ResumeStore();