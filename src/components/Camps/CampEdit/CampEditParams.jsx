import React, { Component } from 'react';

const _TRANS = require('../../../const/trans');

class CampEditParams extends Component {

  constructor(props) {
    super(props);

    this.state = {
      _activeTab: 1
    }
  }

  setTab (tab)  {
    this.setState({
      _activeTab: tab
    });
  }

  render() {
    const activeTab = this.state._activeTab;

    return (
      <div>
        <ul className="nav nav-tabs">
          <li className={activeTab === 1 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 1)}>{_TRANS('camp', 'param_type_1')}</a>
          </li>
          <li className={activeTab === 2 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 2)}>{_TRANS('camp', 'param_type_2')}</a>
          </li>
          <li className={activeTab === 3 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 3)}>{_TRANS('camp', 'param_type_3')}</a>
          </li>
          <li className={activeTab === 4 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 4)}>{_TRANS('camp', 'param_type_4')}</a>
          </li>
          <li className={activeTab === 5 ? " active" : ""}>
            <a onClick={this.setTab.bind(this, 5)}>{_TRANS('camp', 'param_type_5')}</a>
          </li>
        </ul>
        <div className="tab-content">
          <div id="tab-camps-1" className={"tab-pane fade" + (activeTab === 1 ? " active in" : "")}>
              
          </div>
          <div id="tab-camps-2" className={"tab-pane fade" + (activeTab === 2 ? " active in" : "")}>

          </div>
          <div id="tab-camps-3" className={"tab-pane fade" + (activeTab === 3 ? " active in" : "")}>

          </div>
          <div id="tab-camps-4" className={"tab-pane fade" + (activeTab === 4 ? " active in" : "")}>

          </div>
          <div id="tab-camps-5" className={"tab-pane fade" + (activeTab === 5 ? " active in" : "")}>

          </div>
        </div>
      </div>
    );
  }
}

export default CampEditParams;