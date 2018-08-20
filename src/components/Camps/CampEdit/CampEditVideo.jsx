import React, { Component } from 'react';

import _TRANS from "../../../const/trans";
import { timeoutChangeInput } from "../../../config";

class CampEditVideo extends Component {
  inputs = {};
  changeInputCounter = 0;

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
        <h5>{_TRANS('camp', 'video_of_camp')}</h5>
        <div className="form-group">
          <input type="text" className="form-control" name="video_link" 
            defaultValue={obj.video_link} 
            ref={(input) => { this.inputs.description = input; }}
            onChange={this.onChangeInput}
          />
        </div>
      </div>
    );
  }
}

export default CampEditVideo;