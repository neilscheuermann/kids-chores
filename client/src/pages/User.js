import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PinInput from "react-pin-input";

const AUTHENTICATE_USER_MUTATION = gql`
  mutation authenticateUser($userId: ID!, $password: String!) {
    authenticateUser(userId: $userId, password: $password) {
      id
      name
    }
  }
`;

export default function UserLogin() {
  const [password, setValue] = useState("");
  const { id: userId } = useParams();
  const pinInput = useRef(null);
  const [authenticateUser, { data, error }] = useMutation(
    AUTHENTICATE_USER_MUTATION,
    {
      onError: (error) =>
        console.error(
          `Poopsiedaisy... 💩 there was an error authenticating user. \n See Error: ${error}`
        ),
    }
  );

  const onChange = (formValue) => {
    setValue(formValue);
  };

  const onClear = () => {
    setValue("");
    pinInput.current.clear();
  };

  const onSubmit = () => {
    authenticateUser({ variables: { userId, password } });
    pinInput.current.clear();
  };

  return (
    <div>
      {data && data.authenticateUser && "IT WORKED!!!"}
      {error && "ERROR!!!"}
      <PinInput
        length={5}
        focus
        // disabled
        // secret
        ref={pinInput}
        type="numeric"
        onChange={onChange}
      />
      <button onClick={onClear}>Clear</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
