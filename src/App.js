import React, { Component } from "react";

import { Container } from "flux/utils";
import Actions from "./data/Actions";
import ActionsUsers from "./data/Actions/users";
import RequestStore from "./data/RequestStore";
import UserStore from "./data/UserStore";

import { Switch, Route, Link } from "react-router-dom";

import Lk from "./components/Lk";
import LkParent from "./components/LkParent";
import LkVacancy from "./components/LkVacancy";
import Camps from "./components/Camps";
import Reservations from "./components/Reservations";
import ReservationsParent from "./components/ReservationsParent";
import Vacancies from "./components/Vacancies";
import Reviews from "./components/Reviews";
import MyReviews from "./components/MyReviews";
import Messages from "./components/Messages";
import Resumes from "./components/Resumes";

import "./styles/scss/style.css";

import _TRANS from "./const/trans";

const tpls = {
  Lk,
  LkParent,
  LkVacancy,
  Camps,
  Reservations,
  ReservationsParent,
  Vacancies,
  Reviews,
  MyReviews,
  Messages,
  Resumes
};

class App extends Component {
  static getStores() {
    return [RequestStore, UserStore];
  }

  static calculateState(prevState) {
    return {
      onReceiveMenu: Actions.recieveMenu,
      menu: RequestStore.getState().get("menu"),
      isLoading: RequestStore.getState().get("loading"),
      onReceiveUserProfile: ActionsUsers.receiveUserProfile,
      onUpdateUserProfile: ActionsUsers.updateUser,
      userProfile: UserStore.getState().get("profile")
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      statusMessages: []
    };
  }

  setTab = index => {
    this.forceUpdate();
  };

  componentDidMount = () => {
    // отреагируем на кнопки истории
    window.onpopstate = event => {
      this.forceUpdate();
    };

    if (!this.state.menu || !this.state.menu.length) {
      this.state.onReceiveMenu();
    }
    if (
      !this.state.userProfile ||
      !Object.keys(this.state.userProfile).length
    ) {
      this.state.onReceiveUserProfile();
    }
  };

  render() {
    let tabs = this.state.menu;
    if (!tabs || !tabs.length) {
      return null;
    }

    let _tabContent = [];
    let _tabs = [];
    let _currentTab = {};
    for (let i in tabs) {
      let tab = tabs[i];
      let path = "/" + tab.uri;
      let isActive = window.location.pathname === path;

      if (isActive) {
        _currentTab = tab;
      }

      _tabs.push(
        <li
          key={tab.id}
          className={isActive ? "active" : ""}
          onClick={this.setTab}
        >
          <Link to={path}>{tab.pagetitle}</Link>
        </li>
      );

      if (typeof tpls[tab.tpl] !== "undefined") {
        let Tpl = tpls[tab.tpl];

        switch (tab.tpl) {
          case "Lk":
          case "LkParent":
          case "LkVacancy":
            _tabContent.push(
              <Route
                key={tab.id}
                exact
                path={path}
                render={props => (
                  <Tpl
                    {...props}
                    userProfile={this.state.userProfile}
                    onUpdateUserProfile={this.state.onUpdateUserProfile}
                    onReceiveUserProfile={this.state.onReceiveUserProfile}
                  />
                )}
              />
            );
            break;

          default:
            _tabContent.push(
              <Route
                key={tab.id}
                exact
                path={path}
                render={props => (
                  <Tpl {...props} userProfile={this.state.userProfile} />
                )}
              />
            );
        }
      }
    }

    return (
      <div>
        <div className="loader-wrapper">
          {this.state.isLoading ? (
            <div className="loader loader--loading">
              <div className="loader__status">
                <div className="loader__status__icon">
                  <i className="fa fa-spinner fa-pulse" />
                </div>
              </div>
              <div className="loader__text">{_TRANS("all", "loading")}...</div>
            </div>
          ) : null}
        </div>

        <ul className="breadcrumb">
          <li>
            <a href="/">
              <i className="fa fa-home" />
            </a>
          </li>
          <li className="active">{_currentTab.pagetitle}</li>
        </ul>

        <ul className="nav nav-tabs">{_tabs}</ul>

        <Switch>
          {_tabContent}
          <Route render={() => <h4>404 Page not found</h4>} />
        </Switch>
      </div>
    );
  }
}

export default Container.create(App);
