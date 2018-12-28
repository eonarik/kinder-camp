import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "../../data/CampStore.js";
import Actions from '../../data/Actions/camps';

import FormControl from '../ui/FormControl';

class VacancyAddForm extends Component {

  state = {
    errors: {}
  }

  static getStores() {
    return [CampStore];
  }

  static calculateState(prevState) {
    return {
      onReceiveCampsList: Actions.receiveCampsList,
      camps: CampStore.getState().get('camps'),
    };
  }

  submitForm = (e) => {
    e.preventDefault();
    let form = e.target;

    this.props.onSubmitForm(new FormData(form))
    .catch((errs) => {
      let errors = {};
      for (let i in errs) {
        errors[errs[i].id] = errs[i].msg;
      }
      this.setState({
        errors
      });
    });
  }

  componentDidMount = () => {
    if (!this.state.camps || !this.state.camps.length) {
      this.state.onReceiveCampsList({
        status_id: 1
      });
    }
  }

  render () {
    let obj = this.props.obj;
    let errors = this.state.errors;
    let camps = this.state.camps;
    let _campsOption = [
      <option key="0" value="">Выбрать из существующих</option>
    ];
    let _selectCamps = [];
    if (camps && camps.length) {
      for(let i in camps) {
        let camp = camps[i];
        _campsOption.push(
          <option key={camp.id} value={camp.id}>{camp.pagetitle}</option>
        );
      }
      _selectCamps.push(
        <select 
          key="select-camps" 
          className="form-control"
          name="camp_id"
          id="vacancy-camp"
          defaultValue={obj.tvs.camp_id.value}
        >
          {_campsOption}
        </select>
      );
    }

    return (
      <form className="settings" name="vacancy" onSubmit={this.submitForm}>
        <div className="settings__group">
          <div className="row row-sm">
            <div className="col-xs-12 col-md-6">
              <FormControl
                label="Наименование вакансии"
                id="vacancy-name"
                name="pagetitle"
                errorMessage={errors.pagetitle || ''}
                defaultValue={(obj && obj.pagetitle) || ''}
              />
              <FormControl
                label="Требования к кандидату"
                type="textarea"
                id="vacancy-requirements"
                name="requirements"
                errorMessage={errors.requirements || ''}
                defaultValue={(obj && obj.tvs.requirements && obj.tvs.requirements.value) || ''}
              />
              <FormControl
                label="Дополнительная иформация по вакансии"
                type="textarea"
                id="vacancy-content"
                name="content"
                errorMessage={errors.content || ''}
                defaultValue={(obj && obj.content) || ''}
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="row flex-row flex-row--vcenter">
                <div className="col-xs-12 col-md-4">
                  <label htmlFor="vacancy-camp">Место работы</label>
                </div>
                <div className="col-xs-12 col-md-8">
                  {_selectCamps}
                  {errors.camp_id
                    ? <small className="text-danger">{errors.camp_id}</small>
                    : null
                  }
                </div>
              </div>

              <FormControl
                label="Должностные обязанности"
                type="textarea"
                id="vacancy-official_duties"
                name="official_duties"
                errorMessage={errors.official_duties || ''}
                defaultValue={(obj && obj.tvs.official_duties && obj.tvs.official_duties.value) || ''}
              />
              <FormControl
                label="Бонусы"
                id="vacancy-bonuses"
                name="bonuses"
                errorMessage={errors.bonuses || ''}
                defaultValue={(obj && obj.tvs.bonuses && obj.tvs.bonuses.value) || ''}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-3">
              <FormControl
                label="Заработная плата"
                id="vacancy-wages"
                name="wages"
                errorMessage={errors.wages || ''}
                defaultValue={(obj && obj.tvs.wages && obj.tvs.wages.value) || ''}
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <FormControl
                label="Тип занятости"
                id="vacancy-employment_type"
                name="employment_type"
                errorMessage={errors.employment_type || ''}
                defaultValue={(obj && obj.tvs.employment_type && obj.tvs.employment_type.value) || ''}
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <FormControl
                label="Опыт работы"
                id="vacancy-bonuses"
                name="experience"
                errorMessage={errors.experience || ''}
                defaultValue={(obj && obj.tvs.experience && obj.tvs.experience.value) || ''}
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <FormControl
                label="Образование"
                id="vacancy-education"
                name="education"
                errorMessage={errors.education || ''}
                defaultValue={(obj && obj.tvs.education && obj.tvs.education.value) || ''}
              />
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-danger">Сохранить</button> &nbsp;&nbsp;
            <a className="btn btn-default" onClick={this.props.onCancel}>
              <i className="fa fa-cancel"></i> Отмена
            </a>
          </div>
        </div>
      </form>
    );
  }
}

export default Container.create(VacancyAddForm);