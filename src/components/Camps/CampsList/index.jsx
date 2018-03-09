import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "../../../data/CampStore.js";
import Actions from '../../../data/Actions';

import CampEdit from '../CampEdit';

const _TRANS = require('../../../const/trans');

class CampItem extends Component {
  static defaultProps = {
    isUpdate: false,
  }

  onUpdate = () => {
    this.props.setUpdatedCamp(this.props.obj.id);
  }

  render() {
    let obj = this.props.obj;
    console.log(obj)
    let bgimage = "url('" + (typeof obj.image !== 'undefined' && obj.image.src ? obj.image.src : '') + "')"
    return this.props.isUpdate
          ? <CampEdit
              obj={obj}
              onUpdateCamp={this.props.onUpdateCamp}
              setUpdatedCamp={this.props.setUpdatedCamp}
              onNewProgram={this.props.onNewProgram}
            />
          : (
            <div className="admin__camp">
              <div className="admin__camp__body">
                <div className="admin__camp__image" style={{
                  backgroundImage: bgimage,
                }}>
                </div>
                <div className="admin__camp__descr">
                  <div className="admin__camp__title">
                    {obj.name}
                  </div>
                  <div className="admin__intro-descr">
                    <div>{_TRANS('camp', 'id_ucase')} <span>{obj.external_id}</span> </div>
                    <div>{_TRANS('camp', 'address')} <span>{obj.address}</span> </div>
                  </div>
                  <div className="admin__camp__actions">
                    <button className="btn btn-link" type="button" onClick={this.onUpdate}>{_TRANS('all', 'edit')}</button>
                    <button className="btn btn-link" type="button">{_TRANS('all', 'copy')}</button>
                  </div>
                </div>
                <div className="admin__camp__status">
                  {obj.status_id && (
                    <div className="admin__intro-status">
                      <div className="admin__intro-status-badge" style={{
                        backgroundColor: obj.status_color
                      }}>{obj.status_name}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="admin__camp__footer">
                <button type="button" className="btn btn-info">{_TRANS('all', 'moderate')}</button>
                <button type="button" className="btn btn-default">{_TRANS('all', 'archive')}</button>
                <button type="button" className="btn btn-warning">{_TRANS('all', 'hide')}</button>
              </div>
            </div>
          )
        }
}

class CampsList extends Component {

  static getStores() {
    return [CampStore];
  }

  static calculateState(prevState) {
    return {
      onReceiveCampsList: Actions.receiveCampsList,
      camps: CampStore.getState().get('camps'),
      // onUpdateCamp: Actions.updateCamp,
      updatedCampProps: CampStore.getState().get('updatedCampProps'),
      makeUpdatedCamp: Actions.makeUpdatedCamp,
      updatedCampId: CampStore.getState().get('updatedCampId'),
    };
  }

  static defaultProps = {
    updatedCampId: null
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   _updatedCampId: null,
    // }
  }

  setUpdatedCamp = (id) => {
    this.state.makeUpdatedCamp(id);
    // this.setState({
    //   _updatedCampId: id
    // });
  }

  componentDidMount = () => {
    if (!this.state.camps || !this.state.camps.length) {
      this.state.onReceiveCampsList();
    }
  }

  // componentWillReceiveProps = (nextProps) => {
  //   this.setState({
  //     _updatedCampId: nextProps.updatedCampId
  //   });
  // }

  render() {
    const list = this.state.camps;
    let updatedCampProps = this.state.updatedCampProps;
    let updatedCampId = this.state.updatedCampId;
    let camps = [];
    for (let i in list) {
      let camp = list[i];
      let isUpdate = false;
      if (updatedCampId && updatedCampId == camp.id) {
        isUpdate = true;
      }
      if (updatedCampProps && updatedCampProps.id == camp.id) {
        camp = Object.assign(camp, updatedCampProps);
      }
      camps.push(
        <CampItem
          key={camp.id}
          obj={camp}
          isUpdate={isUpdate}
          setUpdatedCamp={this.setUpdatedCamp}
          onNewProgram={this.props.onNewProgram}
        />
      );
    }
    return (
      <div>
        {camps}
      </div>
    )
  }
}

export default Container.create(CampsList);