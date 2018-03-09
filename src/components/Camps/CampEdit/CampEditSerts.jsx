import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "../../../data/CampStore.js";
import Actions from '../../../data/Actions';

const _TRANS = require('../../../const/trans');

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
        types: [3]
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
        _serts.push(
          <div key={i} className="admin__serts-item" style={{
            backgroundImage: "url(" + _file.src + ")"
          }} onClick={this.onDeleteFile.bind(this, _file.id)}></div>
        );
      }
    }
    _serts.push(
      <div key={'add'} className="admin__serts-item admin__serts-item--add" onClick={this.onAddFile.bind(this, 3)}></div>
    );

    return (
      <div>
        {_serts && (
          <div className="admin__serts">
            {_serts}
          </div>
        )}

        <input type="file"
          ref={(input) => { this.inputs.file = input; }}
          style={{ display: 'none' }}
        />
      </div>
    );
  }
}

export default Container.create(CampTariff);