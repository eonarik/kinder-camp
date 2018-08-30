import React, { Component } from 'react';

class LkParentSocial extends Component {
  inputs = {}

  removeSocial = (index) => {
    if (this.props.userProfile.social && this.props.userProfile.social[index]) {
      let social = [...this.props.userProfile.social];
      social.splice(index, 1);
      this.props.onUpdateUserProfile({
        social
      });
    }
  }

  addSocial = () => {
    if (this.inputs.social.value) {
      let social = [...this.props.userProfile.social || []];
      social.push(this.inputs.social.value);
      this.props.onUpdateUserProfile({
        social
      }).then((response) => {
        this.inputs.social.value = '';
      });
    }
  }

  render() {
    let userProfile = this.props.userProfile;
    let _social = [];

    if (userProfile && userProfile.social) {
      userProfile.social = Object.values(userProfile.social);
      for (let i in userProfile.social) {
        let link = userProfile.social[i];
        _social.push(
          <li key={i}>
            <a className="btn btn-danger settings__btn-circle" onClick={this.removeSocial.bind(this, i)}>
              <i className="fa fa-minus"></i>
            </a>
            <a className="text-underline" rel="nofollow,noindex" target="_blank" href={link}>{link}</a>
          </li>
        );
      }
    }

    return (
      <div>
        <h3 className="settings__subtitle">Социальные сети</h3>

        {_social.length 
          ? (
            <ul className="settings__social">
              {_social}
            </ul>
          )
          : null
        }
        <div className="flex-row flex-row--vcenter flex-row--nowrap form-group">
          <a className="btn btn-success settings__btn-circle" onClick={this.addSocial}><i className="fa fa-plus"></i></a>
          <input className="form-control input-sm" type="text" placeholder="Добавить социальную сеть"
            ref={(input) => { this.inputs.social = input; }}
          />
        </div>
      </div>
    );
  }
}

export default LkParentSocial;