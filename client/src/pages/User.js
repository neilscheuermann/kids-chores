import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useReactRouter from "use-react-router";
import { AuthContext } from "../util/context";
import useUserQuery from "../hooks/useUserQuery";

export default function User() {
  const { id: userId } = useParams();
  const { currentUserId, setAuth } = useContext(AuthContext);
  const { loading, user } = useUserQuery(userId);
  const { history } = useReactRouter();

  const logoutAndReturn = () => {
    setAuth({ currentUserId: "logout", currentUserToken: "logout" });
    history.push(`/users`);
  };

  return (
    <div>
      {!currentUserId || currentUserId !== userId ? (
        <div>
          You are not authorized to see this user. You can{" "}
          <button onClick={() => history.push("/users")}>go back</button>
          or
          <button onClick={logoutAndReturn}>log out current user</button>
        </div>
      ) : (
        <div>
          <h1>User Page</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <p>User: {user.name}</p>
              <ul></ul>
              {user.chores.map(({ name, progressDays, goalDays }) => {
                return (
                  <li key={name}>
                    {name} : {progressDays || 0}/{goalDays}
                  </li>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
