import React, { Component } from 'react';

import { Container } from "flux/utils";
import VacancyStore from "../../data/VacancyStore";
import Actions from '../../data/Actions/vacancies';

import VacancyAddForm from "./VacancyAddForm";
import VacanciesList from "./VacanciesList";

class Vacancies extends Component {

  state = {
    showForm: false,
  }

  static getStores() {
    return [VacancyStore];
  }

  static calculateState(prevState) {
    return {
      onReceiveVacanciesList: Actions.receiveVacanciesList,
      onUpdateVacancy: Actions.updateVacancy,
      onAddVacancy: Actions.addVacancy,
      vacancies: VacancyStore.getState().get('vacancies'),
    };
  }

  toggleAddForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  addVacancy = (data) => {
    return new Promise((resolve, reject) => {
      this.state.onAddVacancy(data)
      .then(() => {
        this.toggleAddForm();
      }).catch(reject);
    });
  }

  componentDidMount = () => {
    if (!this.state.vacancies || !this.state.vacancies.length) {
      this.state.onReceiveVacanciesList();
    }
  }

  render () {
    return (
      <div>
        <h4 className="text-success">Вакансии</h4>
        <a className="btn btn-icon btn-icon--add" onClick={this.toggleAddForm}>
          {this.state.showForm
            ? <span>Отмена</span>
            : <span>Добавить вакансию</span>
          }
        </a>
        
        {this.state.showForm 
          ? <VacancyAddForm
              onSubmitForm={this.addVacancy}
              onCancel={this.toggleAddForm}
            />
          : null
        }
        
        <VacanciesList 
          vacancies={this.state.vacancies}
          updateVacancy={this.state.onUpdateVacancy}
        />
      </div>
    );
  }
}

export default Container.create(Vacancies);