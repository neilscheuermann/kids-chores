import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";

function Chores() {
  const LIST_CHORES_QUERY = gql`
    {
      listChores {
        id
        name
        goal_days
        progress_days
      }
    }
  `;

  return (
    <div>
      <h1>Chores</h1>
      <Query query={LIST_CHORES_QUERY}></Query>
      <div></div>
    </div>
  );
}
