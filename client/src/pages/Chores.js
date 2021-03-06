import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const LIST_CHORES_QUERY = gql`
  {
    listChores {
      id
      name
      goalDays
      progressDays
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
  const { data, subscribeToMore } = useQuery(LIST_CHORES_QUERY);

  useEffect(() => {
    subscribeToMore({
      document: LIST_CHORES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { choreCreated } = subscriptionData.data;
        const { listChores } = prev;

        if (!listChores.find((chore) => chore.id === choreCreated.id)) {
          return {
            ...prev,
            listChores: [...listChores, choreCreated],
          };
        }
      },
    });
  }, [subscribeToMore]);

  return (
    <div>
      {!data ? null : (
        <div>
          <h1>Chores</h1>
          <div>
            <ul>
              {data.listChores.map((chore) => (
                <li key={chore.id}>
                  {chore.name}: {chore.goalDays}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chores;
