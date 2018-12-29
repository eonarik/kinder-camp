import React, { Component } from "react";

import _TRANS from "../../../const/trans";

import FormControl from "../../ui/FormControl";
import InputMap from "../../ui/InputMap";

class CampEditAddress extends Component {
  inputChange = values => {
    return new Promise(resolve => {
      this.props.onUpdateCamp(this.props.obj.id, values).then(resolve);
    });
  };

  render() {
    let obj = this.props.obj;

    // if (obj.camp_address) {
    //   let addrObj = JSON.parse(obj.camp_address);
    //   obj.camp_address = addrObj.address;
    // }

    return (
      <div>
        <InputMap
          label={_TRANS("camp", "place_address")}
          id="office-camp_address"
          name="camp_address"
          defaultValue={obj.camp_address}
          onChange={this.inputChange}
        />

        <FormControl
          label={_TRANS("camp", "office_description")}
          id="settings-camp_address_description"
          type="textarea"
          name="camp_address_description"
          defaultValue={obj.camp_address_description}
          onChange={this.inputChange}
        />
      </div>
    );
  }
}

export default CampEditAddress;
