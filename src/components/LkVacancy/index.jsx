import React, { Component } from 'react';

import LkParentIntro from '../LkParent/LkParentIntro';
import LkParentIntroExt from '../LkParent/LkParentIntroExt';
import LkParentSocial from '../LkParent/LkParentSocial';
import LkParentNotify from '../LkParent/LkParentNotify';
import LkParentChangePassword from '../LkParent/LkParentChangePassword';

class LkParent extends Component {

  inputChange = (values) => {
    return new Promise ((resolve) => {
      this.props.onUpdateUserProfile(values).then((response) => {
        if (Object.keys(values).length === 1) {
          let mainKey = null;
          for (let key in values) {
            mainKey = key;
          }
          resolve(response[mainKey]);
        }
      });
    });
  }

  render() {
    let userProfile = this.props.userProfile;

    return (
      <div>
        <h4 className="text-success">Настройки аккаунта</h4>

        <form className="settings">
          <div className="settings__group">
            <div className="row">
              <div className="col-xs-12 col-md-6">

                <LkParentIntro
                  userProfile={userProfile}
                  inputChange={this.inputChange}
                />

                <hr />
                <LkParentNotify
                  userProfile={userProfile}
                  onUpdateUserProfile={this.props.onUpdateUserProfile}
                />
              </div>

              <div className="col-xs-12 col-md-6">

                <LkParentIntroExt
                  userProfile={userProfile}
                  inputChange={this.inputChange}
                />

                <hr />
                <LkParentSocial
                  userProfile={userProfile}
                  onUpdateUserProfile={this.props.onUpdateUserProfile}
                />

                <hr />
                <LkParentChangePassword
                  onUpdateUserProfile={this.props.onUpdateUserProfile}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LkParent;