import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../util/context";
import { CreateUserForm } from "../components";

const USERS_QUERY = gql`
  query users {
    users {
      id
      name
    }
  }
`;

const USERS_SUBSCRIPTION = gql`
  subscription onUserCreated {
    userCreated {
      id
      name
    }
  }
`;

export default function Users() {
  const { accountOwnerId } = useContext(AuthContext);
  const { data, subscribeToMore } = useQuery(USERS_QUERY, {
    variables: { accountOwnerId },
  });

  useEffect(() => {
    subscribeToMore({
      document: USERS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { userCreated } = subscriptionData.data;
        const { users } = prev;

        if (!users.find((user) => user.id === userCreated.id)) {
          return {
            ...prev,
            users: [...users, userCreated],
          };
        }
      },
    });
  }, [subscribeToMore]);

  return (
    <>
      <h1>Users</h1>
      <CreateUserForm />
      <div>
        {!data ? null : (
          <div>
            {data.users.map((user) => (
              <Link key={user.id} to={`/user/${user.id}`}>
                {user.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
