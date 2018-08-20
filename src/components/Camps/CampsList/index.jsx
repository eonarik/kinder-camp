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

  constructor (props) {
    super(props);
  }

  onUpdate = () => {
    this.props.setUpdatedCamp(this.props.obj.id);
  }

  onCampCopy = () => {
    this.props.onNewCamp(this.props.obj);
  }

  setStatus = (status_id) => {
    if (status_id != 3 && status_id != 5) {
      this.props.setUpdatedCamp(null);
    }
    this.props.onUpdateCamp(this.props.obj.id, {
      status_id
    });
  }

  render() {
    let obj = this.props.obj;
    let bgimage = "url('" + (typeof obj.image !== 'undefined' && obj.image.src ? obj.image.src : '') + "')"
    return this.props.isUpdate
          ? <CampEdit
              obj={obj}
              onUpdateCamp={this.props.onUpdateCamp}
              setUpdatedCamp={this.props.setUpdatedCamp}
              onNewProgram={this.props.onNewProgram}
              setStatus={this.setStatus}
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
                  {(obj.status_id == 3 || obj.status_id == 5) 
                    ? (
                      <div className="admin__camp__actions">
                        <button className="btn btn-link" type="button" onClick={this.onUpdate}>{_TRANS('all', 'edit')}</button>
                        <button className="btn btn-link" type="button" onClick={this.onCampCopy}>{_TRANS('all', 'copy')}</button>
                      </div>
                    )
                    : null
                  }
                </div>
                <div className="admin__camp__status">
                  {typeof obj.status_id !== 'undefined' && (
                    <div className="admin__intro-status">
                      <div className="admin__intro-status-badge" style={{
                        backgroundColor: obj.status_color
                      }}>{obj.status_name}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="admin__camp__footer">
                {obj.status_id != 2 && obj.status_id != 1
                  ? (
                    <button type="button" className="btn btn-info" onClick={this.setStatus.bind(this, 2)}>{_TRANS('all', 'moderate')}</button>
                  )
                  : null
                }
                {obj.status_id == 4 
                  ? <button type="button" className="btn btn-default" onClick={this.setStatus.bind(this, 5)}>{_TRANS('all', 'unarchive')}</button>
                  : <button type="button" className="btn btn-default" onClick={this.setStatus.bind(this, 4)}>{_TRANS('all', 'archive')}</button>
                }
                {obj.status_id != 5
                  ? <button type="button" className="btn btn-warning" onClick={this.setStatus.bind(this, 5)}>{_TRANS('all', 'hide')}</button>
                  : null
                }
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
      updatedCampId: CampStore.getState().get('updatedCampId'),
      updatedCampProps: CampStore.getState().get('updatedCampProps'),
      makeUpdatedCamp: Actions.makeUpdatedCamp,
      onUpdateCamp: Actions.updateCamp,
    };
  }

  static defaultProps = {
    updatedCampId: null
  }

  constructor(props) {
    super(props);
  }

  setUpdatedCamp = (id) => {
    this.state.makeUpdatedCamp(id);
  }

  componentDidMount = () => {
    if (!this.state.camps || !this.state.camps.length) {
      this.state.onReceiveCampsList();
    }
  }

  render() {
    const list = this.state.camps;
    let updatedCampProps = this.state.updatedCampProps;
    let updatedCampId = this.state.updatedCampId;
    let camps = [];
    for (let i in list) {
      let camp = {...list[i]};
      let isUpdate = false;
      if (updatedCampId && updatedCampId == camp.id) {
        isUpdate = true;
      }
      if (updatedCampProps && updatedCampProps.id == camp.id) {
        Object.assign(camp, updatedCampProps);
      }
      camps.push(
        <CampItem
          key={camp.id}
          obj={camp}
          isUpdate={isUpdate}
          setUpdatedCamp={this.setUpdatedCamp}
          onNewProgram={this.props.onNewProgram}
          onNewCamp={this.props.onNewCamp}
          onUpdateCamp={this.state.onUpdateCamp}
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