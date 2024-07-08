import { AppShell } from "@mantine/core";
import Header from "./components/shell/Header";
import { Outlet, RouterProvider } from "react-router-dom";
import useAuthentication from "./hooks/auth/useAuthentication";
import buildRouter from "./FantasyReferenceRouter";

function App() {
  return (
    <AppShell header={{ height: 50 }} padding="md" bg={"slate.1"}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main className="flex">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
