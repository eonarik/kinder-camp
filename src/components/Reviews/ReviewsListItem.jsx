import React, { Component } from 'react';

// import { Container } from "flux/utils";
// import ReviewsStore from "../../data/ReviewsStore";
// import Actions from '../../data/Actions/reviews';

class ReviewsListItemComment extends Component {
  inputs = {}

  state = {
    isEdited: false,
  }

  deleteComment = () => {
    this.props.onUpdateReview(this.props.obj.id, {
      deleted: 1,
    });
  }

  toggleCommentEdit = () => {
    if (
      this.state.isEdited
      && this.inputs.text.value !== this.props.obj.text
    ) {
      this.props.onUpdateReview(this.props.obj.id, {
        text: this.inputs.text.value,
      }).then(() => {
        this.setState({
          isEdited: !this.state.isEdited
        });
      });
    } else {
      this.setState({
        isEdited: !this.state.isEdited
      });
    }
  }

  render() {
    let obj = this.props.obj;
    let photo = obj.user_photo || obj.manager_photo || '';
    return (
      <div className="reviews__comment">
        <div>
          <div className="reviews__comment__avatar">
            {photo
              ? <img src={photo} alt="" />
              : <span>{obj.manager_fullname[0]}</span>
            }
          </div>
        </div>
        <div className="reviews__comment__body">
          <div className="reviews__comment__title">{obj.manager_fullname} ({obj.camp_name})</div>
          <div className="reviews__comment__text">
            {this.state.isEdited
              ? (
                <textarea className="form-control" rows="4" defaultValue={obj.text}
                  ref={(input) => { this.inputs.text = input; }}
                ></textarea>
              )
              : (
                <div>
                  {obj.text}
                  {!obj.editedon || <span className="text-muted"> (ред.)</span>}
                </div>
              )}
          </div>
          <div className="reviews__item__actions">
            {this.state.isEdited
              ? (
                <div>
                  <button key="save" className="btn btn-link" onClick={this.toggleCommentEdit}>Сохранить</button>
                </div>
              )
              : (
                <div>
                  <button key="save" className="btn btn-link" onClick={this.toggleCommentEdit}>Редактировать</button>
                  <button key="delete" className="btn btn-link text-danger" onClick={this.deleteComment}>Удалить</button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

class ReviewsListItem extends Component {

  inputs = {}

  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      showText: false,
      showAnswer: false,
      isSpam: props.obj.published ? false : true
    }
  }

  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  toggleText = () => {
    this.setState({
      showText: !this.state.showText
    });
  }

  toggleSpam = () => {
    this.props.onUpdateReview(this.props.obj.id, {
      published: this.props.obj.published ? 0 : 1
    }).then((object) => {
      this.setState({
        isSpam: object.published ? false : true
      });
    });
  }

  addComment = () => {
    if (
      this.state.showAnswer
    ) {
      this.props.onAddReview({
        camp_id: this.props.obj.camp_id,
        review_id: this.props.obj.id,
        text: this.inputs.text.value
      }).then((object) => {
        this.setState({
          showAnswer: false
        });
      });
    } else {
      this.setState({
        showAnswer: true
      });
    }
  }

  // componentDidMount = () => {
  //   if (!this.state.comments || !this.state.comments.length) {
  //   }
  // }

  render() {
    let obj = this.props.obj;

    let comments = obj.comments;
    let _comments = [];

    for (let i in comments) {
      let comment = comments[i];
      _comments.push(
        <ReviewsListItemComment
          key={comment.id}
          obj={comment}
          onUpdateReview={this.props.onUpdateReview}
        />
      );
    }

    return (
      <div className={"reviews__item" + (this.state.isSpam ? ' reviews__item--unactive' : '')}>
        <div className="reviews__item__head">
          <div className="reviews__item__avatar">
            {obj.user_photo
              ? <img src={obj.user_photo} alt="" />
              : <span>{obj.user_fullname[0]}</span>
            }
          </div>
          <div>
            <div className="reviews__item__title">{obj.user_fullname}</div>
            <div className="reviews__item__subtitle">
              {obj.user_city} {obj.user_country}
            </div>
            <div className="reviews__item__actions">
              {this.state.isSpam ||
                <button className="btn btn-success" onClick={this.addComment}>Ответить</button>
              }
              <button className="btn btn-link text-warning" onClick={this.toggleSpam}>
                {this.state.isSpam
                  ? 'Не спам'
                  : 'Это спам'
                }
              </button>
            </div>
          </div>
        </div>
        <div className="reviews__item__body">
          {!this.state.showText ||
            <p>{obj.text}</p>
          }
          <div className="reviews__item__actions">
            <button className="btn btn-link text-success" onClick={this.toggleText}>
              {this.state.showText
                ? 'Скрыть'
                : 'Показать текст отзыва'
              }
            </button>
            {this.state.isSpam || !_comments.length ||
              <button className="btn btn-link text-success" onClick={this.toggleComments}>
                {this.state.showComments
                  ? 'Скрыть комментарии'
                  : 'Показать комментарии (' + _comments.length + ')'
                }
              </button>
            }
          </div>
        </div>
        {!(this.state.showComments && !this.state.isSpam) ||
          <div className="reviews__item__comments">
            {_comments}
          </div>
        }
        {!this.state.showAnswer ||
          <div className="reviews__comment">
            <div className="reviews__comment__body">
              <div className="form-group">
                <textarea className="form-control" rows="4"
                  ref={(input) => { this.inputs.text = input; }}
                ></textarea>
              </div>
              <div className="reviews__item__actions">
                <button className="btn btn-link" onClick={this.addComment}>Отправить</button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ReviewsListItem;