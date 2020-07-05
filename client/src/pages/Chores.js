import React, { useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import GetSubscriptionsWorking from "../components/GetSubscriptionsWorking";

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

const LIST_CHORES_SUBSCRIPTION = gql`
  subscription onChoreCreated {
    choreCreated {
      id
      name
      goalDays
      progressDays
    }
  }
`;

function Chores() {
  const { subscribeToMore, data, ...queryResult } = useQuery(LIST_CHORES_QUERY);
  console.log("data>>>", data);
  console.log("queryResult>>>", queryResult);

  // const subscribeToNew = useCallback(
  //   () =>
  //     subscribeToMore({
  //       document: LIST_CHORES_SUBSCRIPTION,
  //       updateQuery: (prev, { subscriptionData }) => {
  //         console.log("Chores.js / inside subscribeToNew, prev>>>", prev);
  //         console.log(
  //           "Chores.js / inside subscribeToNew, subscriptionData>>>",
  //           subscriptionData
  //         );
  //       },
  //     }),
  //   [subscribeToMore]
  // );

  return (
    <div>
      {!data ? null : (
        <div>
          <h1>Chores</h1>
          <div>
            <ul>
              {data.listChores.map((chore) => (
                <li key={chore.id}>
                  {chore.name}: {chore.goal_days}
                </li>
              ))}
            </ul>
          </div>
          {/* <GetSubscriptionsWorking subscribeToNew={subscribeToNew} /> */}
        </div>
      )}
    </div>
  );
}

export default Chores;
