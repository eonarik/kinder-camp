import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import {
  RECEIVE_DIALOGS_LIST,
  RECEIVE_MESSAGES_LIST,
  ADD_MESSAGE,
  SET_DIALOG,
} from "./ActionTypes.js";
import _Dispatcher from "./_Dispatcher.js";

class MessagesStore extends ReduceStore {
  constructor() {
    super(_Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      dialogs: null,
      messages: null,
      totalMessages: 0,
      msg: null,
      activeDialog: null,
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case RECEIVE_DIALOGS_LIST:
        return state.set('dialogs', action.dialogs);

      case RECEIVE_MESSAGES_LIST:
        state = state.set('totalMessages', action.totalMessages);
        return state.set('messages', action.messages);
        // return state;

      case ADD_MESSAGE:
        return state.set('msg', action.msg);

      case SET_DIALOG:
        return state.set('activeDialog', action.activeDialog);

      default:
        return state;
    }
  }
}
export default new MessagesStore();