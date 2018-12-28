import React, { Component } from 'react';

import { timeoutChangeInput } from "../../config";

class FormControl extends Component {
  changeInputCounter = 0;
  input = null;

  static defaultProps = {
    formGroupType: null,
    cols: [
      'col-xs-12 col-md-6',
      'col-xs-12 col-md-6'
    ],
    id: null,
    label: null,
    name: '',
    type: 'text',
    defaultValue: '',
    errorMessage: '',
  }

  constructor(props) {
    super(props);
  
    this.state = {
      value: props.defaultValue,
      showLoader: false,
      showSuccess: false,
    }
  }

  onChangeInput = () => {
    this.setState({
      value: this.input.value,
      showSuccess: false,
    });

    if (typeof this.props.onChange === 'function') {
      this.changeInputCounter++;

      setTimeout(() => {
        this.changeInputCounter--;
        if (this.changeInputCounter === 0) {
          let vv = {};
          vv[this.input.getAttribute('name')] = this.input.value;

          this.setState({ showLoader: true });
          this.props.onChange(vv).then(() => {
            this.setState({ 
              showLoader: false,
              showSuccess: true
            });
          });
        }
      }, timeoutChangeInput);
    }
  }

  render () {
    let cmp = null;
    let showLoader = this.state.showLoader;
    let showSuccess = this.state.showSuccess;
    switch (this.props.formGroupType) {
      case 'horizontal':
        cmp = (
          <div className={"row row-sm flex-row flex-row--vcenter form-group" + (this.props.errorMessage ? ' has-error' : '')}>
            <div className={this.props.cols[0] || 'col-auto'}>
              {this.props.label 
                ? <label htmlFor={this.props.label} className="settings__label">{this.props.label}</label>
                : null
              }
            </div>
            <div className={this.props.cols[1] || 'col-auto'}>
              <div style={{ position: 'relative' }}>
                {!showLoader || <i className="fa fa-spinner text-warning fa-pulse form-status-icon"></i>}
                {!showSuccess || <i className="fa fa-check text-success form-status-icon"></i>}
                
                {this.props.type === 'textarea'
                  ? <textarea id={this.props.id} rows="5" name={this.props.name} className="form-control"
                    value={this.state.value}
                    onChange={this.onChangeInput}
                    ref={(input) => { this.input = input; }}
                  />
                  : <input id={this.props.id} name={this.props.name} type={this.props.type} className="form-control"
                    value={this.state.value}
                    onChange={this.onChangeInput}
                    ref={(input) => { this.input = input; }}
                  />
                }
              </div>

              {this.props.errorMessage
                ? <small className="text-danger">{this.props.errorMessage}</small>
                : null
              }
            </div>
          </div>
        );
        break;
      case 'default':
      default:
        cmp = (
          <div className={"form-group" + (this.props.errorMessage ? ' has-error' : '')}>
            {this.props.label 
              ? <label htmlFor={this.props.label} className="settings__label">{this.props.label}</label>
              : null
            }
            <div style={{ position: 'relative' }}>
              {!showLoader || <i className="fa fa-spinner text-warning fa-pulse form-status-icon"></i>}
              {!showSuccess || <i className="fa fa-check text-success form-status-icon"></i>}

              {this.props.type === 'textarea'
                ? <textarea id={this.props.id} rows="5" name={this.props.name} className="form-control"
                  value={this.state.value}
                  onChange={this.onChangeInput}
                  ref={(input) => { this.input = input; }}
                />
                : <input id={this.props.id} name={this.props.name} type={this.props.type} className="form-control"
                  value={this.state.value}
                  onChange={this.onChangeInput}
                  ref={(input) => { this.input = input; }}
                />
              }
            </div>

            {this.props.errorMessage
              ? <small className="text-danger">{this.props.errorMessage}</small>
              : null
            }
          </div>
        );
        break;
    }

    return cmp;
  }
}

export default FormControl;