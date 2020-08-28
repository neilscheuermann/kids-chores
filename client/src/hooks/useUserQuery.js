import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const USER_QUERY = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      id
      name
      chores {
        name
        goalDays
        progressDays
      }
    }
  }
`;

export default function useUserQuery(userId) {
  const { data, loading } = useQuery(USER_QUERY, {
    variables: { userId },
  });

  const user = data ? data.user : {};

  return {
    loading,
    user,
  };
}
