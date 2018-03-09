import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "./data/CampStore.js";
import RequestStore from "./data/RequestStore.js";
import ProgramStore from "./data/ProgramStore.js";
import Actions from './data/Actions';

import CampsList from './components/Camps/CampsList';
import ProgramsList from './components/Programs/ProgramsList';

import './styles/scss/style.css';

const _TRANS = require('./const/trans');

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
    return [CampStore, ProgramStore, RequestStore];
  }

  static calculateState(prevState) {
    return {
      onAddCamp: Actions.addCamp,
      onAddProgram: Actions.addProgram,
      updatedCampId: CampStore.getState().get('updatedCampId'),
      programs: ProgramStore.getState().get('programs'),
      isLoading: RequestStore.getState().get('loading'),
    };
  }

  state = {
    activeTab: 0,
    statusMessages: [],
  }

  onNewCamp = (params) => {
    if (window.confirm(_TRANS('all', 'add_camp_confirm'))) {
      this.state.onAddCamp(params).then((newCamp) => {
        this.setState({
          activeTab: 0,
        });
      });
    }
  }

  onNewProgram = (params) => {
    if (window.confirm(_TRANS('all', 'add_program_confirm'))) {
      this.state.onAddProgram(params).then((newProgram) => {
        this.setState({
          activeTab: 1,
        });
      });
    }
  }

  activateTab = (tabId) => {
    this.setState({
      activeTab: tabId
    });
  }

  render() {
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

        <ul className="admin__tabs row">
          <li className={"col-xs-12 col-md-6" + (this.state.activeTab === 0 ? ' active' : '')}>
            <a href="javascript:;" className="admin__tabs__item" onClick={this.activateTab.bind(this, 0)}>{_TRANS('all', 'list_camp')}</a>
            <a href="javascript:;" className="btn btn-icon btn-icon--add" data-action="add-camp"
              onClick={this.onNewCamp}
            >
              <span>{_TRANS('all', 'add_camp')}</span>
            </a>
          </li>
          <li className={"col-xs-12 col-md-6" + (this.state.activeTab === 1 ? ' active' : '')}>
            <a href="javascript:;" className="admin__tabs__item" onClick={this.activateTab.bind(this, 1)}>{_TRANS('all', 'list_program')}</a>
            <a href="javascript:;" className="btn btn-icon btn-icon--add" data-action="add-program"
              onClick={this.onNewProgram}
            >
              <span>{_TRANS('all', 'add_program')}</span>
            </a>
          </li>
        </ul>

        <div style={{
          display: (this.state.activeTab === 0 ? 'block' : 'none')
        }}>
          <CampsList onNewProgram={this.onNewProgram} />
        </div>
        <div style={{
          display: (this.state.activeTab === 1 ? 'block' : 'none')
        }}>
          <ProgramsList />
        </div>
      </div>
    );
  }
}

export default Container.create(App);