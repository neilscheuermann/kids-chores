import React, { useContext, useRef, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import useReactRouter from "use-react-router";
import { AuthContext } from "../util/context";
import useUserQuery from "../hooks/useUserQuery";

export default function User() {
  const { id: paramsUserId } = useParams();
  const { currentUserId, setAuth } = useContext(AuthContext);
  const { loading, user } = useUserQuery(paramsUserId);
  const { history } = useReactRouter();

  if (currentUserId !== paramsUserId) {
    return <Redirect to={`/user-login/${paramsUserId}`} />;
  }

  return (
    <div>
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
    </div>
  );
}
