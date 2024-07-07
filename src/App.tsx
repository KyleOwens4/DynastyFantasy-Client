import { AppShell } from "@mantine/core";
import Header from "./components/shell/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

function App() {
  return (
    <AppShell header={{ height: 50 }} padding="md" bg={"slate.1"}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main className="flex">
        <RouterProvider router={router} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
