import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "../../../data/CampStore.js";
import Actions from '../../../data/Actions/params';

import _TRANS from "../../../const/trans";
import { timeoutChangeInput } from "../../../config";

class CampEditMemory extends Component {
  inputs = {};
  changeInputCounter = 0;

  static getStores() {
    return [CampStore];
  }

  static calculateState(prevState) {
    return {
      onUpdateParam: Actions.updateParam,
      onReceiveParamsList: Actions.receiveParamsList,
    };
  }

  constructor (props) {
    super(props);
    this.state = {
      params: {
        prop_6: '',
        prop_7: '',
        prop_8: '',
        prop_9: '',
      }
    }
  }

  onChangeInput = (event) => {
    this.changeInputCounter++;

    let params = {...this.state.params};
    params[event.target.name] = event.target.value;
    this.setState({
      params 
    });

    setTimeout(() => {
      this.changeInputCounter--;
      if (this.changeInputCounter === 0) {
        // update
        let params = this.state.params;

        for (let key in this.inputs) {
          let value = this.inputs[key].value;

          if (
            typeof params[key] === 'undefined' 
            || (
              value 
              && params[key].value !== value
            )
          ) {
            let type_id = key.replace('prop_', '');

            this.state.onUpdateParam({
              camp_id: this.props.obj.id,
              value,
              type_id,
            });
          }
        }
      }
    }, timeoutChangeInput);
  }

  componentDidMount = () => {
    this.state.onReceiveParamsList({
      camp_id: this.props.obj.id,
      type_id: [6, 7, 8, 9],
    }).then((response) => {
      let params = {};
      for (let i in response) {
        let key = 'prop_' + response[i].type_id;
        params[key] = response[i];
      }
      this.setState({
        params: {
          ...this.state.params,
          ...params
        }
      });
    });
  }

  render() {
    let params = this.state.params;

    return (
      <div className="admin__camp__memory">
        <h5>{_TRANS('camp', 'memory_for_client')}</h5>
        <div className="row flex-row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label htmlFor="settings-prop_6">В стоимость включено</label>
              <textarea className="form-control" rows="5" name="prop_6"
                value={params.prop_6.value}
                ref={(input) => { this.inputs.prop_6 = input; }}
                onChange={this.onChangeInput}
              ></textarea>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label htmlFor="settings-prop_7">Список обязательных документов для поездки в лагерь</label>
              <textarea className="form-control" rows="5" name="prop_7"
                value={params.prop_7.value}
                ref={(input) => { this.inputs.prop_7 = input; }}
                onChange={this.onChangeInput}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label htmlFor="settings-prop_8">Список обязательных документов для поездки в лагерь</label>
              <textarea className="form-control" rows="5" name="prop_8" 
                value={params.prop_8.value}
                ref={(input) => { this.inputs.prop_8 = input; }}
                onChange={this.onChangeInput}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label htmlFor="settings-prop_9">Что положить в чемодан ребенку</label>
              <textarea className="form-control" rows="5" name="prop_9" 
                value={params.prop_9.value}
                ref={(input) => { this.inputs.prop_9 = input; }}
                onChange={this.onChangeInput}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Container.create(CampEditMemory);