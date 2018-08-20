import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "../../data/CampStore.js";
import ProgramStore from "../../data/ProgramStore.js";
import Actions from '../../data/Actions';

import CampsList from './CampsList';
import ProgramsList from '../Programs/ProgramsList';

const _TRANS = require('../../const/trans');

class Camps extends Component {

  static getStores() {
    return [CampStore, ProgramStore];
  }

  static calculateState(prevState) {
    return {
      onAddCamp: Actions.addCamp,
      onAddProgram: Actions.addProgram,
      updatedCampId: CampStore.getState().get('updatedCampId'),
      programs: ProgramStore.getState().get('programs'),
    };
  }

  state = {
    activeTab: 0,
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
        <h4 className="text-success">Детские лагеря</h4>

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
          <CampsList
            onNewProgram={this.onNewProgram}
            onNewCamp={this.onNewCamp}
          />
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

export default Container.create(Camps);