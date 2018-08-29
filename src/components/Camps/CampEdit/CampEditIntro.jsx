import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "../../../data/CampStore.js";
import ActionsCamps from '../../../data/Actions/camps';
import ActionsFiles from '../../../data/Actions/files';

import _TRANS from "../../../const/trans";

class CampEditIntro extends Component {
  static getStores() { 
    return [ CampStore ]; 
  }

  static calculateState(prevState) {
    return {
        onAddFile: ActionsFiles.addFile,
        onDeleteFile: ActionsFiles.deleteFile,
        onReceiveFilesList: ActionsFiles.receiveFilesList,
        onUpdateCamp: ActionsCamps.updateCamp,
    }; 
  }

  inputs = {}

  constructor(props) {
    super(props);

    this.state = {
      _isChangeName: false,
      // _obj: props.obj,
      _images: [],
    }
  }

  onChangeName = (flag) => {
    this.setState({
      _isChangeName: flag,
    });
  }

  onUpdateName = () => {
    this.state.onUpdateCamp(this.props.obj.id, {
      name: this.inputs.name.value
    }).then((updatedCamp) => {
      this.setState({
        _isChangeName: false
      });
    });
  }

  onAddImage = (type = 0) => {
    this.inputs.image.click();
    this.inputs.image.onchange = (e) => {
      this.state.onAddFile({
        camp_id: this.props.obj.id,
        file: e.target.files[0],
        type,
      }).then((addedImage) => {
        let _images = [...this.state._images];
        _images.push(addedImage);
        this.setState({
          _images
        });
      });
      this.inputs.image.value = null;
    }
  }

  onDeleteImage = (id) => {
    if (window.confirm(_TRANS('all', 'delete_image_confirm'))) {
      this.state.onDeleteFile(id).then(() => {
        let _images = [...this.state._images];
        for (let i in _images) {
          if (_images[i].id == id) {
            _images.splice(i, 1);
            break;
          }
        }
        this.setState({
          _images
        });
      });
    }
  }

  componentDidMount = () => {
    if (!this.state._images.length) {
      this.state.onReceiveFilesList({ 
        camp_id: this.props.obj.id, 
        types: [1,2] 
      }).then((list) => {
        this.setState({
          _images: list
        });
      });
    }
  }

  render() {
    let obj = this.props.obj;
    let _images = this.state._images;

    if (Array.isArray(_images) && _images.length > 1) {
      var _ext_images = [];
      for (let i = 1; i < _images.length; i++) {
        _ext_images.push(
          <div key={i} className="admin__intro-thumb" style={{
            backgroundImage: "url('"+ _images[i].src +"')"
          }} onClick={this.onDeleteImage.bind(this, _images[i].id)}></div>
        );
      }
    }
    
    return (
      <div>
        <div className="admin__intro">
          <div className="admin__intro-image">
            {_images && _images.length
              ? (<div className="admin__intro-image-img" style={{
                    backgroundImage: "url('"+ _images[0].src +"')"
                  }}
                  data-toggle="tooltip"
                  onClick={this.onDeleteImage.bind(this, _images[0].id)}
                  title={_TRANS('all', 'delete_photo')}
                ></div>)
              : (
                <div className="admin__intro-image-img admin__intro-thumb admin__intro-thumb--add" data-toggle="tooltip" title={_TRANS('all', 'add_photo')} onClick={this.onAddImage.bind(this, 1)}></div>
              )
            }
          </div>
          <div className="admin__intro-text">
            {!this.state._isChangeName
              ? (
                <div className="admin__intro-title">
                  <span>{obj.name}</span> &nbsp;
                  <span className="btn btn-xs text-info" 
                    data-toggle="tooltip" title={_TRANS('all', 'edit')} onClick={this.onChangeName.bind(this, true)}>
                    <i className="fa fa-pencil"></i>
                  </span>
                </div>
              )
              : (
                <div className="admin__intro-title">
                  <input name="name" type="text" defaultValue={obj.name}
                    ref={(input) => { this.inputs.name = input; }}
                  /> &nbsp;
                  <span className="btn btn-xs btn-success"
                    data-toggle="tooltip" title={_TRANS('all', 'apply')} onClick={this.onUpdateName}>
                    <i className="fa fa-check"></i>
                  </span>
                  <span className="btn btn-xs btn-danger" 
                    data-toggle="tooltip" title={_TRANS('all', 'cancel')} onClick={this.onChangeName.bind(this, false)}>
                    <i className="fa fa-ban"></i>
                  </span>
                </div>
              )
            }
            <div className="admin__intro-descr">
              <div>{_TRANS('camp', 'id_ucase')} <span>{obj.external_id}</span> </div>
              <div>{_TRANS('camp', 'inn')} <span>{obj.inn}</span> </div>
            </div>
            {obj.address && (
              <div className="admin__intro-point">
                <i className="text-info fa fa-map-marker"></i>
                <span>&nbsp;&nbsp;{obj.address}</span>
              </div>
            )}
          </div>
          {obj.status_id && (
            <div className="admin__intro-status">
              <div className="admin__intro-status-badge" style={{
                backgroundColor: obj.status_color
              }}>{obj.status_name}</div>
            </div>
          )}
        </div>
        {_images && (
          <div className="admin__intro-thumbs">
            {_ext_images}
            {_images.length > 0 && (
              <div className="admin__intro-thumb admin__intro-thumb--add" data-toggle="tooltip" title={_TRANS('all', 'add_photo')} onClick={this.onAddImage.bind(this, 2)}></div>
            )}
          </div>
        )}
        <input type="file"
          ref={(input) => { this.inputs.image = input; }}
          style={{ display: 'none' }}
        />
    </div>
    );
  }
}

export default Container.create(CampEditIntro);