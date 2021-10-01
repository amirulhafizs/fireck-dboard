import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import store from "store";
import { Provider } from "react-redux";
import NotificationsProvider from "components/NotificationsProvider";
import RouteLeaveGuard from "components/RouteLeaveGuard";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RouteLeaveGuard />
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
