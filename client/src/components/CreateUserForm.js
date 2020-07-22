import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_USER_MUTATION = gql`
  mutation create_user($name: String!, $password: String!) {
    create_user(name: $name, password: $password) {
      id
      name
    }
  }
`;

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, { data, error }] = useMutation(CREATE_USER_MUTATION, {
    onError: () => console.error(error),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({ variables: { name, password } });
    setName("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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
  );
}
