import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { AppQuery as AppQueryType } from "../data/__generated__/AppQuery.graphql";
import { AppShell, Card } from "@mantine/core";
import { Bird } from "lucide-react";

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
    <AppShell header={{ height: 50 }} padding="md">
      <AppShell.Header>
        <div className="flex h-full items-center space-x-4 px-8">
          <Bird />
          <p className="font-bold">Dynasty Fantasy</p>
        </div>
      </AppShell.Header>

      <AppShell.Main className="flex items-center justify-center">
        <Card className="w-[75%] h-fit" shadow="lg">
          <h1 className="text-xl font-bold">Sign Up</h1>
          <p>use this section to login</p>
        </Card>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
