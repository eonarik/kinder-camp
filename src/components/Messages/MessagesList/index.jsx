import React, { Component } from 'react';

import { Container } from "flux/utils";
import MessagesStore from "../../../data/MessagesStore";
import Actions from '../../../data/Actions/messages';

import MessagesListItem from './MessagesListItem';

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
    this.state.onReceiveMessages(this.props.dialog.dialog_id, {
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
    for (let i in messages) {
      let message = messages[i];
      if (!message.is_read && message.your_id != message.sender) {
        unreadingCount++;
      }
    }
    for (let i in messages) {
      let message = messages[i];
      if (!message.is_read && message.your_id != message.sender) {
        this.state.onUpdateMessage(message.id, {
          is_read: 1,
          not_notify: true,
        }).then(() => {
          if (++readingCount >= unreadingCount) {
            Actions.receiveDialogList();
            this.state.onReceiveMessages(this.props.dialog.dialog_id).then(() => {
              this.scrollMessagesWrapper();
            });
          }
        });
      }
    }
  }

  addMessage = (e) => {
    let dialog = this.props.dialog;
    this.inputs.message.disabled = true;
    this.state.onAddMessage(dialog.user_id, {
      dialog_id: dialog.dialog_id,
      message: this.inputs.message.value,
    }).then(() => {
      this.inputs.message.value = '';
      this.inputs.message.disabled = false;
      this.inputs.message.focus();

      this.scrollMessagesWrapper();
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.dialog
      && prevProps.dialog
      && prevProps.dialog.dialog_id != this.props.dialog.dialog_id 
      || !prevProps.dialog
    ) {
      this.state.onReceiveMessages(this.props.dialog.dialog_id, {
        limit: this.state.page * this.state.limit
      }).then(() => {
        this.scrollMessagesWrapper();

        clearInterval(this.interval);
        this.interval = setInterval(() => {

          Actions.receiveDialogList({
            not_loader: true
          });
          Actions.receiveMessages(this.props.dialog.dialog_id, {
            not_loader: true,
            limit: this.state.page * this.state.limit
          });
        }, 5000);
      });
    }
  }

  componentDidMount = () => {
    this.scrollMessagesWrapper();
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
      if (dateSentRender != message.date_sent_render) {
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
      if (message.hash !== this.state.hash) {
          this.state.hash = message.hash
      }
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