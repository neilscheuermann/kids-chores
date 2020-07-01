import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

const HTTP_URI = "http://localhost:4000";
export const createClient = () => {
  return new ApolloClient({
    // we will change this later when seeting up the socket
    link: new HttpLink({ uri: HTTP_URI }),
    cache: new InMemoryCache(),
  });
};
