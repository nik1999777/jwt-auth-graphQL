import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

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
