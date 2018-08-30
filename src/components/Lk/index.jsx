import React, { Component } from 'react';

import FormControl from '../ui/FormControl';

import _TRANS from "../../const/trans";
import { notyConfig } from '../../config';

const Noty = require('noty');
Noty.overrideDefaults(notyConfig);

class Lk extends Component {

  inputs = [];

  state = {
    userProfile: null,
  }

  inputChange = (values) => {
    this.props.onUpdateUserProfile(values);
  }

  onAddImage = (name = '') => {
    let input = this.inputs[name];
    input.click();
    input.onchange = (e) => {
      this.props.onUpdateUserProfile({
        [name]: e.target.files[0],
      }).then((response) => {
        this.props.onReceiveUserProfile();
      });
    }
  }

  removeSocial = (index) => {
    if (this.props.userProfile.social && this.props.userProfile.social[index]) {
      let social = [...this.props.userProfile.social];
      social.splice(index, 1);
      this.props.onUpdateUserProfile({
        social
      }).then((response) => {
        // this.props.onReceiveUserProfile();
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
        // this.props.onReceiveUserProfile();
      });
    }
  }

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

    if (password_new != password_new_confirm) {
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

  // componentDidMount = () => {
  //   if (!this.props.userProfile || !Object.keys(this.props.userProfile).length) {
  //     this.props.onReceiveUserProfile();
  //   }
  // }

  render() {
    let userProfile = this.props.userProfile || {};

    if (!Object.keys(userProfile).length) {
      return null;
    }

    let social = [];
    if (userProfile && userProfile.social) {
      userProfile.social = Object.values(userProfile.social);
      for (let i in userProfile.social) {
        let link = userProfile.social[i];
        social.push(
          <li key={i}>
            <a className="btn btn-danger settings__btn-circle" onClick={this.removeSocial.bind(this, i)}><i className="fa fa-minus"></i></a>
            <a className="text-underline" rel="nofollow,noindex" target="_blank" href={link}>{link}</a>
          </li>
        );
      }
    }

    return (
      <div>
        <h4 className="text-success">Личный кабинет</h4>
        <form className="settings">
          <div className="row row-sm">
            <div className="col-xs-12 col-md-6">
              <h3 className="settings__subtitle">Общая контактная информация для всех лагерей вашего аккаунта (недоступно клиентам)</h3>
              <div className="settings__group">
                <div className="row flex-row flex-row--vcenter form-group">
                  <div className="col-xs-12 col-md-6">
                    <label htmlFor="settings-director_photo">Фото директора</label>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    {userProfile.director_photo
                      ? (
                        <div className="flex-row flex-row--vcenter flex-row--nowrap">
                          <div className="admin__intro-image-img" 
                            data-toggle="tooltip"
                            onClick={this.onAddImage.bind(this, 'director_photo')}
                            style={{
                              height: 120,
                              minWidth: 90,
                              backgroundImage: "url('"+ userProfile.director_photo +"')"
                            }}
                          ></div>
                          <i className="text-right text-muted">Нажмите на фото чтобы заменить его</i>
                        </div>
                      )
                      : (
                        <div className="admin__intro-image">
                          <div className="admin__intro-image-img admin__intro-thumb admin__intro-thumb--add" 
                            data-toggle="tooltip" 
                            title={_TRANS('all', 'add_photo')} 
                            onClick={this.onAddImage.bind(this, 'director_photo')}
                            style={{
                              height: 120,
                              width: 90
                            }}
                          ></div>
                        </div>
                      )
                    }
                  </div>
                </div>
                <input type="file"
                  id="settings-director_photo"
                  ref={(input) => { this.inputs.director_photo = input; }}
                  style={{ display: 'none' }}
                />
                <FormControl 
                  formGroupType="horizontal"
                  label="ФИО директора"
                  id="settings-director_fullname"
                  name="director_fullname"
                  defaultValue={userProfile.director_fullname}
                  onChange={this.inputChange}
                />
                <FormControl 
                  formGroupType="horizontal"
                  label="Моб. телефон директора"
                  id="settings-director_phone"
                  name="director_phone"
                  defaultValue={userProfile.director_phone}
                  onChange={this.inputChange}
                />
                <FormControl
                  formGroupType="horizontal" 
                  label="E-Mail директора"
                  id="settings-director_email"
                  name="director_email"
                  defaultValue={userProfile.director_email}
                  onChange={this.inputChange}
                />
              </div>
              <div className="settings__group">
                <div className="row flex-row flex-row--vcenter form-group">
                  <div className="col-xs-12 col-md-6">
                    <label htmlFor="settings-manager_photo"><span>Фото сотрудника, ответственного <b>за работу с <nobr>kinder-camp.ru</nobr></b></span></label>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <div className="admin__intro-image">
                      {userProfile.manager_photo
                        ? (
                          <div className="flex-row flex-row--vcenter flex-row--nowrap">
                            <div className="admin__intro-image-img"
                              data-toggle="tooltip"
                              onClick={this.onAddImage.bind(this, 'manager_photo')}
                              style={{
                                height: 120,
                                minWidth: 90,
                                backgroundImage: "url("+ userProfile.manager_photo +")"
                              }}
                            ></div>
                            <i className="text-right text-muted">Нажмите на фото чтобы заменить его</i>
                          </div>
                        )
                        : (
                          <div className="admin__intro-image-img admin__intro-thumb admin__intro-thumb--add" 
                            data-toggle="tooltip" 
                            title={_TRANS('all', 'add_photo')} 
                            onClick={this.onAddImage.bind(this, 'manager_photo')}
                            style={{
                              height: 120,
                              width: 90
                            }}
                          ></div>
                        )
                      }
                    </div>
                  </div>
                </div>
                <input type="file"
                  id="settings-manager_photo"
                  ref={(input) => { this.inputs.manager_photo = input; }}
                  style={{ display: 'none' }}
                />
                <FormControl 
                  formGroupType="horizontal"
                  label="ФИО сотрудника"
                  id="settings-manager_fullname"
                  name="manager_fullname"
                  defaultValue={userProfile.manager_fullname}
                  onChange={this.inputChange}
                />
                <FormControl 
                  formGroupType="horizontal"
                  label="Моб. телефон сотрудника"
                  id="settings-manager_phone"
                  name="manager_phone"
                  defaultValue={userProfile.manager_phone}
                  onChange={this.inputChange}
                />
                <FormControl 
                  formGroupType="horizontal"
                  label="E-Mail сотрудника"
                  id="settings-manager_email"
                  name="manager_email"
                  defaultValue={userProfile.manager_email}
                  onChange={this.inputChange}
                />
              </div>
              <div className="settings__group">
                <FormControl 
                  formGroupType="horizontal"
                  label="E-Mail для уведомления о бронях"
                  id="settings-bron_email"
                  name="bron_email"
                  defaultValue={userProfile.bron_email}
                  onChange={this.inputChange}
                />
                <FormControl 
                  formGroupType="horizontal"
                  label="Моб. телефон для уведомления о бронях"
                  id="settings-bron_phone"
                  name="bron_phone"
                  defaultValue={userProfile.bron_phone}
                  onChange={this.inputChange}
                />
                <FormControl 
                  formGroupType="horizontal"
                  label="Доп. E-Mail для уведомления о бронях"
                  id="settings-bron_email_ext"
                  name="bron_email_ext"
                  defaultValue={userProfile.bron_email_ext}
                  onChange={this.inputChange}
                />
              </div>

              <h3 className="settings__subtitle">Социальные сети</h3>

              {social.length 
                ? (
                  <ul className="settings__social">
                    {social}
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
              <a className="btn btn-success btn-rounded btn-lg" onClick={this.changePassword}>Сменить пароль</a>

            </div>
            <div className="col-xs-12 col-md-6">
              <h3 className="settings__subtitle">Офис</h3>

              <FormControl 
                formGroupType="horizontal"
                label="Телефон"
                id="settings-office_phone"
                name="office_phone"
                defaultValue={userProfile.office_phone}
                onChange={this.inputChange}
              />
              <FormControl 
                formGroupType="horizontal"
                label="Дополнительный телефон"
                id="settings-office_phone_ext"
                name="office_phone_ext"
                defaultValue={userProfile.office_phone_ext}
                onChange={this.inputChange}
              />
              <div className="form-group">
                <label htmlFor="office-address">Адрес офиса для заключения договора</label>
                <input id="office-address" name="address" type="text" className="form-control" 
                  defaultValue={userProfile.office_address}
                  onChange={this.inputChange}
                />
                <div className="settings__map-empty">
                  После введения адреса<br />
                  система автоматически<br />
                  сформирует карту
                </div>
              </div>

              <FormControl 
                label="Как проехать до офиса и время работы"
                id="settings-office_address_description"
                type="textarea"
                name="office_address_description"
                defaultValue={userProfile.office_address_description}
                onChange={this.inputChange}
              />

              <div className="settings__group">
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <h3 className="settings__subtitle">Договор и реквизиты</h3>
                    <p>
                      <a href="#" className="btn btn-success btn-lg btn-block btn-rounded">Заполнить реквизиты</a>
                    </p>
                    <p>
                      <a href="#" className="btn btn-danger btn-lg btn-block btn-rounded">Скачать договор</a>
                    </p>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <p>
                      Получатель: ФГБОУ «МДЦ «Артек»
                              </p>

                    <p>
                      Юридический: 298645, Республика Крым,
                      г. Ялта, пгт Гурзуф, ул. Ленинградская, 41
                              </p>

                    <p>
                      Фактический: 298645, Республика Крым,
                      г. Ялта, пгт Гурзуф, ул. Ленинградская, 41
                              </p>

                    <p>
                      Р/С № 40501810435102000001<br />
                      Л/С 20756Щ76730
                              </p>

                    <p>
                      (в УФК по Республике Крым отдел №20
                      отделение по Республике Крым
                      Центрального Банка Российской
                      Федерации)
                              </p>

                    <p>
                      ОГРН 1149102030770<br />
                      БИК 043510001<br />
                      ИНН 9103003070<br />
                      КПП 910301001<br />
                    </p>

                    <p><a href="#" className="text-underline">Редактировать</a></p>
                  </div>
                </div>
              </div>

              <div className="row flex-row flex-row--vcenter">
                <div className="col-xs-6 text-center">
                  <a href="#" className="text-underline">
                    Связаться с поддержкой
                  </a>
                </div>
                {/* <div className="col-xs-6">
                  <button type="submit" className="btn btn-danger btn-block btn-rounded btn-lg">Сохранить информацию</button>
                </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Lk;