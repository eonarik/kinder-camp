import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "../../../data/CampStore.js";
import Actions from '../../../data/Actions';

import _TRANS from "../../../const/trans";

class CampTariff extends Component {
  static getStores() {
    return [CampStore];
  }

  static calculateState(prevState) {
    return {
      onAddFile: Actions.addFile,
      onDeleteFile: Actions.deleteFile,
      onReceiveFilesList: Actions.receiveFilesList,
    };
  }

  inputs = {}

  constructor(props) {
    super(props);

    this.state = {
      _files: [],
    };
  }

  onAddFile = (type = 0) => {
    this.inputs.file.click();
    this.inputs.file.onchange = (e) => {
      this.state.onAddFile({
        camp_id: this.props.obj.id,
        file: e.target.files[0],
        type,
      }).then((addedFile) => {
        let _files = [...this.state._files];
        _files.push(addedFile);
        this.setState({
          _files
        });
      });
      this.inputs.file.value = null;
    }
  }

  onDeleteFile = (id) => {
    if (window.confirm(_TRANS('all', 'delete_image_confirm'))) {
      this.state.onDeleteFile(id).then(() => {
        let _files = [...this.state._files];
        for (let i in _files) {
          if (_files[i].id == id) {
            _files.splice(i, 1);
            break;
          }
        }
        this.setState({
          _files
        });
      });
    }
  }

  componentDidMount = () => {
    if (!this.state._files.length) {
      this.state.onReceiveFilesList({
        camp_id: this.props.obj.id,
        types: [4]
      }).then((list) => {
        this.setState({
          _files: list
        });
      });
    }
  }

  render() {
    const obj = this.props.obj;
    let _serts = [];
    if (this.state._files.length) {
      for (let i in this.state._files) {
        let _file = this.state._files[i];
        if (!_file.alt) {
          _file.alt = _file.src;
        }
        _serts.push(
          <div key={i}>
            <a href={_file.src} target="_blank">{_file.alt}</a> &nbsp; 
            <button className="btn btn-xs btn-danger" type="button" onClick={this.onDeleteFile.bind(this, _file.id)}>
              <i className="fa fa-times"></i>
            </button>
          </div>
        );
      }
    }

    return (
      <div>
        <h5>{_TRANS('all', 'sertificate_reestr_register')}:</h5>

        {_serts}

        <p>
          <a href="javascript: void(0);" className="btn btn-icon btn-icon--add" onClick={this.onAddFile.bind(this, 4)}>
            <span>{_TRANS('all', 'add_sertificate')}</span>
          </a>
        </p>

        <input type="file"
          ref={(input) => { this.inputs.file = input; }}
          style={{ display: 'none' }}
        />
      </div>
    );
  }
}

export default Container.create(CampTariff);