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
  const { currentUserToken, setAuth } = useContext(AuthContext);
  const { history } = useReactRouter();
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
    history.push(`/user/${userId}`);
  };

  if (data) {
    const {
      authenticateUser: { token },
    } = data;
    setAuth({ currentUserToken: token });
  }

  if (currentUserToken) {
    return <Redirect to="/user/10" />;
  }

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
