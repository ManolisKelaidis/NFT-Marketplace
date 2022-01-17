import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import ReduxProvider from "./providers/redux";
import LoaderProvider from "./providers/loader";

import "./i18n";

import "./index.css";
import "./assets/styles/theme.scss";
import "./assets/styles/main.css";

ReactDOM.render(
  <React.StrictMode>
    <LoaderProvider>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </LoaderProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
