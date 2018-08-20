import React, { Component } from 'react';

import { Container } from "flux/utils";
import VacancyStore from "../../data/VacancyStore";

import VacancyAddForm from './VacancyAddForm';

class VacanciesListVacancy extends Component {
  constructor (props) {
    super(props);

    this.state = {
      published: props.obj.published,
      isUpdate: false,
    }
  }

  toggleUpdate = () => {
    this.setState({
      isUpdate: !this.state.isUpdate
    });
  }

  deleteToggle = () => {
    let obj = this.props.obj;
    let deleted = obj.deleted ? false : true;
    if (!deleted && window.confirm('Вы действительно хотите удалить вакансию?')) {
      this.props.updateVacancy(obj.id, {
        deleted
      });
    }
  }

  publishToggle = () => {
    let obj = this.props.obj;
    this.props.updateVacancy(obj.id, {
      published: this.state.published == 1 ? 0 : 1
    }).then((object) => {
      this.setState({
        published: object.published == 1 ? 1 : 0
      });
    });
  }

  updateVacancy = (data) => {
    if (data instanceof FormData) {
      data.append('isValidate', 1);
    } else {
      data.isValidate = 1;
    }
    return new Promise((resolve, reject) => {
      let obj = this.props.obj;
      this.props.updateVacancy(obj.id, data)
      .then((object) => {
        this.setState({
          isUpdate: false
        });
      }, reject)
    });
  }

  render() {
    let obj = this.props.obj;
    return !this.state.isUpdate
      ? (
        <div className={"vacancy" + (this.state.published == 1 ? ' vacancy--active' : '')}>
          <div className="row">
            <div className="col-xs-12 col-md-9">
              <h4>{obj.pagetitle}</h4>
              <h5>Требования к кандидату:</h5>
              <div className="vacancy__text">{obj.tvs.requirements && obj.tvs.requirements.value}</div>

              <h5>Должностные обязанности:</h5>
              <div className="vacancy__text">{obj.tvs.official_duties && obj.tvs.official_duties.value}</div>

              <h5>Дополнительная информация по вакансии:</h5>
              <div className="vacancy__text">{obj.content}</div>

              <h5>Дополнительные бонусы:</h5>
              <div className="vacancy__text">{obj.tvs.bonuses && obj.tvs.bonuses.value}</div>
            </div>
            <div className="col-xs-12 col-md-3">
              <ul className="list-unstyled">
                {obj.tvs.employment_type 
                  ? <li>Работа: <b>{obj.tvs.employment_type.value}</b></li>
                  : null
                }
                {obj.tvs.experience 
                  ? <li>Опыт: <b>{obj.tvs.experience.value}</b></li>
                  : null
                }
                {obj.tvs.education 
                  ? <li>Образование: <b>{obj.tvs.education.value}</b></li>
                  : null
                }
              </ul>

              <div className="vacancy__price">
                <div className="vacancy__price__number">{obj.tvs.wages && obj.tvs.wages.value}</div>
                <div className="vacancy__price__descr"> руб в месяц</div>
              </div>

              <div>
                {this.state.published != 1
                  ? (
                      <a className="vacancy__link" className="btn btn-link" onClick={this.toggleUpdate}>Редактировать</a>
                  )
                  : (
                    <small className="text-muted">Редактирование возможно только для неопубликованных вакансий.</small>
                  )
                }
              </div>
              <div>
                <a className="vacancy__link" className="btn btn-link" onClick={this.publishToggle}>
                  {this.state.published == 1 ? 'Снять с публикации' : 'Опубликовать'}
                </a>
              </div>
              <div>
                <a className="vacancy__link" className="btn btn-link" onClick={this.deleteToggle}>
                  <i className="fa fa-trash"></i> Удалить вакансию
                </a>
              </div>
            </div>
          </div>
        </div>
      )
      : (
        <VacancyAddForm 
          onSubmitForm={this.updateVacancy}
          onCancel={this.toggleUpdate}
          obj={obj}
        />
      )
  }
}

class VacanciesList extends Component {

  static getStores() {
    return [VacancyStore];
  }

  static calculateState(prevState) {
    return {
    };
  }

  render() {
    let vacancies = [];

    for (let i in this.props.vacancies) {
      let vacancy = this.props.vacancies[i]
      vacancies.push(
        <VacanciesListVacancy 
          key={vacancy.id}
          obj={vacancy}
          updateVacancy={this.props.updateVacancy}
        />
      );
    }

    return (
      <div>
        {vacancies}
      </div>
    );
  }
}

export default Container.create(VacanciesList);
// export default VacanciesList;