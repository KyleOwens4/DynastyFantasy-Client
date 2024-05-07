import "./App.css";
import { graphql, useLazyLoadQuery } from "react-relay";
import { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";

const AppQuery = graphql`
  query AppQuery($id: ID!) {
    user(id: $id) {
      id
      firstName
    }
  }
`;

function App() {
  const data = useLazyLoadQuery<AppQueryType>(AppQuery, {
    id: "VXNlcnM6MQ==",
  });

  return <p>{data.user.firstName}</p>;
}

export default App;
