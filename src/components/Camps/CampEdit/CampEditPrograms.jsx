import React, { Component } from 'react';

import { Container } from "flux/utils";
import ProgramStore from "../../../data/ProgramStore.js";
import ActionsPrograms from '../../../data/Actions/programs';
import ActionsCampPrograms from '../../../data/Actions/camp_programs';

import _TRANS from "../../../const/trans";

class CampEditProgram extends Component {
  static getStores() {
    return [ProgramStore];
  }

  static calculateState(prevState) {
    return {
      onReceiveProgramsList: ActionsPrograms.receiveProgramsList,
      programs: ProgramStore.getState().get('programs'),
      onDeleteProgramToCamp: ActionsCampPrograms.deleteProgramToCamp,
      onAddProgramToCamp: ActionsCampPrograms.addProgramToCamp,
    };
  }

  inputs = {}

  state = {
    _programs: [],
    showProgramsList: false,
  }

  onUnlinkProgram = (program_id) => {
    this.state.onDeleteProgramToCamp({
      program_id,
      camp_id: this.props.obj.id,
    }).then(() => {
      this.updateProgramsList();
    });
  }

  onLinkProgram = () => {
    this.state.onAddProgramToCamp({
      program_id: this.inputs.program_id.value,
      camp_id: this.props.obj.id,
    }).then(() => {
      this.updateProgramsList();
      this.setState({
        showProgramsList: false,
      });
    });
  }

  onTogglePrograms = (flag) => {
    this.setState({
      showProgramsList: flag,
    });
  }

  updateProgramsList = () => {
    this.state.onReceiveProgramsList({
      camp_id: this.props.obj.id,
    }).then((list) => {
      this.setState({
        _programs: list
      });
    });
  }

  componentDidMount = () => {
    this.updateProgramsList();
  }

  render() {
    let _programs = [];
    let _programsOption = [];

    for (let i in this.state.programs) {
      let program = this.state.programs[i];
      let _flag = true;
      for (let j in this.state._programs) {
        let _program = this.state._programs[j];
        if (program.id === _program.id) {
          _flag = false;
          break;
        }
      }
      if (_flag) {
        _programsOption.push(
          <option key={program.id} value={program.id}>{program.name}</option>
        );
      }
    }
    if (_programsOption.length) {
      _programsOption.unshift(
        <option key={0} value={0}>..{_TRANS('all', 'please_select_program')}</option>
      );
    }

    for (let i in this.state._programs) {
      let program = this.state._programs[i];
      _programs.push(
        <div key={program.id} className="admin__programs-item">
          <a className="admin__programs-item-link">{program.name}</a>
          <a className="admin__programs-item-close" onClick={this.onUnlinkProgram.bind(this, program.id)}>&times;</a>
        </div>
      );
    }

    return (
      <div>
        <h5>{_TRANS('all', 'active_programs')}:</h5>
        {_programs.length
          ? (
            <div className="admin__programs">
              {_programs}
            </div>
          )
          : null
        }
        {_programsOption.length
          ? this.state.showProgramsList
            ? (
              <div>
                <select name="program_id" defaultValue={0}
                  ref={(input) => { this.inputs.program_id = input; }}
                >
                  {_programsOption}
                </select>
                <button className="btn btn-xs btn-success" type="button" onClick={this.onLinkProgram}>
                  <i className="fa fa-check"></i>
                </button>
                <button className="btn btn-xs btn-danger" type="button" onClick={this.onTogglePrograms.bind(this, false)}>
                  <i className="fa fa-ban"></i>
                </button>
              </div>
            )
            : (
              <div>
                <a type="button" className="btn btn-icon btn-icon--add" onClick={this.onTogglePrograms.bind(this, true)}>
                  <span>{_TRANS('all', 'link_program')}</span>
                </a>
              </div>
            )
          : null
        }
      </div>
    );
  }
}

export default Container.create(CampEditProgram);