// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
// import AppContainer from './App';
import * as serviceWorker from './serviceWorker';
// import {BrowserRouter} from 'react-router-dom';
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import '@fortawesome/fontawesome-free/css/all.css';
import { render } from 'react-dom';
import App from './App';


render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
