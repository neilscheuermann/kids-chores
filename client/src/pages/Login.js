import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";
import gql from "graphql-tag";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../util/context";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      id
      token
    }
  }
`;

const Login = () => {
  const { token, setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    onError: () => console.error(error),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    login({ variables: { email, password } });
  };

  if (data) {
    const {
      authenticate: { id, token },
    } = data;
    setAuth({ id, token });
  }

  if (token) {
    return <Redirect to="/users" />;
  }

  return (
    <>
      <Helmet>
        <title>KidsChores | Log in</title>
        <meta property="og:title" content="Socializer | Log in" />
      </Helmet>

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Login;
