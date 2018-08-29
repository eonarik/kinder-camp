import React, { Component } from 'react';

import { Container } from "flux/utils";
import TariffStore from "../../data/TariffStore.js";
import Actions from '../../data/Actions/tariffs';

const _TRANS = require('../../const/trans');

class ModalTariffEdit extends Component {

  static getStores() {
    return [ TariffStore ];
  }

  static calculateState(prevState) {
    return {
      onUpdateTariff: Actions.updateTariff,
      onAddTariff: Actions.addTariff,
      onDeleteTariff: Actions.deleteTariff,
    };
  }

  inputs = {}

  render () {
    return (
      <div className="modal fade" id="modal-tariff-edit">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Modal title</h4>
            </div>
            <div className="modal-body">
              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Container.create(ModalTariffEdit);