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
      <Query query={LIST_CHORES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (loading) return `Error! ${error.message}`;

          return (
            <ul>
              {data.listChores.map((chore) => (
                <li>
                  {chore.name}: {chore.goal_days}
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    </div>
  );
}

export default Chores;
