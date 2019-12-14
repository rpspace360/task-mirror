import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { BrowserRouter } from "react-router-dom";

import commonReducer from "./store/reducers/commonReducer";

import boardReducer from "./store/reducers/boardReducers";


import { createBrowserHistory } from 'history'

import "./index.scss";
import App from "./App";
import * as serviceWorker from './serviceWorker';
import axios from "axios";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

const store = createStore(
  combineReducers({
 
    global: commonReducer,
		board: boardReducer,
	

  }),
  composeEnhancers(applyMiddleware(thunk))
);

if (
  window.localStorage.getItem("access-token") &&
  window.localStorage.getItem("refresh-token")
) {
  axios.defaults.headers.common["X-Access-Token"] = localStorage.getItem(
    "access-token"
  );
  axios.defaults.headers.common["X-Refresh-Token"] = localStorage.getItem(
    "refresh-token"
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
