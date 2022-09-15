import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../accessToken";
import { MeDocument, MeQuery, useLoginMutation } from "../../generated/graphql";
import styles from "./Login.module.scss";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  let navigate = useNavigate();

  return (
    <form
      className={styles.login}
      onSubmit={async e => {
        e.preventDefault();

        const response = await login({
          variables: { email, password },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data.login.user,
              },
            });
          },
        });

        console.log(response);

        if (response && response.data) {
          setAccessToken("accessToken", response.data.login.accessToken);
        }

        navigate("/");
      }}
    >
      <TextField
        variant='outlined'
        value={email}
        label='email'
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        variant='outlined'
        type='password'
        value={password}
        label='password'
        onChange={e => setPassword(e.target.value)}
      />
      <Button variant='contained' type='submit'>
        Login
      </Button>
    </form>
  );
};
