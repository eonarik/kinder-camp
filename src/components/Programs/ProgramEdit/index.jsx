import React, { Component } from 'react';

import { Container } from "flux/utils";
import ProgramStore from "../../../data/ProgramStore.js";
import Actions from '../../../data/Actions/programs';

import _TRANS from "../../../const/trans";
import { timeoutChangeInput } from "../../../config";

class ProgramEdit extends Component {

  static getStores() {
    return [ ProgramStore ];
  }

  static calculateState(prevState) {
    return {
      onUpdateProgram: Actions.updateProgram,
    };
  }

  inputs = {}
  changeInputCounter = 0;

  constructor(props) {
    super(props);
    this.state = {
      _isChangeName: false,
      _obj: props.obj
    }
  }

  onChangeInput = () => {
    this.changeInputCounter++;

    setTimeout(() => {
      this.changeInputCounter--;
      if (this.changeInputCounter === 0) {
        // update
        let values = [];
        for (let key in this.inputs) {
          values[key] = this.inputs[key].value;
        }
        this.state.onUpdateProgram(this.state._obj.id, values);
      }
    }, timeoutChangeInput);
  }

  toggleChangeName = (flag) => {
    this.setState({
      _isChangeName: flag,
    });
  }

  onUpdateName = () => {
    this.state.onUpdateProgram(this.state._obj.id, {
      name: this.inputs.name.value
    }).then((updatedProgram) => {
      let _obj = {
        ...this.state._obj,
        ...updatedProgram
      }
      this.setState({
        _obj,
        _isChangeName: false,
      });
    });
  }

  saveProgram = () => {
    let _values = {};
    for (let key in this.inputs) {
      _values[key] = this.inputs[key].value;
    }
    this.state.onUpdateProgram(this.state._obj.id, _values).then((updatedProgram) => {
      let _obj = {
        ...this.state._obj,
        ...updatedProgram
      }
      this.setState({
        _obj,
      });
      this.onClose();
    });
  }

  onClose = () => {
    this.props.setUpdatedProgram(null);
  }

  render() {
    const obj = this.state._obj;
    return (
      <div className="settings__group program-edit">
        <span className="btn btn-danger pull-right" onClick={this.onClose}>{_TRANS('all', 'close')}</span>

        {!this.state._isChangeName
          ? (
            <div className="program-edit__name">
              {obj.name} &nbsp;
              <span className="btn btn-xs btn-default" onClick={this.toggleChangeName.bind(this, true)}>
                <i className="fa fa-pencil"></i>
              </span>
            </div>
          )
          : (
            <div className="program-edit__name">
              <input type="text" defaultValue={obj.name}
                ref={(input) => { this.inputs.name = input; }}
              /> &nbsp;
              <span className="btn btn-xs btn-success" onClick={this.onUpdateName}>
                <i className="fa fa-check"></i>
              </span>
              <span className="btn btn-xs btn-danger" onClick={this.toggleChangeName.bind(this, false)}>
                <i className="fa fa-ban"></i>
              </span>
            </div>
          )
        }
        <div className="form-group">
          <h5>{_TRANS('program', 'introtext')}</h5>
          <textarea className="form-control" name="introtext" id="program-introtext" rows="9" 
            defaultValue={obj.introtext}
            ref={(input) => { this.inputs.introtext = input; }} 
            onChange={this.onChangeInput}
          />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <h5>{_TRANS('program', 'shedule_shifts')}</h5>
              <textarea className="form-control" name="shedule_shifts" id="program-shedule_shifts" rows="9" 
                defaultValue={obj.shedule_shifts}
                ref={(input) => { this.inputs.shedule_shifts = input; }} 
                onChange={this.onChangeInput}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <h5>{_TRANS('program', 'day_mode')}</h5>
              <textarea className="form-control" name="day_mode" id="program-day_mode" rows="9" 
                defaultValue={obj.day_mode}
                ref={(input) => { this.inputs.day_mode = input; }}
                onChange={this.onChangeInput}
              />
            </div>
          </div>
        </div>

        {/*<div className="form-group">
          <a className="btn btn-danger btn-lg" href="javascript:;" onClick={this.saveProgram}>Сохранить</a>
        </div>*/}
      </div>
    );
  }
}

export default Container.create(ProgramEdit);