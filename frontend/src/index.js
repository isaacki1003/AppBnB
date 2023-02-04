import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./context/Modal";
import { ModalVariableProvider } from "./context/ModalVariable";
import { DisplaySearchBarProvider } from "./context/DisplaySearchBar";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spot";
import * as reviewActions from "./store/review";

import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotActions = spotActions;
  window.reviewActions = reviewActions;
}

function Root() {
  return (
    <Provider store={store}>
      <DisplaySearchBarProvider>
        <ModalVariableProvider>
          <ModalProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModalProvider>
        </ModalVariableProvider>
      </DisplaySearchBarProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
