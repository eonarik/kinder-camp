import React, { Component } from 'react';

import { Container } from "flux/utils";
import Actions from "./data/Actions";
import ActionsUsers from "./data/Actions/users";
import RequestStore from "./data/RequestStore";
import UserStore from "./data/UserStore";

import { Switch, Route, Link } from 'react-router-dom';

import Lk from './components/Lk';
import LkParent from './components/LkParent';
import Camps from './components/Camps';
import Reservations from './components/Reservations';
import ReservationsParent from './components/ReservationsParent';
import Vacancies from './components/Vacancies';
import Reviews from './components/Reviews';
import MyReviews from './components/MyReviews';
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
  MyReviews,
  Messages,
};

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

    this.state = {
      statusMessages: [],
      currentTabIndex: 0,
    }
  }

  setTab = (index, tab, addHistory, e) => {
    // e.preventDefault();
    this.setState({
      currentTabIndex: index,
    });
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

    let _tabContent = [];
    let _tabs = [];
    const _currentTabIndex = this.state.currentTabIndex
    const _currentTab = tabs[_currentTabIndex];
    for (let i in tabs) {
      let tab = tabs[i];
      _tabs.push(
        <li key={tab.id} className={_currentTabIndex === i ? 'active' : ''}>
          <Link to={'/' + tab.uri} onClick={this.setTab.bind(this, i, tab, true)}>{tab.pagetitle}</Link>
        </li>
      );

      if (typeof tpls[tab.tpl] !== 'undefined') {
        let Tpl = tpls[tab.tpl];

        switch (tab.tpl) {
          case 'LkParent':          
          case 'Lk':
            _tabContent.push(
              <Route key={tab.id} exact path={'/' + tab.uri} render={(props) => (
                <Tpl 
                  {...props}
                  userProfile={this.state.userProfile}
                  onUpdateUserProfile={this.state.onUpdateUserProfile}
                />
              )} />
            );
            break;
          
          default:
            _tabContent.push(
              <Route key={tab.id} exact path={'/' + tab.uri} render={(props) => (
                <Tpl {...props} />
              )} />
            );
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
        
        <Switch>
          {_tabContent}
          <Route render={() => <h4>404 Page not found</h4>} />
        </Switch>
      </div>
    );
  }
}

export default Container.create(App);