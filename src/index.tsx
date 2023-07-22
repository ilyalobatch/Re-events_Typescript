// Components
import App from "./app/layout/App";
import ScrollToTop from "./app/layout/ScrollToTop";

// assets
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-calendar/dist/Calendar.css";
import "./app/layout/styles.scss";

// library
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

// helpers
import reportWebVitals from "./reportWebVitals";
import { store, history } from "./app/store/configureStore";
import { WindowContextProvider } from "./app/context/WindowContext";
import { verifyAuth } from "./features/auth/authActions";
import "./i18n/config";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl || document.createElement("div"));

store.dispatch(verifyAuth());

function render() {
  root.render(
    <WindowContextProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollToTop />
          <App />
        </ConnectedRouter>
      </Provider>
    </WindowContextProvider>
  );
}

if (module["hot"]) {
  module["hot"].accept("./app/layout/App", function () {
    setTimeout(render);
  });
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
