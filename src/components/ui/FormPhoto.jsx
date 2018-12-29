import React, { Component } from "react";

class FormPhoto extends Component {
  input = null;

  static defaultProps = {
    formGroupType: null,
    cols: ["col-xs-12 col-md-6", "col-xs-12 col-md-6"],
    id: null,
    label: null,
    name: "",
    defaultValue: "",
    errorMessage: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
      showLoader: false,
      showSuccess: false
    };
  }

  onChangeInput = () => {
    this.setState({
      showLoader: true,
      showSuccess: false
    });
    console.log(this.input.files[0]);
    this.props
      .onChange({
        [this.props.name]: this.input.files[0]
      })
      .then(value => {
        this.setState({
          showLoader: false,
          showSuccess: true,
          value
        });
      });
  };

  render() {
    let cmp = null;
    let photo = this.state.value;
    let showLoader = this.state.showLoader;
    let showSuccess = this.state.showSuccess;

    switch (this.props.formGroupType) {
      case "horizontal":
        cmp = (
          <div className="row flex-row flex-row--vcenter form-group">
            <div className={this.props.cols[0] || "col-auto"}>
              <label htmlFor={this.props.id}>{this.props.label}</label>
            </div>
            <div className={this.props.cols[1] || "col-auto"}>
              <div style={{ position: "relative" }}>
                {!showLoader || (
                  <i className="fa fa-spinner text-warning fa-pulse form-status-icon" />
                )}
                {!showSuccess || (
                  <i className="fa fa-check text-success form-status-icon" />
                )}

                <div className="admin__intro-image">
                  {photo ? (
                    <div className="flex-row flex-row--vcenter flex-row--nowrap">
                      <label
                        htmlFor={this.props.id}
                        className="admin__intro-image-img"
                        style={{
                          height: 120,
                          minWidth: 90,
                          maxWidth: 90,
                          margin: "0 20px 0 0",
                          backgroundImage: "url(" + photo + ")"
                        }}
                      />
                      <i className="text-muted">
                        Нажмите на фото
                        <br /> чтобы заменить его
                      </i>
                    </div>
                  ) : (
                    <label
                      htmlFor={this.props.id}
                      className="admin__intro-image-img admin__intro-thumb admin__intro-thumb--add"
                      style={{
                        height: 120,
                        width: 90
                      }}
                    />
                  )}
                </div>
              </div>

              {this.props.errorMessage ? (
                <small className="text-danger">{this.props.errorMessage}</small>
              ) : null}

              <input
                type="file"
                id={this.props.id}
                name={this.props.name}
                ref={input => {
                  this.input = input;
                }}
                onChange={this.onChangeInput}
                style={{ display: "none" }}
              />
            </div>
          </div>
        );
        break;

      default:
    }
    return cmp;
  }
}

export default FormPhoto;
