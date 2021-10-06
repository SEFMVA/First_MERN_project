import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AdminContextProvider } from "./contexts/AdminContext";
import { LoggedContextProvider } from "./contexts/LoggedContext";

//Todo Browser router
ReactDOM.render(
  <React.StrictMode>
    <LoggedContextProvider>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </LoggedContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
