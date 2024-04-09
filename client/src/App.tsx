import "./App.css";
import { graphql, useLazyLoadQuery } from "react-relay";
import { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";

const AppQuery = graphql`
  query AppQuery($userID: Float!) {
    user(id: $userID) {
      userID
      firstName
    }
  }
`;

function App() {
  const data = useLazyLoadQuery<AppQueryType>(AppQuery, { userID: 1 });

  return <p>{data.user.firstName}</p>;
}

export default App;
