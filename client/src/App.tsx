import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const App: React.FC = () => {
  const { data, loading } = useQuery(gql`
    {
      hello
    }
  `);

  if (loading) {
    return <div>loadig...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default App;
