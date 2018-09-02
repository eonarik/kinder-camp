import React, { Component } from 'react';

import MessagesUsersItem from './MessagesUsersItem';

let _get = require('../../../inc/get2obj')();

class MessagesUsers extends Component {

  constructor (props) {
    super(props);
    this.state = {
      dialogsLoad: true,
      activeDialogId: 0,
    }
  }

  componentDidUpdate = (prevProps, prevState) => {

    let activeDialogId = this.props.activeDialog ? this.props.activeDialog.dialog_id : 0;
    if (prevState.activeDialogId !== activeDialogId) {
      this.setState({
        activeDialogId
      });
    }
  }

  componentDidMount = () => {

    // отреагируем на кнопки истории
    // window.onpopstate = (event) => {
    //   if (
    //     event.state 
    //     && typeof event.state.dialog_id !== 'undefined'
    //   ) {
    //     this.setState({
    //       activeDialogId: event.state.dialog_id
    //     });
    //   }
    // };

    if (!this.props.dialogs || !this.props.dialogs.length) {
      this.props.onReceiveDialogList().then((dialogs) => {
        this.setState({
          dialogsLoad: false,
        });

        // если в урл есть параметр d={dialog_id} то разберемся
        let _dialog = null;
        for (let i in dialogs) {
          let dialog = dialogs[i];
          if (_get.d && dialog.dialog_id === parseInt(_get.d, 10)) {
            _dialog = dialog;
            break;
          }
        }
        if (_dialog) {
          this.props.setDialog(_dialog);
        }
      });
    }
  }

  render() {
    let dialogs = this.props.dialogs;
    let _dialogs = [];

    for (let i in dialogs) {
      let dialog = dialogs[i];
      _dialogs.push(
        <MessagesUsersItem 
          key={dialog.dialog_id}
          obj={dialog}
          setDialog={this.props.setDialog}
          isActive={this.state.activeDialogId === dialog.dialog_id}
        />
      );
    }

    return (
      <div className="userlist">
        {_dialogs.length
          ? _dialogs
          : this.props.dialogsLoad
            ? <div className="userlist__nousers">Загрузка диалогов...</div>
            : <div className="userlist__nousers">Ваш почтовый ящик пуст</div>
        }
      </div>
    );
  }
}

export default MessagesUsers;