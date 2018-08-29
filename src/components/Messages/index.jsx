import React, { Component } from 'react';

import { Container } from "flux/utils";
import MessagesStore from "../../data/MessagesStore";
import Actions from '../../data/Actions/messages';

import MessagesList from './MessagesList';
import MessagesUsers from './MessagesUsers';

class Messages extends Component {

  state = {
    expand: false,
  }

  static getStores() {
    return [MessagesStore];
  }

  static calculateState(prevState) {
    return {
      onSetDialog: Actions.setDialog,
      activeDialog: MessagesStore.getState().get('activeDialog'),
    };
  }

  toggleExpand = () => {
    this.setState({
      expand: !this.state.expand
    });
  }

  render() {
    return (
      <div>
        <h4 className="text-success">Личные сообщения</h4>
        <div className={"messages" + (this.state.expand ? " messages--expand" : "")}>
          <div className="row row--nospacing flex-row h100">
            <div className="col-xs-12 col-lg-3">
              <MessagesUsers
                setDialog={this.state.onSetDialog}
                activeDialog={this.state.activeDialog}
              />
            </div>
            <div className="col-xs-12 col-lg-9">
              <div className="pull-right" style={{
                top: 15,
                right: 15,
                position: 'absolute',
                zIndex: 1,
              }}>
                {this.state.expand
                  ? <a className="btn btn-icon" onClick={this.toggleExpand}><i className="fa fa-compress"></i></a>
                  : <a className="btn btn-icon" onClick={this.toggleExpand}><i className="fa fa-arrows-alt"></i></a>
                }
              </div>
              <MessagesList 
                dialog={this.state.activeDialog}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Container.create(Messages);