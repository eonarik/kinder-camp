import React, { Component } from 'react';

import ActionsResumes from '../../data/Actions/resumes';

class ResumesFieldText extends Component {
  constructor (props) {
    super(props);
    if (props.obj.value) {
      props.inputs[props.obj.name] = props.obj.value;
    }
    this.state = {
      value: props.obj.value || ''
    }
  }

  setValue = (e) => {
    let input = e.target;

    this.props.inputs[this.props.obj.name] = input.value;
    this.setState({
      value: input.value
    });
  }

  render () {
    let obj = this.props.obj;
    let id = "resume-" + obj.name
    return (
      <div className="form-group">
        <label htmlFor={id}>{obj.caption}</label>
        <input
          id={id}
          name={obj.name}
          className="form-control"
          type={this.props.type}
          value={this.state.value}
          onChange={this.setValue}
        />
      </div>
    );
  }
}

class ResumesFieldRadioCheckbox extends Component {
  constructor (props) {
    super(props);

    let elements = props.obj.elements.split('||');
    let values = [];

    if (props.type === 'radio') {
      values.push(elements[0]);
    }
    if (values.length) {
      this.addValue(values.join('||'));
    }
    this.state = {
      values
    }
  }

  addValue = (value) => {
    this.props.inputs[this.props.obj.name] = value;
  }

  setValue = (e) => {
    let input = e.target;
    let _values = [...this.state.values];

    if (this.props.type === 'checkbox') {
      if (input.checked) {
        if (!_values.length || _values.indexOf(input.value) < 0) {
          _values.push(input.value);
        }
      } else {
        for (let i in _values) {
          if (_values[i] === input.value) {
            _values.splice(i, 1);
            break;
          }
        }
      }
    }

    if (this.props.type === 'radio') {
      _values = [input.value];
    }

    if (_values.length) {
      this.addValue(_values.join('||'));

      this.setState({
        values: _values
      });
    }
  }

  render () {
    let obj = this.props.obj;
    let id = "resume-" + obj.name
    let _options = [];
    let elements = obj.elements.split('||');

    for (let i in elements) {
      if (elements[i]) {
        let parts = elements[i].split('==');
        let key, value;
        if (parts.length >= 2) {
          key = parts.shift();
          value = parts.join('==');
        } else {
          value = parts.shift();
          key = value;
        }
        _options.push(
          <div key={i} className="col-xs-6">
            <label htmlFor={id + i}>
              <input
                id={id + i}
                name={obj.name}
                type={this.props.type}
                value={key}
                checked={
                  (this.state.values.length && this.state.values.indexOf(key) >= 0)
                  || obj.value === key
                }
                onChange={this.setValue}
              />
              <span>{value}</span>
            </label>
          </div>
        );
      }
    }
    return (
      <div>
        <div>{obj.caption}</div>
        <div className={"form-group " + this.props.type}>
          <div className="row flex-row">
            {_options}
          </div>
        </div>
      </div>
    );
  }
}

class ResumeFieldImage extends Component {
  constructor (props) {
    super(props);
    if (props.obj.value) {
      this.props.inputs[this.props.obj.name] = props.obj.value;
    }
    this.state = {
      photo: props.obj.value || null
    }
  }

  setValue = (e) => {
    let input = e.target;
    if (input.files.length) {
      var fr = new FileReader();
      fr.onload = () => {
        this.props.inputs[this.props.obj.name] = input.files[0];
        this.setState({
          photo: fr.result
        });
      }
      fr.readAsDataURL(input.files[0]);
    }
  }

  render () {
    let obj = this.props.obj;
    let id = "resume-" + obj.name
    let photo = this.state.photo;
    return (
      <div className="form-group row flex-row flex-row--vcenter">
        <div className="col-xs-12 col-md-4">
          <label htmlFor={id}>{obj.caption}</label>
        </div>
        <div className="col-xs-12 col-md-8">
          <div style={{ position: 'relative' }}>
            <div className="admin__intro-image">
              {photo
                ? (
                  <div className="flex-row flex-row--vcenter flex-row--nowrap">
                    <label htmlFor={id} className="admin__intro-image-img"
                      style={{
                        height: 120,
                        minWidth: 90,
                        maxWidth: 90,
                        margin: '0 20px 0 0',
                        backgroundImage: "url("+ photo +")"
                      }}
                    />
                    <i className="text-muted">Нажмите на фото чтобы заменить его</i>
                  </div>
                )
                : (
                  <label htmlFor={id} className="admin__intro-image-img admin__intro-thumb admin__intro-thumb--add" 
                    style={{
                      height: 120,
                      width: 90
                    }}
                  />
                )
              }
            </div>

            <input type="file"
              id={id}
              name={obj.name}
              ref={(input) => { this.input = input; }}
              onChange={this.setValue}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ResumeEdit extends Component {
  inputs = []

  accord = {
    resume_photo: 'photo',
    resume_firstname: 'name',
    resume_lastname: 'lastname',
    resume_middlename: 'middlename',
    resume_city: 'city',
    resume_mobile_phone: 'mobilephone',
    resume_email: 'email',
    resume_social: 'social',
    resume_dob: 'dob',
  }

  constructor (props) {
    super(props);
    this.state = {
      fields: null
    }
  }

  createResume = () => {
    let options = {};
    for (let key in this.inputs) {
      let value = this.inputs[key];
      options[key] = value;
    }
    if (this.props.updatedResume) {
      this.props.onUpdateResume(this.props.updatedResume.id, options).then((response) => {
        if (response.success) {
          this.props.toggleEdit();
        }
      })
    } else {
      this.props.onCreateResume(options).then((response) => {
        if (response.success) {
          this.props.toggleEdit();
        }
      });
    }
  }

  componentDidMount = () => {
    ActionsResumes.receiveResumesFieldList().then((fields) => {
      this.setState({
        fields
      });
    });
  }

  render () {
    let _categories = [];
    let updatedResume = this.props.updatedResume;

    for (let categoryId in this.state.fields) {
      let cat = this.state.fields[categoryId];
      let _fields = [];

      for (let i in cat.fields) {
        let field = cat.fields[i];
        field.value = (
          (updatedResume && updatedResume[field.name])
          || this.props.userProfile[this.accord[field.name]]
          || null
        );

        switch (field.type) {
          case 'date':
          case 'text':
            _fields.push(
              <ResumesFieldText
                key={i}
                obj={field}
                type={field.type}
                inputs={this.inputs}
              />
            );
            break;
          case 'radio':
          case 'checkbox':
            _fields.push(
              <ResumesFieldRadioCheckbox
                key={i}
                obj={field}
                type={field.type}
                inputs={this.inputs}
              />
            );
            break;
          case 'image':
            _fields.push(
              <ResumeFieldImage
                key={i}
                obj={field}
                inputs={this.inputs}
              />
            );
            break;
          default:
        }
      }

      _categories.push(
        <div key={'title-' + categoryId} className="col-xs-12 col-md-6 col-lg-4">
          <h3 className="settings__subtitle">{cat.name}</h3>
          {_fields}
        </div>
      );
    }

    return (
      <div>
        {updatedResume && updatedResume.pagetitle ? <h3>{updatedResume.pagetitle}</h3> : null}
        <div className="card-block">
          <div className="row flex-row">
            {_categories}
          </div>
                
          <div className="row row-sm flex-row flex-row--right">
            <div className="col-auto">
              <button type="button" className="btn btn-danger" onClick={this.props.toggleEdit}>
                Отмена
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-success" onClick={this.createResume}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeEdit;