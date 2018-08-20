import React, { Component } from 'react';

import Actions from '../../../data/Actions/camps';

import _TRANS from "../../../const/trans";

class CampEditTags extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tags: props.obj.tags || [],
    }
  }

  updateTag = (type_id, options) => {
    Actions.updateTag({
      camp_id: this.props.obj.id,
      type_id,
      ...options
    }).then((object) => {
      let tags = [...this.state.tags];
      if (tags.indexOf(type_id) >= 0) {
        for (let i in tags) {
          let tag = tags[i];
          if (type_id == tag) {
            tags.splice(i, 1);
          }
        }
      } else {
        tags.push(type_id);
      }
      this.setState({
        tags
      });
    });
  }

  render() {
    let obj = this.props.obj;

    if (obj.all_tags) {
      var _tags = [];

      for (let id in obj.all_tags) {
        let tag = obj.all_tags[id];
        let isActive = this.state.tags && this.state.tags.indexOf(parseInt(id)) >= 0;
        _tags.push(
          <li key={id} className={(isActive ? " active" : "")}>
            <a onClick={this.updateTag.bind(this, parseInt(id), {
              deleted: isActive
            })}>{tag}</a>
          </li>
        );
      }
    }

    return (
      <div>
        <h5>
          {_TRANS('all', 'camp_theme')} 
        </h5>

        {obj.all_tags && (
          <ul className="rubric-list rubric-list--inline">
            {_tags}
          </ul>
        )}
      </div>
    );
  }
}

export default CampEditTags;




    // let obj = this.props.obj;

    // if (obj.tags) {
    //   var _tags = [];

    //   for (let i in obj.tags) {
    //     _tags.push(
    //       <li key={i} className={obj.tags[i].active ? ' active' : ''}>
    //         <a href="javascript: void(0);">{obj.tags[i].name}</a>
    //       </li>
    //     );
    //   }
    // }

    //         <h5>
    //         {_TRANS('all', 'camp_theme')} 
    //         <span className="btn btn-danger pull-right" onClick={this.onClose}>{_TRANS('all', 'close')}</span>
    //       </h5>

    //       {obj.tags && (
    //         <ul className="rubric-list rubric-list--inline">
    //           {_tags}
    //         </ul>
    //       )}