import React, { Component } from 'react';

import { Container } from "flux/utils";
import ResumeStore from "../../data/ResumeStore";
import ActionsResumes from '../../data/Actions/resumes';

import ResumesList from './ResumesList';
import ResumeEdit from './ResumeEdit';

class Resumes extends Component {
  static getStores() {
    return [ResumeStore];
  }

  static calculateState(prevState) {
    return {
      onReceiveResumesList: ActionsResumes.receiveResumesList,
      onCreateResume: ActionsResumes.createResume,
      onUpdateResume: ActionsResumes.updateResume,
      resumes: ResumeStore.getState().get('resumes'),
    };
  }

  state = {
    isEdit: false,
    updatedResume: null
  }

  toggleEdit = (id) => {
    let updatedResume = null;

    if (typeof id !== 'undefined') {
      for (let i in this.state.resumes) {
        let resume = this.state.resumes[i];
        if (id === resume.id) {
          updatedResume = resume;
          break;
        }
      }
    }

    this.setState({
      isEdit: !this.state.isEdit,
      updatedResume
    });
  }

  componentDidMount = () => {
    if (!this.state.resumes || !this.state.resumes.length) {
      this.state.onReceiveResumesList();
    }
  }

  render () {
    return (
      <div>
        <h4 className="text-success">Мои резюме</h4>

        {!this.state.isEdit
          ? (
            <div>
              <button type="button" className="btn btn-icon btn-icon--add" onClick={this.toggleEdit}>
                <span className="text-underline">Добавить резюме</span>
              </button>

              <ResumesList
                userProfile={this.props.userProfile}
                onUpdateResume={this.state.onUpdateResume}
                resumes={this.state.resumes}
                toggleEdit={this.toggleEdit}
              />
            </div>
          )
          : (
            <div>
              <ResumeEdit
                userProfile={this.props.userProfile}
                onCreateResume={this.state.onCreateResume}
                onUpdateResume={this.state.onUpdateResume}
                toggleEdit={this.toggleEdit}
                updatedResume={this.state.updatedResume}
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default Container.create(Resumes);