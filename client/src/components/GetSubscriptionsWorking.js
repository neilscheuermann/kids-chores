// NOTE>>>: Just an example of how they got subscribeToMore to work
// in this article. https://schneider.dev/blog/elixir-phoenix-absinthe-graphql-react-apollo-absurdly-deep-dive/
import React from "react";
import Subscriber from "../containers/Subscriber";

const GetSubscriptionsWorking = ({ subscribeToNew }) => {
  return (
    <Subscriber subscribeToNew={subscribeToNew}>
      (child text inside GetSubscriptionsWorking.js)
    </Subscriber>
  );
};

export default GetSubscriptionsWorking;
