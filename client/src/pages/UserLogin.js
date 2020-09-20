import React, { useContext, useRef, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import useReactRouter from "use-react-router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PinInput from "react-pin-input";
import { AuthContext } from "../util/context";

const AUTHENTICATE_USER_MUTATION = gql`
  mutation authenticateUser($userId: ID!, $password: String!) {
    authenticateUser(userId: $userId, password: $password) {
      id
      name
      token
    }
  }
`;

export default function UserLogin() {
  const { currentUserId, setAuth } = useContext(AuthContext);
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
      onCompleted: ({ authenticateUser: { id, token } }) => {
        setAuth({ currentUserToken: token, currentUserId: id });
      },
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

  if (currentUserId) {
    return <Redirect to={`/user/${userId}`} />;
  }

  return (
    <div>
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
