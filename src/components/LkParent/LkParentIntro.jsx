import React, { Component } from 'react';

import FormControl from '../ui/FormControl';
import FormPhoto from '../ui/FormPhoto';

class LkParentIntro extends Component {

  render() {
    let userProfile = this.props.userProfile;

    return (
      <div>

        <FormPhoto 
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          id="settings-photo"
          label="Добавить фото"
          name="photo"
          defaultValue={userProfile.photo}
          onChange={this.props.inputChange}
        />

        <div className="row row-sm">
          <div className="col-12 col-md-4">
            <FormControl
              label="Фамилия"
              id="settings-lastname"
              name="lastname"
              defaultValue={userProfile.lastname}
              onChange={this.props.inputChange}
            />
          </div>
          <div className="col-12 col-md-4">
            <FormControl
              label="Имя"
              id="settings-name"
              name="name"
              defaultValue={userProfile.name}
              onChange={this.props.inputChange}
            />
          </div>
          <div className="col-12 col-md-4">
            <FormControl
              label="Отчество"
              id="settings-middlename"
              name="middlename"
              defaultValue={userProfile.middlename}
              onChange={this.props.inputChange}
            />
          </div>
        </div>

        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          label="Эл. почта"
          id="settings-email"
          name="email"
          defaultValue={userProfile.email}
          onChange={this.props.inputChange}
        />

        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-5'
          ]}
          label="Дата рождения"
          id="settings-dob"
          name="dob"
          type="date"
          defaultValue={userProfile.dob}
          onChange={this.props.inputChange}
        />
        <FormControl
          formGroupType="horizontal"
          cols={[
            'col-xs-12 col-md-4',
            'col-xs-12 col-md-8'
          ]}
          label="Мобильный телефон для смс оповещений"
          id="settings-mobile_sms"
          name="mobile_sms"
          defaultValue={userProfile.mobile_sms}
          onChange={this.props.inputChange}
        />

      </div>
    );
  }
}

export default LkParentIntro;