import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { AppQuery as AppQueryType } from "../data/__generated__/AppQuery.graphql";

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
    <div className="bg-red-500 text-white text-sm">
      {data.profilesCollection?.edges[0].node.nodeId}
    </div>
  );
}

export default App;
