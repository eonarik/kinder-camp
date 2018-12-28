import React, { Component } from 'react';

class ResumesListItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      published: !!parseInt(props.obj.published, 10),
      deleted: !!parseInt(props.obj.deleted, 10),
    }
  }

  togglePublish = () => {
    let obj = this.props.obj;

    this.props.onUpdateResume(obj.id, {
      published: this.state.published ? 0 : 1
    }).then(response => {
      this.setState({
        published: !!response.object.published
      });
    });
  }

  toggleDelete = () => {
    let obj = this.props.obj;

    this.props.onUpdateResume(obj.id, {
      deleted: this.state.deleted ? 0 : 1
    }).then(response => {
      this.setState({
        deleted: !!response.object.deleted
      });
    });
  }

  render () {
    let obj = this.props.obj;

    return (
      <div className="resume">
        <div className="resume__avatar" style={{
          backgroundColor: this.props.userProfile.user_color
        }}>
          {obj.resume_photo
            ? <img src={obj.resume_photo} alt="" />
            : <span>{obj.resume_firstname[0]}</span>
          }
        </div>
        <div className="resume__meta">
          <div className="row flex-row mb-x1">
            <div className="col-auto">
              <span className="resume__name">{[
                obj.resume_firstname,
                obj.resume_middlename,
                obj.resume_lastname,
              ].join(' ')}, {obj.age_render}</span>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-link text-success"
                onClick={() => {this.props.toggleEdit(obj.id)}}
              >Редактировать</button>
            </div>
          </div>
          <div className="resume__place mb-x1">
            {obj.resume_city}, гражданство {obj.resume_citizenship}
          </div>
          <div className="row flex-row mb-x1">
            <div className="col-auto">
              {this.state.deleted
                ? <span className="resume__status resume__status--danger">Удалено</span>
                : this.state.published
                  ? <span className="resume__status resume__status--success">Опубликовано</span>
                  : <span className="resume__status resume__status--warning">Ждет публикации</span>
              }
            </div>
            <div className="col-auto">
              <span className="resume__type">{obj.resume_position}</span>
            </div>
          </div>
          <div className="row flex-row">
            <div className="col-auto">
              <div className="resume__views">
                Просмотров: <span className="text-underline">{obj.views}</span>
              </div>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-link text-warning" 
                onClick={this.togglePublish}
              >
                {this.state.published ? 'Снять с публикации' : 'Опубликовать'}
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-link text-danger"
                onClick={this.toggleDelete}
              >
                {this.state.deleted ? 'Восстановить резюме' : 'Удалить резюме'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumesListItem;