import { RelayEnvironmentProvider } from "react-relay";
import environment from "./relay/RelayEnvironment";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import defaultTheme from "tailwindcss/defaultTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RelayEnvironmentProvider environment={environment}>
    <MantineProvider
      theme={{
        fontFamily: "Inter var, " + defaultTheme.fontFamily.sans.join(", "),
      }}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MantineProvider>
  </RelayEnvironmentProvider>
);
