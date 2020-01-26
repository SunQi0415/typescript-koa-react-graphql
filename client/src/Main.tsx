import * as ReactDOM from 'react-dom';
import * as React from 'react';
// import { Provider } from 'react-redux';
// import { configureStore, history } from "./reducers/store";
import { BrowserRouter } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';
import { App } from './App';

// const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
)