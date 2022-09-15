import { useUsersQuery } from "../../generated/graphql";
import Paper from "@mui/material/Paper";
import { TableContainer, Typography } from "@mui/material";
import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div className={styles.title}>Loading....</div>;
  }

  return (
    <TableContainer className={styles.table} component={Paper}>
      <Typography className={styles.title}>users:</Typography>
      <ul className={styles.list}>
        {data.users.map(x => {
          return (
            <li className={styles.list_item} key={x.id}>
              {x.email}, {x.id}
            </li>
          );
        })}
      </ul>
    </TableContainer>
  );
};
