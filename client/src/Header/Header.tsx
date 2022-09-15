import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import styles from "./Header.module.scss";

export const Header = () => {
  const { data, loading } = useMeQuery();

  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>you are logged in as: {data.me.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <header>
      <div className={styles.header}>
        <Link className={styles.link} to='/'>
          Home
        </Link>
        <Link className={styles.link} to='/register'>
          Register
        </Link>
        <Link className={styles.link} to='/login'>
          Login
        </Link>
        <Link className={styles.link} to='/bye'>
          Bye
        </Link>
      </div>
      <div className={styles.logout}>
        {!loading && data && data.me ? (
          <Button
            variant='contained'
            onClick={async () => {
              await logout();
              setAccessToken("accessToken", null);
              await client!.resetStore();
            }}
          >
            Logout
          </Button>
        ) : null}
      </div>
      <div className={styles.body}>{body}</div>
    </header>
  );
};
