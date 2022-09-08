import { useByeQuery } from "../generated/graphql";

export const Bye = () => {
<<<<<<< HEAD
  const { data, loading, error } = useByeQuery({ fetchPolicy: "network-only" });
=======
  const { data, loading, error } = useByeQuery();
>>>>>>> 51c5ea0bda5803d4e4f8683831636d25130e7765

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>err</div>;
  }

  if (!data) {
    return <div>no data </div>;
  }

  return <div>{data.bye}</div>;
};
