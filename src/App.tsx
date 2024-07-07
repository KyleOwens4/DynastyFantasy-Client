import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { AppQuery as AppQueryType } from "../data/__generated__/AppQuery.graphql";
import { AppShell } from "@mantine/core";
import Header from "./components/shell/Header";
import AccountForm, { AccountFormView } from "./pages/AccountForm";

const AppQuery = graphql`
  query AppQuery {
    profilesCollection {
      edges {
        cursor
        node {
          nodeId
          id
        }
      }
    }
  }
`;

function App() {
  const data = useLazyLoadQuery<AppQueryType>(AppQuery, {});
  return (
    <AppShell header={{ height: 50 }} padding="md" bg={"slate.1"}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main className="flex items-center justify-center">
        <AccountForm variant={AccountFormView.signin} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
