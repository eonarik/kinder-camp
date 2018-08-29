import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import {
  RECEIVE_REVIEWS_LIST,
  RECEIVE_COMMENTS_LIST,
} from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

class ReservationStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      reviews: null,
      comments: null,
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case RECEIVE_REVIEWS_LIST:
        return state.set('reviews', action.reviews);

      case RECEIVE_COMMENTS_LIST:
        return state.set('comments', action.reviews);

      default:
        return state;
    }
  }
}
export default new ReservationStore();