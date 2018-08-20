import React, { Component } from 'react';

// import { Container } from "flux/utils";
// import CampStore from "../../../data/CampStore.js";
// import Actions from '../../../data/Actions';

import _TRANS from "../../../const/trans";
import { timeoutChangeInput } from "../../../config";

class CampEditAbout extends Component {
  inputs = {};
  changeInputCounter = 0;

  // static getStores() {
  //   return [CampStore];
  // }

  // static calculateState(prevState) {
  //   return {
  //     // onUpdateCamp: Actions.updateCamp,
  //   };
  // }

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
        this.props.onUpdateCamp(this.props.obj.id, values);
      }
    }, timeoutChangeInput);
  }

  render() {
    let obj = this.props.obj;

    return (
      <div>
        <h5>О лагере</h5>
        <div className="row flex-row flex-row--vcenter form-group">
          <div className="col-xs-12 col-md-4">
            <label htmlFor="settings-short_name" className="settings__label">{_TRANS('camp', 'short_name')}</label>
          </div>
          <div className="col-xs-12 col-md-8">
            <input id="settings-short_name" name="name" type="text" className="form-control"
              defaultValue={obj.name}
              ref={(input) => { this.inputs.name = input; }}
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="row flex-row flex-row--vcenter form-group">
          <div className="col-xs-12 col-md-4">
            <label htmlFor="settings-legal_name" className="settings__label">{_TRANS('camp', 'legal_name')}</label>
          </div>
          <div className="col-xs-12 col-md-8">
            <input id="settings-legal_name" name="legal_name" type="text" className="form-control" 
              defaultValue={obj.legal_name} 
              ref={(input) => { this.inputs.legal_name = input; }}
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="row flex-row flex-row--vcenter form-group">
          <div className="col-xs-12 col-md-4">
            <label htmlFor="settings-inn" className="settings__label">{_TRANS('camp', 'inn')}</label>
          </div>
          <div className="col-xs-12 col-md-8">
            <input id="settings-inn" name="inn" type="text" className="form-control" 
              defaultValue={obj.inn}
              ref={(input) => { this.inputs.inn = input; }}
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="row flex-row flex-row--vcenter form-group">
          <div className="col-xs-12 col-md-4">
            <label htmlFor="settings-foundation_date" className="settings__label">{_TRANS('camp', 'foundation_date')}</label>
          </div>
          <div className="col-xs-12 col-md-8">
            <input id="settings-foundation_date" name="foundation_date" type="text" className="form-control" 
              defaultValue={obj.foundation_date}
              ref={(input) => { this.inputs.foundation_date = input; }}
              onChange={this.onChangeInput}
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>
      </div>
    );
  }
}

// export default Container.create(CampEditAbout);
export default CampEditAbout;