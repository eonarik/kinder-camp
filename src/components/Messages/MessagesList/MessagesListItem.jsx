import React, { Component } from 'react';

class MessagesListItem extends Component {
  render() {
    let obj = this.props.obj;
    let isYour = obj.your_id == obj.sender;
    // msglist__item--your
    return (
      <div style={{
        backgroundColor: !obj.is_read ? '#fff6db' : ''
      }}>
        <div className={"msglist__item" + (isYour ? ' msglist__item--your' : '') + (!obj.is_read ? ' msglist__item--unread' : '')}>
          <div>
            <div className="msglist__item__avatar">
              {obj.sender_photo
                ? <img src={obj.sender_photo} alt="" />
                : <span>{!obj.sender_fullname || obj.sender_fullname[0]}</span>
              }
            </div>
          </div>
          <div className="msglist__item__body">
            <div className="msglist__item__title">
              <span>{obj.sender_fullname}</span>
              <span className="msglist__item__date">{obj.time}</span>
            </div>
            {this.props.extMessages}
            <div className="msglist__item__text" dangerouslySetInnerHTML={{
              __html: obj.message
            }} />
          </div>
        </div>
      </div>
    );
  }
}

export default MessagesListItem;