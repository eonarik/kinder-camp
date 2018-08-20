import React, { Component } from 'react';

import { Container } from "flux/utils";
import Actions from "./data/Actions";
import RequestStore from "./data/RequestStore";
import UserStore from "./data/UserStore";

import Camps from './components/Camps';
import Lk from './components/Lk';
import Vacancies from './components/Vacancies';
import Reservations from './components/Reservations';

import './styles/scss/style.css';

import _TRANS from "./const/trans";

const tabs = {
  1: {
    pagetitle: 'Личный кабинет',
    uri: '/lk/',
  },
  2: {
    pagetitle: 'Детские лагеря',
    uri: '/lk/detskie-lagerya.html',
  },
  3: {
    pagetitle: 'Бронирования',
    uri: '/lk/bronirovaniya.html',
  },
  4: {
    pagetitle: 'Вожатые',
    uri: '/lk/vozhatyie.html',
  },
  5: {
    pagetitle: 'Вакансии',
    uri: '/lk/vakansii.html',
  },
  6: {
    pagetitle: 'Отзывы и статистика',
    uri: '/lk/otzyivyi-i-statistika.html',
  },
  7: {
    pagetitle: 'Сообщения',
    uri: '/lk/soobshheniya.html',
  },
};

class Message extends Component {
  static defaultProps = {
    type: 'loading',
    text: '',
  }

  msg = {
    loading: {
      cls: 'alert-warning',
      icon: <i className="fa fa-spinner fa-pulse"></i>,
      text: _TRANS('all', 'loading') + '...'
    },
    danger: {
      cls: 'alert-danger',
      icon: <i className="fa fa-times"></i>,
    },
    success: {
      cls: 'alert-success',
      icon: <i className="fa fa-check"></i>,
    },
  };

  render() {
    let msg = this.msg[this.props.type];
    if (this.props.text) {
      msg.text = this.props.text;
    }
    return (
      <div className={"loader alert " + msg.cls}>
        <div className="loader__status">
          <div className="loader__status__icon">
            {msg.icon}
          </div>
        </div>
        <div className="loader__text">
          {msg.text}
        </div>
      </div>
    );
  }
}

class App extends Component {

  static getStores() {
    return [RequestStore,UserStore];
  }

  static calculateState(prevState) {
    return {
      isLoading: RequestStore.getState().get('loading'),
      userProfile: UserStore.getState().get('profile'),
      onReceiveUserProfile: Actions.receiveUserProfile,
      onUpdateUserProfile: Actions.updateUser,
    };
  }

  constructor (props) {
    super(props);

    let index = 3;
    // for (let i in tabs) {
    //   index = i;
    //   break;
    // }

    this.state = {
      statusMessages: [],
      currentTabIndex: index,
    }
  }

  setTab = (index, e) => {
    e.preventDefault();
    this.setState({
      currentTabIndex: index,
    });
  }

  render() {
    const _tabs = [];
    const _currentTabIndex = this.state.currentTabIndex
    const _currentTab = tabs[_currentTabIndex];
    for (let i in tabs) {
      let tab = tabs[i];
      _tabs.push(
        <li key={i} className={_currentTabIndex == i ? 'active' : ''}>
          <a href={tab.uri} onClick={this.setTab.bind(this, i)}>{tab.pagetitle}</a>
        </li>
      );
    }

    let tabContent = null;
    switch (_currentTabIndex) {
      case 1:
      case '1':
        tabContent = <Lk 
          userProfile={this.state.userProfile}
          onReceiveUserProfile={this.state.onReceiveUserProfile}
          onUpdateUserProfile={this.state.onUpdateUserProfile}
        />;
        break;

      case 3:
      case '3':
        tabContent = <Reservations />;
        break;

      case 2:
      case '2':
        tabContent = <Camps />;
        break;

      case 5:
      case '5':
        tabContent = <Vacancies />;
        break;

      default:
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