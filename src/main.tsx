import { RelayEnvironmentProvider } from "react-relay";
import environment from "./RelayEnvironment";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RelayEnvironmentProvider environment={environment}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RelayEnvironmentProvider>
);
