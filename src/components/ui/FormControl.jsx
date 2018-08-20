import React, { Component } from 'react';

import { timeoutChangeInput } from "../../config";

class FormControl extends Component {
  changeInputCounter = 0;
  input = null;

  static defaultProps = {
    formGroupType: null,
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
    }
  }

  onChangeInput = () => {
    this.setState({
      value: this.input.value
    });

    if (typeof this.props.onChange === 'function') {
      this.changeInputCounter++;

      setTimeout(() => {
        this.changeInputCounter--;
        if (this.changeInputCounter === 0) {
          let vv = {};
          vv[this.input.getAttribute('name')] = this.input.value;
          this.props.onChange(vv);
        }
      }, timeoutChangeInput);
    }
  }

  render () {
    let cmp = null;
    switch (this.props.formGroupType) {
      case 'horizontal':
        cmp = (
          <div className={"row flex-row flex-row--vcenter form-group" + (this.props.errorMessage ? ' has-error' : '')}>
            <div className="col-xs-12 col-md-6">
              {this.props.label 
                ? <label htmlFor={this.props.label} className="settings__label">{this.props.label}</label>
                : null
              }
            </div>
            <div className="col-xs-12 col-md-6">
              {this.props.type == 'textarea'
                ? <textarea id={this.props.label} rows="5" name={this.props.name} className="form-control"
                  value={this.state.value}
                  onChange={this.onChangeInput}
                  ref={(input) => { this.input = input; }}
                />
                : <input id={this.props.label} name={this.props.name} type={this.props.type} className="form-control"
                  value={this.state.value}
                  onChange={this.onChangeInput}
                  ref={(input) => { this.input = input; }}
                />
              }
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
            {this.props.type == 'textarea'
              ? <textarea id={this.props.label} rows="5" name={this.props.name} className="form-control"
                value={this.state.value}
                onChange={this.onChangeInput}
                ref={(input) => { this.input = input; }}
              />
              : <input id={this.props.label} name={this.props.name} type={this.props.type} className="form-control"
                value={this.state.value}
                onChange={this.onChangeInput}
                ref={(input) => { this.input = input; }}
              />
            }
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