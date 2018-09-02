import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

import './index.css';

ReactDOM.render((
  <Router history={history}>
    <App />
  </Router>
), document.getElementById('root'));

registerServiceWorker();
