import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  let navigate = useNavigate();

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const response = await login({
          variables: { email, password },
        });

        console.log(response);
        navigate("/");
      }}
    >
      <div>
        <input
          value={email}
          placeholder='email'
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};
