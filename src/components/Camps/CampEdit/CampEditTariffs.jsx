import React, { Component } from 'react';

import { Container } from "flux/utils";
import CampStore from "../../../data/CampStore.js";
import ProgramStore from "../../../data/ProgramStore.js";
import ActionsPrograms from '../../../data/Actions/programs';
import ActionsTariffs from '../../../data/Actions/tariffs';

import { Modal } from 'react-bootstrap';

const declOfNum = require('../../../inc/declOfNum');
const _TRANS = require('../../../const/trans');


class ModalTariffEdit extends Component {
  static defaultProps = {
    camp_id: 0,
    obj: {},
    isOpen: false,
  }

  constructor (props) {
    super(props);
    this.state = {
      _programs: []
    };
  }

  inputs = {}

  onReceiveProgramsList = () => {
    this.props.onReceiveProgramsList({
      camp_id: this.props.camp_id,
      limit: 0,
    }).then((list) => {
      this.setState({
        _programs: list
      });
    });
  }

  onUpdateTariff = () => {
    let _values = {
      camp_id: this.props.camp_id
    };
    for (let key in this.inputs) {
      _values[key] = this.inputs[key].value;
    }
    this.props.onUpdateTariff(this.props.obj.id, _values).then((updatedTariff) => {
      let _obj = {
        ...this.props.obj,
        ...updatedTariff
      };
      this.props.hideModal(_obj);
    });
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.onReceiveProgramsList();
    }
  }

  render() {

    let tariff = this.props.obj;
    let tariffNumOption = [];
    let programOption = [];

    if (tariff && !Object.keys(tariff).length) {
      return null;
    }

    programOption.push(
      <option key={0} value={0}>..</option>
    );
    for (let i in this.state._programs) {
      let program = this.state._programs[i];
      programOption.push(
        <option key={program.id} value={program.id}>{program.name}</option>
      );
    }

    tariffNumOption.push(
      <option key={0} value=''>..</option>
    );
    for (let i = 1; i <= 12; i++) {
      tariffNumOption.push(
        <option key={i} value={i}>{_TRANS('camp', 'tariff')} {i}</option>
      );
    }

    if (tariff.period_start && tariff.period_end) {
      tariff.days = tariff.period_end - tariff.period_start;
    }

    return (
      <Modal 
        show={this.props.isOpen} 
        onHide={this.props.hideModal}
      >
        <Modal.Header>
          <button type="button" className="close" onClick={this.props.hideModal.bind(this, null)}>&times;</button>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>{_TRANS('camp', 'please_select_tariff_number')}</label>
            {typeof tariffNumOption !== 'undefined' && tariffNumOption.length
              ? (
                <select className="form-control" name="name"
                  defaultValue={tariff.name.replace(/\D+?(\d+)/, "$1")} 
                  ref={(input) => { this.inputs.name = input; }}
                >
                  {tariffNumOption}
                </select>
              )
              : null
            }
          </div>
          <div className="form-group">
            <label>{_TRANS('tariff', 'longtitle_hint')}</label>
            <input className="form-control" name="longtitle" type="text"
              defaultValue={tariff.longtitle} 
              ref={(input) => { this.inputs.longtitle = input; }}
            />
          </div>
          <div className="form-group row row-sm">
            <div className="col-xs-6">
              <label>{_TRANS('tariff', 'period_start_hint')}</label>
              <input className="form-control" name="period_start" type="text"
                defaultValue={tariff.period_start} 
                ref={(input) => { this.inputs.period_start = input; }}
              />
            </div>
            <div className="col-xs-6">
              <label>{_TRANS('tariff', 'period_end_hint')}</label>
              <input className="form-control" name="period_end" type="text" 
                defaultValue={tariff.period_end} 
                ref={(input) => { this.inputs.period_end = input; }} 
              />
            </div>
          </div>
          <div className="form-group">
            <label>{_TRANS('all', 'please_select_program')}</label>
            {typeof programOption !== 'undefined' && programOption.length
              ? (
                <select className="form-control" name="program_id" 
                  defaultValue={tariff.program_id}
                  ref={(input) => { this.inputs.program_id = input; }}
                >
                  {programOption}
                </select>
              )
              : null
            }
          </div>
          <div className="form-group">
            <label>{_TRANS('tariff', 'age_hint')}</label>
            <input className="form-control" name="age" type="text" 
              defaultValue={tariff.age} 
              ref={(input) => { this.inputs.age = input; }} 
            />
          </div>
          <div className="form-group">
            <label>{_TRANS('tariff', 'price_hint')}</label>
            <input className="form-control" name="price" type="number" 
              defaultValue={tariff.price} 
              ref={(input) => { this.inputs.price = input; }} 
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-default' onClick={this.props.hideModal.bind(this, null)}>
            <i className="fa fa-ban"></i> {_TRANS('all', 'cancel')}
          </button>
          <button className='btn btn-primary' onClick={this.onUpdateTariff}>
            <i className="fa fa-check"></i> {_TRANS('all', 'edit')}
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
//*/

class CampTariff extends Component {
  static defaultProps = {
    camp_id: 0,
    obj: {},
  }

  // constructor (props) {
  //   super(props);
  // }

  inputs = {}

  onToggleUpdateTariff = () => {
    this.props.openModal(this.props.obj)
  }

  render() {
    const tariff = this.props.obj;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="admin__tariff">
          <div className="admin__tariff-header">
            <div className="admin__tariff-title">
              <div>
                <strong>{tariff.name}</strong>
              </div>
              {tariff.period_start && tariff.period_end
                ? (
                  <div>
                    {tariff.period}
                  </div>
                )
                : null
              }
            </div>
            <div className="admin__tariff-days">
              <div>{parseInt(tariff.period_diff, 10)}</div>
              <small>{declOfNum(parseInt(tariff.period_diff, 10), _TRANS('all', 'days'))}</small>
            </div>
          </div>
          <div className="admin__tariff-body">
            <div className="admin__tariff-program">
              <a>{tariff.program_name}</a>
            </div>
            <div className="admin__tariff-age">
              <span>{tariff.age}</span>
            </div>
            <div className="admin__tariff-price">
              <span>{tariff.price}</span>
              <small>{_TRANS('all', 'rub_small')}</small>
            </div>
          </div>
          <div className="admin__tariff-footer">
            <button className="btn btn-icon btn-icon--edit" data-toggle="tooltip" title={_TRANS('all', 'edit')} data-placement="bottom" onClick={this.onToggleUpdateTariff}></button>
            <button className="btn btn-icon btn-icon--delete" data-toggle="tooltip" title={_TRANS('all', 'delete')} data-placement="bottom" onClick={this.props.onDeleteTariff.bind(this, tariff.id)}></button>
          </div>
        </div>
      </div>
    );
  }
}

class CampEditTariffs extends Component {
  static getStores() {
    return [CampStore, ProgramStore];
  }

  static calculateState(prevState) {
    return {
      onReceiveTariffsList: ActionsTariffs.receiveTariffsList,
      onReceiveProgramsList: ActionsPrograms.receiveProgramsList,
      onAddTariff: ActionsTariffs.addTariff,
      onUpdateTariff: ActionsTariffs.updateTariff,
      onDeleteTariff: ActionsTariffs.deleteTariff,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      _tariffs: [],
      isOpenModal: false,
      editedTariff: {},
    };
  }
  
  openModal = (obj) => {
    this.setState({
      isOpenModal: true,
      editedTariff: obj,
    });
  };
  
  hideModal = (newObj = null) => {
    if (newObj) {
      let tariffs = this.state._tariffs;
      if (tariffs && tariffs.length) {
        for (let i in tariffs) {
          let tariff = tariffs[i];
          if (tariff.id === newObj.id) {
            tariffs[i] = newObj;
            this.setState({
              isOpenModal: false,
              editedTariff: {},
              _tariffs: tariffs
            });
            break;
          }
        }
      }
    } else {
      this.setState({
        isOpenModal: false,
        editedTariff: {},
      });
    }
  };

  onAddTariff = () => {
    if (window.confirm(_TRANS('all', 'add_tariff_confirm'))) {
      this.state.onAddTariff({
        camp_id: this.props.obj.id
      }).then((newTariff) => {
        let _tariffs = [...this.state._tariffs];
        _tariffs.push(newTariff);
        this.setState({
          _tariffs
        });
      });
    }
  }

  onDeleteTariff = (id) => {
    if (window.confirm(_TRANS('all', 'delete_tariff_confirm'))) {
      this.state.onDeleteTariff(id).then(() => {
        let _tariffs = [...this.state._tariffs];
        for (let i in _tariffs) {
          if (_tariffs[i].id === id) {
            _tariffs.splice(i, 1);
            break;
          }
        }
        this.setState({
          _tariffs
        });
      });
    }
  }

  componentDidMount = () => {
    this.state.onReceiveTariffsList({
      camp_id: this.props.obj.id
    }).then((list) => {
      this.setState({
        _tariffs: list
      });
    });
  }

  render() {
    const tariffs = this.state._tariffs;

    let _tariffs = [];
    if (tariffs && tariffs.length) {
      for (let i in tariffs) {
        let tariff = tariffs[i];
        // if (this.state.updatedTariff && this.state.updatedTariff.id == tariff.id) {
        //   tariff = this.state.updatedTariff;
        // }
        _tariffs.push(
          <CampTariff
            key={tariff.id}
            obj={tariff}
            camp_id={this.props.obj.id}
            onDeleteTariff={this.onDeleteTariff}
            openModal={this.openModal}
          />
        );
      }
    }
    _tariffs.push(
      <div key="add" className="col-xs-12 col-sm-6 col-md-4">
        <div className="admin__tariff admin__tariff--add"
          onClick={this.onAddTariff}>
        </div>
      </div>
    );

    return (
      <div>
        <h5>{_TRANS('all', 'tariff')}:</h5>
        <div className="row row-sm">
          {_tariffs}
        </div>
        <ModalTariffEdit 
          isOpen={this.state.isOpenModal}
          hideModal={this.hideModal}
          obj={this.state.editedTariff}
          camp_id={this.props.obj.id}
          onUpdateTariff={this.state.onUpdateTariff}
          onReceiveProgramsList={this.state.onReceiveProgramsList}
        />
      </div>
    );
  }
}

export default Container.create(CampEditTariffs);