import React, { Component } from 'react';

import FormControl from '../ui/FormControl';

class LkParentNotify extends Component {
  inputs = {}

  constructor (props) {
    super(props);

    this.state = {
      notify_email: this.props.userProfile.notify_email === 'true',
      notify_sms: this.props.userProfile.notify_sms === 'true'
    }
  }

  inputChange = (e) => {
    let input = e.target;
    let name = input.getAttribute('name');
    this.props.onUpdateUserProfile({
      [name]: this.state[name] ? 'false' : 'true',
    }).then((object) => {
      this.setState({
        [name]: object[name] === 'true'
      });
    });
  }

  render() {
    // let userProfile = this.props.userProfile;

    return (
      <div>
        <h3 className="settings__subtitle">Уведомления</h3>

        <div className="form-group">
          <div className="custom-checkbox">
            <input id="settings-notify_email" name="notify_email" type="checkbox" value="true"
              onChange={this.inputChange}
              checked={this.state.notify_email}
            />
            <label htmlFor="settings-notify_email">Получать электронные письма со спецпредложениями KinderCamp</label>
          </div>
          <div className="custom-checkbox">
            <input id="settings-notify_sms" name="notify_sms" type="checkbox" value="true"
              onChange={this.inputChange}
              checked={this.state.notify_sms}
            />
            <label htmlFor="settings-notify_sms">Уведомление по SMS о статусе броней</label>
          </div>
        </div>
      </div>
    );
  }
}

export default LkParentNotify;