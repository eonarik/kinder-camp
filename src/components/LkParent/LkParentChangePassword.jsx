import React, { Component } from 'react';

import { notyConfig } from '../../config';

const Noty = require('noty');
Noty.overrideDefaults(notyConfig);

class LkParentChangePassword extends Component {
  inputs = {}

  changePassword = () => {
    let password_old = this.inputs.password_old.value;
    let password_new = this.inputs.password_new.value;
    let password_new_confirm = this.inputs.password_new_confirm.value;

    if (!password_old || !password_new || !password_new_confirm) {
      new Noty({
        text: 'Заполнение всех полей для смены пароля обязательно!',
        type: 'error',
      }).show();
      return;
    }

    if (password_new !== password_new_confirm) {
      new Noty({
        text: 'Введенные пароли не совпадают!',
        type: 'error',
      }).show();
      return;
    }
    
    this.props.onUpdateUserProfile({
      password_old,
      password_new,
      password_new_confirm
    }).then(() => {
      // new Noty({
      //   text: 'Успешная смена пароля',
      //   type: 'success',
      // }).show();
      this.inputs.password_old.value = '';
      this.inputs.password_new.value = '';
      this.inputs.password_new_confirm.value = '';
    });
  }

  render() {
    return (
      <div>
        <h3 className="settings__subtitle">Сменить пароль</h3>
        
        <div className="row row-sm">
          <div className="col-xs-4 form-group">
            <label htmlFor="settings-password_old">Старый пароль</label>
            <input type="password" name="password_old" id="settings-password_old" 
              className="form-control"
              ref={(input) => { this.inputs.password_old = input; }}
            />
          </div>
          <div className="col-xs-4 form-group">
            <label htmlFor="settings-password_new">Новый пароль</label>
            <input type="password" name="password_new" id="settings-password_new" 
              className="form-control" 
              ref={(input) => { this.inputs.password_new = input; }}
            />
          </div>
          <div className="col-xs-4 form-group">
            <label htmlFor="settings-password_new_confirm">Повторите пароль</label>
            <input type="password" name="password_new_confirm" 
              id="settings-password_new_confirm" 
              className="form-control" 
              ref={(input) => { this.inputs.password_new_confirm = input; }}
            />
          </div>
        </div>
        <div className="row row-sm flex-row flex-row--vcenter">
          <div className="col-xs-12 col-md-4">
            <div className="form-group">
              <a className="btn btn-success btn-rounded btn-lg" onClick={this.changePassword}>Сменить пароль</a>
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="form-group text-center">
              <a href="/support/" className="text-underline">
                Связаться с поддержкой
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LkParentChangePassword;