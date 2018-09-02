import React, { Component } from 'react';

class MyReviewsListItem extends Component {
  inputs = {}

  constructor (props) {
    super(props);

    this.state = {
      isEdit: false,
      rating: props.obj.rating,
    }
  }

  toggleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  setStar = (rating) => {
    this.setState({
      rating
    })
  }

  updateReview = () => {
    let data = {
      subject: this.inputs.subject.value,
      text: this.inputs.text.value,
      rating: this.state.rating,
    }
    this.props.onUpdateReview(this.props.obj.id, data).then(() => {
      this.setState({
        isEdit: false
      });
    });
  }

  toggleDeleteReview = () => {
    this.props.onUpdateReview(this.props.obj.id, {
      deleted: this.props.obj.deleted === 1 ? 0 : 1
    });
  }

  render() {
    let obj = this.props.obj;
    let _stars = [];

    for (var i = 1; i <= 5; i++) {
      if (this.state.isEdit) {
        _stars.push(
          <i key={i} className={"fa" + (this.state.rating <= i - 1 ? " fa-star-o" : " fa-star")} 
            onClick={this.setStar.bind(this, i)}></i>
        );
      } else {
        _stars.push(
          <i key={i} className={"fa" + (obj.rating <= i - 1 ? " fa-star-o" : " fa-star")}></i>
        );
      }
    }

    return (
      <div className={"my-review" + (obj.deleted ? ' my-review--deleted' : '')}>
        <div className="row flex-row">
          <div className="col-xs-12 col-md-2">
            <div className="my-review__camp">
              <div className="my-review__camp__title">
                {obj.camp_name}
                {!obj.camp_address || <span><br />({obj.camp_address})</span>}
              </div>
              <div className="my-review__camp__id">ID {obj.camp_external_id}</div>
            </div>
          </div>
          <div className="col-xs-12 col-md-8">
            {this.state.isEdit
              ? (
                <div>
                  <div className="form-group">
                    <input name="subject" type="text" className="form-control" defaultValue={obj.subject}
                      ref={(input) => { this.inputs.subject = input; }}
                    />
                  </div>
                  <div className="form-group">
                    <textarea name="text" className="form-control" rows="4" defaultValue={obj.text}
                      ref={(input) => { this.inputs.text = input; }}
                    />
                  </div>
                  <div className="flex-row flex-row--vcenter">
                    <span>Ваша оценка: </span>
                    <span className="my-review__rating">
                      {_stars}
                    </span>
                  </div>
                </div>
              )
              : (
                <div>
                  <div className="my-review__title">
                    <span>{obj.subject}</span>
                    <span className="my-review__date">{obj.createdon_render}</span>
                    <span className="my-review__rating">
                      {_stars}
                    </span>
                  </div>
                  <div className="my-review__text">{obj.text}</div>
                </div>
              )
            }
          </div>
          <div className="col-xs-12 col-md-2">
              <div>
              <div className={"my-review__status" + (obj.published ? ' my-review__status--success' : '') + (obj.deleted ? ' my-review__status--deleted' : '')}>
                <div>{obj.status_name}</div>
                {!obj.deleted || <div className="text-center">{obj.deletedon_render}</div>}
                {!obj.published || <div className="text-center">{obj.publishedon_render}</div>}
              </div>
              {!obj.published
                ? this.state.isEdit
                  ? (
                    <div className="my-review__actions">
                      <button key="edit" className="btn btn-default btn-block" type="button" onClick={this.toggleEdit}>Отмена</button>
                      <button key="save" className="btn btn-success btn-block" type="button"
                        onClick={this.updateReview}>Сохранить</button>
                    </div>
                  )
                  : (
                    <div className="my-review__actions">
                      {!obj.deleted 
                        ? <button key="delete" className="btn btn-danger btn-block" type="button"
                            onClick={this.toggleDeleteReview}>Удалить</button> 
                        : obj.deleted_policy
                          ? <button key="delete" className="btn btn-default btn-block" type="button"
                          onClick={this.toggleDeleteReview}>Отменить удаление</button> 
                          : null
                      }
                      <button key="edit" className="btn btn-success btn-block" type="button" 
                        onClick={this.toggleEdit}>Редактировать</button>
                    </div>
                  )
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyReviewsListItem;