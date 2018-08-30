import React, { Component } from 'react';

import FormControl from '../ui/FormControl';

class LkParentIntroExt extends Component {
  inputs = {}

  render() {
    let userProfile = this.props.userProfile;

    return (
      <div>
        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          label="Страна"
          id="settings-country"
          name="country"
          defaultValue={userProfile.country}
          onChange={this.props.inputChange}
        />
        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          label="Ваш регион"
          id="settings-region"
          name="region"
          defaultValue={userProfile.region}
          onChange={this.props.inputChange}
        />
        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          label="Город где проживаете"
          id="settings-city"
          name="city"
          defaultValue={userProfile.city}
          onChange={this.props.inputChange}
        />
        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          label="Ваш номер телефона"
          id="settings-phone"
          name="phone"
          defaultValue={userProfile.phone}
          onChange={this.props.inputChange}
        />
      </div>
    );
  }
}

export default LkParentIntroExt;