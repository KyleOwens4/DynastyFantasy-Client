import { AppShell } from "@mantine/core";
import Header from "./components/shell/Header";
import { Outlet } from "react-router-dom";

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
