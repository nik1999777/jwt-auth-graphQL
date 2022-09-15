import { useByeQuery } from "../../generated/graphql";
import styles from "./Bye.module.scss";

export const Bye = () => {
  const { data, loading, error } = useByeQuery({ fetchPolicy: "network-only" });

  if (loading) {
    return <div className={styles.bye}>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div className={styles.bye}>err</div>;
  }

  if (!data) {
    console.log(data);
    return <div className={styles.bye}>no data</div>;
  }

  return <div className={styles.bye}>{data.bye}</div>;
};
