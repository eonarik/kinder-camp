import React, { Component } from 'react';

import CampEditIntro from "./CampEditIntro";
import CampEditTariffs from "./CampEditTariffs";
import CampEditPrograms from "./CampEditPrograms";
import CampEditParams from "./CampEditParams";
import CampEditSerts from "./CampEditSerts";
import CampEditResstr from "./CampEditResstr";

const _TRANS = require('../../../const/trans');

class CampEdit extends Component {

  inputs = {}

  constructor(props) {
    super(props);

    this.state = {
      obj: props.obj,
    }
  }

  onClose = () => {
    this.props.setUpdatedCamp(null);
  }

  render() {
    const obj = this.state.obj;

    if (obj.tags) {
      var _tags = [];

      for (let i in obj.tags) {
        _tags.push(
          <li key={i} className={obj.tags[i].active ? ' active' : ''}>
            <a href="javascript: void(0);">{obj.tags[i].name}</a>
          </li>
        );
      }
    }

    return (
      <div className="settings__group">
        <div className="row">
          <div className="col-xs-12 col-md-6">

            <CampEditIntro obj={obj} />

            <CampEditPrograms obj={obj} onNewProgram={this.props.onNewProgram} />

            <CampEditTariffs obj={obj} />

            <h5>{_TRANS('camp', 'video_of_camp')}</h5>
            <div className="form-group">
              <input type="text" className="form-control" name="video_link" defaultValue={obj.video_link} />
            </div>

            <CampEditParams obj={obj} />
          </div>
          <div className="col-xs-12 col-md-6">
            <h5>
              {_TRANS('all', 'camp_theme')} 
              <span className="btn btn-danger pull-right" onClick={this.onClose}>{_TRANS('all', 'close')}</span>
            </h5>

            {obj.tags && (
              <ul className="rubric-list rubric-list--inline">
                {_tags}
              </ul>
            )}

            <h5>О лагере</h5>
            <div className="row flex-row flex-row--vcenter form-group">
              <div className="col-xs-12 col-md-4">
                <label htmlFor="settings-short_name" className="settings__label">{_TRANS('camp', 'short_name')}</label>
              </div>
              <div className="col-xs-12 col-md-8">
                <input id="settings-short_name" name="name" type="text" className="form-control" defaultValue={obj.name} />
              </div>
            </div>
            <div className="row flex-row flex-row--vcenter form-group">
              <div className="col-xs-12 col-md-4">
                <label htmlFor="settings-legal_name" className="settings__label">{_TRANS('camp', 'legal_name')}</label>
              </div>
              <div className="col-xs-12 col-md-8">
                <input id="settings-legal_name" name="legal_name" type="text" className="form-control" defaultValue={obj.legal_name} />
              </div>
            </div>
            <div className="row flex-row flex-row--vcenter form-group">
              <div className="col-xs-12 col-md-4">
                <label htmlFor="settings-inn" className="settings__label">{_TRANS('camp', 'inn')}</label>
              </div>
              <div className="col-xs-12 col-md-8">
                <input id="settings-inn" name="inn" type="text" className="form-control" defaultValue={obj.inn} />
              </div>
            </div>
            <div className="row flex-row flex-row--vcenter form-group">
              <div className="col-xs-12 col-md-4">
                <label htmlFor="settings-foundation_date" className="settings__label">{_TRANS('camp', 'foundation_date')}</label>
              </div>
              <div className="col-xs-12 col-md-8">
                <input id="settings-foundation_date" name="foundation_date" type="text" className="form-control" defaultValue={obj.foundation_date} />
              </div>
            </div>
            
            <CampEditSerts obj={obj} />

            <CampEditResstr obj={obj} />

            <div className="form-group">
              <h5>{_TRANS('camp', 'place_address')}</h5>
              <input id="settings-address" name="address" type="text" className="form-control" placeholder="Начните вводить адрес" defaultValue={obj.address} />
              <div className="settings__map-empty">
                {_TRANS('all', 'input_address_hint')}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="settings-description">{_TRANS('camp', 'office_description')}</label>
              <textarea className="form-control" name="description" id="settings-description" rows="3" placeholder={_TRANS('camp', 'office_description_sample')} defaultValue={obj.address_description} />
            </div>
          </div>
        </div>
        <div className="admin__camp__footer form-group flex-row flex-row--vcenter">
            <button type="button" className="btn btn-danger btn-lg">{_TRANS('all', 'save')}</button>
            <button type="button" className="btn btn-icon btn-icon--hide" onClick={this.onClose}>
              <span>{_TRANS('all', 'hide')}</span>
            </button>
        </div>
        <h5>{_TRANS('camp', 'actions')}:</h5>
        <div className="admin__camp__footer form-group flex-row flex-row--vcenter">
          <button type="button" className="btn btn-info">{_TRANS('all', 'moderate')}</button>
          <button type="button" className="btn btn-default">{_TRANS('all', 'archive')}</button>
          <button type="button" className="btn btn-warning">{_TRANS('all', 'hide')}</button>
        </div>
      </div>
    );
  }
}

export default CampEdit;