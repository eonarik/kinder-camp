import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import ActionTypes from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

class ImageStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      image: null,
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.ADD_IMAGE:
        return state.set('image', action.image);

      default:
        return state;
    }
  }
}
export default new ImageStore();