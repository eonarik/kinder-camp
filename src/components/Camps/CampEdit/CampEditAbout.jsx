import React, { Component } from 'react';

// import { Container } from "flux/utils";
// import CampStore from "../../../data/CampStore.js";
// import Actions from '../../../data/Actions';

import FormControl from '../../ui/FormControl';

import _TRANS from "../../../const/trans";

class CampEditAbout extends Component {
  onChangeInput = (values) => {
    return new Promise((resolve, reject) => {
      this.props.onUpdateCamp(this.props.obj.id, values).then(resolve);
    });
  }

  render() {
    let obj = this.props.obj;

    return (
      <div>
        <h5>О лагере</h5>

        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          id="settings-pagetitle"
          label={_TRANS('camp', 'short_name')}
          name="pagetitle"
          defaultValue={obj.pagetitle}
          onChange={this.onChangeInput}
        />

        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          id="settings-camp_legal_name"
          label={_TRANS('camp', 'legal_name')}
          name="camp_legal_name"
          defaultValue={obj.camp_legal_name}
          onChange={this.onChangeInput}
        />

        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          id="settings-camp_inn"
          label={_TRANS('camp', 'inn')}
          name="camp_inn"
          defaultValue={obj.camp_inn}
          onChange={this.onChangeInput}
        />

        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          id="settings-camp_foundation_date"
          label={_TRANS('camp', 'foundation_date')}
          name="camp_foundation_date"
          type="date"
          plcaholder="YYYY-MM-DD"
          defaultValue={obj.camp_foundation_date}
          onChange={this.onChangeInput}
        />
      </div>
    );
  }
}

// export default Container.create(CampEditAbout);
export default CampEditAbout;