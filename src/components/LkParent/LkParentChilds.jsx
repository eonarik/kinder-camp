import React, { Component } from 'react';

class LkParentChildsItem extends Component {
  inputs = {}

  constructor (props) {
    super(props);
    this.state = {
      fullname: props.obj.fullname || '',
      dob: props.obj.dob || '',
      isDirty: false,
    }
  }

  inputChange = () => {
    let isDirty = false;
    for (let key in this.inputs) {
      if (this.inputs[key].value === this.state[key]) {
        isDirty = false;
      } else {
        isDirty = true;
        break;
      }
    }
    this.setState({
      isDirty,
    });
  }

  updateChild = () => {
    let options = {};
    for (let key in this.inputs) {
      options[key] = this.inputs[key].value;
    }
    this.props.updateChild(this.props.index, options).then(() => {
      this.setState({
        isDirty: false,
      });
    });
  }

  render() {
    let obj = this.props.obj;
    let index = this.props.index;

    return (
      <div className="form-group">
        <div className="row row-sm flex-row flex-row--vcenter">
          <div className="col-xs-12 col-md-4">
            <label htmlFor={'settings-childs_' + index + '_fullname'} className="settings__label">ФИО</label>
          </div>
          <div className="col-xs-12 col-md-8">
            <div className="form-group">
              <input id={'settings-childs_' + index + '_fullname'} type="text" className="form-control"
                name={'childs[' + index + '][fullname]'}
                defaultValue={obj.fullname}
                ref={(input) => { this.inputs.fullname = input; }}
                onChange={this.inputChange}
              />
            </div>
          </div>
        </div>

        <div className="row row-sm flex-row flex-row--vcenter">
          <div className="col-xs-12 col-md-4">
            <label htmlFor={'settings-childs_' + index + '_dob'} className="settings__label">Дата рождения</label>
          </div>
          <div className="col-xs-12 col-md-5">
            <input id={'settings-childs_' + index + '_dob'} type="date" className="form-control"
              name={'childs[' + index + '][dob]'}
              defaultValue={obj.dob}
              ref={(input) => { this.inputs.dob = input; }}
              onChange={this.inputChange}
            />
          </div>

          <div className="col-xs-12 col-md-3">
            <div className="btn-group btn-group--right">
              {!this.state.isDirty ||
                <button className="btn btn-success" type="button" onClick={this.updateChild}>
                  <i className="fa fa-check"></i>
                </button>
              }
              <button className="btn btn-danger" type="button" onClick={this.props.removeChild.bind(this, index)}>
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

class LkParentChilds extends Component {
  inputs = {}

  constructor(props) {
    super(props);

    this.state = {
      childs: props.userProfile.childs || [],
    }
  }

  removeChild = (index) => {
    if (this.state.childs && this.state.childs[index]) {
      let childs = [...this.state.childs];
      childs.splice(index, 1);
      this.props.onUpdateUserProfile({
        childs: JSON.stringify(childs)
      }).then((object) => {
        this.setState({
          childs: object.childs,
        });
      });
    }
  }

  updateChild = (index, options) => {
    return new Promise((resolve) => {
      if (this.state.childs && this.state.childs[index]) {
        let childs = [...this.state.childs];
        childs[index] = options;
        this.props.onUpdateUserProfile({
          childs: JSON.stringify(childs)
        }).then(resolve);
      }
    });
  }

  addChildsItem = () => {
    let childs = [...this.state.childs];
    childs.push({
      fullname: '',
      dob: '',
    });
    this.setState({
      childs
    });
  }

  render() {
    // let userProfile = this.props.userProfile;
    let _childs = [];

    for (let i in this.state.childs) {
      let child = this.state.childs[i];
      _childs.push(
        <LkParentChildsItem
          key={i}
          index={i}
          obj={child}
          removeChild={this.removeChild}
          updateChild={this.updateChild}
        />
      );
    }

    return (
      <div>
        <h3 className="settings__subtitle">Дети</h3>

        {_childs}
        
        <div className="form-group">
          <button className="btn btn-icon btn-icon--add" type="button" onClick={this.addChildsItem}>
            <span>Добавить ребенка</span>
          </button>
        </div>
      </div>
    );
  }
}

export default LkParentChilds;