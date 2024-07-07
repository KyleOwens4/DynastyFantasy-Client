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
        primaryColor: "emerald",
        primaryShade: 4,
        colors: {
          slate: [
            "#f8fafc",
            "#f1f5f9",
            "#e2e8f0",
            "#cbd5e1",
            "#94a3b8",
            "#64748b",
            "#475569",
            "#334155",
            "#1e293b",
            "#0f172a",
          ],
          emerald: [
            "#ecfdf5",
            "#d1fae5",
            "#a7f3d0",
            "#6ee7b7",
            "#34d399",
            "#10b981",
            "#059669",
            "#047857",
            "#065f46",
            "#064e3b",
          ],
        },
      }}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MantineProvider>
  </RelayEnvironmentProvider>
);
