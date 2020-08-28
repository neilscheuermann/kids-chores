import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useUserQuery from "../hooks/useUserQuery";

export default function User() {
  const { id: userId } = useParams();
  const { loading, user } = useUserQuery(userId);

  return (
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
  );
}
