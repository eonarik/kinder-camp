import React, { Component } from 'react';

import { Container } from "flux/utils";
import MessagesStore from "../../../data/MessagesStore";
import Actions from '../../../data/Actions/messages';

import MessagesListItem from './MessagesListItem';

import { notyConfig } from '../../../config';

const Noty = require('noty');
Noty.overrideDefaults(notyConfig);

// let _get = require('../../../inc/get2obj')();

class MessagesList extends Component {

  inputs = {}
  interval = null;
  state = {
    hash: '',
    page: 1,
    limit: 20,
  }

  static getStores() {
    return [MessagesStore];
  }

  static calculateState(prevState) {
    return {
      onAddMessage: Actions.addMessage,
      onUpdateMessage: Actions.updateMessage,
      onReceiveMessages: Actions.receiveMessages,
      onReceiveDialogList: Actions.receiveDialogList,
      onReadMessages: Actions.readMessages,
      messages: MessagesStore.getState().get('messages'),
      totalMessages: MessagesStore.getState().get('totalMessages'),
    };
  }

  scrollMessagesWrapper = () => {
    if (typeof window !== 'undefined') {
      let nodes = window.document.querySelectorAll('.msglist');
      for (let i in nodes) {
        let node = nodes[i];
        if (node instanceof HTMLDivElement) {
          node.scrollTop = node.scrollHeight;
        }
      }
    }
  }

  isScrolledMessagesWrapper = () => {
    if (typeof window !== 'undefined') {
      let nodes = window.document.querySelectorAll('.msglist');
      for (let i in nodes) {
        let node = nodes[i];
        if (node instanceof HTMLDivElement) {
          return node.scrollTop === node.scrollHeight - node.clientHeight;
        }
      }
    }
    return false;
  }

  pressEnter = (e) => {
    if (
      e.key === 'Enter'
      && !e.shiftKey
    ) {
      this.addMessage();
      return false;
    }
  }

  moreMessages = () => {
    let nextPage = (this.state.page + 1);
    this.state.onReceiveMessages(this.props.activeDialog.dialog_id, {
      limit: nextPage * this.state.limit
    }).then(() => {
      this.setState({
        page: nextPage
      });
    });
  }

  readingMessages = (e) => {
    let unreadingCount = 0;
    let readingCount = 0;
    let messages = this.state.messages;
    let dialog_id = this.props.activeDialog.dialog_id
    for (let i in messages) {
      let message = messages[i];
      if (!message.is_read && message.your_id !== message.sender) {
        unreadingCount++;
      }
    }

    if (unreadingCount > 0) {
      this.state.onReadMessages(dialog_id, {
        not_notify: true,
      }).then(() => {
        if (++readingCount >= unreadingCount) {
          this.state.onReceiveDialogList();
          this.state.onReceiveMessages(dialog_id);
        }
      });
    }
  }

  addMessage = (e) => {
    let dialog = this.props.activeDialog;
    this.inputs.message.disabled = true;

    this.state.onAddMessage(dialog.user_id, {
      dialog_id: dialog.dialog_id,
      message: this.inputs.message.value,
      not_notify: true,
    }).then(() => {
      this.inputs.message.value = '';
      this.inputs.message.disabled = false;
      this.inputs.message.focus();

      this.scrollMessagesWrapper();
    });
  }

  renderMessages = (dialog_id) => {
    this.state.onReceiveMessages(dialog_id, {
      limit: this.state.page * this.state.limit
    }).then(() => {
      this.scrollMessagesWrapper();
      this.interval = setInterval(() => {

        this.state.onReceiveDialogList({
          not_loader: true
        }).then((dialogs) => {
          for (let i in dialogs) {
            if (parseInt(dialogs[i].unread_messages, 10) > 0) {
              new Noty({
                text: dialogs[i].last_message,
                type: 'success',
              }).show();
            }
          }
        });
        this.state.onReceiveMessages(dialog_id, {
          not_loader: true,
          only_new: true,
        }).then(() => {
          this.scrollMessagesWrapper();
        });
      }, 5000);
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.activeDialog
      && (
        (
          prevProps.activeDialog
          && prevProps.activeDialog.dialog_id !== this.props.activeDialog.dialog_id
        )
        || !prevProps.activeDialog
      )
    ) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.renderMessages(this.props.activeDialog.dialog_id);
    }
  }

  componentDidMount = () => {
    this.scrollMessagesWrapper();

    // отреагируем на кнопки истории
    // window.onpopstate = (event) => {
    //   if (
    //     event.state 
    //     && typeof event.state.dialog_id !== 'undefined'
    //   ) {
    //     this.renderMessages(event.state.dialog_id);
    //   }
    // };

    // if (_get.d) {
    //   this.renderMessages(_get.d);
    // }
  }

  render() {
    let messages = this.state.messages;
    let _messages = [];
    let dateSentRender = '';
    let extMessages = [];

    if (messages && messages.length < this.state.totalMessages) {
      _messages.push(
        <div key={'more'} className="msglist__date">
          <button className="btn btn-link" onClick={this.moreMessages}>Показать более ранние</button>
        </div>
      );
    }
    for (let i in messages) {
      let message = messages[i];
      if (dateSentRender !== message.date_sent_render) {
        _messages.push(
          <div key={'date-' + i} className="msglist__date">
            {message.date_sent_render}
          </div>
        );
        dateSentRender = message.date_sent_render;
      }
      if (message.ext) {
        extMessages.push(
          <div key={'ext-' + message.id} className="msglist__item__text" dangerouslySetInnerHTML={{
            __html: message.message
          }} />
        );
      } else {
        _messages.push(
          <MessagesListItem
            key={message.id}
            obj={message}
            extMessages={extMessages}
          />
        );
        extMessages = [];
      }
      // if (message.hash !== this.state.hash) {
      //   this.state.hash = message.hash
      // }
    }

    return (
      <div className="msglist-wrapper">
        <div className="msglist">
          {_messages.length
            ? (
              <div className="msglist__wrapper">
                  {_messages}
              </div>
            )
            : <div className="msglist-wrapper__nomessages">Выберите диалог или создайте новый</div>
          }
        </div>
        {!_messages.length ||
          <div className="msgsend">
            <textarea className="msgsend__input"
              ref={(input) => { this.inputs.message = input; }}
              onKeyPress={this.pressEnter}
              onFocus={this.readingMessages}
            ></textarea>
            <div className="msgsend__actions">
              <button className="btn btn-info"
                onClick={this.addMessage}
              ><i className="fa fa-paper-plane"></i></button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Container.create(MessagesList);