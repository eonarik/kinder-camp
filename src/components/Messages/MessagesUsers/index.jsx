import React, { Component } from 'react';

import { Container } from "flux/utils";
import MessagesStore from "../../../data/MessagesStore";
import Actions from '../../../data/Actions/messages';

import MessagesUsersItem from './MessagesUsersItem';

class MessagesUsers extends Component {

  state = {
    dialogsLoad: true,
  }

  static getStores() {
    return [MessagesStore];
  }

  static calculateState(prevState) {
    return {
      onReceiveDialogList: Actions.receiveDialogList,
      dialogs: MessagesStore.getState().get('dialogs'),
    };
  }

  componentDidMount = () => {
    if (!this.state.dialogs || !this.state.dialogs.length) {
      this.state.onReceiveDialogList().then(() => {
        this.setState({
          dialogsLoad: false,
        });
      });
    }
  }

  render() {
    let dialogs = this.state.dialogs;
    let _dialogs = [];

    for (let i in dialogs) {
      let dialog = dialogs[i];
      _dialogs.push(
        <MessagesUsersItem 
          key={dialog.dialog_id}
          obj={dialog}
          setDialog={this.props.setDialog}
          isActive={this.props.activeDialog && this.props.activeDialog.dialog_id == dialog.dialog_id}
        />
      );
    }

    return (
      <div className="userlist">
        {_dialogs.length
          ? _dialogs
          : this.state.dialogsLoad
            ? <div className="userlist__nousers">Загрузка диалогов...</div>
            : <div className="userlist__nousers">Ваш почтовый ящик пуст</div>
        }
      </div>
    );
  }
}

export default Container.create(MessagesUsers);