import React, { Component } from 'react';

import { Container } from "flux/utils";
import ProgramStore from "../../../data/ProgramStore.js";
import CampStore from "../../../data/CampStore.js";
import Actions from '../../../data/Actions';

import ProgramEdit from '../ProgramEdit';

class ProgramItem extends Component {
  static defaultProps = {
    isUpdate: false
  }

  onUpdate = () => {
    this.props.setUpdatedProgram(this.props.obj.id);
  }

  render() {
    const obj = this.props.obj;
    return this.props.isUpdate
        ? <ProgramEdit
            obj={obj}
            setUpdatedProgram={this.props.setUpdatedProgram}
          />
        : <h3 onClick={this.onUpdate}>{obj.name}</h3>
  }
}

class ProgramsList extends Component {

  static getStores() {
    return [ ProgramStore, CampStore ];
  }

  static calculateState(prevState) {
    return {
      onReceiveProgramsList: Actions.receiveProgramsList,
      programs: ProgramStore.getState().get('programs'),
      // onUpdateProgram: Actions.updateProgram,
      updatedProgramProps: ProgramStore.getState().get('updatedProgramProps'),
      updatedCampId: CampStore.getState().get('updatedCampId'),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      updatedProgramId: null
    }
  }

  setUpdatedProgram = (id) => {
    this.setState({
      updatedProgramId: id
    });
  }

  componentDidMount = () => {
    this.state.onReceiveProgramsList();
  }

  render() {
    const list = this.state.programs;
    let programs = [];
    for (let i in list) {
      let program = list[i];
      let isUpdate = false;

      if (this.state.updatedProgramId && program.id == this.state.updatedProgramId) {
        isUpdate = true;
      }

      if (this.state.updatedProgramProps && program.id == this.state.updatedProgramProps.id) {
        program = Object.assign(program, this.state.updatedProgramProps);
      }

      programs.push(
        <ProgramItem
          key={program.id}
          obj={program}
          isUpdate={isUpdate}
          setUpdatedProgram={this.setUpdatedProgram}
        />
      );
    }

    return (
      <div>
        {programs}
      </div>
    );
  }
}

export default Container.create(ProgramsList);