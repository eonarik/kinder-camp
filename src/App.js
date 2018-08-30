import React, { Component } from 'react';

import { Container } from "flux/utils";
import Actions from "./data/Actions";
import ActionsUsers from "./data/Actions/users";
import RequestStore from "./data/RequestStore";
import UserStore from "./data/UserStore";

import Lk from './components/Lk';
import LkParent from './components/LkParent';
import Camps from './components/Camps';
import Reservations from './components/Reservations';
import ReservationsParent from './components/ReservationsParent';
import Vacancies from './components/Vacancies';
import Reviews from './components/Reviews';
import Messages from './components/Messages';

import './styles/scss/style.css';

import _TRANS from "./const/trans";

const tpls = {
  Lk,
  LkParent,
  Camps,
  Reservations,
  ReservationsParent,
  Vacancies,
  Reviews,
  Messages,
};

// class Message extends Component {
//   static defaultProps = {
//     type: 'loading',
//     text: '',
//   }

//   msg = {
//     loading: {
//       cls: 'alert-warning',
//       icon: <i className="fa fa-spinner fa-pulse"></i>,
//       text: _TRANS('all', 'loading') + '...'
//     },
//     danger: {
//       cls: 'alert-danger',
//       icon: <i className="fa fa-times"></i>,
//     },
//     success: {
//       cls: 'alert-success',
//       icon: <i className="fa fa-check"></i>,
//     },
//   };

//   render() {
//     let msg = this.msg[this.props.type];
//     if (this.props.text) {
//       msg.text = this.props.text;
//     }
//     return (
//       <div className={"loader alert " + msg.cls}>
//         <div className="loader__status">
//           <div className="loader__status__icon">
//             {msg.icon}
//           </div>
//         </div>
//         <div className="loader__text">
//           {msg.text}
//         </div>
//       </div>
//     );
//   }
// }

class App extends Component {

  static getStores() {
    return [RequestStore,UserStore];
  }

  static calculateState(prevState) {
    return {
      onReceiveMenu: Actions.recieveMenu,
      menu: RequestStore.getState().get('menu'),
      isLoading: RequestStore.getState().get('loading'),
      onReceiveUserProfile: ActionsUsers.receiveUserProfile,
      onUpdateUserProfile: ActionsUsers.updateUser,
      userProfile: UserStore.getState().get('profile'),
    };
  }

  constructor (props) {
    super(props);

    // отреагируем на кнопки истории
    window.onpopstate = (event) => {
      if (
        event.state 
        && typeof event.state.index !== 'undefined'
        && typeof event.state.tab !== 'undefined'
      ) {
        this.setTab(event.state.index, event.state.tab, false, event);
      }
    };

    this.state = {
      statusMessages: [],
      currentTabIndex: 0,
    }
  }

  setTab = (index, tab, addHistory, e) => {
    e.preventDefault();
    this.setState({
      currentTabIndex: index,
    });

    if (addHistory && window.location.pathname !== tab.uri) {
      window.history.pushState({
        page: tab.uri,
        type: "tab",
        index,
        tab,
      }, tab.pagetitle, tab.uri);
    }
  }

  componentDidMount = () => {
    if (!this.state.menu || !this.state.menu.length) {
      this.state.onReceiveMenu().then((menu) => {
        let index = 0;
        for (let i in menu) {
          if (menu[i].uri === window.location.pathname) {
            index = i;
            break;
          }
        }

        this.setState({
          currentTabIndex: index
        });
      });
    }
    if (!this.state.userProfile || !Object.keys(this.state.userProfile).length) {
      this.state.onReceiveUserProfile();
    }
  }

  render() {
    let tabs = this.state.menu;
    if (!tabs || !tabs.length) {
      return null;
    }

    let tabContent = null;
    const _tabs = [];
    const _currentTabIndex = this.state.currentTabIndex
    const _currentTab = tabs[_currentTabIndex];
    for (let i in tabs) {
      let tab = tabs[i];
      _tabs.push(
        <li key={tab.id} className={_currentTabIndex === i ? 'active' : ''}>
          <a href={tab.uri} onClick={this.setTab.bind(this, i, tab, true)}>{tab.pagetitle}</a>
        </li>
      );

      if (_currentTabIndex === i) {
        switch (tab.tpl) {
          case 'LkParent':
            tabContent = <LkParent 
              userProfile={this.state.userProfile}
              onUpdateUserProfile={this.state.onUpdateUserProfile}
            />;
            break;
            
          case 'Lk':
            tabContent = <Lk 
              userProfile={this.state.userProfile}
              onUpdateUserProfile={this.state.onUpdateUserProfile}
            />;
            break;
          
          default:
            if (typeof tpls[tab.tpl] !== 'undefined') {
              let Tpl = tpls[tab.tpl];
              tabContent = <Tpl />;
            }
        }
      }
    }


    return (
      <div>
        <div className="loader-wrapper">
          {this.state.isLoading
            ? (
              <div className="loader loader--loading">
                <div className="loader__status">
                  <div className="loader__status__icon">
                    <i className="fa fa-spinner fa-pulse"></i>
                  </div>
                </div>
                <div className="loader__text">
                  {_TRANS('all', 'loading')}...
                </div>
              </div>
            )
            : null
          }
        </div>
        
        <ul className="breadcrumb">
          <li>
            <a href="/">
              <i className="fa fa-home"></i>
            </a>
          </li>
          <li className="active">{_currentTab.pagetitle}</li>
        </ul>

        <ul className="nav nav-tabs">
          {_tabs}
        </ul>
        
        {tabContent}
      </div>
    );
  }
}

export default Container.create(App);