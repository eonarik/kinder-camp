import React, { Component } from 'react';

class MessagesUsersItem extends Component {
  render() {
    let obj = this.props.obj;
    // userlist__item--active
    return (
      <div className={"userlist__item" + (this.props.isActive ? ' userlist__item--active' : '')+ (obj.unread_messages > 0 ? ' userlist__item--unread' : '')} onClick={this.props.setDialog.bind(this, obj)}>
        <div>
          <div className="userlist__item__avatar">
            {obj.user_photo
              ? <img src={obj.user_photo} alt="" />
              : <span>{!obj.user_fullname || obj.user_fullname[0]}</span>
            }
          </div>
        </div>
        <div className="userlist__item__body">
          <div className="userlist__item__title">
            {obj.user_fullname}
            {obj.unread_messages <= 0 || <span className="badge">{obj.unread_messages}</span>}
          </div>
          <div className="userlist__item__last">
            {obj.last_msg_username} <span dangerouslySetInnerHTML={{
              __html: obj.last_message
            }} />
          </div>
          <div className="userlist__item__date">
            {obj.date_sent_render === 'Сегодня' ? obj.date_sent_render + ' в ' + obj.time : obj.date_sent_render}
          </div>
        </div>
      </div>
    );
  }
}

export default MessagesUsersItem;