import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store/index.js";
//Importando react bootstrap ------------>>
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-o7k6sbvjre41wvzb.us.auth0.com"
        clientId="66qlWattWEnEf9wvlEyxx3VC5P8S9sxK"
        redirectUri={window.location.origin}
        audience="route-protected"
        scope="openid profile email"
      >
    <App />
    </Auth0Provider>
    </BrowserRouter>
    </Provider>
);