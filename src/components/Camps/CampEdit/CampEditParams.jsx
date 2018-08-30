import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "../../../data/CampStore.js";
import Actions from '../../../data/Actions/params';

import _TRANS from "../../../const/trans";

class CampEditParamsTabContentRow extends Component {
  inputs = [];

  constructor (props) {
    super(props);

    this.state = {
      _isEditable: false,
      _param: props.param,
    }
  }

  toggleEditable = () => {
    this.setState({
      _isEditable: !this.state._isEditable
    });
  }

  updateParam = () => {
    this.props.onUpdateParam(this.props.param.id, {
      name: this.inputs.name.value,
      value: this.inputs.value.value,
      camp_id: this.props.param.camp_id
    }).then((response) => {
      let param = {...this.state._param};
      param.name = response.name;
      param.value = response.value;
      this.setState({
        _isEditable: false,
        _param: param,
      });
    });
  }

  render () {
    let _isEditable = this.state._isEditable;
    let param = this.state._param;
    return (
      <tr>
        <td>
          {_isEditable
            ? (
              <input name="name" className="form-control input-sm" type="text"
                defaultValue={param.name}
                ref={(input) => { this.inputs.name = input; }}
              />
            )
            : <div onClick={this.toggleEditable}>{param.name}</div>
          }
        </td>
        <td>
          {_isEditable
            ? (
              <input name="value" className="form-control input-sm" type="text"
                defaultValue={param.value}
                ref={(input) => { this.inputs.value = input; }}
              />
            )
            : <div onClick={this.toggleEditable}>{param.value}</div>
          }
        </td>
        <td>
          {_isEditable
            ? (
              <button type="button" className="btn btn-default btn-sm"
                onClick={this.updateParam}
              >
                <i className="fa fa-check text-success"></i>
              </button>
            )
            : (
              <button type="button" className="btn btn-default btn-sm"
                onClick={this.props.deleteParam.bind(this, param.id)}
              >
                <i className="fa fa-times text-danger"></i>
              </button>
            )
          }
        </td>
      </tr>
    );
  }
}

class CampEditParamsTabContent extends Component {

  inputs = [];

  constructor (props) {
    super(props);

    this.state = {
      _params: [],
    };
  }

  componentDidMount = () => {
    this.props.onReceiveParamsList({
      camp_id: this.props.obj.id,
      type_id: this.props.type_id,
      dir: 'asc',
    }).then((response) => {
      this.setState({
        _params: response
      });
    });
  }

  addParam = () => {
    this.props.onAddParam({
      name: this.inputs.name.value,
      value: this.inputs.value.value,
      camp_id: this.props.obj.id,
      type_id: this.props.type_id,
    }).then((response) => {
      let params = [...this.state._params];
      params.push(response);
      this.setState({
        _params: params
      });
    });
  }

  deleteParam = (param_id) => {
    if (window.confirm(_TRANS('camp', 'delete_param_confirm'))) {
      this.props.onDeleteParam(param_id).then(() => {
        let params = [...this.state._params];
        for (let i in params) {
          if (params[i].id === param_id) {
            params.splice(i, 1);
            break;
          }
        }
        this.setState({
          _params: params
        });
      });
    }
  }

  render() {
    let params = this.state._params;
    let paramsList = [];
    for (let i in params) {
      let param = params[i];
      paramsList.push(
        <CampEditParamsTabContentRow 
          deleteParam={this.deleteParam}
          onUpdateParam={this.props.onUpdateParam}
          key={param.id}
          param={param}
        />
      );
    }

    return (
      <table className="table table-bordered table-form">
        <tbody>
          {paramsList}
          <tr>
            <td>
              <input name="name" className="form-control input-sm" type="text"
                ref={(input) => { this.inputs.name = input; }}
              />
            </td>
            <td>
              <input name="value" className="form-control input-sm" type="text"
                ref={(input) => { this.inputs.value = input; }}
              />
            </td>
            <td width="1">
              <button type="button" className="btn btn-default btn-sm"
                onClick={this.addParam}
              >
                <i className="fa fa-check text-success"></i>
              </button>
            </td>
          </tr>
        </tbody> 
      </table>
    );
  }
}

class CampEditParams extends Component {

  static getStores() {
    return [CampStore];
  }

  static calculateState(prevState) {
    return {
      onAddParam: Actions.addParam,
      onUpdateParam: Actions.updateParam,
      onDeleteParam: Actions.deleteParam,
      onReceiveParamsList: Actions.receiveParamsList,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      _activeTab: 1
    }
  }

  setTab (tab)  {
    this.setState({
      _activeTab: tab
    });
  }

  render() {
    let activeTab = this.state._activeTab;
    let obj = this.props.obj;

    return (
      <div>
        <ul className="nav nav-tabs">
          <li className={activeTab === 1 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 1)}>{_TRANS('camp', 'param_type_1')}</a>
          </li>
          <li className={activeTab === 2 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 2)}>{_TRANS('camp', 'param_type_2')}</a>
          </li>
          <li className={activeTab === 3 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 3)}>{_TRANS('camp', 'param_type_3')}</a>
          </li>
          <li className={activeTab === 4 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 4)}>{_TRANS('camp', 'param_type_4')}</a>
          </li>
          <li className={activeTab === 5 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 5)}>{_TRANS('camp', 'param_type_5')}</a>
          </li>
        </ul>
        <div className="tab-content">
          <div id="tab-camps-1" className={"tab-pane fade" + (activeTab === 1 ? " active in" : "")}>
              <CampEditParamsTabContent
                onAddParam={this.state.onAddParam}
                onUpdateParam={this.state.onUpdateParam}
                onDeleteParam={this.state.onDeleteParam}
                onReceiveParamsList={this.state.onReceiveParamsList}
                type_id={1}
                obj={obj}
              />
          </div>
          <div id="tab-camps-2" className={"tab-pane fade" + (activeTab === 2 ? " active in" : "")}>
              <CampEditParamsTabContent
                onAddParam={this.state.onAddParam}
                onUpdateParam={this.state.onUpdateParam}
                onDeleteParam={this.state.onDeleteParam}
                onReceiveParamsList={this.state.onReceiveParamsList}
                type_id={2}
                obj={obj}
              />
          </div>
          <div id="tab-camps-3" className={"tab-pane fade" + (activeTab === 3 ? " active in" : "")}>
              <CampEditParamsTabContent
                onAddParam={this.state.onAddParam}
                onUpdateParam={this.state.onUpdateParam}
                onDeleteParam={this.state.onDeleteParam}
                onReceiveParamsList={this.state.onReceiveParamsList}
                type_id={3}
                obj={obj}
              />
          </div>
          <div id="tab-camps-4" className={"tab-pane fade" + (activeTab === 4 ? " active in" : "")}>
              <CampEditParamsTabContent
                onAddParam={this.state.onAddParam}
                onUpdateParam={this.state.onUpdateParam}
                onDeleteParam={this.state.onDeleteParam}
                onReceiveParamsList={this.state.onReceiveParamsList}
                type_id={4}
                obj={obj}
              />
          </div>
          <div id="tab-camps-5" className={"tab-pane fade" + (activeTab === 5 ? " active in" : "")}>
              <CampEditParamsTabContent
                onAddParam={this.state.onAddParam}
                onUpdateParam={this.state.onUpdateParam}
                onDeleteParam={this.state.onDeleteParam}
                onReceiveParamsList={this.state.onReceiveParamsList}
                type_id={5}
                obj={obj}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default Container.create(CampEditParams);