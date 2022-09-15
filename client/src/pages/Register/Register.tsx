import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../generated/graphql";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styles from "./Register.module.scss";

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();
  let navigate = useNavigate();

  return (
    <form
      className={styles.register}
      onSubmit={async e => {
        e.preventDefault();
        const response = await register({
          variables: { email, password },
        });

        console.log(response);
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
        Register
      </Button>
    </form>
  );
};
