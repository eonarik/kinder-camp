import React, { Component } from 'react';

import _TRANS from "../../../const/trans";
import { timeoutChangeInput } from "../../../config";

class CampEditAddress extends Component {
  inputs = {};
  changeInputCounter = 0;

  constructor (props) {
    super(props);
    this.state = {
      description_input_value: props.obj.camp_address_description,
    }
  }

  onChangeInput = (event) => {
    this.changeInputCounter++;

    this.setState({
      description_input_value: event.target.value
    });

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
        <div className="form-group">
          <h5>{_TRANS('camp', 'place_address')}</h5>
          <input id="settings-address" name="address" type="text" className="form-control" placeholder={_TRANS('camp', 'input_address')} 
            defaultValue={obj.camp_address}
            ref={(input) => { this.inputs.address = input; }}
            onChange={this.onChangeInput}
          />
          <div className="settings__map-empty">
            {_TRANS('all', 'input_address_hint')}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="settings-description">{_TRANS('camp', 'office_description')}</label>
          <textarea className="form-control" name="address_description" id="settings-description" rows="3" placeholder={_TRANS('camp', 'office_description_sample')} 
            value={this.state.description_input_value}
            ref={(input) => { this.inputs.address_description = input; }}
            onChange={this.onChangeInput}
          ></textarea>
        </div>
      </div>
    );
  }
}

export default CampEditAddress;