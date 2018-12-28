import React, { Component } from 'react';

import ResumesListItem from './ResumesListItem';

class ResumesList extends Component {
  render () {
    let _resumes = [];

    for (let i in this.props.resumes) {
      let resume = this.props.resumes[i];
      _resumes.push(
        <ResumesListItem
          key={resume.id}
          obj={resume}
          onUpdateResume={this.props.onUpdateResume}
          toggleEdit={this.props.toggleEdit}
          userProfile={this.props.userProfile}
        />
      );
    }

    return (
      <div>
        {_resumes}
      </div>
    );
  }
}

export default ResumesList;