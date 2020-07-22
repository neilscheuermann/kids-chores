import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../../util/context";
import { AuthNavWrapper, NavItem, NavLink } from "./NavStyledComponents";

export const CURRENT_ACCOUNT_OWNER_QUERY = gql`
  query currentAccountOwner {
    currentAccountOwner {
      id
      username
      token
      credential {
        email
        passwordHash
      }
    }
  }
`;

const AuthNav = () => {
  const { loading, error, data } = useQuery(CURRENT_ACCOUNT_OWNER_QUERY);
  const { setAuth } = useContext(AuthContext);

  if (error) {
    if (
      error.graphQLErrors[0] &&
      error.graphQLErrors[0].message === "Unauthenticated"
    ) {
      setAuth(null);
    }
    return null;
  }

  if (data && !data.currentAccountOwner) {
    return null;
  }

  return (
    <AuthNavWrapper>
      <NavLink to="/users" role="button">
        Users
      </NavLink>
      <NavLink
        to="/"
        role="button"
        onClick={() => {
          setAuth(null);
        }}
      >
        Log out
      </NavLink>
      <NavItem>
        {loading ? "USER..." : data.currentAccountOwner.username.toUpperCase()}
      </NavItem>
    </AuthNavWrapper>
  );
};

export default AuthNav;
