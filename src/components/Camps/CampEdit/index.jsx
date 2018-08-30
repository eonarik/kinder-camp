import React, { Component } from 'react';

import CampEditIntro from "./CampEditIntro";
import CampEditTariffs from "./CampEditTariffs";
import CampEditPrograms from "./CampEditPrograms";
import CampEditParams from "./CampEditParams";
import CampEditSerts from "./CampEditSerts";
import CampEditResstr from "./CampEditResstr";
import CampEditTags from "./CampEditTags";
import CampEditAbout from "./CampEditAbout";
import CampEditAddress from "./CampEditAddress";
import CampEditVideo from "./CampEditVideo";
import CampEditMemory from "./CampEditMemory";

import _TRANS from "../../../const/trans";

class CampEdit extends Component {

  inputs = {}

  // constructor(props) {
  //   super(props);

  //   // this.state = {
  //   //   obj: props.obj,
  //   // }
  // }

  onClose = () => {
    this.props.setUpdatedCamp(null);
  }

  render() {
    let obj = this.props.obj;

    return (
      <div className="settings__group">
        <div className="row">
          <div className="col-xs-12 col-md-6">

            <CampEditIntro obj={obj} />

            <CampEditPrograms obj={obj} onNewProgram={this.props.onNewProgram} />

            <CampEditTariffs obj={obj} />
            
            <CampEditVideo obj={obj} />

            <CampEditParams obj={obj} />
          </div>
          <div className="col-xs-12 col-md-6">
            <CampEditTags obj={obj} />

            <CampEditAbout obj={obj} onUpdateCamp={this.props.onUpdateCamp} />
            
            <CampEditSerts obj={obj} />

            <CampEditResstr obj={obj} />

            <CampEditAddress obj={obj} onUpdateCamp={this.props.onUpdateCamp} />
          </div>
        </div>

        <CampEditMemory obj={obj} onUpdateParam={this.props.onUpdateParam} />

        <div className="admin__camp__footer form-group flex-row flex-row--vcenter">
            {/*<button type="button" className="btn btn-danger btn-lg">{_TRANS('all', 'save')}</button>*/}
            <button type="button" className="btn btn-icon btn-icon--hide" onClick={this.onClose}>
              <span>{_TRANS('all', 'hide')}</span>
            </button>
        </div>
        <h5>{_TRANS('camp', 'actions')}:</h5>
        <div className="admin__camp__footer form-group flex-row flex-row--vcenter">
          {obj.status_id !== 2 && (
            <button type="button" className="btn btn-info" onClick={this.props.setStatus.bind(this, 2)}>{_TRANS('all', 'moderate')}</button>
          )}
          {obj.status_id === 4 
            ? <button type="button" className="btn btn-default" onClick={this.props.setStatus.bind(this, 5)}>{_TRANS('all', 'unarchive')}</button>
            : <button type="button" className="btn btn-default" onClick={this.props.setStatus.bind(this, 4)}>{_TRANS('all', 'archive')}</button>
          }
          {obj.status_id !== 5
            ? <button type="button" className="btn btn-warning" onClick={this.props.setStatus.bind(this, 5)}>{_TRANS('all', 'hide')}</button>
            : null
          }
        </div>
      </div>
    );
  }
}

export default CampEdit;