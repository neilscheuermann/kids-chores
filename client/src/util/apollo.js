import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import { createHttpLink } from "apollo-link-http";
import { hasSubscription } from "@jumpn/utils-graphql";
import { split } from "apollo-link";
import { setContext } from "apollo-link-context";
import Cookies from "js-cookie";

const HTTP_URI =
  process.env.NODE_ENV === "production"
    ? "https://<my_prod_domain_name>"
    : "http://localhost:4005";

const WS_URI =
  process.env.NODE_ENV === "production"
    ? "wss://<my_prod_domain_name>/socket"
    : "ws://localhost:4005/socket";

export const createClient = () => {
  // Create the basic HTTP link.
  const httpLink = createHttpLink({ uri: HTTP_URI });

  // Create an Absinthe socket wrapped around a standard
  // Phoenix websocket connection.
  const absintheSocket = AbsintheSocket.create(
    new PhoenixSocket(WS_URI, {
      params: () => {
        if (Cookies.get("token")) {
          return { token: Cookies.get("token") };
        } else {
          return {};
        }
      },
    })
  );

  // Use the Absinthe helper to create a websocket link around
  // the socket.
  const socketLink = createAbsintheSocketLink(absintheSocket);

  // Split traffic based on type -- queries and mutations go
  // through the HTTP link, subscriptions go through the
  // websocket link.
  const splitLink = split(
    (operation) => hasSubscription(operation.query),
    socketLink,
    httpLink
  );

  // Add a wrapper to set the auth token (if any) to the
  // authorization header on HTTP requests.
  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from the cookie if it exists.
    const token = Cookies.get("token");

    // Return the headers to the context so httpLink can read them.
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const link = authLink.concat(splitLink);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
};
